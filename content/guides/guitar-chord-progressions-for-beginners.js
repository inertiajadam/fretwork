/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "guitar-chord-progressions-for-beginners",
  title: "Guitar Chord Progressions for Beginners: Start With Two",
  description:
    "Two simple chord progressions cover a huge share of the songs you love. Learn the I IV V and I V vi IV by number so they work in any key.",
  keyword: "guitar chord progressions for beginners",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "A chord progression is just a small group of chords played in a repeating order. Learn to see progressions as patterns instead of a random list of chords, and suddenly you can play along with a huge share of popular music using only a handful of shapes.",
    "This guide covers what a progression is, two patterns that cover an enormous amount of songs, why they sound good, and how to practice them so they feel natural. You can loop every example in any key with Fretwork's free Progression Player as you read.",
  ],
  sections: [
    {
      heading: "What a chord progression actually is",
      body: [
        "A song rarely sits on one chord. It moves between a few chords in a set order, then repeats that order for the next verse or chorus. That repeating order is the progression. Once you know the pattern, you can hear it coming, which is why a good progression feels familiar even the first time you play it.",
        "The trick that makes progressions portable is naming the chords by number instead of by letter. Numbers describe the relationship between the chords, so the same pattern works no matter which key you play it in.",
      ],
    },
    {
      heading: "Why we use numbers, not just chord names",
      body: [
        "Every major key is built from seven notes, and each note gives you a chord. We number those chords with Roman numerals, one through seven. Uppercase means a major chord and lowercase means a minor chord.",
        "In the key of G, the numbers line up like this:",
        {
          list: [
            "I is G (major)",
            "IV is C (major)",
            "V is D (major)",
            "vi is Em (minor)",
          ],
        },
        "In the key of C, the same numbers give you C for I, F for IV, G for V, and Am for vi. The letters change with the key, but the pattern stays identical. Learn one progression by number and you have really learned it in all twelve keys.",
      ],
    },
    {
      heading: "The I IV V progression",
      body: [
        "This is the oldest workhorse in popular music. Three major chords, all bright and stable, and they resolve back to the I so cleanly that it feels like coming home.",
        "In G that is G, C, D. In C it is C, F, G. Try playing four beats on each chord, in the order I, IV, V, then back to I, and loop it.",
        "It sounds good because of the relationships between the chords. The V chord creates tension that naturally wants to fall back to the I, and the IV chord is a gentle step away that makes the return feel earned. Your ear expects the resolution, and the progression delivers it.",
      ],
    },
    {
      heading: "The I V vi IV progression",
      body: [
        "If the I IV V feels classic, this one feels modern. It shows up constantly in pop, folk, and worship music, and part of its charm is the minor vi chord, which adds a touch of warmth or melancholy without ever sounding sad.",
        "In G it is G, D, Em, C. In C it is C, G, Am, F. Give each chord four beats and let it loop.",
        "The magic here is the vi chord. After two bright major chords, dropping to the relative minor colors the whole loop, and the IV then lifts you smoothly back to the top. It never fully resolves the way I IV V does, which is exactly why it loops so well and keeps pulling you forward.",
      ],
    },
    {
      heading: "Practicing with a steady strum",
      body: [
        "The chords matter less than your timing. A simple progression played in steady time sounds musical; a fancy one played with lurching changes does not. Your first job is to keep the beat moving even while your fingers catch up.",
        {
          list: [
            "Start slow. Pick a tempo where you can change chords without stopping the strum.",
            "Use one simple pattern at first, such as four even down strums per chord.",
            "Count out loud: one, two, three, four, and change on beat one of the next bar.",
            "If a chord change is late, keep strumming anyway and land the next one on time. A missed note in rhythm beats a perfect note out of time.",
            "Change chords a hair early. Lift your fingers just before beat four so the new shape is ready.",
          ],
        },
        "Open the Progression Player, choose a key, and loop the pattern with a full backing band behind you. Playing along with drums and bass makes the beat obvious and turns practice into something you actually want to keep doing.",
      ],
    },
    {
      heading: "Moving between progressions",
      body: [
        "Once both patterns feel comfortable on their own, notice how much they share. Both use I, IV, and V. The I V vi IV just swaps in the vi chord and reorders things. That overlap is why you can glide from one to the other inside the same key without learning anything new.",
        "A natural next step is to explore how these chords relate around the Circle of Fifths. The circle lays out the keys and their chords in an order that shows why I, IV, and V sit so close together and sound so at home with each other. Fretwork's Circle of Fifths tool lets you pick any key and see its numbered chords instantly, so you can build your own progressions with confidence.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the easiest chord progression for a beginner?",
      a: "The I IV V is the friendliest starting point because it uses three major chords that resolve cleanly. In G that is G, C, and D. Loop them in a steady rhythm and you already sound like a song.",
    },
    {
      q: "Why do these progressions sound good in any key?",
      a: "Because the numbers describe the relationship between the chords, not the specific notes. The I to V tension and the pull back home stay the same in every key, so the pattern travels while only the chord letters change.",
    },
    {
      q: "How long until a progression feels natural?",
      a: "Most beginners can loop a four-chord progression in a slow steady rhythm within a week of short daily practice. Speed and smooth changes come with time. Keeping the beat steady matters more than playing fast.",
    },
    {
      q: "Do I have to learn theory to use these?",
      a: "No. You can play both progressions purely by shape and ear. The numbers are just a shortcut that helps later, when you want to move a progression into a new key or write your own.",
    },
    {
      q: "What should I practice these with?",
      a: "A metronome or a backing track keeps you honest about timing. Fretwork's Progression Player loops any progression in any key with a full backing band, which makes staying in time much easier and more fun.",
    },
  ],
  relatedTools: ["progression-player", "circle-of-fifths"],
  relatedGuides: ["the-circle-of-fifths-explained"],
};

export default guide;
