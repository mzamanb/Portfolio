"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const leftLinks = [
  { label: "Work",     href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
];

export default function Navbar({ resumeUrl }: { resumeUrl: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)]"
        style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        <div className="mx-auto grid h-14 max-w-7xl grid-cols-3 items-center px-6">
          {/* Left — nav links */}
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
          <div className="flex justify-center">
            <a
              href="#home"
              className="text-[15px] font-bold tracking-[-0.02em] text-text"
            >
              Zaman.
            </a>
          </div>

          {/* Right — social + CTA */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden items-center gap-0.5 md:flex">
              <a
                href="https://www.linkedin.com/in/zamanbayezid/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text"
              >
                LI.
              </a>
              <a
                href="https://github.com/mzamanb"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text"
              >
                GH.
              </a>
            </div>

            {/* Theme toggle — small */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hidden rounded-full px-3 py-1.5 text-[12px] text-text-muted transition-colors hover:text-text md:block"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>

            {/* Contact pill */}
            <a
              href="#contact"
              className="hidden h-8 items-center rounded-full bg-text px-4 text-[13px] font-medium text-bg transition-opacity hover:opacity-80 md:inline-flex"
            >
              Contact
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border-strong)] text-text-secondary md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-14 z-40 border-b border-[var(--color-border)]"
            style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)" }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
              {[...leftLinks, { label: "Contact", href: "#contact" }].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-text"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-xl border border-[var(--color-border-strong)] px-4 py-3 text-sm text-text"
              >
                Resume ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
