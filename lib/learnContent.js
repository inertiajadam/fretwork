/* Original lesson copy. Each lesson may embed one tool by slug.          */
/* Content is plain data; the page renders paragraphs and headings.       */
/* Never adapted from any source: standard pedagogy in our own words.     */

export const LESSONS = {
  "getting-started": {
    title: "Getting started: where are you stuck?",
    eyebrow: "Learn · roadmap",
    intro:
      "Most guitarists hit the same wall. You know a pile of open chords, you can play through a few songs, and then the neck past the third fret turns into a fog. This site is built to clear that fog. Here is the shortest path through it.",
    embedTool: null,
    blocks: [
      {
        h2: "Start with the sound in your hands",
        p: "If a song is in a key that fights your open shapes, you do not need new chords, you need a capo. The Capo Calculator turns any target key into the open shapes you already own, so you can keep playing while the rest of this clicks into place.",
      },
      {
        h2: "Then learn how the neck repeats",
        p: "The single most useful idea on guitar is that five chord shapes you already know (C, A, G, E, D) tile the entire fretboard. Once you see it, you stop memorizing dots and start seeing patterns. The Fretboard Explorer shows those five shapes locking together in any key.",
      },
      {
        h2: "Learn the numbers, not just the letters",
        p: "Players who can jump keys on the spot are not thinking in letter names, they are thinking in numbers: the 1, the 4, the 5. That is the Nashville Number System, and it makes transposing a song a matter of counting, not rewriting. The Nashville Number Trainer drills it both directions.",
      },
      {
        h2: "Train the two things practice ignores",
        p: "Your ears and your timing improve only when you isolate them. The Ear Trainer builds recognition of intervals, chord colors, and progressions in small steps. The Metronome and Speed Builder grows tempo a few beats per minute per clean pass, which is how real speed is actually built.",
      },
      {
        h2: "Play with a band whenever you want",
        p: "Theory sticks fastest when you hear it move. The Progression Player loops a full synthesized backing band in any key and feel, so you can solo, comp, and test ideas against real motion instead of silence.",
      },
    ],
    related: ["capo-calculator", "fretboard-explorer", "nashville-trainer"],
  },

  "fretboard-and-caged": {
    title: "The fretboard and CAGED",
    eyebrow: "Learn · the neck",
    intro:
      "CAGED is the idea that the five open chord shapes you learned first (C, A, G, E, and D) are not just beginner grips. Slid up the neck and barred, those same five shapes spell every major chord, in order, over and over. Learn how they connect and the whole fretboard opens up.",
    embedTool: "fretboard-explorer",
    blocks: [
      {
        h2: "Five shapes, one neck",
        p: "Pick any key. Its root note appears in five places along the strings before the pattern repeats at the twelfth fret. Each of those places is the anchor for one of the five shapes. Play them in the order C, A, G, E, D going up the neck and each shape's ending lines up with the next shape's beginning. They interlock like puzzle pieces.",
      },
      {
        h2: "Why the order never changes",
        p: "The sequence C, A, G, E, D is fixed because it follows the distance between the shapes' root notes, and that distance is the same in every key. Only the starting fret moves. That is the whole trick: memorize one order, and you can find any chord anywhere.",
      },
      {
        h2: "From chords to scales",
        p: "Each shape also carries a piece of the scale around it. When you can see the shape, the scale notes sit right next to your fingers. Turn on the scale overlay below and watch the major scale and pentatonic boxes grow out of the same five anchors. This is why lead and rhythm stop feeling like separate skills.",
      },
      {
        h2: "How to practice it",
        p: "Do not try to swallow all five at once. Pick one key. Learn the E shape and the C shape and the move between them. Add G, then A, then D. Say the shape name out loud as you land it. Within a week the neck starts to feel like a map instead of a grid of dots.",
      },
    ],
    related: ["fretboard-explorer", "chord-library", "circle-of-fifths"],
  },

  chords: {
    title: "Chords: open, barre, and voicing families",
    eyebrow: "Learn · chords",
    intro:
      "A chord is just a handful of notes from a scale, stacked and played together. Once you know which notes a chord asks for, you can find it in a dozen places on the neck. This is how one chord name becomes five different voicings, each with its own color.",
    embedTool: "chord-library",
    blocks: [
      {
        h2: "What a chord actually is",
        p: "A basic major chord is three notes: the root, the third, and the fifth. The third decides major or minor. Everything richer (sevenths, sixths, suspensions) is those same three notes plus one more color tone. When you see a chord as a small set of intervals instead of a fixed grip, moving it around the neck stops being memorization.",
      },
      {
        h2: "Open chords are shapes in one spot",
        p: "The open chords you learned first are simply the CAGED shapes played at the nut, where open strings do some of the work for free. That free ring is why they sound so full, and why moving them up the neck as barre chords takes more effort: your finger now has to do what the nut used to.",
      },
      {
        h2: "Voicing families",
        p: "The Chord Library below takes any chord and any quality and shows you all five CAGED voicings up the neck, with every note and interval labeled. Same chord, five personalities: the low thick one, the bright chimey one, the one that sits perfectly under a melody. Learning families instead of single grips is what lets you voice-lead smoothly between chords.",
      },
      {
        h2: "How to use this",
        p: "Take a song you already play. Look up one of its chords here, then try a voicing you have never used for it, somewhere else on the neck. Notice how the feel changes without the harmony changing. That is arranging, and it starts with knowing where the notes live.",
      },
    ],
    related: ["chord-library", "fretboard-explorer", "capo-calculator"],
  },

  "theory-and-nashville": {
    title: "Theory and Nashville numbers",
    eyebrow: "Learn · theory",
    intro:
      "Letter names tell you where to put your fingers. Numbers tell you how the music works. The players who can change key on the spot, follow a chart they have never seen, and hear where a song is going are all thinking in numbers. Here is that system, from the ground up.",
    embedTool: "nashville-trainer",
    blocks: [
      {
        h2: "A key is a family of seven chords",
        p: "Take the major scale of any key, seven notes, and build a chord on each one. You get seven chords, and their flavors are always the same, in the same order: the 1 is major, the 2 is minor, the 3 is minor, the 4 is major, the 5 is major, the 6 is minor, and the 7 is diminished. In the key of C that is C, Dm, Em, F, G, Am, and B diminished. Learn that pattern once and you know the chords of every key.",
      },
      {
        h2: "Number the chords, not the notes",
        p: "Because the flavors never move, you can drop the letter names entirely and just call the chords by their number: 1, 4, 5, and so on. Now a progression like 1, 5, 6, 4 describes the same musical motion in any key. It is one of the most common progressions in popular music, and written as numbers it fits every key at once instead of needing a new chart each time.",
      },
      {
        h2: "This is the Nashville Number System",
        p: "Session players in Nashville write charts this way so the whole band can change key in seconds. If the singer wants the song a step higher, nobody rewrites anything: the numbers stay put, and everyone just plays the new key's chords. A minor chord gets a small mark (a 6 minus, or a lowercase note), a seventh gets a 7, but the backbone is just the digits 1 through 7.",
      },
      {
        h2: "Transposing becomes counting",
        p: "Once a song lives as numbers, moving it to a new key is arithmetic, not translation. That 1, 5, 6, 4 is G, D, Em, C in the key of G, and C, G, Am, F in the key of C. Same numbers, same feeling, different letters. This is exactly what a capo does with your hands, and what the number system does on paper.",
      },
      {
        h2: "See it in two keys at once",
        p: "The Nashville Number Trainer below builds a number chart and shows it wearing chords in two keys side by side, so you can watch the numbers stay fixed while the letters change. Turn on quiz mode and it drills you both directions: chord to number, and number to chord, which is the skill that makes charts feel like sight reading.",
      },
      {
        h2: "How to practice it",
        p: "Take three songs you already know. Work out their chords, then convert each chord to its number in the key. Do not worry about being fast; worry about being right. Within a handful of songs you will start hearing the 4 and the 5 before you name them, and that is the moment theory stops being homework and starts being an ear.",
      },
    ],
    related: ["nashville-trainer", "circle-of-fifths", "key-bridge"],
  },

  "ear-training": {
    title: "Ear training",
    eyebrow: "Learn · ears",
    intro:
      "You can practice guitar for years and barely train the one thing that lets you play a song after hearing it once. Your ears improve only when you point them at something on purpose. The good news: a few focused minutes a day moves the needle fast. Here is what to listen for, and in what order.",
    embedTool: "ear-trainer",
    blocks: [
      {
        h2: "Why your ear needs its own practice",
        p: "Playing songs builds your fingers, not your ears. Recognizing a sound is a separate skill, and like any skill it grows when you isolate it and get instant feedback: hear it, name it, find out if you were right, repeat. That tight loop is the whole game, and it is exactly what a drill gives you that noodling never will.",
      },
      {
        h2: "Start with intervals",
        p: "An interval is the distance between two notes, and it is the smallest unit of ear training. Instead of memorizing all of them at once, anchor a few to sounds you already know: the wide, stable leap of a perfect fifth, the bright reach of a major third, the same-note-higher of an octave. Once a handful of intervals are automatic, the rest of your ear has scaffolding to stand on.",
      },
      {
        h2: "Then hear chord colors",
        p: "Before you can name a chord, you can feel it: major sounds settled and bright, minor sounds darker and sadder, a dominant seventh sounds like it wants to move somewhere. Training these qualities teaches your ear to hear the emotion of a chord before the theory of it, which is what lets you guess the next chord in a song and be right.",
      },
      {
        h2: "Finally, hear a progression move",
        p: "Songs are not single chords, they are motion. When you can hear a 1 settle home, a 5 pull toward it, and a 6 lean minor, you can follow a progression by ear and often predict where it is going. This is the same numbered thinking from the theory lesson, now arriving through your ears instead of your eyes.",
      },
      {
        h2: "Drill it here",
        p: "The Ear Trainer below runs three drills, intervals, chord colors, and progression recognition, each in three levels, and it makes you play the sound before you answer so you are training recall, not recognition of a picture. Keep a streak going and let the levels climb as your ear sharpens.",
      },
      {
        h2: "How to practice it",
        p: "Five minutes a day beats an hour once a week. Sing back what you hear before you answer; the voice and the ear teach each other. When an interval or chord keeps fooling you, slow down and sit with just that one until it stops. Progress here is quiet and then sudden: one day a song you are hearing simply makes sense.",
      },
    ],
    related: ["ear-trainer", "nashville-trainer", "progression-player"],
  },

  "technique-and-speed": {
    title: "Technique and speed",
    eyebrow: "Learn · technique",
    intro:
      "Almost everyone practices speed the wrong way: by playing fast and messy and hoping it cleans up. It does not. Speed is what you get when clean movement becomes automatic, and the way there is slower and far more reliable than it feels. Here is the method the fast players actually use.",
    embedTool: "metronome",
    blocks: [
      {
        h2: "Speed is a byproduct, not a target",
        p: "Every fast, clean passage is a movement your hands can make without thinking. You build that by repeating the movement correctly, not quickly. Play something a hair too fast and you practice the mistakes along with the notes. Play it slow enough to nail every time and you are teaching your hands the real thing. The tempo rises on its own once the motion is trusted.",
      },
      {
        h2: "The metronome is a mirror",
        p: "A steady click does not make you robotic, it shows you the truth: where you rush, where you drag, which note you always fumble. Most players discover their timing is far less even than they thought the first time they play against a click honestly. That discomfort is the lesson. Time is a skill, and the metronome is how you can see it.",
      },
      {
        h2: "Climb the speed ladder",
        p: "Set a tempo where you can play a passage perfectly a few times in a row. Only then nudge it up a few beats per minute, and repeat. If a rep breaks down, drop back. This laddering is unglamorous and it is the single most effective way to build real speed, because every rung is clean. The Speed Builder below automates the climb so you can keep your eyes on your hands.",
      },
      {
        h2: "Feel the subdivisions",
        p: "Fast playing is really accurate placement of small pieces: eighths, triplets, sixteenths. Count them out loud, put the accent on the beat, and let the click mark only the downbeats as you improve so your internal clock does more of the work. Clean rhythm at a slow tempo always beats a blur at a fast one, and it is what makes speed sound musical instead of frantic.",
      },
      {
        h2: "Build a practice loop",
        p: "The Metronome and Speed Builder below keeps sample-accurate time, taps tempo, handles odd time signatures, and grows the tempo a few beats per clean pass. Use it to turn a rough lick into a reliable one: set a comfortable start, define the target, and let it ladder you up while you focus on staying relaxed.",
      },
      {
        h2: "How to practice it",
        p: "Short and focused beats long and loose. Pick one small passage, not a whole song. Play it slowly and perfectly ten times, then let the tempo climb. Stop the moment it gets sloppy, because sloppy reps at speed undo clean ones. Come back tomorrow and you will usually start faster than you left off. That overnight jump is your hands finishing the work while you sleep.",
      },
    ],
    related: ["metronome", "progression-player", "fretboard-explorer"],
  },
};

export const lessonBySlug = (slug) => LESSONS[slug] || null;
