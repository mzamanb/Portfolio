import { getSupabase } from "./supabase";
import { chatLog } from "./chat-logger";

export function isChatDbAvailable(): boolean {
  return getSupabase() != null;
}

export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  inquiry_summary: string;
};

/** Optional: persist to `leads` with no conversation (widget inquiry). */
export async function insertInquiry(input: InquiryInput): Promise<boolean> {
  const db = getSupabase();
  if (!db) return false;
  const { error } = await db.from("leads").insert({
    conversation_id: null,
    name: input.name,
    email: input.email,
    company: input.company,
    inquiry_summary: input.inquiry_summary,
  });

  if (error) {
    chatLog.error("insertInquiry failed", error);
    return false;
  }
  return true;
}
