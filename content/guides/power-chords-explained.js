/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "power-chords-explained",
  title: "Power Chords Explained: The Two-Finger Shape Behind Rock",
  description:
    "Power chords use just the root and the fifth, no third, so they are neither major nor minor. Here is how the shapes work and why rock loves them.",
  keyword: "power chords",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "A power chord is the simplest heavy sound on the guitar, and it is probably the first movable shape most rock players ever learn. It is not really a full chord at all: it is just two notes, the root and the fifth, often with the root repeated an octave higher for extra weight.",
    "This guide covers what a power chord is, the shapes rooted on the low E and A strings, why they slide freely up the neck, why they carry so much rock music, and how palm muting shapes their sound. You can hear and see every note using Fretwork's free Chord Library and Fretboard Explorer.",
  ],
  sections: [
    {
      heading: "What a power chord actually is",
      body: [
        "Most chords you learn are built from three notes: a root, a third, and a fifth. The third is the note that decides the mood. A major third sounds bright, a minor third sounds sad. A power chord leaves the third out entirely. You are left with only the root and the fifth, which is why its written name uses a 5, as in G5 or E5.",
        "Because there is no third, a power chord is neither major nor minor. It sits in between, open and unfussy. That plainness is a feature, not a shortcut: it lets the chord sit under any melody without arguing with it, and it stays clean even when the tone gets aggressive.",
      ],
    },
    {
      heading: "The two-finger and three-finger shapes",
      body: [
        "The core power chord is a two-finger shape. Your first finger holds the root, and your third finger holds the fifth on the next string, two frets higher. Strum only those two strings and you have the whole chord.",
        "Most players add a third finger to double the root an octave up, which thickens the sound. That gives you the common three-finger version. The frets your fingers land on stay in the same tidy block, so it is easy to grab quickly.",
        {
          list: [
            "Two-finger shape: root plus the fifth, the leanest version",
            "Three-finger shape: the same two notes plus the octave root on top for more body",
            "Only strum the strings your fingers cover; let the rest stay silent",
          ],
        },
      ],
    },
    {
      heading: "Rooted on the low E and A strings",
      body: [
        "Power chords come in two main home positions, one for each of the two lowest strings. When the root sits on the low E string, the shape covers the E and A strings, plus the D string if you add the octave. When the root sits on the A string, the shape shifts over to cover the A and D strings, plus the G string for the octave.",
        "Learning both lets you play the same chord in two places and switch between them with the smallest possible hand movement. That is the whole reason to know them both: less travel, smoother changes.",
      ],
    },
    {
      heading: "Why they move freely up the neck",
      body: [
        "A power chord uses no open strings, so nothing about the shape is tied to one spot. The chord is named by wherever the root finger lands. Slide the exact same shape up or down and you get a different chord with zero relearning.",
        "Here is a concrete example. Put the root of the low E string shape on the third fret and you are playing G5. Keep the shape identical and move the whole thing down to the open position area so the root sits on the second fret of the A string, and you are playing an E5. One shape, every key, just by changing frets. Open the Fretboard Explorer to watch the root move and see which note names you are landing on.",
      ],
    },
    {
      heading: "Why rock leans on them",
      body: [
        "Power chords and distortion were made for each other. When you add distortion or overdrive, the amp piles extra tones on top of every note you play. Full major and minor chords can turn muddy or harsh under that treatment, because the third clashes with those added tones. A power chord has no third to clash, so it stays strong and clear no matter how much grit you add.",
        "That is why so much rock, punk, and metal is built almost entirely from power chords. They are fast to fret, easy to move, and they sound powerful through a driven amp. The same shape that a beginner learns in an afternoon is the same shape carrying stadium riffs.",
      ],
    },
    {
      heading: "Palm muting and control",
      body: [
        "Palm muting is the technique that gives power chords their tight, chugging punch. You rest the side of your picking hand lightly on the strings right where they meet the bridge, then pick. The notes still sound, but shorter and more controlled, with the ringing pulled back.",
        "How hard you press changes the effect. A light touch keeps most of the note, a firmer touch clamps it down to a percussive thud. Rolling your palm on and off the strings as you play is how riffs get their rhythm and bounce.",
        {
          list: [
            "Rest the edge of your palm near the bridge, not far up the strings",
            "Pick as usual; the notes shorten and tighten",
            "Vary the pressure to move between a full ring and a muted chug",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Are power chords major or minor?",
      a: "Neither. A power chord has only the root and the fifth, with no third, and the third is the note that would make it major or minor. That is why it works under both.",
    },
    {
      q: "Why is a power chord written with a 5, like G5?",
      a: "The 5 marks that the chord is built from the root and the fifth only. G5 means a power chord with G as its root; E5 means one with E as its root.",
    },
    {
      q: "Do I need distortion to play power chords?",
      a: "No. They work clean and are useful for practice that way. Distortion just suits them especially well, because they stay clear where fuller chords get muddy.",
    },
    {
      q: "Are two-note and three-note power chords different chords?",
      a: "No. The three-note version simply doubles the root an octave higher for a fuller sound. Both are the same chord with the same name.",
    },
    {
      q: "Do power chords work anywhere on the neck?",
      a: "Yes. They use no open strings, so the shape is fully movable. Whatever fret the root finger lands on names the chord.",
    },
  ],
  relatedTools: ["chord-library", "fretboard-explorer"],
  relatedGuides: ["barre-chords-explained", "the-caged-system-explained"],
};

export default guide;
