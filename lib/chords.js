/* ------------------------------------------------------------------ */
/* Shared chord data + math: THE single source of truth for chord       */
/* voicings, used by BOTH the interactive Chord Library (client) and the */
/* server-rendered /chords/[chord] pages. Keeping the fret grids here    */
/* means the crawlable chord pages and the tool never drift apart.       */
/* ------------------------------------------------------------------ */

import { SHARP, FLAT, FLAT_ROOTS, ROOTS, OPEN, INTERVAL, SHAPE_ORDER } from "@/lib/theory";

export { ROOTS, SHAPE_ORDER };

/* Canonical spelling of a root pitch class (flats where they read better). */
export const rootName = (pc) => (FLAT_ROOTS.has(pc) ? FLAT : SHARP)[((pc % 12) + 12) % 12];

/* URL slug fragment per root pitch class. Readable and keyword-friendly:
   accidentals spell out "-sharp" / "-flat" so the path matches how people
   search ("f sharp minor chord", "b flat major chord"). */
export const ROOT_SLUG = {
  0: "c",
  1: "d-flat",
  2: "d",
  3: "e-flat",
  4: "e",
  5: "f",
  6: "f-sharp",
  7: "g",
  8: "a-flat",
  9: "a",
  10: "b-flat",
  11: "b",
};

/* Base-fret formula per CAGED form: n such that the form's root lands on the
   chosen root pitch class. Same anchors as the Fretboard Explorer. */
export const BASE_FOR = {
  C: (r) => (((r - 0) % 12) + 12) % 12,
  A: (r) => (((r - 9) % 12) + 12) % 12,
  G: (r) => (((r - 7) % 12) + 12) % 12,
  E: (r) => (((r - 4) % 12) + 12) % 12,
  D: (r) => (((r - 2) % 12) + 12) % 12,
};

/* Voicing grids: relative frets per string, low E -> high e. -1 = muted.
   When moved up by n frets, every 0 becomes the barre/base fret.

   Each quality also carries the data the chord pages need:
     name     display name ("Major", "Minor 7th")
     symbol   chord-symbol suffix ("", "m", "7", "maj7")
     slug     URL fragment for the quality ("major", "minor-7", "7")
     spoken   how it reads in prose ("major", "dominant seventh")
     intervals  chord-tone semitones from the root
     labels     interval labels aligned to `intervals`
     aka        alternate names people search for (may be empty) */
export const QUALITIES = {
  maj: {
    id: "maj",
    name: "Major",
    symbol: "",
    slug: "major",
    spoken: "major",
    intervals: [0, 4, 7],
    labels: ["R", "3", "5"],
    aka: ["maj"],
    forms: {
      C: { grid: [-1, 3, 2, 0, 1, 0], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 2, 0], roots: [1, 3] },
      G: { grid: [3, 2, 0, 0, 0, 3], roots: [0, 3, 5] },
      E: { grid: [0, 2, 2, 1, 0, 0], roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 2], roots: [2, 4] },
    },
  },
  min: {
    id: "min",
    name: "Minor",
    symbol: "m",
    slug: "minor",
    spoken: "minor",
    intervals: [0, 3, 7],
    labels: ["R", "b3", "5"],
    aka: ["min", "-"],
    forms: {
      C: { grid: [-1, 3, 1, 0, 1, -1], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 1, 0], roots: [1, 3] },
      G: { grid: [3, 1, 0, 0, -1, -1], roots: [0, 3] },
      E: { grid: [0, 2, 2, 0, 0, 0], roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 1], roots: [2, 4] },
    },
  },
  dom7: {
    id: "dom7",
    name: "Dominant 7th",
    symbol: "7",
    slug: "7",
    spoken: "dominant seventh",
    intervals: [0, 4, 7, 10],
    labels: ["R", "3", "5", "b7"],
    aka: ["dom7", "seventh"],
    forms: {
      C: { grid: [-1, 3, 2, 3, 1, 0], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 0, 2, 0], roots: [1] },
      G: { grid: [3, 2, 0, 0, 0, 1], roots: [0, 3] },
      E: { grid: [0, 2, 0, 1, 0, 0], roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 1, 2], roots: [2] },
    },
  },
  maj7: {
    id: "maj7",
    name: "Major 7th",
    symbol: "maj7",
    slug: "major-7",
    spoken: "major seventh",
    intervals: [0, 4, 7, 11],
    labels: ["R", "3", "5", "7"],
    aka: ["M7", "major seven"],
    forms: {
      C: { grid: [-1, 3, 2, 0, 0, 0], roots: [1] },
      A: { grid: [-1, 0, 2, 1, 2, 0], roots: [1] },
      G: { grid: [3, 2, 0, 0, 0, 2], roots: [0, 3] },
      E: { grid: [0, 2, 1, 1, 0, 0], roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 2, 2], roots: [2] },
    },
  },
  min7: {
    id: "min7",
    name: "Minor 7th",
    symbol: "m7",
    slug: "minor-7",
    spoken: "minor seventh",
    intervals: [0, 3, 7, 10],
    labels: ["R", "b3", "5", "b7"],
    aka: ["min7", "-7"],
    forms: {
      C: { grid: [-1, 3, 1, 3, 1, -1], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 0, 1, 0], roots: [1] },
      G: { grid: [3, 1, 3, 0, -1, -1], roots: [0, 3] },
      E: { grid: [0, 2, 0, 0, 0, 0], roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 1, 1], roots: [2] },
    },
  },
  six: {
    id: "six",
    name: "6th",
    symbol: "6",
    slug: "6",
    spoken: "sixth",
    intervals: [0, 4, 7, 9],
    labels: ["R", "3", "5", "6"],
    aka: ["major sixth", "add6"],
    forms: {
      C: { grid: [-1, 3, 2, 2, 1, 0], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 2, 2], roots: [1, 3] },
      G: { grid: [3, 2, 0, 0, 0, 0], roots: [0, 3] },
      E: { grid: [0, 2, 2, 1, 2, 0], roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 0, 2], roots: [2] },
    },
  },
  sus2: {
    id: "sus2",
    name: "Sus2",
    symbol: "sus2",
    slug: "sus2",
    spoken: "suspended second",
    intervals: [0, 2, 7],
    labels: ["R", "2", "5"],
    aka: ["suspended 2"],
    forms: {
      C: { grid: [-1, 3, 0, 0, 1, 3], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 0, 0], roots: [1, 3] },
      G: { grid: [3, -1, 0, 2, 3, 3], roots: [0, 5] },
      E: { grid: [0, 2, 4, 4, 0, 0], roots: [0, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 0], roots: [2, 4] },
    },
  },
  sus4: {
    id: "sus4",
    name: "Sus4",
    symbol: "sus4",
    slug: "sus4",
    spoken: "suspended fourth",
    intervals: [0, 5, 7],
    labels: ["R", "4", "5"],
    aka: ["suspended 4", "sus"],
    forms: {
      C: { grid: [-1, 3, 3, 0, 1, 1], roots: [1, 4] },
      A: { grid: [-1, 0, 2, 2, 3, 0], roots: [1, 3] },
      G: { grid: [3, 3, 0, 0, 1, 3], roots: [0, 3, 5] },
      E: { grid: [0, 2, 2, 2, 0, 0], roots: [0, 2, 5] },
      D: { grid: [-1, -1, 0, 2, 3, 3], roots: [2, 4] },
    },
  },
  add9: {
    id: "add9",
    name: "Add9",
    symbol: "add9",
    slug: "add9",
    spoken: "added ninth",
    intervals: [0, 4, 7, 2],
    labels: ["R", "3", "5", "9"],
    aka: ["add 9", "added 9th"],
    forms: {
      C: { grid: [-1, 3, 2, 0, 3, 0], roots: [1] },
      A: { grid: [-1, 0, 2, 4, 2, 0], roots: [1] },
      G: { grid: [3, 2, 0, 2, 0, 3], roots: [0, 5] },
      E: { grid: [0, 2, 2, 1, 0, 2], roots: [0, 2] },
      D: { grid: [-1, -1, 0, 4, 3, 0], roots: [2, 4] },
    },
  },
};

/* Display order for quality controls and cross-links. */
export const QUALITY_ORDER = [
  "maj",
  "min",
  "dom7",
  "maj7",
  "min7",
  "six",
  "sus2",
  "sus4",
  "add9",
];

/* Chord symbol as normally written, e.g. "G", "Am", "Cmaj7", "F#sus4". */
export const chordSymbol = (rootPc, qualityId) =>
  rootName(rootPc) + QUALITIES[qualityId].symbol;

/* Full display name, e.g. "G Major", "A Minor 7th", "F# Sus4". */
export const chordDisplayName = (rootPc, qualityId) =>
  `${rootName(rootPc)} ${QUALITIES[qualityId].name}`;

/* URL slug, e.g. "g-major", "a-minor-7", "f-sharp-sus4". */
export const chordSlug = (rootPc, qualityId) =>
  `${ROOT_SLUG[rootPc]}-${QUALITIES[qualityId].slug}`;

/* The names array for spelling this root's notes (flats vs sharps). */
export const namesFor = (rootPc) => (FLAT_ROOTS.has(rootPc) ? FLAT : SHARP);

/* The abstract chord tones (one per formula degree), spelled for this root.
   Returns [{ name, label }] in formula order, e.g. C major -> C/R, E/3, G/5. */
export function chordTones(rootPc, qualityId) {
  const q = QUALITIES[qualityId];
  const names = namesFor(rootPc);
  return q.intervals.map((semi, i) => ({
    name: names[(rootPc + semi) % 12],
    label: q.labels[i],
  }));
}

/* Build the five CAGED voicings for a chord, sorted low to high on the neck.
   Pure: the same computation the Chord Library ran in a useMemo. */
export function buildVoicings(rootPc, qualityId) {
  const q = QUALITIES[qualityId];
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
}

/* Per-string sounded note + interval for one voicing, for prose/tables.
   Returns an array (low E -> high e); muted strings are null. */
export function voicingNotes(voicing, rootPc) {
  const names = namesFor(rootPc);
  return voicing.grid.map((rel, s) => {
    if (rel < 0) return null;
    const pc = (OPEN[s] + voicing.base + rel) % 12;
    const iv = (((pc - rootPc) % 12) + 12) % 12;
    return { name: names[pc], interval: INTERVAL[iv] };
  });
}

/* Every chord this site renders a page for: 12 roots x 9 qualities = 108. */
export const ALL_CHORDS = ROOTS.flatMap((rootPc) =>
  QUALITY_ORDER.map((qualityId) => ({
    rootPc,
    qualityId,
    slug: chordSlug(rootPc, qualityId),
    symbol: chordSymbol(rootPc, qualityId),
    name: chordDisplayName(rootPc, qualityId),
  }))
);

/* slug -> { rootPc, qualityId } (built once, avoids parsing ambiguity). */
const SLUG_INDEX = new Map(ALL_CHORDS.map((c) => [c.slug, c]));

export const chordFromSlug = (slug) => SLUG_INDEX.get(slug) || null;
