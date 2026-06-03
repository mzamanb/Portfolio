# Portfolio — engineering backlog

Items to revisit later. Add new bullets as needed.

---

## MENTOR IDE roadmap update (achieved)

### Web app (Vercel)

- Next.js web app deployed at `mentor-ide.vercel.app`.
- User authentication implemented with Supabase Auth.
- User profile creation implemented (name, OS, shell detection).
- Install guide page added with step-by-step extension setup.
- Deep-link generation implemented (`dashboard` -> VS Code extension URI handler).
- API routes shipped: `/api/profile`, `/api/events`, `/api/progress`.

### VS Code extension — core

- Extension activates on VS Code startup (`onStartupFinished`).
- URI handler catches `vscode://mentor.mentor-extension/open` deep-links.
- Auth token stored securely in VS Code secret storage.
- `pingInstalled` sends first-install event to Supabase.
- `fetchProfile` verifies user account on open.
- Doctor command added: `Mentor: Check setup` diagnostics.
- Activity bar icon and panel command registered.

### Lesson engine

- Bundled content system implemented (`courses.json` ships with VSIX, works offline).
- TypeScript interfaces added: `StepType`, `Step`, `Task`, `Command`, `Lesson`, `Course`.
- Content loader utilities implemented: `getCourse`, `getLesson`, `getStep`, `getNextStep`, `getPrevStep`, `getStepIndex`, `resolveIds`.
- `resolveIds` handles both numeric URL params (`lesson=1`) and full IDs (`c01-l01`).
- Course 01, Lesson 1 shipped with 6 steps: intro + 3 concept + analogy + win.

### Lesson panel UI

- Webview panel loaded from `media/panel.html` (not inline string).
- Header includes logo and narrator toggle button.
- Progress section includes chapter label, lesson title, animated progress bar, and step dots (pending/current/done).
- Step cards render 5 types:
  - `intro`: centered, teal border, wave icon.
  - `concept`: purple left border.
  - `analogy`: amber background, italic body.
  - `exercise`: checkbox task list with auto-advance when all checked.
  - `win`: purple centered card with bolt icon.
- Actions bar includes back, replay, hint, and CTA button.
- Speaking indicator animated while audio plays.
- Toast notifications added (bottom-right, 4s, dismissible).
- "Tap to hear narration" pulsing play hint appears when audio is ready but gesture-locked, then disappears after first tap.
- CTA label updates by step context (`got it ->`, `makes sense ->`, `let's begin ->`, `next lesson ->`).
- Keyboard navigation supports left/right arrows.
- Back button disabled on first step.

### Narrator (TTS)

- Kokoro TTS integrated via `kokoro-js` (local, open-source, no API key/cost).
- ONNX inference isolated in a `worker_threads` worker so extension host remains responsive.
- Sentence-level chunking at ~200-char boundaries with Float32Array concatenation fixes token-limit cutoff and white-noise artifact.
- Full-text cache enables instant replay with stable cache keys across chunks.
- Pending deduplication merges concurrent requests for identical text into one generation promise.
- Proactive next-step pregeneration runs while user reads current step.
- Activation-time pregeneration runs for intro + step 1 after model load and before panel open.
- Stale audio rejection implemented (`tts.audio` carries narration text and webview discards mismatched step audio).
- No overlap behavior implemented (`playBlob` stops existing audio before playing new clip).
- `waitForTTS()` gate ensures pregeneration waits for model readiness.
- Narrator toggle supports on/off with personality quips.
- Autoplay policy handled by queuing blob on first gesture and immediate play on first click/keydown.
- Worker log relay implemented via `postMessage` to avoid duplicate debug logs.
- `disposeTTS()` cleanly terminates worker on extension deactivate.

### Progress and resume

- Step position saved to `globalState` on forward/backward navigation.
- Saved progress stores full IDs: `{ course, lesson, step }`.
- Activation checks `globalState` for saved progress.
- Resume prompt shows chapter and lesson title with `Resume` / `Start over`.
- Resume opens panel at exact saved step.
- `Start over` clears saved progress.
- Resume now works without auth token (token-gate bug fixed).

### Packaging

- `.vscodeignore` configured to exclude source, non-Windows onnxruntime binaries, `onnxruntime-web`, and test/doc files.
- `MIT LICENSE` added.
- `repository` field added to `package.json`.
- VSIX currently packages at ~401 MB (includes `kokoro-js` and `onnxruntime-node` native binaries).
- Extension installs and runs outside F5 dev mode.
- TTS model cache (`~/.cache/huggingface/`) persists across VS Code restarts; cold start paid once.
- Browser TTS test page (`mentor-tts-test.html`) served via Express with COOP/COEP headers for WASM `SharedArrayBuffer`.

### Bugs fixed

- Kokoro token limit cutoff fixed via chunking.
- White noise on long narrations fixed via chunking.
- Audio overlap during fast navigation fixed with stale-text matching.
- Abrupt audio stops fixed by stopping before play in `playBlob`.
- First lesson autoplay regression fixed by moving `stopAudio()` to `renderStep` (not nav handlers).
- Extension host unresponsiveness during generation fixed with worker threads.
- Duplicate worker logs fixed by relaying through `postMessage`.
- Resume blocked by missing token fixed by removing token gate.
- `resolveIds` full-ID regression fixed with ID-first lookup before numeric fallback.
- `hintBtn` null crash blocking READY message fixed by restoring element in HTML.
- Kokoro model type error (`style_text_to_speech_2`) fixed by switching from `@huggingface/transformers` `pipeline()` to `kokoro-js`.
- ESM/CommonJS load issue fixed because `require("kokoro-js")` resolves to `kokoro.cjs` via exports map.

---

## Mentor: one-time (or scoped) access to `/mentor`

**Context:** Today `/mentor` is gated by a shared `MENTOR_PAGE_PASSWORD` and a `mentor_session` cookie (see [`middleware.ts`](../middleware.ts), [`app/api/auth/mentor/route.ts`](../app/api/auth/mentor/route.ts)). There is no per-invite or single-use flow.

**Goal:** Allow giving someone **one-time** (or tightly scoped) access without handing them the main password permanently, and without making `/mentor` public.

**Candidate approaches (pick when revisiting):**

1. **Magic link + server-stored token** — e.g. Supabase table `mentor_invites` (`token_hash`, `expires_at`, `used_at`); `GET /mentor/invite/...` validates once, sets session cookie, marks used. True single-use.
2. **Signed JWT in URL** — short TTL (e.g. 15m); single-use only if you track `jti` or accept time-window as “good enough”.
3. **Operational only** — share password + ask them to log out / wait for cookie expiry (24h); rotate `MENTOR_PAGE_PASSWORD` if leaked (affects everyone).

**Implementation sketch:** New route for invite consumption; middleware allows that path without prior cookie; keep hashing consistent with existing `mentor_session` logic; do not log raw tokens.

**Status:** Not started — captured for a future session.

---
