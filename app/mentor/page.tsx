import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { MentorPresentation } from "@/components/mentor/MentorPresentation";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const base = content.seo.siteUrl || "https://www.zamandesigns.com";
  const title = "MENTOR — Figma plugin (capabilities & roadmap)";
  const description =
    "A Figma plugin that acts as an autonomous design system maintainer: token binding, style organisation, naming enforcement, component architecture, and quality scoring.";

  return {
    title,
    description,
    openGraph: {
      title: `${content.hero.name} — ${title}`,
      description,
      url: `${base}/mentor`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${base}/mentor` },
  };
}

export default function MentorPage() {
  return <MentorPresentation />;
}
