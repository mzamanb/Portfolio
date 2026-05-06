"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Currently", href: "#mentor" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ resumeUrl }: { resumeUrl: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Full-width sticky bar */}
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] backdrop-blur-xl"
        style={{ background: "var(--nav-bg)" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-text"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px var(--color-accent)" }}
            />
            Zaman.
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle — circular icon button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-strong)] bg-transparent text-text-secondary transition-all hover:border-accent hover:text-accent"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Resume pill */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] px-4 text-[13px] text-text transition-all hover:border-accent hover:text-accent sm:inline-flex"
            >
              Resume ↓
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-strong)] text-text-secondary md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
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
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-0 top-16 z-40 border-b border-[var(--color-border)] backdrop-blur-xl md:hidden"
            style={{ background: "var(--nav-bg)" }}
          >
            <div className="mx-auto max-w-6xl flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-text"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-xl border border-[var(--color-border-strong)] px-4 py-2.5 text-sm text-text"
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
