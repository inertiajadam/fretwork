import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Site registry: single source of truth for the menu.                 */
/* Update this list every time a tool or page is created.              */
/* status: "built" | "planned"                                         */
/* ------------------------------------------------------------------ */
const SITE_NAME = "Fretwork"; // working title, easy to change in one place

const TOOLS = [
  {
    name: "Fretboard Explorer",
    tag: "CAGED",
    status: "built",
    file: "fretboard_caged_explorer.jsx",
    blurb: "See the five CAGED shapes tile the neck in any key, with chord-tone and scale overlays.",
  },
  {
    name: "Chord Library",
    tag: "Chords",
    status: "built",
    file: "chord_library.jsx",
    blurb: "Any chord, nine flavors, five positions up the neck, with every note and interval labeled.",
  },
  {
    name: "Circle of Fifths",
    tag: "Theory",
    status: "built",
    file: "circle_of_fifths.jsx",
    blurb: "Interactive wheel: key signatures, the seven chords of every key, and classic progressions.",
  },
  {
    name: "Key Bridge",
    tag: "Songwriting",
    status: "built",
    file: "key_bridge.jsx",
    blurb: "Build a progression that changes key: pivot chords, dominant routes, and a hands-on builder.",
  },
  {
    name: "Capo Calculator",
    tag: "Practical",
    status: "built",
    file: "capo_calculator.jsx",
    blurb: "Pick the key a song sounds in; get every capo position and shape family that plays it, with full chord translations.",
  },
  {
    name: "Tuner",
    tag: "Practical",
    status: "built",
    file: "tuner.jsx",
    blurb: "Mic-based tuner with a cents gauge, six tunings, strings and chromatic modes, adjustable reference pitch.",
  },
  {
    name: "Nashville Number Trainer",
    tag: "Theory",
    status: "built",
    file: "nashville_trainer.jsx",
    blurb: "Build charts in numbers, see them wear chords in two keys at once, then drill both directions in quiz mode.",
  },
  {
    name: "Ear Trainer",
    tag: "Ears",
    status: "built",
    file: "ear_trainer.jsx",
    blurb: "Three drills with synthesized audio: intervals, chord colors, and progression recognition, each in three levels.",
  },
  {
    name: "Metronome & Speed Builder",
    tag: "Technique",
    status: "built",
    file: "metronome_speed_builder.jsx",
    blurb: "Sample-accurate metronome plus a tempo ladder: climb a few bpm per clean pass, manually or on autopilot.",
  },
  {
    name: "Progression Player",
    tag: "Practice",
    status: "built",
    file: "progression_player.jsx",
    blurb: "A looping synthesized backing band: any progression in all 24 major and minor keys, four feels, drums optional.",
  },
];

const LEARN = [
  { name: "Getting Started", blurb: "Where are you stuck? A roadmap into the rest of the site.", status: "planned" },
  { name: "Chords", blurb: "Open chords, barre chords, and the voicing families.", status: "planned" },
  { name: "The Fretboard & CAGED", blurb: "How five shapes map the entire neck.", status: "planned" },
  { name: "Theory & Nashville Numbers", blurb: "Keys, intervals, diatonic chords, number notation.", status: "planned" },
  { name: "Ear Training", blurb: "Hearing intervals, qualities, and progressions.", status: "planned" },
  { name: "Technique & Speed", blurb: "Practice structure and tempo laddering.", status: "planned" },
];

const NAV = ["Tools", "Learn", "Practice", "About"];

/* ------------------------------------------------------------------ */
export default function SiteMenu() {
  const [section, setSection] = useState("Tools");
  const built = TOOLS.filter((t) => t.status === "built").length;

  return (
    <div className="app">
      <style>{css}</style>

      <nav className="topnav">
        <span className="brand">{SITE_NAME}</span>
        <div className="navlinks">
          {NAV.map((n) => (
            <button key={n} className={"navlink" + (section === n ? " on" : "")} aria-pressed={section === n} onClick={() => setSection(n)}>
              {n}
            </button>
          ))}
        </div>
        <span className="free-badge">100% free</span>
      </nav>

      <header>
        <div className="eyebrow">Site map · {built} of {TOOLS.length} tools built</div>
        <h1>Everything on the neck,<br />explained by hand.</h1>
        <p className="lede">
          Interactive tools and plain-language lessons for guitarists who want to
          understand what they're playing. No paywalls, no accounts required.
        </p>
      </header>

      {section === "Tools" && (
        <section className="grid">
          {TOOLS.map((t) => (
            <div key={t.name} className={"card" + (t.status === "planned" ? " dim" : "")}>
              <div className="card-top">
                <span className="tag">{t.tag}</span>
                <span className={"status " + t.status}>{t.status === "built" ? "Live" : "Planned"}</span>
              </div>
              <h3>{t.name}</h3>
              <p>{t.blurb}</p>
              {t.file && <span className="file-ref">{t.file}</span>}
            </div>
          ))}
        </section>
      )}

      {section === "Learn" && (
        <section className="grid">
          {LEARN.map((l) => (
            <div key={l.name} className="card dim">
              <div className="card-top">
                <span className="tag">Lesson</span>
                <span className="status planned">Planned</span>
              </div>
              <h3>{l.name}</h3>
              <p>{l.blurb}</p>
            </div>
          ))}
        </section>
      )}

      {section === "Practice" && (
        <section className="placeholder">
          <h3>Practice</h3>
          <p>
            Routine builder, streaks, and progress tracking. Coming in Phase 3,
            with optional free accounts so nothing here is ever required.
          </p>
        </section>
      )}

      {section === "About" && (
        <section className="placeholder">
          <h3>About</h3>
          <p>
            All tools generate everything from music theory and math. All content
            is original. Everything is free, forever. Name above is a working
            title until we pick the real one.
          </p>
        </section>
      )}

      <footer>
        <span>{SITE_NAME} · web first, mobile app later · every tool works without an account</span>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=JetBrains+Mono:wght@500&display=swap');

.app {
  --bg: #191411; --panel: #241D18; --panel2: #2C241E; --line: #3A2F27;
  --ink: #EFE6D9; --muted: #A89B8A; --amber: #E8A33D;
  min-height: 100vh; background: var(--bg); color: var(--ink);
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
  padding: 20px clamp(14px, 4vw, 48px) 40px;
}

.topnav { display: flex; align-items: center; gap: 20px; padding-bottom: 22px; border-bottom: 1px solid var(--line); margin-bottom: 30px; flex-wrap: wrap; }
.brand { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 650; letter-spacing: -0.01em; }
.navlinks { display: flex; gap: 4px; flex-wrap: wrap; }
.navlink { background: none; border: none; color: var(--muted); padding: 8px 13px; border-radius: 8px; font-size: 14.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
.navlink:hover { color: var(--ink); }
.navlink.on { background: var(--panel2); color: var(--ink); }
.navlink:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.free-badge { margin-left: auto; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber); border: 1.5px solid var(--amber); border-radius: 999px; padding: 5px 12px; }

header { max-width: 880px; margin-bottom: 30px; }
.eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--amber); margin-bottom: 12px; }
h1 { font-family: 'Fraunces', serif; font-weight: 650; font-size: clamp(32px, 5.5vw, 52px); margin: 0 0 12px; letter-spacing: -0.015em; line-height: 1.08; }
.lede { color: var(--muted); font-size: 16px; line-height: 1.55; margin: 0; max-width: 58ch; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 14px; max-width: 1200px; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px; display: flex; flex-direction: column; gap: 8px; }
.card.dim { opacity: 0.62; }
.card-top { display: flex; justify-content: space-between; align-items: center; }
.tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.status { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 999px; padding: 3px 9px; }
.status.built { color: #1A130E; background: var(--amber); }
.status.planned { color: var(--muted); border: 1px solid var(--line); }
.card h3 { font-family: 'Fraunces', serif; font-weight: 650; font-size: 19px; margin: 2px 0 0; }
.card p { color: var(--muted); font-size: 13.5px; line-height: 1.55; margin: 0; }
.file-ref { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: #7A6F60; }

.placeholder { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 24px; max-width: 640px; }
.placeholder h3 { font-family: 'Fraunces', serif; font-weight: 650; font-size: 22px; margin: 0 0 8px; }
.placeholder p { color: var(--muted); font-size: 14.5px; line-height: 1.6; margin: 0; }

footer { margin-top: 40px; padding-top: 18px; border-top: 1px solid var(--line); }
footer span { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #7A6F60; letter-spacing: 0.06em; }
`;
