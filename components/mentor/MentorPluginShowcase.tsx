"use client";

import { motion } from "motion/react";
import { Sparkles, AlertTriangle, AlertCircle, Check } from "lucide-react";

type Tab = { id: string; label: string };
type Health = { label: string; pct: number };
type Observation = {
  severity: "error" | "warn";
  issue: string;
  suggestion?: string;
  on?: string;
};

const TABS: Tab[] = [
  { id: "mentor", label: "Mentor" },
  { id: "review", label: "Review" },
  { id: "system", label: "System" },
  { id: "tools", label: "Tools" },
];

const HEALTH: Health[] = [
  { label: "Colors tokenized", pct: 86 },
  { label: "Text styles linked", pct: 74 },
  { label: "Effects styled", pct: 60 },
  { label: "Spacing tokenized", pct: 52 },
];

const OBSERVATIONS: Observation[] = [
  {
    severity: "error",
    issue: "CTA contrast 3.8:1 fails AA",
    suggestion: "Use color/text/inverted on accent",
    on: "Hero / Primary · CTA",
  },
  {
    severity: "warn",
    issue: "Inter 32 / 700 not linked to a text style",
    suggestion: "Nearest match: text/heading/lg",
    on: "Hero · Headline",
  },
  {
    severity: "warn",
    issue: "#F3A847 is not a system token",
    suggestion: "Nearest match: color/brand/orange/500",
    on: "Hero · Background",
  },
];

function SeverityTag({ severity }: { severity: "error" | "warn" }) {
  if (severity === "error") {
    return (
      <span className="inline-flex h-fit items-center gap-1 rounded-md border border-red-500/30 bg-red-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-red-500">
        <AlertCircle size={9} />
        Err
      </span>
    );
  }
  return (
    <span className="inline-flex h-fit items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-amber-600">
      <AlertTriangle size={9} />
      Warn
    </span>
  );
}

export function MentorPluginShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, var(--color-accent-dim), transparent 70%)",
        }}
      />

      <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/85 shadow-architecture backdrop-blur-xl">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
          }}
        />

        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-soft text-sm font-bold text-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.5)]">
              M
            </div>
            <div>
              <div className="text-[12.5px] font-semibold tracking-tight">
                MENTOR
              </div>
              <div className="text-[9.5px] font-medium uppercase tracking-[0.18em] text-text-muted">
                Figma plugin · v0.1
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 animate-architecture-pulse rounded-full bg-accent" />
            Live
          </span>
        </div>

        <div className="border-b border-[var(--color-border-subtle)] px-4 py-2.5">
          <div className="flex gap-0.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 p-0.5">
            {TABS.map((t) => {
              const active = t.id === "system";
              return (
                <span
                  key={t.id}
                  className={
                    active
                      ? "flex-1 rounded-full bg-accent px-2.5 py-1 text-center text-[11px] font-semibold text-white shadow-[0_2px_8px_-2px_rgba(16,185,129,0.5)]"
                      : "flex-1 rounded-full px-2.5 py-1 text-center text-[11px] font-medium text-text-muted"
                  }
                >
                  {t.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 px-4 py-2.5">
          <div className="min-w-0">
            <div className="truncate text-[12px] font-semibold tracking-tight">
              Hero / Primary
            </div>
            <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-text-muted">
              FRAME · 1440 × 720
            </div>
          </div>
          <span className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-2.5 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.16em] text-text-muted">
            Focus →
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 p-4">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="mb-0.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                  System health
                </div>
                <div className="text-[11.5px] text-text-secondary">
                  Tokenization across the file
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-br from-accent to-[var(--color-accent-glow)] bg-clip-text text-4xl font-bold leading-none tracking-tight text-transparent">
                  B
                </div>
                <div className="mt-0.5 text-[9.5px] uppercase tracking-[0.16em] text-text-muted">
                  Good
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {HEALTH.map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-[10.5px]">
                    <span className="text-text-secondary">{row.label}</span>
                    <span className="font-mono tabular-nums text-text">
                      {row.pct}%
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-[var(--color-bg-elevated)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-[var(--color-accent-glow)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <div className="mb-0.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Observations
                </div>
                <div className="text-[11.5px] text-text-secondary">
                  3 issues detected
                </div>
              </div>
              <span className="rounded-md border border-red-500/30 bg-red-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-red-500">
                1 err · 2 warn
              </span>
            </div>

            <ul className="divide-y divide-[var(--color-border-subtle)] border-t border-[var(--color-border-subtle)]">
              {OBSERVATIONS.map((o, i) => (
                <li key={i} className="px-4 py-3">
                  <div className="flex items-start gap-2.5">
                    <SeverityTag severity={o.severity} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11.5px] leading-snug text-text">
                        {o.issue}
                      </div>
                      {o.suggestion ? (
                        <div className="mt-1 text-[10.5px] leading-snug text-accent">
                          ↳ {o.suggestion}
                        </div>
                      ) : null}
                      {o.on ? (
                        <div className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.16em] text-text-muted">
                          on · {o.on}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-[var(--color-border-subtle)] p-3">
              <div className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[11px] font-semibold text-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.5)]">
                <Sparkles size={11} />
                Apply all 3 fixes
                <Check size={11} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 px-4 py-2.5 text-[9.5px] font-medium uppercase tracking-[0.16em] text-text-muted">
          <span className="flex items-center gap-1.5 text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Ready
          </span>
          <span className="opacity-30">·</span>
          <span>acme-brand-v4</span>
          <span className="opacity-30">·</span>
          <span>1 selected</span>
          <span className="ml-auto font-mono normal-case tracking-normal">
            ⌘ K
          </span>
        </div>
      </div>
    </motion.div>
  );
}
