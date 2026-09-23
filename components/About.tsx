import MascotVideo from "@/components/MascotVideo";
import Portrait from "@/components/Portrait";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/lib/data";
import { findPortrait } from "@/lib/portrait";

export default function About() {
  const portraitSrc = findPortrait();

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div
        aria-hidden
        className="divider pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-[1280px] -translate-x-1/2"
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

            <Reveal delay={0.24} amount={0.12}>
              <MascotVideo className="mx-auto mt-8 w-full max-w-[300px] sm:max-w-[360px] lg:mx-0 lg:max-w-none" />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              <Reveal className="mx-auto shrink-0 sm:mx-0" amount={0.2}>
                <Portrait src={portraitSrc} />
              </Reveal>

              <div className="space-y-6">
                {profile.intro.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={0.06 * index}>
                    <p className="text-[15.5px] leading-[1.85] text-muted sm:text-[17px]">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.2}>
              <div className="glass-strong mt-11 overflow-hidden rounded-3xl">
                <div className="flex items-center justify-between border-b border-line-soft px-6 py-4">
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
                        index % 2 === 0 ? "sm:border-r sm:border-line-soft" : ""
                      } ${index < 2 ? "border-b border-line-soft" : ""}`}
                    >
                      <dt className="text-[10.5px] uppercase tracking-[0.2em] text-faint">
                        {row.label}
                      </dt>
                      <dd className="mt-2 font-display text-[15px] font-medium leading-snug text-balance text-ink">
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
