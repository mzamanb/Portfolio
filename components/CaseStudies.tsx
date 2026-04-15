"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export default function CaseStudies({ data }: { data: CaseStudy[] }) {
  return (
    <section id="work" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-16"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Featured Work
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Case Studies
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {data.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/case-study/${study.slug}`}>
                <div className="group relative grid overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50 transition-all hover:border-accent/30 hover:bg-bg-card md:grid-cols-2">
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="mb-4 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
                      {study.label}
                    </span>
                    <h3 className="mb-1 text-3xl font-bold">{study.title}</h3>
                    <p className="mb-4 text-lg text-text-muted">
                      {study.subtitle}
                    </p>
                    <p className="mb-6 leading-relaxed text-text-secondary">
                      {study.description}
                    </p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all group-hover:gap-3">
                      Read Case Study
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                  <div className="relative min-h-[300px] overflow-hidden bg-bg-elevated md:min-h-[400px]">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
