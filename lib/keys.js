/* ------------------------------------------------------------------ */
/* Shared key data: diatonic chords, key signatures, and progressions   */
/* for the /keys pages. Diatonic chords link into the /chords pages.     */
/* Pure (no React).                                                      */
/* ------------------------------------------------------------------ */

import { ROOTS } from "@/lib/theory";
import { rootNameFor, rootSlug, buildScale, SCALE_TYPES } from "@/lib/scales";
import { chordSlug } from "@/lib/chords";

/* The two key flavors this site builds pages for. Suffix/roman arrays are the
   diatonic triads of the natural major and natural minor scales. */
const KEY_MODES = {
  major: {
    id: "major",
    name: "major",
    scaleType: "major",
    suffixes: ["", "m", "m", "", "", "m", "dim"],
    romans: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
  },
  minor: {
    id: "minor",
    name: "minor",
    scaleType: "minor",
    suffixes: ["m", "dim", "", "m", "m", "", ""],
    romans: ["i", "ii°", "III", "iv", "v", "VI", "VII"],
  },
};

export const KEY_MODE_ORDER = ["major", "minor"];

/* Key signatures, keyed by the tonic spelling the pages actually use. */
const MAJOR_SIG = {
  C: "no sharps or flats",
  G: "1 sharp (F#)",
  D: "2 sharps (F#, C#)",
  A: "3 sharps (F#, C#, G#)",
  E: "4 sharps (F#, C#, G#, D#)",
  B: "5 sharps (F#, C#, G#, D#, A#)",
  "F#": "6 sharps (F#, C#, G#, D#, A#, E#)",
  Db: "5 flats (Bb, Eb, Ab, Db, Gb)",
  Ab: "4 flats (Bb, Eb, Ab, Db)",
  Eb: "3 flats (Bb, Eb, Ab)",
  Bb: "2 flats (Bb, Eb)",
  F: "1 flat (Bb)",
};
const MINOR_SIG = {
  A: "no sharps or flats",
  E: "1 sharp (F#)",
  B: "2 sharps (F#, C#)",
  "F#": "3 sharps (F#, C#, G#)",
  "C#": "4 sharps (F#, C#, G#, D#)",
  "G#": "5 sharps (F#, C#, G#, D#, A#)",
  Eb: "6 flats (Bb, Eb, Ab, Db, Gb, Cb)",
  Bb: "5 flats (Bb, Eb, Ab, Db, Gb)",
  F: "4 flats (Bb, Eb, Ab, Db)",
  C: "3 flats (Bb, Eb, Ab)",
  G: "2 flats (Bb, Eb)",
  D: "1 flat (Bb)",
};

const MAJOR_PROGS = [
  { label: "I – IV – V", degrees: [0, 3, 4] },
  { label: "I – V – vi – IV", degrees: [0, 4, 5, 3] },
  { label: "ii – V – I", degrees: [1, 4, 0] },
  { label: "I – vi – IV – V", degrees: [0, 5, 3, 4] },
];
const MINOR_PROGS = [
  { label: "i – iv – v", degrees: [0, 3, 4] },
  { label: "i – VI – VII", degrees: [0, 5, 6] },
  { label: "i – VII – VI – VII", degrees: [0, 6, 5, 6] },
  { label: "ii° – v – i", degrees: [1, 4, 0] },
];

export const keySlug = (rootPc, mode) =>
  `${rootSlug(rootNameFor(rootPc, KEY_MODES[mode].scaleType))}-${mode}`;

export const keyName = (rootPc, mode) =>
  `${rootNameFor(rootPc, KEY_MODES[mode].scaleType)} ${KEY_MODES[mode].name}`;

/* Full data for one key page. */
export function buildKey(rootPc, mode) {
  const m = KEY_MODES[mode];
  const scale = buildScale(rootPc, m.scaleType);
  const rootName = scale.rootName;

  const degrees = scale.notes.map((n, i) => {
    const suffix = m.suffixes[i];
    const quality = suffix === "" ? "maj" : suffix === "m" ? "min" : "dim";
    return {
      roman: m.romans[i],
      symbol: n.name + suffix,
      pc: n.pc,
      quality,
      // diminished triads have no dedicated chord page; leave them unlinked
      slug: quality === "dim" ? null : chordSlug(n.pc, quality),
    };
  });

  const relPc = mode === "major" ? (rootPc + 9) % 12 : (rootPc + 3) % 12;
  const relMode = mode === "major" ? "minor" : "major";

  return {
    mode,
    rootPc,
    rootName,
    name: `${rootName} ${m.name}`,
    signature: (mode === "major" ? MAJOR_SIG : MINOR_SIG)[rootName],
    scaleSlug: scale.slug,
    degrees,
    progressions: (mode === "major" ? MAJOR_PROGS : MINOR_PROGS).map((p) => ({
      label: p.label,
      chords: p.degrees.map((d) => degrees[d]),
    })),
    relative: {
      slug: keySlug(relPc, relMode),
      label: keyName(relPc, relMode),
    },
  };
}

/* For the scale pages: does this scale type correspond to a key page? */
export function keyExistsFor(rootPc, scaleTypeId) {
  const mode =
    scaleTypeId === "major" ? "major" : scaleTypeId === "minor" ? "minor" : null;
  if (!mode) return null;
  return { slug: keySlug(rootPc, mode), label: keyName(rootPc, mode) };
}

/* All key pages: 12 roots x 2 modes = 24. */
export const ALL_KEYS = ROOTS.flatMap((rootPc) =>
  KEY_MODE_ORDER.map((mode) => ({
    rootPc,
    mode,
    slug: keySlug(rootPc, mode),
    name: keyName(rootPc, mode),
  }))
);

const SLUG_INDEX = new Map(ALL_KEYS.map((k) => [k.slug, k]));
export const keyFromSlug = (slug) => SLUG_INDEX.get(slug) || null;

export { SCALE_TYPES };
