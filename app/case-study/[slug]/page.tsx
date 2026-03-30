import type { Metadata } from "next";
import { getContent, getCaseStudy } from "@/lib/content";
import { notFound } from "next/navigation";
import CaseStudyPage from "./CaseStudyPage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const content = await getContent();
  return content.caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const study = content.caseStudies.find((cs) => cs.slug === slug);
  if (!study) return {};

  const seo = content.seo;
  const title = `${study.title} — ${study.subtitle} Case Study`;
  const description = study.description;
  const url = `${seo.siteUrl}/case-study/${slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: study.image
        ? [{ url: study.image, width: 1200, height: 630, alt: study.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: study.image ? [study.image] : [],
    },
    alternates: { canonical: url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return <CaseStudyPage study={study} />;
}
