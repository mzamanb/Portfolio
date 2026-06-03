// Zaman Bayezid portfolio — Authentication Architecture system

const { useState, useEffect, useRef } = React;

// --- Linear / Solar-style icons (line-based) ---
const Icon = ({ name, size = 20, stroke = 1.5 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "system": return (
      <svg {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    );
    case "ux": return (
      <svg {...props}>
        <path d="M3 12c3-6 15-6 18 0"/>
        <circle cx="12" cy="12" r="2.5"/>
        <path d="M3 12c3 6 15 6 18 0"/>
      </svg>
    );
    case "research": return (
      <svg {...props}>
        <circle cx="11" cy="11" r="6.5"/>
        <path d="M16 16l4.5 4.5"/>
        <path d="M8 11h6M11 8v6"/>
      </svg>
    );
    case "arrow": return (
      <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    );
    case "external": return (
      <svg {...props}><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>
    );
    case "spark": return (
      <svg {...props}><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/></svg>
    );
    case "github": return (
      <svg {...props}><path d="M9 19c-4 1-4-2-6-2m12 5v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.6 0-1.3-.5-2.5-1.4-3.5.4-1.3.4-2.6-.1-3.8 0 0-1.1-.4-3.6 1.4a12 12 0 0 0-6.5 0C7.1 1.7 6 2.1 6 2.1c-.5 1.2-.5 2.5-.1 3.8A5 5 0 0 0 4.5 9.4c0 5.1 3.1 6.3 6 6.6-.4.4-.7.9-.8 1.4-.1.5-.1 1 0 1.5V22"/></svg>
    );
    case "linkedin": return (
      <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v8M8 6.5v.01M12 18v-5a2.5 2.5 0 1 1 5 0v5M12 13v5"/></svg>
    );
    case "mail": return (
      <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
    );
    case "download": return (
      <svg {...props}><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
    );
    default: return null;
  }
};

// --- Mentor visual: a small animated "design system" panel preview ---
function MentorVisual() {
  return (
    <div style={{ position: "relative", height: "100%", minHeight: 320 }}>
      <div className="grid-bg"></div>
      <div style={{
        position: "relative", height: "100%",
        display: "flex", flexDirection: "column", gap: 12,
        padding: "24px 0 0 24px",
      }}>
        {/* Token rows */}
        <div style={tokenRow}>
          <span style={tokenSwatch("#10B981")}></span>
          <span style={tokenLabel}>color/accent/primary</span>
          <span style={tokenValue}>#10B981</span>
        </div>
        <div style={tokenRow}>
          <span style={tokenSwatch("#34D399")}></span>
          <span style={tokenLabel}>color/accent/secondary</span>
          <span style={tokenValue}>#34D399</span>
        </div>
        <div style={tokenRow}>
          <span style={tokenSwatch("#0A0A0A", true)}></span>
          <span style={tokenLabel}>color/surface/base</span>
          <span style={tokenValue}>#0A0A0A</span>
        </div>
        <div style={tokenRow}>
          <span style={{ ...tokenSwatch("transparent"), border: "1px solid rgba(255,255,255,0.2)" }}></span>
          <span style={tokenLabel}>radius/card</span>
          <span style={tokenValue}>12px</span>
        </div>
        <div style={tokenRow}>
          <span style={{ ...tokenSwatch("transparent") }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5"><path d="M4 4h16M4 12h10M4 20h16"/></svg>
          </span>
          <span style={tokenLabel}>spacing/scale</span>
          <span style={tokenValue}>4·8·12·16</span>
        </div>

        <div style={{
          marginTop: "auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px",
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.25)",
          borderRadius: 8,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--accent-3)",
        }}>
          <span>$ mentor sync —tokens</span>
          <span style={{ color: "var(--text-primary)" }}>27 updates</span>
        </div>
      </div>
    </div>
  );
}
const tokenRow = {
  display: "grid",
  gridTemplateColumns: "20px 1fr auto",
  alignItems: "center", gap: 12,
  padding: "10px 14px",
  background: "rgba(0,0,0,0.5)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 8,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
};
const tokenSwatch = (c, ring) => ({
  width: 20, height: 20, borderRadius: 4,
  background: c,
  border: ring ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
});
const tokenLabel = { color: "var(--text-secondary)" };
const tokenValue = { color: "var(--text-primary)" };

// --- Top nav ---
function Nav() {
  return (
    <nav className="top">
      <div className="wrap row">
        <a href="#home" className="logo">
          <span className="dot"></span>
          Zaman.
        </a>
        <ul>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#mentor">Currently</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="cta" href="https://drive.google.com/uc?export=download&id=1-dImHqOBRh19kJbyjFTs__rCNJv70LiW">
          Resume ↓
        </a>
      </div>
    </nav>
  );
}

// --- Hero ---
function Hero() {
  return (
    <section className="hero" id="home" style={{ position: "relative" }}>
      <div className="hero-glow"></div>
      <div className="wrap" style={{ position: "relative" }}>
        <span className="kicker"><span className="bar"></span> CSPO Certified · Lead Product Designer</span>
        <h1 className="display" style={{ maxWidth: 980 }}>
          Designing systems<br />
          where craft meets<br />
          <span style={{ color: "var(--accent)" }}>computation.</span>
        </h1>
        <p className="lead" style={{ marginTop: 32 }}>
          I'm Zaman Bayezid — a Lead Product Designer bridging design and development with deep user empathy and technical logic. I specialize in atomic design systems and AI-powered workflows that accelerate how teams ship.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
          <a href="#work" className="btn btn-primary">
            View case studies <Icon name="arrow" size={16}/>
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in touch
          </a>
        </div>

        <div className="meta-strip">
          <div className="cell">
            <div className="k">Role</div>
            <div className="v">Lead Product Designer</div>
          </div>
          <div className="cell">
            <div className="k">Focus</div>
            <div className="v">Systems · UX · AI</div>
          </div>
          <div className="cell">
            <div className="k">Available</div>
            <div className="v" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="pulse" style={{ width: 6, height: 6, borderRadius: 9999, background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}></span>
              For new work
            </div>
          </div>
          <div className="cell">
            <div className="k">Based</div>
            <div className="v">Remote · Worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Skills ---
function Skills() {
  const items = [
    {
      n: "01", icon: "system", title: "Design Systems",
      copy: "I build atomic design systems that bridge Figma and code, keeping UI consistent across platforms while cutting engineering sprint cycles.",
    },
    {
      n: "02", icon: "ux", title: "UX Design",
      copy: "I design with business outcomes in mind — rapid prototyping, stakeholder alignment, and user-validated flows before a single line of code is written.",
    },
    {
      n: "03", icon: "research", title: "User Research",
      copy: "I uncover what users actually need through structured research — interviews, usability tests, and data analysis — so every decision is grounded in evidence.",
    },
  ];
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker"><span className="bar"></span> What I do</span>
            <h2 className="display">Core expertise</h2>
          </div>
          <p style={{ color: "var(--text-primary)", maxWidth: 320, fontSize: 13, lineHeight: "20px", margin: 0 }}>
            Three disciplines, one shared language: a system that scales from research to release.
          </p>
        </div>
        <div className="skills">
          {items.map(it => (
            <div key={it.n} className="shell">
              <div className="inner skill-card">
                <div className="num">{it.n}</div>
                <div className="icon" style={{ marginTop: 16 }}>
                  <Icon name={it.icon} size={20} />
                </div>
                <h3 className="title">{it.title}</h3>
                <p>{it.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- MENTOR feature ---
function Mentor() {
  const milestones = [
    "Web app live on Vercel with Supabase auth and profile onboarding.",
    "VS Code extension activates on startup, handles deep-links, and stores auth securely.",
    "Offline lesson engine shipped with typed content models and ID-safe routing.",
    "Interactive lesson panel includes progress UI, step types, keyboard nav, and guided CTA flow.",
    "Local Kokoro narrator runs in worker threads with chunking, caching, pregeneration, and stale-audio protection.",
    "Resume state persists across restarts; VSIX packaging is installable outside dev mode.",
  ];

  return (
    <section id="mentor">
      <div className="wrap">
        <div className="shell">
          <div className="inner" style={{ padding: 48 }}>
            <div className="mentor">
              <div className="left">
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="chip"><span className="pulse"></span> Milestone achieved</span>
                  <span className="chip">Web app + VS Code extension</span>
                </div>
                <h2 className="display" style={{ marginTop: 24 }}>
                  MENTOR<span style={{ color: "var(--text-primary)", fontSize: 28, marginLeft: 12 }}>—</span>
                  <span style={{ display: "block", fontSize: 32, lineHeight: "36px", color: "var(--text-secondary)", marginTop: 12, fontWeight: 300 }}>
                    a guided learning system across web and VS Code.
                  </span>
                </h2>
                <p className="lead" style={{ marginTop: 24 }}>
                  MENTOR IDE is now running end-to-end: users onboard through the web app, launch lessons inside VS Code through deep-links, and continue learning with local narration, progress sync, and resume support.
                </p>
                <ul style={{ marginTop: 20, paddingLeft: 18, color: "var(--text-primary)", lineHeight: "22px" }}>
                  {milestones.map((item) => (
                    <li key={item} style={{ marginBottom: 8 }}>{item}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="https://www.zamandesigns.com/mentor-ai" className="btn btn-primary">
                    Learn more <Icon name="arrow" size={16}/>
                  </a>
                  <a href="#contact" className="btn btn-ghost">
                    Contact me
                  </a>
                </div>
              </div>
              <div className="visual">
                <MentorVisual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Case studies ---
function CaseStudies() {
  const cases = [
    {
      label: "01 / Loyalty",
      product: "EmCan",
      kicker: "UAE fuel station loyalty app",
      copy: "Redesigned a UAE fuel station loyalty app — introducing digital promotions, car wash packages, coffee stamp cards, and partner integrations that transformed user engagement.",
      tags: ["UI/UX Design", "Design Systems", "Scrum Mgmt"],
      url: "https://www.zamandesigns.com/case-study/emcan-case-study",
    },
    {
      label: "02 / Creator platform",
      product: "VeeHive.ai",
      kicker: "Community-first creator platform",
      copy: "Led end-to-end design for a community-first creator platform — from research through PWA launch — focusing on content discovery, moderation efficiency, and creator monetization.",
      tags: ["Product Design", "User Research", "PWA"],
      url: "https://www.zamandesigns.com/case-study/veehive-case-study",
    },
  ];
  return (
    <section id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker"><span className="bar"></span> Featured work</span>
            <h2 className="display">Case studies</h2>
          </div>
          <p style={{ color: "var(--text-primary)", maxWidth: 320, fontSize: 13, lineHeight: "20px", margin: 0 }}>
            Selected end-to-end engagements. Each one shipped — from research artifact to production interface.
          </p>
        </div>
        <div className="cases">
          {cases.map((c, i) => (
            <a key={i} href={c.url} className="case shell">
              <div className="inner">
                <div className="placeholder">
                  <span className="label">{c.label} — preview</span>
                </div>
                <div className="meta-row">
                  <span className="kicker"><span className="bar"></span> Case study</span>
                  <Icon name="external" size={14} />
                </div>
                <h3 className="title" style={{ fontSize: 32, lineHeight: "36px", marginTop: 8, letterSpacing: "-0.025em" }}>{c.product}</h3>
                <div style={{ color: "var(--text-secondary)", marginTop: 4, fontSize: 14 }}>{c.kicker}</div>
                <p>{c.copy}</p>
                <div className="tags">
                  {c.tags.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="arrow">Read case study <Icon name="arrow" size={14}/></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Personal projects ---
function Projects() {
  const items = [
    { num: "01", title: "Finance Dashboard", copy: "A dark-themed finance management interface focused on clarity and data density.", tags: ["UI Design", "Dark Mode"] },
    { num: "02", title: "Fitness App", copy: "A bold, high-energy fitness app concept with workout tracking and social motivation features.", tags: ["UI Design", "Mobile"] },
    { num: "03", title: "Traffic AI", copy: "Dashboard for an AI-powered traffic analysis system — real-time monitoring and route optimization.", tags: ["AI/ML", "Dashboard"] },
    { num: "04", title: "Fashion E-commerce", copy: "A dual-themed shopping experience with light and dark modes, focused on product imagery.", tags: ["E-commerce", "UI Design"] },
    { num: "05", title: "Cryptoverse", copy: "A spatial UI concept for Vision Pro — manage your crypto portfolio in 3D space.", tags: ["Vision Pro", "Spatial UI"] },
    { num: "06", title: "Health AI", copy: "An AI health guidance interface providing personalized recommendations and wellness tracking.", tags: ["AI/ML", "Healthcare"] },
  ];
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker"><span className="bar"></span> Explorations</span>
            <h2 className="display">Personal projects</h2>
          </div>
          <p style={{ color: "var(--text-primary)", maxWidth: 320, fontSize: 13, lineHeight: "20px", margin: 0 }}>
            Sandbox concepts I use to push craft and explore emerging surfaces — spatial, AI, and beyond.
          </p>
        </div>
        <div className="projects">
          {items.map(p => (
            <div key={p.num} className="project shell">
              <div className="inner" style={{ padding: 16 }}>
                <div className="img">{p.num} — {p.title.toLowerCase()}.png</div>
                <div className="row">
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.copy}</p>
                  </div>
                  <span style={{ color: "var(--text-primary)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{p.num}</span>
                </div>
                <div className="tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact ---
function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="shell">
          <div className="inner" style={{ padding: 48 }}>
            <div className="contact">
              <div className="left">
                <span className="kicker"><span className="bar"></span> Get in touch</span>
                <h2 className="display" style={{ marginTop: 16 }}>Let's work<br/>together.</h2>
                <p className="lead" style={{ marginTop: 24 }}>
                  Always interested in new opportunities, collaborations, and conversations about systems, AI, and craft.
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                  <a className="btn btn-primary" href="mailto:zamanbayezid@gmail.com?subject=Project%20Inquiry">
                    <Icon name="mail" size={16}/> Send an email
                  </a>
                  <a className="btn btn-ghost" href="https://drive.google.com/uc?export=download&id=1-dImHqOBRh19kJbyjFTs__rCNJv70LiW">
                    <Icon name="download" size={16}/> Resume
                  </a>
                </div>
              </div>
              <div className="right">
                <div>
                  <div className="field">
                    <span className="k">Email</span>
                    <a className="v" href="mailto:zamanbayezid@gmail.com">zamanbayezid@gmail.com</a>
                  </div>
                  <div className="field">
                    <span className="k">GitHub</span>
                    <a className="v" href="https://github.com/mzamanb">github.com/mzamanb ↗</a>
                  </div>
                  <div className="field">
                    <span className="k">LinkedIn</span>
                    <a className="v" href="https://www.linkedin.com/in/zamanbayezid/">in/zamanbayezid ↗</a>
                  </div>
                  <div className="field">
                    <span className="k">Response</span>
                    <span className="v">Within 24 hours</span>
                  </div>
                  <div className="field" style={{ borderBottom: "none" }}>
                    <span className="k">Status</span>
                    <span className="v" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="pulse" style={{ width: 6, height: 6, borderRadius: 9999, background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}></span>
                      Open for new projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer>
      <div className="wrap row">
        <div>© 2026 Zaman Bayezid. All rights reserved.</div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="https://github.com/mzamanb" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <Icon name="github" size={14}/> GitHub
          </a>
          <a href="https://www.linkedin.com/in/zamanbayezid/" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <Icon name="linkedin" size={14}/> LinkedIn
          </a>
          <a href="mailto:zamanbayezid@gmail.com" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <Icon name="mail" size={14}/> Email
          </a>
        </div>
      </div>
    </footer>
  );
}

// --- Tweaks ---
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#10B981",
  "shellGradient": true,
  "gridBg": true,
  "density": "comfortable"
}/*EDITMODE-END*/;

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    // derive lighter accent variants
    r.style.setProperty("--accent-2", t.accent);
    r.style.setProperty("--shell-grad", t.shellGradient
      ? "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0) 100%)"
      : "transparent");
    document.body.style.backgroundImage = t.gridBg
      ? "linear-gradient(to right, var(--grid-line) 1px, transparent 1px),linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)"
      : "none";
    document.querySelectorAll("section").forEach(s => {
      s.style.padding = t.density === "compact" ? "64px 0" : t.density === "spacious" ? "128px 0" : "";
    });
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakColor
          label="Primary"
          value={t.accent}
          onChange={v => setTweak("accent", v)}
          options={["#10B981", "#34D399", "#22D3EE", "#A78BFA", "#F59E0B"]}
        />
      </TweakSection>
      <TweakSection title="Surfaces">
        <TweakToggle
          label="Gradient border shell"
          value={t.shellGradient}
          onChange={v => setTweak("shellGradient", v)}
        />
        <TweakToggle
          label="Grid background"
          value={t.gridBg}
          onChange={v => setTweak("gridBg", v)}
        />
      </TweakSection>
      <TweakSection title="Density">
        <TweakRadio
          label="Section padding"
          value={t.density}
          onChange={v => setTweak("density", v)}
          options={[
            { value: "compact", label: "Compact" },
            { value: "comfortable", label: "Default" },
            { value: "spacious", label: "Spacious" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// --- App ---
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Skills />
      <Mentor />
      <CaseStudies />
      <Projects />
      <Contact />
      <Footer />
      <PortfolioTweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
