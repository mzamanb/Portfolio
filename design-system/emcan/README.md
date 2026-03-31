# EmCan design system

Scoped tokens for the **EmCan** case study page on the portfolio. The main site keeps its default zinc + violet theme; only routes wrapped with `data-design-system="emcan"` use these values.

## Figma sync

This repo does not pull from Figma automatically. To align with your EmCan file:

1. Open the file in **Figma Desktop**.
2. Select **one** frame or variable collection (MCP does not support multi-select).
3. Use **Figma MCP → get_variable_defs** (or copy color styles manually).
4. Update **`styles/emcan-case-study.css`** and **`lib/design-system/emcan.ts`** so they stay in sync.

## Principles

- **Clarity**: loyalty balances, tiers, and CTAs read first.
- **Trust**: cool neutrals + single strong brand accent (indigo family).
- **Scale**: partner and promo surfaces reuse the same card + border rules.

## Tokens

| Role        | CSS variable              | Default (EmCan theme) |
| ----------- | ------------------------- | --------------------- |
| Accent      | `--color-accent`          | `#5b61e5`             |
| Accent hover| `--color-accent-hover`    | `#7b82f0`             |
| Accent tint | `--color-accent-dim`      | indigo 14%            |
| Page bg     | `--color-bg`              | `#08080f`             |
| Card        | `--color-bg-card`         | `#11111a`             |
| Elevated    | `--color-bg-elevated`     | `#1a1a26`             |
| Success     | `--color-emcan-success`   | `#22c55e`             |
| Warning     | `--color-emcan-warning`   | `#f59e0b`             |

Typography uses the site **Inter** stack; scale follows the case-study template (display / title / body / label).

## Spacing & radius

- Section gaps: `4rem` vertical rhythm between major blocks.
- Cards: `rounded-xl` (`--radius` family in TS mirror).
- Grid metrics: 4 / 8 / 12 / 16 spacing where possible.

## Where it is applied

- `app/case-study/[slug]/CaseStudyPage.tsx` sets `data-design-system="emcan"` when `study.id === "emcan"`.
- `app/globals.css` imports `styles/emcan-case-study.css`.
- `components/emcan/EmcanDesignSystemShowcase.tsx` renders a **Design system** section on the EmCan case study (colors, type, spacing, radius, sample components). Data comes from `lib/design-system/emcan.ts`.
