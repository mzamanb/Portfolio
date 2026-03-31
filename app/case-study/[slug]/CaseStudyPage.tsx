"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { isEmcanCaseStudy } from "@/lib/design-system/emcan";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const { fullContent: content } = study;
  const emcanDs = isEmcanCaseStudy(study.id);

  return (
    <div
      className="min-h-screen bg-bg"
      {...(emcanDs ? { "data-design-system": "emcan" } : {})}
    >
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <span className="text-sm text-text-muted">{study.title}</span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 pt-28 pb-20">
        {/* Header */}
        <FadeIn>
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
            {study.label}
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            {study.title}{" "}
            <span className="text-text-muted">{study.subtitle}</span>
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
            {content.intro}
          </p>
        </FadeIn>

        {/* Hero image */}
        <FadeIn delay={0.1}>
          <div className="relative mb-16 aspect-video overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>

        {/* Impact metrics */}
        <FadeIn delay={0.1}>
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.impact.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border-subtle bg-bg-card/50 p-6 text-center"
              >
                <p className="mb-1 text-2xl font-bold text-accent">
                  {item.value}
                </p>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Role / Timeline / Tools */}
        <FadeIn>
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border-subtle bg-bg-card/50 p-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                My Role
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                {content.role}
              </p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-bg-card/50 p-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                Timeline
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                {content.timeline}
              </p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-bg-card/50 p-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                Tools & Tech
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                {content.tools}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* UI Showcase — overview */}
        {content.showcaseImage && (
          <FadeIn>
            <section className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                <span className="text-xs font-medium uppercase tracking-widest text-accent">
                  UI Design
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-accent/30 to-transparent" />
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={content.showcaseImage.url}
                    alt={content.showcaseImage.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 960px"
                  />
                </div>
                <div className="border-t border-border-subtle bg-bg-card/80 px-6 py-3 backdrop-blur-sm">
                  <p className="text-sm text-text-secondary">
                    {content.showcaseImage.caption}
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>
        )}

        {/* The Problem */}
        <FadeIn>
          <section className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">The Problem</h2>
            <p className="mb-8 max-w-3xl leading-relaxed text-text-secondary">
              {content.problem}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.challenges.map((challenge, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-border-subtle bg-bg-card/50 p-6"
                >
                  <span className="text-2xl font-bold text-accent/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Solutions */}
        {content.solutions.map((solution, i) => (
          <FadeIn key={i}>
            <section className="mb-16">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold">{solution.title}</h3>
              </div>
              <p className="mb-4 max-w-3xl text-text-secondary">
                {solution.problem}
              </p>
              <div className="mb-6 rounded-xl border border-border-subtle bg-bg-card/50 p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">
                  Process
                </p>
                <ul className="space-y-2">
                  {solution.process.map((step, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution UI showcase */}
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
                      className="group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated transition-all hover:border-accent/30"
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
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes={
                            solution.showcaseImages!.length === 1
                              ? "(max-width: 1024px) 100vw, 960px"
                              : "(max-width: 640px) 100vw, 480px"
                          }
                        />
                      </div>
                      <div className="border-t border-border-subtle bg-bg-card/80 px-5 py-3 backdrop-blur-sm">
                        <p className="text-xs leading-relaxed text-text-muted">
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

        {/* Learnings */}
        <FadeIn>
          <section className="mb-16 rounded-2xl border border-border-subtle bg-bg-card/50 p-8">
            <h2 className="mb-6 text-2xl font-bold">Learnings & Reflection</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">
                  Outcomes
                </p>
                <ul className="space-y-2">
                  {content.outcomes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">
                  Key Learnings
                </p>
                <ul className="space-y-2">
                  {content.learnings.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Back link */}
        <FadeIn className="text-center">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:border-accent hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to All Work
          </Link>
        </FadeIn>
      </main>
    </div>
  );
}
