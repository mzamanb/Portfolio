import type { FooterContent } from "@/lib/content";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ data }: { data: FooterContent }) {
  return (
    <footer className="border-t border-border-subtle px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="mb-2 text-lg font-semibold">
              Zaman Bayezid<span className="text-accent">.</span>
            </p>
            <p className="text-sm leading-relaxed text-text-muted">
              {data.tagline}
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-text-muted">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-text-muted">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {["LinkedIn", "Dribbble", "Behance", "GitHub"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="text-sm text-text-secondary transition-colors hover:text-text"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-8 text-center">
          <p className="text-sm text-text-muted">&copy; {data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
