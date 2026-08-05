# Guitar Theory Site: Plan & Structure

## Vision

An interactive learning platform that turns proven guitar education content (CAGED, chords, ear training, Nashville Number System, speed building, tone) into hands-on tools players actually use daily. Web-first, mobile app later. The tools are the hook; the depth of the teaching is the retention.

**Positioning:** Most guitar sites are either static lesson libraries (articles/videos) or single-purpose utilities (just a tuner, just a metronome). This site combines a coherent, original teaching *system* with interactive tools built directly from that system: the fretboard explorer teaches CAGED visually, the ear trainer builds recognition step by step, and every tool links back to the lesson that explains it.

**Audience:** Intermediate players who are "stuck": they know open chords and some songs but don't understand the neck. This matches the stage-3 guitarist described in the CAGED material and is the largest underserved segment.

---

## Information Architecture (Sitemap)

```
Home
├── Learn
│   ├── Getting Started (roadmap: where are you stuck?)
│   ├── Chords (open chords, barre chords, voicing families)
│   ├── The Fretboard & CAGED
│   ├── Music Theory & Nashville Numbers
│   ├── Ear Training
│   └── Technique & Speed
├── Tools
│   ├── Tuner
│   ├── Fretboard Explorer (CAGED / scales)
│   ├── Chord Library
│   ├── Key Bridge (modulation builder)
│   ├── Nashville Number Converter & Quiz
│   ├── Ear Trainer
│   ├── Metronome & Speed Builder
│   ├── Progression Player (backing loops)
│   ├── Circle of Fifths
│   └── Capo Calculator
├── Practice (routine builder, streaks, progress), requires account
├── Community (optional, decide later)
└── About
```

Design principle: every Learn page embeds the relevant tool inline, and every tool links back to the lesson that explains it. Content and tools cross-pollinate rather than living in separate silos.

---

## The Tools: Specs at a Glance

| Tool | Core function | Complexity | Phase |
|---|---|---|---|
| Tuner | Mic pitch detection, standard + alt tunings | Medium (Web Audio) | 1 |
| Fretboard Explorer | Interactive neck: keys, CAGED shapes, scale overlays | Medium-High | 1 |
| Chord Library | Search chord → all voicings by CAGED position, with audio | Medium | 1 |
| Circle of Fifths | Clickable wheel → key info, diatonic chords, common progressions | Low | 1 |
| Capo Calculator | Target key + preferred shapes → capo position | Low | 1 |
| Key Bridge | Build progressions that change key: pivots, dominant routes, builder | Medium | 1 |
| Nashville Converter/Quiz | Progression ↔ numbers, instant transposition, quiz mode | Low-Medium | 2 |
| Ear Trainer | Intervals, chord qualities, progression ID; levels & streaks | Medium | 2 |
| Metronome & Speed Builder | Auto-incrementing BPM trainer with progress log | Medium | 2 |
| Progression Player | Looped backing tracks: pick progression, key, feel | High (audio engine) | 3 |
| Practice Routine Builder | Assemble tools into daily routine, track streaks | Medium (needs accounts) | 3 |

Phase 1 = launch set: high value, no accounts required, strong SEO landing pages ("guitar tuner online," "CAGED system chart," "chord finder").

---

## Content Strategy

Important: the reference PDFs in this project are another teacher's material. They are useful as a map of what topics matter and how deep to go, but nothing on the site is adapted, rewritten, or borrowed from them. All lesson content, copy, examples, and tool explanations are written original for this site, grounded in standard music theory and pedagogy that belongs to no one (CAGED, the Nashville Number System, intervals, the circle of fifths are all common practice).

Learn sections to write from scratch:

- **Chords**: open chords, barre chords, and the voicing families the Chord Library generates
- **The Fretboard & CAGED**: how the five forms tile the neck, written around the Fretboard Explorer
- **Theory & Nashville Numbers**: intervals, keys, diatonic chords, number notation
- **Ear Training**: intervals by sound, chord qualities, hearing progressions
- **Technique & Speed**: practice structure, tempo laddering, clean-reps methodology

Each section is written around its tool, with the tool embedded inline. Tools generate everything from data and math (as the Fretboard Explorer and Chord Library already do), so the interactive layer is inherently original.

**Everything is free.** No paywalls, no gated content. All tools, all lessons, all practice features. This is the site's biggest growth lever: free, genuinely good tools get shared, linked, and recommended in a way gated content never does.

---

## Tech Stack

- **Frontend:** Next.js (React) for SEO-friendly pages for Learn content, rich interactivity for Tools
- **Audio:** Web Audio API for pitch detection (tuner), synthesis/playback (chords, ear trainer, metronome), sample playback (progression player)
- **Fretboard/diagrams:** SVG-based rendering (one fretboard component reused by Explorer, Chord Library, lessons)
- **Data:** Chords, scales, and progressions as structured JSON, one source of truth shared by all tools
- **Accounts/progress (Phase 3):** Supabase or Firebase (auth + database, minimal backend to maintain)
- **Mobile later:** Capacitor wrap of the same codebase, or React Native reusing the data layer and audio logic

---

## Roadmap

**Phase 1: Foundation (launch)**
Site shell, Learn section structure with 2–3 sections adapted, and the five Phase-1 tools. Goal: a site worth bookmarking on day one.

**Phase 2: Engagement**
Ear Trainer, Nashville tools, Speed Builder. These create daily-return habits. Add lightweight local progress (no accounts yet, just browser storage on the real site).

**Phase 3: Retention**
Optional free accounts for practice tracking and streaks, plus the Progression Player. Community features optional and free if added at all.

**Phase 4: Mobile**
Wrap for iOS/Android once the tools are proven. Tuner + ear trainer + metronome are the app's core (the tools people want on their phone in the practice room).

---

## Open Decisions

1. Brand, domain, and name.
2. Video: text plus interactive tools only, or invest in video per section?
