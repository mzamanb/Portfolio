"use client";

import { useEffect, useState } from "react";
import type { PortfolioControl, ThemeName } from "@/lib/interactive/types";

const THEME_SWATCHES: Record<ThemeName, [string, string, string]> = {
  midnight: ["#0e0e12", "#c2f04a", "#b08cff"],
  paper: ["#f4f1e9", "#ff5a2b", "#1f53ff"],
  acid: ["#08100c", "#2bff9b", "#ff3d8b"],
};

const THEME_LABELS: Record<ThemeName, string> = {
  midnight: "Midnight",
  paper: "Paper",
  acid: "Acid",
};

const THEME_KEY = "zb_theme";
const SOUND_KEY = "zb_sound";

function waitForPortfolio(fn: (p: PortfolioControl) => void): void {
  if (window.Portfolio) return fn(window.Portfolio);
  document.addEventListener("portfolio-ready", () => {
    if (window.Portfolio) fn(window.Portfolio);
  });
}

export default function Tweaks() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeName>("midnight");
  const [sound, setSound] = useState(true);

  // Hydrate saved prefs, then apply them once the control surface is ready.
  useEffect(() => {
    let initialTheme: ThemeName = "midnight";
    let initialSound = true;
    try {
      const t = localStorage.getItem(THEME_KEY) as ThemeName | null;
      if (t && t in THEME_SWATCHES) initialTheme = t;
      if (localStorage.getItem(SOUND_KEY) === "0") initialSound = false;
    } catch {
      /* ignore */
    }
    setTheme(initialTheme);
    setSound(initialSound);
    waitForPortfolio((p) => {
      p.applyTheme(initialTheme);
      p.setSound(initialSound);
    });
  }, []);

  const pickTheme = (name: ThemeName) => {
    setTheme(name);
    try {
      localStorage.setItem(THEME_KEY, name);
    } catch {
      /* ignore */
    }
    waitForPortfolio((p) => p.applyTheme(name));
  };

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    try {
      localStorage.setItem(SOUND_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
    waitForPortfolio((p) => p.setSound(next));
  };

  if (!open) {
    return (
      <button
        type="button"
        className="zb-tweaks-btn"
        onClick={() => setOpen(true)}
        aria-label="Open tweaks"
      >
        Tweaks ↗
      </button>
    );
  }

  return (
    <div className="zb-tweaks-panel" role="dialog" aria-label="Tweaks">
      <div className="zb-tweaks-hd">
        <b>Tweaks</b>
        <button
          type="button"
          className="zb-tweaks-x"
          aria-label="Close tweaks"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>
      <div className="zb-tweaks-body">
        <div className="zb-tweaks-sect">Visual direction</div>
        <div className="zb-tweaks-row">
          <span className="zb-tweaks-lbl">Theme</span>
          <div className="zb-tweaks-chips" role="radiogroup" aria-label="Theme">
            {(Object.keys(THEME_SWATCHES) as ThemeName[]).map((name) => {
              const [hero, c1, c2] = THEME_SWATCHES[name];
              return (
                <button
                  key={name}
                  type="button"
                  role="radio"
                  aria-checked={theme === name}
                  data-on={theme === name ? "1" : "0"}
                  className="zb-tweaks-chip"
                  style={{ background: hero }}
                  title={THEME_LABELS[name]}
                  onClick={() => pickTheme(name)}
                >
                  <span>
                    <i style={{ background: c1 }} />
                    <i style={{ background: c2 }} />
                  </span>
                </button>
              );
            })}
          </div>
          <div className="zb-tweaks-name">
            <span>{THEME_LABELS.midnight}</span>
            <span>{THEME_LABELS.paper}</span>
            <span>{THEME_LABELS.acid}</span>
          </div>
        </div>

        <div className="zb-tweaks-sect">Audio</div>
        <div className="zb-tweaks-row zb-tweaks-row-h">
          <span className="zb-tweaks-lbl">Sound effects</span>
          <button
            type="button"
            className="zb-tweaks-toggle"
            role="switch"
            aria-checked={sound}
            data-on={sound ? "1" : "0"}
            onClick={toggleSound}
          >
            <i />
          </button>
        </div>
      </div>
    </div>
  );
}
