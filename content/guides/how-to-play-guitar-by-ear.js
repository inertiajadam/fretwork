/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "how-to-play-guitar-by-ear",
  title: "How to Play Guitar by Ear (A Practical Path)",
  description:
    "Learn how to play guitar by ear: find the key, hear chord progressions by number, use intervals for melodies, and expect honest trial and error.",
  keyword: "how to play guitar by ear",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "Playing by ear sounds like a gift some people are born with, but it is really a set of skills you can build one step at a time. The goal is simple: hear a piece of music and work out how to play it without reading a single chart. That takes practice, and it takes a little patience with yourself, but the path is clear and anyone can walk it.",
    "This guide gives you a practical order to work in: find the key first, learn to hear chord progressions by number, use intervals to track down melody notes, and expect plenty of trial and error along the way. Fretwork's free Ear Trainer is built to drill exactly these skills.",
  ],
  sections: [
    {
      heading: "Start by finding the key",
      body: [
        "Before you chase a single chord, find the home base of the music. Every song has a note that feels like rest, the place a melody wants to land when it is finished. Musicians call that the tonic, or the key.",
        "The fastest way to find it is to hum. Let the song play, then hum the note that feels most settled, the one you could hold at the very end without any tension. Now find that hummed note on the guitar by sliding around one string until your voice and the string match. That note is almost always your key.",
        "Once you know the key, everything else has a frame of reference. You are no longer guessing at random notes; you are listening for how each new sound relates to home.",
      ],
    },
    {
      heading: "Hear chord progressions by number",
      body: [
        "Most popular music leans on a small handful of chords built from the notes of the key. Instead of memorizing letters, learn to hear each chord by its number, counting up from the tonic as one.",
        "The one chord is home and feels stable. The four chord feels open and lifting. The five chord feels tense and eager to return home. The six chord (a minor chord in a major key) feels softer and a little sad. Trained ears learn these flavors so well that they can name a progression after one listen.",
        {
          list: [
            "One: home, resolved, the resting place.",
            "Four: bright and supportive, a step away from home.",
            "Five: tension that pulls strongly back toward one.",
            "Six: the relative minor, gentle and reflective.",
          ],
        },
        "Try playing a one, four, five, and six chord in a key you know, over and over, until each number has a feeling attached to it. After a while you will start recognizing those same feelings in the music you listen to.",
      ],
    },
    {
      heading: "Use intervals to find melody notes",
      body: [
        "A melody is just a string of notes, and the distance between any two notes is called an interval. If you can measure those distances by ear, you can trace a melody one step at a time.",
        "Start with the tonic you already found. Sing the first melody note, then ask how far it sits from home: is it a small step up, a bigger leap, or right back on the tonic? Move on the fretboard by that same distance and check whether the pitch matches what you are singing.",
        "The most useful intervals to know first are the small ones, since most melodies move by steps rather than large jumps. Learn the sound of a whole step and a half step, then the octave and the perfect fifth, and a surprising amount of everyday melody becomes readable by ear.",
      ],
    },
    {
      heading: "Expect trial and error",
      body: [
        "Playing by ear is not a magic trick where the right note appears instantly. It is a loop: you guess a note, you play it, you compare it to what you hear, and you adjust. Wrong guesses are not failures; they are information that tells you which direction to move.",
        "Give yourself permission to sound clumsy at first. The players who make this look effortless spent hundreds of quiet hours guessing wrong and correcting. Every miss you notice and fix is training your ear to guess closer next time.",
      ],
    },
    {
      heading: "Slow songs down and pull parts apart",
      body: [
        "Fast music hides its details. When a passage moves too quickly to follow, slow it down. Most listening apps and video players let you drop the speed without changing the pitch, which gives your ear time to catch each note and chord change.",
        "It also helps to listen for one part at a time. On a first pass, follow only the bass, since the lowest note often tells you the root of each chord. On the next pass, track just the melody. Layering your listening this way is far easier than trying to hear everything at once.",
        "Above all, keep singing what you hear. Your voice is the bridge between your ear and your hands: if you can sing a note, you are much closer to finding it on the guitar. Humming a line before you reach for it turns a vague sound into a clear target.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long does it take to learn to play guitar by ear?",
      a: "It varies, but most players notice real progress within a few months of steady, focused practice. Short daily sessions of finding keys, naming intervals, and picking out simple progressions beat occasional long ones.",
    },
    {
      q: "Do I need perfect pitch to play by ear?",
      a: "No. Perfect pitch is rare and not required. Playing by ear relies on relative pitch, which is hearing how notes relate to each other, and relative pitch is a trainable skill for everyone.",
    },
    {
      q: "Should I learn theory or ear training first?",
      a: "They support each other, so do both in small doses. A little theory (keys, chord numbers, intervals) gives your ear a vocabulary, while ear training makes that vocabulary something you can actually hear.",
    },
    {
      q: "What is the easiest way to start?",
      a: "Pick a simple song you know well, find its key by humming the home note, then work out the chords by ear one at a time. Slow the recording down and use Fretwork's Ear Trainer to sharpen the skills in between.",
    },
  ],
  relatedTools: ["ear-trainer"],
  relatedGuides: ["ear-training-for-guitarists", "music-intervals-explained"],
};

export default guide;
