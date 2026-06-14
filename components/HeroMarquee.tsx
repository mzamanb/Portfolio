"use client";

import Image from "next/image";

const DEFAULT_IMAGES = [
  "/images/mentor-hero.png",
  "/images/mentor-detail.png",
  "/images/emcan-cover.svg",
  "/images/veehive-cover.svg",
  "/images/project-finance.svg",
  "/images/project-fitness.svg",
];

export default function HeroMarquee({ images }: { images?: string[] }) {
  const items = images?.length ? images : DEFAULT_IMAGES;
  const doubled = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-[var(--color-border)] py-6">
      <div className="animate-marquee flex w-max gap-4">
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-[200px] w-[280px] shrink-0 overflow-hidden rounded-xl md:h-[260px] md:w-[360px]"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="360px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
