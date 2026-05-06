"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function MentorTopBar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    fetch("/api/auth/mentor", { credentials: "include" })
      .then((r) => r.json())
      .then((d: { protected?: boolean }) => setShowLogout(!!d.protected))
      .catch(() => setShowLogout(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/mentor", {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      // still navigate away
    }
    router.push("/mentor/login");
    router.refresh();
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="px-4 pt-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/70 px-5 py-3 shadow-architecture backdrop-blur-xl md:px-6 md:py-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary transition-colors hover:text-text"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
          <span className="min-w-0 truncate text-[12px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            MENTOR
          </span>
          <div className="flex items-center gap-1.5">
            {showLogout ? (
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out of MENTOR"
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 text-text-secondary transition-all hover:border-[var(--color-border)] hover:bg-[var(--color-bg-elevated)] hover:text-text"
                title="Log out"
              >
                <LogOut size={15} />
              </button>
            ) : null}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 text-text-secondary transition-all hover:border-[var(--color-border)] hover:bg-[var(--color-bg-elevated)] hover:text-text"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
