/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "alternate-guitar-tunings",
  title: "Alternate Guitar Tunings: A Practical Overview",
  description:
    "A plain guide to the most common alternate guitar tunings, what each one is good for, and how to switch between them safely with a tuner.",
  keyword: "alternate guitar tunings",
  updated: "2026-08-10",
  readMins: 7,
  intro: [
    "Standard tuning is where almost everyone starts, and it will carry you a long way. But at some point you hear a song that rings in a way your guitar just will not, and the reason is usually simple: the player retuned the strings. That is what alternate guitar tunings are, and they open up sounds that are hard or impossible to reach in standard.",
    "This guide walks through the tunings you will meet most often, what each one is good for, and how to change tunings without hurting your guitar or your ears. You can follow along with Fretwork's free tuner, which already includes every tuning below.",
  ],
  sections: [
    {
      heading: "A quick refresher on standard tuning",
      body: [
        "Standard tuning is EADGBE, from the thick low string to the thin high one. Every other tuning here is described the same way, low string first, so you always know which peg to turn.",
        "When a tuning lowers a string, you turn its peg to loosen it. When a tuning raises a string, you tighten it. Raising pitch adds tension, so it pays to go slowly and check often, which is exactly what a tuner is for.",
      ],
    },
    {
      heading: "Drop D: one string, a lot of range",
      body: [
        "Drop D is DADGBE. You take only the low E string and drop it down a whole step to D. Everything else stays exactly where it was in standard.",
        "That single change does two useful things. It gives you a lower, heavier bottom note, and it lets you play a power chord on the bottom three strings with one finger laid flat across a single fret. Rock and metal players love it for the weight and the easy chord shapes, but it is just as friendly for folk and acoustic playing because most of your standard chord shapes still work.",
        "Because only one string moves, Drop D is the easiest alternate tuning to try, and the fastest to undo when you want standard back.",
      ],
    },
    {
      heading: "What open tunings are, and why people use them",
      body: [
        "An open tuning is set up so that strumming all six open strings sounds a full chord on its own, with no fretting hand at all. Tune to an open chord and the guitar is already playing music before you touch a fret.",
        "This makes open tunings a natural fit for slide guitar, since laying a slide straight across the strings at any fret gives you a clean major chord. They are also popular in folk, blues, and fingerstyle playing, where droning open strings and simple one-finger chord shapes create a big, ringing sound.",
        {
          list: [
            "Open G is DGDGBD. Strum the open strings and you get a G major chord. It has a warm, rootsy feel and is a classic home for slide and blues.",
            "Open D is DADF#AD. The open strings sound a D major chord. It tends to sound deep and resonant, and it is a favorite for expressive slide and fingerstyle work.",
          ],
        },
        "Once you are in an open tuning, a barre laid flat across any single fret gives you another major chord, which is why these tunings feel so immediate. The trade off is that your familiar standard chord shapes no longer apply, so there is some relearning involved.",
      ],
    },
    {
      heading: "DADGAD: open but not quite a chord",
      body: [
        "DADGAD is its own thing. Reading low to high, the strings are D, A, D, G, A, D. Strummed open, it does not spell a plain major chord; instead it rings out as a suspended, open sound that is neither clearly major nor minor.",
        "That ambiguity is the appeal. DADGAD is a staple of Celtic and modern acoustic fingerstyle because the droning open strings sit happily under almost any melody, and simple shapes produce lush, atmospheric chords. It is a great tuning to explore when you want your guitar to sound less like a set of chords and more like a small ensemble.",
      ],
    },
    {
      heading: "Half step down: same shapes, different feel",
      body: [
        "Half step down, often written as E flat standard, keeps the exact pattern of standard tuning but lowers every string by one fret's worth of pitch. From low to high that is Eb, Ab, Db, Gb, Bb, Eb, though most players just think of it as everything down a half step.",
        "Nothing about your chord shapes or scales changes, because the relationships between the strings stay identical. What changes is the overall feel: the strings are a touch looser and easier to bend, and the guitar sounds slightly darker and warmer. Plenty of bands tune here, sometimes to suit a singer's range and sometimes just for the vibe.",
        "It is also a gentle first step into retuning, since you are not learning any new shapes at all.",
      ],
    },
    {
      heading: "Retuning safely and using a tuner",
      body: [
        "Changing tunings is safe when you do it with a little care. The main thing to respect is tension: strings and necks do not like sudden, large changes, so move in small turns and let the guitar settle.",
        {
          list: [
            "Turn pegs slowly and listen. Pluck the string as you go so you can hear the pitch rise or fall.",
            "When lowering a string, you can go a bit past your target and come back up, which helps the tuning hold.",
            "When raising a string, sneak up on the pitch rather than yanking it, to avoid over tightening.",
            "Retune in a couple of passes. Strings pull on each other, so after the first round, check them all again.",
            "Use a tuner every time. Your ear can get you close, but a tuner confirms you are on the right note, especially for tunings with a sharp like Open D's F#.",
          ],
        },
        "Fretwork's free tuner has presets for standard, Drop D, Open G, Open D, DADGAD, and half step down, so you can pick a tuning and match each string by sight and sound. When you are done playing, the same tuner makes it just as easy to return to standard.",
      ],
    },
  ],
  faqs: [
    {
      q: "Will alternate tunings damage my guitar?",
      a: "Not if you retune gently. Small, gradual peg turns and a tuner keep tension in a safe range. The tunings here are all common practice and well within what a normal guitar handles every day.",
    },
    {
      q: "Which alternate tuning should I learn first?",
      a: "Drop D or half step down. Drop D changes only one string, and half step down keeps every chord shape the same, so both let you hear a new sound without relearning the neck.",
    },
    {
      q: "What does an open tuning actually mean?",
      a: "It means the open strings are tuned to sound a chord on their own. Strum without fretting anything and you get a full major chord, which is why open tunings suit slide and folk playing.",
    },
    {
      q: "Do I need special strings for these tunings?",
      a: "For the tunings here, no. Standard strings handle Drop D, the open tunings, DADGAD, and half step down fine. Players who tune much lower sometimes choose heavier strings, but that is beyond these common setups.",
    },
    {
      q: "How do I get back to standard tuning?",
      a: "Bring each lowered string back up to its standard note and each raised string back down, checking with a tuner as you go. Fretwork's tuner has a standard preset that makes returning quick.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["drop-d-tuning-explained", "how-to-tune-a-guitar"],
};

export default guide;
