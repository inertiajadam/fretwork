/* Pure, server-usable fretboard diagram for a scale. Draws frets 0-12 across
   six strings (high e on top), dotting every note in the scale and accenting
   the root. Inline, theme-aware styling (var(--ink)/--bg/--amber) so it renders
   in static HTML and reads correctly in light or dark. */

import { FRET_STRINGS } from "@/lib/scales";

const FRETS = 12;
const padL = 34; // room for open-note column + string label
const padT = 16;
const padB = 26;
const padR = 14;
const fw = 42; // fret spacing
const sh = 26; // string spacing
const nutX = padL + 24;

const W = nutX + FRETS * fw + padR;
const H = padT + 5 * sh + padB;

const INLAYS = [3, 5, 7, 9, 12];
const STRING_NAMES = ["e", "B", "G", "D", "A", "E"]; // high to low

const noteX = (f) => (f === 0 ? padL - 6 : nutX + (f - 0.5) * fw);
const stringY = (r) => padT + r * sh;

export default function ScaleFretboard({ pcSet, rootPc, nameByPc }) {
  const set = new Set(pcSet);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", maxWidth: W, display: "block" }}
      role="img"
      aria-label="Scale shown across the fretboard, frets 0 to 12"
    >
      {/* board */}
      <rect
        x={nutX}
        y={padT - 4}
        width={FRETS * fw}
        height={5 * sh + 8}
        fill="var(--panel)"
        rx={4}
      />

      {/* inlay markers */}
      {INLAYS.map((f) => {
        const x = nutX + (f - 0.5) * fw;
        const y = padT + 2.5 * sh;
        if (f === 12)
          return (
            <g key={f}>
              <circle cx={x} cy={y - sh} r={3} fill="var(--line)" />
              <circle cx={x} cy={y + sh} r={3} fill="var(--line)" />
            </g>
          );
        return <circle key={f} cx={x} cy={y} r={3} fill="var(--line)" />;
      })}

      {/* nut */}
      <rect x={nutX - 3} y={padT - 4} width={4} height={5 * sh + 8} fill="var(--muted)" rx={1} />

      {/* fret wires */}
      {Array.from({ length: FRETS }, (_, i) => {
        const x = nutX + (i + 1) * fw;
        return (
          <line key={i} x1={x} x2={x} y1={padT - 4} y2={padT + 5 * sh + 4} stroke="var(--line)" strokeWidth="1.4" />
        );
      })}

      {/* strings + labels */}
      {FRET_STRINGS.map((open, r) => {
        const y = stringY(r);
        return (
          <g key={r}>
            <line
              x1={nutX}
              x2={nutX + FRETS * fw}
              y1={y}
              y2={y}
              stroke="var(--muted)"
              strokeWidth={0.6 + r * 0.22}
              opacity={0.5}
            />
            <text
              x={10}
              y={y + 4}
              textAnchor="middle"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--muted)" }}
            >
              {STRING_NAMES[r]}
            </text>
          </g>
        );
      })}

      {/* note dots */}
      {FRET_STRINGS.map((open, r) =>
        Array.from({ length: FRETS + 1 }, (_, f) => {
          const pc = (open + f) % 12;
          if (!set.has(pc)) return null;
          const isRoot = pc === rootPc;
          const x = noteX(f);
          const y = stringY(r);
          return (
            <g key={`${r}-${f}`}>
              <circle
                cx={x}
                cy={y}
                r={10.5}
                fill={isRoot ? "var(--amber)" : "var(--ink)"}
                stroke={isRoot ? "var(--amber)" : "var(--ink)"}
              />
              <text
                x={x}
                y={y + 3.5}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  fill: isRoot ? "#1A130E" : "var(--bg)",
                }}
              >
                {nameByPc[pc]}
              </text>
            </g>
          );
        })
      )}

      {/* fret numbers */}
      {INLAYS.map((f) => (
        <text
          key={f}
          x={nutX + (f - 0.5) * fw}
          y={H - 8}
          textAnchor="middle"
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--muted)" }}
        >
          {f}
        </text>
      ))}
    </svg>
  );
}
