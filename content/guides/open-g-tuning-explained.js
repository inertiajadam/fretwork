/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "open-g-tuning-explained",
  title: "Open G Tuning Explained: Strum a Chord With No Fingers",
  description:
    "Open G tuning turns your open strings into a G major chord. Here is what it is, what it is good for, and how to tune into it from standard.",
  keyword: "open g tuning",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "Open G tuning retunes your guitar so that strumming the open strings gives you a full G major chord. Nothing fretted, nothing fancy: just six strings ringing out as one bright, resonant chord.",
    "This guide explains what Open G is, why so many blues, folk, and slide players love it, how to tune into it from standard, and how it quietly changes the way chords work under your fingers. Fretwork's free tuner includes Open G, so you can follow along string by string.",
  ],
  sections: [
    {
      heading: "What Open G tuning is",
      body: [
        "In Open G, the six strings are tuned, from low to high, to D G D G B D. Compare that to standard tuning, which is E A D G B E. Three of your strings stay exactly where they were, and three move down.",
        "Those six notes spell out a G major chord: the notes G, B, and D repeated across the neck. That is the whole idea behind an open tuning. Instead of the open strings forming a shape you have to fret around, they already form a chord you can play by doing nothing at all.",
      ],
    },
    {
      heading: "Why it says open, and why G",
      body: [
        "The word open means the chord sounds when the strings are open, with no fingers pressing down. The letter G tells you which chord that is. There are other open tunings named the same way, like Open D and Open E, but Open G is one of the most common and one of the friendliest to learn first.",
        "Because the tuning is built from a single chord, the whole neck reorganizes itself around that chord. Notes that were scattered in standard tuning line up in neat, repeating patterns, which is a big part of why the tuning feels so playable once your ear adjusts.",
      ],
    },
    {
      heading: "The one-finger barre trick",
      body: [
        "Here is the payoff that makes Open G click for most players. If the open strings sound a G chord, then laying one finger flat across all six strings at a given fret sounds a full major chord at that fret. This is called a barre.",
        "Slide that barre up and down and you move through major chords without changing your hand shape at all.",
        {
          list: [
            "Open strings, no barre: a G major chord",
            "Barre at the fifth fret: a C major chord",
            "Barre at the seventh fret: a D major chord",
            "Barre at the twelfth fret: G major again, one octave higher",
          ],
        },
        "One finger, the whole neck of major chords. That simplicity is why the tuning shows up so often in beginner-friendly songs and in music built on just a few chords.",
      ],
    },
    {
      heading: "What Open G is good for",
      body: [
        "Open G shines anywhere a droning, chord-rich sound helps. Slide players love it because a slide is essentially a movable barre: rest the slide across the strings and you get clean major chords up and down the neck with a smooth, vocal glide between them.",
        "Folk and country blues players reach for it because the extra open strings ring along while you pick, giving a fuller, more resonant sound than standard tuning with the same amount of effort. Fingerpickers can hold down a simple shape and let the open strings do half the work.",
        "It is also a gentle place to explore. Because so much sounds good with so little fretting, Open G rewards experimenting and playing by ear, even before you know much theory.",
      ],
    },
    {
      heading: "How to tune into Open G from standard",
      body: [
        "You only need to change three strings, and every change is a small step downward. Nothing gets tuned up, which is easier on your strings and your guitar.",
        {
          list: [
            "Lower the sixth string (low E) down two steps to D",
            "Lower the fifth string (A) down two steps to G",
            "Leave the fourth string (D) where it is",
            "Leave the third string (G) where it is",
            "Leave the second string (B) where it is",
            "Lower the first string (high E) down two steps to D",
          ],
        },
        "Work slowly and check each string as you go. Open Fretwork's free tuner, choose Open G, and let it confirm each note by ear and by the meter. When all six strings read D G D G B D, give the open strings a strum: you should hear a clear G major chord.",
      ],
    },
    {
      heading: "How it changes the way chords work",
      body: [
        "In standard tuning, chords are built from a handful of memorized shapes. In Open G, the logic flips. The open position is already a chord, so many chords become a matter of where you barre rather than which shape you grab.",
        "That trade has two sides, and it is worth being honest about both. You gain easy major chords all over the neck and a rich, ringing sound for very little effort. You give up the standard chord shapes you already know, so minor chords, sevenths, and other colors take some relearning in the new layout.",
        "The good news is that the patterns repeat cleanly, so once one chord makes sense, others nearby tend to follow. Most players find the tuning pays back the small effort quickly, especially for slide and for songs built on simple major chords.",
      ],
    },
  ],
  faqs: [
    {
      q: "What are the notes in Open G tuning?",
      a: "From the lowest string to the highest, Open G is D G D G B D. Those notes together spell a G major chord, which is why strumming the open strings sounds like G.",
    },
    {
      q: "Is Open G tuning good for beginners?",
      a: "Yes. Because a single finger barred across the strings gives a full major chord, beginners can play many songs with very little fretting, which makes it a friendly place to start with alternate tunings.",
    },
    {
      q: "Do I need special strings for Open G?",
      a: "No. Standard strings work fine. Three strings are tuned down a little, so they feel slightly looser than usual, but no gauge change is required for casual playing.",
    },
    {
      q: "How do I get back to standard tuning?",
      a: "Reverse the changes: raise the sixth, fifth, and first strings back up two steps each, to E, A, and E. Fretwork's tuner has a standard setting to check each string as you return.",
    },
    {
      q: "Why is Open G popular for slide guitar?",
      a: "A slide acts like a movable barre. Since the open strings already form a chord, resting a slide across a fret gives a clean major chord there, so you can glide between chords smoothly up and down the neck.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["alternate-guitar-tunings", "drop-d-tuning-explained"],
};

export default guide;
