"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUpRight,
  Mail,
  Download,
  Sparkles,
  Layers,
  Palette,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={20} strokeWidth={1.5} />,
  Palette: <Palette size={20} strokeWidth={1.5} />,
  Users: <Users size={20} strokeWidth={1.5} />,
};

const processSteps = [
  {
    step: "01",
    title: "Discover",
    desc: "Research, competitive analysis, and user interviews to uncover the real problem.",
  },
  {
    step: "02",
    title: "Define",
    desc: "Frame the problem with personas, journey maps, and jobs-to-be-done.",
  },
  {
    step: "03",
    title: "Design",
    desc: "Wireframes to high-fidelity prototypes, tested and iterated with real users.",
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Developer handoff, design system docs, and post-launch iteration.",
  },
];

const TOTAL_SLIDES = 7;
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function PitchPage({ content }: { content: SiteContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { hero, skills, caseStudies, contact } = content;

  const allImpact = caseStudies
    .flatMap((cs) => cs.fullContent.impact)
    .slice(0, 4);

  const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Project Inquiry — Let's Work Together"
  )}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight);
      setCurrentSlide(Math.min(idx, TOTAL_SLIDES - 1));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const next = Math.min(currentSlide + 1, TOTAL_SLIDES - 1);
        container.scrollTo({
          top: next * window.innerHeight,
          behavior: "smooth",
        });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prev = Math.max(currentSlide - 1, 0);
        container.scrollTo({
          top: prev * window.innerHeight,
          behavior: "smooth",
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentSlide]);

  const goToSlide = (idx: number) => {
    containerRef.current?.scrollTo({
      top: idx * window.innerHeight,
      behavior: "smooth",
    });
  };

  const slideStyle: React.CSSProperties = {
    scrollSnapAlign: "start",
    height: "100vh",
  };

  return (
    <>
      <style>{`
        .pitch-container::-webkit-scrollbar { display: none; }
        .pitch-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="fixed left-4 top-4 z-50 sm:left-6">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/70 px-4 text-[12.5px] font-medium text-text-secondary backdrop-blur-xl transition-colors hover:text-text"
        >
          <ArrowLeft size={13} />
          <span className="hidden sm:inline">Portfolio</span>
        </Link>
      </div>

      <div className="fixed right-14 top-4 z-50 hidden items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 px-3 py-1.5 font-mono text-[11px] tabular-nums text-text-muted backdrop-blur sm:flex">
        <span className="text-text">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="opacity-50">/</span>
        <span>{String(TOTAL_SLIDES).padStart(2, "0")}</span>
      </div>

      <nav className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 p-2 backdrop-blur sm:right-6">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === i
                ? "h-5 w-2 bg-accent"
                : "h-2 w-2 bg-[var(--color-border-strong)] hover:bg-text-muted"
            }`}
          />
        ))}
      </nav>

      <div
        ref={containerRef}
        className="pitch-container relative bg-bg"
        style={{
          scrollSnapType: "y mandatory",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-architecture-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[15%] top-[20%] h-[420px] w-[420px] rounded-full bg-[var(--color-accent-dim)] blur-[100px]" />
            <div className="absolute bottom-[15%] right-[10%] h-[320px] w-[320px] rounded-full bg-[var(--color-accent-dim)] blur-[100px] opacity-70" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 px-3 py-1.5 text-[12px] font-medium text-text-secondary backdrop-blur"
            >
              <Sparkles size={12} className="text-accent" />
              {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="mb-3 text-[clamp(2.5rem,8vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              {hero.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="mb-4 text-lg font-medium sm:text-xl"
            >
              <span className="bg-gradient-to-r from-accent via-accent-soft to-[var(--color-accent-glow)] bg-clip-text text-transparent">
                {hero.title[0]}
              </span>{" "}
              {hero.title[1]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mx-auto mb-9 max-w-xl text-[14.5px] leading-relaxed text-text-secondary"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href={mailtoUrl}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:bg-accent-hover"
              >
                <Mail size={14} />
                Hire me
              </a>
              <button
                onClick={() => goToSlide(4)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/40 px-5 text-[13px] font-semibold text-text backdrop-blur transition-all hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]"
              >
                View work
                <ArrowDown size={13} />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-2"
            >
              Scroll
              <ArrowDown size={12} />
            </motion.div>
          </motion.div>
        </section>

        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <motion.div
              key={`about-${currentSlide === 1}`}
              initial={{ opacity: 0, y: 24 }}
              animate={
                currentSlide === 1
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-6 bg-accent/60" />
                Who I am
              </span>
              <h2 className="mb-5 text-3xl font-medium tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
                Bridging design &amp;{" "}
                <span className="bg-gradient-to-r from-accent via-accent-soft to-[var(--color-accent-glow)] bg-clip-text text-transparent">
                  development
                </span>
              </h2>
              <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
                I&apos;m a Lead Product Designer who brings rigorous user
                research, systematic thinking, and technical fluency to every
                project. I speak the language of both designers and engineers
                — so nothing gets lost in translation.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
                {[
                  {
                    value: "2",
                    label: "Case studies",
                    detail: "End-to-end product design",
                  },
                  {
                    value: "8+",
                    label: "Usability tests",
                    detail: "Across key user flows",
                  },
                  {
                    value: "CSPO",
                    label: "Certified",
                    detail: "Scrum Product Owner",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={
                      currentSlide === 1
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16 }
                    }
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + i * 0.08,
                      ease: EASE,
                    }}
                    className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 p-5 backdrop-blur md:p-6"
                  >
                    <p className="mb-1 text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-[13.5px] font-semibold text-text">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-[11.5px] text-text-muted">
                      {stat.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <motion.div
              key={`expertise-heading-${currentSlide === 2}`}
              initial={{ opacity: 0, y: 16 }}
              animate={
                currentSlide === 2
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-10 text-center"
            >
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-6 bg-accent/60" />
                Expertise
              </span>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-[2.5rem]">
                What I bring to the table
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={
                    currentSlide === 2
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 24 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.08,
                    ease: EASE,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 p-6 backdrop-blur-md transition-all hover:border-[var(--color-border)] md:p-7"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-accent-dim)] opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] text-accent">
                      {iconMap[skill.icon] || (
                        <Layers size={20} strokeWidth={1.5} />
                      )}
                    </div>
                    <h3 className="mb-2 text-base font-semibold tracking-tight">
                      {skill.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-text-secondary">
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <motion.div
              key={`impact-heading-${currentSlide === 3}`}
              initial={{ opacity: 0, y: 16 }}
              animate={
                currentSlide === 3
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-10 text-center"
            >
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-6 bg-accent/60" />
                Impact
              </span>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-[2.5rem]">
                Results that speak for themselves
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {allImpact.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={
                    currentSlide === 3
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.95 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + i * 0.08,
                    ease: EASE,
                  }}
                  className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 p-5 text-center backdrop-blur md:p-6"
                >
                  <p className="mb-1 text-3xl font-semibold tracking-tight text-accent sm:text-[2.25rem]">
                    {item.value}
                  </p>
                  <p className="text-[13px] font-semibold text-text">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[11.5px] text-text-muted">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={currentSlide === 3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-text-muted"
            >
              Across Emarat Loyalty App &amp; VeeHive
            </motion.p>
          </div>
        </section>

        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <motion.div
              key={`work-heading-${currentSlide === 4}`}
              initial={{ opacity: 0, y: 16 }}
              animate={
                currentSlide === 4
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-10 text-center"
            >
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-6 bg-accent/60" />
                Selected work
              </span>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-[2.5rem]">
                Two case studies, real impact
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {caseStudies.map((cs, i) => (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={
                    currentSlide === 4
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 24 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.1,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={`/case-study/${cs.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 backdrop-blur-md transition-all hover:border-[var(--color-border)]"
                  >
                    <div className="relative h-32 overflow-hidden bg-[var(--color-bg-elevated)] sm:h-44">
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5">
                      <span className="mb-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {cs.label}
                      </span>
                      <h3 className="mb-1 text-lg font-semibold tracking-tight">
                        {cs.title}
                      </h3>
                      <p className="mb-3 text-[13px] text-text-muted">
                        {cs.subtitle}
                      </p>
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {cs.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-2 py-0.5 text-[10.5px] font-medium text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent transition-all group-hover:gap-2">
                        Read case study <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <motion.div
              key={`process-heading-${currentSlide === 5}`}
              initial={{ opacity: 0, y: 16 }}
              animate={
                currentSlide === 5
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-10 text-center"
            >
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-6 bg-accent/60" />
                Process
              </span>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-[2.5rem]">
                How I work
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    currentSlide === 5
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + i * 0.08,
                    ease: EASE,
                  }}
                  className="relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 p-5 backdrop-blur md:p-6"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                    }}
                  />
                  <p className="mb-3 font-mono text-[11px] tracking-wider text-accent">
                    {step.step}
                  </p>
                  <h3 className="mb-2 text-base font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[12.5px] leading-relaxed text-text-secondary">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-0 left-1/2 h-[420px] w-full max-w-[640px] -translate-x-1/2 rounded-full bg-[var(--color-accent-dim)] blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.div
              key={`cta-${currentSlide === 6}`}
              initial={{ opacity: 0, y: 24 }}
              animate={
                currentSlide === 6
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-6 bg-accent/60" />
                Let&apos;s work together
              </span>
              <h2 className="mb-4 text-4xl font-medium leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-[3.5rem]">
                Ready to build something{" "}
                <span className="bg-gradient-to-r from-accent via-accent-soft to-[var(--color-accent-glow)] bg-clip-text text-transparent">
                  great?
                </span>
              </h2>
              <p className="mx-auto mb-9 max-w-lg text-[14.5px] leading-relaxed text-text-secondary">
                I&apos;m open to full-time roles, contract projects, and
                consulting. Let&apos;s talk about how I can help ship better
                products.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={mailtoUrl}
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:bg-accent-hover"
                >
                  <Mail size={14} />
                  Send an email
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href={hero.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/40 px-5 text-[13px] font-semibold text-text backdrop-blur transition-all hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]"
                >
                  <Download size={14} />
                  Download resume
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6">
                {Object.entries(contact.social).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12.5px] capitalize text-text-muted transition-colors hover:text-accent"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
