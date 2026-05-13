"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function MentorTopBar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  const path = (pathname.replace(/\/$/, "") || "/") as string;
  const isProductRecord = path === "/mentor/product-record";
  const isFigmaMentor = path === "/mentor";

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

  const segmentClass = (active: boolean) =>
    [
      "min-w-0 max-w-[44%] shrink truncate rounded-lg px-2.5 py-2 text-center text-[11px] font-medium leading-tight transition-colors sm:max-w-none sm:px-3 sm:text-[12px]",
      active
        ? "border border-[var(--color-border)] bg-[var(--color-accent-dim)] text-accent"
        : "border border-transparent text-text-secondary hover:bg-[var(--color-bg-hover)] hover:text-text",
    ].join(" ");

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="px-4 pt-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/70 px-3 py-3 shadow-architecture backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-3.5">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 text-[12px] font-medium text-text-secondary transition-colors hover:text-text sm:text-[13px]"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <nav
            className="flex min-w-0 max-w-[min(100%,14rem)] flex-1 items-center justify-center gap-0.5 rounded-xl bg-[var(--color-bg-elevated)]/50 p-0.5 sm:max-w-none sm:gap-1 sm:p-1"
            aria-label="MENTOR surfaces"
          >
            <Link
              href="/mentor"
              className={segmentClass(isFigmaMentor)}
              aria-current={isFigmaMentor ? "page" : undefined}
            >
              Figma plugin
            </Link>
            <Link
              href="/mentor/product-record"
              className={segmentClass(isProductRecord)}
              aria-current={isProductRecord ? "page" : undefined}
            >
              VS Code IDE
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
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
