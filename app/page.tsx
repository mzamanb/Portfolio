import type { Metadata } from "next";
import { getContent, type CaseStudy } from "@/lib/content";
import InteractivePortfolio from "@/components/interactive/InteractivePortfolio";
import type {
  SkillChip,
  ToolItem,
  WorkItem,
} from "@/components/interactive/sections";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const seo = content.seo;
  return {
    alternates: { canonical: seo.siteUrl },
  };
}

const titleCase = (s: string): string =>
  s.replace(/\b\w/g, (c) => c.toUpperCase());

function shorten(s: string): string {
  const first = (s || "").split(/[.;]/)[0].trim();
  return first.length > 42 ? first.slice(0, 40).trim() + "…" : first;
}

function deriveWork(cs: CaseStudy): WorkItem {
  const role = cs.fullContent?.role || "";
  const roleV = role.split(/[—\-,(]/)[0].trim().split(/\s+/)[0] || "Lead";
  const timeline = cs.fullContent?.timeline || "";
  const yr = timeline.match(/\b20(\d\d)\b/);
  const mo = timeline.match(/(\d+)\s*month/i);
  const yearV = yr ? "’" + yr[1] : mo ? mo[1] + "mo" : "—";

  return {
    title: cs.title,
    tag: cs.tags?.[0] || cs.label,
    summary: cs.description,
    chips: cs.tags || [],
    image: cs.image,
    href: `/case-study/${cs.slug}`,
    slotId: `proj-${cs.id}`,
    meta: {
      roleV,
      roleS: "Product designer",
      scopeV: titleCase(cs.label),
      scopeS: cs.tags?.[0] || "Design",
      yearV,
      yearS: "Timeline",
    },
  };
}

function catFor(t: string): SkillChip["cat"] {
  if (/research|interview|workshop/i.test(t)) return "research";
  if (/develop|front|html|code|prototyp|build|engineer/i.test(t)) return "build";
  return "design";
}

export default async function Home() {
  const content = await getContent();
  const seo = content.seo;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.hero.name,
    url: seo.siteUrl,
    jobTitle: content.hero.title.join(" "),
    description: seo.description,
    email: `mailto:${content.contact.email}`,
    sameAs: Object.values(content.contact.social).filter(Boolean),
    image: seo.ogImage || undefined,
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.hero.name,
    url: seo.siteUrl,
    description: seo.description,
  };

  const work = (content.caseStudies || []).slice(0, 3).map(deriveWork);

  const skillTitles = (content.skills || []).map((s) => s.title);
  const serviceTitles = (content.services || []).map((s) => s.title);
  const cloudLabels = Array.from(new Set([...skillTitles, ...serviceTitles]));
  const cloud: SkillChip[] = cloudLabels.map((label) => ({
    label,
    cat: catFor(label),
  }));
  const tools: ToolItem[] = (content.services || []).map((s) => ({
    name: s.title,
    lvl: shorten(s.description),
  }));

  const domains = Array.from(new Set([...serviceTitles, ...skillTitles]));

  const social = { ...(content.hero.social || {}), ...content.contact.social };

  return (
    <>
      <JsonLd data={personLd} />
      <JsonLd data={websiteLd} />
      <InteractivePortfolio
        name={content.hero.name}
        subtitle={content.hero.subtitle}
        badge={content.hero.badge}
        work={work}
        about={{
          lead: content.about?.headline || content.hero.subtitle,
          body: content.about?.description || "",
          stats: content.stats || [],
          domains,
        }}
        cloud={cloud}
        tools={tools}
        experience={content.experience || []}
        contact={{
          email: content.contact.email,
          linkedin: social.linkedin,
          github: social.github,
          behance: social.behance,
          dribbble: social.dribbble,
        }}
        resumeUrl={content.hero.resumeUrl}
        copyright={content.footer.copyright}
      />
    </>
  );
}
