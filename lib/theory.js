/* ------------------------------------------------------------------ */
/* Shared music theory: THE single source of truth for note spelling,   */
/* scales, intervals, and CAGED constants. Prototypes each carried a     */
/* private copy of most of this; tools now import from here.             */
/* ------------------------------------------------------------------ */

/* Chromatic spellings ---------------------------------------------------*/
export const SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export const FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

/* Root pitch classes that read better as flats (Db Eb F Ab Bb). */
export const FLAT_ROOTS = new Set([1, 3, 5, 8, 10]);
/* Keys (by pitch class) whose signatures use flats: F Bb Eb Ab Db. */
export const FLAT_KEYS = new Set([5, 10, 3, 8, 1]);

export const ROOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/* Spell a root pitch class, choosing sharps or flats sensibly. */
export const rootName = (pc) => (FLAT_ROOTS.has(pc) ? FLAT : SHARP)[((pc % 12) + 12) % 12];

/* Circle-of-fifths ordering of the twelve keys, as names... */
export const FIFTHS = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
/* ...and as pitch classes (used by the fretboard key picker). */
export const KEYS_PC = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];

/* Spelled major scales for all twelve keys. */
export const SCALES = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  G: ["G", "A", "B", "C", "D", "E", "F#"],
  D: ["D", "E", "F#", "G", "A", "B", "C#"],
  A: ["A", "B", "C#", "D", "E", "F#", "G#"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  F: ["F", "G", "A", "Bb", "C", "D", "E"],
};

/* Interval labels from the root (semitones 0..11). */
export const INTERVAL = ["R", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];

/* Diatonic triad qualities of a major key, degrees 1..7. */
export const MAJOR_SUFFIX = ["", "m", "m", "", "", "m", "dim"];
/* Nashville / roman numbering helpers. */
export const NASHVILLE = ["1", "2", "3", "4", "5", "6", "7"];

/* Standard-tuning open strings, low E -> high e, as pitch classes. */
export const OPEN = [4, 9, 2, 7, 11, 4];
/* Same, as MIDI note numbers (E2..E4). */
export const OPEN_MIDI = [40, 45, 50, 55, 59, 64];
export const STRING_LABELS = ["E", "A", "D", "G", "B", "e"];

/* CAGED shape colors and canonical order. */
export const SHAPE_COLORS = {
  C: "#E36B5C",
  A: "#E8A33D",
  G: "#86B36B",
  E: "#5FA3B5",
  D: "#A985D1",
};
export const SHAPE_ORDER = ["C", "A", "G", "E", "D"];

/* Base pitch class of the seven natural letters. */
export const BASE_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/* Pitch class of a spelled note name like "F#" or "Bb". */
export const pcOf = (n) => {
  let pc = BASE_PC[n[0]];
  for (const ch of n.slice(1)) pc += ch === "#" ? 1 : ch === "b" ? -1 : 0;
  return ((pc % 12) + 12) % 12;
};

/* Name a MIDI note in scientific pitch notation, e.g. 64 -> "E4". */
export const midiName = (midi) =>
  SHARP[((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);

/* Diatonic triads of a major key as chord symbols (degrees 1..6 or 1..7). */
export const diatonicChords = (key, count = 6) =>
  SCALES[key].slice(0, count).map((n, i) => n + MAJOR_SUFFIX[i]);
