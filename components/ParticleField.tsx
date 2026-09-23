"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Props = {
  className?: string;
};

const MAX_DPR = 1.75;
const LINK_DISTANCE = 138;
const POINTER_RADIUS = 170;

/**
 * Cursor-reactive particle network drawn on a single canvas.
 *
 * Performance rules it follows:
 *  - device pixel ratio is capped, so retina laptops do not render 4x pixels;
 *  - particle count scales with area instead of being fixed;
 *  - one rAF loop, pointer events only record coordinates;
 *  - the loop stops entirely when the canvas scrolls out of view or the tab
 *    is hidden, so it costs nothing off-screen;
 *  - reduced motion renders one static frame and never starts a loop.
 */
export default function ParticleField({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /**
     * The canvas cannot use CSS variables directly, so the palette is read from
     * the theme and re-read whenever <html data-theme> changes.
     */
    type Palette = { brand: string; aqua: string; neon: string; dot: string };

    const hexToRgb = (hex: string): [number, number, number] => {
      const raw = hex.trim().replace("#", "");
      const full =
        raw.length === 3
          ? raw
              .split("")
              .map((c) => c + c)
              .join("")
          : raw;
      const n = Number.parseInt(full, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    const readPalette = (): Palette => {
      const cs = getComputedStyle(document.documentElement);
      const rgbOf = (name: string, fallback: string) => {
        const raw = cs.getPropertyValue(name).trim();
        const hex = raw.startsWith("#") ? raw : fallback;
        const [r, g, b] = hexToRgb(hex);
        return `${r}, ${g}, ${b}`;
      };
      return {
        brand: rgbOf("--color-brand", "#6366f1"),
        aqua: rgbOf("--color-aqua", "#22d3ee"),
        neon: rgbOf("--color-neon", "#00f5ff"),
        dot: cs.getPropertyValue("--particle-dot").trim() || "rgba(199, 210, 254, 0.5)",
      };
    };

    let palette = readPalette();

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = false;
    let inView = true;

    let pointerX = -9999;
    let pointerY = -9999;

    const buildParticles = () => {
      const count = Math.round(
        Math.min(96, Math.max(26, (width * height) / 19000)),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
      if (reduced) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        // Connect nearby particles: the network itself.
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;
          const alpha = (1 - dist / LINK_DISTANCE) * 0.26;
          ctx.strokeStyle = `rgba(${palette.brand}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }

        // Cyan threads that only appear near the pointer.
        const pdx = p.x - pointerX;
        const pdy = p.y - pointerY;
        const pdist = Math.hypot(pdx, pdy);
        if (pdist < POINTER_RADIUS) {
          const alpha = (1 - pdist / POINTER_RADIUS) * 0.5;
          ctx.strokeStyle = `rgba(${palette.aqua}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointerX, pointerY);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle =
          pdist < POINTER_RADIUS ? `rgba(${palette.neon}, 0.85)` : palette.dot;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.min(width, Math.max(0, p.x));
        p.y = Math.min(height, Math.max(0, p.y));

        // Gentle repulsion so the field reacts to the cursor instead of
        // ignoring it, without ever looking chaotic.
        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_RADIUS && dist > 0.01) {
          const push = (1 - dist / POINTER_RADIUS) * 0.5;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }
      }

      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduced || running) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    resize();
    if (reduced) draw();
    else start();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (reduced) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className ?? ""}`}
    />
  );
}
