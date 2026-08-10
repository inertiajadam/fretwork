/* Guide (article) registry. Import each guide file and list it here in the
   order it should appear in the hub. Adding an article = create its file in
   content/guides/ and add it to GUIDES. */
import caged from "@/content/guides/the-caged-system-explained";
import memorizeFretboard from "@/content/guides/how-to-memorize-the-fretboard";
import barreChords from "@/content/guides/barre-chords-explained";
import readChordDiagram from "@/content/guides/how-to-read-a-chord-diagram";
import scalesForBeginners from "@/content/guides/guitar-scales-for-beginners";
import pentatonic from "@/content/guides/the-pentatonic-scale-explained";
import progressions from "@/content/guides/guitar-chord-progressions-for-beginners";
import twelveBarBlues from "@/content/guides/the-12-bar-blues-explained";
import circleOfFifths from "@/content/guides/the-circle-of-fifths-explained";
import nashville from "@/content/guides/nashville-number-system-explained";
import changeKey from "@/content/guides/how-to-change-key-in-a-song";
import intervals from "@/content/guides/music-intervals-explained";
import earTraining from "@/content/guides/ear-training-for-guitarists";
import tuneGuitar from "@/content/guides/how-to-tune-a-guitar";
import tuneBass from "@/content/guides/how-to-tune-a-bass-guitar";
import tuneUkulele from "@/content/guides/how-to-tune-a-ukulele";
import dropD from "@/content/guides/drop-d-tuning-explained";
import altTunings from "@/content/guides/alternate-guitar-tunings";
import useCapo from "@/content/guides/how-to-use-a-capo";
import metronome from "@/content/guides/how-to-practice-guitar-with-a-metronome";

export const GUIDES = [
  // Fretboard and chords
  caged,
  memorizeFretboard,
  barreChords,
  readChordDiagram,
  // Scales and soloing
  scalesForBeginners,
  pentatonic,
  // Progressions, keys, theory
  progressions,
  twelveBarBlues,
  circleOfFifths,
  nashville,
  changeKey,
  // Ear
  intervals,
  earTraining,
  // Tuning
  tuneGuitar,
  tuneBass,
  tuneUkulele,
  dropD,
  altTunings,
  // Practical
  useCapo,
  metronome,
];

export const guideBySlug = (slug) => GUIDES.find((g) => g.slug === slug);
export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
