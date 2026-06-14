"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { StatItem } from "@/lib/content";
import FadeIn from "@/components/velory/FadeIn";
import SectionLabel from "@/components/velory/SectionLabel";
import { EASE } from "@/components/velory/FadeIn";

const DEFAULT_STATS: StatItem[] = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 6, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Trusted Clients" },
  { value: 4, suffix: "", label: "Markets Served" },
];

function CountUp({
  value,
  suffix = "",
  active,
}: {
  value: number;
  suffix?: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Impact({ data }: { data?: StatItem[] }) {
  const stats = data?.length ? data : DEFAULT_STATS;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-cream px-6 py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel dark>Our Impact</SectionLabel>
          <h2
            className="font-display text-[var(--color-text-dark)]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Turning Ideas Into Measurable Success
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="border-t border-[rgba(12,12,12,0.12)] pt-8"
            >
              <p
                className="font-display text-[var(--color-text-dark)]"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                <span className="text-accent">+</span>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  active={inView}
                />
              </p>
              <p className="mt-3 text-[14px] font-medium text-[rgba(12,12,12,0.55)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
