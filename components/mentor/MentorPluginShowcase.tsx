"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

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
      <span className="inline-flex h-fit items-center rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-400">
        Error
      </span>
    );
  }
  return (
    <span className="inline-flex h-fit items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
      Warn
    </span>
  );
}

export function MentorPluginShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-lg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, var(--color-accent-dim), transparent 70%)",
        }}
      />

      <div className="overflow-hidden rounded-3xl border border-border-subtle bg-bg-card/80 shadow-2xl shadow-black/30 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border-subtle bg-bg/40 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-purple-400 text-base font-bold text-bg shadow-lg shadow-accent/25">
              M
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-text">
                MENTOR
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-text-muted">
                Figma plugin
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Live
          </span>
        </div>

        <div className="border-b border-border-subtle px-5 py-3">
          <div className="flex gap-1 rounded-full border border-border-subtle bg-bg/40 p-1">
            {TABS.map((t) => {
              const active = t.id === "system";
              return (
                <span
                  key={t.id}
                  className={
                    active
                      ? "flex-1 rounded-full bg-accent px-3 py-1.5 text-center text-xs font-semibold text-bg shadow-sm shadow-accent/20"
                      : "flex-1 rounded-full px-3 py-1.5 text-center text-xs font-medium text-text-muted"
                  }
                >
                  {t.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-bg/40 px-5 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium tracking-tight text-text">
              Hero / Primary
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
              FRAME · 1440 × 720
            </div>
          </div>
          <span className="rounded-full border border-border-subtle px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted">
            Focus →
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-2xl border border-border-subtle bg-bg/40 p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[10px] font-medium uppercase tracking-widest text-accent">
                  System Health
                </div>
                <div className="text-sm text-text-secondary">
                  Tokenization across the file
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-br from-accent to-purple-400 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent">
                  B
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-text-muted">
                  Good
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              {HEALTH.map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-text-secondary">{row.label}</span>
                    <span className="font-mono text-text">{row.pct}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-bg-elevated">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-purple-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-bg/40">
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <div className="mb-1 text-[10px] font-medium uppercase tracking-widest text-accent">
                  Observations
                </div>
                <div className="text-sm text-text-secondary">
                  3 issues detected
                </div>
              </div>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-400">
                1 error · 2 warns
              </span>
            </div>

            <ul className="divide-y divide-border-subtle border-t border-border-subtle">
              {OBSERVATIONS.map((o, i) => (
                <li key={i} className="px-5 py-3.5">
                  <div className="flex items-start gap-3">
                    <SeverityTag severity={o.severity} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm leading-snug text-text">
                        {o.issue}
                      </div>
                      {o.suggestion ? (
                        <div className="mt-1 text-xs leading-snug text-accent">
                          ↳ {o.suggestion}
                        </div>
                      ) : null}
                      {o.on ? (
                        <div className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                          on · {o.on}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border-subtle p-4">
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-bg shadow-sm shadow-accent/20">
                <Sparkles size={12} />
                Apply all 3 fixes
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-subtle bg-bg/40 px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-text-muted">
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
