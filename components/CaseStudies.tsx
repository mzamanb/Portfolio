"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import FadeIn from "@/components/velory/FadeIn";
import SectionLabel from "@/components/velory/SectionLabel";
import { EASE } from "@/components/velory/FadeIn";

function FeaturedStudy({ study }: { study: CaseStudy }) {
  return (
    <FadeIn>
      <Link href={`/case-study/${study.slug}`} className="group block">
        <div className="grid min-h-[480px] overflow-hidden rounded-2xl border border-[var(--color-border)] md:grid-cols-2">
          <div className="flex flex-col justify-between bg-bg-card p-8 md:p-12">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {study.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-[11px] text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3
                className="font-display text-text"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {study.title}
              </h3>
              <p className="mt-2 text-[15px] text-accent">{study.subtitle}</p>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-text-secondary">
                {study.description}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-text transition-all group-hover:gap-3.5">
              See the project
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>

          <div className="relative min-h-[320px] overflow-hidden">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

function StudyCard({ study, delay }: { study: CaseStudy; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <Link href={`/case-study/${study.slug}`} className="group block">
        <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-bg-card">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-[12px] uppercase tracking-wider text-white/60">
                {study.tags[0]}
              </p>
              <h3
                className="mt-1 font-display text-white"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                }}
              >
                {study.title}
              </h3>
              <p className="text-[13px] text-white/70">{study.subtitle}</p>
            </div>
            <ArrowUpRight
              size={20}
              className="absolute right-6 top-6 text-white/80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}

export default function CaseStudies({ data }: { data: CaseStudy[] }) {
  const [featured, ...rest] = data;

  return (
    <section id="work" className="section-cream px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <SectionLabel dark>Our Work</SectionLabel>
          <h2
            className="font-display text-[var(--color-text-dark)]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Projects That Reflect Design Excellence
          </h2>
        </motion.div>

        {featured && (
          <div className="mb-6">
            <FeaturedStudy study={featured} />
          </div>
        )}

        {rest.length > 0 && (
          <div
            className={`grid gap-6 ${rest.length === 1 ? "grid-cols-1" : "md:grid-cols-2"}`}
          >
            {rest.map((study, i) => (
              <StudyCard key={study.id} study={study} delay={i * 0.08} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
