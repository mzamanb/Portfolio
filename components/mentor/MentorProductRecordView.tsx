"use client";

import {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  type MutableRefObject,
} from "react";
import { Menu, X } from "lucide-react";
import "./mentor-product-record.css";
import {
  productRecordNavGroups,
  PRODUCT_RECORD_NAV_ITEMS,
} from "@/lib/mentor-product-record-nav";

declare global {
  interface Window {
    show?: (id: string) => void;
  }
}

const VALID_IDS = new Set(PRODUCT_RECORD_NAV_ITEMS.map((i) => i.id));

/**
 * Isolated from parent re-renders (menu open/close) so React does not reset
 * dangerouslySetInnerHTML and wipe sidebar/section DOM after each show().
 */
const MentorProductRecordMarkup = memo(function MentorProductRecordMarkup({
  html,
  activeSectionRef,
}: {
  html: string;
  activeSectionRef: MutableRefObject<string>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const show = (id: string) => {
      root.querySelectorAll(".section").forEach((s) => {
        s.classList.remove("active");
      });
      root.querySelectorAll(".nav-item").forEach((n) => {
        n.classList.remove("active");
      });
      root.querySelector(`#${CSS.escape(id)}`)?.classList.add("active");
      root.querySelectorAll(".nav-item").forEach((item) => {
        const oc = item.getAttribute("onclick");
        const m = oc?.match(/show\('([^']+)'\)/);
        if (m?.[1] === id) item.classList.add("active");
      });
      if (VALID_IDS.has(id)) {
        activeSectionRef.current = id;
      }
    };

    window.show = show;
    return () => {
      if (window.show === show) {
        delete window.show;
      }
    };
  }, [activeSectionRef]);

  return (
    <div
      ref={rootRef}
      className="mpr relative z-0 w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

export function MentorProductRecordView({ html }: { html: string }) {
  const activeSectionRef = useRef("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const close = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", close);
    close();
    return () => mq.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const pickSection = (id: string) => {
    window.show?.(id);
    setMenuOpen(false);
  };

  const activeId = menuOpen ? activeSectionRef.current : null;

  return (
    <div className="w-full">
      <div className="sticky top-[5rem] z-20 hidden max-[900px]:flex max-[900px]:items-center max-[900px]:justify-end max-[900px]:border-b max-[900px]:border-[var(--color-border)] max-[900px]:bg-[var(--color-bg)]/95 max-[900px]:px-4 max-[900px]:py-2 max-[900px]:backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mpr-roadmap-panel"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2 text-[13px] font-semibold text-text shadow-sm outline-none transition-[border-color,box-shadow] focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-dim)]"
        >
          {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          Roadmap
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close roadmap"
            className="fixed inset-0 z-30 hidden bg-[var(--color-bg)]/60 backdrop-blur-[2px] max-[900px]:block"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mpr-roadmap-panel"
            role="dialog"
            aria-label="Product roadmap sections"
            className="fixed left-0 right-0 z-40 hidden max-h-[min(72vh,calc(100dvh-8rem))] overflow-y-auto border-b border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-architecture max-[900px]:block"
            style={{ top: "calc(5rem + 2.75rem)" }}
          >
            <nav className="px-4 py-3 pb-5" aria-label="Roadmap sections">
              {productRecordNavGroups().map(({ group, items }) => (
                <div key={group} className="mb-4 last:mb-0">
                  <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    {group}
                  </p>
                  <ul className="space-y-0.5">
                    {items.map((item) => {
                      const active = activeId === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => pickSection(item.id)}
                            className={
                              active
                                ? "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-accent-dim)] px-3 py-2.5 text-left text-[13px] font-medium text-accent"
                                : "w-full rounded-lg border border-transparent px-3 py-2.5 text-left text-[13px] font-medium text-text-secondary transition-colors hover:bg-[var(--color-bg-hover)] hover:text-text"
                            }
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </>
      ) : null}

      <MentorProductRecordMarkup html={html} activeSectionRef={activeSectionRef} />
    </div>
  );
}
