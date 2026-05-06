"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/lib/content";

export default function Projects({ data }: { data: Project[] }) {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-14 grid gap-6 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <span className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
              <span className="h-px w-6 bg-accent" />
              Explorations
            </span>
            <h2 className="text-3xl font-normal tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.05]">
              Personal projects
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary md:col-span-5 md:text-[15px]">
            Side experiments and self-initiated work — interfaces and
            interactions used to push my own ideas further.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 backdrop-blur-md transition-all duration-500 hover:border-[var(--color-border)] hover:bg-[var(--color-bg-card)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted backdrop-blur">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  Project {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-base font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mb-4 text-[13px] leading-relaxed text-text-secondary">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-2 py-0.5 text-[11px] font-medium text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
