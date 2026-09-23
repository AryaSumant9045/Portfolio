"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import Magnetic from "@/components/Magnetic";
import ThemeToggle from "@/components/ThemeToggle";

const SECTION_IDS = ["hero", "about", "skills", "projects", "achievements", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Single observer for every section; the band in the middle of the viewport
  // decides which link is lit.
  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.15, 0.4, 0.75] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        className={`w-full max-w-[1180px] rounded-[26px] transition-all duration-500 ease-cinema sm:rounded-full ${
          scrolled || open
            ? "glass-strong shadow-[0_18px_60px_-24px_rgba(0,0,0,0.9)]"
            : "border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <a
            href="#hero"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[11px] bg-gradient-to-br from-brand to-aqua font-display text-sm font-bold text-[#05050a] shadow-[0_0_24px_-6px_rgba(34,211,238,0.9)]">
              S
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-[-0.01em] text-ink sm:block">
              Sumant Saini
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`relative block rounded-full px-4 py-2 text-[13.5px] transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-fill-strong ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="hidden md:block">
              <Magnetic strength={0.22}>
                <a href="#contact" className="btn btn-ghost px-5 py-2.5 text-[13px]">
                  Let&apos;s talk
                </a>
              </Magnetic>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-fill md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded bg-ink transition-all duration-300 ease-cinema ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[1.5px] w-4 rounded bg-ink transition-all duration-300 ease-cinema ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded bg-ink transition-all duration-300 ease-cinema ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 px-3 pb-4 pt-1">
                {navLinks.map((link, index) => (
                  <li key={link.href}>
                    <motion.a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.35 }}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] text-muted transition-colors hover:bg-fill hover:text-ink"
                    >
                      {link.label}
                      <span aria-hidden className="text-aqua/70">
                        →
                      </span>
                    </motion.a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="btn btn-primary mt-2 w-full"
                  >
                    Let&apos;s talk
                  </a>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}
