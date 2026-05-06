import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { getContent } from "@/lib/content";
import { MentorPluginShowcase } from "@/components/mentor/MentorPluginShowcase";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const base = content.seo.siteUrl || "https://www.zamandesigns.com";
  const title = "MENTOR — Coming Soon";
  const description =
    "MENTOR is a Figma plugin that acts as an autonomous design system maintainer. Currently in testing. Shipping soon.";

  return {
    title,
    description,
    openGraph: {
      title: `${content.hero.name} — ${title}`,
      description,
      url: `${base}/mentor-ai`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${base}/mentor-ai` },
  };
}

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="h-1.5 w-1.5 animate-architecture-pulse rounded-full bg-accent" />
      In testing · Shipping soon
    </span>
  );
}

export default function MentorAiPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-architecture-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="px-4 pt-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/70 px-5 py-3 shadow-architecture backdrop-blur-xl md:px-6 md:py-3.5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary transition-colors hover:text-text"
            >
              <ArrowLeft size={14} />
              Back to portfolio
            </Link>
            <span className="hidden text-[12px] font-semibold uppercase tracking-[0.18em] text-text-muted sm:inline">
              MENTOR
            </span>
            <Link
              href="/mentor"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
            >
              Capabilities
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </header>

      <main className="px-6 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-12 md:grid-cols-12 md:items-center md:gap-12 lg:gap-16">
            <div className="md:col-span-7">
              <div className="mb-6">
                <StatusPill />
              </div>
              <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-6 bg-accent/60" />
                Figma plugin · Coming soon
              </p>
              <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em]">
                MENTOR — the design system that{" "}
                <span className="bg-gradient-to-r from-accent via-accent-soft to-[var(--color-accent-glow)] bg-clip-text text-transparent">
                  maintains itself
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-text-secondary md:text-base">
                Design system maintenance, automated. MENTOR watches your Figma
                file, finds what&apos;s broken, and proposes fixes you can
                review and approve.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#notify"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:bg-accent-hover hover:shadow-[0_10px_30px_-6px_rgba(16,185,129,0.7)]"
                >
                  Get launch updates
                  <ArrowRight size={13} />
                </a>
                <Link
                  href="/mentor"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/40 px-5 text-[13px] font-semibold text-text backdrop-blur transition-all hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]"
                >
                  Read the deep dive
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <MentorPluginShowcase />
              <p className="mt-4 text-center text-[10.5px] font-medium uppercase tracking-[0.18em] text-text-muted">
                Static preview · final UI evolving in testing
              </p>
            </div>
          </section>

          <section className="mt-24 grid gap-5 md:mt-32 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "The problem",
                body: "Design systems drift. Colors get unlinked. Naming gets inconsistent. Someone has to catch it — and that someone is usually a designer doing it manually at 11pm.",
              },
              {
                num: "02",
                title: "The solution",
                body: "MENTOR scans your file locally for token, style, and naming drift, then proposes safe, system-aligned fixes you can accept, iterate, or reject.",
              },
              {
                num: "03",
                title: "What MENTOR is",
                body: "An autonomous design system maintainer for Figma. You focus on creativity. MENTOR handles token binding, style organisation, naming, and quality scoring.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-7 backdrop-blur-md transition-all hover:border-[var(--color-border)] md:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-border-strong), transparent)",
                  }}
                />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {card.num}
                </span>
                <h3 className="mb-3 mt-2 text-base font-semibold tracking-tight text-text">
                  {card.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-text-secondary">
                  {card.body}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-24 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/60 backdrop-blur-md md:mt-32">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
              }}
            />
            <div className="grid gap-12 p-8 md:grid-cols-2 md:p-12">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  <span className="h-px w-6 bg-accent/60" />
                  What it does
                </p>
                <h2 className="mb-5 text-3xl font-medium tracking-tight md:text-[2rem] md:leading-[1.1]">
                  A quiet co-pilot for your design system
                </h2>
                <p className="mb-4 text-[14.5px] leading-relaxed text-text-secondary">
                  Most plugins generate or theme. MENTOR maintains. It watches
                  your file, scores its health, and keeps it grade-A as the
                  product grows — without you babysitting Variables, Styles, or
                  the Assets panel.
                </p>
                <p className="text-[13.5px] leading-relaxed text-text-muted">
                  Built on top of Figma&apos;s Variables, Styles, and Component
                  APIs. Local-first scanning means most operations cost zero AI
                  tokens — Claude is called only for the few decisions that
                  need judgement.
                </p>
              </div>
              <ul className="grid gap-2 self-center">
                {[
                  "Color, type, effect, and spacing scanners with near-duplicate detection",
                  "Token creation + binding (Light / Dark modes, slash-path naming)",
                  "Health score with letter grade and weighted dimensions",
                  "Drift check + batch fix on selection or whole file",
                  "Component generation across 21 atomic / molecular / organism types",
                  "Accessibility audit (WCAG AA / AAA contrast and font size checks)",
                  "Watch mode for semi-automatic binding as you design",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 px-4 py-3 text-[13px] leading-relaxed text-text-secondary"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-24 grid gap-5 md:mt-32 md:grid-cols-3">
            {[
              { label: "Status", value: "Currently in testing" },
              { label: "Launch", value: "Q2 2026 · Figma Community" },
              { label: "Built by", value: "A solo designer, for designers" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/40 p-6 text-center backdrop-blur md:p-8"
              >
                <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {stat.label}
                </p>
                <p className="text-base font-semibold tracking-tight md:text-lg">
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          <section
            id="notify"
            className="mt-24 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/60 p-8 backdrop-blur-md md:mt-32 md:p-12"
          >
            <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  <span className="h-px w-6 bg-accent/60" />
                  Launch list
                </p>
                <h2 className="mb-3 text-3xl font-medium tracking-tight md:text-[2rem]">
                  Be first to know when it launches
                </h2>
                <p className="text-[14.5px] leading-relaxed text-text-secondary">
                  No newsletter. No spam. One email when MENTOR ships to the
                  Figma Community.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@studio.com"
                  className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-5 py-3 text-[13px] text-text outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-accent px-5 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:bg-accent-hover"
                >
                  <Sparkles size={13} />
                  Notify me
                </button>
              </form>
            </div>
          </section>

          <section className="mt-24 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/40 p-8 backdrop-blur-md md:mt-32 md:p-12">
            <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-6 bg-accent/60" />
              Why I&apos;m building it
            </p>
            <blockquote className="border-l-2 border-accent pl-5 text-xl font-medium leading-relaxed text-text md:text-2xl">
              <span className="italic">
                &ldquo;6 years designing solo. I needed a thinking partner. So
                I built one.&rdquo;
              </span>
              <footer className="mt-3 text-[13px] not-italic text-text-muted">
                — Zaman Bayezid
              </footer>
            </blockquote>
          </section>

          <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center md:mt-24">
            <p className="text-[13px] text-text-muted">
              Want to see the full product thinking?
            </p>
            <Link
              href="/mentor"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/40 px-5 text-[13px] font-semibold text-text backdrop-blur transition-all hover:border-accent/40 hover:bg-[var(--color-bg-elevated)]"
            >
              MENTOR — Capabilities &amp; Roadmap
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
