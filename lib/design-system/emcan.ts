/**
 * EmCan design system tokens (mirror of styles/emcan-case-study.css).
 * Update both when syncing from Figma variables.
 */

export const emcanDesignSystem = {
  id: "emcan" as const,
  name: "EmCan Loyalty",
  principles: [
    "Rewards and balances must be scannable at a glance.",
    "Partner and promo content stays visually subordinate to primary tasks.",
    "High contrast for outdoor / on-the-go mobile use.",
  ],
  color: {
    accent: "#5b61e5",
    accentHover: "#7b82f0",
    accentDim: "rgba(91, 97, 229, 0.14)",
    bg: "#08080f",
    bgCard: "#11111a",
    bgElevated: "#1a1a26",
    border: "#2a2a3d",
    borderSubtle: "#1c1c2a",
    text: "#f4f4f5",
    textSecondary: "#b4b4c0",
    textMuted: "#787893",
    success: "#22c55e",
    successDim: "rgba(34, 197, 94, 0.12)",
    warning: "#f59e0b",
    warningDim: "rgba(245, 158, 11, 0.12)",
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },
  space: {
    section: "4rem",
    block: "1.5rem",
    tight: "1rem",
  },
  type: {
    display: "2.25rem / 2.5rem",
    title: "1.5rem / 2rem",
    body: "0.875rem / 1.5rem",
    label: "0.75rem / 1rem",
  },
} as const;

export function isEmcanCaseStudy(studyId: string): boolean {
  return studyId === "emcan";
}
