/* Original lesson copy. Each lesson may embed one tool by slug.          */
/* Content is plain data; the page renders paragraphs and headings.       */
/* Never adapted from any source: standard pedagogy in our own words.     */

export const LESSONS = {
  "getting-started": {
    title: "Getting started: where are you stuck?",
    eyebrow: "Learn · roadmap",
    intro:
      "Most guitarists hit the same wall. You know a pile of open chords, you can play through a few songs, and then the neck past the third fret turns into a fog. This site is built to clear that fog. Here is the shortest path through it.",
    embedTool: null,
    blocks: [
      {
        h2: "Start with the sound in your hands",
        p: "If a song is in a key that fights your open shapes, you do not need new chords, you need a capo. The Capo Calculator turns any target key into the open shapes you already own, so you can keep playing while the rest of this clicks into place.",
      },
      {
        h2: "Then learn how the neck repeats",
        p: "The single most useful idea on guitar is that five chord shapes you already know (C, A, G, E, D) tile the entire fretboard. Once you see it, you stop memorizing dots and start seeing patterns. The Fretboard Explorer shows those five shapes locking together in any key.",
      },
      {
        h2: "Learn the numbers, not just the letters",
        p: "Players who can jump keys on the spot are not thinking in letter names, they are thinking in numbers: the 1, the 4, the 5. That is the Nashville Number System, and it makes transposing a song a matter of counting, not rewriting. The Nashville Number Trainer drills it both directions.",
      },
      {
        h2: "Train the two things practice ignores",
        p: "Your ears and your timing improve only when you isolate them. The Ear Trainer builds recognition of intervals, chord colors, and progressions in small steps. The Metronome and Speed Builder grows tempo a few beats per minute per clean pass, which is how real speed is actually built.",
      },
      {
        h2: "Play with a band whenever you want",
        p: "Theory sticks fastest when you hear it move. The Progression Player loops a full synthesized backing band in any key and feel, so you can solo, comp, and test ideas against real motion instead of silence.",
      },
    ],
    related: ["capo-calculator", "fretboard-explorer", "nashville-trainer"],
  },

  "fretboard-and-caged": {
    title: "The fretboard and CAGED",
    eyebrow: "Learn · the neck",
    intro:
      "CAGED is the idea that the five open chord shapes you learned first (C, A, G, E, and D) are not just beginner grips. Slid up the neck and barred, those same five shapes spell every major chord, in order, over and over. Learn how they connect and the whole fretboard opens up.",
    embedTool: "fretboard-explorer",
    blocks: [
      {
        h2: "Five shapes, one neck",
        p: "Pick any key. Its root note appears in five places along the strings before the pattern repeats at the twelfth fret. Each of those places is the anchor for one of the five shapes. Play them in the order C, A, G, E, D going up the neck and each shape's ending lines up with the next shape's beginning. They interlock like puzzle pieces.",
      },
      {
        h2: "Why the order never changes",
        p: "The sequence C, A, G, E, D is fixed because it follows the distance between the shapes' root notes, and that distance is the same in every key. Only the starting fret moves. That is the whole trick: memorize one order, and you can find any chord anywhere.",
      },
      {
        h2: "From chords to scales",
        p: "Each shape also carries a piece of the scale around it. When you can see the shape, the scale notes sit right next to your fingers. Turn on the scale overlay below and watch the major scale and pentatonic boxes grow out of the same five anchors. This is why lead and rhythm stop feeling like separate skills.",
      },
      {
        h2: "How to practice it",
        p: "Do not try to swallow all five at once. Pick one key. Learn the E shape and the C shape and the move between them. Add G, then A, then D. Say the shape name out loud as you land it. Within a week the neck starts to feel like a map instead of a grid of dots.",
      },
    ],
    related: ["fretboard-explorer", "chord-library", "circle-of-fifths"],
  },

  chords: {
    title: "Chords: open, barre, and voicing families",
    eyebrow: "Learn · chords",
    intro:
      "A chord is just a handful of notes from a scale, stacked and played together. Once you know which notes a chord asks for, you can find it in a dozen places on the neck. This is how one chord name becomes five different voicings, each with its own color.",
    embedTool: "chord-library",
    blocks: [
      {
        h2: "What a chord actually is",
        p: "A basic major chord is three notes: the root, the third, and the fifth. The third decides major or minor. Everything richer (sevenths, sixths, suspensions) is those same three notes plus one more color tone. When you see a chord as a small set of intervals instead of a fixed grip, moving it around the neck stops being memorization.",
      },
      {
        h2: "Open chords are shapes in one spot",
        p: "The open chords you learned first are simply the CAGED shapes played at the nut, where open strings do some of the work for free. That free ring is why they sound so full, and why moving them up the neck as barre chords takes more effort: your finger now has to do what the nut used to.",
      },
      {
        h2: "Voicing families",
        p: "The Chord Library below takes any chord and any quality and shows you all five CAGED voicings up the neck, with every note and interval labeled. Same chord, five personalities: the low thick one, the bright chimey one, the one that sits perfectly under a melody. Learning families instead of single grips is what lets you voice-lead smoothly between chords.",
      },
      {
        h2: "How to use this",
        p: "Take a song you already play. Look up one of its chords here, then try a voicing you have never used for it, somewhere else on the neck. Notice how the feel changes without the harmony changing. That is arranging, and it starts with knowing where the notes live.",
      },
    ],
    related: ["chord-library", "fretboard-explorer", "capo-calculator"],
  },
};

export const lessonBySlug = (slug) => LESSONS[slug] || null;
