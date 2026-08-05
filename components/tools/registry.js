import dynamic from "next/dynamic";

/* Maps a tool slug to its (client) component. Every tool added to        */
/* lib/site.js TOOLS must have a matching entry here.                      */
const REGISTRY = {
  "fretboard-explorer": dynamic(() => import("./FretboardExplorer")),
  "chord-library": dynamic(() => import("./ChordLibrary")),
  "circle-of-fifths": dynamic(() => import("./CircleOfFifths")),
  "key-bridge": dynamic(() => import("./KeyBridge")),
  "capo-calculator": dynamic(() => import("./CapoCalculator")),
  tuner: dynamic(() => import("./Tuner")),
  "nashville-trainer": dynamic(() => import("./NashvilleTrainer")),
  "ear-trainer": dynamic(() => import("./EarTrainer")),
  metronome: dynamic(() => import("./Metronome")),
  "progression-player": dynamic(() => import("./ProgressionPlayer")),
};

export function getToolComponent(slug) {
  return REGISTRY[slug] || null;
}
