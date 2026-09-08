/* ------------------------------------------------------------------ */
/* Shared scale data + note spelling: source of truth for the /scales    */
/* pages and the scale fretboard diagram. Pure (no React).               */
/* ------------------------------------------------------------------ */

import { BASE_PC, pcOf, ROOTS, OPEN, INTERVAL } from "@/lib/theory";

export { ROOTS };

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

/* Root spelling per pitch class, chosen so a scale of that family never needs
   a double accidental. Major-leaning scales use the "flat" side for the black
   keys (Db, Ab); minor-leaning scales use the "sharp" side (C#, G#). The other
   black keys (Eb, F#, Bb) read the same either way. */
const MAJOR_FAMILY_ROOT = {
  0: "C", 1: "Db", 2: "D", 3: "Eb", 4: "E", 5: "F",
  6: "F#", 7: "G", 8: "Ab", 9: "A", 10: "Bb", 11: "B",
};
const MINOR_FAMILY_ROOT = {
  0: "C", 1: "C#", 2: "D", 3: "Eb", 4: "E", 5: "F",
  6: "F#", 7: "G", 8: "G#", 9: "A", 10: "Bb", 11: "B",
};

export const rootNameFor = (pc, family) =>
  (family === "major" ? MAJOR_FAMILY_ROOT : MINOR_FAMILY_ROOT)[((pc % 12) + 12) % 12];

/* Turn a spelled note name into a URL slug fragment: "C#" -> "c-sharp",
   "Eb" -> "e-flat", "C" -> "c". */
export function rootSlug(name) {
  const acc = name.slice(1);
  const suffix = acc === "#" ? "-sharp" : acc === "b" ? "-flat" : "";
  return name[0].toLowerCase() + suffix;
}

function accidental(diff) {
  if (diff === 0) return "";
  if (diff === 1) return "#";
  if (diff === 2) return "##";
  if (diff === 11) return "b";
  if (diff === 10) return "bb";
  return "";
}

/* Strict letter-per-degree spelling for a diatonic (7-note) scale: each
   successive degree takes the next letter, with the accidental that lands it
   on the right pitch. This is what makes F# major read F# G# A# B C# D# E#
   rather than mixing in an F natural. */
function spellDiatonic(rootName, intervals) {
  const li = LETTERS.indexOf(rootName[0]);
  const rootPc = pcOf(rootName);
  return intervals.map((semi, i) => {
    const letter = LETTERS[(li + i) % 7];
    const target = (rootPc + semi) % 12;
    const diff = (((target - BASE_PC[letter]) % 12) + 12) % 12;
    return letter + accidental(diff);
  });
}

const IONIAN = [0, 2, 4, 5, 7, 9, 11];
const AEOLIAN = [0, 2, 3, 5, 7, 8, 10];

/* Pitch-class offsets for the non-diatonic scales (used to place fretboard
   dots). Names for these are derived from the parent major/minor spelling. */
const SEMIS = {
  "major-pentatonic": [0, 2, 4, 7, 9],
  "minor-pentatonic": [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
};

export const SCALE_TYPES = {
  major: {
    id: "major",
    name: "Major",
    family: "major",
    kind: "diatonic",
    intervals: IONIAN,
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    aka: "the Ionian mode",
    blurb:
      "the do-re-mi scale: bright and resolved, and the foundation almost all Western melody and harmony is measured against",
  },
  minor: {
    id: "minor",
    name: "Natural Minor",
    family: "minor",
    kind: "diatonic",
    intervals: AEOLIAN,
    labels: ["1", "2", "b3", "4", "5", "b6", "b7"],
    aka: "the Aeolian mode",
    blurb:
      "the serious, darker counterpart to major, and the home base of most rock, metal, and film music",
  },
  "major-pentatonic": {
    id: "major-pentatonic",
    name: "Major Pentatonic",
    family: "major",
    kind: "pentatonic-major",
    labels: ["1", "2", "3", "5", "6"],
    blurb:
      "five notes that sit happily over anything major: the everyday scale for country, rock, and pop melodies",
  },
  "minor-pentatonic": {
    id: "minor-pentatonic",
    name: "Minor Pentatonic",
    family: "minor",
    kind: "pentatonic-minor",
    labels: ["1", "b3", "4", "5", "b7"],
    blurb:
      "the most-used scale in blues and rock lead guitar: five notes that are very hard to play wrong",
  },
  blues: {
    id: "blues",
    name: "Blues",
    family: "minor",
    kind: "blues",
    labels: ["1", "b3", "4", "b5", "5", "b7"],
    blurb:
      "the minor pentatonic plus one flat-five blue note, the extra note that gives it that crying, vocal sound",
  },
  dorian: {
    id: "dorian",
    name: "Dorian",
    family: "minor",
    kind: "diatonic",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    labels: ["1", "2", "b3", "4", "5", "6", "b7"],
    aka: "the Dorian mode",
    blurb:
      "a minor scale with a raised sixth: less dark than natural minor, and a staple of funk, jazz, and modal rock",
  },
  phrygian: {
    id: "phrygian",
    name: "Phrygian",
    family: "minor",
    kind: "diatonic",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    labels: ["1", "b2", "b3", "4", "5", "b6", "b7"],
    aka: "the Phrygian mode",
    blurb:
      "a minor scale with a flat second: dark and Spanish-sounding, a favorite in flamenco and metal",
  },
  lydian: {
    id: "lydian",
    name: "Lydian",
    family: "major",
    kind: "diatonic",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    labels: ["1", "2", "3", "#4", "5", "6", "7"],
    aka: "the Lydian mode",
    blurb:
      "a major scale with a raised fourth: bright and floating, the dreamy sound of a lot of film music",
  },
  mixolydian: {
    id: "mixolydian",
    name: "Mixolydian",
    family: "major",
    kind: "diatonic",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    labels: ["1", "2", "3", "4", "5", "6", "b7"],
    aka: "the Mixolydian mode",
    blurb:
      "a major scale with a flat seventh: bluesy but still bright, the sound of dominant chords and classic rock riffs",
  },
  "harmonic-minor": {
    id: "harmonic-minor",
    name: "Harmonic Minor",
    family: "minor",
    kind: "diatonic",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    labels: ["1", "2", "b3", "4", "5", "b6", "7"],
    blurb:
      "natural minor with a raised seventh: exotic and tense, running from classical to neoclassical shred",
  },
};

export const SCALE_TYPE_ORDER = [
  "major",
  "minor",
  "major-pentatonic",
  "minor-pentatonic",
  "blues",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "harmonic-minor",
];

/* Raise a note a semitone, staying on the same letter where possible; used for
   the blues scale's flat-five blue note (spelled as a raised fourth so it never
   needs a double accidental). */
function raiseByLetter(letter, targetPc) {
  const diff = (((targetPc - BASE_PC[letter]) % 12) + 12) % 12;
  return letter + accidental(diff);
}

/* Every note of a scale, spelled, with its degree label and pitch class. */
function spellScale(rootName, typeId) {
  const t = SCALE_TYPES[typeId];
  const rootPc = pcOf(rootName);
  const li = LETTERS.indexOf(rootName[0]);

  if (t.kind === "diatonic") {
    const names = spellDiatonic(rootName, t.intervals);
    return names.map((name, i) => ({
      name,
      label: t.labels[i],
      pc: (rootPc + t.intervals[i]) % 12,
    }));
  }

  const major = spellDiatonic(rootName, IONIAN);
  const minor = spellDiatonic(rootName, AEOLIAN);

  if (t.kind === "pentatonic-major") {
    const pick = [0, 1, 2, 4, 5];
    return pick.map((idx, i) => ({
      name: major[idx],
      label: t.labels[i],
      pc: (rootPc + SEMIS["major-pentatonic"][i]) % 12,
    }));
  }
  if (t.kind === "pentatonic-minor") {
    const pick = [0, 2, 3, 4, 6];
    return pick.map((idx, i) => ({
      name: minor[idx],
      label: t.labels[i],
      pc: (rootPc + SEMIS["minor-pentatonic"][i]) % 12,
    }));
  }
  // blues: minor pentatonic (1 b3 4 5 b7) with a b5 inserted after the 4th
  const pent = [0, 2, 3, 4, 6].map((idx) => minor[idx]); // names of 1 b3 4 5 b7
  const b5Pc = (rootPc + 6) % 12;
  const fourthLetter = LETTERS[(li + 3) % 7]; // letter of the 4th degree
  const b5Name = raiseByLetter(fourthLetter, b5Pc);
  const names = [pent[0], pent[1], pent[2], b5Name, pent[3], pent[4]];
  return names.map((name, i) => ({
    name,
    label: t.labels[i],
    pc: (rootPc + SEMIS.blues[i]) % 12,
  }));
}

/* Full data for one scale page. */
export function buildScale(rootPc, typeId) {
  const t = SCALE_TYPES[typeId];
  const rootName = rootNameFor(rootPc, t.family);
  const notes = spellScale(rootName, typeId);
  return {
    typeId,
    type: t,
    rootPc,
    rootName,
    notes,
    pcSet: notes.map((n) => n.pc),
    slug: `${rootSlug(rootName)}-${typeId}`,
  };
}

export const scaleSlug = (rootPc, typeId) =>
  `${rootSlug(rootNameFor(rootPc, SCALE_TYPES[typeId].family))}-${typeId}`;

export const scaleName = (rootPc, typeId) =>
  `${rootNameFor(rootPc, SCALE_TYPES[typeId].family)} ${SCALE_TYPES[typeId].name}`;

/* All scale pages: 12 roots x 10 types = 120. */
export const ALL_SCALES = ROOTS.flatMap((rootPc) =>
  SCALE_TYPE_ORDER.map((typeId) => ({
    rootPc,
    typeId,
    slug: scaleSlug(rootPc, typeId),
    name: scaleName(rootPc, typeId),
  }))
);

const SLUG_INDEX = new Map(ALL_SCALES.map((s) => [s.slug, s]));
export const scaleFromSlug = (slug) => SLUG_INDEX.get(slug) || null;

/* Display strings and open pitch classes for the fretboard diagram, ordered
   high e (top) to low E (bottom). */
export const FRET_STRINGS = [...OPEN].reverse();
export { INTERVAL };
