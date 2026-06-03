"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/lib/content";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function Projects({ data }: { data: Project[] }) {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
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
            Projects.
          </span>
          <span className="hidden text-[13px] text-text-muted md:block">
            Personal explorations
          </span>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]"
            >
              {/* Card header */}
              <div className="px-5 pt-5 pb-4">
                <h3
                  className="text-text"
                  style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {project.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border-strong)] px-2 py-0.5 text-[10px] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
