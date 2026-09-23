/**
 * Pure-CSS hero centrepiece: concentric orbiting rings around a glowing core.
 * No WebGL, no library, one composited layer — it cannot cause main-thread
 * jank, and it collapses cleanly under prefers-reduced-motion.
 */
export default function OrbVisual() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* Bloom behind the core */}
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.55),rgba(34,211,238,0.18)_45%,transparent_70%)] blur-[70px] animate-glow" />

      {/* Halo */}
      <div className="absolute inset-[6%] rounded-full border border-white/[0.07]" />

      {/* Rings — each spins at its own rate */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/12 animate-orbit-slow">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_16px_4px_rgba(0,245,255,0.7)]" />
      </div>
      <div className="absolute inset-[13%] rounded-full border border-white/10 animate-orbit-rev">
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand shadow-[0_0_14px_4px_rgba(99,102,241,0.8)]" />
      </div>
      <div className="absolute inset-[26%] rounded-full border border-white/[0.08] animate-orbit">
        <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua shadow-[0_0_14px_4px_rgba(34,211,238,0.75)]" />
      </div>

      {/* Core */}
      <div className="absolute inset-[35%] overflow-hidden rounded-full border border-white/12 bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.95),rgba(165,180,252,0.55)_26%,rgba(99,102,241,0.35)_52%,rgba(10,10,15,0.9)_78%)] shadow-[0_0_60px_-8px_rgba(34,211,238,0.6),inset_0_0_40px_rgba(99,102,241,0.35)]">
        <span className="absolute left-0 h-14 w-full bg-gradient-to-b from-transparent via-white/45 to-transparent animate-scan" />
      </div>

      {/* Floating labels */}
      <span className="glass absolute -left-2 top-[22%] rounded-full px-3 py-1.5 font-display text-[11px] tracking-[0.14em] text-ink/85 animate-float">
        RAG
      </span>
      <span
        className="glass absolute -right-1 top-[42%] rounded-full px-3 py-1.5 font-display text-[11px] tracking-[0.14em] text-ink/85 animate-float"
        style={{ animationDelay: "1.6s" }}
      >
        PyTorch
      </span>
      <span
        className="glass absolute bottom-[16%] left-[8%] rounded-full px-3 py-1.5 font-display text-[11px] tracking-[0.14em] text-ink/85 animate-float"
        style={{ animationDelay: "3.1s" }}
      >
        Whisper
      </span>
    </div>
  );
}
