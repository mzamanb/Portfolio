"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function WhatsNext() {
  return (
    <section
      id="whats-next"
      className="relative px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            What&apos;s Next
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Currently shipping
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl border border-border-subtle bg-bg-card/50 transition-all hover:border-accent/30 hover:bg-bg-card"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0%, var(--color-accent-dim), transparent 55%)",
            }}
          />

          <Link
            href="/mentor-ai"
            className="relative grid gap-10 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:p-12"
            aria-label="MENTOR coming soon"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg shadow-sm">
              <span className="font-serif text-2xl font-semibold tracking-tight text-text">
                M
              </span>
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  In testing
                </span>
                <span className="rounded-full border border-border-subtle px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  Figma plugin
                </span>
              </div>

              <h3 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
                MENTOR — Design System Co-pilot for Figma
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                A Figma plugin that maintains your design system automatically.
                In testing. Shipping soon.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text transition-all group-hover:border-accent/40 group-hover:bg-bg-elevated">
                Coming soon
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
