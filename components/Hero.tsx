"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import OrbVisual from "@/components/OrbVisual";
import ParticleField from "@/components/ParticleField";
import { EASE, fadeUp, stagger } from "@/components/Reveal";
import { profile } from "@/lib/data";

const lineUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

export default function Hero() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : "hidden";
  const words = profile.tagline.split(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 sm:pt-36"
    >
      {/* Background stack */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-48 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.30),transparent_62%)] blur-[110px] animate-drift" />
        <div className="absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_62%)] blur-[110px] animate-drift-slow" />
        <div className="absolute -bottom-56 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.14),transparent_66%)] blur-[120px] animate-float" />
        <div className="grid-plane absolute inset-0 opacity-70" />
        <div className="absolute inset-0">
          <ParticleField />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            initial={initial}
            animate="show"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-xl">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aqua" />
                </span>
                <span className="font-display text-[11px] font-medium uppercase tracking-[0.24em] text-ink/80">
                  {profile.institution} · {profile.period}
                </span>
              </span>
            </motion.div>

            <h1 className="mt-8 font-display text-[clamp(3.1rem,9.2vw,6.6rem)] font-bold leading-[0.93] tracking-[-0.045em]">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={lineUp} className="gradient-text block">
                  {profile.firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={lineUp} className="gradient-text-accent block">
                  {profile.lastName}
                </motion.span>
              </span>
            </h1>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
              <span className="h-10 w-px bg-gradient-to-b from-brand via-aqua to-transparent" />
              <p className="font-display text-base font-medium tracking-[0.01em] text-ink/90 sm:text-lg">
                {profile.title}
              </p>
            </motion.div>

            <motion.p
              variants={stagger}
              className="mt-7 max-w-xl text-[15px] leading-[1.75] text-muted sm:text-base"
            >
              {words.map((word, index) => (
                <motion.span key={`${word}-${index}`} variants={fadeUp} className="mr-[0.3em] inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-11 flex flex-wrap items-center gap-3.5">
              <Magnetic strength={0.28}>
                <a href="#projects" className="btn btn-primary">
                  View Work
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a href="#contact" className="btn btn-ghost">
                  Contact
                </a>
              </Magnetic>
            </motion.div>

            <motion.dl
              variants={fadeUp}
              className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4"
            >
              {profile.stats.map((stat) => (
                <div key={stat.label} className="border-l border-white/10 pl-4">
                  <dt className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[11.5px] uppercase tracking-[0.16em] text-faint">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="hidden lg:col-span-5 lg:block"
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.25 }}
          >
            <OrbVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-7 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.34em] text-faint">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-4 animate-scan bg-gradient-to-b from-transparent via-aqua to-transparent" />
          </span>
        </div>
      </div>
    </section>
  );
}
