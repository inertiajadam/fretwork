"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/* Drill data                                                          */
/* ------------------------------------------------------------------ */
const INTERVALS = [
  { semis: 1,  name: "Minor 2nd",   hint: "one half step, the shark is coming" },
  { semis: 2,  name: "Major 2nd",   hint: "two half steps, a plain walking step" },
  { semis: 3,  name: "Minor 3rd",   hint: "three half steps, the sad third" },
  { semis: 4,  name: "Major 3rd",   hint: "four half steps, the happy third" },
  { semis: 5,  name: "Perfect 4th", hint: "five half steps, a fanfare opening" },
  { semis: 6,  name: "Tritone",     hint: "six half steps, maximum tension" },
  { semis: 7,  name: "Perfect 5th", hint: "seven half steps, wide open and stable" },
  { semis: 8,  name: "Minor 6th",   hint: "eight half steps, bittersweet leap" },
  { semis: 9,  name: "Major 6th",   hint: "nine half steps, a warm reach upward" },
  { semis: 10, name: "Minor 7th",   hint: "ten half steps, jazzy and unresolved" },
  { semis: 11, name: "Major 7th",   hint: "eleven half steps, almost home, aching" },
  { semis: 12, name: "Octave",      hint: "twelve half steps, same note, new floor" },
];
const INT_LEVELS = [[4, 5, 7, 12], [2, 3, 4, 5, 7, 9, 12], INTERVALS.map((i) => i.semis)];

const CHORDS = [
  { id: "maj",  name: "Major",      tones: [0, 4, 7],      hint: "bright and settled" },
  { id: "min",  name: "Minor",      tones: [0, 3, 7],      hint: "dark and settled" },
  { id: "dom7", name: "Dominant 7", tones: [0, 4, 7, 10],  hint: "bright but restless, leaning forward" },
  { id: "min7", name: "Minor 7",    tones: [0, 3, 7, 10],  hint: "dark and smooth, no urgency" },
  { id: "maj7", name: "Major 7",    tones: [0, 4, 7, 11],  hint: "bright and floaty, a soft landing" },
  { id: "dim",  name: "Diminished", tones: [0, 3, 6],      hint: "clenched and unstable" },
  { id: "aug",  name: "Augmented",  tones: [0, 4, 8],      hint: "dreamlike, nowhere to stand" },
];
const CHORD_LEVELS = [["maj", "min"], ["maj", "min", "dom7", "min7"], CHORDS.map((c) => c.id)];

const DEG = { "1": [0, "maj"], "2m": [2, "min"], "3m": [4, "min"], "4": [5, "maj"], "5": [7, "maj"], "6m": [9, "min"] };
const PROGS = [
  { id: "1 4 5 1",    hint: "home, away, tension, home: the oldest story" },
  { id: "1 5 6m 4",   hint: "the four-chord anthem, hope with a shadow" },
  { id: "6m 4 1 5",   hint: "starts in the shadow, the moody cousin" },
  { id: "1 6m 4 5",   hint: "the doo-wop turn, vintage romance" },
  { id: "1 4 6m 5",   hint: "sunny start, wistful middle" },
  { id: "1 3m 6m 4",  hint: "falling by thirds, gentle melancholy" },
  { id: "2m 5 1 1",   hint: "the jazz runway: approach, approach, land" },
];
const PROG_LEVELS = [
  ["1 4 5 1", "1 5 6m 4", "6m 4 1 5"],
  ["1 4 5 1", "1 5 6m 4", "6m 4 1 5", "1 6m 4 5", "1 4 6m 5"],
  PROGS.map((p) => p.id),
];

const DRILLS = { intervals: "Intervals", chords: "Chord colors", progressions: "Progressions" };

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ------------------------------------------------------------------ */
export default function EarTrainer() {
  const [drill, setDrill] = useState("intervals");
  const [level, setLevel] = useState(0);
  const [style, setStyle] = useState("melodic"); // intervals only
  const [q, setQ] = useState(null);
  const [picked, setPicked] = useState(null);
  const [played, setPlayed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [showGuide, setShowGuide] = useState(true);

  const ctxRef = useRef(null);
  useEffect(() => () => { ctxRef.current?.close().catch(() => {}); }, []);

  const getCtx = () => {
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  };

  /* ------------------------- synthesis ---------------------------- */
  const pluck = (ctx, midi, t, dur = 1.1, vol = 0.28) => {
    const f = 440 * Math.pow(2, (midi - 69) / 12);
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = f;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2400, t);
    lp.frequency.exponentialRampToValueAtTime(900, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(lp).connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  };
  const strum = (ctx, midis, t, dur = 1.15) =>
    midis.forEach((m, i) => pluck(ctx, m, t + i * 0.038, dur, 0.2));

  const playQuestion = useCallback((question) => {
    const ctx = getCtx();
    const t0 = ctx.currentTime + 0.06;
    if (question.drill === "intervals") {
      if (question.style === "harmonic") {
        pluck(ctx, question.root, t0, 1.5);
        pluck(ctx, question.root + question.semis, t0, 1.5);
      } else {
        pluck(ctx, question.root, t0);
        pluck(ctx, question.root + question.semis, t0 + 0.72);
      }
    } else if (question.drill === "chords") {
      const tones = CHORDS.find((c) => c.id === question.chordId).tones;
      strum(ctx, tones.map((s) => question.root + s).concat(question.root + 12), t0, 1.5);
    } else {
      question.chords.forEach((midis, i) => strum(ctx, midis, t0 + i * 0.95, 1.0));
    }
    setPlayed(true);
  }, []);

  /* ---------------------- question generation --------------------- */
  const nextQuestion = useCallback((autoPlay) => {
    let question;
    if (drill === "intervals") {
      const semis = pick(INT_LEVELS[level]);
      question = { drill, style, semis, root: 48 + Math.floor(Math.random() * 17),
        answer: INTERVALS.find((i) => i.semis === semis).name,
        options: INT_LEVELS[level].map((s) => INTERVALS.find((i) => i.semis === s).name) };
    } else if (drill === "chords") {
      const chordId = pick(CHORD_LEVELS[level]);
      question = { drill, chordId, root: 48 + Math.floor(Math.random() * 13),
        answer: CHORDS.find((c) => c.id === chordId).name,
        options: CHORD_LEVELS[level].map((id) => CHORDS.find((c) => c.id === id).name) };
    } else {
      const progId = pick(PROG_LEVELS[level]);
      const keyRoot = 45 + Math.floor(Math.random() * 8);
      const chords = progId.split(" ").map((tok) => {
        const [off, qual] = DEG[tok];
        const r = keyRoot + off;
        return [r, r + (qual === "min" ? 3 : 4), r + 7, r + 12];
      });
      question = { drill, progId, chords, answer: progId, options: PROG_LEVELS[level] };
    }
    setQ(question);
    setPicked(null);
    setPlayed(false);
    if (autoPlay && ctxRef.current) playQuestion(question);
  }, [drill, level, style, playQuestion]);

  /* regenerate when drill or level changes */
  useEffect(() => { nextQuestion(false); setStreak(0); }, [drill, level]); // eslint-disable-line

  const answer = (opt) => {
    if (!q || picked !== null || !played) return;
    setPicked(opt);
    const right = opt === q.answer;
    setScore((s) => ({ right: s.right + (right ? 1 : 0), total: s.total + 1 }));
    setStreak((st) => {
      const ns = right ? st + 1 : 0;
      setBest((b) => Math.max(b, ns));
      return ns;
    });
  };

  const whyLine = () => {
    if (!q) return "";
    if (q.drill === "intervals") return INTERVALS.find((i) => i.name === q.answer).hint;
    if (q.drill === "chords") return CHORDS.find((c) => c.name === q.answer).hint;
    return PROGS.find((p) => p.id === q.answer).hint;
  };

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">Train the instrument between your ears</div>
        <h1>Ear Trainer</h1>
        <p className="lede">
          Intervals, chord colors, and progressions, played to you and named by
          you. This is the skill that turns hearing music into understanding it.
        </p>
      </header>

      <section className="guide">
        <button className="guide-toggle" aria-expanded={showGuide} onClick={() => setShowGuide(!showGuide)}>
          {showGuide ? "Hide the guide" : "How does this work?"}
        </button>
        {showGuide && (
          <div className="guide-body">
            <div className="guide-col">
              <h3>The idea</h3>
              <p>
                Every musical distance has a flavor your ear already knows from
                a thousand songs; you just haven't attached names yet. That's
                all ear training is: hear a sound, name it, check, repeat.
                Attach the names, and suddenly you can find a melody on the
                neck, name a chord from across the room, and learn songs
                without a chart.
              </p>
            </div>
            <div className="guide-col">
              <h3>The three drills</h3>
              <p>
                Intervals is the distance between two notes, the atoms of
                melody. Chord colors is the mood of a stack: settled or
                restless, bright or dark. Progressions is the largest unit,
                recognizing the four-chord stories that power most songs. They
                build on each other, and each has three levels, so start where
                it's almost easy.
              </p>
            </div>
            <div className="guide-col">
              <h3>How to practice</h3>
              <p>
                Play the sound as many times as you like before answering, and
                sing it back before you guess: singing forces the ear to commit.
                Five focused minutes daily beats an hour on Sunday. When a level
                stops resetting your streak, move up. Wrong answers teach the
                most, so read the flavor line every time.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="controls">
        <div className="ctrl-row">
          <div className="ctrl-group">
            <span className="ctrl-label">Drill</span>
            <div className="seg">
              {Object.entries(DRILLS).map(([id, label]) => (
                <button key={id} className={drill === id ? "on" : ""} aria-pressed={drill === id} onClick={() => setDrill(id)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="ctrl-group">
            <span className="ctrl-label">Level</span>
            <div className="seg">
              {[0, 1, 2].map((l) => (
                <button key={l} className={level === l ? "on" : ""} aria-pressed={level === l} onClick={() => setLevel(l)}>{l + 1}</button>
              ))}
            </div>
          </div>
          {drill === "intervals" && (
            <div className="ctrl-group">
              <span className="ctrl-label">Style</span>
              <div className="seg">
                <button className={style === "melodic" ? "on" : ""} aria-pressed={style === "melodic"} onClick={() => setStyle("melodic")}>One at a time</button>
                <button className={style === "harmonic" ? "on" : ""} aria-pressed={style === "harmonic"} onClick={() => setStyle("harmonic")}>Together</button>
              </div>
            </div>
          )}
          <div className="scoreboard">
            <div className="score-cell"><span className="score-num">{streak}</span><span className="score-word">streak</span></div>
            <div className="score-cell"><span className="score-num">{best}</span><span className="score-word">best</span></div>
            <div className="score-cell"><span className="score-num">{score.right}/{score.total}</span><span className="score-word">correct</span></div>
          </div>
        </div>
      </section>

      {q && (
        <section className="q-card">
          <div className="play-row">
            <button className="go-btn" onClick={() => playQuestion(q)}>
              {played ? "Play again" : "Play"}
            </button>
            <span className="play-hint">
              {q.drill === "intervals"
                ? "Two notes. How far apart?"
                : q.drill === "chords"
                ? "One chord. What's its color?"
                : "Four chords in a row. Which story is it?"}
            </span>
          </div>

          <div className={"opts" + (q.drill === "progressions" ? " wide" : "")}>
            {q.options.map((o) => {
              let cls = "opt";
              if (picked !== null) {
                if (o === q.answer) cls += " right";
                else if (o === picked) cls += " wrong";
                else cls += " off";
              }
              return (
                <button key={o} className={cls} disabled={picked !== null || !played} onClick={() => answer(o)}>{o}</button>
              );
            })}
          </div>
          {!played && <p className="hint-line">Press play first, then answer. Replays are free and encouraged.</p>}

          {picked !== null && (
            <div className="verdict">
              <p className={picked === q.answer ? "good" : "bad"}>
                {picked === q.answer ? "Right: " : `Not quite, it was ${q.answer}: `}
                {whyLine()}.
              </p>
              <button className="go-btn" onClick={() => nextQuestion(true)}>Next</button>
            </div>
          )}
        </section>
      )}

      <p className="hint-line footer-note">
        Streaks live for this session only for now. Saved progress arrives with
        practice tracking.
      </p>
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

.guide { margin-bottom: 22px; max-width: 1100px; }
.guide-toggle { background: none; border: none; color: var(--amber); cursor: pointer; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; padding: 0 0 10px; font-weight: 500; }
.guide-toggle:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.guide-body { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 20px 22px; }
.guide-col h3 { font-family: var(--font-display); font-weight: 650; font-size: 17px; margin: 0 0 8px; }
.guide-col p { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 0; }

.controls { margin-bottom: 18px; }
.ctrl-row { display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: flex-end; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.seg { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; overflow: hidden; flex-wrap: wrap; }
.seg button { background: none; border: none; color: var(--muted); padding: 8px 14px; font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
.seg button:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
.seg button.on { background: var(--panel2); color: var(--ink); }
.scoreboard { display: flex; gap: 10px; margin-left: auto; }
.score-cell { display: flex; flex-direction: column; align-items: center; background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 8px 14px; }
.score-num { font-family: var(--font-display); font-size: 20px; font-weight: 650; color: var(--amber); }
.score-word { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }

.q-card { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 18px; max-width: 760px; }
.play-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.play-hint { color: var(--muted); font-size: 14.5px; }
.opts { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
.opts.wide { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
.opt { background: var(--panel2); border: 1.5px solid var(--line); color: var(--ink); border-radius: 12px; padding: 13px 10px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; }
.opt:hover:not(:disabled) { border-color: var(--amber); }
.opt:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.opt:disabled { cursor: default; }
.opt.right { border-color: var(--green); color: var(--green); }
.opt.wrong { border-color: var(--red); color: var(--red); }
.opt.off { opacity: 0.4; }
.verdict { display: flex; flex-direction: column; gap: 12px; }
.verdict p { margin: 0; font-size: 14.5px; line-height: 1.6; }
.verdict .good { color: var(--green); }
.verdict .bad { color: var(--red); }
.go-btn { background: var(--amber); border: none; color: #1A130E; border-radius: 12px; padding: 12px 26px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; align-self: flex-start; }
.go-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.hint-line { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; }
.footer-note { margin-top: 16px; }
`;
