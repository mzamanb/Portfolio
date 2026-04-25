"use client";

import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function MentorTopBar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
        <span className="min-w-0 truncate text-sm font-medium text-text-muted">
          MENTOR
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-full p-2 text-text-secondary transition-colors hover:bg-bg-card hover:text-text"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}
