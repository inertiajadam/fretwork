/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "slide-guitar-for-beginners",
  title: "Slide Guitar for Beginners: A Simple First Lesson",
  description:
    "Slide guitar sounds hard but starts simple. Learn what a slide is, which finger to wear it on, the best open tunings, and how to fret clean notes.",
  keyword: "slide guitar",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "Slide guitar is the vocal, singing sound you hear when a note glides smoothly from one pitch to another instead of jumping fret to fret. It is made with a small tube, called a slide, worn on one finger and rested lightly on the strings. The technique looks mysterious, but the first steps are simple, and you can get a real slide sound today.",
    "This guide covers what a slide is, which finger to wear it on, the open tunings that make slide easier, and the one habit that keeps your notes in tune.",
  ],
  sections: [
    {
      heading: "What a slide actually is",
      body: [
        "A slide is a smooth, hollow tube you wear over a finger and glide along the strings. Instead of pressing a string onto a fret, you rest the slide on top of the strings and let it set the pitch. Because nothing stops the note at a fixed fret, you can move continuously between pitches, which is where that crying, voice-like sound comes from.",
        "Slides come in two common materials, each with a slightly different voice.",
        {
          list: [
            "Glass slides sound warm and rounded, and they are forgiving for beginners.",
            "Metal slides (brass or steel) sound brighter and more cutting, with a bit more string noise to control.",
          ],
        },
        "There is no wrong choice. For a first slide, a medium-weight glass tube is an easy place to start.",
      ],
    },
    {
      heading: "Which finger to wear it on",
      body: [
        "Most players wear the slide on the ring finger or the pinky. Both work; the choice comes down to what you want your other fingers to do.",
        {
          list: [
            "On the pinky: your first three fingers stay free to fret normal chords, so you can move between slide and regular playing without stopping. This is the most flexible option for beginners.",
            "On the ring finger: you get a bit more strength and control over the slide, at the cost of one fewer free finger for fretting.",
          ],
        },
        "The slide should fit snugly enough that it does not spin or fall off, but not so tight that it pinches. Try both fingers for a few days before you decide.",
      ],
    },
    {
      heading: "Open tunings make slide easier",
      body: [
        "You can play slide in standard tuning, but most players start with an open tuning, because it does the harmony work for you. Strumming an open tuning with no fingers down already sounds a full chord, so laying the slide flat across all six strings at any fret gives you another complete chord.",
        "The two most common starting points are open G and open D. Both let you slide a single flat bar up and down the neck to change chords, far simpler than fretting shapes while learning slide control.",
        "Getting into these tunings by ear can be tricky at first, so use a reference. Fretwork's free tuner includes open tunings alongside standard, so you can select open G or open D and match each string before you start. Retune slowly and recheck the low strings, since loosening the pitch can pull the guitar slightly flat.",
      ],
    },
    {
      heading: "The key move: fret over the fret wire, not behind it",
      body: [
        "This is the single most important habit in slide guitar, and it is the opposite of normal fretting. When you press a string down with a fingertip, you place your finger just behind the metal fret wire and let the wire stop the note. With a slide, nothing presses down and no fret does the work: the slide itself decides the pitch, based on exactly where it sits.",
        "So to play in tune, rest the slide directly over the fret wire of the note you want, not behind it. Place it where your finger would normally go and the note sounds flat; line the center of the slide up on top of the wire and the pitch lands true. Train your eye for this from day one, and soon your ear takes over and your hand finds the spot on its own.",
      ],
    },
    {
      heading: "Light touch and muting keep it clean",
      body: [
        "Two habits turn a scratchy mess into a clean slide sound: a light touch, and muting.",
        "First, the light touch. Let the weight of the slide rest on the strings without pressing them down to the frets. Push too hard and the strings buzz against the wood and the note chokes. The slide should just kiss the strings; it takes surprisingly little pressure.",
        "Second, muting. Rest one or two free fretting fingers on the strings behind the slide (between the slide and the headstock) to silence the ringing, and let your picking hand touch the strings you are not sounding. This behind-the-slide muting is the difference between a controlled note and a wash of noise.",
      ],
    },
    {
      heading: "Adding vibrato for a singing tone",
      body: [
        "Vibrato is the gentle wavering that gives slide its vocal quality, and it is easier than it looks. Once the slide is centered over the fret wire, rock it a small, even distance back and forth along the string. Keep it a slow shimmer, not a wide wobble, so the note stays in tune while it moves.",
        "Start slow and narrow, then loosen up as your control improves, and save vibrato mostly for longer, held notes where it has room to breathe. A little goes a long way, and it is often what makes a simple slide line sound finished and alive.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need a special guitar for slide?",
      a: "No. Any guitar works to start. Slightly higher string action helps avoid buzzing, but a standard setup is fine for learning.",
    },
    {
      q: "Which finger should I wear the slide on?",
      a: "The pinky or ring finger are both common. The pinky leaves more fingers free for normal fretting, so it is a good default.",
    },
    {
      q: "Where do I put the slide to play in tune?",
      a: "Directly over the metal fret wire of the note you want, not behind it like a normal fingered note. Centering the slide on the wire makes the pitch land true.",
    },
    {
      q: "Do I have to use an open tuning?",
      a: "No, slide works in standard tuning too. Open tunings like open G and open D just make it easier at first, since a straight bar across the strings gives a full chord.",
    },
    {
      q: "How do I stop the buzzing and extra noise?",
      a: "Use a light touch so the slide rests on the strings without pressing to the frets, and mute behind the slide with a free finger.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["open-g-tuning-explained", "alternate-guitar-tunings"],
};

export default guide;
