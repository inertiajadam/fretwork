/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "dadgad-tuning-explained",
  title: "DADGAD Tuning Explained: The Open, Ringing Modal Sound",
  description:
    "DADGAD tuning takes three strings down a whole step for a lush, droning modal sound. Here is what it is, what it is good for, and how to tune into it.",
  keyword: "dadgad tuning",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "DADGAD is one of the most loved alternate tunings on the guitar, and for good reason. Spelled D A D G A D from the lowest string to the highest, it trades the bright, settled sound of standard tuning for something open, ringing, and a little mysterious. It is neither clearly major nor clearly minor, which is exactly why so many players reach for it.",
    "This guide explains what DADGAD is, why it sounds the way it does, what it is good for, and how to tune into it from standard using Fretwork's free tuner.",
  ],
  sections: [
    {
      heading: "What DADGAD actually is",
      body: [
        "The name is just the six string pitches read low to high: D, A, D, G, A, D. In standard tuning those same strings are E, A, D, G, B, E. So three strings change and three stay put. The fourth, third, and fifth strings (D, G, A counting from the low side) keep their standard pitches, while the sixth, second, and first strings each drop a whole step.",
        "Strum all six open strings and you do not get a plain major or minor chord. You get a Dsus4: a D, an A, and a G, with no third to tell your ear whether the chord is happy or sad. That missing third is the heart of the DADGAD sound. It leaves the chord open and unresolved, ready to lean either way.",
      ],
    },
    {
      heading: "Why it sounds open and modal",
      body: [
        "Two things give DADGAD its character. First, the tuning is built around D, with three of the six strings tuned to a D. When you play in the key of D, those strings ring sympathetically and add a full, resonant bloom under everything you do.",
        "Second, the suspended shape means the tuning sits in a modal world rather than a strict major or minor one. Because there is no third fixed into the open strings, a simple melody can imply major, minor, or one of the older church modes depending on the notes you add on top. That flexibility is why the tuning feels ancient and floating at the same time.",
      ],
    },
    {
      heading: "What DADGAD is good for",
      body: [
        "DADGAD earned its nickname as a Celtic tuning because it fits traditional Irish, Scottish, and English folk music so naturally. It is a favorite for fingerstyle playing, where the goal is to keep a melody moving over ringing open strings.",
        {
          list: [
            "Droning accompaniment: hold a low D and let it ring like a bagpipe under a tune.",
            "Lush open chords: many rich voicings need only one or two fretted notes, so your other fingers are free for melody.",
            "Celtic and folk fingerstyle: the tuning matches the modal feel of a lot of traditional repertoire.",
            "Ambient and cinematic playing: the unresolved, airy quality suits slow, atmospheric pieces.",
          ],
        },
        "Because so many strings stay open, chords in DADGAD tend to ring into each other. That sustain is a feature, not a problem, and it is a big part of why the tuning sounds so full from a single guitar.",
      ],
    },
    {
      heading: "How to tune into DADGAD from standard",
      body: [
        "Getting to DADGAD from standard tuning is simple: you lower three strings by a whole step each and leave the rest alone. A whole step is two frets.",
        {
          list: [
            "Sixth string (low E): tune down a whole step to D.",
            "Fifth string (A): leave it at A.",
            "Fourth string (D): leave it at D.",
            "Third string (G): leave it at G.",
            "Second string (B): tune down a whole step to A.",
            "First string (high E): tune down a whole step to D.",
          ],
        },
        "A quick way to check yourself: your low sixth string and your high first string should now sound the same note, D, two octaves apart. Play them together and listen for that clean, matched ring.",
      ],
    },
    {
      heading: "Tune it accurately with Fretwork's tuner",
      body: [
        "Dropping strings by ear is doable, but it is easy to land slightly flat, especially on the low sixth string where pitch is harder to hear. A tuner takes the guesswork out.",
        "Fretwork's free tuner includes a DADGAD setting alongside standard and other common tunings. Select DADGAD, play each string, and watch the cents gauge to land each pitch dead on before you start playing. It works right in your browser with your device microphone, so there is nothing to install.",
        "Once you are in tune, spend a few minutes just letting open strings ring and adding one fretted note at a time. That is the fastest way to hear how the tuning wants to move.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is DADGAD hard to learn?",
      a: "No. Getting into the tuning takes only a minute, and many chords need just one or two fingers because the open strings do so much of the work. The main adjustment is that your familiar standard-tuning chord shapes no longer apply.",
    },
    {
      q: "What key is DADGAD in?",
      a: "It is centered on D and is often described as a Dsus4 tuning, since the open strings sound a D, A, and G with no third. It has no fixed major or minor quality, which is why it feels modal.",
    },
    {
      q: "Is DADGAD bad for my guitar or strings?",
      a: "No. You are lowering three strings, which slightly reduces tension, so it is gentle on the neck. Standard-gauge strings handle it fine, though some players use slightly heavier strings to keep the low D feeling firm.",
    },
    {
      q: "Can I use a capo in DADGAD?",
      a: "Yes. A capo shifts the whole tuning up while keeping the same open, ringing relationships between the strings, so it is a common way to play DADGAD ideas in higher keys.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["alternate-guitar-tunings", "open-g-tuning-explained"],
};

export default guide;
