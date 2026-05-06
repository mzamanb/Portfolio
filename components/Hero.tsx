"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/lib/content";

const META = [
  { k: "Role",      v: "Lead Product Designer" },
  { k: "Focus",     v: "Systems · UX · AI" },
  { k: "Available", v: "For new work", pulse: true },
  { k: "Based",     v: "Remote · Worldwide" },
];

export default function Hero({ data }: { data: HeroContent }) {
  const lines = data.title;
  const accentLine = lines[0];
  const bodyLines = lines.slice(1);

  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-28 sm:pb-24 sm:pt-36 md:pb-28 md:pt-44"
    >
      {/* 64px grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-subtle) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "-1px -1px",
        }}
      />

      {/* Ambient glow — ≈1100×600px, 18% opacity, blur 20px, top-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          top: -200,
          width: 1100,
          height: 600,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Kicker — monospace uppercase, 24px green bar prefix */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted"
        >
          <span className="h-px w-6 shrink-0 bg-accent" />
          {data.badge}
        </motion.span>

        {/* Display headline — 96px / lh 0.98 / tracking -0.035em */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontSize: "clamp(2.5rem, 8.5vw, 6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            fontWeight: 400,
          }}
        >
          <span className="block text-accent">{accentLine}</span>
          {bodyLines.map((line, i) => (
            <span key={i} className="block text-text">
              {line}
            </span>
          ))}
        </motion.h1>

        {/* Lead paragraph — max 580px, Inter 17/26, text-secondary */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="mt-8 max-w-[580px] text-[15px] font-light leading-relaxed text-text-secondary sm:text-[16px] md:text-[17px] md:leading-[26px]"
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {/* Primary — filled green pill */}
          <a
            href="#work"
            className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-accent px-[22px] text-[14px] font-medium text-white transition-colors hover:bg-accent-soft"
          >
            View case studies
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Ghost — outlined pill */}
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full border border-[var(--color-border-strong)] bg-transparent px-[22px] text-[14px] font-normal text-text transition-all hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Meta strip — 4-col glass grid, 1px gap, 12px radius, gradient-border shell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-16"
        >
          {/* Outer gradient-border shell */}
          <div
            className="rounded-[13px] p-px"
            style={{ background: "var(--shell-grad)" }}
          >
            <div
              className="grid grid-cols-2 gap-px overflow-hidden rounded-xl md:grid-cols-4"
              style={{ background: "var(--color-border)" }}
            >
              {META.map((cell) => (
                <div
                  key={cell.k}
                  className="flex flex-col gap-1.5 px-4 py-4 backdrop-blur-md sm:px-5 md:px-6 md:py-5"
                  style={{ background: "var(--color-bg-card)" }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                    {cell.k}
                  </span>
                  <span className="flex items-center gap-2 text-[15px] tracking-[-0.01em] text-text sm:text-[16px] md:text-[18px]">
                    {cell.pulse && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 animate-architecture-pulse rounded-full bg-accent"
                        style={{ boxShadow: "0 0 6px var(--color-accent)" }}
                      />
                    )}
                    {cell.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
