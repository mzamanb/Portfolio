"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { initSound } from "@/lib/interactive/sound";
import { initWiring } from "@/lib/interactive/wiring";
import {
  About,
  Foot,
  Hero,
  Nav,
  Play,
  Resume,
  Skills,
  Work,
  type AboutData,
  type ExperienceRow,
  type InteractiveContact,
  type SkillChip,
  type ToolItem,
  type WorkItem,
} from "./sections";
import "@/app/interactive.css";

interface InteractivePortfolioProps {
  name: string;
  subtitle: string;
  badge: string;
  work: WorkItem[];
  about: AboutData;
  cloud: SkillChip[];
  tools: ToolItem[];
  experience: ExperienceRow[];
  contact: InteractiveContact;
  resumeUrl?: string;
  copyright: string;
}

export default function InteractivePortfolio({
  name,
  subtitle,
  badge,
  work,
  about,
  cloud,
  tools,
  experience,
  contact,
  resumeUrl,
  copyright,
}: InteractivePortfolioProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    initSound();
    const cleanup = initWiring(root);
    return cleanup;
  }, []);

  // Bridge the global light/dark theme onto the homepage's scoped palette.
  useEffect(() => {
    rootRef.current?.setAttribute(
      "data-theme",
      theme === "dark" ? "midnight" : "paper",
    );
  }, [theme]);

  return (
    <div className="zb" id="zb-root" data-theme="paper" ref={rootRef}>
      <div id="scroll-progress" />
      <div id="cursor-ring" />

      <Nav name={name} />

      <main>
        <Hero name={name} subtitle={subtitle} badge={badge} />
        <Work items={work} />
        <About data={about} />
        <Skills cloud={cloud} tools={tools} />
        <Resume
          email={contact.email}
          resumeUrl={resumeUrl}
          experience={experience}
        />
        <Play />
      </main>

      <Foot name={name} contact={contact} copyright={copyright} />
    </div>
  );
}
