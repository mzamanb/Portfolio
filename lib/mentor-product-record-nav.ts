/** Keep in sync with sidebar nav in content/mentor-product-record.html (same ids & order). */

export type ProductRecordNavGroup = "Foundation" | "Phases" | "Future";

export type ProductRecordNavItem = {
  id: string;
  label: string;
  group: ProductRecordNavGroup;
};

export const PRODUCT_RECORD_NAV_ITEMS: ProductRecordNavItem[] = [
  { id: "overview", label: "Overview", group: "Foundation" },
  { id: "problem", label: "Problem + solution", group: "Foundation" },
  { id: "architecture", label: "Architecture", group: "Foundation" },
  { id: "courses", label: "Course structure", group: "Foundation" },
  { id: "design", label: "Design system", group: "Foundation" },
  { id: "metrics", label: "Metrics", group: "Foundation" },
  { id: "p1", label: "Phase 1 — Web layer", group: "Phases" },
  { id: "p2", label: "Phase 2 — VS Code bridge", group: "Phases" },
  { id: "p3", label: "Phase 3 — Lesson engine", group: "Phases" },
  { id: "p4", label: "Phase 4 — Realtime dashboard", group: "Phases" },
  { id: "p5", label: "Phase 5 — AI tutor", group: "Phases" },
  { id: "p6", label: "Phase 6 — Polish + publish", group: "Phases" },
  { id: "backlog", label: "Backlog", group: "Future" },
];

const GROUP_ORDER: ProductRecordNavGroup[] = [
  "Foundation",
  "Phases",
  "Future",
];

export function productRecordNavGroups(): {
  group: ProductRecordNavGroup;
  items: ProductRecordNavItem[];
}[] {
  return GROUP_ORDER.map((group) => ({
    group,
    items: PRODUCT_RECORD_NAV_ITEMS.filter((i) => i.group === group),
  }));
}

export function productRecordNavLabel(id: string): string | undefined {
  return PRODUCT_RECORD_NAV_ITEMS.find((i) => i.id === id)?.label;
}
