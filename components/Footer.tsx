import type { FooterContent } from "@/lib/content";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({
  data,
  social,
}: {
  data: FooterContent;
  social: Record<string, string>;
}) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Site map
            </p>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] font-medium text-text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Social
            </p>
            <ul className="flex flex-col gap-3">
              {Object.entries(social).map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium capitalize text-text-secondary transition-colors hover:text-accent"
                  >
                    {name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:zamanbayezid@gmail.com"
                  className="text-[15px] font-medium text-text-secondary transition-colors hover:text-accent"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Info
            </p>
            <p className="text-[14px] leading-relaxed text-text-secondary">
              {data.tagline}
            </p>
            <p className="mt-4 text-[12px] text-text-muted">
              &copy; {data.copyright}
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-t border-[var(--color-border)] bg-accent py-8"
      >
        <div className="mx-auto max-w-7xl px-6">
          <span
            className="font-display block leading-none text-white/90"
            style={{
              fontSize: "clamp(4rem, 18vw, 14rem)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
            }}
          >
            Zaman.
          </span>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a
            href="#home"
            className="text-[12px] text-text-muted transition-colors hover:text-accent"
          >
            Back to Top ↑
          </a>
          <p className="text-[12px] text-text-muted">&copy; {data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
