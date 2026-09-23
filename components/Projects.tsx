import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Four projects,"
            accent="four real problems."
          />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted lg:text-right">
              Hover a card for the engineering detail behind each build — the parts that
              were hard, not just the parts that worked.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08} amount={0.12} className="h-full">
              <SpotlightCard className="h-full">
                <article className="group glass-strong ring-glow spotlight relative flex h-full flex-col overflow-hidden rounded-[28px] transition-transform duration-500 ease-cinema hover:-translate-y-2">
                  <ProjectVisual project={project} />

                  <div className="flex flex-1 flex-col p-7 pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-faint">
                        {project.index}
                      </span>
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-aqua/85">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[26px] font-semibold leading-tight tracking-[-0.025em] text-ink">
                      {project.title}
                    </h3>

                    <p className="mt-3.5 text-[14.5px] leading-[1.75] text-muted">
                      {project.summary}
                    </p>

                    {/*
                      The detail block always occupies its space in layout and only
                      fades in on hover — revealing content without shifting the grid.
                      Below lg it is simply visible, since there is no hover.
                    */}
                    <div className="mt-5 opacity-100 transition-all duration-500 ease-cinema lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                      <p className="text-[13.5px] leading-[1.75] text-muted/85">
                        {project.detail}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-[13px] leading-snug text-ink/75"
                          >
                            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-aqua shadow-[0_0_8px_2px_rgba(34,211,238,0.55)]" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-7">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-5 border-t border-white/8 pt-5">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                            className="group/link inline-flex items-center gap-2 text-[13px] font-medium text-ink/85 transition-colors duration-300 hover:text-aqua"
                          >
                            {link.label}
                            <span
                              aria-hidden
                              className="transition-transform duration-300 group-hover/link:translate-x-1"
                            >
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
