/* ============================================================
   SoundFX — tiny WebAudio synth. No audio files.
   Ported from the Claude Design handoff (js/sound.js).
   ============================================================ */
import type { SoundFX } from "./types";

interface ToneOpts {
  freq?: number;
  type?: OscillatorType;
  dur?: number;
  vol?: number;
  attack?: number;
  slideTo?: number | null;
  when?: number;
}

interface NoiseOpts {
  dur?: number;
  vol?: number;
  when?: number;
  hp?: number;
}

/** Create (or return the existing) SoundFX singleton on window. */
export function initSound(): SoundFX {
  if (typeof window === "undefined") {
    return { enabled: false, play: () => {}, unlock: () => {} };
  }
  if (window.SoundFX) return window.SoundFX;

  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  const state = { enabled: true };

  const AudioCtor: typeof AudioContext | undefined =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  function ensure(): void {
    if (ctx || !AudioCtor) return;
    try {
      ctx = new AudioCtor();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    } catch {
      ctx = null;
    }
  }

  function unlock(): void {
    ensure();
    if (ctx && ctx.state === "suspended") void ctx.resume();
  }

  ["pointerdown", "keydown", "touchstart"].forEach((ev) =>
    window.addEventListener(ev, unlock, { passive: true }),
  );

  function tone({
    freq = 440,
    type = "sine",
    dur = 0.12,
    vol = 0.3,
    attack = 0.005,
    slideTo = null,
    when = 0,
  }: ToneOpts): void {
    if (!state.enabled || !ctx || !master) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo)
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function noise({ dur = 0.1, vol = 0.2, when = 0, hp = 800 }: NoiseOpts): void {
    if (!state.enabled || !ctx || !master) return;
    const t0 = ctx.currentTime + when;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filt = ctx.createBiquadFilter();
    filt.type = "highpass";
    filt.frequency.value = hp;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filt);
    filt.connect(g);
    g.connect(master);
    src.start(t0);
    src.stop(t0 + dur);
  }

  const sounds: Record<string, (arg?: number) => void> = {
    grab: () => tone({ freq: 520, type: "triangle", dur: 0.09, vol: 0.22, slideTo: 760 }),
    throw: () => {
      noise({ dur: 0.18, vol: 0.12, hp: 500 });
      tone({ freq: 300, type: "sawtooth", dur: 0.16, vol: 0.12, slideTo: 760 });
    },
    bounce: (v) => {
      const f = 180 + Math.min(1, (v || 0) / 30) * 360;
      tone({ freq: f, type: "sine", dur: 0.08, vol: 0.14, slideTo: f * 0.6 });
    },
    pop: () => tone({ freq: 880, type: "sine", dur: 0.07, vol: 0.25, slideTo: 1320 }),
    hover: () => tone({ freq: 660, type: "sine", dur: 0.04, vol: 0.07 }),
    click: () => tone({ freq: 440, type: "square", dur: 0.05, vol: 0.12, slideTo: 660 }),
    catch_: () => {
      tone({ freq: 660, type: "triangle", dur: 0.08, vol: 0.2, slideTo: 990 });
      tone({ freq: 990, type: "sine", dur: 0.1, vol: 0.12, when: 0.04 });
    },
    miss: () => tone({ freq: 200, type: "sawtooth", dur: 0.2, vol: 0.18, slideTo: 90 }),
    start: () =>
      [392, 523, 659, 784].forEach((f, i) =>
        tone({ freq: f, type: "triangle", dur: 0.12, vol: 0.16, when: i * 0.08 }),
      ),
    over: () =>
      [523, 466, 392, 294].forEach((f, i) =>
        tone({ freq: f, type: "triangle", dur: 0.16, vol: 0.16, when: i * 0.1 }),
      ),
    coin: () => {
      tone({ freq: 988, type: "square", dur: 0.06, vol: 0.16 });
      tone({ freq: 1319, type: "square", dur: 0.12, vol: 0.16, when: 0.06 });
    },
    whoosh: () => noise({ dur: 0.3, vol: 0.08, hp: 300 }),
  };

  const api: SoundFX = {
    get enabled() {
      return state.enabled;
    },
    set enabled(v: boolean) {
      state.enabled = !!v;
      if (v) unlock();
    },
    play(name: string, arg?: number) {
      if (!state.enabled) return;
      ensure();
      if (sounds[name]) sounds[name](arg);
    },
    unlock,
  };

  window.SoundFX = api;
  return api;
}
