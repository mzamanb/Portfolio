/**
 * Hierarchical options: capability area → specific need.
 * Aligned with portfolio focus (product/UX, systems, research, AI workflows, delivery, case work, collaboration).
 */
export type SubOption = {
  id: string;
  label: string;
  /** If true, the details step must not be "none" / empty. */
  requiresCustomDetails?: boolean;
};

export type CapabilityGroup = {
  id: string;
  label: string;
  description?: string;
  sub: SubOption[];
};

export const CAPABILITY_GROUPS: readonly CapabilityGroup[] = [
  {
    id: "ux",
    label: "UX, UI & product design",
    description: "End-to-end product and experience design",
    sub: [
      { id: "ux-new", label: "New product, feature, or app design" },
      { id: "ux-redesign", label: "App or website redesign" },
      { id: "ux-prototype", label: "Prototypes, flows, or handoff specs" },
      { id: "ux-qa", label: "Design QA, critique, or dev handoff support" },
      {
        id: "ux-other",
        label: "Other (describe in your own words)",
        requiresCustomDetails: true,
      },
    ],
  },
  {
    id: "ds",
    label: "Design systems (Figma → code)",
    description: "Scale UI consistency and engineering speed",
    sub: [
      { id: "ds-audit", label: "System audit or health check" },
      { id: "ds-build", label: "Create or extend a design system" },
      { id: "ds-figma-code", label: "Figma, tokens, and developer alignment" },
      {
        id: "ds-other",
        label: "Other (describe in your own words)",
        requiresCustomDetails: true,
      },
    ],
  },
  {
    id: "research",
    label: "User research & testing",
    description: "Evidence-led decisions",
    sub: [
      { id: "re-usability", label: "Usability testing or eval studies" },
      { id: "re-interviews", label: "User interviews, surveys, or discovery" },
      { id: "re-plan", label: "Research plan, synthesis, or readouts" },
      {
        id: "re-other",
        label: "Other (describe in your own words)",
        requiresCustomDetails: true,
      },
    ],
  },
  {
    id: "ai",
    label: "AI × design & workflows",
    description: "AI-powered processes (from the portfolio focus)",
    sub: [
      { id: "ai-ops", label: "AI in the design or research workflow" },
      { id: "ai-prototype", label: "Faster ideation, prototypes, or automation" },
      { id: "ai-innovation", label: "Innovation process or team enablement" },
      {
        id: "ai-other",
        label: "Other (describe in your own words)",
        requiresCustomDetails: true,
      },
    ],
  },
  {
    id: "delivery",
    label: "Product, Scrum & delivery",
    description: "Leadership, workshops, and alignment (CSPO-style)",
    sub: [
      { id: "dl-workshop", label: "Workshops, roadmap, or stakeholder sessions" },
      { id: "dl-agile", label: "Agile / product process or backlog alignment" },
      { id: "dl-stakeholder", label: "Cross-functional facilitation" },
      {
        id: "dl-other",
        label: "Other (describe in your own words)",
        requiresCustomDetails: true,
      },
    ],
  },
  {
    id: "work",
    label: "Case studies & work samples",
    description: "Discuss specific portfolio work",
    sub: [
      { id: "wo-emcan", label: "EmCan loyalty (UAE fuel & rewards)" },
      { id: "wo-veehive", label: "VeeHive.ai (creator / community platform)" },
      { id: "wo-portfolio", label: "General portfolio or past projects" },
      {
        id: "wo-other",
        label: "Other project or case (describe)",
        requiresCustomDetails: true,
      },
    ],
  },
  {
    id: "engage",
    label: "Hiring, collaboration, & media",
    description: "Ways to work together or connect",
    sub: [
      { id: "en-fulltime", label: "Full-time or staff role" },
      { id: "en-contract", label: "Contract or project-based work" },
      { id: "en-mentor", label: "Mentoring or 1:1 session" },
      { id: "en-press", label: "Press, podcast, or speaking" },
      {
        id: "en-other",
        label: "Other (describe in your own words)",
        requiresCustomDetails: true,
      },
    ],
  },
] as const;

const FLAT: Map<
  string,
  { sub: SubOption; group: CapabilityGroup }
> = new Map();
for (const g of CAPABILITY_GROUPS) {
  for (const s of g.sub) {
    FLAT.set(s.id, { sub: s, group: g });
  }
}

const ALL_SUB_IDS = new Set(FLAT.keys());

export function isValidPresetId(id: string): boolean {
  return ALL_SUB_IDS.has(id);
}

export function getCapability(id: string): CapabilityGroup | undefined {
  return CAPABILITY_GROUPS.find((g) => g.id === id);
}

export function getSubMeta(id: string) {
  return FLAT.get(id);
}

export function getPresetLabel(presetId: string): string {
  const m = FLAT.get(presetId);
  if (!m) return "Unknown";
  return `${m.group.label} — ${m.sub.label}`;
}

export function presetRequiresCustomDetails(presetId: string): boolean {
  return FLAT.get(presetId)?.sub.requiresCustomDetails === true;
}
