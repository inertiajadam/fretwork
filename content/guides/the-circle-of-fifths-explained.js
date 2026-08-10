/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "the-circle-of-fifths-explained",
  title: "The Circle of Fifths Explained (A Guitarist's Guide)",
  description:
    "The circle of fifths arranges all 12 keys so their relationships become obvious. Here is how to read it and use it to build chords and progressions.",
  keyword: "circle of fifths",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "The circle of fifths looks like a clock, and that is a good way to think about it. It arranges all twelve musical keys in a ring so that the ones closest together sound the most closely related. Once you can read it, a lot of guitar theory that felt like memorization turns into something you can just see.",
    "This guide explains what the circle is, how to read key signatures and chords from it, and how to actually use it when you play, with Fretwork's free interactive Circle of Fifths tool you can open alongside.",
  ],
  sections: [
    {
      heading: "What the circle of fifths is",
      body: [
        "Put C at the top, in the twelve o'clock spot. Move one step clockwise and you go up a perfect fifth to G. Another step clockwise gives D, then A, then E, and so on all the way around until you arrive back at C. Twelve steps of a fifth touch every one of the twelve keys exactly once, which is why the whole thing closes into a circle.",
        "Going the other way, counterclockwise from C, moves down a fifth each time: C, F, B flat, E flat, and around. So clockwise is fifths up, counterclockwise is fifths down. That single pattern is the entire structure.",
      ],
    },
    {
      heading: "Reading key signatures from it",
      body: [
        "The circle also counts sharps and flats for you. As you move clockwise from C, each key adds one sharp: G has one, D has two, A has three, and the count keeps climbing. As you move counterclockwise, each key adds one flat instead: F has one, B flat has two, E flat has three.",
        "C sits at the top with no sharps and no flats, which is why it is the natural starting point. The keys at the bottom of the circle, around six steps away, are where the sharp and flat spellings meet and overlap.",
        {
          list: [
            "Clockwise from C: add one sharp per step (G, D, A, E, B).",
            "Counterclockwise from C: add one flat per step (F, B flat, E flat, A flat).",
            "The order sharps appear never changes: F, C, G, D, A, E, B.",
            "The order flats appear is that same list reversed: B, E, A, D, G, C, F.",
          ],
        },
      ],
    },
    {
      heading: "Finding the chords in a key",
      body: [
        "Here is the part guitarists get the most mileage from. Pick any key, say G, and look at its two neighbors on the circle: C on one side and D on the other. Those three chords, the key itself plus its two neighbors, are the I, IV, and V of the key. They are the backbone of countless songs.",
        "The pattern holds everywhere. For the key of C, the neighbors are F and G, giving you C, F, and G. For D, the neighbors are G and A. You can read the three most important chords of any key straight off the wheel without counting frets or spelling scales.",
        "The full set of chords that belong to a key, its diatonic chords, cluster right around that neighborhood on the circle. Chords near each other tend to sound good together; chords on opposite sides feel distant and are used for bigger, more surprising moves.",
      ],
    },
    {
      heading: "Relative minors and the inner ring",
      body: [
        "Most circle of fifths diagrams have a second ring inside the first. The inner ring shows each major key's relative minor: the minor key that shares its exact notes and key signature. C major pairs with A minor, G major with E minor, D major with B minor, and so on around.",
        "The relative minor always sits a minor third below its major partner, which on the circle just means it lines up on the inner ring at the same clock position. This is why so many songs slip between a major key and its relative minor so smoothly: they are built from the same seven notes, just centered differently.",
      ],
    },
    {
      heading: "How guitarists actually use it",
      body: [
        "You do not need to memorize the circle to benefit from it. Use it as a reference for a few very practical jobs.",
        {
          list: [
            "Build a progression: start on the I chord and lean on its circle neighbors (the IV and V) for a solid, familiar sound.",
            "Add color: the relative minor and the other diatonic chords nearby give you the ii, iii, and vi to round out a progression.",
            "Change keys: a smooth key change usually moves to a neighbor on the circle, which is why stepping up a fifth or a fourth feels natural.",
            "Transpose a song: shift every chord the same number of steps around the circle and the song stays intact in a new key.",
          ],
        },
        "Open Fretwork's Circle of Fifths tool, click a key, and it lays out the key signature, the diatonic chords, and some classic progressions for that key. Seeing it respond as you move around the wheel makes the relationships stick far faster than staring at a static diagram.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why is it called the circle of fifths?",
      a: "Because each step clockwise moves up a perfect fifth, and twelve of those steps pass through all twelve keys before returning to the start, forming a closed circle.",
    },
    {
      q: "Do I have to memorize the circle of fifths?",
      a: "No. It works fine as a reference you glance at. The relationships tend to sink in on their own once you use it to build a few progressions and find the chords in your favorite keys.",
    },
    {
      q: "How do I find the chords in a key with it?",
      a: "Find the key on the circle and look at its two neighbors. The key plus those neighbors are the I, IV, and V chords, and the rest of the key's chords cluster nearby.",
    },
    {
      q: "What is a relative minor on the circle?",
      a: "It is the minor key that shares a major key's notes and key signature, shown on the inner ring at the same position. C major pairs with A minor, G major with E minor, and so on.",
    },
    {
      q: "Does the circle of fifths work for minor keys too?",
      a: "Yes. The inner ring maps the minor keys, and the same neighbor logic applies: a minor key's closest relatives sit right beside it on the wheel.",
    },
  ],
  relatedTools: ["circle-of-fifths"],
  relatedGuides: [
    "nashville-number-system-explained",
    "guitar-chord-progressions-for-beginners",
  ],
};

export default guide;
