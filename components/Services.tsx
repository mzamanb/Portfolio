"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { ServiceItem } from "@/lib/content";
import FadeIn from "@/components/velory/FadeIn";
import SectionLabel from "@/components/velory/SectionLabel";
import { EASE } from "@/components/velory/FadeIn";

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "design-systems",
    title: "Design Systems",
    description:
      "Atomic design systems that bridge Figma and code, keeping UI consistent across platforms.",
    image: "/images/project-finance.svg",
  },
  {
    id: "ux-design",
    title: "UX Design",
    description:
      "User-validated flows, rapid prototyping, and stakeholder alignment before code is written.",
    image: "/images/project-fitness.svg",
  },
  {
    id: "user-research",
    title: "User Research",
    description:
      "Structured research — interviews, usability tests, and data analysis — grounded in evidence.",
    image: "/images/project-traffic.svg",
  },
  {
    id: "creative-dev",
    title: "Creative Development",
    description:
      "Innovative ideas transformed into scalable digital solutions through clean code and smart design.",
    image: "/images/mentor-hero.png",
  },
];

export default function Services({ data }: { data?: ServiceItem[] }) {
  const services = data?.length ? data : DEFAULT_SERVICES;

  return (
    <section id="services" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel>Our Services</SectionLabel>
          <h2
            className="font-display text-text"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            What I Create, Shapes Brands
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3
                    className="font-display text-white"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-[14px] leading-relaxed text-text-secondary">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
