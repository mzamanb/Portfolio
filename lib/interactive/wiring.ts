/* ============================================================
   wiring.ts — reveals, nav, cursor ring, parallax, game, easter
   eggs, and the window.Portfolio control surface.
   Ported from the Claude Design handoff (js/main.js), minus the
   blob-character field (excluded by request).
   ============================================================ */
import { createBlobCatcher } from "./game";
import type { GameState, PortfolioControl, ThemeName } from "./types";

export function initWiring(root: HTMLElement): () => void {
  const ac = new AbortController();
  const { signal } = ac;
  let stopped = false;
  const rafs: number[] = [];
  const track = (id: number) => {
    rafs.push(id);
    return id;
  };

  const $ = <T extends Element = HTMLElement>(s: string): T | null =>
    root.querySelector<T>(s);
  const $$ = <T extends Element = HTMLElement>(s: string): T[] =>
    Array.from(root.querySelectorAll<T>(s));

  /* ---------- scroll progress ---------- */
  const prog = $("#scroll-progress");
  function onScroll(): void {
    if (!prog) return;
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  }
  addEventListener("scroll", onScroll, { passive: true, signal });
  onScroll();

  /* ---------- reveal via rAF position polling ---------- */
  const revealEls = $$(".reveal, .tool").filter(
    (el) => !el.classList.contains("in-view"),
  );
  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top > innerHeight * 0.92)
      el.classList.add("armed");
    else el.classList.add("in-view");
  });
  let pending = revealEls.filter((el) => el.classList.contains("armed"));
  function revealTick(): void {
    if (stopped) return;
    if (pending.length) {
      const trigger = innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < trigger) {
          el.classList.add("in-view");
          return false;
        }
        return true;
      });
    }
    track(requestAnimationFrame(revealTick));
  }
  track(requestAnimationFrame(revealTick));

  /* ---------- smooth nav ---------- */
  $$("a[data-scroll]").forEach((a) => {
    a.addEventListener(
      "click",
      (e) => {
        const href = a.getAttribute("href");
        const t = href ? $(href) : null;
        if (t) {
          e.preventDefault();
          window.SoundFX?.play("click");
          t.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
      { signal },
    );
  });

  /* ---------- hover sounds ---------- */
  $$(".btn, .chip, .skill, .project, .tool, .role-row, header.nav nav a").forEach(
    (el) => {
      el.addEventListener("pointerenter", () => window.SoundFX?.play("hover"), {
        signal,
      });
    },
  );
  $$(".btn").forEach((b) =>
    b.addEventListener("click", () => window.SoundFX?.play("click"), { signal }),
  );

  /* ---------- custom cursor ring ---------- */
  const ring = $("#cursor-ring");
  let rx = innerWidth / 2;
  let ry = innerHeight / 2;
  let tx = rx;
  let ty = ry;
  addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      ring?.classList.add("show");
    },
    { signal },
  );
  addEventListener("pointerleave", () => ring?.classList.remove("show"), {
    signal,
  });
  function ringLoop(): void {
    if (stopped) return;
    rx += (tx - rx) * 0.2;
    ry += (ty - ry) * 0.2;
    if (ring)
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    track(requestAnimationFrame(ringLoop));
  }
  track(requestAnimationFrame(ringLoop));
  $$("a, button, .skill, .chip, .project-media").forEach((el) => {
    el.addEventListener("pointerenter", () => ring?.classList.add("big"), {
      signal,
    });
    el.addEventListener("pointerleave", () => ring?.classList.remove("big"), {
      signal,
    });
  });

  /* ---------- parallax (hero glow + grid follow mouse) ---------- */
  const glow = $<HTMLElement>(".hero-glow");
  const grid = $<HTMLElement>(".hero-grid-bg");
  addEventListener(
    "pointermove",
    (e) => {
      const dx = e.clientX / innerWidth - 0.5;
      const dy = e.clientY / innerHeight - 0.5;
      if (glow) glow.style.transform = `translate(${dx * 40}px, ${dy * 40}px)`;
      if (grid) grid.style.transform = `translate(${dx * -18}px, ${dy * -18}px)`;
    },
    { signal },
  );
  addEventListener(
    "scroll",
    () => {
      if (glow) glow.style.marginTop = scrollY * 0.15 + "px";
    },
    { passive: true, signal },
  );

  /* ---------- game ---------- */
  const canvas = $<HTMLCanvasElement>("#game-canvas");
  const overlay = $("#game-overlay");
  const elScore = $("#g-score");
  const elLives = $("#g-lives");
  const elBest = $("#g-best");
  const ovTitle = $("#go-title");
  const ovDesc = $("#go-desc");
  const ovBtn = $("#go-btn");
  let game: ReturnType<typeof createBlobCatcher> | null = null;

  function updateHud(s: GameState): void {
    if (elScore) elScore.textContent = String(s.score).padStart(3, "0");
    if (elLives)
      elLives.textContent =
        "●".repeat(Math.max(0, s.lives)) + "○".repeat(Math.max(0, 3 - s.lives));
    if (elBest) elBest.textContent = "BEST " + String(s.best).padStart(3, "0");
    if (!s.running && game && game._started && overlay) {
      overlay.classList.remove("hidden");
      if (ovTitle)
        ovTitle.textContent =
          s.score > 0 && s.score >= s.best ? "New best!" : "Game over";
      if (ovDesc)
        ovDesc.textContent = `You caught ${s.score} blob${
          s.score === 1 ? "" : "s"
        }. Best ${s.best}.`;
      if (ovBtn) ovBtn.textContent = "Play again";
    }
  }

  if (canvas) {
    game = createBlobCatcher({ canvas, root, onState: updateHud });
    ovBtn?.addEventListener(
      "click",
      () => {
        overlay?.classList.add("hidden");
        if (game) {
          game._started = true;
          game.start();
        }
      },
      { signal },
    );
  }

  /* ---------- easter eggs: konami + brand clicks ---------- */
  const KON = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let ki = 0;
  addEventListener(
    "keydown",
    (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === KON[ki].toLowerCase() || e.key === KON[ki]) {
        ki++;
        if (ki === KON.length) {
          partyMode();
          ki = 0;
        }
      } else {
        ki = e.key === KON[0] ? 1 : 0;
      }
    },
    { signal },
  );

  function partyMode(): void {
    const note = $("#easter-note");
    if (note) {
      note.dataset.found = "1";
      note.innerHTML =
        "✦ <b>Secret unlocked</b> — try the game above for a high score.";
    }
    window.SoundFX?.play("pop");
    root.animate(
      [
        { filter: "hue-rotate(0deg)" },
        { filter: "hue-rotate(40deg)" },
        { filter: "hue-rotate(0deg)" },
      ],
      { duration: 700 },
    );
  }

  let brandClicks = 0;
  let brandT = 0;
  const brand = $("#brand");
  brand?.addEventListener(
    "click",
    () => {
      const now = Date.now();
      if (now - brandT > 1200) brandClicks = 0;
      brandT = now;
      brandClicks++;
      window.SoundFX?.play("pop");
      if (brandClicks >= 5) {
        partyMode();
        brandClicks = 0;
      }
    },
    { signal },
  );

  /* ---------- resume actions ---------- */
  $("#print-cv")?.addEventListener("click", () => window.print(), { signal });

  /* ============================================================
     Portfolio control surface — driven by the Tweaks panel
     ============================================================ */
  const portfolio: PortfolioControl = {
    applyTheme(name: ThemeName) {
      root.classList.add("theme-switching");
      root.setAttribute("data-theme", name);
      void root.offsetHeight; // force reflow
      requestAnimationFrame(() => {
        game?.recolor();
        requestAnimationFrame(() => root.classList.remove("theme-switching"));
      });
    },
    setSound(v: boolean) {
      if (window.SoundFX) window.SoundFX.enabled = !!v;
    },
  };
  window.Portfolio = portfolio;
  document.dispatchEvent(new Event("portfolio-ready"));

  /* ---------- cleanup ---------- */
  return () => {
    stopped = true;
    ac.abort();
    rafs.forEach((id) => cancelAnimationFrame(id));
    game?.stop();
    if (window.Portfolio === portfolio) delete window.Portfolio;
  };
}
