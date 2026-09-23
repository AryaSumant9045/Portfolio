import ContactForm from "@/components/ContactForm";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { profile, socials } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-[26rem] max-w-4xl rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.20),rgba(34,211,238,0.09)_46%,transparent_72%)] blur-[110px] animate-glow"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="divider" />

        <div className="mx-auto mt-20 max-w-3xl text-center">
          <Reveal>
            <span className="font-display text-[11px] font-medium uppercase tracking-[0.32em] text-aqua">
              Contact
            </span>
          </Reveal>

          <Reveal delay={0.07}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6.5vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
              Let&apos;s build something
              <br />
              <span className="gradient-text-accent">that actually ships.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-7 max-w-xl text-[15.5px] leading-[1.8] text-muted">
              Open to internships, research collaborations, and problems where the data is
              messy and the answer is not in the documentation.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3.5">
              <Magnetic strength={0.26}>
                <a href={`mailto:${profile.email}`} className="btn btn-primary">
                  {profile.email}
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  GitHub
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} amount={0.15}>
          <div className="mx-auto mt-20 max-w-3xl">
            <ContactForm />
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {socials.map((social, index) => (
            <Reveal key={social.label} delay={index * 0.07} amount={0.2}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                className="group glass ring-glow flex items-center justify-between rounded-2xl px-6 py-5 transition-transform duration-500 ease-cinema hover:-translate-y-1.5"
              >
                <span>
                  <span className="mono-label">{social.label}</span>
                  <span className="mt-2 block font-display text-[14.5px] font-medium text-ink/90 transition-colors duration-300 group-hover:text-aqua">
                    {social.value}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-lg text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-aqua"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
