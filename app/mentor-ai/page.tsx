import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
      In testing · Shipping soon
    </span>
  );
}

export default function MentorAiPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
          <span className="text-sm font-medium text-text-muted">MENTOR</span>
          <Link
            href="/mentor"
            className="hidden text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-text sm:inline"
          >
            Capabilities &amp; roadmap →
          </Link>
        </div>
      </header>

      <main className="px-6 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
            <div>
              <div className="mb-6">
                <StatusPill />
              </div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                Figma plugin · Coming soon
              </p>
              <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-text md:text-6xl">
                MENTOR —{" "}
                <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                  the design system that maintains itself
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
                Design system maintenance, automated. MENTOR watches your Figma
                file, finds what&apos;s broken, and proposes fixes you can
                review and approve.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#notify"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
                >
                  Get launch updates
                </a>
                <Link
                  href="/mentor"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-all hover:border-accent/40 hover:bg-bg-elevated"
                >
                  Read the deep dive
                </Link>
              </div>
            </div>

            <div className="relative">
              <MentorPluginShowcase />
              <p className="mt-4 text-center text-xs uppercase tracking-widest text-text-muted">
                Static preview · final UI evolving in testing
              </p>
            </div>
          </section>

          <section className="mt-24 grid gap-6 md:mt-32 md:grid-cols-3">
            {[
              {
                title: "The problem",
                body: "Design systems drift. Colors get unlinked. Naming gets inconsistent. Someone has to catch it — and that someone is usually a designer doing it manually at 11pm.",
              },
              {
                title: "The solution",
                body: "MENTOR scans your file locally for token, style, and naming drift, then proposes safe, system-aligned fixes you can accept, iterate, or reject.",
              },
              {
                title: "What MENTOR is",
                body: "An autonomous design system maintainer for Figma. You focus on creativity. MENTOR handles token binding, style organisation, naming, and quality scoring.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-border-subtle bg-bg-card/40 p-6 transition-colors hover:border-accent/30 md:p-8"
              >
                <h3 className="mb-3 text-lg font-semibold text-text">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {card.body}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-24 grid gap-12 rounded-3xl border border-border-subtle bg-bg-card/40 p-8 md:mt-32 md:grid-cols-2 md:p-12">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
                What it does
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                A quiet co-pilot for your design system
              </h2>
              <p className="mb-6 leading-relaxed text-text-secondary">
                Most plugins generate or theme. MENTOR maintains. It watches
                your file, scores its health, and keeps it grade-A as the
                product grows — without you babysitting Variables, Styles, or
                the Assets panel.
              </p>
              <p className="leading-relaxed text-text-muted">
                Built on top of Figma&apos;s Variables, Styles, and Component
                APIs. Local-first scanning means most operations cost zero AI
                tokens — Claude is called only for the few decisions that need
                judgement.
              </p>
            </div>
            <ul className="grid gap-3 self-center">
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
                  className="flex gap-3 rounded-xl border border-border-subtle bg-bg/60 px-4 py-3 text-sm leading-relaxed text-text-secondary"
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-24 grid gap-8 md:mt-32 md:grid-cols-3">
            {[
              { label: "Status", value: "Currently in testing" },
              { label: "Launch", value: "Q2 2026 · Figma Community" },
              { label: "Built by", value: "A solo designer, for designers" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border-subtle bg-bg-card/40 p-6 text-center md:p-8"
              >
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-text-muted">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold text-text md:text-xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          <section
            id="notify"
            className="mt-24 overflow-hidden rounded-3xl border border-border-subtle bg-bg-card/50 p-8 md:mt-32 md:p-12"
          >
            <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
                  Launch list
                </p>
                <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Be first to know when it launches
                </h2>
                <p className="text-text-secondary">
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
                  className="w-full rounded-full border border-border bg-bg px-5 py-3 text-sm text-text outline-none transition-all placeholder:text-text-muted focus:border-accent"
                />
                <button
                  type="submit"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
                >
                  Notify me
                </button>
              </form>
            </div>
          </section>

          <section className="mt-24 rounded-3xl border border-border-subtle bg-bg-card/30 p-8 md:mt-32 md:p-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
              Why I&apos;m building it
            </p>
            <blockquote className="border-l-2 border-accent pl-5 text-xl leading-relaxed text-text md:text-2xl">
              <span className="italic">
                &ldquo;6 years designing solo. I needed a thinking partner. So I
                built one.&rdquo;
              </span>
              <footer className="mt-3 text-sm not-italic text-text-muted">
                — Zaman Bayezid
              </footer>
            </blockquote>
          </section>

          <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center md:mt-24">
            <p className="text-sm text-text-muted">
              Want to see the full product thinking?
            </p>
            <Link
              href="/mentor"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text transition-all hover:border-accent/40 hover:bg-bg-elevated"
            >
              MENTOR — Capabilities &amp; Roadmap
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
