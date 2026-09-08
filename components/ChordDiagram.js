/* Pure chord-diagram SVG. No hooks, no client APIs, so it renders in server
   components (the crawlable /chords pages) and inside the client Chord Library
   alike. Styles are inline and theme-aware (var(--ink)/var(--muted)), so the
   diagram needs no external stylesheet and reads correctly in light or dark. */

import { OPEN, INTERVAL, SHAPE_COLORS } from "@/lib/theory";
import { namesFor } from "@/lib/chords";

const CW = 176,
  CH = 236;
const GX = 34,
  GY = 58; // grid origin
const SX = 22,
  SY = 30; // string / fret spacing
const NROWS = 5;

const mono = { fontFamily: "var(--font-mono)" };

export default function ChordDiagram({ shape, grid, roots, base, rootPc }) {
  const color = SHAPE_COLORS[shape];
  const names = namesFor(rootPc);
  const isOpen = base === 0;
  const showFrom = isOpen ? 1 : base;

  const dotXY = (s, absFret) => [GX + s * SX, GY + (absFret - showFrom) * SY + SY / 2];

  const barreStrings = grid
    .map((rel, s) => ({ rel, s }))
    .filter((c) => c.rel === 0)
    .map((c) => c.s);
  const hasBarre = !isOpen && barreStrings.length >= 2;

  const sounded = grid.map((rel, s) => (rel < 0 ? null : (OPEN[s] + base + rel) % 12));

  return (
    <svg
      viewBox={`0 0 ${CW} ${CH}`}
      style={{ width: "100%", maxWidth: 200, display: "block" }}
      role="img"
      aria-label={`${shape} form`}
    >
      {/* shape badge */}
      <rect x={GX - 22} y={10} width={30} height={22} rx={7} fill={color} />
      <text
        x={GX - 7}
        y={26}
        textAnchor="middle"
        style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 650, fill: "#1A130E" }}
      >
        {shape}
      </text>
      <text x={GX + 18} y={26} style={{ ...mono, fontSize: 11, fill: "var(--muted)" }}>
        form
      </text>

      {/* fret position label */}
      <text
        x={CW - 14}
        y={GY + SY / 2 + 4}
        textAnchor="end"
        style={{ ...mono, fontSize: 13, fill: "var(--ink)" }}
      >
        {isOpen ? "" : `${base}fr`}
      </text>

      {/* open / muted markers above nut */}
      {grid.map((rel, s) => {
        const x = GX + s * SX;
        if (rel < 0)
          return (
            <text
              key={s}
              x={x}
              y={GY - 8}
              textAnchor="middle"
              style={{ fontSize: 13, fill: "var(--muted)", fontWeight: 600 }}
            >
              &#215;
            </text>
          );
        if (isOpen && rel === 0)
          return (
            <circle
              key={s}
              cx={x}
              cy={GY - 12}
              r={4.5}
              fill="none"
              stroke="#A89B8A"
              strokeWidth="1.6"
            />
          );
        return null;
      })}

      {/* nut or top line */}
      <rect
        x={GX - 2}
        y={GY - (isOpen ? 4 : 1)}
        width={SX * 5 + 4}
        height={isOpen ? 5 : 2}
        fill={isOpen ? "#D8CDBB" : "#9A927F"}
        rx={1}
      />
      {/* fret lines */}
      {Array.from({ length: NROWS }, (_, i) => (
        <line
          key={i}
          x1={GX}
          x2={GX + SX * 5}
          y1={GY + (i + 1) * SY}
          y2={GY + (i + 1) * SY}
          stroke="#9A927F"
          strokeWidth="1.4"
        />
      ))}
      {/* strings */}
      {Array.from({ length: 6 }, (_, s) => (
        <line
          key={s}
          x1={GX + s * SX}
          x2={GX + s * SX}
          y1={GY}
          y2={GY + NROWS * SY}
          stroke="#C7BCA6"
          strokeWidth={0.8 + (5 - s) * 0.3}
        />
      ))}

      {/* barre */}
      {hasBarre &&
        (() => {
          const lo = Math.min(...barreStrings),
            hi = Math.max(...barreStrings);
          const [x1, y] = dotXY(lo, base);
          const [x2] = dotXY(hi, base);
          return (
            <rect x={x1 - 8} y={y - 8} width={x2 - x1 + 16} height={16} rx={8} fill={color} opacity={0.95} />
          );
        })()}

      {/* dots */}
      {grid.map((rel, s) => {
        if (rel < 0) return null;
        if (isOpen && rel === 0) return null;
        const abs = base + rel;
        const [x, y] = dotXY(s, abs);
        const isRoot = roots.includes(s);
        return (
          <g key={s}>
            <circle cx={x} cy={y} r={8.5} fill={color} />
            {isRoot && <circle cx={x} cy={y} r={10.8} fill="none" stroke="#F5EBDC" strokeWidth="1.8" />}
          </g>
        );
      })}
      {/* open-string root rings */}
      {isOpen &&
        grid.map((rel, s) => {
          if (rel !== 0 || !roots.includes(s)) return null;
          const x = GX + s * SX;
          return (
            <circle key={s} cx={x} cy={GY - 12} r={6.5} fill="none" stroke="#F5EBDC" strokeWidth="1.6" />
          );
        })}

      {/* sounded notes + intervals */}
      {sounded.map((pc, s) => {
        if (pc === null) return null;
        const x = GX + s * SX;
        const iv = (((pc - rootPc) % 12) + 12) % 12;
        return (
          <g key={s}>
            <text
              x={x}
              y={GY + NROWS * SY + 20}
              textAnchor="middle"
              style={{ fontSize: 12, fontWeight: 700, fill: "var(--ink)", fontFamily: "var(--font-body)" }}
            >
              {names[pc]}
            </text>
            <text
              x={x}
              y={GY + NROWS * SY + 36}
              textAnchor="middle"
              style={{ ...mono, fontSize: 10.5, fill: "var(--muted)" }}
            >
              {INTERVAL[iv]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
