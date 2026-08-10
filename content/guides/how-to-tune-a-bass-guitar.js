/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "how-to-tune-a-bass-guitar",
  title: "How to Tune a Bass Guitar (4, 5, and 6 String)",
  description:
    "Learn how to tune a bass guitar in standard tuning, plus 5-string, 6-string, and drop D. Tune by ear or with a tuner that reads low B.",
  keyword: "how to tune a bass",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "Tuning a bass is simple once you know the notes and have a way to check your pitch. The strings are thick and low, which is part of what makes a bass feel so grounding, but it also means some notes sit below what many phone tuners can read. This guide walks through standard tuning for the 4, 5, and 6 string bass, covers drop D, and shows you how to tune both by ear and with a tuner.",
    "You can follow along with Fretwork's free mic tuner, which supports bass and lets you tap any string to hear its pitch first.",
  ],
  sections: [
    {
      heading: "Standard tuning for a 4-string bass",
      body: [
        "The standard 4-string bass is tuned E, A, D, G, from the lowest and thickest string to the highest and thinnest. Those are the same note names as the lowest four strings of a guitar, but the bass sounds one octave lower. That octave is why a bass anchors a band the way it does.",
        "From the thickest string to the thinnest, the order is:",
        {
          list: [
            "4th string (lowest, thickest): E",
            "3rd string: A",
            "2nd string: D",
            "1st string (highest, thinnest): G",
          ],
        },
        "A common way to remember the order is to say the notes out loud a few times while you pluck each string. After a week it becomes automatic.",
      ],
    },
    {
      heading: "The 5-string bass and its low B",
      body: [
        "A 5-string bass adds one string below the standard four, tuned to a low B. So the full set, low to high, is B, E, A, D, G. That extra string gives you five more low notes without moving your hand off the neck, which is why it is popular in modern styles that call for a deep low end.",
        "The low B is very low: its pitch is around 31 Hz. Many basic tuners and phone apps cannot hear a note that low and will either read nothing or jump to a wrong octave. If you play a 5-string, make sure your tuner is rated to read down to at least 30 Hz. Fretwork's mic tuner is built to catch these low notes.",
      ],
    },
    {
      heading: "The 6-string bass",
      body: [
        "A 6-string bass keeps the low B of the 5-string and adds a high C on top. The full tuning, low to high, is B, E, A, D, G, C. You get the deep low B for weight and the high C for melody and chords, all on one instrument.",
        "Everything about tuning the 6-string is the same as the 5-string, you just have one more string to set at the top. As with the 5-string, the low B near 31 Hz is the note that needs a tuner able to read that far down.",
      ],
    },
    {
      heading: "Drop D tuning on bass",
      body: [
        "Drop D on a 4-string bass means lowering the thickest string from E down to D, so the tuning becomes D, A, D, G. It gives you a lower root note and lets you play a power-chord shape or a driving root line with one finger. Many rock and metal players use it.",
        "To get there, tune the bass to standard first, then lower the 4th string until it matches the pitch of your open 3rd string but one octave below, or simply match it to a D from a tuner. On a 5-string you can drop the B down to A instead, though standard drop D is more common on the 4-string.",
      ],
    },
    {
      heading: "Tuning with a tuner",
      body: [
        "A tuner is the fastest and most reliable way to get in tune, especially for the low strings where your ear can struggle to hear pitch clearly.",
        {
          list: [
            "Open the tuner and pluck one string at a time, letting it ring cleanly.",
            "Watch the readout: it tells you the note and whether you are flat (too low) or sharp (too high).",
            "Turn the tuning peg slowly until the note lands in the center and reads in tune.",
            "For the low B on a 5 or 6 string, confirm your tuner reads down to around 31 Hz, or it may show the wrong note.",
          ],
        },
        "With Fretwork's mic tuner you can also tap a string on screen to hear its target pitch, then match your bass to it by ear before you fine-tune with the readout.",
      ],
    },
    {
      heading: "Tuning by ear",
      body: [
        "Tuning by ear is a good skill to build, and it works well on bass once you have one reference pitch to start from. The idea is that each open string can be matched to a note on the string below it.",
        {
          list: [
            "Fret the 5th fret of the E (4th) string: that note is A. Match your open A (3rd) string to it.",
            "Fret the 5th fret of the A string to get D, and tune the open D string to match.",
            "Fret the 5th fret of the D string to get G, and tune the open G string to match.",
            "For a 5-string, fret the 5th fret of the B string to get E, and tune your open E to it.",
          ],
        },
        "Get your starting reference from a tuner, a keyboard, or a tuned instrument, then work up the strings. Play the two notes together and listen for the wobble to slow down and disappear as they lock in.",
      ],
    },
  ],
  faqs: [
    {
      q: "What are the notes on a bass guitar?",
      a: "A standard 4-string bass is tuned E, A, D, G from lowest to highest. That is the same note order as a guitar's bottom four strings, but sounding one octave lower.",
    },
    {
      q: "How is a 5-string bass tuned?",
      a: "A 5-string adds a low B below the standard strings, giving you B, E, A, D, G from low to high. A 6-string keeps that low B and adds a high C on top.",
    },
    {
      q: "Why will my tuner not read my low B string?",
      a: "The low B on a 5 or 6 string bass is around 31 Hz, which is below what many basic tuners can detect. Use a tuner rated to read down to at least 30 Hz.",
    },
    {
      q: "How do I tune drop D on bass?",
      a: "Lower your thickest E string down to D, giving you D, A, D, G. Match it to a D from a tuner, or to your open D string one octave higher.",
    },
    {
      q: "Should I tune by ear or with a tuner?",
      a: "A tuner is faster and more accurate, especially for low strings. Tuning by ear is worth practicing, and matching strings at the 5th fret builds a skill that helps you spot when something drifts.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["how-to-tune-a-guitar", "drop-d-tuning-explained"],
};

export default guide;
