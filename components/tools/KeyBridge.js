"use client";

import { useState, useMemo } from "react";
import { FIFTHS, SCALES, pcOf } from "@/lib/theory";
import GuidePanel from "@/components/ui/GuidePanel";
import { usePersistedState } from "@/hooks/usePersistedState";

/* ------------------------------------------------------------------ */
/* Music data                                                          */
/* ------------------------------------------------------------------ */
const QUAL = ["maj","min","min","maj","maj","min","dim"];
const SUFFIX = { maj: "", min: "m", dim: "°" };
const NASHVILLE = ["1","2m","3m","4","5","6m","7°"];

const diatonic = (key) =>
  SCALES[key].map((n, i) => ({
    name: n + SUFFIX[QUAL[i]],
    root: pcOf(n),
    quality: QUAL[i],
    num: NASHVILLE[i],
    degree: i,
  }));

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function KeyBridge() {
  const [fromKey, setFromKey] = usePersistedState("tool.keybridge.from", "C");
  const [toKey, setToKey] = usePersistedState("tool.keybridge.to", "E");
  const [strip, setStrip] = useState([]);

  const dA = useMemo(() => diatonic(fromKey), [fromKey]);
  const dB = useMemo(() => diatonic(toKey), [toKey]);

  /* relationship on the circle */
  const steps = useMemo(() => {
    const d = Math.abs(FIFTHS.indexOf(fromKey) - FIFTHS.indexOf(toKey));
    return Math.min(d, 12 - d);
  }, [fromKey, toKey]);

  const semis = ((pcOf(toKey.replace("m","")) - pcOf(fromKey.replace("m",""))) % 12 + 12) % 12;

  const relationText =
    fromKey === toKey ? "same key, no bridge needed" :
    steps === 1 ? "next-door neighbors: they share six of seven notes, so this change can be nearly invisible" :
    steps === 2 ? "close relatives: five shared notes, an easy trip with a pivot chord" :
    steps <= 4 ? "middle distance: fewer shared chords, so the dominant does the heavy lifting" :
    "far side of the circle: almost nothing in common, so the change will be heard. Lean into it";

  /* pivot chords: diatonic in both keys */
  const pivots = useMemo(() => {
    const out = [];
    for (const a of dA) {
      const b = dB.find((c) => c.root === a.root && c.quality === a.quality);
      if (b) out.push({ name: a.name, numA: a.num, numB: b.num, degB: b.degree });
    }
    /* best pivots first: pre-dominant jobs in the new key (2m, 4, 6m) */
    const rank = { 1: 0, 3: 1, 5: 2, 0: 3, 4: 4, 2: 5, 6: 6 };
    return out.sort((x, y) => rank[x.degB] - rank[y.degB]);
  }, [dA, dB]);

  /* bridge chords for the palette and routes */
  const dom7 = SCALES[toKey][4] + "7";          // 5 of the new key
  const twoOf = SCALES[toKey][1] + "m";          // 2m of the new key

  const chordSub = (name) => {
    const inA = dA.find((c) => c.name === name);
    const inB = dB.find((c) => c.name === name);
    if (name === dom7) return `5⁷ of ${toKey}`;
    const parts = [];
    if (inA) parts.push(`${inA.num} in ${fromKey}`);
    if (inB) parts.push(`${inB.num} in ${toKey}`);
    return parts.join(" · ") || "outside both keys";
  };

  const mk = (name) => ({ name, sub: chordSub(name) });

  /* routes */
  const routes = useMemo(() => {
    if (fromKey === toKey) return [];
    const r = [];
    if (pivots.length) {
      const p = pivots[0];
      r.push({
        title: "The smooth pivot",
        blurb: `${p.name} lives in both keys: it's ${p.numA} in ${fromKey} and ${p.numB} in ${toKey}. Land on it as an old friend, leave it as a new one, then let the dominant pull you home.`,
        chords: [mk(dA[0].name), mk(p.name), mk(dom7), mk(dB[0].name)],
      });
    }
    r.push({
      title: "The two-five lift",
      blurb: `Borrow the classic jazz runway: the 2m and 5⁷ of ${toKey} point so strongly at the new key that the landing feels inevitable, even when ${twoOf} is a stranger to ${fromKey}.`,
      chords: [mk(dA[0].name), mk(twoOf), mk(dom7), mk(dB[0].name)],
    });
    r.push({
      title: "The straight dominant",
      blurb: `No preparation, just authority: play the 5⁷ of the new key and resolve. Works between any two keys on the wheel. The further apart they are, the more dramatic it sounds.`,
      chords: [mk(dA[0].name), mk(dom7), mk(dB[0].name)],
    });
    if (semis === 1 || semis === 2) {
      r.push({
        title: "The gear shift",
        blurb: `${toKey} sits ${semis === 1 ? "a half step" : "a whole step"} above ${fromKey}: the classic final-chorus lift. You can simply jump on a section boundary and let the surprise be the point.`,
        chords: [mk(dA[0].name), mk(dB[0].name)],
      });
    }
    return r;
  }, [fromKey, toKey, pivots, dA, dB, dom7, twoOf, semis]);

  const addChord = (name) => setStrip((s) => [...s, mk(name)]);
  const loadRoute = (chords) => setStrip(chords);

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">Connecting keys</div>
        <h1>Key Bridge</h1>
        <p className="lede">
          Pick where you are and where you want to go. See the chords the two
          keys share, learn the routes between them, and build a progression
          that crosses the seam like it was always meant to.
        </p>
      </header>

      <GuidePanel
        prompt="What am I looking at?"
        columns={[
          {
            title: "The idea",
            body: "A key change lands well when the listener's ear is escorted, not shoved. Two things do the escorting: pivot chords, which belong to both keys at once and quietly switch allegiance mid-song, and dominants, which point at a new home so hard the ear expects the arrival before it happens.",
          },
          {
            title: "How to read it",
            body: 'Every chord chip wears its job titles: "6m in C · 2m in G" means the same chord holds a different office in each key. That double life is the whole trick. The routes below are ready-made crossings, ordered from smoothest to boldest, and each one can be loaded into the builder and edited.',
          },
          {
            title: "How to use it",
            body: "Start with a route, then make it yours: stretch the opening with more chords from the left palette, delay the arrival, or repeat the bridge chords to build tension. Rule of thumb: the fewer notes two keys share, the more preparation the change wants. Or none at all, if drama is the goal.",
          },
        ]}
      />

      <section className="controls">
        <div className="ctrl-group">
          <span className="ctrl-label">From key</span>
          <div className="chip-row">
            {FIFTHS.map((k) => (
              <button key={k} className={"chip" + (k === fromKey ? " on" : "")} aria-pressed={k === fromKey} onClick={() => { setFromKey(k); setStrip([]); }}>{k}</button>
            ))}
          </div>
        </div>
        <div className="ctrl-group">
          <span className="ctrl-label">To key</span>
          <div className="chip-row">
            {FIFTHS.map((k) => (
              <button key={k} className={"chip to" + (k === toKey ? " on" : "")} aria-pressed={k === toKey} onClick={() => { setToKey(k); setStrip([]); }}>{k}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="analysis">
        <p className="relation">
          <b>{fromKey} → {toKey}:</b> {relationText}.
        </p>
        {fromKey !== toKey && (
          <div className="pivot-block">
            <span className="ctrl-label">Chords they share</span>
            {pivots.length ? (
              <div className="chip-row">
                {pivots.map((p) => (
                  <button key={p.name} className="pivot-chip" onClick={() => addChord(p.name)} title="Add to your progression">
                    <span className="pname">{p.name}</span>
                    <span className="psub">{p.numA} in {fromKey} · {p.numB} in {toKey}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="hint-line">
                None. These keys are strangers, which is its own kind of freedom:
                use the dominant route, or hop through a middle key first.
              </p>
            )}
          </div>
        )}
      </section>

      {fromKey !== toKey && (
        <section className="routes">
          <span className="ctrl-label">Routes, smoothest to boldest</span>
          <div className="route-grid">
            {routes.map((r) => (
              <div key={r.title} className="route">
                <div className="route-head">
                  <h3>{r.title}</h3>
                  <button className="mini-btn" onClick={() => loadRoute(r.chords)}>Load into builder</button>
                </div>
                <div className="strip">
                  {r.chords.map((c, i) => (
                    <div key={i} className="strip-item">
                      <span className="schord">{c.name}</span>
                      <span className="ssub">{c.sub}</span>
                    </div>
                  ))}
                </div>
                <p className="route-blurb">{r.blurb}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="builder">
        <span className="ctrl-label">Progression builder</span>
        <div className="palettes">
          <div className="palette">
            <span className="pal-label">In {fromKey}</span>
            <div className="chip-row">
              {dA.map((c) => (
                <button key={c.name} className="pal-chip" onClick={() => addChord(c.name)}>
                  <b>{c.name}</b><i>{c.num}</i>
                </button>
              ))}
            </div>
          </div>
          <div className="palette bridge-pal">
            <span className="pal-label">Bridge</span>
            <div className="chip-row">
              <button className="pal-chip amber" onClick={() => addChord(twoOf)}><b>{twoOf}</b><i>2m of {toKey}</i></button>
              <button className="pal-chip amber" onClick={() => addChord(dom7)}><b>{dom7}</b><i>5⁷ of {toKey}</i></button>
            </div>
          </div>
          <div className="palette">
            <span className="pal-label">In {toKey}</span>
            <div className="chip-row">
              {dB.map((c) => (
                <button key={c.name} className="pal-chip" onClick={() => addChord(c.name)}>
                  <b>{c.name}</b><i>{c.num}</i>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="strip big">
          {strip.length === 0 ? (
            <span className="hint-line">Tap chords above, or load a route. Your progression appears here.</span>
          ) : (
            strip.map((c, i) => (
              <div key={i} className="strip-item">
                <span className="schord">{c.name}</span>
                <span className="ssub">{c.sub}</span>
              </div>
            ))
          )}
        </div>
        {strip.length > 0 && (
          <div className="strip-actions">
            <button className="mini-btn" onClick={() => setStrip((s) => s.slice(0, -1))}>Undo</button>
            <button className="mini-btn" onClick={() => setStrip([])}>Clear</button>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
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

.controls { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.chip-row { display: flex; flex-wrap: wrap; gap: 7px; }
.chip { background: var(--panel); border: 1.5px solid var(--line); color: var(--ink); border-radius: 999px; padding: 7px 13px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; min-width: 42px; }
.chip:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.chip.on { background: var(--ink); border-color: var(--ink); color: #1A130E; }
.chip.to.on { background: var(--amber); border-color: var(--amber); }

.analysis { max-width: 1100px; margin-bottom: 22px; display: flex; flex-direction: column; gap: 12px; }
.relation { font-size: 15.5px; margin: 0; color: var(--ink); }
.relation b { font-family: var(--font-display); font-size: 17px; }
.pivot-block { display: flex; flex-direction: column; gap: 8px; }
.pivot-chip { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; background: var(--panel); border: 1.5px solid var(--line); border-radius: 12px; padding: 8px 13px; cursor: pointer; font-family: inherit; }
.pivot-chip:hover { border-color: var(--amber); }
.pname { font-size: 16px; font-weight: 700; color: var(--ink); }
.psub { font-family: var(--font-mono); font-size: 10.5px; color: var(--amber); }
.hint-line { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; }

.routes { max-width: 1100px; margin-bottom: 26px; display: flex; flex-direction: column; gap: 10px; }
.route-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; }
.route { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; }
.route-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
.route h3 { font-family: var(--font-display); font-weight: 650; font-size: 18px; margin: 0; }
.route-blurb { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; }
.mini-btn { background: var(--panel2); border: 1.5px solid var(--line); color: var(--ink); border-radius: 8px; padding: 5px 11px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
.mini-btn:hover { border-color: var(--amber); }
.mini-btn:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }

.strip { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.strip-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: var(--panel2); border: 1px solid var(--line); border-radius: 10px; padding: 7px 12px; position: relative; }
.strip-item:not(:last-child)::after { content: "→"; position: absolute; right: -13px; color: var(--muted); font-size: 13px; }
.schord { font-size: 16px; font-weight: 700; }
.ssub { font-family: var(--font-mono); font-size: 9.5px; color: var(--amber); white-space: nowrap; }
.strip.big { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 16px; min-height: 62px; gap: 16px; }

.builder { max-width: 1100px; display: flex; flex-direction: column; gap: 12px; }
.palettes { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: start; }
@media (max-width: 860px) { .palettes { grid-template-columns: 1fr; } }
.palette { display: flex; flex-direction: column; gap: 7px; }
.pal-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.pal-chip { display: flex; flex-direction: column; align-items: center; gap: 1px; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; padding: 6px 11px; cursor: pointer; font-family: inherit; color: var(--ink); }
.pal-chip:hover { border-color: var(--amber); }
.pal-chip b { font-size: 14.5px; }
.pal-chip i { font-style: normal; font-family: var(--font-mono); font-size: 9.5px; color: var(--muted); }
.pal-chip.amber { border-color: var(--amber); }
.pal-chip.amber b { color: var(--amber); }
.strip-actions { display: flex; gap: 8px; }
`;
