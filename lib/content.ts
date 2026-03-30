import fs from "fs";
import path from "path";

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

export type SiteContent = {
  hero: HeroContent;
  skills: Skill[];
  caseStudies: CaseStudy[];
  projects: Project[];
  contact: ContactContent;
  footer: FooterContent;
};

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export function getContent(): SiteContent {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function updateContent(content: SiteContent): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  const content = getContent();
  return content.caseStudies.find((cs) => cs.slug === slug);
}
