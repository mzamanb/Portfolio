"use client";

import type { TrustedByItem } from "@/lib/content";
import FadeIn from "@/components/velory/FadeIn";
import SectionLabel from "@/components/velory/SectionLabel";

const DEFAULT_BRANDS: TrustedByItem[] = [
  { name: "Emarat" },
  { name: "VeeHive" },
  { name: "MENTOR" },
  { name: "EmCan" },
  { name: "NovaTech" },
  { name: "Bloom" },
  { name: "Horizon" },
  { name: "Vertex" },
];

export default function TrustedBy({ data }: { data?: TrustedByItem[] }) {
  const brands = data?.length ? data : DEFAULT_BRANDS;
  const doubled = [...brands, ...brands];

  return (
    <section className="section-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionLabel dark>Trusted By</SectionLabel>
          <h2
            className="font-display text-[var(--color-text-dark)]"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Collaborating with forward-thinking brands to create digital impact
          </h2>
        </FadeIn>
      </div>

      <div className="mt-12 overflow-hidden">
        <div className="animate-marquee-slow flex w-max gap-12 px-6">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex shrink-0 items-center gap-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(12,12,12,0.06)]">
                <span className="font-display text-[14px] font-bold text-[var(--color-text-dark)]">
                  {brand.name.charAt(0)}
                </span>
              </span>
              <span className="whitespace-nowrap font-display text-[18px] font-semibold tracking-[-0.02em] text-[var(--color-text-dark)] opacity-70">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
