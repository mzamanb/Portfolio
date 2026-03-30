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
} from "lucide-react";
import type { SiteContent } from "@/lib/content";
import ImageField from "@/components/ImageField";

type Tab = "hero" | "skills" | "caseStudies" | "projects" | "contact" | "footer";

const IDLE_LOGOUT_MS = 10 * 60 * 1000;
const MOUSEMOVE_THROTTLE_MS = 15_000;

const tabs: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "skills", label: "Skills" },
  { id: "caseStudies", label: "Case Studies" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
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
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <Lock size={20} className="text-accent" />
          </div>
          <h1 className="mb-1 text-xl font-bold">Admin Access</h1>
          <p className="text-sm text-text-muted">
            Enter your password to manage content
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="mb-3 w-full rounded-lg border border-border-subtle bg-bg-card px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
          {error && (
            <p className="mb-3 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} /> {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-bg transition-all hover:bg-accent-hover disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="mx-auto animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-text-muted">
          <a href="/" className="text-text-secondary hover:text-text">
            &larr; Back to portfolio
          </a>
        </p>
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
      const res = await fetch("/api/seed", { method: "POST", credentials: "include" });
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

  // Checking auth state
  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  // Not authenticated — show login
  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  // Authenticated but loading content
  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Admin header */}
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text"
            >
              <ArrowLeft size={16} />
              View Site
            </a>
            <div className="h-5 w-px bg-border-subtle" />
            <h1 className="text-sm font-semibold">
              Content Manager<span className="text-accent">.</span>
            </h1>
            <span className="hidden text-xs text-text-muted sm:inline">
              Signs out after 10 min idle
            </span>
          </div>
          <div className="flex items-center gap-3">
            {error && (
              <span className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={14} /> {error}
              </span>
            )}
            {saved && (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <Check size={14} /> Saved
              </span>
            )}
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-3 py-1.5 text-xs text-text-secondary hover:bg-bg-card"
            >
              <Eye size={14} />
              Preview
            </a>
            <button
              onClick={seedToSupabase}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-3 py-1.5 text-xs text-text-secondary hover:bg-bg-card"
              title="Push local content to Supabase database"
            >
              <Database size={14} />
              Seed DB
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-1.5 text-xs font-medium text-bg transition-all hover:bg-accent-hover disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Save Changes
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1 rounded-lg border border-border-subtle px-3 py-1.5 text-xs text-text-muted hover:bg-bg-card hover:text-red-400"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-0">
        {/* Sidebar */}
        <aside className="sticky top-[53px] h-[calc(100vh-53px)] w-56 shrink-0 border-r border-border-subtle p-4">
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-text-secondary hover:bg-bg-card hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main editor */}
        <main className="flex-1 p-8">
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
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
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
      <h2 className="mb-1 text-xl font-bold">{title}</h2>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
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
        title="Hero Section"
        description="The first thing visitors see on your portfolio"
      />
      <Field
        label="Name"
        value={content.hero.name}
        onChange={(v) => updateField("hero.name", v)}
      />
      <Field
        label="Title Line 1"
        value={content.hero.title[0]}
        onChange={(v) => updateField("hero.title.0", v)}
      />
      <Field
        label="Title Line 2 (Highlighted)"
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
        label="Badge Text"
        value={content.hero.badge}
        onChange={(v) => updateField("hero.badge", v)}
      />
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
      title: "New Skill",
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
      <SectionHeader
        title="Skills"
        description="Your core areas of expertise"
      />
      {content.skills.map((skill, i) => (
        <div
          key={skill.id}
          className="mb-6 rounded-xl border border-border-subtle bg-bg-card/30 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium">Skill {i + 1}</span>
            <button
              onClick={() => removeSkill(i)}
              className="text-text-muted hover:text-red-400"
            >
              <Trash2 size={14} />
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
      <button
        onClick={addSkill}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-text-secondary hover:border-accent hover:text-accent"
      >
        <Plus size={14} />
        Add Skill
      </button>
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
      title: "New Case Study",
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
        title="Case Studies"
        description="Your featured professional work"
      />
      {content.caseStudies.map((cs, i) => {
        const isExpanded = expandedItems.has(cs.id);
        return (
          <div
            key={cs.id}
            className="mb-4 rounded-xl border border-border-subtle bg-bg-card/30"
          >
            <button
              onClick={() => toggleExpand(cs.id)}
              className="flex w-full items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown size={16} className="text-accent" />
                ) : (
                  <ChevronRight size={16} className="text-text-muted" />
                )}
                <span className="font-medium">{cs.title}</span>
                <span className="text-sm text-text-muted">{cs.subtitle}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCaseStudy(i);
                }}
                className="text-text-muted hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </button>
            {isExpanded && (
              <div className="border-t border-border-subtle px-6 py-6">
                <Field
                  label="Title"
                  value={cs.title}
                  onChange={(v) =>
                    updateField(`caseStudies.${i}.title`, v)
                  }
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
                  label="Cover Image"
                  value={cs.image}
                  onChange={(v) =>
                    updateField(`caseStudies.${i}.image`, v)
                  }
                />
                <Field
                  label="Tags (comma-separated)"
                  value={cs.tags.join(", ")}
                  onChange={(v) =>
                    updateField(
                      `caseStudies.${i}.tags`,
                      v.split(",").map((t) => t.trim()).filter(Boolean)
                    )
                  }
                />

                <div className="mt-6 border-t border-border-subtle pt-6">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-accent">
                    Full Case Study Content
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
                    label="Tools & Tech"
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

                {/* Showcase Image (overview) */}
                <div className="mt-6 border-t border-border-subtle pt-6">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-accent">
                    UI Showcase — Overview Image
                  </p>
                  <ImageField
                    label="Showcase Image"
                    value={cs.fullContent.showcaseImage?.url || ""}
                    onChange={(v) =>
                      updateField(
                        `caseStudies.${i}.fullContent.showcaseImage`,
                        { url: v, caption: cs.fullContent.showcaseImage?.caption || "" }
                      )
                    }
                  />
                  <Field
                    label="Showcase Image Caption"
                    value={cs.fullContent.showcaseImage?.caption || ""}
                    onChange={(v) =>
                      updateField(
                        `caseStudies.${i}.fullContent.showcaseImage`,
                        { url: cs.fullContent.showcaseImage?.url || "", caption: v }
                      )
                    }
                  />
                </div>

                {/* Per-solution showcase images */}
                {cs.fullContent.solutions.map((sol, si) => (
                  <div
                    key={si}
                    className="mt-6 border-t border-border-subtle pt-6"
                  >
                    <p className="mb-4 text-xs font-medium uppercase tracking-wider text-accent">
                      Solution {si + 1}: {sol.title} — Showcase Images
                    </p>
                    {(sol.showcaseImages || []).map((img, ii) => (
                      <div
                        key={ii}
                        className="mb-4 rounded-lg border border-border-subtle bg-bg/50 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs text-text-muted">
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
                            className="text-text-muted hover:text-red-400"
                          >
                            <Trash2 size={12} />
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
                        if (!target.showcaseImages) target.showcaseImages = [];
                        target.showcaseImages.push({ url: "", caption: "" });
                        setContent(clone);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent"
                    >
                      <Plus size={12} />
                      Add showcase image
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <button
        onClick={addCaseStudy}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-text-secondary hover:border-accent hover:text-accent"
      >
        <Plus size={14} />
        Add Case Study
      </button>
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
      title: "New Project",
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
        title="Personal Projects"
        description="Your side projects and explorations"
      />
      {content.projects.map((proj, i) => {
        const isExpanded = expandedItems.has(proj.id);
        return (
          <div
            key={proj.id}
            className="mb-4 rounded-xl border border-border-subtle bg-bg-card/30"
          >
            <button
              onClick={() => toggleExpand(proj.id)}
              className="flex w-full items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown size={16} className="text-accent" />
                ) : (
                  <ChevronRight size={16} className="text-text-muted" />
                )}
                <span className="font-medium">{proj.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(i);
                }}
                className="text-text-muted hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </button>
            {isExpanded && (
              <div className="border-t border-border-subtle px-6 py-6">
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
                  label="Project Image"
                  value={proj.image}
                  onChange={(v) => updateField(`projects.${i}.image`, v)}
                />
                <Field
                  label="Tags (comma-separated)"
                  value={proj.tags.join(", ")}
                  onChange={(v) =>
                    updateField(
                      `projects.${i}.tags`,
                      v.split(",").map((t) => t.trim()).filter(Boolean)
                    )
                  }
                />
              </div>
            )}
          </div>
        );
      })}
      <button
        onClick={addProject}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-text-secondary hover:border-accent hover:text-accent"
      >
        <Plus size={14} />
        Add Project
      </button>
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
      <SectionHeader
        title="Contact"
        description="How people can reach you"
      />
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
      <div className="mt-6 border-t border-border-subtle pt-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-accent">
          Social Links
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
    </div>
  );
}
