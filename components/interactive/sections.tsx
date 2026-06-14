export interface InteractiveContact {
  email: string;
  linkedin?: string;
  github?: string;
  behance?: string;
  dribbble?: string;
}

export interface WorkItem {
  title: string;
  tag: string;
  summary: string;
  chips: string[];
  image?: string;
  href?: string;
  slotId: string;
  meta: {
    roleV: string;
    roleS: string;
    scopeV: string;
    scopeS: string;
    yearV: string;
    yearS: string;
  };
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface SkillChip {
  label: string;
  cat: "design" | "build" | "research";
}

export interface ToolItem {
  name: string;
  lvl: string;
}

export interface AboutData {
  lead: string;
  body: string;
  stats: StatItem[];
  domains: string[];
}

interface NavProps {
  name: string;
}

export function Nav({ name }: NavProps) {
  return (
    <header className="nav">
      <div className="brand" id="brand">
        <span className="dot" />
        <span>{name.toUpperCase()}</span>
      </div>
      <nav>
        <a href="#work" data-scroll>
          Work
        </a>
        <a href="#about" data-scroll>
          About
        </a>
        <a href="#skills" data-scroll>
          Skills
        </a>
        <a href="#resume" data-scroll>
          Résumé
        </a>
        <a href="#play" data-scroll>
          Play
        </a>
      </nav>
    </header>
  );
}

interface HeroProps {
  name: string;
  subtitle: string;
  badge: string;
}

/** Wrap a key phrase in the marker-pen highlight if present in the text. */
function withMark(text: string): React.ReactNode {
  const phrase = "design and development";
  const i = text.toLowerCase().indexOf(phrase);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <b className="mark">{text.slice(i, i + phrase.length)}</b>
      {text.slice(i + phrase.length)}
    </>
  );
}

export function Hero({ name, subtitle, badge }: HeroProps) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0] ?? name;
  const last = parts.slice(1).join(" ");

  return (
    <section id="hero" data-screen-label="Hero">
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <div className="wrap hero-inner">
        <div className="hero reveal in-view">
          <p className="hero-hello">hey — I’m</p>
          <h1 className="display">
            <span className="line">
              <span>{first}</span>
            </span>
            {last ? (
              <span className="line">
                <span className="accent">{last}</span>
              </span>
            ) : null}
          </h1>
          <p className="role">{withMark(subtitle)}</p>
          <div className="hero-cta">
            <a href="#work" data-scroll className="btn primary">
              Selected work <span className="arrow">↗</span>
            </a>
            <a href="#play" data-scroll className="btn">
              Play the game <span className="arrow">↗</span>
            </a>
          </div>
          <div className="hero-status" style={{ marginTop: 30 }}>
            <span className="live" />
            {badge}
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <span>scroll</span>
        <span className="bar" />
      </div>
    </section>
  );
}

interface WorkProps {
  items: WorkItem[];
}

export function Work({ items }: WorkProps) {
  return (
    <section id="work" className="section-pad" data-screen-label="Selected work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="idx">01 — SELECTED WORK</span>
            <h2 className="display">
              Things I<br />shipped
            </h2>
          </div>
          <p>Three projects, three industries — tap any frame to read the case study.</p>
        </div>

        {items.map((p, i) => (
          <article className="project reveal" key={p.slotId}>
            <div className="project-media">
              <span className="project-tag">{p.tag}</span>
              {p.image ? (
                p.href ? (
                  <a href={p.href} aria-label={`Read the ${p.title} case study`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} />
                  </a>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.title} />
                )
              ) : (
                <span className="image-slot-hint">{p.title}</span>
              )}
            </div>
            <div className="project-body">
              <span className="project-num">
                PROJECT {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display">{p.title}</h3>
              <p className="summary">{p.summary}</p>
              <div className="project-meta">
                <div>
                  <div className="k">Role</div>
                  <div className="v">
                    {p.meta.roleV}
                    <small>{p.meta.roleS}</small>
                  </div>
                </div>
                <div>
                  <div className="k">Scope</div>
                  <div className="v">
                    {p.meta.scopeV}
                    <small>{p.meta.scopeS}</small>
                  </div>
                </div>
                <div>
                  <div className="k">Year</div>
                  <div className="v">
                    {p.meta.yearV}
                    <small>{p.meta.yearS}</small>
                  </div>
                </div>
              </div>
              <div className="project-roles">
                {p.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="section-pad" data-screen-label="About">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="idx">02 — ABOUT</span>
            <h2 className="display">
              Who’s<br />throwing things
            </h2>
          </div>
        </div>
        <div className="about-grid">
          <div className="reveal">
            <p className="about-lead">{data.lead}</p>
            <p className="about-body">{data.body}</p>
          </div>
          <div className="about-side reveal d1">
            {data.stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="num">
                  {s.value}
                  {s.suffix ? <span className="u">{s.suffix}</span> : null}
                </div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {data.domains.length ? (
          <div className="domains reveal">
            <div className="domains-track">
              {[...data.domains, ...data.domains].map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface SkillsProps {
  cloud: SkillChip[];
  tools: ToolItem[];
}

export function Skills({ cloud, tools }: SkillsProps) {
  return (
    <section id="skills" className="section-pad" data-screen-label="Skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="idx">03 — SKILLS &amp; TOOLS</span>
            <h2 className="display">
              What I<br />reach for
            </h2>
          </div>
          <p>Hover anything. The whole page is a toy — these are no exception.</p>
        </div>

        <div className="skill-cloud reveal">
          {cloud.map((s) => (
            <span className="skill" data-cat={s.cat} key={s.label}>
              {s.label}
            </span>
          ))}
        </div>

        {tools.length ? (
          <div className="tool-grid reveal d1">
            {tools.map((t) => (
              <div className="tool" key={t.name}>
                <div className="t-name">{t.name}</div>
                <div className="t-lvl">{t.lvl}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export interface ExperienceRow {
  period: string;
  title: string;
  org: string;
  description: string;
  place: string;
}

interface ResumeProps {
  email: string;
  resumeUrl?: string;
  experience: ExperienceRow[];
}

export function Resume({ email, resumeUrl, experience }: ResumeProps) {
  return (
    <section id="resume" className="section-pad" data-screen-label="Resume">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="idx">04 — RÉSUMÉ</span>
            <h2 className="display">
              The short<br />version
            </h2>
          </div>
          <p>
            End-to-end product roles — discovery to launch, across fintech,
            consumer, and platform products.
          </p>
        </div>

        <div className="timeline">
          {experience.map((r) => (
            <div className="role-row reveal" key={`${r.title}-${r.period}`}>
              <div className="yr">{r.period}</div>
              <div>
                <div className="ttl display">{r.title}</div>
                <div className="org">{r.org}</div>
                <div className="desc">{r.description}</div>
              </div>
              <div className="place">{r.place}</div>
            </div>
          ))}
        </div>

        <div className="resume-actions reveal">
          {resumeUrl ? (
            <a
              className="btn primary"
              href={resumeUrl}
              target="_blank"
              rel="noopener"
            >
              Download CV <span className="arrow">↓</span>
            </a>
          ) : (
            <button className="btn primary" id="print-cv" type="button">
              Print CV <span className="arrow">↓</span>
            </button>
          )}
          <a href={`mailto:${email}`} className="btn">
            {email} <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Play() {
  return (
    <section id="play" className="section-pad" data-screen-label="Playground">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="idx">05 — PLAYGROUND</span>
            <h2 className="display">
              Catch<br />the blobs
            </h2>
          </div>
          <p>
            Move to aim the cup. Catch falling blobs, grab the gold ones for 5×.
            Miss three and it’s over.
          </p>
        </div>

        <div className="arcade reveal">
          <div className="arcade-head">
            <span>BLOB CATCHER v1.0</span>
            <div className="dots">
              <i />
              <i />
              <i />
            </div>
            <span id="g-best">BEST 000</span>
          </div>
          <div className="game-stage">
            <div className="game-hud">
              <span className="score">
                SCORE <span id="g-score">000</span>
              </span>
              <span className="lives" id="g-lives">
                ●●●
              </span>
            </div>
            <canvas id="game-canvas" />
            <div className="game-overlay" id="game-overlay">
              <h3 className="display" id="go-title">
                Blob Catcher
              </h3>
              <p id="go-desc">
                Catch the falling blobs in your cup. Gold blobs are worth 5. Don’t
                drop three.
              </p>
              <button className="btn primary" id="go-btn" type="button">
                Start game <span className="arrow">▶</span>
              </button>
            </div>
          </div>
        </div>

        <p className="easter-note" id="easter-note">
          psst — there’s a <b>secret</b>. try the Konami code or tap the logo five
          times.
        </p>
      </div>
    </section>
  );
}

interface FootProps {
  name: string;
  contact: InteractiveContact;
  copyright: string;
}

export function Foot({ name, contact, copyright }: FootProps) {
  return (
    <footer className="foot" data-screen-label="Footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-big display">
              <a href={`mailto:${contact.email}`}>Let’s build →</a>
            </div>
            <p className="sign">— {name.split(/\s+/)[0]}</p>
          </div>
          <div className="foot-links">
            <a href={`mailto:${contact.email}`}>↗ Email</a>
            {contact.linkedin ? (
              <a href={contact.linkedin} target="_blank" rel="noopener">
                ↗ LinkedIn
              </a>
            ) : null}
            {contact.github ? (
              <a href={contact.github} target="_blank" rel="noopener">
                ↗ GitHub
              </a>
            ) : null}
            {contact.dribbble ? (
              <a href={contact.dribbble} target="_blank" rel="noopener">
                ↗ Dribbble
              </a>
            ) : null}
            {contact.behance ? (
              <a href={contact.behance} target="_blank" rel="noopener">
                ↗ Behance
              </a>
            ) : null}
            <a href="#resume" data-scroll>
              ↗ Read the CV
            </a>
          </div>
        </div>
        <div className="foot-meta">
          <span>© {copyright}</span>
          <span>Designed &amp; built in the browser</span>
        </div>
      </div>
    </footer>
  );
}
