"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { HeroContent } from "@/lib/content";
import { EASE } from "@/components/velory/FadeIn";

const DEFAULT_SOCIAL: Record<string, string> = {
  linkedin: "https://www.linkedin.com/in/zamanbayezid/",
  github: "https://github.com/mzamanb",
  behance: "https://www.behance.net/zamanbayezid",
};

export default function Hero({ data }: { data: HeroContent }) {
  const portrait = data.portrait || "/images/mentor-hero.png";
  const ctaLabel = data.ctaLabel || "Book a Quick Call";
  const social = data.social || DEFAULT_SOCIAL;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-16"
    >
      <div className="accent-glow" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 md:pt-24">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6 text-[14px] text-text-secondary md:max-w-xl"
            >
              {data.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="font-display text-text"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              {data.title[0]}
              <br />
              <span className="text-accent">{data.title[1]}</span>
              <br />
              {data.title[2]}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="relative mx-auto w-full max-w-[280px] lg:mx-0"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border-strong)]">
              <Image
                src={portrait}
                alt={data.name}
                fill
                className="object-cover"
                sizes="280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <a
              href="#contact"
              className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[var(--color-border-strong)] bg-bg-card px-5 py-3 shadow-architecture transition-transform hover:scale-[1.02]"
            >
              <span className="text-left">
                <span className="block text-[11px] uppercase tracking-wider text-text-muted">
                  {ctaLabel}
                </span>
                <span className="block text-[13px] font-semibold text-text">
                  / with {data.name.split(" ")[0]}
                </span>
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-white">
                →
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-16 flex flex-wrap items-center gap-6 border-t border-[var(--color-border)] pt-8"
        >
          {Object.entries(social).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-accent"
            >
              {name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
