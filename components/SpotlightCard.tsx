"use client";

import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Writes --mx/--my (pointer position inside the card) on a rAF budget so the
 * CSS spotlight gradient can follow the cursor without flooding the style
 * system on every pointer event.
 */
export default function SpotlightCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pending = useRef({ x: 0, y: 0 });

  const flush = () => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `${pending.current.x}px`);
    el.style.setProperty("--my", `${pending.current.y}px`);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pending.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (!frame.current) frame.current = requestAnimationFrame(flush);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={className}>
      {children}
    </div>
  );
}
