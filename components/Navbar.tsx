"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const leftLinks = [
  { label: "Work",     href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
];

const mobileLinks = [
  { label: "Home.",     href: "#home" },
  { label: "Work.",     href: "#work" },
  { label: "Projects.", href: "#projects" },
  { label: "Skills.",   href: "#skills" },
  { label: "Contact.",  href: "#contact" },
];

const socialLinks = [
  { label: "LI.", href: "https://www.linkedin.com/in/zamanbayezid/" },
  { label: "GH.", href: "https://github.com/mzamanb" },
  { label: "BE.", href: "https://www.behance.net/zamanbayezid" },
];

/* Dotted crosshair icon — matches td-moro's decorative arrow */
function Crosshair() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9"  cy="3"  r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="9"  cy="15" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="3"  cy="9"  r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="15" cy="9"  r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="9"  cy="9"  r="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

export default function Navbar({ resumeUrl }: { resumeUrl: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)]"
        style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:grid md:grid-cols-3">
          {/* Left — desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Center — wordmark */}
          <div className="flex md:justify-center">
            <a href="#home" className="text-[15px] font-bold tracking-[-0.02em] text-text">
              Zaman.
            </a>
          </div>

          {/* Right — desktop social + CTA + mobile hamburger */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden items-center gap-0.5 md:flex">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hidden h-8 w-8 place-items-center rounded-full border border-[var(--color-border-strong)] text-text-secondary transition-colors hover:text-text md:grid"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <a
              href="#contact"
              className="hidden h-8 items-center rounded-full bg-text px-4 text-[13px] font-medium text-bg transition-opacity hover:opacity-80 md:inline-flex"
            >
              Contact
            </a>

            {/* Mobile hamburger — only shown on mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-8 w-8 place-items-center text-text md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu — td-moro style */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-bg-card)] md:hidden"
          >
            {/* Top bar — mirrors the nav */}
            <div className="flex h-14 items-center justify-between border-b border-[var(--color-border)] px-6">
              <a
                href="#home"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-bold tracking-[-0.02em] text-text"
              >
                Zaman.
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-8 items-center rounded-full bg-text px-4 text-[13px] font-medium text-bg"
                >
                  Contact
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="text-text"
                >
                  <X size={22} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Nav links — large, bold, full-width rows */}
            <nav className="flex flex-1 flex-col justify-center px-6">
              {mobileLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="flex items-center justify-between border-b border-[var(--color-border)] py-6 text-text"
                >
                  <span
                    style={{
                      fontSize: "clamp(1.75rem, 8vw, 2.5rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {link.label}
                  </span>
                  <Crosshair />
                </motion.a>
              ))}
            </nav>

            {/* Bottom — social links */}
            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-6 py-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-semibold text-text-muted transition-colors hover:text-text"
                >
                  {s.label}
                </a>
              ))}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-text-muted transition-colors hover:text-text"
              >
                CV.
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
