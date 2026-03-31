import { emcanDesignSystem } from "@/lib/design-system/emcan";

const COLOR_LABELS: Record<string, string> = {
  accent: "Brand accent",
  accentHover: "Accent hover",
  accentDim: "Accent surface",
  bg: "Canvas",
  bgCard: "Card",
  bgElevated: "Elevated",
  border: "Border",
  borderSubtle: "Border subtle",
  text: "Primary text",
  textSecondary: "Secondary text",
  textMuted: "Muted text",
  success: "Success",
  successDim: "Success surface",
  warning: "Warning",
  warningDim: "Warning surface",
};

export function EmcanDesignSystemShowcase() {
  const ds = emcanDesignSystem;
  const colors = Object.entries(ds.color) as [string, string][];

  return (
    <section className="mb-16">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
        <span className="text-xs font-medium uppercase tracking-widest text-accent">
          Design system
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-accent/30 to-transparent" />
      </div>

      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-text-secondary">
        Tokens and patterns used across the EmCan loyalty experience: a single
        indigo accent on cool midnight surfaces, semantic greens and ambers for
        rewards and alerts, and tight type hierarchy for scanning on the go.
      </p>

      {/* Principles */}
      <div className="mb-12 rounded-2xl border border-border-subtle bg-bg-card/40 p-6 md:p-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-accent">
          Principles
        </p>
        <ul className="space-y-3">
          {ds.principles.map((p, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-text-secondary"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Color */}
      <div className="mb-12">
        <h3 className="mb-2 text-lg font-bold tracking-tight">Color</h3>
        <p className="mb-6 text-sm text-text-muted">
          CSS variables map to Tailwind tokens on this page (
          <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-xs text-text-secondary">
            --color-accent
          </code>
          , etc.).
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map(([key, hex]) => (
            <div
              key={key}
              className="overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated"
            >
              <div
                className="aspect-[4/3] w-full border-b border-border-subtle"
                style={{ backgroundColor: hex }}
              />
              <div className="p-3">
                <p className="text-xs font-medium text-text">
                  {COLOR_LABELS[key] ?? key}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                  {hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="mb-12">
        <h3 className="mb-2 text-lg font-bold tracking-tight">Typography</h3>
        <p className="mb-6 text-sm text-text-muted">
          Inter · scale for mobile loyalty UI ({ds.type.display} display down to
          label).
        </p>
        <div className="space-y-6 rounded-2xl border border-border-subtle bg-bg-card/40 p-6 md:p-8">
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Display · {ds.type.display}
            </p>
            <p className="text-4xl font-bold tracking-tight text-text md:text-5xl">
              2,450 pts
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Title · {ds.type.title}
            </p>
            <p className="text-2xl font-bold tracking-tight text-text">
              Active promotions
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Body · {ds.type.body}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
              Your next reward unlocks after one more visit. Offers shown here
              match your usual station and fuel type.
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Label · {ds.type.label}
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Partner offer
            </p>
          </div>
        </div>
      </div>

      {/* Spacing & radius */}
      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border-subtle bg-bg-card/40 p-6">
          <h3 className="mb-4 text-sm font-bold tracking-tight">Radius</h3>
          <div className="flex flex-wrap items-end gap-4">
            {(
              Object.entries(ds.radius) as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="text-center">
                <div
                  className="mb-2 h-14 w-14 border-2 border-accent/40 bg-accent/5"
                  style={{ borderRadius: v }}
                />
                <p className="text-[10px] font-medium uppercase text-text-muted">
                  {k}
                </p>
                <p className="font-mono text-[10px] text-text-secondary">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-bg-card/40 p-6">
          <h3 className="mb-4 text-sm font-bold tracking-tight">Spacing</h3>
          <div className="space-y-3 text-sm text-text-secondary">
            <div className="flex items-center gap-3">
              <span
                className="h-3 rounded-sm bg-accent/30"
                style={{ width: ds.space.tight }}
              />
              <span className="text-text-muted">Tight · {ds.space.tight}</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="h-3 rounded-sm bg-accent/30"
                style={{ width: ds.space.block }}
              />
              <span className="text-text-muted">Block · {ds.space.block}</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="h-3 rounded-sm bg-accent/30"
                style={{ width: "4rem" }}
              />
              <span className="text-text-muted">
                Section · {ds.space.section}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Components */}
      <div>
        <h3 className="mb-2 text-lg font-bold tracking-tight">Components</h3>
        <p className="mb-6 text-sm text-text-muted">
          Patterns reused in flows: rewards, promos, and partner modules.
        </p>
        <div className="grid gap-6 rounded-2xl border border-border-subtle bg-bg-card/30 p-6 md:grid-cols-2 md:p-8">
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Badges & chips
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Active
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: ds.color.successDim,
                  color: ds.color.success,
                }}
              >
                +35 pts
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: ds.color.warningDim,
                  color: ds.color.warning,
                }}
              >
                Expires soon
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Actions
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Redeem now
              </button>
              <button
                type="button"
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text"
              >
                View details
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Reward card
            </p>
            <div className="max-w-sm rounded-xl border border-border-subtle bg-bg-elevated p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    Car wash
                  </p>
                  <p className="mt-1 text-lg font-bold text-text">
                    3 washes left
                  </p>
                </div>
                <span
                  className="rounded-lg px-2 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: ds.color.successDim,
                    color: ds.color.success,
                  }}
                >
                  Active
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg-card">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "66%",
                    backgroundColor: ds.color.accent,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-text-muted">
                Next wash free after 1 more purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
