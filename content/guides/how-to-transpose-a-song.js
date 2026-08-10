/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "how-to-transpose-a-song",
  title: "How to Transpose a Song to a New Key",
  description:
    "Transposing moves a whole song to a new key so it fits a singer or plays easier. Here are three simple methods, with a worked example.",
  keyword: "how to transpose a song",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "Transposing a song means moving the entire thing to a new key. Every chord, note, and melody shifts up or down by the same distance, so the song sounds identical in shape and feeling; it just sits higher or lower than before. The relationships between the chords never change, which is why a transposed song still sounds like itself.",
    "You usually transpose for one of two reasons: to fit a singer's range so the melody is comfortable instead of a strain, or to make the chords easier to play under your fingers. This guide walks through what transposing really is, the three practical ways to do it, and a full worked example, with Fretwork's free Capo Calculator and Nashville Number Trainer to help along the way.",
  ],
  sections: [
    {
      heading: "What transposing actually means",
      body: [
        "Music is built on distances, not fixed letters. The gap between one chord and the next is what your ear hears, so if you move every chord by the same amount, that gap stays intact and the song keeps its identity. Transposing is simply sliding the whole picture along the keyboard or fretboard while keeping the spacing the same.",
        "The unit of measurement is the half step, the smallest distance in Western music and the distance between one fret and the next on a guitar. Two half steps make a whole step. Transposing up two half steps, for example, moves everything up one whole step: the key, the chords, and the melody all rise together and nothing about the song's internal logic changes.",
      ],
    },
    {
      heading: "Why you would transpose in the first place",
      body: [
        "The most common reason is the voice. A song written in one key might sit too high for a singer to reach comfortably or too low to carry any power. Nudging the whole song down a couple of half steps can turn a painful chorus into an easy one, and nothing about the arrangement has to change except its overall height.",
        "The second reason is playability. Some keys pack in chords that are awkward on guitar, full of barre shapes and stretches. Shifting to a nearby key can trade those for open chords that ring out and are far easier to hold. Transposing lets you choose the version of the song that serves the singer and the player best.",
      ],
    },
    {
      heading: "Method 1: count half steps and move every chord",
      body: [
        "The most direct method is to measure the distance from your old key to your new key in half steps, then move every chord by that exact distance. If you are going from the key of G up to the key of A, that is a jump of two half steps (G up to G sharp is one, G sharp up to A is two). Every chord in the song then moves up those same two half steps.",
        "Work through the chart one chord at a time and shift each by the interval. As long as you apply the same number of half steps to all of them, the progression stays correct.",
        {
          list: [
            "Find the distance from the old key to the new key in half steps.",
            "Move each chord up or down by that same distance.",
            "Keep the chord qualities the same: a minor stays minor, a seventh stays a seventh.",
            "Check your work by confirming the first chord landed where you expect.",
          ],
        },
      ],
    },
    {
      heading: "Method 2: use the Nashville number system",
      body: [
        "Counting half steps works, but it means redoing the math every time you change keys. The Nashville number system solves that by describing chords with numbers instead of letters. You number the chords of a key from one to seven, so the chord built on the key note is 1, the next scale step up is 2, and so on. A progression written as numbers works in any key at all.",
        "Once a song is written in numbers, transposing is almost free. You do not touch the numbers; you just decide what key the number 1 stands for. If 1 means G today and A tomorrow, the same numbered chart plays perfectly in both keys with no rewriting. This is why session players and worship teams lean on it: one chart covers every singer.",
        "Fretwork's free Nashville Number Trainer lets you practice turning chords into numbers and numbers back into chords in any key, which makes this method second nature faster than you might expect.",
      ],
    },
    {
      heading: "Method 3: use a capo to keep the same shapes",
      body: [
        "A capo clamps across the neck and raises the pitch of every string, which effectively transposes the guitar up without changing your chord shapes at all. You keep playing the shapes you already know, and the capo does the transposing for you. Put a capo on the second fret and play your familiar G shapes, and the guitar sounds in the key of A.",
        "This is the friendliest method when you want easy open chords in a key that would otherwise demand barre chords. The catch is that a capo only raises pitch, never lowers it, so it helps when the new key is higher than your comfortable shape key. Fretwork's free Capo Calculator tells you exactly where to place the capo and which shapes to play for any target key.",
      ],
    },
    {
      heading: "A worked example: moving from G to A",
      body: [
        "Say you have a simple progression in the key of G: G, then C, then D, then back to G. A singer finds it slightly too low, so you want to lift it to the key of A. From G to A is two half steps up, so every chord moves up two half steps.",
        {
          list: [
            "G moves up two half steps to A.",
            "C moves up two half steps to D.",
            "D moves up two half steps to E.",
            "The final G moves up two half steps to A.",
          ],
        },
        "The progression in A becomes A, D, E, A. In Nashville numbers this whole thing is just 1, 4, 5, 1, which is why the number chart never had to change: it was 1, 4, 5, 1 in G and it is 1, 4, 5, 1 in A. And if you would rather keep your comfortable G shapes, place a capo on the second fret and play G, C, D, G as usual; the guitar sounds in A. Three roads, one destination.",
      ],
    },
  ],
  faqs: [
    {
      q: "What does it mean to transpose a song?",
      a: "It means moving the whole song to a new key so every chord and note shifts by the same distance. The song sounds the same in shape and feeling; it just sits higher or lower.",
    },
    {
      q: "Why would I transpose a song?",
      a: "Usually to fit a singer's range so the melody is comfortable, or to swap awkward chords for easier ones. Transposing lets you pick the version that serves the singer and the player best.",
    },
    {
      q: "What is the easiest way to transpose on guitar?",
      a: "A capo is often easiest: it raises the pitch so you keep your familiar shapes and the capo does the transposing. It only raises pitch, though, so it suits keys higher than your shape key.",
    },
    {
      q: "How does the Nashville number system help with transposing?",
      a: "It describes chords as numbers instead of letters, so one numbered chart works in every key. To change keys you simply decide what the number 1 stands for; the numbers themselves never change.",
    },
    {
      q: "Does transposing change how the song sounds?",
      a: "Only its overall height. The distances between the chords stay the same, so the song keeps its identity and feeling. It just plays higher or lower than before.",
    },
  ],
  relatedTools: ["capo-calculator", "nashville-trainer"],
  relatedGuides: ["how-to-use-a-capo", "nashville-number-system-explained"],
};

export default guide;
