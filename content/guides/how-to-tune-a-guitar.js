/* Guide article. Plain data object; rendered by app/guides/[slug]/page.js.
   Rules: original copy, no em dashes, brand voice (plain, honest, warm). */

const guide = {
  slug: "how-to-tune-a-guitar",
  title: "How to Tune a Guitar: Standard Tuning, By Ear, and By App",
  description:
    "How to tune a guitar to standard EADGBE, three ways to do it, why it drifts, and a stability trick that keeps it in tune longer.",
  keyword: "how to tune a guitar",
  updated: "2026-08-10",
  readMins: 6,
  intro: [
    "A guitar that is even slightly out of tune makes everything you play sound wrong, no matter how clean your fingers are. The good news is that tuning is a quick, learnable skill, and once you understand what you are aiming for it takes under a minute.",
    "This guide covers standard tuning, three reliable ways to get there, why guitars drift out of tune in the first place, and one small habit that keeps your tuning stable for longer.",
  ],
  sections: [
    {
      heading: "Standard tuning: EADGBE, low to high",
      body: [
        "Almost all guitar music assumes standard tuning. Your six strings, from the thickest (lowest in pitch) to the thinnest (highest in pitch), are tuned to these notes:",
        {
          list: [
            "6th string, thickest: E (low E)",
            "5th string: A",
            "4th string: D",
            "3rd string: G",
            "2nd string: B",
            "1st string, thinnest: E (high E, two octaves above the low E)",
          ],
        },
        "A common way to remember the order from low to high is a short phrase where the first letters spell E, A, D, G, B, E. Whatever memory trick you use, the target notes never change; standard tuning is the shared starting point for almost every song and lesson you will find.",
      ],
    },
    {
      heading: "Three ways to tune a guitar",
      body: [
        "There is no single correct method. Pick whichever fits what you have on hand, and the guitar ends up in the same place.",
        {
          list: [
            "With a tuner: an electronic or app tuner listens through a microphone and tells you whether each string is flat (too low), sharp (too high), or right on the note. This is the most accurate and beginner friendly option.",
            "By ear, using the 5th-fret method: tune one string to a known reference, then match the rest to each other. No device required once you have that first note.",
            "To a reference pitch: match a string to a known source like a piano, another guitar, or a single tuning fork, then work outward from there.",
          ],
        },
      ],
    },
    {
      heading: "Tuning with a tuner",
      body: [
        "Play one string cleanly and let it ring. The tuner shows the note it hears and how far off you are. Turn the tuning peg slowly until the reading lands on the correct note and centers, then move to the next string.",
        "Work through all six strings in order. Because the tuner is measuring the actual pitch, you do not need a trained ear to start; you just match what the display asks for. This is the fastest way to get an accurate result and a good way to train your ear at the same time, since you hear the correct pitch on every string.",
      ],
    },
    {
      heading: "Tuning by ear with the 5th-fret method",
      body: [
        "This method tunes the guitar to itself. Start with your low E string as close to correct as you can get it, ideally checked against a reference pitch, then match each string to the one before it.",
        {
          list: [
            "Press the 6th string (low E) at the 5th fret. That note is A. Tune your open 5th string until it matches.",
            "Press the 5th string at the 5th fret to get D, and tune the open 4th string to it.",
            "Press the 4th string at the 5th fret to get G, and tune the open 3rd string to it.",
            "Press the 3rd string at the 4th fret (this one is the 4th fret, not the 5th) to get B, and tune the open 2nd string to it.",
            "Press the 2nd string at the 5th fret to get E, and tune the open 1st string (high E) to it.",
          ],
        },
        "As two strings approach the same pitch you will hear a slow wavering that gets slower and then disappears when they match. When the waver is gone, the strings are in tune with each other.",
      ],
    },
    {
      heading: "Why guitars go out of tune",
      body: [
        "Drifting out of tune is normal, not a sign of a bad instrument. Strings and wood respond to their surroundings, and playing itself nudges things loose.",
        {
          list: [
            "Temperature and humidity changes make strings and the neck expand and contract slightly.",
            "New strings stretch for the first few hours of playing and need retuning often until they settle.",
            "Bending, strumming hard, and normal handling gradually shift the tuning pegs.",
            "Fresh restringing, a knock to the headstock, or a cold room can all pull you off pitch.",
          ],
        },
        "Because of all this, checking your tuning every time you pick up the guitar is a good habit, not a chore.",
      ],
    },
    {
      heading: "Tune up to pitch for stability",
      body: [
        "Here is a small trick that makes your tuning hold longer. When you land on a note, try to arrive by tuning up to it from below rather than down to it from above. If you overshoot and the string is sharp, loosen it well below the target and then slowly raise it back up.",
        "Tuning upward keeps gentle tension through the nut and tuning peg, so the string is less likely to slip flat a minute later. Coming down onto a note leaves slack that can settle and drop you out of tune. It is a tiny difference in motion that pays off in how long your tuning stays put.",
        "Fretwork's free online tuner uses your device microphone to detect pitch, with a cents readout so you can see exactly how close you are. It covers standard guitar plus bass, banjo, and ukulele, and you can tap any string to hear its reference pitch and match by ear.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is standard guitar tuning?",
      a: "Standard tuning is E, A, D, G, B, E from the thickest, lowest string to the thinnest, highest string. It is the default for almost all guitar music and the tuning most lessons and songs assume.",
    },
    {
      q: "Can I tune a guitar without a tuner?",
      a: "Yes. Use the 5th-fret method to tune the guitar to itself, matching each string to the one before it. It helps to start from a reference pitch, like a piano or tuning fork, so the whole guitar sits at true standard pitch.",
    },
    {
      q: "How often should I tune my guitar?",
      a: "Check it every time you play. New strings need frequent retuning for the first few hours, and temperature, humidity, and normal playing pull any guitar off pitch over time.",
    },
    {
      q: "Why does my guitar keep going out of tune?",
      a: "Usually it is new strings still stretching, changes in temperature or humidity, or hard playing shifting the tuning pegs. Tuning up to each note from below, rather than down onto it, helps the tuning hold longer.",
    },
    {
      q: "Does an online mic tuner work for other instruments?",
      a: "Yes. Fretwork's tuner listens through your microphone and also covers bass, banjo, and ukulele. You can tap a string to hear its reference pitch and tune by ear as well.",
    },
  ],
  relatedTools: ["tuner"],
  relatedGuides: ["how-to-tune-a-ukulele", "how-to-memorize-the-fretboard"],
};

export default guide;
