/* ============================================================
   BlobCatcher — playground mini-game (canvas).
   Ported from the Claude Design handoff (js/game.js).
   ============================================================ */
import type {
  BlobCatcherCreateOpts,
  BlobCatcherInstance,
  GameState,
} from "./types";

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

interface ThemeColors {
  a1: string;
  a2: string;
  a3: string;
  fg: string;
  bg: string;
  muted: string;
}

interface Drop {
  x: number;
  y: number;
  vy: number;
  r: number;
  kind: "coin" | "blob";
  color: string;
  wob: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  r: number;
}

function themeColors(root: HTMLElement): ThemeColors {
  const cs = getComputedStyle(root);
  const get = (n: string) => cs.getPropertyValue(n).trim();
  return {
    a1: get("--a1"),
    a2: get("--a2"),
    a3: get("--a3"),
    fg: get("--fg"),
    bg: get("--bg-2"),
    muted: get("--muted"),
  };
}

export function createBlobCatcher({
  canvas,
  root,
  onState,
}: BlobCatcherCreateOpts): BlobCatcherInstance {
  const ctx = canvas.getContext("2d")!;
  let W = 0;
  let H = 0;
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  let running = false;
  let raf = 0;
  let score = 0;
  let lives = 3;
  let best = +(localStorage.getItem("blob_best") || 0);
  let drops: Drop[] = [];
  let particles: Particle[] = [];
  const basket = { x: 0, w: 96 };
  let mouseX: number | null = null;
  let spawnT = 0;
  let last = 0;
  let elapsed = 0;
  let C = themeColors(root);

  function resize(): void {
    const r = canvas.getBoundingClientRect();
    W = r.width;
    H = r.height;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (basket.x === 0) basket.x = W / 2;
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
  });
  canvas.addEventListener("pointerleave", () => {
    mouseX = null;
  });

  function emit(): void {
    onState?.({ score, lives, best, running });
  }

  function reset(): void {
    score = 0;
    lives = 3;
    drops = [];
    particles = [];
    spawnT = 0;
    elapsed = 0;
    basket.x = W / 2;
  }

  function start(): void {
    C = themeColors(root);
    reset();
    running = true;
    last = performance.now();
    window.SoundFX?.play("start");
    emit();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function stop(): void {
    running = false;
    cancelAnimationFrame(raf);
  }

  function spawnDrop(): void {
    const kind: Drop["kind"] = Math.random() < 0.14 ? "coin" : "blob";
    const r = kind === "coin" ? 13 : rand(15, 24);
    drops.push({
      x: rand(r + 10, W - r - 10),
      y: -r,
      vy: rand(2.2, 3.2) + elapsed * 0.00009,
      r,
      kind,
      color: kind === "coin" ? C.a3 : [C.a1, C.a2][Math.floor(Math.random() * 2)],
      wob: Math.random() * 6.28,
    });
  }

  function burst(x: number, y: number, color: string, n = 10): void {
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.28);
      particles.push({
        x,
        y,
        vx: Math.cos(a) * rand(1, 5),
        vy: Math.sin(a) * rand(1, 5) - 1,
        life: 1,
        color,
        r: rand(2, 5),
      });
    }
  }

  function loop(now: number): void {
    const dt = Math.min(40, now - last);
    last = now;
    elapsed += dt;
    ctx.clearRect(0, 0, W, H);

    const targetX = mouseX == null ? basket.x : mouseX;
    basket.x += (targetX - basket.x) * 0.25;
    basket.x = clamp(basket.x, basket.w / 2, W - basket.w / 2);

    spawnT -= dt;
    const interval = clamp(900 - elapsed * 0.02, 380, 900);
    if (spawnT <= 0) {
      spawnDrop();
      spawnT = interval;
    }

    const by = H - 38;
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      d.y += d.vy;
      d.x += Math.sin(now / 400 + d.wob) * 0.4;
      if (
        d.y + d.r >= by &&
        d.y < by + 26 &&
        Math.abs(d.x - basket.x) < basket.w / 2 + d.r * 0.4
      ) {
        if (d.kind === "coin") {
          score += 5;
          window.SoundFX?.play("coin");
        } else {
          score += 1;
          window.SoundFX?.play("catch_");
        }
        burst(d.x, by - 6, d.color, d.kind === "coin" ? 16 : 10);
        drops.splice(i, 1);
        emit();
        continue;
      }
      if (d.y - d.r > H) {
        drops.splice(i, 1);
        if (d.kind === "blob") {
          lives -= 1;
          window.SoundFX?.play("miss");
          burst(d.x, H - 4, C.muted, 6);
          emit();
          if (lives <= 0) {
            gameOver();
            return;
          }
        }
      }
      drawBlob(d.x, d.y, d.r, d.color, d.kind === "coin");
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.life -= 0.025;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = clamp(p.life, 0, 1);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.28);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    drawBasket(basket.x, by);

    if (running) raf = requestAnimationFrame(loop);
  }

  function gameOver(): void {
    running = false;
    if (score > best) {
      best = score;
      localStorage.setItem("blob_best", String(best));
    }
    window.SoundFX?.play("over");
    emit();
    let t = 0;
    const fade = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.life -= 0.03;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = clamp(p.life, 0, 1);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      drawBasket(basket.x, H - 38);
      if (t++ < 40 && particles.length) requestAnimationFrame(fade);
    };
    fade();
  }

  function drawBlob(
    x: number,
    y: number,
    r: number,
    color: string,
    coin: boolean,
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 6.28);
    ctx.fill();
    if (coin) {
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, r - 4, 0, 6.28);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.font = `700 ${r}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("5", 0, 1);
    } else {
      ctx.fillStyle = "#fff";
      const ex = r * 0.34;
      const ey = -r * 0.1;
      const er = r * 0.26;
      ctx.beginPath();
      ctx.arc(-ex, ey, er, 0, 6.28);
      ctx.arc(ex, ey, er, 0, 6.28);
      ctx.fill();
      ctx.fillStyle = "#16140f";
      const pr = er * 0.5;
      ctx.beginPath();
      ctx.arc(-ex, ey + er * 0.2, pr, 0, 6.28);
      ctx.arc(ex, ey + er * 0.2, pr, 0, 6.28);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawBasket(x: number, y: number): void {
    ctx.save();
    ctx.translate(x, y);
    const w = basket.w;
    const h = 26;
    ctx.fillStyle = C.fg;
    roundRect(ctx, -w / 2, 0, w, h, 8);
    ctx.fill();
    ctx.fillStyle = C.a1;
    roundRect(ctx, -w / 2, -6, w, 10, 6);
    ctx.fill();
    ctx.fillStyle = C.bg;
    ctx.beginPath();
    ctx.arc(-12, 13, 3.4, 0, 6.28);
    ctx.arc(12, 13, 3.4, 0, 6.28);
    ctx.fill();
    ctx.restore();
  }

  function roundRect(
    c: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ): void {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function recolor(): void {
    C = themeColors(root);
  }

  emit();
  return {
    start,
    stop,
    recolor,
    get running() {
      return running;
    },
    get state(): GameState {
      return { score, lives, best, running };
    },
  };
}
