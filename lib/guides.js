/* Guide (article) registry. Import each guide file and list it here in the
   order it should appear in the hub. Adding an article = create its file in
   content/guides/ and add it to GUIDES. */

// Fretboard and chords
import caged from "@/content/guides/the-caged-system-explained";
import memorizeFretboard from "@/content/guides/how-to-memorize-the-fretboard";
import barreChords from "@/content/guides/barre-chords-explained";
import powerChords from "@/content/guides/power-chords-explained";
import seventhChords from "@/content/guides/seventh-chords-explained";
import readChordDiagram from "@/content/guides/how-to-read-a-chord-diagram";

// Scales and soloing
import scalesForBeginners from "@/content/guides/guitar-scales-for-beginners";
import majorScale from "@/content/guides/the-major-scale-explained";
import pentatonic from "@/content/guides/the-pentatonic-scale-explained";
import howToSolo from "@/content/guides/how-to-solo-on-guitar";

// Progressions, keys, theory
import progressions from "@/content/guides/guitar-chord-progressions-for-beginners";
import twelveBarBlues from "@/content/guides/the-12-bar-blues-explained";
import strumming from "@/content/guides/guitar-strumming-patterns";
import circleOfFifths from "@/content/guides/the-circle-of-fifths-explained";
import whatIsAKey from "@/content/guides/what-is-a-key-in-music";
import relativeMinor from "@/content/guides/relative-minor-explained";
import nashville from "@/content/guides/nashville-number-system-explained";
import changeKey from "@/content/guides/how-to-change-key-in-a-song";
import transpose from "@/content/guides/how-to-transpose-a-song";

// Ear
import intervals from "@/content/guides/music-intervals-explained";
import earTraining from "@/content/guides/ear-training-for-guitarists";

// Tuning
import tuneGuitar from "@/content/guides/how-to-tune-a-guitar";
import tuneBass from "@/content/guides/how-to-tune-a-bass-guitar";
import tuneUkulele from "@/content/guides/how-to-tune-a-ukulele";
import dropD from "@/content/guides/drop-d-tuning-explained";
import openG from "@/content/guides/open-g-tuning-explained";
import dadgad from "@/content/guides/dadgad-tuning-explained";
import altTunings from "@/content/guides/alternate-guitar-tunings";

// Practical
import useCapo from "@/content/guides/how-to-use-a-capo";
import metronome from "@/content/guides/how-to-practice-guitar-with-a-metronome";

export const GUIDES = [
  caged,
  memorizeFretboard,
  barreChords,
  powerChords,
  seventhChords,
  readChordDiagram,
  scalesForBeginners,
  majorScale,
  pentatonic,
  howToSolo,
  progressions,
  twelveBarBlues,
  strumming,
  circleOfFifths,
  whatIsAKey,
  relativeMinor,
  nashville,
  changeKey,
  transpose,
  intervals,
  earTraining,
  tuneGuitar,
  tuneBass,
  tuneUkulele,
  dropD,
  openG,
  dadgad,
  altTunings,
  useCapo,
  metronome,
];

export const guideBySlug = (slug) => GUIDES.find((g) => g.slug === slug);
export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
