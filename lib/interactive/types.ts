/* Shared types for the interactive portfolio engines. */

export interface SoundFX {
  enabled: boolean;
  play: (name: string, arg?: number) => void;
  unlock: () => void;
}

export interface GameState {
  score: number;
  lives: number;
  best: number;
  running: boolean;
}

export interface BlobCatcherInstance {
  start: () => void;
  stop: () => void;
  recolor: () => void;
  readonly running: boolean;
  readonly state: GameState;
  /** Set by the wiring once the player has started at least one round. */
  _started?: boolean;
}

export type ThemeName = "midnight" | "paper" | "acid";

export interface PortfolioControl {
  applyTheme: (name: ThemeName) => void;
  setSound: (on: boolean) => void;
}

declare global {
  interface Window {
    SoundFX?: SoundFX;
    BlobCatcher?: { create: (opts: BlobCatcherCreateOpts) => BlobCatcherInstance };
    Portfolio?: PortfolioControl;
  }
}

export interface BlobCatcherCreateOpts {
  canvas: HTMLCanvasElement;
  root: HTMLElement;
  onState?: (state: GameState) => void;
}
