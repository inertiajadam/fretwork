"use client";

import { useState, useMemo } from "react";
import { SHARP, FLAT, FLAT_KEYS, KEYS_PC as KEYS, OPEN, INTERVAL, SHAPE_ORDER } from "@/lib/theory";
import GuidePanel from "@/components/ui/GuidePanel";

/* ------------------------------------------------------------------ */
/* Music data                                                          */
/* ------------------------------------------------------------------ */
const NUM_FRETS = 15;

const OVERLAYS = {
  chord:   { label: "Chord tones",   set: [0, 4, 7] },
  major:   { label: "Major scale",   set: [0, 2, 4, 5, 7, 9, 11] },
  majPent: { label: "Major pent.",   set: [0, 2, 4, 7, 9] },
  minPent: { label: "Minor pent.",   set: [0, 3, 5, 7, 10] },
};
const CHORD_SET = new Set([0, 4, 7]);

/* Each CAGED shape: open-chord cells as [string, fretOffset] (string 0 = low E),
   which cells are roots, how to find its base fret n for a key, and the
   scale-box window relative to n. */
const SHAPES = {
  C: {
    color: "#E36B5C",
    cells: [[1,3],[2,2],[3,0],[4,1],[5,0]],
    roots: [[1,3],[4,1]],
    baseFor: (r) => ((r - 12) % 12 + 12) % 12,      // (9 + n + 3) ≡ r
    window: [0, 3],
  },
  A: {
    color: "#E8A33D",
    cells: [[1,0],[2,2],[3,2],[4,2],[5,0]],
    roots: [[1,0],[3,2]],
    baseFor: (r) => ((r - 9) % 12 + 12) % 12,
    window: [-1, 2],
  },
  G: {
    color: "#86B36B",
    cells: [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]],
    roots: [[0,3],[3,0],[5,3]],
    baseFor: (r) => ((r - 7) % 12 + 12) % 12,
    window: [0, 3],
  },
  E: {
    color: "#5FA3B5",
    cells: [[0,0],[1,2],[2,2],[3,1],[4,0],[5,0]],
    roots: [[0,0],[2,2],[5,0]],
    baseFor: (r) => ((r - 4) % 12 + 12) % 12,
    window: [-1, 2],
  },
  D: {
    color: "#A985D1",
    cells: [[2,0],[3,2],[4,3],[5,2]],
    roots: [[2,0],[4,3]],
    baseFor: (r) => ((r - 2) % 12 + 12) % 12,
    window: [0, 3],
  },
};

/* Per-shape teaching copy, shown when exactly one shape is active */
const SHAPE_INFO = {
  C: {
    from: "the open C chord",
    roots: "5th string and 2nd string",
    body: "This is your open C chord picked up and moved. It's a stretchy form. Most players fret the top four or five strings rather than barring the whole thing, and the pinky reaches up to grab the root on the 5th string. Great for sweet, open-sounding voicings in the middle of the neck.",
  },
  A: {
    from: "the open A chord",
    roots: "5th string and 3rd string",
    body: "The A form is the classic 5th-string barre chord: index finger across, then three notes stacked on one fret (many players grab all three with the ring finger). If you know your B and C barre chords at frets 2 and 3, you already play this shape. Now you know why it works.",
  },
  G: {
    from: "the open G chord",
    roots: "6th, 3rd and 1st strings",
    body: "The G form is the widest of the five. Barring it in full is a serious stretch, so in the real world players use fragments of it: the bass note plus the top strings, or the middle cluster. Even played in pieces, knowing the whole shape is what links the E form below it to the A... to the C form above it.",
  },
  E: {
    from: "the open E chord",
    roots: "6th, 4th and 1st strings",
    body: "The E form is the barre chord, the first moveable shape most players ever learn. Index finger becomes the nut, the familiar open-E grip sits in front of it, and the root under your index finger on the 6th string names the chord. If you can find a note on the low E string, this shape gives you its chord instantly.",
  },
  D: {
    from: "the open D chord",
    roots: "4th string and 2nd string",
    body: "The D form is the compact triangle on the top strings. It lives high, cuts through a band mix beautifully, and is the go-to for adding a second guitar part above someone strumming open chords. Small shape, but it completes the chain: after D, the C form starts the cycle over again.",
  },
};
const nextShape = (s) => SHAPE_ORDER[(SHAPE_ORDER.indexOf(s) + 1) % 5];

/* ------------------------------------------------------------------ */
/* Geometry: real fret spacing                                        */
/* ------------------------------------------------------------------ */
const SCALE_LEN = 2036;
const NUT_X = 50;
const fretX = (f) => NUT_X + SCALE_LEN * (1 - Math.pow(2, -f / 12));
const cellX = (f) => (f === 0 ? 24 : (fretX(f - 1) + fretX(f)) / 2);
const BOARD_TOP = 78;
const STRING_GAP = 37;
const stringY = (s) => BOARD_TOP + (5 - s) * STRING_GAP; // high e on top
const BOARD_BOTTOM = BOARD_TOP + 5 * STRING_GAP;
const SVG_W = fretX(NUM_FRETS) + 26;
const SVG_H = BOARD_BOTTOM + 62;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function FretboardExplorer() {
  const [keyPc, setKeyPc] = useState(7); // G
  const [active, setActive] = useState(new Set(SHAPE_ORDER));
  const [overlay, setOverlay] = useState("chord");
  const [labels, setLabels] = useState("notes");

  const names = FLAT_KEYS.has(keyPc) ? FLAT : SHARP;
  const keyName = names[keyPc];

  const toggleShape = (s) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });

  /* Shape instances that fit on the visible neck */
  const instances = useMemo(() => {
    const out = [];
    for (const name of SHAPE_ORDER) {
      if (!active.has(name)) continue;
      const sh = SHAPES[name];
      const base = sh.baseFor(keyPc);
      for (const n of [base, base + 12]) {
        const lo = Math.max(0, n + sh.window[0]);
        const hi = n + sh.window[1];
        if (lo > NUM_FRETS) continue;
        out.push({ name, n, lo, hi: Math.min(hi, NUM_FRETS), color: sh.color });
      }
    }
    return out;
  }, [keyPc, active]);

  /* Markers: map "string-fret" → { pc, shapes:[], isChord, isRoot } */
  const markers = useMemo(() => {
    const map = new Map();
    const add = (s, f, shapeName) => {
      if (f < 0 || f > NUM_FRETS) return;
      const pc = (OPEN[s] + f) % 12;
      const key = `${s}-${f}`;
      if (!map.has(key)) {
        const iv = ((pc - keyPc) % 12 + 12) % 12;
        map.set(key, {
          s, f, pc,
          shapes: [],
          isChord: CHORD_SET.has(iv),
          isRoot: iv === 0,
          iv,
        });
      }
      const m = map.get(key);
      if (!m.shapes.includes(shapeName)) m.shapes.push(shapeName);
    };

    if (overlay === "chord") {
      for (const inst of instances) {
        for (const [s, off] of SHAPES[inst.name].cells) add(s, inst.n + off, inst.name);
      }
    } else {
      const set = new Set(OVERLAYS[overlay].set.map((iv) => (iv + keyPc) % 12));
      for (const inst of instances) {
        for (let s = 0; s < 6; s++) {
          for (let f = inst.lo; f <= inst.hi; f++) {
            if (set.has((OPEN[s] + f) % 12)) add(s, f, inst.name);
          }
        }
      }
    }
    return [...map.values()];
  }, [instances, overlay, keyPc]);

  /* Position flags above the board, staggered into two rows */
  const flags = useMemo(() => {
    const sorted = [...instances].sort((a, b) => a.lo - b.lo);
    return sorted.map((inst, i) => ({ ...inst, row: i % 2 }));
  }, [instances]);

  const markerLabel = (m) =>
    labels === "notes" ? names[m.pc] : INTERVAL[m.iv];

  /* ---------------------------------------------------------------- */
  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">The CAGED System</div>
        <h1>Fretboard Explorer</h1>
        <p className="lede">
          Five shapes. One neck. Pick a key and watch the C, A, G, E and D forms
          tile the fretboard: the same chord, five places, all connected.
        </p>
      </header>

      <GuidePanel
        prompt="What am I looking at?"
        columns={[
          {
            title: "The idea",
            body: "You already know the open C, A, G, E and D chords. The CAGED system's big insight is that these five shapes are moveable: slide any of them up the neck and it becomes a new chord. Stack all five for one key and they tile the entire fretboard, connecting end to end. That's what this board shows: the same chord, five positions, no gaps.",
          },
          {
            title: "How to read it",
            body: "Each color is one shape; the flags above the board show where each shape sits. A ringed marker is the root, the note the chord is named after. In scale views, solid markers are chord tones (your safe landing spots) and hollow markers are passing tones. A split-color marker belongs to two shapes at once: those shared notes are the doorways between positions.",
          },
          {
            title: "How to practice",
            body: "Start with one shape on and play the chord tones until the pattern is automatic. Add its neighbor and walk between them through the shared notes. Then switch to a scale view and solo inside one box, landing on solid markers. When all five feel like home, change the key. The shapes stay the same, they just slide.",
          },
        ]}
      />

      <section className="controls">
        <div className="ctrl-group">
          <span className="ctrl-label">Key · circle of fifths</span>
          <div className="chip-row">
            {KEYS.map((pc) => (
              <button
                key={pc}
                className={"chip" + (pc === keyPc ? " on" : "")}
                aria-pressed={pc === keyPc}
                onClick={() => setKeyPc(pc)}
              >
                {(FLAT_KEYS.has(pc) ? FLAT : SHARP)[pc]}
              </button>
            ))}
          </div>
        </div>

        <div className="ctrl-row">
          <div className="ctrl-group">
            <span className="ctrl-label">Shapes</span>
            <div className="chip-row">
              {SHAPE_ORDER.map((s) => (
                <button
                  key={s}
                  className={"chip shape" + (active.has(s) ? " on" : "")}
                  style={active.has(s) ? { background: SHAPES[s].color, borderColor: SHAPES[s].color, color: "#1A130E" } : { borderColor: SHAPES[s].color, color: SHAPES[s].color }}
                  aria-pressed={active.has(s)}
                  onClick={() => toggleShape(s)}
                >
                  {s}
                </button>
              ))}
              <button className="chip ghost" onClick={() => setActive(new Set(SHAPE_ORDER))}>All</button>
              <button className="chip ghost" onClick={() => setActive(new Set())}>None</button>
            </div>
          </div>

          <div className="ctrl-group">
            <span className="ctrl-label">Show</span>
            <div className="seg">
              {Object.entries(OVERLAYS).map(([id, o]) => (
                <button
                  key={id}
                  className={overlay === id ? "on" : ""}
                  aria-pressed={overlay === id}
                  onClick={() => setOverlay(id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ctrl-group">
            <span className="ctrl-label">Labels</span>
            <div className="seg">
              <button className={labels === "notes" ? "on" : ""} aria-pressed={labels === "notes"} onClick={() => setLabels("notes")}>Notes</button>
              <button className={labels === "intervals" ? "on" : ""} aria-pressed={labels === "intervals"} onClick={() => setLabels("intervals")}>Intervals</button>
            </div>
          </div>
        </div>
      </section>

      <section className="board-wrap" aria-label={`Fretboard showing ${keyName} major`}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="board" role="img">
          <defs>
            <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4A3527" />
              <stop offset="1" stopColor="#33241A" />
            </linearGradient>
          </defs>

          {/* position flags */}
          {flags.map((fl, i) => {
            const x1 = cellX(Math.max(fl.lo, 1)) - 14;
            const x2 = cellX(fl.hi) + 14;
            const y = fl.row === 0 ? 14 : 40;
            return (
              <g key={i}>
                <line x1={x1} x2={x2} y1={y + 9} y2={y + 9} stroke={fl.color} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                <rect x={(x1 + x2) / 2 - 30} y={y} width="60" height="18" rx="9" fill={fl.color} />
                <text x={(x1 + x2) / 2} y={y + 13} textAnchor="middle" className="flag-txt">
                  {fl.name} shape
                </text>
              </g>
            );
          })}

          {/* fretboard */}
          <rect x={NUT_X - 6} y={BOARD_TOP - 17} width={fretX(NUM_FRETS) - NUT_X + 16} height={BOARD_BOTTOM - BOARD_TOP + 34} rx="7" fill="url(#wood)" />
          {/* nut */}
          <rect x={NUT_X - 6} y={BOARD_TOP - 17} width="7" height={BOARD_BOTTOM - BOARD_TOP + 34} fill="#D8CDBB" rx="2" />
          {/* frets */}
          {Array.from({ length: NUM_FRETS }, (_, i) => i + 1).map((f) => (
            <line key={f} x1={fretX(f)} x2={fretX(f)} y1={BOARD_TOP - 17} y2={BOARD_BOTTOM + 17} stroke="#9A927F" strokeWidth="2.4" />
          ))}
          {/* inlays */}
          {[3, 5, 7, 9, 15].map((f) => (
            <circle key={f} cx={cellX(f)} cy={(BOARD_TOP + BOARD_BOTTOM) / 2} r="5.5" fill="#D8CDBB" opacity="0.35" />
          ))}
          <circle cx={cellX(12)} cy={stringY(3) + STRING_GAP / 2} r="5.5" fill="#D8CDBB" opacity="0.35" />
          <circle cx={cellX(12)} cy={stringY(1) + STRING_GAP / 2} r="5.5" fill="#D8CDBB" opacity="0.35" />
          {/* strings: heavier gauge low */}
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <line key={s} x1={NUT_X - 6} x2={fretX(NUM_FRETS) + 10} y1={stringY(s)} y2={stringY(s)} stroke="#C7BCA6" strokeWidth={0.9 + (5 - s) * 0.55} opacity="0.9" />
          ))}
          {/* open string names */}
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <text key={s} x={8} y={stringY(s) + 4} className="str-name">{SHARP[OPEN[s]].toLowerCase()}</text>
          ))}
          {/* fret numbers */}
          {[3, 5, 7, 9, 12, 15].map((f) => (
            <text key={f} x={cellX(f)} y={BOARD_BOTTOM + 44} textAnchor="middle" className="fret-num">{f}</text>
          ))}

          {/* markers */}
          {markers.map((m) => {
            const cx = cellX(m.f);
            const cy = stringY(m.s);
            const r = 13;
            const c1 = SHAPES[m.shapes[0]].color;
            const c2 = m.shapes[1] ? SHAPES[m.shapes[1]].color : null;
            const scaleOnly = overlay !== "chord" && !m.isChord;
            return (
              <g key={`${m.s}-${m.f}`} className="marker">
                {scaleOnly ? (
                  <circle cx={cx} cy={cy} r={r - 2} fill="#241D18" stroke={c1} strokeWidth="2" />
                ) : c2 ? (
                  <>
                    <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`} fill={c1} />
                    <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`} fill={c2} />
                  </>
                ) : (
                  <circle cx={cx} cy={cy} r={r} fill={c1} />
                )}
                {m.isRoot && <circle cx={cx} cy={cy} r={r + 2.5} fill="none" stroke="#F5EBDC" strokeWidth="2.2" />}
                <text x={cx} y={cy + 4} textAnchor="middle" className={"mark-txt" + (scaleOnly ? " dim" : "")}>
                  {markerLabel(m)}
                </text>
              </g>
            );
          })}
        </svg>
      </section>

      <section className="readout">
        <div className="readout-key">
          <span className="big-key">{keyName}</span>
          <span className="key-sub">major · {OVERLAYS[overlay].label.toLowerCase()}</span>
        </div>
        <div className="readout-list">
          {instances.length === 0 ? (
            <span className="hint">Turn on a shape above to light up the neck.</span>
          ) : (
            instances.map((inst, i) => (
              <span key={i} className="pos-tag" style={{ borderColor: inst.color }}>
                <i style={{ background: inst.color }} />
                {inst.name} shape · frets {inst.lo}–{inst.hi}
              </span>
            ))
          )}
        </div>
        <div className="legend">
          <span className="leg-item"><svg width="22" height="22"><circle cx="11" cy="11" r="7" fill="#A89B8A"/><circle cx="11" cy="11" r="9.5" fill="none" stroke="#F5EBDC" strokeWidth="2"/></svg>Root</span>
          <span className="leg-item"><svg width="22" height="22"><circle cx="11" cy="11" r="8" fill="#A89B8A"/></svg>Chord tone</span>
          <span className="leg-item"><svg width="22" height="22"><circle cx="11" cy="11" r="7" fill="#241D18" stroke="#A89B8A" strokeWidth="2"/></svg>Passing tone</span>
          <span className="leg-item"><svg width="22" height="22"><path d="M 11 3 A 8 8 0 0 0 11 19 Z" fill="#5FA3B5"/><path d="M 11 3 A 8 8 0 0 1 11 19 Z" fill="#A985D1"/></svg>Shared by two shapes</span>
        </div>
        {active.size === 1 && (() => {
          const s = [...active][0];
          const info = SHAPE_INFO[s];
          const inst = instances[0];
          const where = inst
            ? inst.n === 0
              ? "in open position, its home spot"
              : `at frets ${inst.lo}–${inst.hi}`
            : null;
          return (
            <div className="shape-panel" style={{ borderColor: SHAPES[s].color }}>
              <div className="shape-panel-head">
                <span className="shape-badge" style={{ background: SHAPES[s].color }}>{s}</span>
                <h3>The {s} shape</h3>
              </div>
              <p className="shape-meta">
                Built from {info.from} · roots on the {info.roots}
                {where && <> · for {keyName} major it sits {where}</>}
              </p>
              <p className="shape-body">{info.body}</p>
              <p className="shape-next">
                Next door: moving up the neck, the <b>{nextShape(s)} shape</b> picks up
                where this one ends. Turn it on and look for the split-color notes they share.
              </p>
            </div>
          );
        })()}
        <p className="explain">
          {overlay === "chord"
            ? `Every marker is a chord tone of ${keyName} major. Rings mark the root. Where two shapes share a note, the marker splits. That seam is how you move between positions.`
            : `Scale notes fill each shape's box. Solid markers are chord tones (your safe landing spots) and hollow markers are passing tones. Rings mark the root.`}
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
header { max-width: 880px; margin-bottom: 26px; }
.eyebrow {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--amber); margin-bottom: 10px;
}
h1 {
  font-family: var(--font-display); font-weight: 650; font-size: clamp(30px, 5vw, 44px);
  margin: 0 0 10px; letter-spacing: -0.01em;
}
.lede { color: var(--muted); font-size: 15.5px; line-height: 1.55; margin: 0; max-width: 60ch; }

.legend { display: flex; flex-wrap: wrap; gap: 8px 20px; align-items: center; }
.leg-item {
  display: inline-flex; align-items: center; gap: 7px;
  color: var(--muted); font-size: 13px;
}
.leg-item svg { flex-shrink: 0; }

.shape-panel {
  background: var(--panel); border: 1.5px solid; border-radius: 14px;
  padding: 18px 20px; max-width: 760px;
}
.shape-panel-head { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
.shape-badge {
  width: 34px; height: 34px; border-radius: 10px; display: inline-flex;
  align-items: center; justify-content: center; color: #1A130E;
  font-family: var(--font-display); font-size: 20px; font-weight: 650;
}
.shape-panel h3 { font-family: var(--font-display); font-weight: 650; font-size: 20px; margin: 0; }
.shape-meta {
  font-family: var(--font-mono); font-size: 12px; color: var(--amber);
  margin: 0 0 10px; line-height: 1.6;
}
.shape-body { color: var(--ink); font-size: 14.5px; line-height: 1.65; margin: 0 0 10px; opacity: 0.92; }
.shape-next { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; }
.shape-next b { color: var(--ink); }

.controls { display: flex; flex-direction: column; gap: 16px; margin-bottom: 22px; }
.ctrl-row { display: flex; flex-wrap: wrap; gap: 16px 28px; align-items: flex-start; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label {
  font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--muted);
}
.chip-row { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  background: var(--panel); border: 1.5px solid var(--line); color: var(--ink);
  border-radius: 999px; padding: 7px 13px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: transform 0.08s ease, background 0.12s ease;
  font-family: inherit;
}
.chip:hover { transform: translateY(-1px); }
.chip:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.chip.on { background: var(--ink); border-color: var(--ink); color: #1A130E; }
.chip.shape { min-width: 42px; font-family: var(--font-display); font-size: 16px; }
.chip.ghost { color: var(--muted); font-weight: 500; }
.seg { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; overflow: hidden; flex-wrap: wrap; }
.seg button {
  background: none; border: none; color: var(--muted); padding: 8px 13px;
  font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit;
}
.seg button:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
.seg button.on { background: var(--panel2); color: var(--ink); }

.board-wrap { overflow-x: auto; border-radius: 14px; background: var(--panel); border: 1px solid var(--line); padding: 10px 6px 4px; }
.board { min-width: 980px; width: 100%; display: block; }
.flag-txt { font-family: var(--font-mono); font-size: 11px; font-weight: 500; fill: #1A130E; }
.str-name { font-family: var(--font-mono); font-size: 12px; fill: var(--muted); }
.fret-num { font-family: var(--font-mono); font-size: 13px; fill: var(--muted); }
.mark-txt { font-size: 11.5px; font-weight: 700; fill: #1A130E; font-family: var(--font-body); }
.mark-txt.dim { fill: var(--muted); font-weight: 600; }
.marker { transition: opacity 0.15s ease; }

.readout { margin-top: 20px; display: flex; flex-direction: column; gap: 12px; max-width: 980px; }
.readout-key { display: flex; align-items: baseline; gap: 10px; }
.big-key { font-family: var(--font-display); font-size: 34px; font-weight: 650; }
.key-sub { color: var(--muted); font-size: 14px; }
.readout-list { display: flex; flex-wrap: wrap; gap: 8px; }
.pos-tag {
  display: inline-flex; align-items: center; gap: 7px; border: 1.5px solid;
  border-radius: 999px; padding: 5px 12px; font-size: 13px; font-weight: 600;
  font-family: var(--font-mono);
}
.pos-tag i { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
.hint { color: var(--muted); font-size: 14px; }
.explain { color: var(--muted); font-size: 14.5px; line-height: 1.6; margin: 0; max-width: 72ch; }

@media (prefers-reduced-motion: reduce) {
  .chip, .marker { transition: none; }
}
`;
