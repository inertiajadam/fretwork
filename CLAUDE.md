# Guitar Theory Site (working title: Fretwork)

A free, interactive guitar-learning site: theory tools plus lessons, web first,
mobile app later. Ten working tool prototypes live in `prototypes/` as
self-contained React components. The next job is assembling them into a real
Next.js app.

## Hard rules (do not break)

1. NEVER use em dashes anywhere: not in copy, comments, code, or docs. Use
   colons, commas, periods, or parentheses instead.
2. All content must be ORIGINAL. Reference PDFs from earlier planning belong to
   another teacher; nothing may be adapted from or matched to them. Topics
   (CAGED, Nashville numbers, ear training, etc.) are common-practice pedagogy
   and fair game; the words, examples, and presentation are ours alone.
3. Everything on the site is free. No paywalls, no gated content, accounts
   always optional.
4. The site menu (currently `prototypes/site_menu.jsx`, later the nav/routes
   config) must be updated every time a tool or page is added, removed, or
   renamed. Its TOOLS registry is the single source of truth.

## Design system (used consistently by every prototype)

CSS tokens:
  --bg #191411, --panel #241D18, --panel2 #2C241E, --line #3A2F27,
  --ink #EFE6D9, --muted #A89B8A, --amber #E8A33D,
  green #86B36B, red #E36B5C
Fonts: Fraunces (display), system-ui (body), JetBrains Mono (labels/data),
loaded via Google Fonts import.
CAGED shape colors: C #E36B5C, A #E8A33D, G #86B36B, E #5FA3B5, D #A985D1.
Shared UI patterns: amber eyebrow label, Fraunces h1, collapsible three-column
"guide" explainer on every tool, chip rows for keys (circle-of-fifths order),
seg controls, focus-visible outlines, prefers-reduced-motion respected.

## The tools (all built, all in prototypes/)

1. fretboard_caged_explorer.jsx: CAGED shapes tiling the neck, scale overlays,
   per-shape explainer panel. SVG with realistic fret spacing.
2. chord_library.jsx: 9 chord qualities x 5 CAGED voicings, generated from
   form templates, notes and intervals labeled.
3. circle_of_fifths.jsx: interactive wheel, key signatures, diatonic chords,
   classic progressions per key.
4. key_bridge.jsx: modulation builder: pivot chords with dual-role labels,
   ranked routes, progression builder.
5. capo_calculator.jsx: target key to capo positions across the 5 open-shape
   families, full chord translation tables, two-guitar layering tip.
6. tuner.jsx: mic + autocorrelation pitch detection, cents gauge, 6 tunings,
   strings/chromatic modes, adjustable A4 reference.
7. nashville_trainer.jsx: number chart builder with two-key comparison, plus
   quiz mode (both directions, streaks).
8. metronome_speed_builder.jsx: lookahead Web Audio scheduler, tap tempo,
   time signatures, manual/auto tempo ladder.
9. ear_trainer.jsx: intervals, chord colors, progressions; 3 levels each;
   synthesized plucks; must-play-before-answering quiz chassis.
10. progression_player.jsx: full backing band. Karplus-Strong strings with
    per-feel roll widths, compressor + generated reverb bus, humanization,
    synthesized drums, 24 major/minor keys (incl. harmonic-minor V), 8 time
    signatures via pattern generators, presets incl. 12-bar blues.

site_menu.jsx: home/nav prototype with the TOOLS registry and status board.

## Architecture notes for the Next.js build

- Extract the shared theory data into one module: spelled SCALES for 12 keys,
  minor derivation via relative-major rotation, degree tables (major + minor
  with harmonic-minor V), Nashville numbers, interval names, CAGED form
  templates and base-fret math. Multiple prototypes duplicate this today by
  design; dedupe it.
- Extract shared UI: guide panel, chip row, seg control, scoreboard, tokens.
- Extract audio: the lookahead scheduler (metronome + progression player),
  Karplus-Strong string engine, and drum voices into a lib. Port the string
  engine to the ear trainer for consistent sound.
- Quiz chassis (nashville_trainer, ear_trainer) is the future practice-
  tracking integration point (Phase 3: optional accounts, streaks persist).
- Tuner and audio tools need user-gesture AudioContext creation and clean
  teardown; prototypes already do this correctly.
- Artifacts couldn't use browser storage; the real site can. localStorage for
  anonymous streaks/settings before accounts exist.
- Later audio upgrade path: recorded sample packs for the progression player.

## Roadmap (see guitar_site_plan.md for detail)

Phase 1-2 tools: DONE (prototyped). Next: Next.js scaffold, shared libs,
Learn pages written around each tool, name + domain decision, deploy.
Phase 3: optional accounts, practice tracking. Phase 4: mobile wrap
(Capacitor or React Native).
