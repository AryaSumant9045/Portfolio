"use client";

import { useEffect, useRef } from "react";

const HOT_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hot"]';

/**
 * Dot + trailing ring cursor. The dot tracks tightly, the ring lags behind for
 * a parallax feel and swells over anything interactive.
 *
 * Deliberately opt-in: desktop pointers only, never under reduced motion, and
 * it never traps the pointer — the native cursor is restored on unmount or
 * when the tab loses focus.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("cursor-hidden");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let dotX = pointerX;
    let dotY = pointerY;
    let ringX = pointerX;
    let ringY = pointerY;

    let visible = false;
    let hot = false;
    let frame = 0;
    let running = true;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      const opacity = next ? "1" : "0";
      dot.style.opacity = opacity;
      ring.style.opacity = opacity;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      setVisible(true);

      const target = event.target as Element | null;
      const nextHot = Boolean(target?.closest?.(HOT_SELECTOR));
      if (nextHot !== hot) {
        hot = nextHot;
        ring.dataset.hot = String(hot);
      }
    };

    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    // A single rAF loop drives both cursors; pointer events only record state,
    // so a high-frequency mouse cannot cause layout thrash.
    const loop = () => {
      if (!running) return;
      dotX += (pointerX - dotX) * 0.34;
      dotY += (pointerY - dotY) * 0.34;
      ringX += (pointerX - ringX) * 0.14;
      ringY += (pointerY - ringY) * 0.14;

      dot.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px, 0)`;
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`;

      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
        setVisible(false);
      } else {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    };

    dot.style.opacity = "0";
    ring.style.opacity = "0";
    ring.dataset.hot = "false";
    frame = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
      document.removeEventListener("visibilitychange", onVisibility);
      root.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <div aria-hidden>
      <div ref={ringRef} className="cursor-layer cursor-ring" />
      <div ref={dotRef} className="cursor-layer cursor-dot" />
    </div>
  );
}
