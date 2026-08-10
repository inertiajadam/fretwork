/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "how-to-read-a-chord-diagram",
  title: "How to Read a Chord Diagram (A Beginner's Guide)",
  description:
    "A chord diagram is a tiny map of the guitar neck. Learn what the lines, dots, numbers, O marks, and X marks mean so you can play any chord you find.",
  keyword: "how to read chord diagrams",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "Almost every chord you will ever learn is drawn the same way: as a small grid of lines and dots called a chord diagram, or chord box. Once you can read one, you can pick up nearly any song book, website, or app and know exactly where to put your fingers.",
    "This guide walks through every part of a chord diagram in plain language, then points you to Fretwork's free Chord Library, where you can see real chords drawn as diagrams with their notes and intervals labeled.",
  ],
  sections: [
    {
      heading: "What a chord diagram is",
      body: [
        "A chord diagram is a picture of a small section of the guitar neck, turned upright so it stands vertically on the page. Imagine standing your guitar on the floor with the headstock pointing at the ceiling, then looking straight at the strings. That is the view a chord diagram gives you.",
        "Because it shows only the few frets a chord uses, the diagram stays small and easy to read. Everything you need to play the chord fits inside that little grid: which strings to press, where to press them, which fingers to use, and which strings to leave alone.",
      ],
    },
    {
      heading: "The lines: strings and frets",
      body: [
        "The grid is made of two sets of lines, and it helps to learn what each one represents before anything else.",
        {
          list: [
            "The vertical lines are the six strings. The line on the far left is your lowest, thickest string (low E), and the line on the far right is your highest, thinnest string (high E).",
            "The horizontal lines are the frets, the metal bars that divide the neck. The spaces between them are where your fingers actually press.",
            "The thick line across the very top is the nut, the piece at the top of the neck where the strings leave the headstock. It tells you the diagram is showing the first few frets.",
          ],
        },
        "So the diagram is read from left to right for strings and from top to bottom for frets. Low string on the left, high string on the right, nut at the top.",
      ],
    },
    {
      heading: "The dots and finger numbers",
      body: [
        "The dots are the heart of the diagram. Each dot sits inside a space between two frets and tells you to press that string down at that spot.",
        "Most diagrams also tell you which finger to use. A number placed inside a dot, or just below the diagram under that string, names the finger: 1 is your index finger, 2 is your middle finger, 3 is your ring finger, and 4 is your little finger. Your thumb is almost never numbered.",
        "Read the dots one string at a time. Find the string, see which space the dot sits in, and press there with the finger the number asks for. Take it slowly at first; speed comes later.",
      ],
    },
    {
      heading: "The O and X marks above the strings",
      body: [
        "Just above the nut, at the top of each string, you will often see a small symbol. These two marks tell you what to do with strings you are not pressing down.",
        {
          list: [
            "An O above a string means play it open. Strum or pick that string without pressing any fret, and let it ring.",
            "An X above a string means do not play it. Mute it or skip it so it stays silent, usually by lightly touching it with a finger already on the neck.",
          ],
        },
        "These marks matter as much as the dots. A chord can sound wrong simply because an X string was left ringing, so it is worth checking them every time you learn a new shape.",
      ],
    },
    {
      heading: "The number beside the diagram",
      body: [
        "Many chords are played higher up the neck, past the first few frets. Instead of drawing a tall diagram all the way from the nut, the diagram shifts up and shows only the frets that matter.",
        "When that happens, you will see a number to the side of the diagram, usually next to the top fret. That number tells you which fret the diagram starts on. A small 5 next to the top row means the top space is the fifth fret, not the first.",
        "One clue confirms it: when a diagram starts higher up the neck, the thick nut line at the top is usually replaced by a normal thin line, because the nut is no longer in view. Always glance for a side number before assuming a chord lives at the top of the neck.",
      ],
    },
    {
      heading: "Practice with real diagrams",
      body: [
        "Reading about diagrams only takes you so far. The fastest way to get comfortable is to look at real chords and play them one at a time.",
        "Fretwork's free Chord Library shows a wide range of chords as clear diagrams, and it goes a step further by labeling the notes and intervals in each shape. That means you can see not just where your fingers go, but what each string is actually sounding, which quietly builds your understanding of how chords are put together.",
        "Open a chord you already know, read its diagram top to bottom, and check that the dots, O marks, and X marks match what your hands do. Once the familiar ones line up, reach for a new shape and read it the same way.",
      ],
    },
  ],
  faqs: [
    {
      q: "Which way do the strings go on a chord diagram?",
      a: "The vertical lines are the strings, read left to right. The far left line is your lowest, thickest string (low E), and the far right line is your highest, thinnest string (high E).",
    },
    {
      q: "What do the O and X above a chord diagram mean?",
      a: "An O means play that string open, without pressing any fret. An X means do not play that string; mute it or skip it so it stays silent.",
    },
    {
      q: "What do the numbers on a chord diagram mean?",
      a: "Numbers in or below the dots tell you which finger to use: 1 index, 2 middle, 3 ring, 4 little. A number to the side of the diagram tells you which fret the diagram starts on.",
    },
    {
      q: "How do I know if a chord is played higher up the neck?",
      a: "Look for a number beside the diagram, usually next to the top fret. If it says something like 5, the diagram starts at the fifth fret rather than at the nut.",
    },
    {
      q: "What is the thick line at the top of a chord diagram?",
      a: "That thick line is the nut, the top edge of the neck. When a chord is played higher up, the nut is out of view and the top line becomes a normal thin fret line instead.",
    },
  ],
  relatedTools: ["chord-library"],
  relatedGuides: ["barre-chords-explained"],
};

export default guide;
