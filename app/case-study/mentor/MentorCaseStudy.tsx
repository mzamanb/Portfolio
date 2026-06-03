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

/* ── Convergence Map ── */
function ConvergenceMap() {
  const platforms: { x: number; y: number; label: string; mentor?: boolean }[] = [
    { x: 28,  y: 22,  label: "Codedex" },
    { x: 42,  y: 36,  label: "Scrimba" },
    { x: 72,  y: 20,  label: "MENTOR",  mentor: true },
    { x: 88,  y: 34,  label: "The Odin Project" },
    { x: 63,  y: 44,  label: "Bootcamps" },
    { x: 20,  y: 66,  label: "Codecademy" },
    { x: 35,  y: 78,  label: "freeCodeCamp" },
    { x: 50,  y: 88,  label: "Khan Academy" },
    { x: 68,  y: 70,  label: "Udemy" },
    { x: 88,  y: 84,  label: "YouTube" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]" style={{ paddingBottom: "62%" }}>
      <div className="absolute inset-0 p-6 sm:p-10">
        {/* Quadrant backgrounds */}
        <div className="absolute inset-6 sm:inset-10 overflow-hidden rounded-xl">
          <div className="absolute left-0 top-0 h-1/2 w-1/2 bg-[var(--color-bg-card)] opacity-80" />
          <div className="absolute right-0 top-0 h-1/2 w-1/2 rounded-tr-xl" style={{ background: "rgba(127,119,221,0.07)" }} />
          <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-[var(--color-bg-card)] opacity-50" />
          <div className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-[var(--color-bg-card)] opacity-50" />
        </div>

        {/* Axes */}
        <div className="absolute inset-6 sm:inset-10">
          {/* Vertical axis */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border-strong)]" />
          {/* Horizontal axis */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-border-strong)]" />

          {/* Axis labels */}
          <span className="absolute left-1/2 top-1 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted whitespace-nowrap">
            ↑ Coherent instruction
          </span>
          <span className="absolute left-1/2 bottom-1 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted whitespace-nowrap">
            Fragmented instruction ↓
          </span>
          <span className="absolute top-1/2 left-1 -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.08em] text-text-muted whitespace-nowrap" style={{ writingMode: "unset" }}>
            ← Browser
          </span>
          <span className="absolute top-1/2 right-1 -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.08em] text-text-muted whitespace-nowrap">
            Real env →
          </span>

          {/* "Valuable quadrant" label */}
          <div
            className="absolute right-[4%] top-[4%] rounded-lg px-2.5 py-1.5"
            style={{ background: "rgba(127,119,221,0.12)", border: "1px solid rgba(127,119,221,0.25)" }}
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: "#7f77dd" }}>
              Target quadrant
            </span>
          </div>

          {/* Platform dots */}
          {platforms.map((p) => (
            <div
              key={p.label}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {p.mentor ? (
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute h-9 w-9 animate-architecture-pulse rounded-full opacity-30"
                    style={{ background: "#7f77dd" }}
                  />
                  <div
                    className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-white"
                    style={{ background: "#7f77dd", boxShadow: "0 0 16px rgba(127,119,221,0.6)" }}
                  >
                    M
                  </div>
                  <span
                    className="absolute top-7 whitespace-nowrap font-mono text-[9px] font-bold"
                    style={{ color: "#7f77dd", left: "50%", transform: "translateX(-50%)" }}
                  >
                    MENTOR
                  </span>
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
                  <span
                    className="absolute top-4 whitespace-nowrap font-mono text-[8px] text-text-muted"
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                  >
                    {p.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MentorCaseStudy({ study }: { study: CaseStudy }) {
  const { fullContent: c } = study;

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)]">
      {/* Floating nav bar */}
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
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted sm:inline">
              MENTOR — IDE Learning System
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
              {study.label}
            </span>
          </div>
        </div>
      </div>

      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40">

        {/* ── Hero ── */}
        <FadeIn>
          <span
            className="mb-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ background: "rgba(127,119,221,0.12)", color: "#7f77dd", border: "1px solid rgba(127,119,221,0.3)" }}
          >
            {study.label}
          </span>
          <h1
            className="mb-4 leading-[1.02] tracking-[-0.03em] text-text"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", fontWeight: 800 }}
          >
            MENTOR{" "}
            <span className="font-light text-text-muted">IDE Learning System</span>
          </h1>
          <p className="mb-6 max-w-3xl text-[17px] font-light leading-relaxed text-text-secondary">
            {c.intro}
          </p>

          {/* Pull quote from whitepaper */}
          <blockquote
            className="mb-12 border-l-2 pl-5 text-[15px] italic leading-relaxed text-text-muted"
            style={{ borderColor: "rgba(127,119,221,0.5)" }}
          >
            "A beginner does not fail because the material is too hard. They fail because nothing
            told them what to do next, or because what they learned didn't survive contact with a
            real computer."
          </blockquote>
        </FadeIn>

        {/* ── Cover image ── */}
        <FadeIn delay={0.1}>
          <div className="relative mb-16 aspect-video overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-architecture">
            <Image
              src={study.image}
              alt="MENTOR IDE — VS Code extension lesson panel"
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>

        {/* ── Impact metrics ── */}
        <FadeIn delay={0.1}>
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.impact.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 p-5 text-center backdrop-blur"
              >
                <p
                  className="mb-1 font-bold tracking-tight"
                  style={{ fontSize: "1.75rem", color: "#7f77dd" }}
                >
                  {item.value}
                </p>
                <p className="text-[13px] font-semibold text-text">{item.label}</p>
                <p className="mt-1 text-[11.5px] text-text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Role / timeline / tools ── */}
        <FadeIn>
          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {[
              { label: "My role", body: c.role },
              { label: "Timeline", body: c.timeline },
              { label: "Tools & tech", body: c.tools },
            ].map((meta) => (
              <div
                key={meta.label}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-6 backdrop-blur"
              >
                <p
                  className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#7f77dd" }}
                >
                  {meta.label}
                </p>
                <p className="text-[13.5px] leading-relaxed text-text-secondary">{meta.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── The Problem ── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow>The convergence gap</Eyebrow>
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-[1.875rem]">
              Abundance solved access. It did not solve outcomes.
            </h2>
            <p className="mb-8 max-w-3xl text-[14.5px] leading-relaxed text-text-secondary">
              {c.problem}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {c.challenges.map((ch, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-5 backdrop-blur"
                >
                  <span className="font-mono text-2xl font-bold" style={{ color: "rgba(127,119,221,0.4)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-text-secondary">{ch}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ── Convergence Map ── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow>The map</Eyebrow>
            <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-[1.875rem]">
              One image, one claim.
            </h2>
            <p className="mb-8 max-w-2xl text-[14px] leading-relaxed text-text-muted">
              Every beginner platform takes a position on two axes: instructional coherence and
              environment realism. The valuable quadrant — coherent instruction inside a real
              environment — is nearly empty. MENTOR occupies it at $15/month.
            </p>
            <ConvergenceMap />
            <p className="mt-4 text-center text-[12px] text-text-muted">
              Platforms positioned by environment realism (x) and instructional coherence (y).
              Mentor is the only platform in the top-right quadrant built for absolute beginners at accessible cost.
            </p>
          </section>
        </FadeIn>

        {/* ── Solutions / Principles ── */}
        {c.solutions.map((solution, i) => (
          <FadeIn key={i}>
            <section className="mb-14">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full font-mono text-[13px] font-bold"
                  style={{
                    background: "rgba(127,119,221,0.12)",
                    border: "1px solid rgba(127,119,221,0.3)",
                    color: "#7f77dd",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold tracking-tight md:text-[1.375rem]">
                  {solution.title}
                </h3>
              </div>
              <p className="mb-5 max-w-3xl text-[14.5px] leading-relaxed text-text-secondary">
                {solution.problem}
              </p>
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-6 backdrop-blur">
                <p
                  className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#7f77dd" }}
                >
                  How it was built
                </p>
                <ul className="space-y-2">
                  {solution.process.map((step, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-text-secondary"
                    >
                      <span
                        className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "#7f77dd" }}
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </FadeIn>
        ))}

        {/* ── Outcomes + Learnings ── */}
        <FadeIn>
          <section className="relative mb-16 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/60 p-8 backdrop-blur-md md:p-12">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #7f77dd, transparent)" }}
            />
            <Eyebrow>Reflection</Eyebrow>
            <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-[1.875rem]">
              Outcomes &amp; learnings
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Shipped
                </p>
                <ul className="space-y-2">
                  {c.outcomes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-text-secondary"
                    >
                      <span
                        className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "#7f77dd" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Learnings
                </p>
                <ul className="space-y-2">
                  {c.learnings.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-text-secondary"
                    >
                      <span
                        className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "#7f77dd" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── What's next ── */}
        <FadeIn>
          <div
            className="mb-16 rounded-2xl p-8 text-center"
            style={{ background: "rgba(127,119,221,0.07)", border: "1px solid rgba(127,119,221,0.2)" }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "#7f77dd" }}>
              Where it goes from here
            </p>
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-text-secondary">
              This is a position, not a proof. The next milestone adds learner-outcome data —
              completion rates, transfer metrics, and independent-build rates — measured against
              the same two axes. That is the test the claim has to pass.
            </p>
            <p
              className="mt-6 text-[22px] font-bold italic tracking-tight"
              style={{ color: "#7f77dd" }}
            >
              "Stop teaching beginners in a box the real world doesn't have."
            </p>
          </div>
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
