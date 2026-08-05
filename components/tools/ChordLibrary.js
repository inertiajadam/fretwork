"use client";

import { useState, useMemo } from "react";
import { SHARP, FLAT, FLAT_ROOTS, ROOTS, OPEN, INTERVAL, SHAPE_COLORS, SHAPE_ORDER } from "@/lib/theory";
import GuidePanel from "@/components/ui/GuidePanel";

/* ------------------------------------------------------------------ */
/* Music data                                                          */
/* ------------------------------------------------------------------ */
const rootName = (pc) => (FLAT_ROOTS.has(pc) ? FLAT : SHARP)[pc];

/* Base-fret formula per form: n such that the form's root lands on the
   chosen root pitch class. Same anchors as the Fretboard Explorer. */
const BASE_FOR = {
  C: (r) => ((r - 0) % 12 + 12) % 12,
  A: (r) => ((r - 9) % 12 + 12) % 12,
  G: (r) => ((r - 7) % 12 + 12) % 12,
  E: (r) => ((r - 4) % 12 + 12) % 12,
  D: (r) => ((r - 2) % 12 + 12) % 12,
};

/* Voicing grids: relative frets per string, low E → high e. -1 = muted.
   When moved up by n frets, every 0 becomes the barre/base fret. */
const QUALITIES = {
  maj: {
    label: "Major", suffix: "",
    forms: {
      C: { grid: [-1, 3, 2, 0, 1, 0], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 2, 0], roots: [1, 3] },
      G: { grid: [3, 2, 0, 0, 0, 3],  roots: [0, 3, 5] },
      E: { grid: [0, 2, 2, 1, 0, 0],  roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 2], roots: [2, 4] },
    },
  },
  min: {
    label: "Minor", suffix: "m",
    forms: {
      C: { grid: [-1, 3, 1, 0, 1, -1], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 1, 0],  roots: [1, 3] },
      G: { grid: [3, 1, 0, 0, -1, -1], roots: [0, 3] },
      E: { grid: [0, 2, 2, 0, 0, 0],   roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 1], roots: [2, 4] },
    },
  },
  dom7: {
    label: "7", suffix: "7",
    forms: {
      C: { grid: [-1, 3, 2, 3, 1, 0],  roots: [1, 4] },
      A: { grid: [-1, 0, 2, 0, 2, 0],  roots: [1] },
      G: { grid: [3, 2, 0, 0, 0, 1],   roots: [0, 3] },
      E: { grid: [0, 2, 0, 1, 0, 0],   roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 1, 2], roots: [2] },
    },
  },
  maj7: {
    label: "maj7", suffix: "maj7",
    forms: {
      C: { grid: [-1, 3, 2, 0, 0, 0],  roots: [1] },
      A: { grid: [-1, 0, 2, 1, 2, 0],  roots: [1] },
      G: { grid: [3, 2, 0, 0, 0, 2],   roots: [0, 3] },
      E: { grid: [0, 2, 1, 1, 0, 0],   roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 2, 2], roots: [2] },
    },
  },
  min7: {
    label: "m7", suffix: "m7",
    forms: {
      C: { grid: [-1, 3, 1, 3, 1, -1], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 0, 1, 0],  roots: [1] },
      G: { grid: [3, 1, 3, 0, -1, -1], roots: [0, 3] },
      E: { grid: [0, 2, 0, 0, 0, 0],   roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 1, 1], roots: [2] },
    },
  },
  six: {
    label: "6", suffix: "6",
    forms: {
      C: { grid: [-1, 3, 2, 2, 1, 0],  roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 2, 2],  roots: [1, 3] },
      G: { grid: [3, 2, 0, 0, 0, 0],   roots: [0, 3] },
      E: { grid: [0, 2, 2, 1, 2, 0],   roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 0, 2], roots: [2] },
    },
  },
  sus2: {
    label: "sus2", suffix: "sus2",
    forms: {
      C: { grid: [-1, 3, 0, 0, 1, 3],  roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 0, 0],  roots: [1, 3] },
      G: { grid: [3, -1, 0, 2, 3, 3],  roots: [0, 5] },
      E: { grid: [0, 2, 4, 4, 0, 0],   roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 0], roots: [2, 4] },
    },
  },
  sus4: {
    label: "sus4", suffix: "sus4",
    forms: {
      C: { grid: [-1, 3, 3, 0, 1, 1],  roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 3, 0],  roots: [1, 3] },
      G: { grid: [3, 3, 0, 0, 1, 3],   roots: [0, 3, 5] },
      E: { grid: [0, 2, 2, 2, 0, 0],   roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 3], roots: [2, 4] },
    },
  },
  add9: {
    label: "add9", suffix: "add9",
    forms: {
      C: { grid: [-1, 3, 2, 0, 3, 0],  roots: [1] },
      A: { grid: [-1, 0, 2, 4, 2, 0],  roots: [1] },
      G: { grid: [3, 2, 0, 2, 0, 3],   roots: [0, 5] },
      E: { grid: [0, 2, 2, 1, 0, 2],   roots: [0, 2] },
      D: { grid: [-1, -1, 0, 4, 3, 0], roots: [2, 4] },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Chord diagram card                                                  */
/* ------------------------------------------------------------------ */
const CW = 176, CH = 236;
const GX = 34, GY = 58;          // grid origin
const SX = 22, SY = 30;          // string / fret spacing
const NROWS = 5;

function Diagram({ form, base, rootPc, names }) {
  const color = SHAPE_COLORS[form.shape];
  const grid = form.grid;
  const isOpen = base === 0;
  const showFrom = isOpen ? 1 : base; // first fret row shown

  const dotXY = (s, absFret) => [GX + s * SX, GY + (absFret - showFrom) * SY + SY / 2];

  /* barre: two or more strings at relative 0, moved position */
  const barreStrings = grid
    .map((rel, s) => ({ rel, s }))
    .filter((c) => c.rel === 0)
    .map((c) => c.s);
  const hasBarre = !isOpen && barreStrings.length >= 2;

  const sounded = grid.map((rel, s) => (rel < 0 ? null : (OPEN[s] + base + rel) % 12));

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="diagram" role="img" aria-label={`${form.shape} form`}>
      {/* shape badge */}
      <rect x={GX - 22} y={10} width={30} height={22} rx={7} fill={color} />
      <text x={GX - 7} y={26} textAnchor="middle" className="badge-txt">{form.shape}</text>
      <text x={GX + 18} y={26} className="form-txt">form</text>

      {/* fret position label */}
      <text x={CW - 14} y={GY + SY / 2 + 4} textAnchor="end" className="fret-label">
        {isOpen ? "" : `${base}fr`}
      </text>

      {/* open / muted markers above nut */}
      {grid.map((rel, s) => {
        const x = GX + s * SX;
        if (rel < 0) return <text key={s} x={x} y={GY - 8} textAnchor="middle" className="xo">×</text>;
        if (isOpen && rel === 0) return <circle key={s} cx={x} cy={GY - 12} r={4.5} fill="none" stroke="#A89B8A" strokeWidth="1.6" />;
        return null;
      })}

      {/* nut or top line */}
      <rect x={GX - 2} y={GY - (isOpen ? 4 : 1)} width={SX * 5 + 4} height={isOpen ? 5 : 2} fill={isOpen ? "#D8CDBB" : "#9A927F"} rx={1} />
      {/* fret lines */}
      {Array.from({ length: NROWS }, (_, i) => (
        <line key={i} x1={GX} x2={GX + SX * 5} y1={GY + (i + 1) * SY} y2={GY + (i + 1) * SY} stroke="#9A927F" strokeWidth="1.4" />
      ))}
      {/* strings */}
      {Array.from({ length: 6 }, (_, s) => (
        <line key={s} x1={GX + s * SX} x2={GX + s * SX} y1={GY} y2={GY + NROWS * SY} stroke="#C7BCA6" strokeWidth={0.8 + (5 - s) * 0.3} />
      ))}

      {/* barre */}
      {hasBarre && (() => {
        const lo = Math.min(...barreStrings), hi = Math.max(...barreStrings);
        const [x1, y] = dotXY(lo, base);
        const [x2] = dotXY(hi, base);
        return <rect x={x1 - 8} y={y - 8} width={x2 - x1 + 16} height={16} rx={8} fill={color} opacity={0.95} />;
      })()}

      {/* dots */}
      {grid.map((rel, s) => {
        if (rel < 0) return null;
        if (isOpen && rel === 0) return null;
        const abs = base + rel;
        const [x, y] = dotXY(s, abs);
        const isRoot = form.roots.includes(s);
        return (
          <g key={s}>
            <circle cx={x} cy={y} r={8.5} fill={color} />
            {isRoot && <circle cx={x} cy={y} r={10.8} fill="none" stroke="#F5EBDC" strokeWidth="1.8" />}
          </g>
        );
      })}
      {/* open-string root rings */}
      {isOpen && grid.map((rel, s) => {
        if (rel !== 0 || !form.roots.includes(s)) return null;
        const x = GX + s * SX;
        return <circle key={s} cx={x} cy={GY - 12} r={6.5} fill="none" stroke="#F5EBDC" strokeWidth="1.6" />;
      })}

      {/* sounded notes + intervals */}
      {sounded.map((pc, s) => {
        if (pc === null) return null;
        const x = GX + s * SX;
        const iv = ((pc - rootPc) % 12 + 12) % 12;
        return (
          <g key={s}>
            <text x={x} y={GY + NROWS * SY + 20} textAnchor="middle" className="note-txt">{names[pc]}</text>
            <text x={x} y={GY + NROWS * SY + 36} textAnchor="middle" className="iv-txt">{INTERVAL[iv]}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function ChordLibrary() {
  const [rootPc, setRootPc] = useState(7); // G
  const [quality, setQuality] = useState("maj");

  const names = FLAT_ROOTS.has(rootPc) ? FLAT : SHARP;
  const q = QUALITIES[quality];
  const chordName = rootName(rootPc) + q.suffix;

  /* Build the five voicings, sorted low to high on the neck */
  const voicings = useMemo(() => {
    return SHAPE_ORDER.map((shape) => {
      const base = BASE_FOR[shape](rootPc);
      const f = q.forms[shape];
      const frets = f.grid.filter((r) => r >= 0).map((r) => base + r);
      return {
        shape,
        base,
        grid: f.grid,
        roots: f.roots,
        lo: Math.min(...frets),
        hi: Math.max(...frets),
      };
    }).sort((a, b) => a.base - b.base || a.lo - b.lo);
  }, [rootPc, quality, q]);

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
                Strings run left to right from low E to high e, exactly as if the guitar were standing up in front of you. Dots are where your fingers go. A ringed dot is the root, the note the chord is named after. An × means don't play that string, and a small circle above the nut means play it open. The number on the right ("3fr") tells you which fret the diagram starts on, and a long pill across the strings is a barre.
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
            {Object.entries(QUALITIES).map(([id, qq]) => (
              <button key={id} className={quality === id ? "on" : ""} aria-pressed={quality === id} onClick={() => setQuality(id)}>
                {qq.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="result">
        <div className="chord-title">
          <span className="big-chord">{chordName}</span>
          <span className="chord-sub">{q.label.toLowerCase() === q.suffix ? "" : q.label} · five positions, low to high</span>
        </div>

        <div className="cards">
          {voicings.map((v) => (
            <div key={v.shape} className="card" style={{ borderColor: SHAPE_COLORS[v.shape] + "55" }}>
              <Diagram form={v} base={v.base} rootPc={rootPc} names={names} />
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
.diagram { width: 100%; max-width: 200px; display: block; }
.badge-txt { font-family: var(--font-display); font-size: 15px; font-weight: 650; fill: #1A130E; }
.form-txt { font-family: var(--font-mono); font-size: 11px; fill: #A89B8A; }
.fret-label { font-family: var(--font-mono); font-size: 13px; fill: #EFE6D9; }
.xo { font-size: 13px; fill: #A89B8A; font-weight: 600; }
.note-txt { font-size: 12px; font-weight: 700; fill: #EFE6D9; font-family: var(--font-body); }
.iv-txt { font-family: var(--font-mono); font-size: 10.5px; fill: #A89B8A; }
.card-foot { font-family: var(--font-mono); font-size: 11.5px; color: var(--muted); margin-top: 2px; }

.explain { color: var(--muted); font-size: 14.5px; line-height: 1.6; margin: 20px 0 0; max-width: 72ch; }

@media (prefers-reduced-motion: reduce) { .chip { transition: none; } }
`;
