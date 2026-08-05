"use client";

import { useState, useMemo } from "react";
import { FIFTHS, SHAPE_ORDER, pcOf, diatonicChords } from "@/lib/theory";
import GuidePanel from "@/components/ui/GuidePanel";

/* ------------------------------------------------------------------ */
/* Tool-specific copy. Shared theory (scales, fifths, pcOf, diatonic    */
/* chords) now comes from @/lib/theory.                                 */
/* ------------------------------------------------------------------ */
const SHAPE_NOTES = {
  C: "The gentlest set: C, F and G with all the ringing open strings.",
  A: "Bright and easy: A, D and E, three of the friendliest grips there are.",
  G: "The campfire king: G, C, D and Em, big open voicings.",
  E: "The rock set: E, A and B7 territory, thick low-string power.",
  D: "Sweet and chimey up top: D, G and A with that singing high end.",
};

const chordsOf = (key) => diatonicChords(key, 6);

/* ------------------------------------------------------------------ */
export default function CapoCalculator() {
  const [target, setTarget] = useState("Eb");

  const options = useMemo(() => {
    const tPc = pcOf(target);
    return SHAPE_ORDER.map((p) => {
      const fret = (((tPc - pcOf(p)) % 12) + 12) % 12;
      return {
        shapeKey: p,
        fret,
        play: chordsOf(p),
        sound: chordsOf(target),
        practical: fret <= 7,
        note: SHAPE_NOTES[p],
      };
    }).sort((a, b) => a.fret - b.fret);
  }, [target]);

  const usable = options.filter((o) => o.practical && o.fret > 0);
  const layerPair = usable.length >= 2 ? [usable[0], usable[1]] : null;
  const noCapo = options.find((o) => o.fret === 0);

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">Play hard keys with easy shapes</div>
        <h1>Capo Calculator</h1>
        <p className="lede">
          Pick the key the song needs to sound in. Get every capo position that
          lets you play it with the open shapes you already know, and see
          exactly what each chord becomes.
        </p>
      </header>

      <GuidePanel
        prompt="What am I looking at?"
        columns={[
          {
            title: "The idea",
            body:
              "A capo is a moveable nut. Clamp it at fret 3 and every shape you play sounds three half steps higher, fingering unchanged. So any key, even the flat-heavy ones singers love, can be played with comfortable open shapes. The only question is where to clamp, and that's just subtraction. This tool does the subtracting.",
          },
          {
            title: "How to read it",
            body:
              'Each card is one option: the capo fret, the shape family you\'d play, and the translation table showing what every open chord sounds as. "Play C, hear Eb" means your hands make the C shape while the room hears Eb. Lower capo positions keep more warmth and sustain; past fret 7 things get tight and boxy, so those options are dimmed.',
          },
          {
            title: "How to use it",
            body:
              "Got a chord chart full of barre chords? Find its key here and pick the option whose shapes you like best. Backing a singer who moved the song up a step? Slide the capo up two frets and change nothing else. Playing with another guitarist? Each of you takes a different card: same chords, two different voicings, instant width.",
          },
        ]}
      />

      <section className="controls">
        <div className="ctrl-group">
          <span className="ctrl-label">Song sounds in the key of</span>
          <div className="chip-row">
            {FIFTHS.map((k) => (
              <button key={k} className={"chip" + (k === target ? " on" : "")} aria-pressed={k === target} onClick={() => setTarget(k)}>{k}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="results">
        {noCapo && (
          <p className="nocapo">
            {target} is already an open-shape key: play {noCapo.shapeKey} shapes
            with no capo at all.
          </p>
        )}
        <div className="cards">
          {options.filter((o) => o.fret > 0).map((o) => (
            <div key={o.shapeKey} className={"card" + (o.practical ? "" : " dim")}>
              <div className="card-head">
                <div className="fret-badge">
                  <span className="fret-num">{o.fret}</span>
                  <span className="fret-word">capo</span>
                </div>
                <div>
                  <h3>Play {o.shapeKey} shapes</h3>
                  <p className="shape-note">{o.note}</p>
                </div>
              </div>
              <div className="map">
                {o.play.map((c, i) => (
                  <div key={i} className="map-pair">
                    <span className="play-chord">{c}</span>
                    <span className="arrow">{"→"}</span>
                    <span className="sound-chord">{o.sound[i]}</span>
                  </div>
                ))}
              </div>
              <p className="map-caption">
                left: what your hands play · right: what the room hears
              </p>
              {!o.practical && <p className="warn">Fret {o.fret} is a squeeze: playable, but tight and thin. Try a lower option first.</p>}
            </div>
          ))}
        </div>

        {layerPair && (
          <div className="layer-tip">
            <span className="ctrl-label">Two-guitar trick</span>
            <p>
              One guitarist takes capo {layerPair[0].fret} with {layerPair[0].shapeKey} shapes,
              the other capo {layerPair[1].fret} with {layerPair[1].shapeKey} shapes. You're
              both in {target}, but the voicings stack instead of colliding. Instant
              record-sized sound with two acoustic guitars.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Design tokens and fonts are global (app/globals.css + layout).       */
const css = `
.app {
  min-height: 100vh; background: var(--bg); color: var(--ink);
  font-family: var(--font-body);
  padding: 28px clamp(14px, 4vw, 48px) 56px;
}
header { max-width: 880px; margin-bottom: 22px; }
.eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--amber); margin-bottom: 10px; }
h1 { font-family: var(--font-display); font-weight: 650; font-size: clamp(30px, 5vw, 44px); margin: 0 0 10px; letter-spacing: -0.01em; }
.lede { color: var(--muted); font-size: 15.5px; line-height: 1.55; margin: 0; max-width: 60ch; }

.controls { margin-bottom: 24px; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.chip-row { display: flex; flex-wrap: wrap; gap: 7px; }
.chip { background: var(--panel); border: 1.5px solid var(--line); color: var(--ink); border-radius: 999px; padding: 7px 13px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; min-width: 42px; }
.chip.on { background: var(--amber); border-color: var(--amber); color: #1A130E; }

.results { max-width: 1100px; display: flex; flex-direction: column; gap: 18px; }
.nocapo { background: var(--panel); border: 1.5px solid var(--amber); border-radius: 12px; padding: 13px 16px; font-size: 14.5px; margin: 0; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
.card.dim { opacity: 0.55; }
.card-head { display: flex; gap: 14px; align-items: flex-start; }
.fret-badge { display: flex; flex-direction: column; align-items: center; background: var(--panel2); border: 1.5px solid var(--amber); border-radius: 12px; padding: 8px 13px; flex-shrink: 0; }
.fret-num { font-family: var(--font-display); font-size: 27px; font-weight: 650; color: var(--amber); line-height: 1; }
.fret-word { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }
.card h3 { font-family: var(--font-display); font-weight: 650; font-size: 19px; margin: 0 0 4px; }
.shape-note { color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0; }
.map { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 14px; }
.map-pair { display: flex; align-items: center; gap: 7px; background: var(--panel2); border-radius: 8px; padding: 5px 10px; }
.play-chord { font-weight: 700; font-size: 14.5px; min-width: 32px; }
.arrow { color: var(--muted); font-size: 12px; }
.sound-chord { font-weight: 700; font-size: 14.5px; color: var(--amber); }
.map-caption { font-family: var(--font-mono); font-size: 10px; color: #7A6F60; margin: 0; letter-spacing: 0.04em; }
.warn { color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0; font-style: italic; }

.layer-tip { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 16px 20px; display: flex; flex-direction: column; gap: 8px; }
.layer-tip p { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 0; max-width: 70ch; }
`;
