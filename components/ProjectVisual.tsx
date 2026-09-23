import type { Project } from "@/lib/data";

const WAVE = [38, 62, 30, 78, 46, 88, 34, 70, 52, 92, 40, 66, 28, 74, 48, 84, 36, 58];
const ROC = [22, 30, 41, 49, 58, 66, 73, 81, 88, 94];
const DOTS = Array.from({ length: 48 }, (_, i) => (i * 7) % 5 === 0 || i % 11 === 0);

function Motif({ id }: { id: string }) {
  if (id === "rag-chatbot") {
    return (
      <div className="flex h-full items-end justify-center gap-[3px] px-6 pb-1">
        {WAVE.map((height, index) => (
          <span
            key={index}
            className="w-[3px] rounded-full bg-gradient-to-t from-brand/25 via-brand to-aqua"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    );
  }

  if (id === "potato-leaf") {
    return (
      <div className="grid h-full grid-cols-8 place-items-center gap-2 px-8 py-4">
        {DOTS.map((on, index) => (
          <span
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${
              on ? "bg-aqua shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]" : "bg-white/12"
            }`}
          />
        ))}
      </div>
    );
  }

  if (id === "movie-predictor") {
    return (
      <div className="flex h-full items-end justify-center gap-2.5 px-8 pb-1">
        {ROC.map((height, index) => (
          <span
            key={index}
            className="w-full max-w-[18px] rounded-t-[4px] bg-gradient-to-t from-brand/20 to-aqua/90"
            style={{ height: `${height}%`, opacity: 0.35 + index * 0.065 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <span className="absolute left-[18%] top-[26%] h-[62%] w-[46%] rounded-[14px] border border-white/12 bg-white/[0.03]" />
      <span className="absolute left-[30%] top-[38%] h-[62%] w-[46%] rounded-[14px] border border-white/15 bg-white/[0.05]" />
      <span className="absolute left-[42%] top-[50%] h-[62%] w-[46%] rounded-[14px] border border-aqua/40 bg-gradient-to-br from-brand/25 to-aqua/15 shadow-[0_16px_40px_-18px_rgba(34,211,238,0.9)]" />
    </div>
  );
}

export default function ProjectVisual({ project }: { project: Project }) {
  const isBrand = project.accent === "brand";

  return (
    <div className="relative h-[190px] w-full overflow-hidden border-b border-white/8">
      <div
        className={`absolute inset-0 origin-center transition-transform duration-700 ease-cinema group-hover:scale-[1.06] ${
          isBrand
            ? "bg-[linear-gradient(135deg,rgba(99,102,241,0.22),rgba(13,13,26,0.2)_46%,rgba(34,211,238,0.14))]"
            : "bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(13,13,26,0.2)_46%,rgba(99,102,241,0.2))]"
        }`}
      />

      <div
        className="absolute inset-0 origin-center opacity-60 transition-transform duration-700 ease-cinema group-hover:scale-[1.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="absolute inset-0 origin-center transition-transform duration-700 ease-cinema group-hover:scale-[1.06]">
        <Motif id={project.id} />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b0b14] to-transparent" />

      <span className="absolute left-6 top-5 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-ink/60">
        {project.stack}
      </span>
    </div>
  );
}
