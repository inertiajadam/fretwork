"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ROOTS, SHAPE_COLORS } from "@/lib/theory";
import {
  QUALITIES,
  QUALITY_ORDER,
  rootName,
  chordSymbol,
  buildVoicings,
} from "@/lib/chords";
import { usePersistedState } from "@/hooks/usePersistedState";
import GuidePanel from "@/components/ui/GuidePanel";
import ChordDiagram from "@/components/ChordDiagram";

/* Compact labels for the flavor control (maj/min spelled out, rest as symbol). */
const SEG_LABEL = {
  maj: "Major",
  min: "Minor",
  dom7: "7",
  maj7: "maj7",
  min7: "m7",
  six: "6",
  sus2: "sus2",
  sus4: "sus4",
  add9: "add9",
};

export default function ChordLibrary() {
  const [rootPc, setRootPc] = usePersistedState("tool.chords.root", 7); // G
  const [quality, setQuality] = usePersistedState("tool.chords.quality", "maj");

  const q = QUALITIES[quality];
  const chordName = chordSymbol(rootPc, quality);

  /* Build the five voicings, sorted low to high on the neck */
  const voicings = useMemo(() => buildVoicings(rootPc, quality), [rootPc, quality]);

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">Voicings up the neck</div>
        <h1>Chord Library</h1>
        <p className="lede">
          One chord, five places to play it. Pick a root and a flavor, and see
          every CAGED voicing laid out in order up the neck.
        </p>
      </header>

      <GuidePanel
        prompt="How do I read these?"
        columns={[
          {
            title: "Reading a diagram",
            body: (
              <p>
                Strings run left to right from low E to high e, exactly as if the guitar were standing up in front of you. Dots are where your fingers go. A ringed dot is the root, the note the chord is named after. An &#215; means don&apos;t play that string, and a small circle above the nut means play it open. The number on the right (&quot;3fr&quot;) tells you which fret the diagram starts on, and a long pill across the strings is a barre.
              </p>
            ),
          },
          {
            title: "Why five voicings?",
            body: "These are the five CAGED forms, the same shapes and colors as the Fretboard Explorer. Every chord lives in all five places, and the cards are sorted by position so you can watch one chord climb the neck. Under each diagram you'll see the actual notes sounded and their role in the chord: R is the root, 3 the third, 5 the fifth, b7 the seventh, and so on.",
          },
          {
            title: "How to use it",
            body: "Learning a song and hating a chord change? Try the same chord in a different position; a nearer voicing often fixes the change. Playing with another guitarist? Grab a higher form so you're not stacked on the same frets. And if a full shape is a stretch, play just the strings your fingers can reach. Partial voicings are real voicings.",
          },
        ]}
      />

      <section className="controls">
        <div className="ctrl-group">
          <span className="ctrl-label">Root</span>
          <div className="chip-row">
            {ROOTS.map((pc) => (
              <button
                key={pc}
                className={"chip" + (pc === rootPc ? " on" : "")}
                aria-pressed={pc === rootPc}
                onClick={() => setRootPc(pc)}
              >
                {rootName(pc)}
              </button>
            ))}
          </div>
        </div>
        <div className="ctrl-group">
          <span className="ctrl-label">Flavor</span>
          <div className="seg">
            {QUALITY_ORDER.map((id) => (
              <button key={id} className={quality === id ? "on" : ""} aria-pressed={quality === id} onClick={() => setQuality(id)}>
                {SEG_LABEL[id]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="result">
        <div className="chord-title">
          <span className="big-chord">{chordName}</span>
          <span className="chord-sub">{q.name} · five positions, low to high</span>
        </div>

        <div className="cards">
          {voicings.map((v) => (
            <div key={v.shape} className="card" style={{ borderColor: SHAPE_COLORS[v.shape] + "55" }}>
              <ChordDiagram shape={v.shape} grid={v.grid} roots={v.roots} base={v.base} rootPc={rootPc} />
              <div className="card-foot">
                {v.base === 0 ? "Open position" : `Frets ${v.lo} to ${v.hi}`}
              </div>
            </div>
          ))}
        </div>

        <p className="explain">
          Same chord, climbing the neck. Notice how each form hands off to the
          next: the top of one voicing sits right where the next one begins.
          That chain is the whole CAGED system in action.
        </p>

        <p className="explain">
          Want a printable page for one chord?{" "}
          <Link href="/chords" className="all-link">
            Browse every chord
          </Link>{" "}
          with its notes, formula, and all five shapes.
        </p>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const css = `
.app {
  min-height: 100vh; background: var(--bg); color: var(--ink);
  font-family: var(--font-body);
  padding: 28px clamp(14px, 4vw, 48px) 56px;
}
header { max-width: 880px; margin-bottom: 22px; }
.eyebrow {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--amber); margin-bottom: 10px;
}
h1 {
  font-family: var(--font-display); font-weight: 650; font-size: clamp(30px, 5vw, 44px);
  margin: 0 0 10px; letter-spacing: -0.01em;
}
.lede { color: var(--muted); font-size: 15.5px; line-height: 1.55; margin: 0; max-width: 60ch; }

.controls { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label {
  font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--muted);
}
.chip-row { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  background: var(--panel); border: 1.5px solid var(--line); color: var(--ink);
  border-radius: 999px; padding: 7px 13px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: transform 0.08s ease; font-family: inherit; min-width: 42px;
}
.chip:hover { transform: translateY(-1px); }
.chip:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.chip.on { background: var(--ink); border-color: var(--ink); color: #1A130E; }
.seg { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; overflow: hidden; flex-wrap: wrap; align-self: flex-start; }
.seg button {
  background: none; border: none; color: var(--muted); padding: 8px 15px;
  font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit;
}
.seg button:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
.seg button.on { background: var(--panel2); color: var(--ink); }

.chord-title { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.big-chord { font-family: var(--font-display); font-size: 40px; font-weight: 650; }
.chord-sub { color: var(--muted); font-size: 14px; }

.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(186px, 1fr)); gap: 14px; max-width: 1100px; }
.card {
  background: var(--panel); border: 1.5px solid var(--line); border-radius: 14px;
  padding: 8px 4px 12px; display: flex; flex-direction: column; align-items: center;
}
.card-foot { font-family: var(--font-mono); font-size: 11.5px; color: var(--muted); margin-top: 2px; }

.explain { color: var(--muted); font-size: 14.5px; line-height: 1.6; margin: 20px 0 0; max-width: 72ch; }
.all-link { color: var(--amber); text-decoration: underline; text-underline-offset: 2px; }

@media (prefers-reduced-motion: reduce) { .chip { transition: none; } }
`;
