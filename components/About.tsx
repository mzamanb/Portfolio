"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { AboutContent } from "@/lib/content";
import FadeIn from "@/components/velory/FadeIn";
import SectionLabel from "@/components/velory/SectionLabel";
import { EASE } from "@/components/velory/FadeIn";

const DEFAULT_ABOUT: AboutContent = {
  headline: "Designing Impactful Experiences for the Digital Age",
  description:
    "I craft brands and digital products that resonate. My work blends design, strategy, and technology to help ambitious businesses stand out.",
  rotatingWords: [
    "Create Boldly",
    "Think Forward",
    "Design Fearlessly",
  ],
};

export default function About({ data }: { data?: AboutContent }) {
  const about = data || DEFAULT_ABOUT;
  const words = about.rotatingWords;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <FadeIn>
          <SectionLabel>About</SectionLabel>
          <h2
            className="font-display text-text"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {about.headline}
          </h2>
          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-text-secondary">
            {about.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-col justify-center">
          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-display text-text"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {words[index].split(" ").map((word, i) => (
                  <span key={i}>
                    {word}
                    {i === 0 ? (
                      <span className="text-accent">.</span>
                    ) : null}{" "}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="mt-12 flex flex-col gap-4">
            {words.slice(0, 3).map((word) => (
              <li
                key={word}
                className="flex items-center gap-3 text-[14px] text-text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {word}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
