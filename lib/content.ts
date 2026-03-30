import fs from "fs";
import path from "path";
import { getSupabase, CONTENT_TABLE, CONTENT_ROW_ID } from "./supabase";

export type HeroContent = {
  name: string;
  title: string[];
  subtitle: string;
  resumeUrl: string;
  badge: string;
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type ImpactItem = {
  value: string;
  label: string;
  detail: string;
};

export type ShowcaseImage = {
  url: string;
  caption: string;
};

export type Solution = {
  title: string;
  problem: string;
  process: string[];
  showcaseImages?: ShowcaseImage[];
};

export type CaseStudyFull = {
  intro: string;
  impact: ImpactItem[];
  role: string;
  timeline: string;
  tools: string;
  problem: string;
  challenges: string[];
  showcaseImage?: ShowcaseImage;
  solutions: Solution[];
  learnings: string[];
  outcomes: string[];
};

export type CaseStudy = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  image: string;
  slug: string;
  fullContent: CaseStudyFull;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

export type ContactContent = {
  heading: string;
  description: string;
  email: string;
  social: Record<string, string>;
};

export type FooterContent = {
  tagline: string;
  copyright: string;
};

export type SEOContent = {
  siteUrl: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  twitterHandle: string;
  linkedinUrl: string;
  googleVerification: string;
};

export type SiteContent = {
  hero: HeroContent;
  skills: Skill[];
  caseStudies: CaseStudy[];
  projects: Project[];
  contact: ContactContent;
  footer: FooterContent;
  seo: SEOContent;
};

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

function getLocalContent(): SiteContent {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeLocalContent(content: SiteContent): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}

const DEFAULT_SEO: SEOContent = {
  siteUrl: "https://www.zamandesigns.com",
  title: "Zaman Bayezid — Lead Product Designer",
  description: "Lead Product Designer specializing in design systems, UX research, and AI-powered workflows.",
  keywords: "product designer, UX designer, UI designer, design systems, portfolio, Zaman Bayezid",
  ogImage: "",
  twitterHandle: "",
  linkedinUrl: "",
  googleVerification: "",
};

function ensureSeo(content: SiteContent): SiteContent {
  if (!content.seo) {
    return { ...content, seo: DEFAULT_SEO };
  }
  return { ...content, seo: { ...DEFAULT_SEO, ...content.seo } };
}

export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from(CONTENT_TABLE)
        .select("data")
        .eq("id", CONTENT_ROW_ID)
        .single();

      if (!error && data?.data) {
        return ensureSeo(data.data as SiteContent);
      }
    } catch {
      // fall through to local
    }
  }
  return ensureSeo(getLocalContent());
}

export async function updateContent(content: SiteContent): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from(CONTENT_TABLE)
      .upsert({ id: CONTENT_ROW_ID, data: content }, { onConflict: "id" });

    if (error) {
      throw new Error(`Failed to save content: ${error.message}`);
    }
    return;
  }
  writeLocalContent(content);
}

export async function getCaseStudy(
  slug: string
): Promise<CaseStudy | undefined> {
  const content = await getContent();
  return content.caseStudies.find((cs) => cs.slug === slug);
}
