/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "music-intervals-explained",
  title: "Music Intervals Explained: The Building Blocks of Everything You Play",
  description:
    "Music intervals are the distance between two notes. Learn every interval from a minor second to the octave, and how to recognize each one by ear.",
  keyword: "music intervals",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "An interval is the single most useful idea in music theory, and most players never learn it directly. It is just the distance between two notes. Once you can hear and name that distance, chords stop being shapes you memorize and start being sounds you understand.",
    "This guide walks through what an interval is, the names for every step from a minor second up to the octave, the difference between playing two notes together or one after the other, and how to start recognizing intervals by ear with a few reliable reference points.",
  ],
  sections: [
    {
      heading: "What an interval actually is",
      body: [
        "An interval is the distance between two pitches. You can measure that distance two ways, and both are worth knowing. The first is in half steps, which on a guitar means frets: one fret is one half step, two frets is a whole step, and so on. The second is in scale degrees, which counts letter names: from C up to E is a third because you pass through C, D, E.",
        "Both measurements describe the same gap from different angles. Half steps tell you the exact size; scale degrees tell you how the interval functions inside a key. A trained ear eventually stops counting and simply recognizes the sound, but counting is how everyone starts.",
      ],
    },
    {
      heading: "The names, from minor second to octave",
      body: [
        "Inside one octave there are twelve half steps, and each one has a name. The quality words (minor, major, perfect, augmented, diminished) describe the flavor of each distance. Here is the full ladder, counted in half steps from the lower note.",
        {
          list: [
            "Minor second: 1 half step. The tightest, most tense step.",
            "Major second: 2 half steps. A plain whole step, the distance between most scale notes.",
            "Minor third: 3 half steps. The core of a minor chord, darker in color.",
            "Major third: 4 half steps. The core of a major chord, brighter and warmer.",
            "Perfect fourth: 5 half steps. Stable and open, the sound of many opening chords.",
            "Tritone: 6 half steps. Restless and unresolved, sitting exactly halfway.",
            "Perfect fifth: 7 half steps. Wide, hollow, and strong, the backbone of power chords.",
            "Minor sixth: 8 half steps. Bittersweet and slightly aching.",
            "Major sixth: 9 half steps. Sweet and bright, a little more open than a sixth sounds on paper.",
            "Minor seventh: 10 half steps. Bluesy and unsettled, wanting to move.",
            "Major seventh: 11 half steps. Lush and close to home, one half step under the octave.",
            "Octave: 12 half steps. The same note again, higher.",
          ],
        },
        "Notice the pattern: seconds, thirds, sixths, and sevenths come in minor and major versions, while fourths, fifths, and the octave are called perfect. Perfect intervals are the most stable and consonant, which is why they show up in so much music across the world.",
      ],
    },
    {
      heading: "Melodic versus harmonic intervals",
      body: [
        "The same interval can arrive two ways, and the label tells you which. A melodic interval is two notes played one after the other, the way a melody moves from pitch to pitch. A harmonic interval is two notes played at the same time, the way the strings of a chord ring together.",
        "This matters for practice. Melodic intervals are usually easier to hear first, because your ear can track the jump from one note to the next. Harmonic intervals blend into a single combined sound, which takes more listening to pull apart. Training both is worth it: melodies are built from melodic intervals, and chords are built from harmonic ones.",
      ],
    },
    {
      heading: "How intervals build chords and scales",
      body: [
        "Everything larger than a single note is just a stack of intervals. A major chord is a root, a major third above it, and a perfect fifth above the root. Swap that major third for a minor third and the same fifth, and you have a minor chord. That one interval change is the entire difference between happy and sad in a basic triad.",
        "Scales work the same way. A major scale is a fixed pattern of whole steps and half steps: whole, whole, half, whole, whole, whole, half. Follow that pattern from any starting note and you spell a major scale in that key. Once you hear scales and chords as patterns of intervals rather than lists of notes, they transfer to every key automatically.",
      ],
    },
    {
      heading: "Recognizing intervals by ear",
      body: [
        "Ear recognition is a skill you build, not a gift you are born with. The reliable method is to anchor each interval to a memorable reference sound, then compare new intervals against those anchors until the sound alone is enough.",
        {
          list: [
            "The octave is the easiest: it is the same note higher, so it sounds like one pitch stacked on itself.",
            "The perfect fifth is wide and open, a little hollow, and very stable. It is the sound at the bottom of a power chord.",
            "The perfect fourth is close cousin to the fifth but sounds like it wants to rise rather than settle.",
            "The major third is bright and warm; the minor third right below it is darker. Comparing the two back to back is the fastest way to lock in both.",
            "The tritone is the odd one out: tense and unresolved, easy to spot once you have heard it a few times.",
          ],
        },
        "Practice in short, frequent sessions. Hear an interval, guess it, then check, and let the corrections teach you. Fretwork's free Ear Trainer has an interval drill that plays each distance and makes you commit to an answer before it tells you, which is exactly the loop that builds recognition over time.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is a music interval in simple terms?",
      a: "It is the distance between two notes. You can measure it in half steps (frets on a guitar) or in scale degrees (letter names), and both describe the same gap.",
    },
    {
      q: "What is the difference between a melodic and a harmonic interval?",
      a: "A melodic interval is two notes played one after the other, like a melody. A harmonic interval is two notes played at the same time, like part of a chord. The distance is identical; only the timing changes.",
    },
    {
      q: "Why are some intervals called perfect?",
      a: "The fourth, fifth, and octave are called perfect because they are the most stable and consonant. Seconds, thirds, sixths, and sevenths come in minor and major versions instead.",
    },
    {
      q: "How do intervals relate to chords?",
      a: "Chords are stacks of intervals. A major chord is a root, a major third, and a perfect fifth. Change the third from major to minor and you get a minor chord, which is why intervals are worth learning first.",
    },
    {
      q: "What is the fastest way to learn intervals by ear?",
      a: "Anchor each interval to a memorable reference sound, like the wide open perfect fifth or the same-note octave, then drill in short daily sessions. Guess first, then check, so the corrections train your ear.",
    },
  ],
  relatedTools: ["ear-trainer"],
  relatedGuides: ["ear-training-for-guitarists"],
};

export default guide;
