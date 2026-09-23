"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", message: "", company: "" };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update = (key: keyof typeof EMPTY) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: { error?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setForm(EMPTY);
      setStatus("sent");
      setFeedback("Message sent. I'll get back to you soon.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  const busy = status === "sending";

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-7 py-5">
        <div>
          <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">
            Send a message
          </h3>
          <p className="mt-1 text-[13px] text-muted">
            Goes straight to my inbox — I reply from there.
          </p>
        </div>
        <span className="mono-label">Direct</span>
      </div>

      <form onSubmit={onSubmit} className="px-7 py-7" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="field-label">
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={120}
              value={form.name}
              onChange={update("name")}
              placeholder="Aarav Sharma"
              className="field"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="field-label">
              Your email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              className="field"
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="contact-message" className="field-label">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            maxLength={5000}
            value={form.message}
            onChange={update("message")}
            placeholder="What are you building, and where could I help?"
            className="field resize-y"
          />
        </div>

        {/* Honeypot — hidden from people, catnip for bots. */}
        <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={update("company")}
          />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Sending…" : "Send message"}
            {!busy ? <span aria-hidden>→</span> : null}
          </button>

          <p
            role="status"
            aria-live="polite"
            className={`text-[13px] leading-snug ${
              status === "error"
                ? "text-[#fca5a5]"
                : status === "sent"
                  ? "text-aqua"
                  : "text-faint"
            }`}
          >
            {feedback || "Usually reply within a day or two."}
          </p>
        </div>
      </form>
    </div>
  );
}
