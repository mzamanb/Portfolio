import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const seo = content.seo;
  return {
    alternates: { canonical: seo.siteUrl },
  };
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

  return (
    <>
      <JsonLd data={personLd} />
      <JsonLd data={websiteLd} />
      <Navbar resumeUrl={content.hero.resumeUrl} />
      <main>
        <Hero data={content.hero} />
        <CaseStudies data={content.caseStudies} />
        <Skills data={content.skills} />
        <Projects data={content.projects} />
        <Contact
          data={content.contact}
          resumeUrl={content.hero.resumeUrl}
        />
      </main>
      <Footer data={content.footer} social={content.contact.social} />
    </>
  );
}
