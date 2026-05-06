"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
      <span className="h-px w-6 bg-accent/60" />
      {children}
    </p>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const { fullContent: content } = study;

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-architecture-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_60%)]" />

      <div className="fixed left-0 right-0 top-0 z-50">
        <div className="px-4 pt-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/70 px-5 py-3 shadow-architecture backdrop-blur-xl">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary transition-colors hover:text-text"
            >
              <ArrowLeft size={14} />
              Back to portfolio
            </Link>
            <span className="hidden truncate text-[12px] font-semibold uppercase tracking-[0.18em] text-text-muted sm:inline">
              {study.title}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Case study
            </span>
          </div>
        </div>
      </div>

      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40">
        <FadeIn>
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            {study.label}
          </span>
          <h1 className="mb-4 text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            {study.title}{" "}
            <span className="text-text-muted">{study.subtitle}</span>
          </h1>
          <p className="mb-12 max-w-3xl text-[15.5px] leading-relaxed text-text-secondary">
            {content.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mb-16 aspect-video overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-architecture">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.impact.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 p-5 text-center backdrop-blur"
              >
                <p className="mb-1 text-2xl font-semibold tracking-tight text-accent">
                  {item.value}
                </p>
                <p className="text-[13px] font-semibold">{item.label}</p>
                <p className="mt-1 text-[11.5px] text-text-muted">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {[
              { label: "My role", body: content.role },
              { label: "Timeline", body: content.timeline },
              { label: "Tools & tech", body: content.tools },
            ].map((meta) => (
              <div
                key={meta.label}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-6 backdrop-blur"
              >
                <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {meta.label}
                </p>
                <p className="text-[13.5px] leading-relaxed text-text-secondary">
                  {meta.body}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {content.showcaseImage && (
          <FadeIn>
            <section className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                  }}
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  UI design
                </span>
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-accent), transparent)",
                  }}
                />
              </div>
              <div className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-architecture">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={content.showcaseImage.url}
                    alt={content.showcaseImage.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 960px"
                  />
                </div>
                <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/80 px-6 py-3 backdrop-blur">
                  <p className="text-[13px] text-text-secondary">
                    {content.showcaseImage.caption}
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>
        )}

        <FadeIn>
          <section className="mb-16">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mb-4 text-2xl font-medium tracking-tight md:text-[1.75rem]">
              What we set out to solve
            </h2>
            <p className="mb-8 max-w-3xl text-[14.5px] leading-relaxed text-text-secondary">
              {content.problem}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.challenges.map((challenge, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-5 backdrop-blur md:p-6"
                >
                  <span className="font-mono text-2xl font-medium text-accent/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-text-secondary">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {content.solutions.map((solution, i) => (
          <FadeIn key={i}>
            <section className="mb-16">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-[13px] font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-medium tracking-tight md:text-[1.5rem]">
                  {solution.title}
                </h3>
              </div>
              <p className="mb-5 max-w-3xl text-[14.5px] leading-relaxed text-text-secondary">
                {solution.problem}
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-6 backdrop-blur">
                <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Process
                </p>
                <ul className="space-y-2">
                  {solution.process.map((step, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-text-secondary"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {solution.showcaseImages && solution.showcaseImages.length > 0 && (
                <div
                  className={`grid gap-4 ${
                    solution.showcaseImages.length > 1
                      ? "sm:grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {solution.showcaseImages.map((img, j) => (
                    <div
                      key={j}
                      className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] transition-all hover:border-[var(--color-border)]"
                    >
                      <div
                        className={`relative w-full ${
                          solution.showcaseImages!.length === 1
                            ? "aspect-[16/10]"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={img.url}
                          alt={img.caption}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes={
                            solution.showcaseImages!.length === 1
                              ? "(max-width: 1024px) 100vw, 960px"
                              : "(max-width: 640px) 100vw, 480px"
                          }
                        />
                      </div>
                      <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/80 px-5 py-3 backdrop-blur">
                        <p className="text-[12px] leading-relaxed text-text-muted">
                          {img.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </FadeIn>
        ))}

        <FadeIn>
          <section className="mb-16 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/60 p-8 backdrop-blur-md md:p-12">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
              }}
            />
            <Eyebrow>Reflection</Eyebrow>
            <h2 className="mb-8 text-2xl font-medium tracking-tight md:text-[1.875rem]">
              Learnings &amp; outcomes
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Outcomes
                </p>
                <ul className="space-y-2">
                  {content.outcomes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-text-secondary"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Key learnings
                </p>
                <ul className="space-y-2">
                  {content.learnings.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-text-secondary"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn className="text-center">
          <Link
            href="/#work"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/40 px-5 text-[13px] font-semibold text-text-secondary backdrop-blur transition-all hover:border-accent/40 hover:text-accent"
          >
            <ArrowLeft size={14} />
            Back to all work
          </Link>
        </FadeIn>
      </main>
    </div>
  );
}
