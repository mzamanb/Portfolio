import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/lib/content";
import MentorCaseStudy from "./MentorCaseStudy";

export const metadata: Metadata = {
  title: "MENTOR — IDE Learning System",
  description:
    "MENTOR closes the convergence gap: coherent, sequenced instruction delivered inside VS Code — with local AI narration, offline lessons, and real environment from day one.",
};

export default async function MentorPage() {
  const study = await getCaseStudy("mentor");
  if (!study) notFound();
  return <MentorCaseStudy study={study} />;
}
