"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Loader2, Moon, Sun, ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function MentorLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/mentor", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setError(d.error || "Invalid password");
        return;
      }
      router.push("/mentor");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-architecture-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[20%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--color-accent-dim)] blur-[100px]" />
      </div>

      <div className="relative z-10 px-4 pt-4">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/70 px-5 py-3 shadow-architecture backdrop-blur-xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary transition-colors hover:text-text"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            MENTOR access
          </span>
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

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/70 p-8 shadow-architecture backdrop-blur-xl md:p-10">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
              }}
            />

            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent shadow-[0_4px_16px_-4px_rgba(16,185,129,0.4)]">
                <Lock size={20} strokeWidth={1.75} />
              </div>
              <span className="mb-2 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-5 bg-accent/60" />
                Restricted
                <span className="h-px w-5 bg-accent/60" />
              </span>
              <h1 className="mb-1.5 text-[1.625rem] font-medium tracking-tight">
                MENTOR
              </h1>
              <p className="text-[13px] leading-relaxed text-text-muted">
                Enter the password to view this page
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="mentor-password"
                  className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted"
                >
                  Password
                </label>
                <input
                  id="mentor-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 text-[14px] text-text outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  autoFocus
                  required
                />
              </div>
              {error && (
                <p
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-[12.5px] text-red-500"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-4 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:bg-accent-hover disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={15} />
                ) : (
                  <ShieldCheck size={15} />
                )}
                {loading ? "Verifying…" : "Continue"}
              </button>
            </form>

            <p className="mt-6 text-center text-[11.5px] text-text-muted">
              Local-only · Encrypted at rest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
