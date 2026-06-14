"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // The interactive homepage ships its own cursor ring; suppress the global one.
  const hidden = pathname === "/";

  useEffect(() => {
    if (hidden) return;
    const el = cursorRef.current;
    if (!el) return;

    const SIZE = 36;
    let targetX = -200;
    let targetY = -200;
    let curX = -200;
    let curY = -200;
    let raf: number;

    // Lower = lazier follow. 0.08 is visibly smooth but clearly trailing.
    const LERP = 0.08;

    const tick = () => {
      curX += (targetX - curX) * LERP;
      curY += (targetY - curY) * LERP;
      el.style.transform = `translate(${curX - SIZE / 2}px, ${curY - SIZE / 2}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
    };

    const onLeave = () => { el.style.opacity = "0"; };
    const onEnter = () => { el.style.opacity = "1"; };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "white",
        mixBlendMode: "difference",
        opacity: 0,
        willChange: "transform",
        transition: "opacity 0.2s ease",
      }}
    />
  );
}
