"use client";

import { motion } from "motion/react";
import { Mail, ArrowUpRight, Download } from "lucide-react";

type ContactData = {
  heading: string;
  description: string;
  email: string;
  social: Record<string, string>;
};

export default function Contact({
  data,
  resumeUrl,
}: {
  data: ContactData;
  resumeUrl: string;
}) {
  const mailtoUrl = `mailto:${data.email}?subject=${encodeURIComponent("Project Inquiry — Let's Work Together")}&body=${encodeURIComponent(`Hi Zaman,\n\nI came across your portfolio and I'm interested in discussing a potential project.\n\nHere are some details:\n\n- Project type: [e.g., Mobile App, Web Platform, Design System]\n- Timeline: [e.g., 2–3 months]\n- Budget range: [e.g., $5k–$10k]\n\nBrief description:\n[Tell me a bit about what you're looking for]\n\nLooking forward to hearing from you!\n\nBest,\n[Your Name]`)}`;

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[420px] w-full max-w-[640px] -translate-x-1/2 rounded-full bg-[var(--color-accent-dim)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/60 p-8 backdrop-blur-md md:p-16">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
            }}
          />
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--color-accent-dim)] opacity-60 blur-3xl" />

          <div className="relative grid gap-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                  <span className="h-px w-6 bg-accent" />
                  Get in touch
                </span>
                <h2 className="text-3xl font-normal tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.05]">
                  {data.heading}
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-text-secondary">
                  {data.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={mailtoUrl}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-[22px] text-[14px] font-medium text-white transition-colors hover:bg-accent-soft"
                  >
                    <Mail size={14} />
                    Send an email
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-transparent px-[22px] text-[14px] font-normal text-text transition-all hover:border-accent hover:text-accent"
                  >
                    <Download size={14} />
                    Download résumé
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="md:col-span-5"
            >
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/70 p-5 backdrop-blur">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Direct channels
                </p>
                <a
                  href={`mailto:${data.email}`}
                  className="group mb-3 flex items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-4 py-3 text-[13px] transition-all hover:border-accent/30 hover:bg-[var(--color-bg-card)]"
                >
                  <span className="text-text-secondary">{data.email}</span>
                  <ArrowUpRight
                    size={14}
                    className="text-text-muted transition-colors group-hover:text-accent"
                  />
                </a>

                <ul className="space-y-2">
                  {Object.entries(data.social).map(([name, url]) => (
                    <li key={name}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-4 py-3 text-[13px] transition-all hover:border-accent/30"
                      >
                        <span className="capitalize text-text-secondary">
                          {name}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-text-muted transition-colors group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
