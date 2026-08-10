/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "nashville-number-system-explained",
  title: "The Nashville Number System Explained (Chords by the Numbers)",
  description:
    "The Nashville Number System writes chords as scale degrees 1 to 7 instead of letter names, so one chart works in any key. Here is how to read and use it.",
  keyword: "nashville number system",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "Session players in Nashville needed a way to write a song down once and play it in whatever key the singer wanted, sometimes minutes before the tape rolled. Their answer was to stop writing chord letters altogether and write numbers instead. The Nashville Number System is that shorthand, and it is one of the most practical things a guitarist can learn.",
    "This guide explains what the numbers mean, how they map to real chords in a major key, how to read a simple chart, and how to transpose a song to a new key on the fly. There is also a free Nashville Number Trainer you can open alongside it.",
  ],
  sections: [
    {
      heading: "What the numbers actually mean",
      body: [
        "Instead of naming a chord by its letter, the Nashville Number System names it by its place in the major scale. Count the seven notes of the key from 1 to 7, and every chord gets the number of the scale degree it is built on.",
        "In the key of C, the major scale is C, D, E, F, G, A, B. So 1 is C, 2 is D, 3 is E, 4 is F, 5 is G, 6 is A, and 7 is B. The number is not the chord letter, it is the chord's position in the key. That single shift is what makes the whole system work.",
      ],
    },
    {
      heading: "Why the system exists",
      body: [
        "The point of numbers is that they do not care what key you are in. A letter chart is locked to one key: written in C, it only tells you how to play the song in C. A number chart describes the shape of the song, the relationships between the chords, so the same chart works in every key.",
        "Change the key and the numbers stay identical. You just start counting from a new note. That is why a Nashville chart can be handed to a band and played in any key on the spot, and why it is worth learning even if you never set foot in a studio.",
      ],
    },
    {
      heading: "How numbers map to chord qualities",
      body: [
        "In a major key, each scale degree naturally produces a chord of a fixed quality: some major, some minor, one diminished. This pattern is the same in every major key, which is the backbone of the whole system.",
        {
          list: [
            "1 is major",
            "2 is minor",
            "3 is minor",
            "4 is major",
            "5 is major",
            "6 is minor",
            "7 is diminished",
          ],
        },
        "Because the pattern never changes, a bare number carries its quality with it. In most charts a plain number means the expected diatonic chord, so 2 is understood as a minor chord and you only add a mark when you want something different, like a major 2. In the key of C that gives you C, Dm, Em, F, G, Am, and B diminished for the numbers 1 through 7.",
      ],
    },
    {
      heading: "Reading a simple number chart",
      body: [
        "A basic chart is just a row of numbers, read left to right, each number usually lasting one bar. A verse might be written as 1, 4, 5, 5, meaning one bar each of the 1 chord, the 4 chord, and then two bars of the 5 chord.",
        "A few common marks fill in the rest. A minus sign or a lowercase m marks a minor chord when the context needs it (6- is the minor six). A slash shows a chord over a different bass note, so 1/3 is the 1 chord with the 3 in the bass. Two numbers sharing a single bar are often underlined or grouped to show they split that bar. You do not need every symbol to start; the numbers alone carry most of the song.",
      ],
    },
    {
      heading: "A worked example in two keys",
      body: [
        "Take the classic 1, 5, 6, 4 progression, the backbone of countless pop and worship songs. Because the chart is written in numbers, transposing it is just counting from a new starting note.",
        {
          list: [
            "In the key of G: 1 is G, 5 is D, 6 is E minor, 4 is C. You play G, D, Em, C.",
            "In the key of C: 1 is C, 5 is G, 6 is A minor, 4 is F. You play C, G, Am, F.",
            "In the key of D: 1 is D, 5 is A, 6 is B minor, 4 is G. You play D, A, Bm, G.",
          ],
        },
        "The numbers never moved. Only the letters under them changed. Learn a song once as 1, 5, 6, 4 and you know it in all twelve keys, which is exactly the freedom a letter chart cannot give you.",
      ],
    },
    {
      heading: "How to start using it today",
      body: [
        "You do not need to memorize twelve keys at once. Build the habit one song at a time.",
        {
          list: [
            "Pick a song you already know and rewrite its chords as numbers in its home key.",
            "Say the numbers as you play so the shape of the song sinks in, not just the letters.",
            "Try that same number chart in one new key by counting the scale from a different note.",
            "Open the Nashville Number Trainer, which builds a chart, shows it in two keys side by side, and has a quiz mode to test both directions.",
          ],
        },
        "The trainer showing two keys at once is the fastest way to see the point of the system: the same numbers, two different sets of letters, one song. After a week of this, transposing stops feeling like math and starts feeling like reading.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the Nashville Number System hard to learn?",
      a: "No. If you know the major scale of a key, you already have what you need. The core idea is one step: count the scale from 1 to 7 and name each chord by its number instead of its letter.",
    },
    {
      q: "Why do session musicians use numbers instead of chord names?",
      a: "Because a number chart works in any key. When a singer needs a song moved up or down, the numbers stay the same and only the starting note changes, so the band can transpose instantly without rewriting anything.",
    },
    {
      q: "How do I know if a number is a major or minor chord?",
      a: "In a major key the qualities are fixed: 1, 4, and 5 are major, 2, 3, and 6 are minor, and 7 is diminished. A plain number means that expected chord, and a mark like a minus sign flags anything that departs from it.",
    },
    {
      q: "Does the Nashville Number System work in minor keys?",
      a: "Yes, though the pattern of qualities shifts to match the minor scale. Most charts are written from the major-key numbering, and players adjust the marks to show the chords a minor song needs.",
    },
    {
      q: "What does a slash number like 1/3 mean?",
      a: "It is a chord over a different bass note. The 1/3 is the 1 chord played with the 3 of the key in the bass, which is a common way to write a smooth descending or ascending bass line.",
    },
  ],
  relatedTools: ["nashville-trainer"],
  relatedGuides: ["the-circle-of-fifths-explained"],
};

export default guide;
