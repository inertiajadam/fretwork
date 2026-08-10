/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "what-is-a-key-in-music",
  title: "What Is a Key in Music? A Plain Guide for Guitarists",
  description:
    "A key is the home note a song centers on, plus the scale and chords built from it. Here is what that means and how to find any song's key.",
  keyword: "what is a key in music",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "You have probably heard someone say a song is in the key of G, or that two songs are in different keys. But what does a key actually describe? At its simplest, a key is a home base: one note that a piece of music keeps coming back to, along with the scale built on that note and the family of chords that scale produces.",
    "This guide explains what a key is, how major and minor keys feel different, how to figure out the key of a song you are learning, and why knowing the key makes finding the right chords and scales so much easier.",
  ],
  sections: [
    {
      heading: "A key is a home note and its family",
      body: [
        "Think of a key as a home. There is one note that feels like the center of gravity, the place the music wants to rest. That note is called the tonic, and it gives the key its name. In the key of C major, the tonic is C.",
        "But a key is more than a single note. It also includes the scale that starts on that note and the set of chords built from the notes of that scale. So when a song is in C major, it draws almost all of its melody notes from the C major scale and almost all of its chords from the family that scale produces. The music can wander, but it keeps pulling back toward home.",
      ],
    },
    {
      heading: "Major keys and minor keys",
      body: [
        "Keys come in two main flavors: major and minor. The difference is the pattern of steps in the scale, and that pattern changes how the music feels.",
        "Major keys tend to sound bright, open, and settled. Minor keys tend to sound darker, softer, or more serious. Neither is happier or sadder in any strict sense, but that is a fair first impression: major leans cheerful, minor leans moody.",
        "Every major key has a minor key that shares its exact notes, called its relative minor. C major and A minor use the same seven notes; they simply treat a different note as home. That shared pool of notes is why the two feel related even though their mood differs.",
      ],
    },
    {
      heading: "The key of C major, in full",
      body: [
        "C major is the classic starting point because it uses no sharps and no flats: just the white keys on a piano. Its scale is C, D, E, F, G, A, B, and back to C.",
        "Build a chord on each of those seven notes and you get the chord family for the key. This is the set most songs in C major draw from:",
        {
          list: [
            "C major (the I chord, home)",
            "D minor (the ii chord)",
            "E minor (the iii chord)",
            "F major (the IV chord)",
            "G major (the V chord, which pulls strongly back to C)",
            "A minor (the vi chord, the relative minor)",
            "B diminished (the vii chord, used less often)",
          ],
        },
        "Notice the pattern: three major chords, three minor chords, and one diminished chord. Every major key follows this same shape, which is why once you learn it in one key you understand all of them.",
      ],
    },
    {
      heading: "How to find the key of a song",
      body: [
        "When you are learning a song and want to know its key, two clues do most of the work.",
        {
          list: [
            "Find the chord it rests on. Songs usually begin or end on their home chord, and the chorus often lands there too. If a progression keeps resolving to G and feels finished there, the song is probably in G.",
            "Read the key signature. In written or printed music, the sharps or flats at the start of each line tell you the key. No sharps or flats points to C major or its relative, A minor.",
            "Check the mood and the resting note. If home feels bright and settled, you are likely in a major key. If it feels darker, look at the relative minor that shares the same notes.",
          ],
        },
        "These clues can point to two options that share notes, like C major and A minor. To decide between them, listen for which note truly feels like home, the one the song leans on and returns to.",
      ],
    },
    {
      heading: "Why knowing the key helps you play",
      body: [
        "Once you know the key, a lot of guesswork disappears. You know which scale to use for a melody or a solo, because the key names it directly. You know which chords are likely to show up, because they come from that one family. And you can spot the chord that does not belong, which is often the most interesting moment in a song.",
        "Knowing the key also makes it easy to move a song to fit your voice or another instrument. If you understand that a progression is the I, IV, and V of a key, you can shift the whole thing to a new key and keep the same relationships.",
        "Fretwork's free interactive Circle of Fifths is built for exactly this. Pick any key and it shows you the notes, the chord family, and how neighboring keys relate, so the idea of a key stops being abstract and becomes something you can see and use.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is a key in music, in one sentence?",
      a: "A key is the home note a song centers on, together with the scale built on that note and the family of chords that come from it.",
    },
    {
      q: "How do I find the key of a song?",
      a: "Find the chord the song rests on, since songs usually resolve to home. In written music, read the sharps or flats in the key signature. Then confirm by listening for which note feels like home.",
    },
    {
      q: "What is the difference between a major key and a minor key?",
      a: "They use different step patterns, which changes the feel. Major keys sound brighter and more settled; minor keys sound darker or more serious. Each major key also has a relative minor that shares its exact notes.",
    },
    {
      q: "What chords are in the key of C major?",
      a: "C major, D minor, E minor, F major, G major, A minor, and B diminished. That is three major chords, three minor chords, and one diminished chord, the same shape every major key follows.",
    },
    {
      q: "Do two songs in the same key sound the same?",
      a: "No. Sharing a key just means they draw from the same home note, scale, and chord family. Melody, rhythm, and chord choices still make them sound completely different.",
    },
  ],
  relatedTools: ["circle-of-fifths"],
  relatedGuides: ["the-circle-of-fifths-explained", "relative-minor-explained"],
};

export default guide;
