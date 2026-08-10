/* Guide (article) registry, grouped into categories. Each guide gets a
   `category` field from the group it sits in. Adding an article = create its
   file in content/guides/ and add it to a group below. */

// Scales and fretboard
import caged from "@/content/guides/the-caged-system-explained";
import memorizeFretboard from "@/content/guides/how-to-memorize-the-fretboard";
import scalesForBeginners from "@/content/guides/guitar-scales-for-beginners";
import majorScale from "@/content/guides/the-major-scale-explained";
import pentatonic from "@/content/guides/the-pentatonic-scale-explained";
import howToSolo from "@/content/guides/how-to-solo-on-guitar";

// Chords
import barreChords from "@/content/guides/barre-chords-explained";
import powerChords from "@/content/guides/power-chords-explained";
import seventhChords from "@/content/guides/seventh-chords-explained";
import readChordDiagram from "@/content/guides/how-to-read-a-chord-diagram";
import progressions from "@/content/guides/guitar-chord-progressions-for-beginners";
import twelveBarBlues from "@/content/guides/the-12-bar-blues-explained";

// Theory
import circleOfFifths from "@/content/guides/the-circle-of-fifths-explained";
import whatIsAKey from "@/content/guides/what-is-a-key-in-music";
import relativeMinor from "@/content/guides/relative-minor-explained";
import nashville from "@/content/guides/nashville-number-system-explained";
import changeKey from "@/content/guides/how-to-change-key-in-a-song";
import transpose from "@/content/guides/how-to-transpose-a-song";

// Tuning
import tuneGuitar from "@/content/guides/how-to-tune-a-guitar";
import tuneBass from "@/content/guides/how-to-tune-a-bass-guitar";
import tuneUkulele from "@/content/guides/how-to-tune-a-ukulele";
import dropD from "@/content/guides/drop-d-tuning-explained";
import openG from "@/content/guides/open-g-tuning-explained";
import dadgad from "@/content/guides/dadgad-tuning-explained";
import altTunings from "@/content/guides/alternate-guitar-tunings";

// Practice and ear
import strumming from "@/content/guides/guitar-strumming-patterns";
import metronome from "@/content/guides/how-to-practice-guitar-with-a-metronome";
import useCapo from "@/content/guides/how-to-use-a-capo";
import intervals from "@/content/guides/music-intervals-explained";
import earTraining from "@/content/guides/ear-training-for-guitarists";
import playByEar from "@/content/guides/how-to-play-guitar-by-ear";

// Styles and techniques
import worship from "@/content/guides/worship-guitar-for-beginners";
import country from "@/content/guides/country-guitar-for-beginners";
import blues from "@/content/guides/blues-guitar-for-beginners";
import rock from "@/content/guides/rock-guitar-for-beginners";
import jazz from "@/content/guides/jazz-guitar-for-beginners";
import fingerstyle from "@/content/guides/fingerstyle-guitar-for-beginners";
import travisPicking from "@/content/guides/travis-picking-explained";
import rhythmGuitar from "@/content/guides/rhythm-guitar-basics";
import slideGuitar from "@/content/guides/slide-guitar-for-beginners";

const GROUPS = [
  {
    category: "Fretboard & scales",
    items: [caged, memorizeFretboard, scalesForBeginners, majorScale, pentatonic, howToSolo],
  },
  {
    category: "Chords",
    items: [barreChords, powerChords, seventhChords, readChordDiagram, progressions, twelveBarBlues],
  },
  {
    category: "Theory",
    items: [circleOfFifths, whatIsAKey, relativeMinor, nashville, changeKey, transpose],
  },
  {
    category: "Tuning",
    items: [tuneGuitar, tuneBass, tuneUkulele, dropD, openG, dadgad, altTunings],
  },
  {
    category: "Styles",
    items: [worship, country, blues, rock, jazz, fingerstyle, travisPicking, rhythmGuitar, slideGuitar],
  },
  {
    category: "Practice & ear",
    items: [strumming, metronome, useCapo, intervals, earTraining, playByEar],
  },
];

export const CATEGORIES = GROUPS.map((g) => g.category);

export const GUIDES = GROUPS.flatMap((g) =>
  g.items.map((item) => ({ ...item, category: g.category }))
);

export const guideBySlug = (slug) => GUIDES.find((g) => g.slug === slug);
export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

/* Light list for hub/search: metadata only, no article bodies. */
export const GUIDE_CARDS = GUIDES.map((g) => ({
  slug: g.slug,
  title: g.title,
  description: g.description,
  readMins: g.readMins,
  category: g.category,
  keyword: g.keyword,
}));
