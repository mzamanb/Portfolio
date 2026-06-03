"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

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
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
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
            Connect.
          </span>
          <span className="hidden text-[13px] text-text-muted md:block">
            Always open to the right project
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid gap-0 border border-[var(--color-border)] md:grid-cols-2"
        >
          {/* Left — large contact statement */}
          <div className="border-b border-[var(--color-border)] p-8 md:border-b-0 md:border-r md:p-12">
            <p
              className="text-text"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2 }}
            >
              Got a project in mind?<br />
              <span className="text-text-muted">Let's make something good.</span>
            </p>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-text-secondary">
              {data.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${data.email}`}
                className="inline-flex h-10 items-center rounded-full bg-text px-6 text-[13px] font-semibold text-bg transition-opacity hover:opacity-75"
              >
                Send an email
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-[var(--color-border-strong)] px-6 text-[13px] text-text-secondary transition-colors hover:text-text"
              >
                Resume ↓
              </a>
            </div>
          </div>

          {/* Right — contact info rows */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col divide-y divide-[var(--color-border)]">
              <div className="flex items-center justify-between py-4">
                <span className="text-[12px] uppercase tracking-[0.1em] text-text-muted">Email</span>
                <a
                  href={`mailto:${data.email}`}
                  className="text-[13px] text-text-secondary transition-colors hover:text-text"
                >
                  {data.email}
                </a>
              </div>
              {Object.entries(data.social).map(([name, url]) => (
                <div key={name} className="flex items-center justify-between py-4">
                  <span className="text-[12px] uppercase tracking-[0.1em] text-text-muted capitalize">{name}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-text-secondary transition-colors hover:text-text"
                  >
                    {url.replace("https://", "").replace("www.", "").replace(/\/$/, "")} ↗
                  </a>
                </div>
              ))}
              <div className="flex items-center justify-between py-4">
                <span className="text-[12px] uppercase tracking-[0.1em] text-text-muted">Status</span>
                <span className="inline-flex items-center gap-2 text-[13px] text-text-secondary">
                  <span className="h-1.5 w-1.5 animate-architecture-pulse rounded-full bg-accent" />
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
