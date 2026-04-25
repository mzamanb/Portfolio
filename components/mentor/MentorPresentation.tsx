import { MentorTopBar } from "./MentorTopBar";

function Block({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm leading-relaxed text-text-secondary whitespace-pre-wrap">
      {children}
    </div>
  );
}

function Hr() {
  return <hr className="my-12 border-border-subtle" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-text md:text-3xl">
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-8 text-lg font-semibold text-text">{children}</h3>
  );
}

export function MentorPresentation() {
  return (
    <div className="min-h-screen bg-bg">
      <MentorTopBar />
      <article className="mx-auto max-w-4xl px-6 pt-28 pb-24">
        <header className="mb-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
            Figma plugin
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text md:text-5xl md:leading-tight">
            MENTOR — Current Capabilities &amp; Future Roadmap
          </h1>
        </header>

        <Hr />

        <section className="mb-12" id="what-mentor-is">
          <SectionTitle>What MENTOR Is</SectionTitle>
          <Block>
            {`A Figma plugin that acts as an autonomous design system maintainer. The designer focuses on creativity; MENTOR handles token binding, style organisation, naming enforcement, component architecture, and quality scoring — without the designer touching Variables, Styles, or the Assets panel manually.

Reference standard: DesignCode UI (fileKey: Z4jpdaD3jgIFaZZz0Jvg8z) defines what a grade-A design system looks like. Every MENTOR rule is derived from that standard.

Core principle: Everything that can be determined locally uses zero Claude API tokens. Claude is called only for semantic tasks requiring judgment (component naming, design critique). All scanning, token creation, binding, and component generation is local.`}
          </Block>
        </section>

        <Hr />

        <section className="mb-12" id="current-capabilities">
          <SectionTitle>Current Capabilities</SectionTitle>

          <SubTitle>1 — Design System Scanner (System Tab)</SubTitle>
          <Block>
            {`Colors (scanColors)
- Scans all fills: SOLID + gradient (GRADIENT_LINEAR/RADIAL/ANGULAR/DIAMOND)
- Checks fillStyleId (paint style binding) AND boundVariables.fills (variable binding)
- Near-duplicate detection: groups colors within ±10 RGB units using union-find
- Semantic role detection: text-fill, background-with-text, background-decorative, stroke
- HSL lightness + saturation computed per color for naming suggestions
- Absolute role flags: darkest, lightest, most-used, most-saturated
- Gradient coverage tracked separately: gradientTotal / gradientBound counts
- Token naming validation: flags any variable/style without slash-path convention

Typography (scanTextStyles)
- Scans all TEXT nodes for font family, style, size, line height, letter spacing
- Checks textStyleId binding
- Near-duplicate detection: same family+style, fontSize within ±2px
- Groups by exact key, counts usage, preserves text samples

Effects (scanEffects)
- Scans all nodes with effects[] array
- Checks effectStyleId binding
- Groups by effect signature (type + radius + offset)
- Suggests names via rule engine: shadow/sm, blur/md, shadow-blur/xl, etc.

Spacing & Radius (scanSpacing)
- Scans auto-layout nodes for itemSpacing, paddingTop/Bottom/Left/Right
- Scans all nodes for cornerRadius
- Checks boundVariables[prop] for FLOAT variable binding
- Groups by category (gap / padding / radius) + value
- Suggests names via 4pt grid: spacing/xs → spacing/4xl, radius/sm → radius/full

Naming Convention Validation (validateTokenNames)
- Reads all local variable collections and text/paint/effect styles
- Flags any name missing a / or starting with #
- Deducts 2 pts per violation (capped 20 pts) from health score`}
          </Block>

          <SubTitle>2 — System Health Score</SubTitle>
          <p className="mb-4 text-sm text-text-secondary">
            Four-dimensional weighted grade displayed in the System tab:
          </p>
          <div className="mb-4 overflow-x-auto rounded-xl border border-border-subtle">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-elevated">
                  <th className="px-4 py-3 font-medium text-text">Dimension</th>
                  <th className="w-20 px-4 py-3 font-medium text-text">Weight</th>
                  <th className="px-4 py-3 font-medium text-text">Measures</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border-subtle">
                  <td className="px-4 py-3">Colors tokenized</td>
                  <td className="px-4 py-3 text-accent">35%</td>
                  <td className="px-4 py-3">
                    % solid fills bound to variable or paint style
                  </td>
                </tr>
                <tr className="border-b border-border-subtle">
                  <td className="px-4 py-3">Text styles linked</td>
                  <td className="px-4 py-3 text-accent">35%</td>
                  <td className="px-4 py-3">% TEXT nodes with textStyleId</td>
                </tr>
                <tr className="border-b border-border-subtle">
                  <td className="px-4 py-3">Effects styled</td>
                  <td className="px-4 py-3 text-accent">15%</td>
                  <td className="px-4 py-3">
                    % nodes with effects bound to effectStyleId
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Spacing tokenized</td>
                  <td className="px-4 py-3 text-accent">15%</td>
                  <td className="px-4 py-3">
                    % auto-layout spacing/radius with FLOAT variable
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Block>
            {`- Near-duplicate warnings: −5 pts each
- Bad token names: −2 pts each (capped at −20)
- Grade scale: A ≥90, B ≥75, C ≥50, D ≥25, F <25
- Updates when any scanner runs; four progress bars with percentage labels`}
          </Block>

          <SubTitle>3 — Token Creation</SubTitle>
          <Block>
            {`Color tokens (createToken)
- Creates in Colors collection with Light + Dark modes
- Dark mode auto-generated via RGB inversion (placeholder, user refines)
- Binds via setBoundVariableForPaint
- Deduplicates: reuses existing variable if name matches

Text styles (createTextStyle)
- Creates figma.createTextStyle() from source node's font properties
- Binds via node.textStyleId = style.id

Effect styles (createEffectStyle)
- Creates figma.createEffectStyle() with full effects array
- Binds via node.effectStyleId = style.id
- Suggests names from effect signature analysis

Spacing/radius tokens (createSpacingToken)
- Creates FLOAT variable in MENTOR Spacing or MENTOR Radius collection
- Binds via figma.variables.setBoundVariableForProperty(node, prop, variable)
- Covers: itemSpacing, paddingTop/Bottom/Left/Right, cornerRadius`}
          </Block>

          <SubTitle>4 — Collection Architecture</SubTitle>
          <Block>
            {`"Organize System" (buildDSCollections)
- Creates Colors collection with Light and Dark modes
- Migrates all COLOR variables from MENTOR Tokens and other collections
- Rebinds all page nodes to the new variables (migrateVariableBindings)
- Preview modal before committing (dry run via previewDSCollections)

Going forward: createToken targets Colors directly — no more flat collection.`}
          </Block>

          <SubTitle>5 — Watch Mode</SubTitle>
          <Block>
            {`Semi-automatic token binding (processWatchChanges)
- Listens to figma.on('documentchange') — filters CREATE + property changes
- Debounced 800ms to batch rapid changes
- Auto-bind path: if new fill/effect/spacing exactly matches an existing token → silently bind, increment counter
- Pending path: if no match → queue to _watchPending, show toast
- Persisted across sessions via figma.clientStorage

UI:
- ◎/◉ toggle in topbar, green when active with auto-bind count badge
- Pending strip at bottom: "N new unbound values → Review"
- Review jumps to System tab and re-runs all 3 scanners`}
          </Block>

          <SubTitle>6 — Component Builder</SubTitle>
          <Block>
            {`Type identification (identifyComponentType)
- Name-based detection first (most reliable): 21 regex patterns
- Structure-based fallback: aspect ratio, height, border, child count
- Full Atomic Design coverage:
  - Atoms: Avatar, Badge, Button×2, Checkbox, Radio, Input, Toggle, Tooltip
  - Molecules: Breadcrumb, Dropdown, Form Field, Search Bar, Tab Item
  - Organisms: Accordion, Card, Data Table, Modal, Navbar, Stepper

State generation (buildComponentSet)
- For each selected state: source.clone() → applyStateVisuals() → figma.createComponentFromNode()
- figma.combineAsVariants() to create component set — graceful fallback to slash-named individual components if unavailable
- Original frame replaced with live instance of Default state
- All variants use WCAG-correct text color (getContrastingTextColor)

Color intelligence (buildColorMap) — 5-layer resolution:
- Layer 0: Source frame's own fill (highest priority — the source IS the brand)
- Layer 1: Local Figma variables mapped by semantic name
- Layer 2: Local paint styles mapped by semantic name
- Layer 3: Live canvas scan (cluster by frequency + HSL saturation)
- Layer 4: UI scan results (if user ran Colors scan)
- Layer 5: DesignCode UI reference defaults (last resort)

WCAG-correct text (getContrastingTextColor)
- Computes relative luminance per WCAG spec
- White text when bg luminance < 0.183 (achieves 4.5:1 AA)
- Dark text otherwise — no hardcoded 'white' for colored fills

Boolean properties (detectBooleanPropertiesForNode)
- Scans direct children for: hidden layers, opacity=0 layers, optional-named layers (Icon, Badge, Chevron, Close, Check, Loading, etc.)
- After combineAsVariants: adds boolean props to ComponentSetNode
- Wires to child layers by NAME (not ID — IDs change on clone)
- Uses returned propId suffix ('hasIcon#1:234') for componentPropertyReferences

STATE_VISUALS — complete lookup table, all 21 types × N states, covering:
- fillColor, strokeColor, textColor (supports 'auto'), opacity
- focusGlow (DROP_SHADOW spread:3 in primary color)
- elevate (DROP_SHADOW y:8 radius:16 for hover elevation)`}
          </Block>

          <SubTitle>7 — Drift Check &amp; Review Tab</SubTitle>
          <Block>
            {`- Runs on selection, reports unbound fills, strokes, unlinked text, unnamed layers
- Color context: groups issues by hex, shows usage roles and parent names
- Text context: groups text issues by font bundle, shows dominant usage
- Drift proposal: clusters issues into actionable items (create token, rename, link style)
- Batch fix: applies all selected fixes in one pass
- Progress tracking: shows N/total as fixes apply`}
          </Block>

          <SubTitle>8 — Accessibility Audit (Mentor Tab)</SubTitle>
          <Block>
            {`- Checks WCAG AA/AAA contrast ratios (relative luminance formula)
- Flags font sizes < 12px (error < 10px, warning 10–11px)
- Flags all-caps text (reduces readability)
- Suggests colour fix with corrected RGB values
- One-click fix or batch fix all`}
          </Block>

          <SubTitle>9 — AI Mentor Tab</SubTitle>
          <Block>
            {`- Voice input (SPACE key) via Web Speech API
- Text input fallback
- Sends design context + user prompt to Claude API (via proxy)
- Returns structured JSON: plan[] + operations[]
- Applies operations: set_fill, set_text, set_font_size, create_frame, create_component, rename_layer, set_padding, set_corner_radius, set_opacity, etc.
- Propose → Accept / Reject / Iterate flow
- extractJson() handles Claude responses wrapped in code fences`}
          </Block>

          <SubTitle>10 — Tools Tab</SubTitle>
          <Block>
            {`- Rename layers semantically (AI-powered)
- Generate 3 layout variations of selection
- Apply design system tokens (batch drift fix)
- Accessibility audit shortcut
- Focus/zoom to selection`}
          </Block>
        </section>

        <Hr />

        <section className="mb-12" id="file-structure">
          <SectionTitle>File Structure</SectionTitle>
          <pre className="overflow-x-auto rounded-xl border border-border-subtle bg-bg-elevated/80 p-4 font-mono text-xs leading-relaxed text-text-secondary">
            {`mentor-plugin/
  code.js       Figma main thread — all API calls, scanning, creation, watch mode
  ui.html       Plugin UI — all rendering, state, message handling, click handlers
  manifest.json api: "1.0.0", enableProposedApi: false`}
          </pre>
        </section>

        <Hr />

        <section className="mb-12" id="future-roadmap">
          <SectionTitle>Future Roadmap</SectionTitle>

          <SubTitle>Near-term (next sessions)</SubTitle>
          <Block>
            {`NR-1 — Component State Refinement
- After generating a component set, allow user to edit individual state overrides in the plugin panel (colour picker per state, opacity slider)
- Store overrides in figma.clientStorage so they persist as templates

NR-2 — Drift Check Improvements
- Add effect drift (unbound shadows in drift report alongside fills/text)
- Add spacing drift (hardcoded padding/gap values flagged)
- Group by component instead of by issue type

NR-3 — Component Naming via Claude
- One lightweight Claude API call per unique layer structure (cached by hash)
- Suggests component name AND boolean property names in one response
- Cache persisted across sessions in figma.clientStorage

NR-4 — Watch Mode Enhancement
- When watch mode detects a new unknown color, suggest the nearest existing token (show hex diff: "This looks like primary — off by 3 RGB units")
- One-click "Snap to nearest token" instead of full new token creation`}
          </Block>

          <SubTitle>Medium-term</SubTitle>
          <Block>
            {`MT-1 — Multi-Page Scanning
- Current scanners only walk figma.currentPage
- Add full-document scan option (pages loaded on demand using async API)
- Health score becomes file-level, not page-level

MT-2 — Component Set Variants Management
- After generation: "Add state" button to append a new variant to an existing set
- "Remove state" button
- Re-apply color map when brand colors change

MT-3 — Design Token Export
- Export all MENTOR-created variables + styles as JSON (W3C DTCG format)
- Compatible with: Style Dictionary, Tokens Studio, Theo
- Export button in System tab

MT-4 — Responsive / Breakpoint Variables
- Detect frames sized at standard breakpoints (375, 768, 1024, 1440)
- Create FLOAT variables for breakpoint-specific spacing/sizing
- Suggest where components should use these variables

MT-5 — Cross-Component Pattern Detection
- Extend detectReusablePatterns() beyond size+childType signature
- Use visual similarity (fill patterns, child text content) to find candidates
- Suggest component sets: "These 4 cards could be one Card component"`}
          </Block>

          <SubTitle>Long-term (The JARVIS Vision)</SubTitle>
          <p className="mb-4 text-sm font-medium text-text">
            The goal: MENTOR actively maintains the entire design system as the designer
            creates. The designer makes creative decisions; MENTOR handles the system
            infrastructure.
          </p>
          <Block>
            {`LT-1 — Real-time Design System Awareness
- On every document change: MENTOR silently checks if any new element breaks the system (wrong naming, unbound value, WCAG failure)
- Shows a non-intrusive "System health changed" indicator with one-click fix
- No manual scans needed — the system is always up to date

LT-2 — AI-Powered Token Naming
- Instead of rule-based names (spacing/lg), use Claude to suggest semantic names based on context: where the value is used, what it's near
- padding/card-content, gap/nav-items, radius/button instead of generic grid names
- Batch rename suggestions shown as a diff, user approves

LT-3 — Design System Generation from Brief
- User describes their product/brand in natural language
- MENTOR generates a complete token set: colors, typography scale, spacing scale, radius
- Applies it to the current file, creating all collections and variables
- Option: "Apply DesignCode UI style" / "Apply Material-like style" / "From scratch"

LT-4 — Component Documentation
- Auto-generate component usage documentation from structure + annotations
- Writes to Figma's component description field
- Includes: states, boolean props, spacing tokens used, related components

LT-5 — Design → Code Export
- For generated components: export React/HTML+CSS code using the file's token names
- CSS custom properties matching the variable names in the file
- Understands the three-scenario context (uses existing token names from Scenario 1)

LT-6 — Team Design System Sync
- Connect to a Git repo or Notion/Confluence page
- Push token changes as PRs / update documentation automatically
- Pull team updates back into the file when collaborators change the system

LT-7 — The Full JARVIS Loop
- Designer creates a new screen
- MENTOR scans it in real-time
- Identifies all unbound values, nearest matching tokens, WCAG issues
- Generates all missing components with correct states + boolean props
- Auto-creates tokens for any new values
- Posts a "System update report" at the end of each session: "Added 3 tokens, generated 2 components, fixed 4 WCAG issues, A grade maintained"`}
          </Block>
        </section>

        <Hr />

        <section className="mb-12" id="current-grade">
          <SectionTitle>Current Grade</SectionTitle>
          <p className="mb-4 text-sm text-text-secondary">
            Based on DesignCode UI reference standard:
          </p>
          <div className="overflow-x-auto rounded-xl border border-border-subtle">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-elevated">
                  <th className="px-4 py-3 font-medium text-text">Category</th>
                  <th className="w-36 px-4 py-3 font-medium text-text">Status</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {[
                  [
                    "Color tokenization (scan + create + bind)",
                    "✅ Full",
                  ],
                  [
                    "Typography (scan + create + bind)",
                    "✅ Full",
                  ],
                  [
                    "Effect styles (scan + create + bind)",
                    "✅ Full",
                  ],
                  [
                    "Spacing/radius tokens (scan + create + bind)",
                    "✅ Full",
                  ],
                  ["Naming convention enforcement", "✅ Full"],
                  [
                    "Collection architecture (Light/Dark modes)",
                    "✅ Full",
                  ],
                  ["Watch mode (auto-binding)", "✅ Full"],
                  [
                    "Component generation (21 types, all states)",
                    "✅ Full",
                  ],
                  ["Boolean properties", "✅ Full"],
                  ["WCAG-correct text color", "✅ Full"],
                  [
                    "Three-scenario color intelligence",
                    "✅ Full",
                  ],
                  ["Gradient fill detection", "✅ Full"],
                  ["Drift check + batch fix", "✅ Full"],
                  ["Accessibility audit", "✅ Full"],
                  ["AI canvas editing (voice + text)", "✅ Full"],
                  ["Component naming via AI", "⬜ Planned (NR-3)"],
                  ["Multi-page scanning", "⬜ Planned (MT-1)"],
                  [
                    "Token export (DTCG format)",
                    "⬜ Planned (MT-3)",
                  ],
                  [
                    "Real-time system awareness",
                    "⬜ Planned (LT-1)",
                  ],
                  [
                    "Design system generation from brief",
                    "⬜ Planned (LT-3)",
                  ],
                ].map(([cat, st], i) => (
                  <tr
                    key={i}
                    className="border-b border-border-subtle last:border-0"
                  >
                    <td className="px-4 py-2.5">{cat}</td>
                    <td className="px-4 py-2.5 text-text">{st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-center text-sm text-text-muted">
          <a
            href="/"
            className="text-accent transition-colors hover:text-accent-hover"
          >
            ← Back to portfolio
          </a>
        </p>
      </article>
    </div>
  );
}
