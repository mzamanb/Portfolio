"use client";

import { motion } from "motion/react";
import { Layers, Palette, Users } from "lucide-react";
import type { Skill } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={24} />,
  Palette: <Palette size={24} />,
  Users: <Users size={24} />,
};

export default function Skills({ data }: { data: Skill[] }) {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            What I Do
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Core Expertise
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {data.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-bg-card"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 transition-all group-hover:bg-accent/10" />
              <div className="relative">
                <div className="mb-6 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                  {iconMap[skill.icon] || <Layers size={24} />}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{skill.title}</h3>
                <p className="leading-relaxed text-text-secondary">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
