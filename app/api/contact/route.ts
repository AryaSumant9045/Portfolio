import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// nodemailer needs Node APIs, so this route must not run on the edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: 120, email: 200, message: 5000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/** Best-effort in-memory throttle. Enough to stop a bored script on a portfolio. */
const recentHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recentHits.set(ip, hits);
  if (recentHits.size > 5000) recentHits.clear();
  return hits.length > MAX_PER_WINDOW;
}

const toText = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Collapses newlines so nothing can inject extra mail headers. */
const toHeader = (value: string): string => value.replace(/[\r\n\t]+/g, " ").trim();

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: hidden from humans, irresistible to bots. Pretend it worked.
  if (toText(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = toText(body.name, LIMITS.name);
  const email = toText(body.email, LIMITS.email);
  const message = toText(body.message, LIMITS.message);

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please write a slightly longer message." },
      { status: 400 },
    );
  }

  const ip =
    (request.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim() || "local";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429 },
    );
  }

  // Config is checked after validation so a misconfigured server still returns
  // useful 400s instead of masking bad input behind a 503.
  const user = process.env.SMTP_USER?.trim();
  // Google shows app passwords in groups of four; drop whatever spacing was pasted.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();
  const to = (process.env.MAIL_TO || user)?.trim();

  if (!user || !pass || !to) {
    return NextResponse.json(
      { error: "Email is not configured on the server yet." },
      { status: 503 },
    );
  }

  const safeName = toHeader(name);
  const safeEmail = toHeader(email);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: { name: "Portfolio contact form", address: user },
      to,
      replyTo: { name: safeName, address: safeEmail },
      subject: `Portfolio message — ${safeName}`,
      text: `From: ${safeName} <${safeEmail}>\n\n${message}\n`,
      html: [
        '<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#141416">',
        `<p style="margin:0 0 4px"><strong>${escapeHtml(safeName)}</strong></p>`,
        `<p style="margin:0 0 16px;color:#5f6068">${escapeHtml(safeEmail)}</p>`,
        '<hr style="border:none;border-top:1px solid #ddd;margin:0 0 16px" />',
        `<p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>`,
        "</div>",
      ].join(""),
    });
  } catch (error) {
    console.error("[contact] send failed:", error);
    return NextResponse.json(
      { error: "Could not send the message right now. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
