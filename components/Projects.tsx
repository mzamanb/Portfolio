"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/lib/content";
import FadeIn from "@/components/velory/FadeIn";
import SectionLabel from "@/components/velory/SectionLabel";
import { EASE } from "@/components/velory/FadeIn";

export default function Projects({ data }: { data: Project[] }) {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel>Projects</SectionLabel>
          <h2
            className="font-display text-text"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Personal Explorations
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3
                  className="font-display text-text"
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border-strong)] px-2.5 py-0.5 text-[10px] text-text-muted"
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
