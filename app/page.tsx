import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import CaseStudies from "@/components/CaseStudies";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();

  return (
    <>
      <Navbar resumeUrl={content.hero.resumeUrl} />
      <main>
        <Hero data={content.hero} />
        <Skills data={content.skills} />
        <CaseStudies data={content.caseStudies} />
        <Projects data={content.projects} />
        <Contact
          data={content.contact}
          resumeUrl={content.hero.resumeUrl}
        />
      </main>
      <Footer data={content.footer} />
    </>
  );
}
