/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "rock-guitar-for-beginners",
  title: "Rock Guitar for Beginners: Your First Riffs and Solos",
  description:
    "Start playing rock guitar with power chords, palm muting, simple low-string riffs, the minor pentatonic, and a little distortion. A plain, honest first path.",
  keyword: "rock guitar for beginners",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "Rock guitar sounds big and complicated from the outside, but the parts that make it work are small and learnable. You do not need fast fingers or years of theory. You need a handful of movable shapes, a steady right hand, and a little distortion to glue it together.",
    "This guide walks you through a real beginner path: power chords and how to move them, palm muting and downstroke drive, simple riffs built on the low strings, the minor pentatonic for soloing, and basic tone. You can open Fretwork's free Chord Library and Fretboard Explorer alongside it to see every shape.",
  ],
  sections: [
    {
      heading: "Power chords: the whole engine of rock",
      body: [
        "A power chord is the smallest, toughest shape in rock. It uses only two notes, the root and the fifth, often with the root doubled an octave higher. Because it leaves out the third, it is neither major nor minor, which is exactly why it sits so well under distortion: it stays clean and punchy where a full chord would turn to mud.",
        "The standard shape roots on the low E or A string. Your first finger holds the root, and your third finger (with the fourth alongside it if you want the octave) reaches two frets up on the next string. That is the entire shape.",
        {
          list: [
            "Root on the low E string: the fret you hold names the chord (fifth fret is A, third fret is G).",
            "Root on the A string: same shape, one string over (fifth fret is D, third fret is C).",
            "Keep the shape identical and just slide it; the fretting hand barely changes.",
          ],
        },
      ],
    },
    {
      heading: "Moving power chords around the neck",
      body: [
        "The best thing about a power chord is that it is movable. One shape covers every chord you need because nothing about your fingers changes when you slide it. Learn the note names along the low E and A strings and you instantly know where every power chord lives.",
        "Practice moving between a few of them slowly, lifting the pressure just enough to glide without lifting off the strings completely. Aim for clean landings before you aim for speed. Fretwork's Fretboard Explorer is a good place to see those root notes light up so the shifts stop feeling like guesswork.",
      ],
    },
    {
      heading: "Palm muting and downstroke drive",
      body: [
        "Rhythm is where rock guitar lives, and the right hand carries it. Two techniques do most of the work. The first is palm muting: rest the edge of your picking hand lightly on the strings right where they meet the bridge. This tightens the sound into a chugging thump instead of a ringing chord. Move the hand slightly toward the neck for more mute, toward the bridge for more ring.",
        "The second is steady downstrokes. Driving, aggressive rhythm parts are usually all downstrokes, because they hit with more weight and keep every note even. It is tiring at first, so start slow with a metronome and let stamina build.",
        {
          list: [
            "Anchor the palm gently; too much pressure kills the note, too little lets it ring.",
            "Keep downstrokes even in volume, not just in time.",
            "Alternate muted and open chords to hear the contrast that makes riffs breathe.",
          ],
        },
      ],
    },
    {
      heading: "Building your first riffs",
      body: [
        "A riff is just a short, repeatable idea, and most classic rock riffs are built from the low strings using power chords and single notes. You already have the pieces. Start with two or three power chords and a rhythm you can feel, then add a couple of single notes between them for movement.",
        "The low E and A strings are your workshop. Palm mute a repeated root note to create a pulse, then answer it with a power chord for a lift. That call-and-answer shape, a muted low pulse followed by a ringing chord, is the backbone of countless riffs. Keep it simple; a riff that grooves beats a riff that impresses.",
      ],
    },
    {
      heading: "The minor pentatonic for soloing",
      body: [
        "When you are ready to play lead, the minor pentatonic scale is the doorway. It has only five notes per octave, it sits under your fingers in one compact box shape, and it sounds right over rock and blues almost anywhere you land. This is the scale behind a huge share of rock solos.",
        "Learn the first box shape rooted on the low E string, then practice it slowly, one note per beat, up and down. Once the shape is comfortable, stop running it like a drill and start making short phrases: three or four notes, a pause, then an answer. Space matters as much as notes. The Fretboard Explorer can show the pentatonic pattern laid over the neck so you can see how it connects to the power chords you already know.",
      ],
    },
    {
      heading: "Getting a basic rock tone",
      body: [
        "Rock tone starts with a little distortion, and a little goes further than beginners expect. Distortion adds grit and sustain, but too much smears everything together and hides mistakes and dynamics alike. Set enough that a power chord sounds thick and singing, then back it off until you can still hear each string.",
        "Beyond gain, keep it plain: roll your guitar's volume knob down slightly to clean up the sound, and lean on the bridge pickup for a brighter, cutting rhythm tone. You do not need a wall of pedals. A single overdrive or your amp's own gain, a decent set of strings, and clean fretting will get you a genuine rock sound while you learn.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need an electric guitar to play rock?",
      a: "It helps, because distortion and palm muting are built around an electric and amp. You can practice every shape and riff on an acoustic, but the classic rock sound really comes alive on an electric with a little gain.",
    },
    {
      q: "Are power chords easier than full chords?",
      a: "Usually, yes. A power chord uses two or three notes in one movable shape, so there is far less for the fretting hand to manage than an open or barre chord. Many beginners find their first riffs faster this way.",
    },
    {
      q: "Why does the minor pentatonic work for rock solos?",
      a: "It leaves out the notes most likely to clash, so its five notes sound stable over rock and blues backing. That forgiving quality, plus one easy box shape, is why so many solos start here.",
    },
    {
      q: "How much distortion should a beginner use?",
      a: "Less than you think. Enough for thickness and sustain, but not so much that the strings blur together. If you cannot hear each note in a power chord, roll the gain back.",
    },
    {
      q: "How long until I can play a real riff?",
      a: "Many players get a simple two-chord riff going in their first week or two. Clean power chords and steady downstrokes come first; speed and solos build from there with regular short practice.",
    },
  ],
  relatedTools: ["chord-library", "fretboard-explorer"],
  relatedGuides: ["power-chords-explained", "the-pentatonic-scale-explained"],
};

export default guide;
