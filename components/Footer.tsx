import type { FooterContent } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({
  data,
  social,
}: {
  data: FooterContent;
  social: Record<string, string>;
}) {
  return (
    <footer className="relative px-6 pb-10 pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-border), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/40 p-8 backdrop-blur-md md:p-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-soft text-xs font-bold text-white">
                  Z
                </span>
                <span className="text-base font-semibold tracking-tight">
                  Zaman Bayezid<span className="text-accent">.</span>
                </span>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-text-secondary">
                {data.tagline}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-3 py-1.5 text-xs text-text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Available for freelance work
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                Navigate
              </p>
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                Connect
              </p>
              <ul className="flex flex-col gap-2.5">
                {Object.entries(social).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm capitalize text-text-secondary transition-colors hover:text-text"
                    >
                      {name}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-text-muted">&copy; {data.copyright}</p>
            <p className="text-xs text-text-muted">
              Built with care · Next.js · Architecture system
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
