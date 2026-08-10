/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "relative-minor-explained",
  title: "The Relative Minor Explained: One Scale, Two Moods",
  description:
    "Every major key shares its exact notes with one minor key. Here is what the relative minor is, how to find it fast, and why it makes playing easier.",
  keyword: "relative minor",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "The relative minor is one of those ideas that sounds technical and turns out to be simple. Every major key has a minor twin that uses the exact same notes, just starting in a different place. Learn the pair once and you get two keys, two moods, and a set of shapes that work in both, for the price of one.",
    "This guide explains what the relative minor is, two quick ways to find it, and why it is so useful in real playing. You can follow along with Fretwork's free Circle of Fifths, where every major key sits right next to its relative minor.",
  ],
  sections: [
    {
      heading: "What the relative minor actually is",
      body: [
        "A major scale is a fixed set of seven notes. The relative minor of that scale is the minor key built from the very same seven notes. Nothing is added, nothing is removed, and nothing is sharped or flatted. The only thing that changes is which note you treat as home.",
        "Because both keys share the same notes, they also share the same key signature. That is the giveaway on paper: if two keys have identical sharps or flats, one is major and the other is its relative minor.",
      ],
    },
    {
      heading: "How to find it in seconds",
      body: [
        "There are two reliable ways to find the relative minor of any major key, and they always agree.",
        {
          list: [
            "Count up to the sixth note of the major scale. That sixth degree is the root of the relative minor.",
            "Or count down three half steps (three frets) from the major root. You land on the same note.",
          ],
        },
        "Both methods point to the same place because the sixth degree of a major scale sits three half steps below the octave, which is the same distance below the root. Pick whichever is faster for you in the moment and use it.",
      ],
    },
    {
      heading: "The classic example: C major and A minor",
      body: [
        "C major is the friendliest key to see this in, because it has no sharps and no flats: C, D, E, F, G, A, B. Count up to the sixth note and you reach A. So the relative minor of C major is A minor.",
        "A minor uses those same seven notes, just starting on A: A, B, C, D, E, F, G. Same letters, same key signature (none), different home note. Play the group of notes resolving to C and it sounds bright and settled. Play the same notes resolving to A and it turns wistful. One scale, two moods.",
      ],
    },
    {
      heading: "Why the mood changes when the notes do not",
      body: [
        "If the notes are identical, why does A minor sound sad while C major sounds happy? The answer is context. Your ear decides how a passage feels based on which note it keeps returning to and which chord feels like rest.",
        "When the music circles back to C and the C major chord, C becomes the center of gravity and the whole thing leans bright. When it circles back to A and the A minor chord, A becomes home and the same notes lean darker. The relative minor is proof that mood in music comes as much from emphasis as from the raw notes.",
      ],
    },
    {
      heading: "Why this is worth knowing",
      body: [
        "The practical payoff is that your shapes carry over. Because C major and A minor share notes, the C major scale pattern and the A minor scale pattern are the same pattern on the neck; you just think of a different note as the root. Learn one and you already know the other.",
        "It also makes borrowing between the two feel natural. Songs slip from a major key to its relative minor and back all the time, because the move needs no new notes and no jarring change of gear. Knowing the pair lets you follow that shift, and write your own.",
        {
          list: [
            "Same notes means the same scale shapes work in both keys.",
            "Same key signature means no new sharps or flats to track.",
            "Shared chords make it easy to drift between the bright and dark versions of a progression.",
          ],
        },
      ],
    },
    {
      heading: "See it on the Circle of Fifths",
      body: [
        "The relative minor is not something you have to memorize key by key. On Fretwork's free Circle of Fifths, each major key on the outer ring is paired with its relative minor on the inner ring, sitting in the same slot. C major lines up with A minor, G major with E minor, and so on all the way around.",
        "Open the wheel, pick any key, and the pairing is right there in front of you, along with the chords that belong to it. It turns the counting trick into something you can simply read off at a glance.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the relative minor of a key?",
      a: "It is the minor key that shares the exact same notes and key signature as a given major key. It is built on the sixth degree of that major scale.",
    },
    {
      q: "How do I find the relative minor?",
      a: "Count up to the sixth note of the major scale, or count down three half steps (three frets) from the major root. Both land on the relative minor's root.",
    },
    {
      q: "What is the relative minor of C major?",
      a: "A minor. It uses the same seven notes as C major (no sharps and no flats), just centered on A instead of C.",
    },
    {
      q: "Why do the two keys sound different if the notes are the same?",
      a: "Because your ear responds to which note feels like home. Resolving to C sounds bright and major; resolving to A, using the same notes, sounds darker and minor.",
    },
    {
      q: "Is the relative minor the same as the parallel minor?",
      a: "No. The relative minor shares its notes with the major key but has a different root (C major and A minor). The parallel minor shares the root but changes the notes (C major and C minor).",
    },
  ],
  relatedTools: ["circle-of-fifths"],
  relatedGuides: ["the-circle-of-fifths-explained", "what-is-a-key-in-music"],
};

export default guide;
