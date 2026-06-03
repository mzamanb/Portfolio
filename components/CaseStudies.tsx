"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Featured study — full-width split */
function FeaturedStudy({ study }: { study: CaseStudy }) {
  return (
    <FadeIn>
      <Link href={`/case-study/${study.slug}`} className="group block">
        <div className="grid min-h-[520px] md:grid-cols-2">
          {/* Left — text + CTA */}
          <div className="flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 md:p-12">
            <div>
              <div className="mb-6 flex flex-wrap gap-1.5">
                {study.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--color-border-strong)] px-2.5 py-0.5 text-[11px] text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3
                className="text-text"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                {study.title}
              </h3>
              <p className="mt-1 text-[15px] text-text-muted">{study.subtitle}</p>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-text-secondary">
                {study.description}
              </p>
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-text transition-all group-hover:gap-3.5">
                See the project
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* Right — full-bleed image */}
          <div className="relative min-h-[320px] overflow-hidden border border-l-0 border-[var(--color-border)]">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

/* Smaller card — for grid */
function StudyCard({ study, delay }: { study: CaseStudy; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <Link href={`/case-study/${study.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
          {/* Card header — name + tags + description */}
          <div className="bg-[var(--color-bg-card)] px-6 py-5">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {study.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--color-border-strong)] px-2 py-0.5 text-[10px] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3
              className="flex items-center justify-between text-text"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.025em" }}
            >
              {study.title}
              <ArrowUpRight
                size={18}
                className="shrink-0 text-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
              />
            </h3>
            <p className="text-[13px] text-text-muted">{study.subtitle}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
              {study.description}
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
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

export default function CaseStudies({ data }: { data: CaseStudy[] }) {
  const [featured, ...rest] = data;

  return (
    <section id="work" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section label — td-moro style: small, top-right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12 flex items-end justify-between"
        >
          <span
            className="text-text"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
          >
            Case studies.
          </span>
          <span className="hidden text-[13px] text-text-muted md:block">
            {data.length} selected projects
          </span>
        </motion.div>

        {/* Featured split layout */}
        {featured && (
          <div className="mb-4">
            <FeaturedStudy study={featured} />
          </div>
        )}

        {/* Card grid — remaining */}
        {rest.length > 0 && (
          <div className={`grid gap-4 ${rest.length === 1 ? "grid-cols-1" : "md:grid-cols-2"}`}>
            {rest.map((study, i) => (
              <StudyCard key={study.id} study={study} delay={i * 0.08} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
