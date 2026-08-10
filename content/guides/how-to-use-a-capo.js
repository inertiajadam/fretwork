/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "how-to-use-a-capo",
  title: "How to Use a Capo (and When Not To)",
  description:
    "A capo lets you play hard keys with easy open shapes. Here is how to place it, how to find the right fret, and the two-guitar layering trick.",
  keyword: "how to use a capo",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "A capo is a small clamp that bars every string at one fret so your open shapes ring out in a higher key. It looks like a shortcut, and in a way it is, but it is also a real tool that changes the sound and reach of the guitar. Used well, it turns awkward keys into familiar ones and lets two guitars weave around each other.",
    "This guide covers what a capo actually does, how to place it, how to pick the right fret for a key, and the moments when leaving it off is the better call. Fretwork's free Capo Calculator does the math for you, and this walks through the thinking behind it.",
  ],
  sections: [
    {
      heading: "What a capo actually does",
      body: [
        "A capo raises the pitch of every open string by the same amount. Clamp it at the second fret and all six strings sound two frets higher, so an open E becomes an F sharp, an open A becomes a B, and so on. The relationships between the strings never change, which is why your chord shapes keep working.",
        "That is the key idea: a shape you play against a capo is still that shape under your fingers, but the sound comes out in a higher key. Play an open G shape with the capo at the second fret and your hand thinks G while the room hears A. The capo becomes a movable nut, and everything above it behaves like a normal, shorter guitar.",
      ],
    },
    {
      heading: "How to place it on the neck",
      body: [
        "Position matters more than people expect. Set the capo just behind the fret wire, not on top of it and not back in the middle of the fret space. Sitting right behind the fret gives clean, buzz-free notes with the least clamping force.",
        {
          list: [
            "Place it square across the strings so it is parallel to the fret, not tilted.",
            "Keep it close behind the fret wire, roughly where your finger would fret a note.",
            "Use only as much tension as you need; too much pull can bend notes slightly sharp.",
            "After clamping, strum slowly and check each string for buzz, then nudge the capo if anything rings unclean.",
          ],
        },
        "Lower on the neck the frets are wider, so placement is more forgiving. Higher up the frets crowd together and a sloppy angle shows up fast, so take an extra second to seat it well.",
      ],
    },
    {
      heading: "Finding the right fret for a key",
      body: [
        "The logic is simple counting. Each fret raises the pitch one half step, so moving the capo up one fret raises your key by one half step. Decide which open-shape family you want to play in, then count the half steps from that shape's key up to your target key, and that number is your fret.",
        "Say a song is in B flat but you love the sound of open G shapes. From G up to B flat is three half steps, so the capo goes on the third fret and you play G shapes all night. Rather than count every time, open the Capo Calculator, enter the target key, and it lists every capo position along with the chord shapes each one gives you.",
      ],
    },
    {
      heading: "Playing hard keys with easy shapes",
      body: [
        "Keys like B flat, E flat, and A flat are full of barre chords on an open guitar, which wears out your hand and dulls the tone. A capo lets you trade those barres for ringing open chords in C, G, D, A, or E shapes.",
        "The payoff is not only comfort. Open strings ring longer and brighter than fretted ones, so a capo often gives a song more shimmer and sustain than the same chords barred lower down. Singers use this too: slide the capo up or down a fret or two to move a song into a range that fits the voice without relearning a single shape.",
      ],
    },
    {
      heading: "The two-guitar layering trick",
      body: [
        "When two guitarists play the same song, putting both capos in the same spot just doubles the same voicing. The richer approach is to sound the same key from two different capo positions.",
        "Suppose the song is in D. One player capos at the second fret and plays C shapes, while the other plays open D shapes with no capo. Both are in D, but their chords sit in different octaves and use different strings, so the parts stack instead of clash. High open voicings from the capoed guitar sparkle over the lower, fuller shapes of the other. The Capo Calculator makes this easy: pick your key and it shows every capo position and its shapes, so two players can choose spots that complement rather than copy each other.",
      ],
    },
    {
      heading: "When not to use a capo",
      body: [
        "A capo is not always the right answer. Reach for open shapes and skip the clamp when the situation calls for it.",
        {
          list: [
            "You need low bass notes below the capo; anything under the clamp is gone, so a capo at the fifth fret loses your low E through G sharp.",
            "The part lives up the neck anyway; barre chords and moved shapes may be cleaner than crowding a capo into high, narrow frets.",
            "You are still learning barre chords; leaning on a capo forever can quietly stall that skill, so treat it as a color, not a crutch.",
            "The guitar has tuning or intonation issues; a capo can pull notes sharp and make an already iffy setup sound worse.",
          ],
        },
        "Think of the capo as one option among several. It is wonderful for open, ringing keys and layered parts, and it is the wrong tool when you need the full range of the neck.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does a capo change the key I am playing in?",
      a: "Yes. It raises everything by the number of frets you place it up, so the same shapes come out in a higher key while your fingers keep doing what they already know.",
    },
    {
      q: "Where exactly should the capo sit?",
      a: "Just behind the fret wire, square across the strings, with only enough tension to stop buzzing. Sitting too far back or clamping too hard can cause buzz or pull notes sharp.",
    },
    {
      q: "How do I know which fret to use for a key?",
      a: "Count the half steps from your chosen open-shape key up to the target key; that number is the fret. The free Capo Calculator does this for you and lists every position.",
    },
    {
      q: "Can a capo make my guitar sound out of tune?",
      a: "It can. Clamping too hard or placing it poorly bends notes sharp, and a guitar with weak intonation shows it more with a capo. Retune after placing it if needed.",
    },
    {
      q: "Is using a capo cheating?",
      a: "No. It is a standard tool used on countless recordings for tone, range, and layering. It is worth learning barre chords too, so the capo stays a choice rather than a crutch.",
    },
  ],
  relatedTools: ["capo-calculator"],
  relatedGuides: ["how-to-change-key-in-a-song"],
};

export default guide;
