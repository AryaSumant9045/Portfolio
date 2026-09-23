import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-[1280px] -translate-x-1/2 divider"
      />

      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About"
              title="Messy data in."
              accent="Working systems out."
            />

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-2">
                {profile.focus.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {profile.intro.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.06 * index}>
                <p className="text-[15.5px] leading-[1.85] text-muted sm:text-[17px]">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="glass-strong mt-11 overflow-hidden rounded-3xl">
                <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
                  <span className="mono-label">Profile</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-faint">
                      Active
                    </span>
                  </span>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2">
                  {[
                    { label: "Programme", value: profile.programme },
                    { label: "Institute", value: profile.institution },
                    { label: "Timeline", value: profile.period },
                    { label: "Based in", value: profile.location },
                  ].map((row, index) => (
                    <div
                      key={row.label}
                      className={`px-6 py-5 ${
                        index % 2 === 0 ? "sm:border-r sm:border-white/8" : ""
                      } ${index < 2 ? "border-b border-white/8" : ""}`}
                    >
                      <dt className="text-[10.5px] uppercase tracking-[0.2em] text-faint">
                        {row.label}
                      </dt>
                      <dd className="mt-2 font-display text-[15px] font-medium leading-snug text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
