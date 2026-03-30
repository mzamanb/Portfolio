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
  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Get in Touch
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            {data.heading}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-secondary">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={`mailto:${data.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-bg transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
          >
            <Mail size={16} />
            Send an Email
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text transition-all hover:border-text-muted hover:bg-bg-card"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {Object.entries(data.social).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm capitalize text-text-muted transition-colors hover:text-accent"
            >
              {name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
