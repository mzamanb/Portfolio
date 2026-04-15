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
  Layers: <Layers size={22} />,
  Palette: <Palette size={22} />,
  Users: <Users size={22} />,
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

export default function PitchPage({ content }: { content: SiteContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { hero, skills, caseStudies, contact } = content;

  const allImpact = caseStudies.flatMap((cs) => cs.fullContent.impact).slice(0, 4);

  const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Project Inquiry — Let's Work Together"
  )}`;

  // Track current slide via scroll position
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

  // Keyboard arrow navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const next = Math.min(currentSlide + 1, TOTAL_SLIDES - 1);
        container.scrollTo({ top: next * window.innerHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prev = Math.max(currentSlide - 1, 0);
        container.scrollTo({ top: prev * window.innerHeight, behavior: "smooth" });
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

  const slideStyle: React.CSSProperties = { scrollSnapAlign: "start", height: "100vh" };

  return (
    <>
      <style>{`
        .pitch-container::-webkit-scrollbar { display: none; }
        .pitch-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Fixed: Back to portfolio */}
      <div className="fixed left-4 top-4 z-50 sm:left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card/80 px-4 py-2 text-sm text-text-secondary backdrop-blur-sm transition-colors hover:text-text"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Portfolio</span>
        </Link>
      </div>

      {/* Fixed: Slide counter */}
      <div className="fixed right-14 top-4 z-50 text-xs text-text-muted hidden sm:block">
        {currentSlide + 1} / {TOTAL_SLIDES}
      </div>

      {/* Fixed: Dot navigation */}
      <nav className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 sm:right-6">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === i
                ? "h-4 w-2 bg-accent"
                : "h-2 w-2 bg-border-subtle hover:bg-text-muted"
            }`}
          />
        ))}
      </nav>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="pitch-container bg-bg"
        style={{ scrollSnapType: "y mandatory", height: "100vh", overflowY: "scroll" }}
      >
        {/* ─── Slide 1: Intro ─── */}
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[120px] sm:h-[500px] sm:w-[500px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[200px] w-[200px] rounded-full bg-purple-600/5 blur-[100px] sm:h-[400px] sm:w-[400px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card/50 px-4 py-2 text-sm text-text-secondary backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-accent" />
              {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
            >
              {hero.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-xl font-medium sm:text-2xl"
            >
              {hero.title[0]}{" "}
              <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                {hero.title[1]}
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href={mailtoUrl}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-bg transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
              >
                <Mail size={16} />
                Hire Me
              </a>
              <button
                onClick={() => goToSlide(4)}
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text transition-all hover:border-text-muted hover:bg-bg-card"
              >
                View Work
                <ArrowDown size={16} />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowDown size={20} className="text-text-muted" />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Slide 2: About ─── */}
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto max-w-4xl w-full">
            <motion.div
              key={`about-${currentSlide === 1}`}
              initial={{ opacity: 0, y: 24 }}
              animate={currentSlide === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Who I Am
              </span>
              <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Bridging design &amp;{" "}
                <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                  development
                </span>
              </h2>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                I&apos;m a Lead Product Designer who brings rigorous user research, systematic
                thinking, and technical fluency to every project. I speak the language of both
                designers and engineers — so nothing gets lost in translation.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
                {[
                  { value: "2", label: "Case Studies", detail: "End-to-end product design" },
                  { value: "8+", label: "Usability Tests", detail: "Across key user flows" },
                  { value: "CSPO", label: "Certified", detail: "Scrum Product Owner" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={currentSlide === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="rounded-2xl border border-border-subtle bg-bg-card/50 p-5 md:p-6"
                  >
                    <p className="mb-1 text-2xl font-bold text-accent sm:text-3xl">{stat.value}</p>
                    <p className="text-sm font-semibold text-text">{stat.label}</p>
                    <p className="mt-1 text-xs text-text-muted">{stat.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Slide 3: Expertise ─── */}
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <motion.div
              key={`expertise-heading-${currentSlide === 2}`}
              initial={{ opacity: 0, y: 20 }}
              animate={currentSlide === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center md:mb-10"
            >
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Expertise
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                What I bring to the table
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={currentSlide === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-bg-card md:p-8"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 transition-all group-hover:bg-accent/10" />
                  <div className="relative">
                    <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                      {iconMap[skill.icon] || <Layers size={22} />}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{skill.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Slide 4: Impact ─── */}
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <motion.div
              key={`impact-heading-${currentSlide === 3}`}
              initial={{ opacity: 0, y: 20 }}
              animate={currentSlide === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center md:mb-10"
            >
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Impact
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Results that speak for themselves
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {allImpact.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    currentSlide === 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="rounded-2xl border border-border-subtle bg-bg-card/50 p-5 text-center md:p-6"
                >
                  <p className="mb-1 text-3xl font-bold text-accent sm:text-4xl">{item.value}</p>
                  <p className="text-sm font-semibold text-text">{item.label}</p>
                  <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={currentSlide === 3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-6 text-center text-sm text-text-muted"
            >
              Across EmCan Loyalty App &amp; VeeHive.ai Creator Platform
            </motion.p>
          </div>
        </section>

        {/* ─── Slide 5: Selected Work ─── */}
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <motion.div
              key={`work-heading-${currentSlide === 4}`}
              initial={{ opacity: 0, y: 20 }}
              animate={currentSlide === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Selected Work
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Two case studies, real impact
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {caseStudies.map((cs, i) => (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={currentSlide === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
                >
                  <Link
                    href={`/case-study/${cs.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50 transition-all hover:border-accent/30 hover:bg-bg-card"
                  >
                    <div className="relative h-32 overflow-hidden bg-bg-elevated sm:h-44">
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5">
                      <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
                        {cs.label}
                      </span>
                      <h3 className="mb-1 text-xl font-bold">{cs.title}</h3>
                      <p className="mb-3 text-sm text-text-muted">{cs.subtitle}</p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {cs.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all group-hover:gap-3">
                        Read Case Study <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Slide 6: Process ─── */}
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <motion.div
              key={`process-heading-${currentSlide === 5}`}
              initial={{ opacity: 0, y: 20 }}
              animate={currentSlide === 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center md:mb-10"
            >
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Process
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How I work
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={currentSlide === 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="rounded-2xl border border-border-subtle bg-bg-card/50 p-5 md:p-6"
                >
                  <p className="mb-3 font-mono text-sm text-accent">{step.step}</p>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={currentSlide === 5 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-6 hidden items-center justify-center gap-3 text-xs text-text-muted md:flex"
            >
              {processSteps.map((s, i) => (
                <span key={s.step} className="flex items-center gap-3">
                  {s.title}
                  {i < processSteps.length - 1 && (
                    <span className="h-px w-8 bg-border-subtle" />
                  )}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Slide 7: CTA ─── */}
        <section
          style={slideStyle}
          className="relative flex items-center justify-center overflow-hidden px-6"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-0 left-1/2 h-[300px] w-full max-w-[600px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px] sm:h-[400px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.div
              key={`cta-${currentSlide === 6}`}
              initial={{ opacity: 0, y: 24 }}
              animate={currentSlide === 6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Let&apos;s Work Together
              </span>
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Ready to build something{" "}
                <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                  great?
                </span>
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
                I&apos;m open to full-time roles, contract projects, and consulting. Let&apos;s talk
                about how I can help ship better products.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={mailtoUrl}
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
                  href={hero.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text transition-all hover:border-text-muted hover:bg-bg-card"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6">
                {Object.entries(contact.social).map(([name, url]) => (
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
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
