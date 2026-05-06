"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Bot, ArrowUpRight } from "lucide-react";

export default function WhatsNext() {
  return (
    <section id="whats-next" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            What&apos;s Next
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Currently shipping
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-bg-card md:col-span-3"
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 transition-all group-hover:bg-accent/10" />
            <div className="relative">
              <div className="mb-6 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                <Bot size={24} />
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  In testing
                </span>
                <span className="rounded-full border border-border-subtle px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  Figma plugin
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
                MENTOR — Design System Co-pilot for Figma
              </h3>
              <p className="max-w-4xl leading-relaxed text-text-secondary">
                A Figma plugin that maintains your design system automatically.
                In testing. Shipping soon.
              </p>

              <Link
                href="/mentor-ai"
                aria-label="MENTOR coming soon"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text transition-all hover:border-accent/40 hover:bg-bg-elevated"
              >
                Coming soon
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
