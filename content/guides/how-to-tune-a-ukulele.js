/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "how-to-tune-a-ukulele",
  title: "How to Tune a Ukulele (Standard, Low-G, and Baritone)",
  description:
    "Learn how to tune a ukulele: standard gCEA with its reentrant high g, the mellow low-G option, and baritone DGBE. Tune by ear or with a free tuner.",
  keyword: "how to tune a ukulele",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "A ukulele that is even slightly out of tune sounds sour no matter how clean your chords are, so tuning is the first skill worth getting right. The good news is that most ukuleles use one simple tuning, and once you know the note names and one quirk about the top string, you can tune quickly and trust your ears.",
    "This guide covers the three tunings you are most likely to meet: standard gCEA, low-G, and baritone DGBE. It also explains the reentrant setup that makes a ukulele sound like a ukulele, and how Fretwork's free online tuner helps you land each string.",
  ],
  sections: [
    {
      heading: "Standard tuning: gCEA",
      body: [
        "Most soprano, concert, and tenor ukuleles are tuned gCEA, string by string from the one closest to your face to the one closest to the floor. Written as pitches, that is G4, C4, E4, and A4. The C string is the lowest sounding note, and the A string is the highest.",
        "A handy memory aid: strummed open, the four strings sound close to the old phrase people sing as My Dog Has Fleas. That rising and settling sound is the classic ukulele voice.",
        {
          list: [
            "String 4 (top, nearest your chin): g",
            "String 3: C",
            "String 2: E",
            "String 1 (bottom, nearest the floor): A",
          ],
        },
      ],
    },
    {
      heading: "The reentrant quirk: why the top string is high",
      body: [
        "Here is the part that surprises new players. On standard gCEA, the top string (g) is not the lowest note. It is tuned high, above the C and E strings, so the strings do not run simply low to high across the neck. This is called reentrant tuning, and it is written with a lowercase g to flag the high octave.",
        "Reentrant tuning is what gives the ukulele its bright, jangly ring. When you strum, the notes do not stack neatly from low to high, so chords shimmer instead of sounding like a small guitar. It also means melodies and picking patterns can jump octaves in a charming way, which is part of the instrument's character.",
      ],
    },
    {
      heading: "Low-G tuning: a linear option",
      body: [
        "If you want more low end, you can swap the high g string for a low-G string, tuned an octave down to G3. Now the strings run low to high in order (G, C, E, A), which is called linear tuning. Many players like low-G for fingerstyle, solo arrangements, and a fuller sound.",
        "Low-G is common on tenor ukuleles but works on concert and soprano too. You usually need a dedicated low-G string, since a standard high-g string will sound loose and dull tuned down that far. The note names for your chords do not change; only the octave of that one string does.",
      ],
    },
    {
      heading: "Baritone tuning: DGBE",
      body: [
        "The baritone ukulele is the larger member of the family, and it is tuned differently: DGBE, meaning D3, G3, B3, and E4. Guitar players will recognize these as the same pitches as the top four strings of a guitar, which makes the baritone an easy crossover instrument.",
        "Baritone is linear by default, running low to high, so it has a deeper, warmer tone than a soprano. If you already know guitar chord shapes for the D, G, B, and E strings, they transfer straight over. Just remember that a baritone chord shape does not match a gCEA shape, because the tuning is not the same.",
      ],
    },
    {
      heading: "How to tune by ear from a reference",
      body: [
        "You can always tune to a reliable reference pitch, whether that is a tuner, a piano, or another instrument. The idea is simple: play the reference note, play your string, and turn the tuning peg until the two match. If your string sounds lower than the reference, tighten it; if it sounds higher, loosen it.",
        {
          list: [
            "Start with the C string, since it is a stable center note to build from.",
            "Tune each remaining string to its target pitch (g, C, E, A for standard).",
            "Turn pegs slowly and in small amounts, then recheck; strings settle as they stretch.",
            "Play a few open chords and retune anything that drifted, especially on new strings.",
          ],
        },
        "New strings go out of tune often for the first day or two while they stretch, so expect to tune several times before they hold.",
      ],
    },
    {
      heading: "Tune with the Fretwork tuner",
      body: [
        "Fretwork's free online tuner listens through your microphone and shows you the note you are playing plus how sharp or flat it is, so you can tune by watching the needle settle to center. There is nothing to install and no account required.",
        "It supports all three ukulele tunings covered here: standard gCEA, low-G, and baritone DGBE. You can also tap a string on screen to hear its target pitch, which is perfect if you would rather tune by ear and match the sound. Pick your tuning, play a string, and adjust until it reads in tune.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is standard ukulele tuning?",
      a: "Standard tuning for soprano, concert, and tenor ukuleles is gCEA, from the top string to the bottom. The top g is tuned high, which is called reentrant tuning and gives the ukulele its bright sound.",
    },
    {
      q: "What is the difference between reentrant and low-G tuning?",
      a: "Reentrant tuning keeps the top string high (a high g), so the strings do not run low to high. Low-G replaces it with a string an octave down, giving a linear low-to-high order and a fuller, deeper tone.",
    },
    {
      q: "How is a baritone ukulele tuned?",
      a: "A baritone ukulele is tuned DGBE, the same pitches as the top four strings of a guitar. It is linear and deeper sounding, so guitar chord shapes for those strings transfer directly.",
    },
    {
      q: "Can I tune a ukulele without a tuner?",
      a: "Yes. Use any reliable reference pitch, such as a piano or another instrument, and match each string to its target note by ear. Tightening raises the pitch and loosening lowers it.",
    },
    {
      q: "Why does my new ukulele keep going out of tune?",
      a: "New strings stretch for the first day or two and will drift flat repeatedly until they settle. Retune often during that period, and they will begin to hold their pitch.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["how-to-tune-a-guitar"],
};

export default guide;
