"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function VeloryLogo() {
  return (
    <a href="#home" className="flex items-center gap-2.5">
      <span
        className="grid h-8 w-8 place-items-center rounded-lg bg-accent"
        aria-hidden
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 12L8 4L13 12H3Z"
            fill="white"
            fillOpacity="0.9"
          />
        </svg>
      </span>
      <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-text">
        Zaman.
      </span>
    </a>
  );
}

export default function Navbar({ resumeUrl }: { resumeUrl: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)]"
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <VeloryLogo />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-[13px] text-text-secondary transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[13px] text-text-secondary transition-colors hover:text-text md:inline-flex"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="hidden h-9 items-center rounded-full bg-accent px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 md:inline-flex"
            >
              Contact Us
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center text-text md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg md:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-6">
              <VeloryLogo />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-text"
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="border-b border-[var(--color-border)] py-6 font-display text-[clamp(1.75rem,8vw,2.5rem)] font-bold tracking-[-0.03em] text-text"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-6 py-6">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 items-center rounded-full bg-accent px-6 text-[13px] font-semibold text-white"
              >
                Contact Us
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-text-muted"
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
