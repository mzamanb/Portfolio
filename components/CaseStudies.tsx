"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export default function CaseStudies({ data }: { data: CaseStudy[] }) {
  return (
    <section id="work" className="relative px-6 py-24 md:py-32">
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
              Featured work
            </span>
            <h2 className="text-3xl font-normal tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.05]">
              Case studies
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary md:col-span-5 md:text-[15px]">
            Projects where the design carried real weight. Click into any of
            them to see the system, the trade-offs, and the outcome.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.map((study, i) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]"
            >
              <Link href={`/case-study/${study.slug}`} className="block">
                <div className="group p-6 transition-all duration-500">
                  {/* Preview image */}
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Meta row */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                      <span className="h-px w-6 bg-accent" />
                      Case study
                    </span>
                    <ArrowUpRight size={14} className="text-text-muted" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] text-text">
                    {study.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-text-secondary">{study.subtitle}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-text-muted">
                    {study.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-2.5 py-1 text-[11px] text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-[13px] text-accent transition-all group-hover:gap-3.5">
                    Read case study
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
