/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "blues-guitar-for-beginners",
  title: "Blues Guitar for Beginners: The 12-Bar Form, the Scale, and the Feel",
  description:
    "A clear starting path into blues guitar: the 12-bar form, seventh chords, the pentatonic and blues scale, the shuffle feel, and bends that sing.",
  keyword: "blues guitar for beginners",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "Blues is one of the friendliest places to start on guitar because so much of it comes from a small set of ideas that keep repeating. Learn one chord progression, one scale, and one rhythmic feel, and you already have enough to play along and start sounding like yourself.",
    "This guide walks through the core pieces in order: the 12-bar form, the chords that fill it, the scales that sit on top, the shuffle feel that drives it, and the small expressive moves that make a single note feel alive. You can practice the progressions with Fretwork's free Progression Player and map every note with the Fretboard Explorer.",
  ],
  sections: [
    {
      heading: "The 12-bar blues form",
      body: [
        "Almost all beginner blues rests on one repeating shape called the 12-bar blues. It is twelve measures long, built from just three chords, and it loops over and over. Those three chords are numbered by where they sit in the key: the I (one), the IV (four), and the V (five). In the key of A, that is A, D, and E.",
        "The most common layout gives four bars of the I chord, two bars of the IV, two bars back on the I, then one bar of the V, one bar of the IV, and a final two bars that settle on the I (often with a small turnaround to lead back to the top). Once your ear knows this shape, you can hear it coming in countless songs.",
        {
          list: [
            "Bars 1 to 4: the I chord",
            "Bars 5 to 6: the IV chord",
            "Bars 7 to 8: the I chord",
            "Bar 9: the V chord",
            "Bar 10: the IV chord",
            "Bars 11 to 12: the I chord, with a turnaround back to the start",
          ],
        },
      ],
    },
    {
      heading: "Dominant seventh chords give it the sound",
      body: [
        "Plain major chords work, but the blues gets its flavor from dominant seventh chords, written with a 7 after the letter, like A7, D7, and E7. A dominant seventh adds one extra note to a major chord: the flatted seventh. That single note creates a slightly unsettled, bluesy tension that never fully resolves, which is exactly the mood the style lives in.",
        "What makes the blues unusual is that all three chords can be dominant sevenths at once. In most music only the V chord is a seventh, but here the I and IV take the same treatment. That shared tension is a big part of why a blues sounds like a blues rather than a folk or pop tune.",
      ],
    },
    {
      heading: "The minor pentatonic and the blues scale",
      body: [
        "For soloing, the minor pentatonic scale is home base. It has five notes and one very common box shape on the neck, and it fits over the whole 12-bar form without needing to change as the chords move. That forgiving quality is why it is the first scale most blues players learn.",
        "The blues scale is the minor pentatonic with one note added: the flatted fifth, often called the blue note. It is a passing tone, meaning it sounds best when you move through it quickly rather than resting on it. Slipping in and out of that blue note is one of the fastest ways to make a simple line sound like the blues. Open the Fretboard Explorer to see both scales laid out and watch how the blues scale is just the pentatonic with that one extra dot.",
      ],
    },
    {
      heading: "The shuffle feel",
      body: [
        "Rhythm matters as much as the notes. Most blues uses a shuffle feel, sometimes called a swing feel. Instead of dividing each beat into two even halves, you divide it into a long part and a short part, giving the groove a rolling, loping motion rather than a straight march.",
        "You can hear this in the steady chord parts that push a blues along, where the picking hand rocks in that long-short pattern. The best way to internalize it is to play along with a groove that already swings. Set the Progression Player to its 12-bar blues backing, let the shuffle carry you, and match your strumming to what you hear before worrying about lead lines.",
      ],
    },
    {
      heading: "Bends, slides, and vibrato",
      body: [
        "The blues is a vocal style, and guitarists imitate the human voice with three main moves. A bend pushes a string across the fret to raise its pitch, letting one note slide up into another the way a singer scoops toward a word. A slide moves your finger along the string from one fret to the next while the note keeps ringing. Vibrato is a small, repeated wobble in pitch that adds warmth and sustain to a held note.",
        "These are where feel lives, so it is worth going slow. Aim a bend at a specific target pitch rather than pushing randomly, and keep your vibrato even. A single well-shaped note with a clean bend and steady vibrato often says more than a fast run of straight ones.",
      ],
    },
    {
      heading: "Call and response phrasing",
      body: [
        "Blues melodies are usually built as a conversation. You play a short musical phrase (the call), leave a little space, then answer it with a second phrase (the response). This back and forth grew out of the vocal traditions the blues came from, and it keeps a solo from turning into an unbroken stream of notes.",
        "For a beginner, the practical lesson is to play less. Say a small idea, stop and breathe, then reply to it. Those gaps of silence let each phrase land and give your solo shape. Try trading calls and responses over the Progression Player: play a phrase in one line of the 12-bar form, then answer it in the next.",
      ],
    },
  ],
  faqs: [
    {
      q: "What should I learn first to play blues guitar?",
      a: "Start with the 12-bar blues form and its three seventh chords, then add the minor pentatonic scale for soloing. Those two pieces alone let you both back up and improvise over most beginner blues.",
    },
    {
      q: "What is the difference between the minor pentatonic and the blues scale?",
      a: "The blues scale is the minor pentatonic with one extra note added, the flatted fifth or blue note. That note is a passing tone that sounds best when you move through it quickly rather than landing on it.",
    },
    {
      q: "Do I need to know music theory to play the blues?",
      a: "No. You can learn the 12-bar form and the pentatonic box purely by shape and by ear. A little theory helps later, but the blues is a great style to learn hands first and explanations second.",
    },
    {
      q: "What is a shuffle feel?",
      a: "A shuffle divides each beat into a long part and a short part instead of two even halves, giving the groove a rolling swing. Playing along with a backing track that already shuffles is the quickest way to feel it.",
    },
    {
      q: "How do I make my blues solos sound more expressive?",
      a: "Lean on bends, slides, and vibrato to imitate a singing voice, and phrase in call and response so you leave space between ideas. One well-shaped note with clean vibrato often beats a fast run of straight ones.",
    },
  ],
  relatedTools: ["progression-player", "fretboard-explorer"],
  relatedGuides: ["the-12-bar-blues-explained", "the-pentatonic-scale-explained"],
};

export default guide;
