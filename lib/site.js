/* ------------------------------------------------------------------ */
/* Site registry: THE single source of truth for tools, routes, nav.   */
/* Update this list every time a tool or page is added/removed/renamed. */
/* (Replaces prototypes/site_menu.jsx TOOLS registry.)                  */
/* ------------------------------------------------------------------ */

export const SITE_NAME = "Fretwork"; // working title, change here only

export const TOOLS = [
  {
    slug: "fretboard-explorer",
    name: "Fretboard Explorer",
    tag: "CAGED",
    status: "built",
    blurb:
      "See the five CAGED shapes tile the neck in any key, with chord-tone and scale overlays.",
  },
  {
    slug: "chord-library",
    name: "Chord Library",
    tag: "Chords",
    status: "built",
    blurb:
      "Any chord, nine flavors, five positions up the neck, with every note and interval labeled.",
  },
  {
    slug: "circle-of-fifths",
    name: "Circle of Fifths",
    tag: "Theory",
    status: "built",
    blurb:
      "Interactive wheel: key signatures, the seven chords of every key, and classic progressions.",
  },
  {
    slug: "key-bridge",
    name: "Key Bridge",
    tag: "Songwriting",
    status: "built",
    blurb:
      "Build a progression that changes key: pivot chords, dominant routes, and a hands-on builder.",
  },
  {
    slug: "capo-calculator",
    name: "Capo Calculator",
    tag: "Practical",
    status: "built",
    blurb:
      "Pick the key a song sounds in; get every capo position and shape family that plays it, with full chord translations.",
  },
  {
    slug: "tuner",
    name: "Tuner",
    tag: "Practical",
    status: "built",
    blurb:
      "Mic-based tuner with a cents gauge for guitar, bass, banjo, and ukulele: many tunings, strings and chromatic modes, adjustable reference pitch.",
  },
  {
    slug: "nashville-trainer",
    name: "Nashville Number Trainer",
    tag: "Theory",
    status: "built",
    blurb:
      "Build charts in numbers, see them wear chords in two keys at once, then drill both directions in quiz mode.",
  },
  {
    slug: "ear-trainer",
    name: "Ear Trainer",
    tag: "Ears",
    status: "built",
    blurb:
      "Three drills with synthesized audio: intervals, chord colors, and progression recognition, each in three levels.",
  },
  {
    slug: "metronome",
    name: "Metronome & Speed Builder",
    tag: "Technique",
    status: "built",
    blurb:
      "Sample-accurate metronome plus a tempo ladder: climb a few bpm per clean pass, manually or on autopilot.",
  },
  {
    slug: "progression-player",
    name: "Progression Player",
    tag: "Practice",
    status: "built",
    blurb:
      "A looping synthesized backing band: any progression in all 24 major and minor keys, four feels, drums optional.",
  },
];

export const LEARN = [
  {
    slug: "getting-started",
    name: "Getting Started",
    blurb: "Where are you stuck? A roadmap into the rest of the site.",
    status: "written",
  },
  {
    slug: "fretboard-and-caged",
    name: "The Fretboard & CAGED",
    blurb: "How five shapes map the entire neck.",
    status: "written",
  },
  {
    slug: "chords",
    name: "Chords",
    blurb: "Open chords, barre chords, and the voicing families.",
    status: "written",
  },
  {
    slug: "theory-and-nashville",
    name: "Theory & Nashville Numbers",
    blurb: "Keys, intervals, diatonic chords, number notation.",
    status: "planned",
  },
  {
    slug: "ear-training",
    name: "Ear Training",
    blurb: "Hearing intervals, qualities, and progressions.",
    status: "planned",
  },
  {
    slug: "technique-and-speed",
    name: "Technique & Speed",
    blurb: "Practice structure and tempo laddering.",
    status: "planned",
  },
];

export const NAV = [
  { label: "Tools", href: "/tools" },
  { label: "Guides", href: "/guides" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
  // Practice is hidden for now; the /practice page still exists. Re-add here
  // to bring it back into the nav.
];

/* Per-tool SEO keywords: the search terms each tool should rank for. */
export const TOOL_KEYWORDS = {
  "fretboard-explorer": [
    "CAGED system chart",
    "guitar fretboard diagram",
    "fretboard notes",
    "guitar scale explorer",
    "learn the fretboard",
  ],
  "chord-library": [
    "guitar chord finder",
    "chord library",
    "chord voicings",
    "guitar chord chart",
    "barre chord shapes",
  ],
  "circle-of-fifths": [
    "circle of fifths",
    "key signatures chart",
    "diatonic chords",
    "interactive circle of fifths",
  ],
  "key-bridge": [
    "key change generator",
    "modulation chords",
    "pivot chords",
    "chord progression builder",
  ],
  "capo-calculator": [
    "capo calculator",
    "capo chart",
    "transpose chords capo",
    "guitar capo positions",
  ],
  tuner: [
    "online guitar tuner",
    "bass tuner online",
    "ukulele tuner",
    "banjo tuner",
    "guitar tuner microphone",
    "alternate tunings tuner",
    "chromatic tuner",
  ],
  "nashville-trainer": [
    "nashville number system",
    "number system chart",
    "transpose chords by numbers",
    "nashville numbers quiz",
  ],
  "ear-trainer": [
    "guitar ear training",
    "interval ear trainer",
    "chord ear training",
    "ear training exercises",
  ],
  metronome: [
    "online metronome",
    "guitar metronome",
    "speed trainer metronome",
    "tap tempo metronome",
  ],
  "progression-player": [
    "chord progression player",
    "backing track generator",
    "guitar backing tracks",
    "practice loops any key",
  ],
};

export const toolBySlug = (slug) => TOOLS.find((t) => t.slug === slug);
export const learnBySlug = (slug) => LEARN.find((l) => l.slug === slug);
