import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const base = content.seo.siteUrl || "https://www.zamandesigns.com";
  const now = new Date();

  const caseStudyUrls = content.caseStudies.map((cs) => ({
    url: `${base}/case-study/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudyUrls,
  ];
}
