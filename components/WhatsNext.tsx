"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TOKEN_ROWS = [
  { swatch: "#10B981", label: "color/accent/primary", value: "#10B981" },
  { swatch: "#34D399", label: "color/accent/secondary", value: "#34D399" },
  { swatch: "#0A0A0A", label: "color/surface/base", value: "#0A0A0A", ring: true },
  { swatch: null, label: "radius/card", value: "12px" },
  { swatch: null, label: "spacing/scale", value: "4·8·12·16", icon: true },
];

function MentorVisual() {
  return (
    <div className="relative h-full min-h-[320px]">
      {/* Grid bg */}
      <div
        className="absolute inset-0 rounded-xl opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-subtle) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex h-full flex-col gap-2.5 pt-1">
        {TOKEN_ROWS.map((row) => (
          <div
            key={row.label}
            className="grid items-center gap-3 rounded-lg border border-[var(--color-border)] px-3.5 py-2.5"
            style={{
              gridTemplateColumns: "20px 1fr auto",
              background: "var(--color-bg-card)",
              fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
              fontSize: 11,
            }}
          >
            <span
              className="h-5 w-5 shrink-0 rounded"
              style={{
                background: row.swatch ?? "transparent",
                border: row.ring
                  ? "1px solid var(--color-border-strong)"
                  : row.swatch
                    ? "none"
                    : "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {row.icon && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                  <path d="M4 4h16M4 12h10M4 20h16" />
                </svg>
              )}
            </span>
            <span className="text-text-secondary">{row.label}</span>
            <span className="text-text-muted">{row.value}</span>
          </div>
        ))}

        <div
          className="mt-auto flex items-center justify-between rounded-lg px-3.5 py-3"
          style={{
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.25)",
            fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
            fontSize: 11,
          }}
        >
          <span className="text-accent">$ mentor sync —tokens</span>
          <span className="text-text-muted">27 updates</span>
        </div>
      </div>
    </div>
  );
}

export default function WhatsNext() {
  return (
    <section id="mentor" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12 grid gap-6 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <span className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
              <span className="h-px w-6 bg-accent" />
              Currently shipping
            </span>
            <h2 className="text-3xl font-normal tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.05]">
              MENTOR
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary md:col-span-5 md:text-[15px]">
            A focused side-product, born out of years of design-system upkeep.
            In testing now — coming to the Figma Community soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="glass-shell">
            <div className="glass-inner shadow-architecture">
              <div className="grid gap-0 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
                {/* Left */}
                <div className="pr-0 md:pr-8">
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">
                      <span className="h-1.5 w-1.5 animate-architecture-pulse rounded-full bg-accent" />
                      In testing
                    </span>
                    <span className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-text-muted">
                      Figma plugin
                    </span>
                  </div>

                  <h3 className="text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] text-text md:text-[2.5rem]">
                    MENTOR
                    <span className="ml-3 text-xl text-text-muted">—</span>
                    <span className="mt-2 block text-[1.5rem] font-light leading-[1.2] text-text-secondary md:text-[2rem]">
                      a design-system co-pilot for Figma.
                    </span>
                  </h3>
                  <p className="mt-6 max-w-xl text-[15px] font-light leading-[1.7] text-text-secondary">
                    MENTOR maintains your design system automatically — detecting drift, syncing tokens, and proposing structural fixes as the system evolves. Currently in testing, shipping soon.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/mentor-ai"
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-medium text-[#051912] transition-all hover:bg-accent-soft"
                    >
                      Learn more
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href="#contact"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-transparent px-5 text-[14px] font-normal text-text transition-all hover:border-accent hover:text-accent"
                    >
                      Join the beta
                    </Link>
                  </div>
                </div>

                {/* Right — token visual */}
                <div className="mt-8 border-t border-[var(--color-border)] pt-8 md:mt-0 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <MentorVisual />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
