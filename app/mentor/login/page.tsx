"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Loader2, Moon, Sun } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="border-b border-border-subtle bg-bg/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
          >
            <ArrowLeft size={16} />
            Home
          </Link>
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
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Lock size={20} className="text-accent" />
            </div>
            <h1 className="mb-1 text-xl font-bold">MENTOR</h1>
            <p className="text-sm text-text-muted">
              Enter the password to view this page
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text outline-none transition-colors focus:border-accent"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            {error && (
              <p className="text-center text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : null}
              {loading ? "Verifying…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
