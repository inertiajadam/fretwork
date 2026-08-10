/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "drop-d-tuning-explained",
  title: "Drop D Tuning Explained: How to Get There and Back",
  description:
    "Drop D lowers your sixth string a whole step for a heavier low end and one-finger power chords. Here is how to tune into it and back to standard.",
  keyword: "drop d tuning",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "Drop D is the friendliest alternate tuning on the guitar. You change one string, keep the other five exactly where they are, and suddenly a whole range of heavier, easier riffs opens up. It is the first tuning most players try after standard, and for good reason.",
    "This guide explains what Drop D is, why so many players reach for it, how to tune into it by ear or with a tuner, and how to get back to standard cleanly. You can follow along with Fretwork's free tuner, which has a Drop D setting built in.",
  ],
  sections: [
    {
      heading: "What Drop D tuning is",
      body: [
        "Standard tuning, from the lowest string to the highest, is E, A, D, G, B, E. Drop D changes exactly one of those notes: you lower the sixth string, the thick low E, down a whole step to D. Everything else stays put.",
        "So the tuning reads D, A, D, G, B, E from low to high. The name says it plainly: you drop the low E down to D. That single change is all there is to it, which is why Drop D is such an easy first step into alternate tunings.",
      ],
    },
    {
      heading: "Why players use it",
      body: [
        "The most famous benefit is the one-finger power chord. Because your lowest three strings are now tuned D, A, D, a perfect fifth and octave stacked up, you can play a full power chord by barring one finger straight across those three strings at any fret. That frees your other fingers and lets you move heavy chords around the neck fast.",
        "The dropped string also gives you a lower, thicker bottom note. That extra depth is why Drop D shows up so often in rock and metal, where a heavier low end is part of the sound.",
        {
          list: [
            "One-finger power chords across the bottom three strings, movable to any fret",
            "A deeper low D for a heavier, fuller bottom end",
            "Faster riffing, since power chords no longer need two or three fingers",
            "A low D drone that rings under fingerstyle and folk arrangements in the key of D",
          ],
        },
        "Fingerstyle and folk players like it too, not for heaviness but for that low open D. It gives songs in D or D minor a resonant bass note the standard tuning cannot reach.",
      ],
    },
    {
      heading: "How to tune into Drop D by ear",
      body: [
        "You only need to move one string, and you already have a reference note right next to it. Your fourth string is an open D, one octave above where the low string is headed.",
        {
          list: [
            "Play your open fourth string (the D) and let it ring as your target.",
            "Now slowly lower the sixth string, the thick low E, letting it drop in pitch.",
            "Stop when the low string sounds like the fourth string, just one octave lower. The two should ring together cleanly with no wobble between them.",
            "Check it: an open sixth string and open fourth string played together should sound like the same note in two octaves.",
          ],
        },
        "If the two notes beat against each other with a wavering pulse, you are close but not there. Keep nudging the sixth string until that pulse slows down and disappears.",
      ],
    },
    {
      heading: "The easy way: use a tuner",
      body: [
        "Tuning by ear is a great skill, but a tuner gets you there faster and with more certainty, especially when you are new to it. Fretwork's free tuner has a Drop D setting, so it already expects your low string to land on D instead of E.",
        "Pick the Drop D preset, play your low sixth string, and lower it until the tuner reads D and sits in the center. The other five strings stay in standard, so you do not touch them. That is the whole job.",
      ],
    },
    {
      heading: "How to get back to standard",
      body: [
        "Returning to standard tuning is just the reverse: raise that same sixth string back up a whole step from D to E. Nothing else moved, so nothing else needs fixing.",
        {
          list: [
            "By ear: play your open fifth string (A) as a reference, then raise the sixth string until it sits a whole step, two frets, below that A. You can also fret the sixth string at the second fret and check that it matches your open A.",
            "By tuner: switch back to the standard setting and bring the low string up until it reads E and centers.",
          ],
        },
        "One habit worth building: retune slowly and check tuning again after the string settles. Strings drift a little right after a big pitch change, so a quick second pass keeps everything honest.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does Drop D change all six strings?",
      a: "No. Drop D changes only the sixth string, the low E, dropping it a whole step to D. The other five strings stay exactly in standard tuning, which is what makes it so quick to use.",
    },
    {
      q: "Will Drop D hurt my guitar or strings?",
      a: "No. Lowering one string a whole step slightly reduces its tension, which is easy on the neck and the string. Guitars handle Drop D comfortably, and you can switch back and forth as often as you like.",
    },
    {
      q: "Why are power chords easier in Drop D?",
      a: "Your lowest three strings become D, A, D, already a power chord shape. That lets you play a full power chord by barring one finger across those three strings at any fret, instead of using two or three fingers.",
    },
    {
      q: "Do I need a special tuner for Drop D?",
      a: "No, but a tuner with a Drop D preset makes it effortless. Fretwork's free tuner has one: it expects the low string on D, so you just lower that string until it centers and leave the rest alone.",
    },
    {
      q: "Can I play my standard-tuning songs in Drop D?",
      a: "Mostly yes, as long as you avoid the open low string, since it now sounds a D instead of an E. Chords and riffs that do not use that open sixth string play the same in both tunings.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["alternate-guitar-tunings", "how-to-tune-a-guitar"],
};

export default guide;
