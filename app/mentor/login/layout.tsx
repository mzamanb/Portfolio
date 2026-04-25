import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MENTOR — Sign in",
  robots: { index: false, follow: false },
};

export default function MentorLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
