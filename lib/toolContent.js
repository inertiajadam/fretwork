/* ------------------------------------------------------------------ */
/* Per-tool SEO content rendered below the interactive tool. Plain,     */
/* original, genuinely useful copy that gives each tool page the depth   */
/* search engines reward, targets the head search terms, and cross-links */
/* the tools. Add an entry here to give a tool its content section.      */
/* ------------------------------------------------------------------ */

export const TOOL_CONTENT = {
  tuner: {
    heading: "A free online tuner for guitar, bass, banjo, and ukulele",
    intro:
      "This tuner uses your device microphone to detect pitch and shows how far off you are in cents, so you can tune quickly and accurately. It covers guitar, bass (4, 5, and 6 string), banjo (3 to 6 string, including a Nashville high-strung 6 string), and ukulele (high g, low G, and baritone), with standard and alternate tunings. Nothing is recorded or uploaded: the audio is analyzed on your device and discarded. No account, no ads, no limits.",
    stepsTitle: "How to tune your instrument",
    steps: [
      "Allow microphone access when the browser asks.",
      "Choose your instrument and tuning.",
      "Pluck one string and let it ring. The needle shows flat to the left, sharp to the right.",
      "Tighten or loosen the string until the needle rests in the green center.",
      "Prefer tuning by ear? Tap any string to hear its reference pitch and match it.",
    ],
    faqs: [
      {
        q: "Is this guitar tuner free?",
        a: "Yes, completely. There is no account, no ads, and no usage limit.",
      },
      {
        q: "Does it work for bass guitar?",
        a: "Yes. It supports 4, 5, and 6 string bass, including drop D. The low B on a 5 or 6 string registers down to about 31 Hz.",
      },
      {
        q: "Can I tune a ukulele or a banjo?",
        a: "Yes. Ukulele covers standard high g, low G, and baritone. Banjo covers 3, 4, 5, and 6 string, plus a Nashville high-strung 6 string tuning.",
      },
      {
        q: "Do I need to download an app?",
        a: "No. It runs in your browser on a phone, tablet, or computer.",
      },
      {
        q: "Is my microphone audio recorded?",
        a: "No. The pitch is analyzed on your device in real time and never sent anywhere.",
      },
      {
        q: "What does the cents reading mean?",
        a: "A cent is one hundredth of a semitone. Inside 5 cents the needle turns green, which is closer than most ears can hear.",
      },
      {
        q: "Can I change the reference pitch?",
        a: "Yes. Adjust the A reference from 435 to 446 Hz to match a piano or an ensemble.",
      },
    ],
    related: ["capo-calculator", "fretboard-explorer"],
  },

  "capo-calculator": {
    heading: "Free capo calculator: play any key with easy open chords",
    intro:
      "Tell the calculator the key your song sounds in, and it shows every capo position that lets you play it with the open chord shapes you already know. Each option lists the shape family, the capo fret, and a full translation of what every chord becomes, plus a two-guitar layering tip for a bigger sound.",
    stepsTitle: "How to use the capo calculator",
    steps: [
      "Choose the key the song needs to sound in.",
      "Read each capo position and the open-shape family it uses.",
      "Check the translation table: the left column is what your hands play, the right is what the room hears.",
      "Pick a position at fret 7 or lower for the warmest, fullest sound.",
    ],
    faqs: [
      {
        q: "What does a capo actually do?",
        a: "A capo raises the pitch of every string equally, so a familiar chord shape sounds in a higher key with no new fingering.",
      },
      {
        q: "Where should I put my capo for a given key?",
        a: "Enter the key the song sounds in and the tool lists every capo fret and the open shapes that play it.",
      },
      {
        q: "Can two guitarists use different capo positions?",
        a: "Yes. The two-guitar tip pairs two positions in the same key so the voicings stack instead of clashing.",
      },
      {
        q: "Is the capo calculator free?",
        a: "Yes, with no account and no ads.",
      },
    ],
    related: ["fretboard-explorer", "tuner"],
  },

  "key-bridge": {
    heading: "Key change generator: modulate smoothly with pivot chords",
    intro:
      "Key Bridge helps you change key in a song without it sounding abrupt. It finds pivot chords that belong to both the old key and the new one, labels the role each chord plays in each key, ranks the smoothest routes, and lets you build and hear the change.",
    stepsTitle: "How to change key with a pivot chord",
    steps: [
      "Pick the key you are starting in and the key you want to reach.",
      "See the pivot chords that live in both keys, each labeled with its role in both.",
      "Choose a route and build the progression, then play it back to hear the transition.",
    ],
    faqs: [
      {
        q: "What is a pivot chord?",
        a: "A pivot chord is one shared by two keys. Because it belongs to both, it lets the music slip from one key into the next without a jarring jump.",
      },
      {
        q: "How do I change key in the middle of a song?",
        a: "Move through a pivot chord into the new key's dominant chord, then resolve to the new home chord. Key Bridge builds this route for you.",
      },
      {
        q: "Do I need to know music theory to use it?",
        a: "No. Every chord is labeled with its role, so you can see and hear why the change works.",
      },
    ],
    related: ["fretboard-explorer", "capo-calculator"],
  },

  "fretboard-explorer": {
    heading: "CAGED system explained: see the whole fretboard",
    intro:
      "The Fretboard Explorer shows how the five CAGED shapes tile the neck in any key, with chord-tone and scale overlays. It turns the fretboard from a wall of dots into five familiar shapes you already know, so barre chords and scales finally make sense.",
    stepsTitle: "How to use the fretboard explorer",
    steps: [
      "Pick a key.",
      "Turn on chord tones, or overlay the major or pentatonic scale.",
      "Watch the five shapes connect up the neck, and open any shape for its plain-language explainer.",
    ],
    faqs: [
      {
        q: "What is the CAGED system?",
        a: "CAGED is a way to see the whole neck as five familiar open-chord shapes, C, A, G, E, and D, repeated up the fretboard in any key.",
      },
      {
        q: "Are barre chords just moved open chords?",
        a: "Yes. A barre chord is an open shape shifted up the neck, which the explorer shows you visually.",
      },
      {
        q: "Does it show scales too?",
        a: "Yes. Overlay the major or pentatonic scale and see how it sits across all five CAGED shapes.",
      },
    ],
    related: ["chord-library", "capo-calculator"],
  },
};

export const toolContentBySlug = (slug) => TOOL_CONTENT[slug];
