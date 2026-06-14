"use client";

import FadeIn from "@/components/velory/FadeIn";
import SectionLabel from "@/components/velory/SectionLabel";

type ContactData = {
  heading: string;
  description: string;
  email: string;
  social: Record<string, string>;
};

export default function Contact({
  data,
  resumeUrl,
}: {
  data: ContactData;
  resumeUrl: string;
}) {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel>Contact</SectionLabel>
          <h2
            className="font-display text-text"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {data.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-2xl bg-accent">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <p
                  className="font-display text-white"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                  }}
                >
                  Got a project in mind?
                  <br />
                  <span className="text-white/70">Let&apos;s make something good.</span>
                </p>
                <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/75">
                  {data.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex h-11 items-center rounded-full bg-white px-6 text-[13px] font-semibold text-accent transition-opacity hover:opacity-90"
                  >
                    Send an email
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center rounded-full border border-white/30 px-6 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Resume ↓
                  </a>
                </div>
              </div>

              <div className="border-t border-white/15 bg-black/10 p-8 md:border-t-0 md:border-l md:p-12">
                <div className="flex flex-col divide-y divide-white/15">
                  <div className="py-5">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/50">
                      Email
                    </p>
                    <a
                      href={`mailto:${data.email}`}
                      className="mt-1 block text-[15px] font-medium text-white transition-opacity hover:opacity-80"
                    >
                      {data.email}
                    </a>
                  </div>
                  {Object.entries(data.social).map(([name, url]) => (
                    <div key={name} className="py-5">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-white/50 capitalize">
                        {name}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-[15px] font-medium text-white transition-opacity hover:opacity-80"
                      >
                        {url.replace("https://", "").replace("www.", "").replace(/\/$/, "")} ↗
                      </a>
                    </div>
                  ))}
                  <div className="py-5">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/50">
                      Status
                    </p>
                    <span className="mt-1 inline-flex items-center gap-2 text-[15px] text-white">
                      <span className="h-2 w-2 animate-architecture-pulse rounded-full bg-white" />
                      Open to work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
