/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "the-caged-system-explained",
  title: "The CAGED System Explained (Without the Confusion)",
  description:
    "The CAGED system turns the whole guitar neck into five shapes you already know. Here is how it works, why it matters, and how to actually use it.",
  keyword: "caged system",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "If you can play open chords but the rest of the neck still looks like a wall of random dots, the CAGED system is the map you have been missing. It is not a new technique or a secret scale. It is a way of seeing: the whole fretboard is just five chord shapes you already know, repeated in every key.",
    "This guide explains what CAGED is, why it works, and how to start using it today, with an interactive Fretboard Explorer you can open alongside it.",
  ],
  sections: [
    {
      heading: "What CAGED actually stands for",
      body: [
        "CAGED is an acronym for the five open chord shapes almost every guitarist learns first: C, A, G, E, and D. Those five shapes are the only major chord shapes the guitar really has. Every other major chord you play up the neck is one of these five shapes moved to a new position.",
        "The order of the letters matters. Going up the neck, the shapes always appear in the same repeating sequence: C, A, G, E, D, and then back to C again. That fixed order is what makes the system a map instead of a pile of shapes.",
      ],
    },
    {
      heading: "Why the shapes connect",
      body: [
        "Pick any major chord, say C. You can play it as the open C shape at the bottom of the neck. Move up until the next shape lines up, and the very same C chord is now playable as an A shape. Keep going and it becomes a G shape, then an E shape, then a D shape, and then a C shape again an octave higher.",
        "The five shapes interlock like puzzle pieces. Where one shape ends, the next begins, so together they cover the entire neck with no gaps. That is the whole trick: one chord, five shapes, all connected.",
      ],
    },
    {
      heading: "Your barre chords are already CAGED",
      body: [
        "Here is the part that makes it click for most players: a barre chord is not a new shape. It is an open shape with your first finger acting as a movable nut.",
        "The common F barre chord at the first fret is just the open E shape moved up one fret. The B flat barre chord on the fifth fret is the open A shape moved up. You have been using CAGED for years without a name for it.",
        {
          list: [
            "E shape moved up = the barre chords rooted on the low E string",
            "A shape moved up = the barre chords rooted on the A string",
            "The other three shapes (C, G, D) give you higher, often prettier voicings for the same chord",
          ],
        },
      ],
    },
    {
      heading: "Why this is worth learning",
      body: [
        "Once you see the neck as five connected shapes, three things get easier at once. You can play any chord in several places, so you can pick the voicing that sounds best or is easiest to reach. You can find the notes of a scale around any shape, because each CAGED shape has a matching scale pattern. And you stop feeling lost above the fifth fret, because you always know which shape you are sitting in.",
        "This is the difference between memorizing hundreds of separate shapes and understanding five that repeat. It is far less to learn and far more useful.",
      ],
    },
    {
      heading: "How to start using CAGED today",
      body: [
        "Do not try to learn all five shapes in every key at once. Start small and let it build.",
        {
          list: [
            "Pick one chord, like G, and find it in all five shapes up the neck.",
            "Say the shape name out loud as you play each one: G shape, E shape, D shape, and so on.",
            "Add the matching scale around one shape at a time, so the chord and the scale live together in your mind.",
            "Open the Fretboard Explorer, choose a key, and watch the five shapes tile the neck so you can see what your hands are doing.",
          ],
        },
        "A few minutes a day beats an hour once a week. The goal is recognition, not memorization: eventually you glance at the neck and simply see which shape you are in.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the CAGED system worth learning?",
      a: "Yes, especially for intermediate players stuck at the fifth fret. It replaces hundreds of separate shapes with five that repeat, which makes chords, scales, and the whole neck far easier to navigate.",
    },
    {
      q: "Does CAGED work in every key?",
      a: "Yes. The five shapes and their order stay the same in every key. Only the starting position on the neck changes.",
    },
    {
      q: "Do I need to know theory first?",
      a: "No. CAGED is visual. You can learn it purely by shape, then add theory later as it starts to make sense.",
    },
    {
      q: "Is CAGED only for major chords?",
      a: "It is built on the five major shapes, but the same positions give you the minor chords, scales, and arpeggios that share those shapes, which is why it is such a useful map.",
    },
  ],
  relatedTools: ["fretboard-explorer", "chord-library"],
  relatedGuides: ["how-to-memorize-the-fretboard", "the-circle-of-fifths-explained"],
};

export default guide;
