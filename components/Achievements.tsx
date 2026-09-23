import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { achievements } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  "Kaggle Competitions": (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M8 4v16M8 13l7-9M8 13l7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Regional-Level Yoga Competitor": (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 8v5m0 0-4.5 3M12 13l4.5 3M7 11h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="Beyond the coursework"
          title="Where I keep"
          accent="sharpening the edge."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {achievements.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.09} amount={0.2} className="h-full">
              <SpotlightCard className="h-full">
                <div className="group glass-strong ring-glow spotlight relative flex h-full gap-5 rounded-3xl p-7 transition-transform duration-500 ease-cinema hover:-translate-y-1.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-gradient-to-br from-brand/25 to-aqua/15 text-aqua">
                    {ICONS[item.title]}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                        {item.title}
                      </h3>
                      <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.18em] text-faint">
                        {item.meta}
                      </span>
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.8] text-muted">{item.detail}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
