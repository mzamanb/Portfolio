"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Save,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Eye,
  ArrowLeft,
  Check,
  AlertCircle,
  Loader2,
  Lock,
  LogOut,
  Database,
  ShieldCheck,
} from "lucide-react";
import type { SiteContent } from "@/lib/content";
import ImageField from "@/components/ImageField";

type Tab =
  | "hero"
  | "skills"
  | "caseStudies"
  | "projects"
  | "contact"
  | "footer"
  | "seo";

const IDLE_LOGOUT_MS = 10 * 60 * 1000;
const MOUSEMOVE_THROTTLE_MS = 15_000;

const tabs: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "skills", label: "Skills" },
  { id: "caseStudies", label: "Case studies" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
  { id: "seo", label: "SEO" },
];

/* ---------- Login Screen ---------- */

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password");
        return;
      }
      onSuccess();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-6">
      <div className="pointer-events-none absolute inset-0 bg-architecture-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[20%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--color-accent-dim)] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
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
              Admin
              <span className="h-px w-5 bg-accent/60" />
            </span>
            <h1 className="mb-1.5 text-[1.625rem] font-medium tracking-tight">
              Content manager
            </h1>
            <p className="text-[13px] leading-relaxed text-text-muted">
              Enter your password to manage content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 text-[14px] text-text outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            {error && (
              <p
                className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12.5px] text-red-500"
                role="alert"
              >
                <AlertCircle size={12} /> {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-4 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:bg-accent-hover disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <ShieldCheck size={15} />
              )}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[11.5px] text-text-muted">
            <a
              href="/"
              className="text-text-secondary transition-colors hover:text-text"
            >
              ← Back to portfolio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Admin ---------- */

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/auth", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setAuthed(data.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/content", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          setAuthed(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => setError("Failed to load content"));
  }, [authed]);

  const save = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }, [content]);

  const seedToSupabase = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        credentials: "include",
      });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Seed failed");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Seed failed");
    } finally {
      setSaving(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth", { method: "DELETE", credentials: "include" });
    setAuthed(false);
    setContent(null);
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      idleTimerRef.current = null;
      void logout();
    }, IDLE_LOGOUT_MS);
  }, [logout]);

  useEffect(() => {
    if (!authed) return;

    const opts: AddEventListenerOptions = { capture: true, passive: true };
    const onActivity = () => resetIdleTimer();
    let lastMoveAt = 0;
    const onMouseMove = () => {
      const now = Date.now();
      if (now - lastMoveAt < MOUSEMOVE_THROTTLE_MS) return;
      lastMoveAt = now;
      resetIdleTimer();
    };

    resetIdleTimer();

    document.addEventListener("mousedown", onActivity, opts);
    document.addEventListener("keydown", onActivity, opts);
    document.addEventListener("scroll", onActivity, opts);
    document.addEventListener("touchstart", onActivity, opts);
    document.addEventListener("click", onActivity, opts);
    document.addEventListener("mousemove", onMouseMove, opts);

    return () => {
      if (idleTimerRef.current !== null) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      document.removeEventListener("mousedown", onActivity, opts);
      document.removeEventListener("keydown", onActivity, opts);
      document.removeEventListener("scroll", onActivity, opts);
      document.removeEventListener("touchstart", onActivity, opts);
      document.removeEventListener("click", onActivity, opts);
      document.removeEventListener("mousemove", onMouseMove, opts);
    };
  }, [authed, resetIdleTimer]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateField = (path: string, value: unknown) => {
    if (!content) return;
    const clone = JSON.parse(JSON.stringify(content));
    const keys = path.split(".");
    let obj = clone as Record<string, unknown>;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    obj[keys[keys.length - 1]] = value;
    setContent(clone);
  };

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 size={22} className="animate-spin text-accent" />
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 size={22} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 bg-architecture-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_50%)]" />

      <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 px-3 text-[12.5px] font-medium text-text-secondary backdrop-blur transition-all hover:border-[var(--color-border)] hover:text-text"
            >
              <ArrowLeft size={13} />
              View site
            </a>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-soft text-[11px] font-bold text-white">
                Z
              </span>
              <h1 className="text-[13px] font-semibold tracking-tight">
                Content manager
                <span className="text-accent">.</span>
              </h1>
            </div>
            <span className="hidden text-[11px] text-text-muted lg:inline">
              · Signs out after 10 min idle
            </span>
          </div>
          <div className="flex items-center gap-2">
            {error && (
              <span className="flex items-center gap-1 rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-500">
                <AlertCircle size={11} /> {error}
              </span>
            )}
            {saved && (
              <span className="flex items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent">
                <Check size={11} /> Saved
              </span>
            )}
            <a
              href="/"
              target="_blank"
              className="hidden h-9 items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 px-3 text-[12px] font-medium text-text-secondary backdrop-blur transition-all hover:border-[var(--color-border)] hover:text-text sm:inline-flex"
            >
              <Eye size={13} />
              Preview
            </a>
            <button
              onClick={seedToSupabase}
              disabled={saving}
              className="hidden h-9 items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 px-3 text-[12px] font-medium text-text-secondary backdrop-blur transition-all hover:border-[var(--color-border)] hover:text-text disabled:opacity-50 sm:inline-flex"
              title="Push local content to Supabase database"
            >
              <Database size={13} />
              Seed DB
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[12.5px] font-semibold text-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.5)] transition-all hover:bg-accent-hover disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Save size={13} />
              )}
              Save
            </button>
            <button
              onClick={logout}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/60 text-text-muted backdrop-blur transition-all hover:border-red-500/30 hover:text-red-500"
              title="Sign out"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-7xl gap-0">
        <aside className="sticky top-[57px] h-[calc(100vh-57px)] w-60 shrink-0 border-r border-[var(--color-border-subtle)] p-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Sections
          </p>
          <nav className="flex flex-col gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-[var(--color-bg-elevated)] hover:text-text"
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                ) : (
                  <ChevronRight
                    size={12}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                )}
              </button>
            ))}
          </nav>
        </aside>

        <main className="relative flex-1 p-6 md:p-8">
          {activeTab === "hero" && (
            <HeroEditor content={content} updateField={updateField} />
          )}
          {activeTab === "skills" && (
            <SkillsEditor
              content={content}
              setContent={setContent}
              updateField={updateField}
            />
          )}
          {activeTab === "caseStudies" && (
            <CaseStudiesEditor
              content={content}
              setContent={setContent}
              updateField={updateField}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
            />
          )}
          {activeTab === "projects" && (
            <ProjectsEditor
              content={content}
              setContent={setContent}
              updateField={updateField}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
            />
          )}
          {activeTab === "contact" && (
            <ContactEditor content={content} updateField={updateField} />
          )}
          {activeTab === "footer" && (
            <FooterEditor content={content} updateField={updateField} />
          )}
          {activeTab === "seo" && (
            <SEOEditor content={content} updateField={updateField} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- Field components ---------- */

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-3 py-2.5 text-[13.5px] text-text outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-3 py-2.5 text-[13.5px] text-text outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      )}
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <span className="mb-2 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent">
        <span className="h-px w-5 bg-accent/60" />
        Editing
      </span>
      <h2 className="mb-1 text-2xl font-medium tracking-tight">{title}</h2>
      <p className="text-[13px] text-text-muted">{description}</p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-6 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-border-strong), transparent)",
        }}
      />
      {children}
    </div>
  );
}

function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-dashed border-[var(--color-border)] bg-[var(--color-bg-card)]/40 px-4 text-[12.5px] font-medium text-text-secondary backdrop-blur transition-all hover:border-accent/40 hover:text-accent"
    >
      <Plus size={13} />
      {label}
    </button>
  );
}

/* ---------- Section Editors ---------- */

function HeroEditor({
  content,
  updateField,
}: {
  content: SiteContent;
  updateField: (path: string, value: unknown) => void;
}) {
  return (
    <div className="max-w-2xl">
      <SectionHeader
        title="Hero section"
        description="The first thing visitors see on your portfolio"
      />
      <Card>
        <Field
          label="Name"
          value={content.hero.name}
          onChange={(v) => updateField("hero.name", v)}
        />
        <Field
          label="Title line 1"
          value={content.hero.title[0]}
          onChange={(v) => updateField("hero.title.0", v)}
        />
        <Field
          label="Title line 2 (highlighted)"
          value={content.hero.title[1]}
          onChange={(v) => updateField("hero.title.1", v)}
        />
        <Field
          label="Subtitle"
          value={content.hero.subtitle}
          onChange={(v) => updateField("hero.subtitle", v)}
          multiline
        />
        <Field
          label="Resume URL"
          value={content.hero.resumeUrl}
          onChange={(v) => updateField("hero.resumeUrl", v)}
        />
        <Field
          label="Badge text"
          value={content.hero.badge}
          onChange={(v) => updateField("hero.badge", v)}
        />
      </Card>
    </div>
  );
}

function SkillsEditor({
  content,
  setContent,
  updateField,
}: {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  updateField: (path: string, value: unknown) => void;
}) {
  const addSkill = () => {
    const clone = JSON.parse(JSON.stringify(content)) as SiteContent;
    clone.skills.push({
      id: `skill-${Date.now()}`,
      title: "New skill",
      description: "",
      icon: "Layers",
    });
    setContent(clone);
  };

  const removeSkill = (index: number) => {
    const clone = JSON.parse(JSON.stringify(content)) as SiteContent;
    clone.skills.splice(index, 1);
    setContent(clone);
  };

  return (
    <div className="max-w-2xl">
      <SectionHeader title="Skills" description="Your core areas of expertise" />
      <div className="mb-6 flex flex-col gap-4">
        {content.skills.map((skill, i) => (
          <div
            key={skill.id}
            className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 p-6 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                Skill {String(i + 1).padStart(2, "0")}
              </span>
              <button
                onClick={() => removeSkill(i)}
                className="grid h-7 w-7 place-items-center rounded-full border border-[var(--color-border-subtle)] text-text-muted transition-all hover:border-red-500/30 hover:text-red-500"
                aria-label="Remove skill"
              >
                <Trash2 size={12} />
              </button>
            </div>
            <Field
              label="Title"
              value={skill.title}
              onChange={(v) => updateField(`skills.${i}.title`, v)}
            />
            <Field
              label="Description"
              value={skill.description}
              onChange={(v) => updateField(`skills.${i}.description`, v)}
              multiline
            />
            <Field
              label="Icon (Layers, Palette, or Users)"
              value={skill.icon}
              onChange={(v) => updateField(`skills.${i}.icon`, v)}
            />
          </div>
        ))}
      </div>
      <AddButton onClick={addSkill} label="Add skill" />
    </div>
  );
}

function CaseStudiesEditor({
  content,
  setContent,
  updateField,
  expandedItems,
  toggleExpand,
}: {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  updateField: (path: string, value: unknown) => void;
  expandedItems: Set<string>;
  toggleExpand: (id: string) => void;
}) {
  const addCaseStudy = () => {
    const clone = JSON.parse(JSON.stringify(content)) as SiteContent;
    const id = `cs-${Date.now()}`;
    clone.caseStudies.push({
      id,
      label: "case study",
      title: "New case study",
      subtitle: "",
      tags: [],
      description: "",
      image: "",
      slug: `new-case-study-${Date.now()}`,
      fullContent: {
        intro: "",
        impact: [],
        role: "",
        timeline: "",
        tools: "",
        problem: "",
        challenges: [],
        solutions: [],
        learnings: [],
        outcomes: [],
      },
    });
    setContent(clone);
  };

  const removeCaseStudy = (index: number) => {
    const clone = JSON.parse(JSON.stringify(content)) as SiteContent;
    clone.caseStudies.splice(index, 1);
    setContent(clone);
  };

  return (
    <div className="max-w-3xl">
      <SectionHeader
        title="Case studies"
        description="Your featured professional work"
      />
      <div className="mb-6 flex flex-col gap-3">
        {content.caseStudies.map((cs, i) => {
          const isExpanded = expandedItems.has(cs.id);
          return (
            <div
              key={cs.id}
              className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 backdrop-blur-md"
            >
              <button
                onClick={() => toggleExpand(cs.id)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[var(--color-bg-elevated)]/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown size={14} className="text-accent" />
                  ) : (
                    <ChevronRight size={14} className="text-text-muted" />
                  )}
                  <span className="truncate text-[13.5px] font-medium">
                    {cs.title}
                  </span>
                  <span className="hidden truncate text-[12px] text-text-muted sm:inline">
                    {cs.subtitle}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCaseStudy(i);
                  }}
                  className="grid h-7 w-7 place-items-center rounded-full border border-[var(--color-border-subtle)] text-text-muted transition-all hover:border-red-500/30 hover:text-red-500"
                  aria-label="Remove case study"
                >
                  <Trash2 size={12} />
                </button>
              </button>
              {isExpanded && (
                <div className="border-t border-[var(--color-border-subtle)] px-5 py-6">
                  <Field
                    label="Title"
                    value={cs.title}
                    onChange={(v) => updateField(`caseStudies.${i}.title`, v)}
                  />
                  <Field
                    label="Subtitle"
                    value={cs.subtitle}
                    onChange={(v) =>
                      updateField(`caseStudies.${i}.subtitle`, v)
                    }
                  />
                  <Field
                    label="Description"
                    value={cs.description}
                    onChange={(v) =>
                      updateField(`caseStudies.${i}.description`, v)
                    }
                    multiline
                  />
                  <Field
                    label="Slug"
                    value={cs.slug}
                    onChange={(v) => updateField(`caseStudies.${i}.slug`, v)}
                  />
                  <ImageField
                    label="Cover image"
                    value={cs.image}
                    onChange={(v) => updateField(`caseStudies.${i}.image`, v)}
                  />
                  <Field
                    label="Tags (comma-separated)"
                    value={cs.tags.join(", ")}
                    onChange={(v) =>
                      updateField(
                        `caseStudies.${i}.tags`,
                        v
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                      )
                    }
                  />

                  <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
                    <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Full case study content
                    </p>
                    <Field
                      label="Intro"
                      value={cs.fullContent.intro}
                      onChange={(v) =>
                        updateField(`caseStudies.${i}.fullContent.intro`, v)
                      }
                      multiline
                    />
                    <Field
                      label="Role"
                      value={cs.fullContent.role}
                      onChange={(v) =>
                        updateField(`caseStudies.${i}.fullContent.role`, v)
                      }
                      multiline
                    />
                    <Field
                      label="Timeline"
                      value={cs.fullContent.timeline}
                      onChange={(v) =>
                        updateField(
                          `caseStudies.${i}.fullContent.timeline`,
                          v
                        )
                      }
                    />
                    <Field
                      label="Tools & tech"
                      value={cs.fullContent.tools}
                      onChange={(v) =>
                        updateField(`caseStudies.${i}.fullContent.tools`, v)
                      }
                    />
                    <Field
                      label="Problem"
                      value={cs.fullContent.problem}
                      onChange={(v) =>
                        updateField(
                          `caseStudies.${i}.fullContent.problem`,
                          v
                        )
                      }
                      multiline
                    />
                  </div>

                  <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
                    <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                      UI showcase — overview image
                    </p>
                    <ImageField
                      label="Showcase image"
                      value={cs.fullContent.showcaseImage?.url || ""}
                      onChange={(v) =>
                        updateField(
                          `caseStudies.${i}.fullContent.showcaseImage`,
                          {
                            url: v,
                            caption:
                              cs.fullContent.showcaseImage?.caption || "",
                          }
                        )
                      }
                    />
                    <Field
                      label="Showcase image caption"
                      value={cs.fullContent.showcaseImage?.caption || ""}
                      onChange={(v) =>
                        updateField(
                          `caseStudies.${i}.fullContent.showcaseImage`,
                          {
                            url: cs.fullContent.showcaseImage?.url || "",
                            caption: v,
                          }
                        )
                      }
                    />
                  </div>

                  {cs.fullContent.solutions.map((sol, si) => (
                    <div
                      key={si}
                      className="mt-6 border-t border-[var(--color-border-subtle)] pt-6"
                    >
                      <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                        Solution {si + 1}: {sol.title} — showcase images
                      </p>
                      {(sol.showcaseImages || []).map((img, ii) => (
                        <div
                          key={ii}
                          className="mb-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 p-4 backdrop-blur"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                              Image {ii + 1}
                            </span>
                            <button
                              onClick={() => {
                                const clone = JSON.parse(
                                  JSON.stringify(content)
                                ) as SiteContent;
                                clone.caseStudies[i].fullContent.solutions[
                                  si
                                ].showcaseImages?.splice(ii, 1);
                                setContent(clone);
                              }}
                              className="grid h-6 w-6 place-items-center rounded-full text-text-muted transition-colors hover:text-red-500"
                              aria-label="Remove image"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                          <ImageField
                            label="Image"
                            value={img.url}
                            onChange={(v) =>
                              updateField(
                                `caseStudies.${i}.fullContent.solutions.${si}.showcaseImages.${ii}.url`,
                                v
                              )
                            }
                          />
                          <Field
                            label="Caption"
                            value={img.caption}
                            onChange={(v) =>
                              updateField(
                                `caseStudies.${i}.fullContent.solutions.${si}.showcaseImages.${ii}.caption`,
                                v
                              )
                            }
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const clone = JSON.parse(
                            JSON.stringify(content)
                          ) as SiteContent;
                          const target =
                            clone.caseStudies[i].fullContent.solutions[si];
                          if (!target.showcaseImages)
                            target.showcaseImages = [];
                          target.showcaseImages.push({ url: "", caption: "" });
                          setContent(clone);
                        }}
                        className="inline-flex items-center gap-1 text-[11.5px] font-medium text-text-muted transition-colors hover:text-accent"
                      >
                        <Plus size={11} />
                        Add showcase image
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AddButton onClick={addCaseStudy} label="Add case study" />
    </div>
  );
}

function ProjectsEditor({
  content,
  setContent,
  updateField,
  expandedItems,
  toggleExpand,
}: {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  updateField: (path: string, value: unknown) => void;
  expandedItems: Set<string>;
  toggleExpand: (id: string) => void;
}) {
  const addProject = () => {
    const clone = JSON.parse(JSON.stringify(content)) as SiteContent;
    clone.projects.push({
      id: `proj-${Date.now()}`,
      title: "New project",
      description: "",
      image: "",
      tags: [],
    });
    setContent(clone);
  };

  const removeProject = (index: number) => {
    const clone = JSON.parse(JSON.stringify(content)) as SiteContent;
    clone.projects.splice(index, 1);
    setContent(clone);
  };

  return (
    <div className="max-w-3xl">
      <SectionHeader
        title="Personal projects"
        description="Your side projects and explorations"
      />
      <div className="mb-6 flex flex-col gap-3">
        {content.projects.map((proj, i) => {
          const isExpanded = expandedItems.has(proj.id);
          return (
            <div
              key={proj.id}
              className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 backdrop-blur-md"
            >
              <button
                onClick={() => toggleExpand(proj.id)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[var(--color-bg-elevated)]/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown size={14} className="text-accent" />
                  ) : (
                    <ChevronRight size={14} className="text-text-muted" />
                  )}
                  <span className="truncate text-[13.5px] font-medium">
                    {proj.title}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(i);
                  }}
                  className="grid h-7 w-7 place-items-center rounded-full border border-[var(--color-border-subtle)] text-text-muted transition-all hover:border-red-500/30 hover:text-red-500"
                  aria-label="Remove project"
                >
                  <Trash2 size={12} />
                </button>
              </button>
              {isExpanded && (
                <div className="border-t border-[var(--color-border-subtle)] px-5 py-6">
                  <Field
                    label="Title"
                    value={proj.title}
                    onChange={(v) => updateField(`projects.${i}.title`, v)}
                  />
                  <Field
                    label="Description"
                    value={proj.description}
                    onChange={(v) =>
                      updateField(`projects.${i}.description`, v)
                    }
                    multiline
                  />
                  <ImageField
                    label="Project image"
                    value={proj.image}
                    onChange={(v) => updateField(`projects.${i}.image`, v)}
                  />
                  <Field
                    label="Tags (comma-separated)"
                    value={proj.tags.join(", ")}
                    onChange={(v) =>
                      updateField(
                        `projects.${i}.tags`,
                        v
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AddButton onClick={addProject} label="Add project" />
    </div>
  );
}

function ContactEditor({
  content,
  updateField,
}: {
  content: SiteContent;
  updateField: (path: string, value: unknown) => void;
}) {
  return (
    <div className="max-w-2xl">
      <SectionHeader title="Contact" description="How people can reach you" />
      <Card>
        <Field
          label="Heading"
          value={content.contact.heading}
          onChange={(v) => updateField("contact.heading", v)}
        />
        <Field
          label="Description"
          value={content.contact.description}
          onChange={(v) => updateField("contact.description", v)}
          multiline
        />
        <Field
          label="Email"
          value={content.contact.email}
          onChange={(v) => updateField("contact.email", v)}
        />
        <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
            Social links
          </p>
          {Object.entries(content.contact.social).map(([key, url]) => (
            <Field
              key={key}
              label={key}
              value={url}
              onChange={(v) => updateField(`contact.social.${key}`, v)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

function FooterEditor({
  content,
  updateField,
}: {
  content: SiteContent;
  updateField: (path: string, value: unknown) => void;
}) {
  return (
    <div className="max-w-2xl">
      <SectionHeader
        title="Footer"
        description="Bottom section of your portfolio"
      />
      <Card>
        <Field
          label="Tagline"
          value={content.footer.tagline}
          onChange={(v) => updateField("footer.tagline", v)}
          multiline
        />
        <Field
          label="Copyright"
          value={content.footer.copyright}
          onChange={(v) => updateField("footer.copyright", v)}
        />
      </Card>
    </div>
  );
}

function SEOEditor({
  content,
  updateField,
}: {
  content: SiteContent;
  updateField: (path: string, value: unknown) => void;
}) {
  const seo = content.seo ?? {
    siteUrl: "",
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
    twitterHandle: "",
    linkedinUrl: "",
    googleVerification: "",
  };

  return (
    <div className="max-w-2xl">
      <SectionHeader
        title="SEO &amp; meta tags"
        description="Search engine optimization, social sharing, and site verification"
      />

      <div className="mb-6">
        <Card>
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
            General
          </p>
          <Field
            label="Site URL"
            value={seo.siteUrl}
            onChange={(v) => updateField("seo.siteUrl", v)}
            placeholder="https://www.zamandesigns.com"
          />
          <Field
            label="Default page title"
            value={seo.title}
            onChange={(v) => updateField("seo.title", v)}
            placeholder="Zaman Bayezid — Lead Product Designer"
          />
          <Field
            label="Meta description"
            value={seo.description}
            onChange={(v) => updateField("seo.description", v)}
            multiline
            placeholder="A concise description of your portfolio (150–160 characters ideal)"
          />
          <Field
            label="Keywords (comma-separated)"
            value={seo.keywords}
            onChange={(v) => updateField("seo.keywords", v)}
            multiline
            placeholder="product designer, UX, UI, portfolio"
          />
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
            Social sharing (Open Graph)
          </p>
          <ImageField
            label="OG image (1200×630 recommended)"
            value={seo.ogImage}
            onChange={(v) => updateField("seo.ogImage", v)}
          />
          <Field
            label="Twitter handle"
            value={seo.twitterHandle}
            onChange={(v) => updateField("seo.twitterHandle", v)}
            placeholder="@yourhandle"
          />
          <Field
            label="LinkedIn URL"
            value={seo.linkedinUrl}
            onChange={(v) => updateField("seo.linkedinUrl", v)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </Card>
      </div>

      <Card>
        <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
          Verification
        </p>
        <Field
          label="Google Search Console verification code"
          value={seo.googleVerification}
          onChange={(v) => updateField("seo.googleVerification", v)}
          placeholder="Paste the content value from Google Search Console"
        />
        <p className="mt-2 text-[11.5px] text-text-muted">
          Auto-generated: sitemap.xml, robots.txt, JSON-LD structured data
        </p>
      </Card>
    </div>
  );
}
