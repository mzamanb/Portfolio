import { getContent, getCaseStudy } from "@/lib/content";
import { notFound } from "next/navigation";
import CaseStudyPage from "./CaseStudyPage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const content = await getContent();
  return content.caseStudies.map((cs) => ({ slug: cs.slug }));
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
