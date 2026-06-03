"use client";

import { motion } from "motion/react";
import type { Skill } from "@/lib/content";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function Skills({ data }: { data: Skill[] }) {
  return (
    <section
      id="skills"
      className="relative px-6 py-24 md:py-32"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16 flex items-end justify-between"
        >
          <span
            className="text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
          >
            Skills.
          </span>
          <span className="hidden text-[13px] text-white/30 md:block">
            What I bring to a project
          </span>
        </motion.div>

        {/* Skill cards — td-moro services-grid style */}
        <div className="grid gap-px border border-white/8 bg-white/8 md:grid-cols-3">
          {data.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="flex flex-col gap-4 p-8 md:p-10"
              style={{ background: "var(--color-bg-dark)" }}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-white"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {skill.title}
              </h3>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
