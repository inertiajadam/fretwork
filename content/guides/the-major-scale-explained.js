/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "the-major-scale-explained",
  title: "The Major Scale Explained (The Do Re Mi Sound)",
  description:
    "The major scale is the do re mi sound behind most songs you know. Here is the pattern that builds it, why it defines a key, and how to play it.",
  keyword: "major scale",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "The major scale is the most familiar sound in Western music. It is the do re mi re mi you sang in school, the run of notes that feels bright, settled, and complete. Almost every melody you know leans on it, so learning it is less about memorizing something new and more about naming something your ear already trusts.",
    "This guide explains what the major scale is, the simple pattern of steps that builds it, how it defines a key and its seven scale degrees, and how to play it on the guitar as one movable shape. You can follow along with Fretwork's free Fretboard Explorer and its scale overlays.",
  ],
  sections: [
    {
      heading: "What the major scale actually is",
      body: [
        "A scale is just an ordered set of notes that a piece of music draws from. The major scale is a specific seven note set with a specific sound: open, cheerful, and resolved. When you sing do re mi fa sol la ti do, you are singing a major scale, and that final do landing back home is the sound of the scale completing itself.",
        "Because it is defined by a pattern rather than by any one starting note, the major scale exists in every key. Start on a different note, follow the same pattern, and you get the same familiar sound in a new place.",
      ],
    },
    {
      heading: "The pattern: whole steps and half steps",
      body: [
        "Everything about the major scale comes from the spacing between its notes. On the guitar, one fret is a half step, and two frets is a whole step. The major scale always follows this exact sequence of gaps from the starting note up to its octave:",
        {
          list: [
            "Whole, Whole, Half, Whole, Whole, Whole, Half",
            "A common shorthand is W W H W W W H",
          ],
        },
        "That is the whole recipe. Those two half steps, one between the third and fourth notes and one between the seventh and eighth, are what give the scale its particular pull toward home. Change the pattern and you get a different kind of scale; keep it and you always get major.",
      ],
    },
    {
      heading: "How a scale defines a key",
      body: [
        "When a song uses the C major scale as its home base, we say the song is in the key of C major. The scale is the pool of notes the melody and chords are built from, and the starting note, called the tonic or root, is the note that feels like resting place.",
        "The key is why a song can feel finished or unfinished. Land on the tonic and the ear relaxes. Stop on one of the other notes and the music feels like it still has somewhere to go. That sense of gravity, of notes wanting to return home, is the practical effect of choosing a key.",
      ],
    },
    {
      heading: "The seven scale degrees",
      body: [
        "Each note in the major scale has a number, one through seven, called its scale degree. The numbers matter more than the letter names, because they describe the same role in every key. The tonic is always degree one, whether you are in C, G, or F.",
        {
          list: [
            "1 tonic: home, the note that feels most resolved",
            "2 supertonic: one step above home",
            "3 mediant: the note that makes the scale sound major and bright",
            "4 subdominant: a gentle pull away from home",
            "5 dominant: strong and stable, second in importance to the tonic",
            "6 submediant: the root of the relative minor",
            "7 leading tone: a half step below home that leans hard toward the tonic",
          ],
        },
        "Thinking in degrees is what lets you move an idea from one key to another. A melody that runs 1 2 3 sounds the same in every key even though the letter names change.",
      ],
    },
    {
      heading: "A concrete example: C major",
      body: [
        "C major is the friendliest key to start with because it uses only natural notes, no sharps or flats. Starting on C and applying W W H W W W H gives you C, D, E, F, G, A, B, and then back to C.",
        "Notice where the half steps fall. E to F is a half step (one fret), and B to C is a half step, which matches the pattern exactly. Every other jump, like C to D or F to G, is a whole step. This is why C major lines up so neatly with the white keys on a piano, and it is a clean way to hear the pattern before you carry it into keys with sharps and flats.",
      ],
    },
    {
      heading: "Playing it on the guitar as a movable shape",
      body: [
        "The guitar has a real advantage here. Because the pattern is built from steps rather than fixed notes, one fingering shape works for every major scale. Learn the shape once, slide it up or down the neck, and the note you start on becomes the new key.",
        "A common starting point is a shape rooted on the low E string. Play it with the root on the eighth fret and you are in C major; move the same shape so the root sits on the third fret and you are in G major, with no change to your fingers.",
        {
          list: [
            "Learn one root position shape slowly, one string at a time.",
            "Say the scale degrees aloud (1 2 3 4 5 6 7) as you play, not just the frets.",
            "Move the whole shape to a new root and confirm it still sounds major.",
            "Open the Fretboard Explorer, turn on the major scale overlay, and watch the notes light up so you can connect the shape to the pattern.",
          ],
        },
        "The goal is not speed at first. It is hearing that the shape always produces the same do re mi sound, and trusting that the pattern travels with you anywhere on the neck.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the major scale pattern?",
      a: "It is a fixed sequence of whole steps and half steps: whole, whole, half, whole, whole, whole, half, often written W W H W W W H. Follow it from any starting note and you get that note's major scale.",
    },
    {
      q: "Why does C major have no sharps or flats?",
      a: "Because the natural notes C D E F G A B already line up with the major scale pattern. The half steps land naturally at E to F and B to C, so no sharps or flats are needed.",
    },
    {
      q: "What are scale degrees?",
      a: "They are the numbers one through seven given to each note of the scale. They describe each note's role, like tonic or dominant, and stay the same in every key even though the letter names change.",
    },
    {
      q: "Do I need to learn a different scale shape for every key?",
      a: "No. On the guitar the major scale is a movable shape. Learn one fingering, then slide it so the root sits on a new note, and you are playing that new key with the same fingers.",
    },
    {
      q: "How is the major scale different from the minor scale?",
      a: "Both use seven notes, but the order of whole and half steps differs. The major scale has its bright third degree, while the natural minor lowers the third, sixth, and seventh, which gives it a darker sound.",
    },
  ],
  relatedTools: ["fretboard-explorer"],
  relatedGuides: ["guitar-scales-for-beginners", "the-circle-of-fifths-explained"],
};

export default guide;
