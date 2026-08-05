"use client";

import { useState, useMemo, useCallback } from "react";
import { FIFTHS, SCALES } from "@/lib/theory";

/* ------------------------------------------------------------------ */
/* Music data                                                          */
/* ------------------------------------------------------------------ */
const EASY_KEYS = ["C","G","D","A","E"];

const SUFFIX = ["", "m", "m", "", "", "m", "°"];
const NUMS = ["1", "2m", "3m", "4", "5", "6m", "7°"];
const ORDINAL = ["1st","2nd","3rd","4th","5th","6th","7th"];

const chordAt = (key, deg) => SCALES[key][deg] + SUFFIX[deg];

const PRESETS = [
  { name: "Workhorse",   degrees: [0, 3, 4] },
  { name: "Anthem",      degrees: [0, 4, 5, 3] },
  { name: "Moody pop",   degrees: [5, 3, 0, 4] },
  { name: "Doo-wop",     degrees: [0, 5, 3, 4] },
  { name: "Turnaround",  degrees: [1, 4, 0] },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ------------------------------------------------------------------ */
export default function NashvilleTrainer() {
  const [tab, setTab] = useState("learn"); // learn | quiz
  const [showGuide, setShowGuide] = useState(true);

  /* ------------------------- learn state ------------------------- */
  const [key, setKey] = useState("G");
  const [altKey, setAltKey] = useState("E");
  const [strip, setStrip] = useState([0, 4, 5, 3]);

  /* ------------------------- quiz state -------------------------- */
  const [pool, setPool] = useState("easy"); // easy | all
  const [q, setQ] = useState(null);
  const [picked, setPicked] = useState(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const nextQuestion = useCallback(() => {
    const keys = pool === "easy" ? EASY_KEYS : FIFTHS;
    const k = keys[Math.floor(Math.random() * keys.length)];
    const deg = Math.floor(Math.random() * 7);
    const type = Math.random() < 0.5 ? "toChord" : "toNum";
    let options, answer;
    if (type === "toChord") {
      answer = chordAt(k, deg);
      const others = shuffle([0,1,2,3,4,5,6].filter((d) => d !== deg)).slice(0, 3).map((d) => chordAt(k, d));
      options = shuffle([answer, ...others]);
    } else {
      answer = NUMS[deg];
      const others = shuffle([0,1,2,3,4,5,6].filter((d) => d !== deg)).slice(0, 3).map((d) => NUMS[d]);
      options = shuffle([answer, ...others]);
    }
    setQ({ key: k, deg, type, options, answer });
    setPicked(null);
  }, [pool]);

  const answerQuiz = (opt) => {
    if (picked !== null) return;
    setPicked(opt);
    const right = opt === q.answer;
    setScore((s) => ({ right: s.right + (right ? 1 : 0), total: s.total + 1 }));
    setStreak((st) => {
      const ns = right ? st + 1 : 0;
      setBest((b) => Math.max(b, ns));
      return ns;
    });
  };

  const stripChords = useMemo(() => strip.map((d) => ({ deg: d, num: NUMS[d], a: chordAt(key, d), b: chordAt(altKey, d) })), [strip, key, altKey]);

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">The language of the session</div>
        <h1>Nashville Number Trainer</h1>
        <p className="lede">
          Numbers are chords with the key removed. Learn to think in them, and
          every song you know works in every key you can play.
        </p>
      </header>

      <section className="guide">
        <button className="guide-toggle" aria-expanded={showGuide} onClick={() => setShowGuide(!showGuide)}>
          {showGuide ? "Hide the guide" : "What are these numbers?"}
        </button>
        {showGuide && (
          <div className="guide-body">
            <div className="guide-col">
              <h3>The idea</h3>
              <p>
                Number the notes of any major scale 1 through 7, and build a
                chord on each. Now a progression isn't "G, C, D", it's "1, 4, 5",
                and that sentence is true in every key at once. Studio players
                chart entire songs this way: when the singer wants it a step
                down, nobody rewrites anything. The numbers don't move.
              </p>
            </div>
            <div className="guide-col">
              <h3>How to read them</h3>
              <p>
                A bare number is a major chord, a lowercase m makes it minor,
                and the little circle on 7 marks the diminished chord. In every
                major key the pattern is identical: 1, 4 and 5 are major, 2, 3
                and 6 are minor, 7 is diminished. Memorize that one sentence and
                you know the chords of all twelve keys.
              </p>
            </div>
            <div className="guide-col">
              <h3>How to practice</h3>
              <p>
                Build progressions in the builder and watch the same numbers
                wear different chords in two keys side by side. Then switch to
                the quiz and drill both directions: number to chord and chord to
                number. Start with the easy keys, and when your streak stops
                resetting, open the pool to all twelve.
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="tabs">
        <button className={tab === "learn" ? "on" : ""} aria-pressed={tab === "learn"} onClick={() => setTab("learn")}>Builder</button>
        <button className={tab === "quiz" ? "on" : ""} aria-pressed={tab === "quiz"} onClick={() => { setTab("quiz"); if (!q) nextQuestion(); }}>Quiz</button>
      </div>

      {tab === "learn" && (
        <section className="learn">
          <div className="ctrl-row">
            <div className="ctrl-group">
              <span className="ctrl-label">Key</span>
              <div className="chip-row">
                {FIFTHS.map((k) => (
                  <button key={k} className={"chip" + (k === key ? " on" : "")} aria-pressed={k === key} onClick={() => setKey(k)}>{k}</button>
                ))}
              </div>
            </div>
            <div className="ctrl-group">
              <span className="ctrl-label">Compare with</span>
              <div className="chip-row">
                {FIFTHS.map((k) => (
                  <button key={k} className={"chip alt" + (k === altKey ? " on" : "")} aria-pressed={k === altKey} onClick={() => setAltKey(k)}>{k}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="ctrl-group">
            <span className="ctrl-label">Tap numbers to build · or load a classic</span>
            <div className="chip-row">
              {NUMS.map((n, d) => (
                <button key={n} className="num-chip" onClick={() => setStrip((s) => [...s, d])}>
                  <b>{n}</b><i>{chordAt(key, d)}</i>
                </button>
              ))}
              <span className="divider" />
              {PRESETS.map((p) => (
                <button key={p.name} className="chip ghost" onClick={() => setStrip(p.degrees)}>{p.name}</button>
              ))}
            </div>
          </div>

          <div className="strip-wrap">
            {stripChords.length === 0 ? (
              <span className="hint-line">Tap numbers above. Your chart appears here.</span>
            ) : (
              <>
                <div className="strip">
                  {stripChords.map((c, i) => (
                    <div key={i} className="strip-item">
                      <span className="snum">{c.num}</span>
                      <span className="schord">{c.a}</span>
                      <span className="schord alt">{c.b}</span>
                    </div>
                  ))}
                </div>
                <p className="strip-caption">
                  top: the number · middle: in {key} · bottom: the same chart in {altKey}
                </p>
                <div className="strip-actions">
                  <button className="mini-btn" onClick={() => setStrip((s) => s.slice(0, -1))}>Undo</button>
                  <button className="mini-btn" onClick={() => setStrip([])}>Clear</button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {tab === "quiz" && q && (
        <section className="quiz">
          <div className="quiz-top">
            <div className="ctrl-group">
              <span className="ctrl-label">Key pool</span>
              <div className="seg">
                <button className={pool === "easy" ? "on" : ""} aria-pressed={pool === "easy"} onClick={() => setPool("easy")}>Easy keys</button>
                <button className={pool === "all" ? "on" : ""} aria-pressed={pool === "all"} onClick={() => setPool("all")}>All twelve</button>
              </div>
            </div>
            <div className="scoreboard">
              <div className="score-cell"><span className="score-num">{streak}</span><span className="score-word">streak</span></div>
              <div className="score-cell"><span className="score-num">{best}</span><span className="score-word">best</span></div>
              <div className="score-cell"><span className="score-num">{score.right}/{score.total}</span><span className="score-word">correct</span></div>
            </div>
          </div>

          <div className="q-card">
            <p className="q-text">
              {q.type === "toChord"
                ? <>In the key of <b>{q.key}</b>, the <b>{q.deg + 1}</b> chord is...</>
                : <>In the key of <b>{q.key}</b>, <b>{chordAt(q.key, q.deg)}</b> is the...</>}
            </p>
            <div className="opts">
              {q.options.map((o) => {
                let cls = "opt";
                if (picked !== null) {
                  if (o === q.answer) cls += " right";
                  else if (o === picked) cls += " wrong";
                  else cls += " off";
                }
                return (
                  <button key={o} className={cls} disabled={picked !== null} onClick={() => answerQuiz(o)}>{o}</button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="verdict">
                <p className={picked === q.answer ? "good" : "bad"}>
                  {picked === q.answer ? "Right." : `Not quite: it's ${q.answer}.`}{" "}
                  {SCALES[q.key][q.deg]} is the {ORDINAL[q.deg]} note of the {q.key} scale,
                  so {chordAt(q.key, q.deg)} is the {NUMS[q.deg]}.
                </p>
                <button className="go-btn" onClick={nextQuestion}>Next</button>
              </div>
            )}
          </div>
          <p className="hint-line">
            Streaks live for this session only for now. Saved progress arrives
            with practice tracking.
          </p>
        </section>
      )}
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

.tabs { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 12px; overflow: hidden; margin-bottom: 22px; }
.tabs button { background: none; border: none; color: var(--muted); padding: 10px 22px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; }
.tabs button.on { background: var(--amber); color: #1A130E; }
.tabs button:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }

.ctrl-row { display: flex; flex-wrap: wrap; gap: 16px 28px; margin-bottom: 18px; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.chip-row { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.chip { background: var(--panel); border: 1.5px solid var(--line); color: var(--ink); border-radius: 999px; padding: 7px 13px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; min-width: 42px; }
.chip:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.chip.on { background: var(--ink); border-color: var(--ink); color: #1A130E; }
.chip.alt.on { background: var(--amber); border-color: var(--amber); }
.chip.ghost { color: var(--muted); font-weight: 500; }
.divider { width: 1.5px; height: 26px; background: var(--line); margin: 0 6px; }

.num-chip { display: flex; flex-direction: column; align-items: center; gap: 1px; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; padding: 7px 13px; cursor: pointer; font-family: inherit; color: var(--ink); }
.num-chip:hover { border-color: var(--amber); }
.num-chip b { font-size: 16px; font-family: var(--font-display); }
.num-chip i { font-style: normal; font-family: var(--font-mono); font-size: 9.5px; color: var(--muted); }

.learn { max-width: 1100px; display: flex; flex-direction: column; gap: 18px; }
.strip-wrap { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 18px; display: flex; flex-direction: column; gap: 12px; }
.strip { display: flex; flex-wrap: wrap; gap: 14px; }
.strip-item { display: flex; flex-direction: column; align-items: center; gap: 3px; background: var(--panel2); border: 1px solid var(--line); border-radius: 12px; padding: 10px 16px; min-width: 62px; }
.snum { font-family: var(--font-display); font-size: 24px; font-weight: 650; color: var(--amber); line-height: 1; }
.schord { font-size: 15px; font-weight: 700; }
.schord.alt { font-size: 13px; color: var(--muted); font-weight: 600; }
.strip-caption { font-family: var(--font-mono); font-size: 10.5px; color: #7A6F60; margin: 0; letter-spacing: 0.04em; }
.strip-actions { display: flex; gap: 8px; }
.mini-btn { background: var(--panel2); border: 1.5px solid var(--line); color: var(--ink); border-radius: 8px; padding: 5px 11px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit; align-self: flex-start; }
.mini-btn:hover { border-color: var(--amber); }
.hint-line { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; }

.quiz { max-width: 720px; display: flex; flex-direction: column; gap: 16px; }
.quiz-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
.seg { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; overflow: hidden; }
.seg button { background: none; border: none; color: var(--muted); padding: 8px 13px; font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
.seg button.on { background: var(--panel2); color: var(--ink); }
.scoreboard { display: flex; gap: 10px; }
.score-cell { display: flex; flex-direction: column; align-items: center; background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 8px 14px; }
.score-num { font-family: var(--font-display); font-size: 20px; font-weight: 650; color: var(--amber); }
.score-word { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }

.q-card { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 18px; }
.q-text { font-size: 19px; margin: 0; line-height: 1.5; }
.q-text b { font-family: var(--font-display); font-size: 22px; color: var(--amber); }
.opts { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }
.opt { background: var(--panel2); border: 1.5px solid var(--line); color: var(--ink); border-radius: 12px; padding: 14px; font-size: 18px; font-weight: 700; cursor: pointer; font-family: inherit; }
.opt:hover:not(:disabled) { border-color: var(--amber); }
.opt:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.opt.right { border-color: var(--green); color: var(--green); }
.opt.wrong { border-color: var(--red); color: var(--red); }
.opt.off { opacity: 0.4; }
.verdict { display: flex; flex-direction: column; gap: 12px; }
.verdict p { margin: 0; font-size: 14.5px; line-height: 1.6; }
.verdict .good { color: var(--green); }
.verdict .bad { color: var(--red); }
.go-btn { background: var(--amber); border: none; color: #1A130E; border-radius: 12px; padding: 11px 26px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; align-self: flex-start; }
.go-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
`;
