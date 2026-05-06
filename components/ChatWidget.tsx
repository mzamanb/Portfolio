"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import {
  CAPABILITY_GROUPS,
  type CapabilityGroup,
  presetRequiresCustomDetails,
} from "@/lib/inquiry-presets";
import {
  BOT_ASK_COMPANY,
  BOT_ASK_EMAIL,
  BOT_ASK_NAME,
  BOT_ERROR,
  BOT_PICK_SUB,
  BOT_SENDING,
  BOT_THANKS,
  CHAT_GREETING,
  getBotLineAfterSubPick,
  type ChatStep,
} from "@/lib/hardcoded-chat-script";

const genId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `m-${Date.now()}`;

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

type Msg = { id: string; role: "user" | "bot"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<ChatStep>("choose_capability");
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [capabilityId, setCapabilityId] = useState<string | null>(null);
  const [presetId, setPresetId] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectedCapability: CapabilityGroup | undefined = capabilityId
    ? CAPABILITY_GROUPS.find((c) => c.id === capabilityId)
    : undefined;

  const scrollToEnd = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, step, scrollToEnd]);

  useEffect(() => {
    if (!open) return;
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [{ id: genId(), role: "bot", text: CHAT_GREETING }];
    });
  }, [open]);

  const restart = useCallback(() => {
    setMessages([{ id: genId(), role: "bot", text: CHAT_GREETING }]);
    setStep("choose_capability");
    setCapabilityId(null);
    setInput("");
    setErr(null);
    setPresetId(null);
    setDetails("");
    setName("");
    setEmail("");
    setSubmitting(false);
  }, []);

  const onPickCapability = (cap: CapabilityGroup) => {
    if (step !== "choose_capability") return;
    setErr(null);
    setCapabilityId(cap.id);
    setMessages((s) => [
      ...s,
      { id: genId(), role: "user", text: cap.label },
      { id: genId(), role: "bot", text: BOT_PICK_SUB },
    ]);
    setStep("choose_sub");
  };

  const onPickSub = (subId: string) => {
    if (step !== "choose_sub" || !selectedCapability) return;
    const sub = selectedCapability.sub.find((x) => x.id === subId);
    if (!sub) return;
    setErr(null);
    setPresetId(subId);
    setMessages((s) => [
      ...s,
      { id: genId(), role: "user", text: sub.label },
      { id: genId(), role: "bot", text: getBotLineAfterSubPick(subId) },
    ]);
    setStep("details");
    setInput("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const goBackToFocusAreas = () => {
    setErr(null);
    setCapabilityId(null);
    setStep("choose_capability");
    setMessages([{ id: genId(), role: "bot", text: CHAT_GREETING }]);
  };

  const sendUserMessage = () => {
    const text = input.trim();
    if (!text) return;
    if (
      step === "choose_capability" ||
      step === "choose_sub" ||
      step === "sending" ||
      step === "done"
    ) {
      return;
    }
    setErr(null);
    setInput("");

    if (step === "details") {
      if (!presetId) {
        setErr("Select an option first. Tap Restart to begin again.");
        return;
      }
      const needsCustom = presetRequiresCustomDetails(presetId);
      if (needsCustom && (!text || text.toLowerCase() === "none")) {
        setErr("Please describe your request in a few words (required for this option).");
        return;
      }
      const d =
        text.toLowerCase() === "none" && !needsCustom ? "" : text;
      setDetails(needsCustom ? text.trim() : d);
      setStep("name");
      setMessages((s) => [
        ...s,
        { id: genId(), role: "user", text },
        { id: genId(), role: "bot", text: BOT_ASK_NAME },
      ]);
      return;
    }

    if (step === "name") {
      if (text.length < 1 || text.length > 200) {
        setErr("Please enter your name (max 200 characters).");
        setInput(text);
        return;
      }
      setName(text);
      setStep("email");
      setMessages((s) => [
        ...s,
        { id: genId(), role: "user", text },
        { id: genId(), role: "bot", text: BOT_ASK_EMAIL },
      ]);
      return;
    }

    if (step === "email") {
      if (!EMAIL_RE.test(text) || text.length > 320) {
        setErr("Please enter a valid email address.");
        setInput(text);
        return;
      }
      setEmail(text.toLowerCase());
      setStep("company");
      setMessages((s) => [
        ...s,
        { id: genId(), role: "user", text },
        { id: genId(), role: "bot", text: BOT_ASK_COMPANY },
      ]);
      return;
    }

    if (step === "company") {
      const c =
        !text || /^none$/i.test(text) || text === "—" ? "—" : text;
      if (c !== "—" && c.length > 200) {
        setErr("Shorter, please (max 200 characters).");
        setInput(text);
        return;
      }
      setStep("sending");
      setSubmitting(true);
      setMessages((s) => [
        ...s,
        { id: genId(), role: "user", text: c === "—" ? "— (skipped)" : c },
        { id: genId(), role: "bot", text: BOT_SENDING },
      ]);

      const n = name.trim();
      const em = email.trim().toLowerCase();
      const dInquiry =
        details.trim() && details.trim().toLowerCase() !== "none"
          ? details.trim()
          : "";
      const co = c;

      void (async () => {
        if (!presetId) {
          setErr("Session error. Tap Restart to try again.");
          setSubmitting(false);
          setStep("done");
          return;
        }
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              presetId,
              details: dInquiry,
              name: n,
              email: em,
              company: co,
            }),
          });
          const data = (await res.json().catch(() => ({}))) as {
            error?: string;
            success?: boolean;
            devLogged?: boolean;
            message?: string;
          };
          if (!res.ok) {
            throw new Error(data.error || "Request failed");
          }
          if (!data.success && !data.devLogged) {
            throw new Error(data.error || "Request failed");
          }
          const extra = data.message ? ` ${data.message}` : "";
          setMessages((s) => [
            ...s,
            { id: genId(), role: "bot", text: BOT_THANKS + extra },
          ]);
          setStep("done");
        } catch {
          setMessages((s) => [
            ...s,
            { id: genId(), role: "bot", text: BOT_ERROR },
          ]);
          setStep("done");
        } finally {
          setSubmitting(false);
        }
      })();
    }
  };

  const placeholder = () => {
    if (!presetId) return "…";
    const needs = presetRequiresCustomDetails(presetId);
    switch (step) {
      case "details":
        return needs
          ? "Describe your request (required)…"
          : "Add details, or type “none” to skip";
      case "name":
        return "Your name";
      case "email":
        return "you@email.com";
      case "company":
        return "Company or “none”";
      default:
        return "";
    }
  };

  const canType =
    step === "details" ||
    step === "name" ||
    step === "email" ||
    step === "company";
  const canSend = canType && !submitting;

  return (
    <div
      className="pointer-events-none fixed bottom-0 right-0 z-[100] p-3 sm:p-4 md:p-5"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex w-[min(100vw-1.5rem,24rem)] flex-col items-end gap-3">
        {open && (
          <div
            className="flex h-[min(40rem,calc(100dvh-3.5rem))] max-h-[min(40rem,calc(100dvh-3.5rem))] w-full min-h-0 flex-col overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              background: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
            role="dialog"
            aria-label="Chat with us"
          >
            <div
              className="flex shrink-0 items-center justify-between border-b px-4 py-3"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Site assistant
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Pick your focus, then a specific need
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={restart}
                  className="rounded-md px-2 py-1 text-xs font-medium"
                  style={{ color: "var(--color-accent)" }}
                >
                  Restart
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ color: "var(--color-text-secondary)" }}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-3"
              data-chat-scroll
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === "user"
                      ? "mb-3 flex justify-end"
                      : "mb-3 flex justify-start"
                  }
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[90%] rounded-2xl rounded-br-sm px-3 py-2 text-sm leading-relaxed"
                        : "max-w-[90%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm leading-relaxed"
                    }
                    style={
                      m.role === "user"
                        ? {
                            background: "var(--color-accent-dim)",
                            color: "var(--color-text)",
                          }
                        : {
                            background: "var(--color-bg-elevated)",
                            color: "var(--color-text)",
                          }
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} className="h-px" aria-hidden />
            </div>

            <div
              className="shrink-0 border-t px-3 pb-3 pt-2"
              style={{ borderColor: "var(--color-border)" }}
            >
              {step === "choose_capability" && (
                <>
                  <p
                    className="mb-2 text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Focus area:
                  </p>
                  <div className="mb-2 max-h-56 space-y-1.5 overflow-y-auto pr-0.5">
                    {CAPABILITY_GROUPS.map((cap) => (
                      <div key={cap.id}>
                        <button
                          type="button"
                          onClick={() => onPickCapability(cap)}
                          className="w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium leading-snug transition hover:opacity-95"
                          style={{
                            background: "var(--color-bg)",
                            borderColor: "var(--color-border)",
                            color: "var(--color-text)",
                          }}
                        >
                          <span className="block">{cap.label}</span>
                          {cap.description ? (
                            <span
                              className="mt-0.5 block text-xs font-normal"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {cap.description}
                            </span>
                          ) : null}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === "choose_sub" && selectedCapability && (
                <>
                  <button
                    type="button"
                    onClick={goBackToFocusAreas}
                    className="mb-2 text-left text-xs font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    ← Change focus area
                  </button>
                  <p
                    className="mb-1 text-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {selectedCapability.label} — be specific:
                  </p>
                  <div className="mb-2 max-h-48 space-y-1.5 overflow-y-auto pr-0.5">
                    {selectedCapability.sub.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => onPickSub(sub.id)}
                        className="w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium leading-snug transition hover:opacity-95"
                        style={{
                          background: "var(--color-bg)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                        }}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {err && (
                <p
                  className="mb-2 text-xs"
                  style={{ color: "#f87171" }}
                  role="alert"
                >
                  {err}
                </p>
              )}

              {canType && (
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (canSend) sendUserMessage();
                      }
                    }}
                    rows={2}
                    placeholder={placeholder()}
                    disabled={!canSend}
                    className="min-h-[2.75rem] max-h-28 flex-1 resize-y rounded-xl border px-3 py-2 text-sm outline-none disabled:opacity-50"
                    style={{
                      background: "var(--color-bg)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                    aria-label="Message"
                  />
                  <button
                    type="button"
                    onClick={sendUserMessage}
                    disabled={!canSend || !input.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-xl text-white disabled:opacity-40"
                    style={{ background: "var(--color-accent)" }}
                    aria-label="Send"
                  >
                    {submitting ? (
                      <span className="text-xs">…</span>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}

              {step === "done" && (
                <button
                  type="button"
                  onClick={restart}
                  className="mt-2 w-full rounded-xl border py-2 text-sm font-medium"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-accent)",
                  }}
                >
                  New request
                </button>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))",
            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.35)",
          }}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
