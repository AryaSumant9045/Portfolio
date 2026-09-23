import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { orbitInner, orbitOuter, skillGroups } from "@/lib/data";

type RingConfig = {
  skills: string[];
  radius: number;
  duration: string;
  spinClass: string;
  offset: number;
};

const RINGS: RingConfig[] = [
  {
    skills: orbitInner,
    radius: 24,
    duration: "46s",
    spinClass: "animate-orbit",
    offset: -Math.PI / 2,
  },
  {
    skills: orbitOuter,
    radius: 41.5,
    duration: "68s",
    spinClass: "animate-orbit-slow",
    offset: -Math.PI / 2 + Math.PI / orbitOuter.length,
  },
];

function OrbitStage() {
  return (
    <div className="orbit-stage relative mx-auto aspect-square w-full max-w-[500px]">
      {/* Bloom */}
      <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.32),rgba(34,211,238,0.1)_48%,transparent_72%)] blur-[60px] animate-glow" />

      {/* Orbit guides */}
      <div className="orbit-trace" style={{ inset: `${50 - 41.5}%` }} />
      <div className="orbit-trace" style={{ inset: `${50 - 24}%`, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }} />

      {/* Core */}
      <div className="absolute inset-[37%] rounded-full border border-white/12 bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.9),rgba(165,180,252,0.5)_28%,rgba(99,102,241,0.28)_55%,rgba(10,10,15,0.85)_80%)] shadow-[0_0_50px_-6px_rgba(34,211,238,0.55)]" />

      {RINGS.map((ring) => (
        <div
          key={ring.duration}
          className={`orbit-ring ${ring.spinClass}`}
          style={{ animationDuration: ring.duration }}
        >
          {ring.skills.map((skill, index) => {
            const angle = (index / ring.skills.length) * Math.PI * 2 + ring.offset;
            return (
              <div
                key={skill}
                className="orbit-slot"
                style={{
                  left: `${50 + ring.radius * Math.cos(angle)}%`,
                  top: `${50 + ring.radius * Math.sin(angle)}%`,
                }}
              >
                <div className="orbit-counter" style={{ animationDuration: ring.duration }}>
                  <span className="chip backdrop-blur-md">{skill}</span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Skills" title="The toolkit behind" accent="the results." />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted lg:text-right">
              Hover the constellation to hold it still. Everything on the outer rings is
              something I have shipped with, not just read about.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-6" amount={0.15}>
            <div className="hidden lg:block">
              <OrbitStage />
            </div>
            <div className="lg:hidden">
              <div className="flex flex-wrap justify-center gap-2">
                {[...orbitInner, ...orbitOuter].map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="order-1 grid gap-4 sm:grid-cols-2 lg:order-2 lg:col-span-6">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.07} amount={0.2}>
                <div className="glass ring-glow group h-full rounded-2xl p-5 transition-transform duration-500 ease-cinema hover:-translate-y-1">
                  <span className="mono-label">{group.caption}</span>
                  <h3 className="mt-2 font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
                    {group.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
