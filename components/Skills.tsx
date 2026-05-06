"use client";

import { motion } from "motion/react";
import { Layers, Palette, Users } from "lucide-react";
import type { Skill } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={20} strokeWidth={1.5} />,
  Palette: <Palette size={20} strokeWidth={1.5} />,
  Users: <Users size={20} strokeWidth={1.5} />,
};

export default function Skills({ data }: { data: Skill[] }) {
  return (
    <section id="skills" className="relative px-6 py-24 md:py-32">
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
              What I do
            </span>
            <h2 className="text-3xl font-normal tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.05]">
              Core expertise
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary md:col-span-5 md:text-[15px]">
            A small but durable practice — built around design systems,
            high-velocity product surfaces, and tools that respect their users.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {data.map((skill, i) => (
            <motion.article
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="glass-shell"
            >
              <div className="glass-inner shadow-architecture">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/8 text-accent">
                  {iconMap[skill.icon] || <Layers size={20} strokeWidth={1.5} />}
                </div>
                <h3 className="mt-6 text-[22px] font-medium leading-7 tracking-[-0.015em] text-text">
                  {skill.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[22px] text-text-muted">
                  {skill.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
