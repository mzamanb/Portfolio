import { getSubMeta } from "@/lib/inquiry-presets";

export type ChatStep =
  | "choose_capability"
  | "choose_sub"
  | "details"
  | "name"
  | "email"
  | "company"
  | "sending"
  | "done";

export const CHAT_GREETING =
  "Hi — pick a focus area that matches your need, then a more specific option. You can add extra context in chat after that.";

export const BOT_PICK_SUB =
  "Which of these best matches what you need? Pick one:";

export const BOT_ASK_NAME = "What’s your name?";
export const BOT_ASK_EMAIL = "What’s the best email to reach you at?";
export const BOT_ASK_COMPANY =
  "Company or organization? (Type “none” to skip.)";

export const BOT_SENDING = "Sending your request to the team… one moment.";

export function getBotLineAfterSubPick(presetId: string): string {
  const m = getSubMeta(presetId);
  if (!m) {
    return "Noted. In your next message, add details or type “none” to continue.";
  }
  const { group, sub } = m;
  if (sub.requiresCustomDetails) {
    return `You chose: ${group.label} → ${sub.label}. In your next message, describe what you need in a sentence or two (required for this option).`;
  }
  return `Noted: ${group.label} → ${sub.label}. In your next message, add more context or type “none” to move on.`;
}

export const BOT_THANKS =
  "All set. The team will follow up. You can close this or start a new request.";

export const BOT_ERROR =
  "Something went wrong sending that. Try again, or use email to reach the team directly.";
