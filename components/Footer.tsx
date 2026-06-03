import type { FooterContent } from "@/lib/content";

const quickLinks = [
  { label: "Home.",     href: "#home" },
  { label: "Work.",     href: "#work" },
  { label: "Projects.", href: "#projects" },
  { label: "Skills.",   href: "#skills" },
  { label: "Contact.",  href: "#contact" },
];

export default function Footer({
  data,
  social,
}: {
  data: FooterContent;
  social: Record<string, string>;
}) {
  return (
    <footer
      className="relative overflow-hidden border-t border-[var(--color-border)] px-6"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Columns */}
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-3">
          {/* Site map */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Site map.
            </p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Social.
            </p>
            <ul className="flex flex-col gap-2.5">
              {Object.entries(social).map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium capitalize text-text-secondary transition-colors hover:text-text"
                  >
                    {name}.
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:zamanbayezid@gmail.com"
                  className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text"
                >
                  Email.
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Info.
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

      {/* Ghost wordmark — td-moro style */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-t border-[var(--color-border)] py-6"
      >
        <div className="mx-auto max-w-7xl">
          <span
            className="block leading-none"
            style={{
              fontSize: "clamp(5rem, 20vw, 18rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "var(--color-text-ghost)",
              lineHeight: 0.85,
            }}
          >
            Zaman.
          </span>
        </div>
      </div>
    </footer>
  );
}
