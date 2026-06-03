"use client";

import { motion } from "motion/react";
import type { HeroContent } from "@/lib/content";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const TAGS = [
  { label: "Design Systems",  style: { top: "28%",  left: "6%" } },
  { label: "UX Research",     style: { top: "52%",  left: "4%" } },
  { label: "AI Workflows",    style: { top: "34%",  right: "5%" } },
  { label: "Dev-adjacent",    style: { top: "62%",  right: "7%" } },
];

export default function Hero({ data }: { data: HeroContent }) {
  const headline = data.title.join(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Ghost headline — fills the background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center"
        style={{ userSelect: "none" }}
      >
        <span
          style={{
            fontSize: "clamp(4rem, 13vw, 12rem)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
            color: "var(--color-text-ghost)",
            display: "block",
            maxWidth: "95vw",
          }}
        >
          {data.title[0]}<br />
          {data.title[1]}<br />
          {data.title[2]}
        </span>
      </motion.div>

      {/* Floating discipline tags */}
      {TAGS.map((tag, i) => (
        <motion.span
          key={tag.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: EASE }}
          className="absolute hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] px-3.5 py-1.5 text-[12px] text-text-secondary shadow-sm md:block"
          style={tag.style}
        >
          {tag.label}
        </motion.span>
      ))}

      {/* Center content — readable overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="relative z-10 flex flex-col items-center gap-5 text-center"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] px-4 py-1.5 text-[12px] text-text-secondary shadow-sm">
          <span
            className="h-1.5 w-1.5 animate-architecture-pulse rounded-full bg-accent"
            style={{ boxShadow: "0 0 6px var(--color-accent)" }}
          />
          {data.badge}
        </span>

        {/* Name */}
        <h1
          className="text-text"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          {data.name}
        </h1>

        {/* Subtitle */}
        <p className="max-w-[360px] text-[15px] leading-relaxed text-text-secondary">
          Lead Product Designer · UAE, India, UK, Remote
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="#work"
            className="inline-flex h-10 items-center rounded-full bg-text px-6 text-[13px] font-semibold text-bg transition-opacity hover:opacity-75"
          >
            View work
          </a>
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-full border border-[var(--color-border-strong)] px-6 text-[13px] text-text-secondary transition-colors hover:text-text"
          >
            Get in touch
          </a>
        </div>
      </motion.div>

      {/* Stats row — bottom of section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        className="absolute bottom-0 inset-x-0 border-t border-[var(--color-border)]"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-4 divide-x divide-[var(--color-border)]">
          {[
            { v: "10+", l: "Years" },
            { v: "6+",  l: "Projects" },
            { v: "5+",  l: "Clients" },
            { v: "4",   l: "Markets" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center gap-0.5 py-6">
              <span
                className="text-text"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}
              >
                {s.v}
              </span>
              <span className="text-[12px] text-text-muted">{s.l}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
