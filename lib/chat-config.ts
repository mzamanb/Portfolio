const MAX_DETAILS = 5000;
const NOTIFICATION_DEFAULT = "zamanbayezid@gmail.com";

export function getChatConfig() {
  return {
    notificationEmail:
      process.env.CHAT_NOTIFICATION_EMAIL || NOTIFICATION_DEFAULT,
    resendFrom: process.env.RESEND_FROM || "onboarding@resend.dev",
    maxDetailsLength: MAX_DETAILS,
    /** Set CHAT_SEND_VISITOR_CONFIRMATION=1 to also email the person who submitted. */
    sendVisitorConfirmation: process.env.CHAT_SEND_VISITOR_CONFIRMATION === "1",
  };
}

export function showChatWidget(): boolean {
  if (process.env.NEXT_PUBLIC_CHAT_WIDGET === "0") return false;
  return true;
}
