"use client";
import { useState, useMemo } from "react";
import { SCALES } from "@/lib/theory";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
/* Clockwise from the top: C at 12 o'clock, one fifth per step */
const WHEEL = [
  { major: "C",  minor: "Am",  sig: 0 },
  { major: "G",  minor: "Em",  sig: 1 },
  { major: "D",  minor: "Bm",  sig: 2 },
  { major: "A",  minor: "F#m", sig: 3 },
  { major: "E",  minor: "C#m", sig: 4 },
  { major: "B",  minor: "G#m", sig: 5 },
  { major: "F#", minor: "D#m", sig: 6 },
  { major: "Db", minor: "Bbm", sig: -5 },
  { major: "Ab", minor: "Fm",  sig: -4 },
  { major: "Eb", minor: "Cm",  sig: -3 },
  { major: "Bb", minor: "Gm",  sig: -2 },
  { major: "F",  minor: "Dm",  sig: -1 },
];

const DEGREE_QUALITY = ["", "m", "m", "", "", "m", "°"]; // maj min min maj maj min dim
const NASHVILLE = ["1", "2m", "3m", "4", "5", "6m", "7°"];

const SHARPS_ORDER = ["F#","C#","G#","D#","A#","E#"];
const FLATS_ORDER = ["Bb","Eb","Ab","Db","Gb"];

const PROGRESSIONS = [
  { name: "The workhorse",        degrees: [0, 3, 4],       nums: "1 · 4 · 5" },
  { name: "The four-chord anthem",degrees: [0, 4, 5, 3],    nums: "1 · 5 · 6m · 4" },
  { name: "Moody pop",            degrees: [5, 3, 0, 4],    nums: "6m · 4 · 1 · 5" },
  { name: "Doo-wop",              degrees: [0, 5, 3, 4],    nums: "1 · 6m · 4 · 5" },
  { name: "Jazz turnaround",      degrees: [1, 4, 0],       nums: "2m · 5 · 1" },
];

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */
const CX = 210, CY = 210;
const R_OUT = 200, R_MID = 148, R_IN = 104, R_SIG = 84;

const polar = (r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
};

function sectorPath(r1, r2, a0, a1) {
  const [x0, y0] = polar(r2, a0);
  const [x1, y1] = polar(r2, a1);
  const [x2, y2] = polar(r1, a1);
  const [x3, y3] = polar(r1, a0);
  return `M ${x0} ${y0} A ${r2} ${r2} 0 0 1 ${x1} ${y1} L ${x2} ${y2} A ${r1} ${r1} 0 0 0 ${x3} ${y3} Z`;
}

const sigLabel = (sig) =>
  sig === 0 ? "✓" : sig > 0 ? `${sig}♯` : `${-sig}♭`;

const sigText = (sig) => {
  if (sig === 0) return "no sharps or flats";
  if (sig > 0) return `${sig} sharp${sig > 1 ? "s" : ""}: ${SHARPS_ORDER.slice(0, sig).join(" ")}`;
  return `${-sig} flat${sig < -1 ? "s" : ""}: ${FLATS_ORDER.slice(0, -sig).join(" ")}`;
};

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function CircleOfFifths() {
  const [sel, setSel] = useState(0); // index into WHEEL, C selected
  const [showGuide, setShowGuide] = useState(true);

  const key = WHEEL[sel];
  const scale = SCALES[key.major];
  const left = (sel + 11) % 12;  // counterclockwise neighbor = IV
  const right = (sel + 1) % 12;  // clockwise neighbor = V

  const diatonic = useMemo(
    () => scale.map((n, i) => ({ name: n + DEGREE_QUALITY[i], num: NASHVILLE[i], degree: i })),
    [scale]
  );

  const segFill = (i, ring) => {
    if (i === sel) return "#E8A33D";
    if (i === left || i === right) return ring === "out" ? "#3A2F27" : "#332A22";
    return ring === "out" ? "#2C241E" : "#241D18";
  };
  const segText = (i) => (i === sel ? "#1A130E" : i === left || i === right ? "#EFE6D9" : "#A89B8A");

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">Keys &amp; Relationships</div>
        <h1>Circle of Fifths</h1>
        <p className="lede">
          Every key on one wheel. Click a key to see its signature, its seven
          chords, and the progressions you already know by ear, spelled out in
          that key.
        </p>
      </header>

      <section className="guide">
        <button className="guide-toggle" aria-expanded={showGuide} onClick={() => setShowGuide(!showGuide)}>
          {showGuide ? "Hide the guide" : "What am I looking at?"}
        </button>
        {showGuide && (
          <div className="guide-body">
            <div className="guide-col">
              <h3>The idea</h3>
              <p>
                Arrange the twelve keys so each step clockwise jumps up a perfect
                fifth, and something useful happens: neighbors on the wheel share
                six of their seven notes. That's why some key changes feel smooth
                and others feel like a lane change. Distance on this wheel is
                distance in sound.
              </p>
            </div>
            <div className="guide-col">
              <h3>How to read it</h3>
              <p>
                Outer ring is the major keys, inner ring is each key's relative
                minor (same notes, darker mood). The small ring counts the key
                signature: one sharp added per clockwise step, one flat per step
                the other way. When you select a key, its two neighbors stay lit.
                They are its 4 chord and 5 chord, the keys it borrows from most.
              </p>
            </div>
            <div className="guide-col">
              <h3>How to use it</h3>
              <p>
                Writing or jamming in a key? The seven chords below the wheel are
                your palette, numbered Nashville style. Need to transpose? Keep
                the numbers, click a different key, and read off the new chords.
                Stuck on what chord comes next? Try a neighbor on the wheel
                before anything else. It usually works.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="layout">
        <div className="wheel-wrap">
          <svg viewBox="0 0 420 420" className="wheel" role="img" aria-label="Circle of fifths">
            {WHEEL.map((k, i) => {
              const a0 = i * 30 - 15, a1 = i * 30 + 15;
              const [mx, my] = polar((R_OUT + R_MID) / 2, i * 30);
              const [nx, ny] = polar((R_MID + R_IN) / 2, i * 30);
              const [sx, sy] = polar((R_IN + R_SIG) / 2, i * 30);
              return (
                <g key={i} className="seg" onClick={() => setSel(i)}>
                  <path d={sectorPath(R_MID, R_OUT, a0, a1)} fill={segFill(i, "out")} stroke="#191411" strokeWidth="2" />
                  <path d={sectorPath(R_IN, R_MID, a0, a1)} fill={segFill(i, "in")} stroke="#191411" strokeWidth="2" />
                  <path d={sectorPath(R_SIG, R_IN, a0, a1)} fill="#1E1814" stroke="#191411" strokeWidth="2" />
                  <text x={mx} y={my + 7} textAnchor="middle" className="maj-txt" fill={segText(i)}>{k.major}</text>
                  <text x={nx} y={ny + 5} textAnchor="middle" className="min-txt" fill={segText(i)}>{k.minor}</text>
                  <text x={sx} y={sy + 4} textAnchor="middle" className="sig-txt">{sigLabel(k.sig)}</text>
                </g>
              );
            })}
            {/* center readout */}
            <circle cx={CX} cy={CY} r={R_SIG - 6} fill="#241D18" stroke="#3A2F27" strokeWidth="1.5" />
            <text x={CX} y={CY - 12} textAnchor="middle" className="center-key">{key.major}</text>
            <text x={CX} y={CY + 12} textAnchor="middle" className="center-sub">rel. minor {key.minor}</text>
            <text x={CX} y={CY + 32} textAnchor="middle" className="center-sig">{sigLabel(key.sig) === "✓" ? "no ♯ / ♭" : sigLabel(key.sig)}</text>
          </svg>
        </div>

        <div className="panel">
          <div className="panel-block">
            <span className="ctrl-label">Key of {key.major} major</span>
            <p className="sig-line">{sigText(key.sig)} · relative minor {key.minor}</p>
          </div>

          <div className="panel-block">
            <span className="ctrl-label">The seven chords</span>
            <div className="chord-row">
              {diatonic.map((c) => (
                <div key={c.degree} className={"dchip" + (c.degree === 0 || c.degree === 3 || c.degree === 4 ? " primary" : "")}>
                  <span className="dnum">{c.num}</span>
                  <span className="dname">{c.name}</span>
                </div>
              ))}
            </div>
            <p className="hint-line">
              Solid chips are the primary chords (1, 4, 5). Thousands of songs
              never leave them.
            </p>
          </div>

          <div className="panel-block">
            <span className="ctrl-label">Progressions in {key.major}</span>
            <div className="prog-list">
              {PROGRESSIONS.map((p) => (
                <div key={p.name} className="prog">
                  <div className="prog-head">
                    <span className="prog-name">{p.name}</span>
                    <span className="prog-nums">{p.nums}</span>
                  </div>
                  <div className="prog-chords">
                    {p.degrees.map((d, i) => (
                      <span key={i} className="pchip">{diatonic[d].name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-block">
            <span className="ctrl-label">Closest keys</span>
            <p className="hint-line">
              {WHEEL[left].major} (one step flat side) and {WHEEL[right].major} (one
              step sharp side) each share six notes with {key.major}. Smoothest
              places to modulate, and where borrowed chords come from.
            </p>
          </div>
        </div>
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

.guide { margin-bottom: 24px; max-width: 1100px; }
.guide-toggle {
  background: none; border: none; color: var(--amber); cursor: pointer;
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.14em;
  text-transform: uppercase; padding: 0 0 10px; font-weight: 500;
}
.guide-toggle:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.guide-body {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px; background: var(--panel); border: 1px solid var(--line);
  border-radius: 14px; padding: 20px 22px;
}
.guide-col h3 { font-family: var(--font-display); font-weight: 650; font-size: 17px; margin: 0 0 8px; }
.guide-col p { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 0; }

.layout { display: grid; grid-template-columns: minmax(300px, 460px) minmax(300px, 1fr); gap: 28px; max-width: 1100px; align-items: start; }
@media (max-width: 760px) { .layout { grid-template-columns: 1fr; } }

.wheel-wrap { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 14px; }
.wheel { width: 100%; display: block; }
.seg { cursor: pointer; }
.seg:hover path { filter: brightness(1.15); }
.maj-txt { font-family: var(--font-display); font-size: 21px; font-weight: 650; }
.min-txt { font-size: 13px; font-weight: 600; font-family: var(--font-body); }
.sig-txt { font-family: var(--font-mono); font-size: 10px; fill: #7A6F60; }
.center-key { font-family: var(--font-display); font-size: 40px; font-weight: 650; fill: #EFE6D9; }
.center-sub { font-size: 13px; fill: #A89B8A; font-family: var(--font-body); }
.center-sig { font-family: var(--font-mono); font-size: 12px; fill: #E8A33D; }

.panel { display: flex; flex-direction: column; gap: 22px; }
.panel-block { display: flex; flex-direction: column; gap: 8px; }
.ctrl-label {
  font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--muted);
}
.sig-line { color: var(--ink); font-size: 15px; margin: 0; }

.chord-row { display: flex; flex-wrap: wrap; gap: 8px; }
.dchip {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px;
  padding: 8px 12px; min-width: 52px;
}
.dchip.primary { background: var(--amber); border-color: var(--amber); }
.dchip.primary .dname { color: #1A130E; }
.dchip.primary .dnum { color: #5C4318; }
.dnum { font-family: var(--font-mono); font-size: 10.5px; color: var(--muted); }
.dname { font-size: 15px; font-weight: 700; color: var(--ink); }
.hint-line { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; }

.prog-list { display: flex; flex-direction: column; gap: 10px; }
.prog { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; }
.prog-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
.prog-name { font-family: var(--font-display); font-size: 15px; font-weight: 650; }
.prog-nums { font-family: var(--font-mono); font-size: 12px; color: var(--amber); }
.prog-chords { display: flex; flex-wrap: wrap; gap: 6px; }
.pchip {
  background: var(--panel2); border: 1px solid var(--line); border-radius: 8px;
  padding: 4px 10px; font-size: 14px; font-weight: 600;
}

@media (prefers-reduced-motion: reduce) { .seg:hover path { filter: none; } }
`;
