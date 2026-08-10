/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "worship-guitar-for-beginners",
  title: "Worship Guitar for Beginners: How to Play in a Church Band",
  description:
    "A practical starter guide to worship guitar: use a capo to match the singer, read Nashville number charts, keep parts simple, and lock in with the band.",
  keyword: "worship guitar",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "Playing worship guitar in a church band is less about flashy skill and more about serving the song and the people singing it. If you can strum a handful of open chords and keep time, you already have most of what you need to start. The rest is knowing a few band habits: matching the singer's key, reading the charts everyone uses, and playing parts that leave room for the room.",
    "This guide walks through the practical basics, and points you to two free Fretwork tools that make the setup part quick: the Capo Calculator and the Nashville Number Trainer.",
  ],
  sections: [
    {
      heading: "Match the singer with a capo",
      body: [
        "The single most useful skill on a worship stage is getting the song into a key the singer can actually sing. A song that sits comfortably for one vocalist can be too high or too low for the next. Rather than relearning every chord shape in a new key, you can keep the easy open shapes you already know and move them with a capo.",
        "The idea is simple: a capo raises the pitch of every string, so a shape you play as G can sound as A, B flat, or higher depending on where you clamp it. You keep the familiar fingerings; the capo does the transposing. This is why so many worship players lean on a small set of open shapes (G, C, D, E minor, A minor) and just slide the capo to fit the singer.",
        "If you are not sure which fret gives you the key you need, Fretwork's free Capo Calculator does the math for you: pick the target key and the open shapes you want to play in, and it shows the capo position and the chords you will actually finger.",
      ],
    },
    {
      heading: "Use the capo to layer with a second guitarist",
      body: [
        "Capos are not only for singers. When two guitarists play the same song in the same open position, the parts pile up in the same range and turn muddy. Putting one guitar on a capo higher up the neck fixes this instantly.",
        "The two of you play the same song in the same sounding key, but from different shapes and different frets, so the parts sit in different registers and ring together instead of fighting.",
        {
          list: [
            "Guitarist one plays open shapes at the bottom of the neck for body and low end.",
            "Guitarist two capos up (say to the fifth or seventh fret) and plays the matching shapes for shimmer and higher voicings.",
            "The Capo Calculator can show both players which shapes land in the same key, so you can plan the layering before rehearsal instead of guessing on stage.",
          ],
        },
      ],
    },
    {
      heading: "Read Nashville number charts",
      body: [
        "Walk into most worship rehearsals and you will see charts written in numbers rather than chord names. This is the Nashville number system, and it is worth learning early because it solves the key problem for the whole band at once.",
        "Instead of naming a specific chord like G or C, the chart names each chord by its position in the key: the 1 is the home chord, the 4 and 5 are the common companions, the 6 minor is the reflective one, and so on. Because the numbers describe relationships rather than fixed letters, one chart works in every key. When the singer needs the song a step higher, nobody rewrites anything; you just play the same numbers in the new key.",
        "That flexibility is exactly why worship teams use it. A single sheet covers the song no matter who is singing it, and a capo change or a key change costs you nothing on paper.",
        {
          list: [
            "1 is the tonic, the chord that feels like home.",
            "4 and 5 are the workhorses that carry most progressions.",
            "6 minor (often the relative minor) adds a softer, more reflective color.",
            "The same numbers map onto whatever key the band lands in.",
          ],
        },
        "Fretwork's free Nashville Number Trainer lets you build charts, compare two keys side by side, and quiz yourself in both directions until turning numbers into chords (and back) becomes automatic.",
      ],
    },
    {
      heading: "Play less and stay dynamic",
      body: [
        "Beginners often assume the goal is to play as much as possible. On a worship team, the opposite is usually true. When several instruments are going at once, the guitar that plays fewer, cleaner parts almost always sounds better than the one cramming in every strum and fill.",
        "Think in terms of dynamics, not just chords. A quiet verse might be a single note picked pattern or soft open chords; a fuller chorus can open up into wider strumming. Leaving space in the quiet moments is what makes the loud ones land.",
        {
          list: [
            "Favor open voicings and let strings ring, rather than choking every chord.",
            "Use volume swells and simple sustained shapes to add texture without clutter.",
            "Drop out entirely for a line or two when the arrangement feels crowded; silence is a valid part.",
            "Follow the shape of the song: pull back in verses, open up in choruses.",
          ],
        },
      ],
    },
    {
      heading: "Lock in with the band",
      body: [
        "The last piece is the least visible and the most important: playing with the rest of the team instead of alongside it. Your job is to sit inside the groove the drummer and bass player set, not to run ahead of it.",
        "Steady time matters more than clever parts. If the drummer pushes or pulls, you follow; if the leader stretches a phrase, you wait. A guitarist who keeps solid, consistent time and listens more than they play is worth far more to a band than a faster one who drifts.",
        "Practicing to a metronome at home builds the internal clock that makes this easy, so that on stage you can spend your attention listening to everyone else rather than counting.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need a capo to play worship guitar?",
      a: "Not strictly, but it makes life much easier. A capo lets you keep familiar open shapes while matching whatever key the singer needs, and it helps two guitarists sit in different registers so the parts do not clash.",
    },
    {
      q: "Why do worship teams use Nashville number charts?",
      a: "Because the numbers describe each chord's position in the key rather than a fixed letter, one chart works in any key. When the song moves up or down for a different singer, the numbers stay the same.",
    },
    {
      q: "What chords should a beginner worship guitarist learn first?",
      a: "Start with the common open shapes: G, C, D, E minor, and A minor. With a capo, those few shapes cover a huge amount of worship material in almost any key.",
    },
    {
      q: "How do I avoid sounding cluttered with a full band?",
      a: "Play less. Use open voicings, leave space in quiet sections, follow the song's dynamics, and lock your timing to the drums and bass instead of adding busy parts.",
    },
    {
      q: "How can Fretwork's tools help me prepare?",
      a: "The Capo Calculator finds the right capo position for a singer's key and helps two guitarists plan their layers. The Nashville Number Trainer builds charts and drills turning numbers into chords in any key.",
    },
  ],
  relatedTools: ["capo-calculator", "nashville-trainer"],
  relatedGuides: ["how-to-use-a-capo", "nashville-number-system-explained"],
};

export default guide;
