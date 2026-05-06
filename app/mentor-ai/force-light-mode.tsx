"use client";

import { useLayoutEffect } from "react";

export function ForceLightMode() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", "light");
    return () => {
      let stored = "light";
      try {
        stored = localStorage.getItem("theme") || "light";
      } catch {}
      html.setAttribute("data-theme", stored);
    };
  }, []);

  return null;
}
