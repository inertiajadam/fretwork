# Fretwork (working title)

Free, interactive guitar-learning site: theory tools plus lessons. Web first,
mobile app later. Built with Next.js (App Router).

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
```

## Project layout

```
app/                       Next.js App Router
  layout.js                Root layout, fonts, global chrome (nav + footer)
  globals.css              Design tokens (single source of truth) + resets
  page.js                  Home
  tools/page.js            Tools index (from the registry)
  tools/[slug]/page.js     One route per tool, resolved via the registry
  learn/page.js            Learn index
  learn/[slug]/page.js     Lessons, each embeds its tool inline
  about, practice          Static pages
components/
  SiteNav, SiteFooter      Global chrome (CSS Modules, collision-safe)
  Cards.module.css         Shared card grid for the index pages
  tools/                   One client component per tool (ported prototypes)
  tools/registry.js        slug -> tool component map (kept in sync with lib/site)
lib/
  site.js                  TOOLS / LEARN / NAV registry: THE source of truth
  theory.js                Shared music theory (scales, intervals, CAGED, ...)
  learnContent.js          Original lesson copy
prototypes/                Original standalone prototypes (kept for reference)
```

## Hard rules (do not break)

1. NEVER use em dashes anywhere: copy, comments, code, or docs. Use colons,
   commas, periods, or parentheses.
2. All content is ORIGINAL. Nothing is adapted from anyone else's material.
   Topics (CAGED, Nashville numbers, ear training) are common-practice
   pedagogy; the words, examples, and presentation are ours.
3. Everything is free. No paywalls, no gated content, accounts always optional.
4. `lib/site.js` (the TOOLS/LEARN/NAV registry) and `components/tools/registry.js`
   are the single sources of truth. Update both whenever a tool or page is
   added, removed, or renamed.

## Architecture notes

- **Design tokens** live once in `app/globals.css` on `:root`. Every tool
  references `var(--amber)` etc. instead of redefining them.
- **Shared theory** lives in `lib/theory.js`: spelled SCALES for 12 keys,
  FIFTHS ordering, interval names, CAGED shape colors and order, note-spelling
  helpers, and diatonic-chord generation. Tools import from here rather than
  carrying private copies.
- **Tools are client components** (`"use client"`). They keep their own
  component-scoped CSS in an inline `<style>` block; only one tool renders per
  route, so those generic class names never collide, and the site chrome uses
  CSS Modules to stay isolated.
- **Fonts** (Fraunces, JetBrains Mono) load via a `<link>` in the root layout,
  so the literal family names the prototypes use still resolve.

## Not yet extracted (deliberate follow-ups)

- **Audio engine** (lookahead scheduler, Karplus-Strong strings, drums) is
  still tool-local in the metronome, progression player, and ear trainer. It
  was left in place because its timing is fragile and cannot be auditioned in a
  headless build; extracting it into `lib/audio.js` is a follow-up that should
  be done with the tools open in a browser.
- **Shared UI primitives** (guide panel, seg control, chip row, scoreboard) are
  still implemented per tool. They can be lifted into shared components
  incrementally.

## Roadmap

Phase 1-2 tools: shipped. Phase 3: optional accounts, practice tracking.
Phase 4: mobile wrap (Capacitor or React Native).
