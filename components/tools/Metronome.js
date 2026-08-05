"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import GuidePanel from "@/components/ui/GuidePanel";
import { newAudioContext } from "@/lib/audio";

/* ------------------------------------------------------------------ */
/* Time signatures: beats per bar and which beats get the accent       */
/* ------------------------------------------------------------------ */
const SIGS = {
  "2/4": { beats: 2, accents: [0] },
  "3/4": { beats: 3, accents: [0] },
  "4/4": { beats: 4, accents: [0] },
  "6/8": { beats: 6, accents: [0, 3] },
};

const clampBpm = (b) => Math.max(30, Math.min(260, b));

/* ------------------------------------------------------------------ */
export default function MetronomeSpeedBuilder() {
  const [tab, setTab] = useState("metro"); // metro | speed

  const [bpm, setBpm] = useState(92);
  const [sig, setSig] = useState("4/4");
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(-1);

  /* speed builder config + session */
  const [sb, setSb] = useState({ start: 70, target: 120, inc: 4, bars: 4, mode: "manual" });
  const [session, setSession] = useState(null); // { bpm, barsDone, cleanSteps }

  /* refs the audio scheduler reads live */
  const bpmRef = useRef(bpm);
  const sigRef = useRef(SIGS[sig]);
  const tabRef = useRef(tab);
  const sbRef = useRef(sb);
  const sessionRef = useRef(session);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { sigRef.current = SIGS[sig]; }, [sig]);
  useEffect(() => { tabRef.current = tab; }, [tab]);
  useEffect(() => { sbRef.current = sb; }, [sb]);
  useEffect(() => { sessionRef.current = session; }, [session]);

  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const nextTimeRef = useRef(0);
  const beatCountRef = useRef(0);
  const queueRef = useRef([]);
  const tapsRef = useRef([]);

  /* ---------------- audio engine: lookahead scheduler ------------- */
  const click = (ctx, time, accent) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = accent ? 1244 : 830; // bright tick, brighter downbeat
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(accent ? 0.5 : 0.32, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
    osc.connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.07);
  };

  const advanceLadder = useCallback(() => {
    // auto mode: called when a bar completes
    const s = sessionRef.current, cfg = sbRef.current;
    if (!s || cfg.mode !== "auto") return;
    const barsDone = s.barsDone + 1;
    if (barsDone >= cfg.bars && s.bpm < cfg.target) {
      const nb = Math.min(cfg.target, s.bpm + cfg.inc);
      setSession({ ...s, bpm: nb, barsDone: 0, cleanSteps: s.cleanSteps + 1 });
      setBpm(nb);
    } else {
      setSession({ ...s, barsDone });
    }
  }, []);

  const scheduler = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    while (nextTimeRef.current < ctx.currentTime + 0.12) {
      const sigNow = sigRef.current;
      const beatInBar = beatCountRef.current % sigNow.beats;
      const accent = sigNow.accents.includes(beatInBar);
      click(ctx, nextTimeRef.current, accent);
      queueRef.current.push({ time: nextTimeRef.current, beat: beatInBar });
      nextTimeRef.current += 60 / bpmRef.current;
      beatCountRef.current += 1;
      if (tabRef.current === "speed" && beatInBar === sigNow.beats - 1) advanceLadder();
    }
  }, [advanceLadder]);

  const draw = useCallback(() => {
    const ctx = ctxRef.current;
    if (ctx) {
      const q = queueRef.current;
      while (q.length && q[0].time <= ctx.currentTime) {
        setBeat(q[0].beat);
        q.shift();
      }
    }
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  const stopAll = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    rafRef.current = null;
    ctxRef.current?.close().catch(() => {});
    ctxRef.current = null;
    queueRef.current = [];
    setRunning(false);
    setBeat(-1);
  }, []);

  const startAll = useCallback(() => {
    const ctx = newAudioContext();
    ctxRef.current = ctx;
    nextTimeRef.current = ctx.currentTime + 0.08;
    beatCountRef.current = 0;
    queueRef.current = [];
    timerRef.current = setInterval(scheduler, 25);
    rafRef.current = requestAnimationFrame(draw);
    setRunning(true);
  }, [scheduler, draw]);

  useEffect(() => stopAll, [stopAll]);

  /* --------------------------- controls --------------------------- */
  const nudge = (d) => setBpm((b) => clampBpm(b + d));

  const tapTempo = () => {
    const now = performance.now();
    const taps = tapsRef.current.filter((t) => now - t < 2400);
    taps.push(now);
    tapsRef.current = taps;
    if (taps.length >= 2) {
      const gaps = taps.slice(1).map((t, i) => t - taps[i]);
      const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      setBpm(clampBpm(Math.round(60000 / avg)));
    }
  };

  const startSpeedSession = () => {
    const s = { bpm: sb.start, barsDone: 0, cleanSteps: 0 };
    setSession(s);
    setBpm(sb.start);
    if (!running) startAll();
  };

  const cleanPass = () => {
    if (!session) return;
    const nb = Math.min(sb.target, session.bpm + sb.inc);
    setSession({ ...session, bpm: nb, barsDone: 0, cleanSteps: session.cleanSteps + 1 });
    setBpm(nb);
  };
  const missedPass = () => {
    if (!session) return;
    const nb = Math.max(sb.start, session.bpm - sb.inc);
    setSession({ ...session, bpm: nb, barsDone: 0 });
    setBpm(nb);
  };

  const beats = SIGS[sig].beats;
  const ladderPct = session ? Math.round(((session.bpm - sb.start) / Math.max(1, sb.target - sb.start)) * 100) : 0;
  const atTarget = session && session.bpm >= sb.target;

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">Time is a skill</div>
        <h1>Metronome &amp; Speed Builder</h1>
        <p className="lede">
          A metronome that keeps honest time, and a ladder that raises it under
          you, a few beats per minute at a time, until fast feels easy.
        </p>
      </header>

      <GuidePanel
        prompt="How do I use this?"
        columns={[
          {
            title: "The metronome",
            body: "Set a tempo, pick a time signature, press start. The downbeat is brighter and higher so your ear finds the top of the bar without counting. Tap the tempo button in rhythm to match a song you're hearing. Practicing something new? Start slower than feels necessary. Clean and slow becomes clean and fast; sloppy and fast just becomes sloppier.",
          },
          {
            title: "The speed ladder",
            body: "Pick a lick or passage, a comfortable starting tempo, and a goal. In manual mode you're the judge: play a pass, then press Clean to climb or Missed to step back down. Honest presses, honest progress. Auto mode climbs by itself every few bars, which is great for building stamina on something you already have under your fingers.",
          },
          {
            title: "Why small steps work",
            body: "Your hands barely notice four extra beats per minute, and that's the trick: each step is so small there's nothing to tense up about, but twenty minutes of small steps is a tempo jump you'd never manage in one leap. When you hit a wall, drop back two steps and take a run at it. Walls move.",
          },
        ]}
      />

      <div className="tabs">
        <button className={tab === "metro" ? "on" : ""} aria-pressed={tab === "metro"} onClick={() => setTab("metro")}>Metronome</button>
        <button className={tab === "speed" ? "on" : ""} aria-pressed={tab === "speed"} onClick={() => setTab("speed")}>Speed builder</button>
      </div>

      <section className="face">
        {/* shared tempo block */}
        <div className="tempo-block">
          <div className="bpm-row">
            <button className="mini-btn" onClick={() => nudge(-5)}>−5</button>
            <button className="mini-btn" onClick={() => nudge(-1)}>−1</button>
            <div className="bpm-display">
              <span className="bpm-num">{bpm}</span>
              <span className="bpm-word">bpm</span>
            </div>
            <button className="mini-btn" onClick={() => nudge(1)}>+1</button>
            <button className="mini-btn" onClick={() => nudge(5)}>+5</button>
          </div>
          <input
            type="range" min="30" max="260" value={bpm} className="bpm-slider"
            onChange={(e) => setBpm(Number(e.target.value))} aria-label="Tempo"
          />
          <div className="row-under">
            <div className="seg">
              {Object.keys(SIGS).map((s) => (
                <button key={s} className={sig === s ? "on" : ""} aria-pressed={sig === s} onClick={() => setSig(s)}>{s}</button>
              ))}
            </div>
            <button className="mini-btn tap" onClick={tapTempo}>Tap tempo</button>
          </div>
        </div>

        {/* beat lights */}
        <div className="lights" aria-hidden="true">
          {Array.from({ length: beats }, (_, i) => (
            <span key={i} className={"light" + (beat === i ? (SIGS[sig].accents.includes(i) ? " hit accent" : " hit") : "")} />
          ))}
        </div>

        {tab === "speed" && (
          <div className="sb">
            <div className="sb-config">
              <label>Start
                <input type="number" min="30" max="260" value={sb.start} onChange={(e) => setSb({ ...sb, start: clampBpm(Number(e.target.value)) })} />
              </label>
              <label>Target
                <input type="number" min="30" max="260" value={sb.target} onChange={(e) => setSb({ ...sb, target: clampBpm(Number(e.target.value)) })} />
              </label>
              <label>Step
                <input type="number" min="1" max="20" value={sb.inc} onChange={(e) => setSb({ ...sb, inc: Math.max(1, Math.min(20, Number(e.target.value))) })} />
              </label>
              <div className="seg small">
                <button className={sb.mode === "manual" ? "on" : ""} aria-pressed={sb.mode === "manual"} onClick={() => setSb({ ...sb, mode: "manual" })}>Manual</button>
                <button className={sb.mode === "auto" ? "on" : ""} aria-pressed={sb.mode === "auto"} onClick={() => setSb({ ...sb, mode: "auto" })}>Auto</button>
              </div>
              {sb.mode === "auto" && (
                <label>Bars per step
                  <input type="number" min="1" max="16" value={sb.bars} onChange={(e) => setSb({ ...sb, bars: Math.max(1, Math.min(16, Number(e.target.value))) })} />
                </label>
              )}
            </div>

            {session ? (
              <div className="ladder-wrap">
                <div className="ladder">
                  <div className="ladder-fill" style={{ width: `${ladderPct}%` }} />
                  <span className="ladder-label start">{sb.start}</span>
                  <span className="ladder-label end">{sb.target}</span>
                </div>
                <p className="ladder-line">
                  {atTarget
                    ? `Target reached: ${session.bpm} bpm. Nail it three times in a row here, then set a new target.`
                    : `${session.bpm} bpm · ${session.cleanSteps} step${session.cleanSteps === 1 ? "" : "s"} climbed` +
                      (sb.mode === "auto" ? ` · bar ${session.barsDone + 1} of ${sb.bars} at this tempo` : "")}
                </p>
                {sb.mode === "manual" && (
                  <div className="pass-btns">
                    <button className="go-btn clean" onClick={cleanPass} disabled={!running}>Clean · climb</button>
                    <button className="go-btn missed" onClick={missedPass} disabled={!running}>Missed · step back</button>
                  </div>
                )}
              </div>
            ) : (
              <p className="hint-line">Set your ladder, then press Start session. The tempo begins at your start value.</p>
            )}
          </div>
        )}

        <div className="actions">
          {tab === "speed" && !session ? (
            <button className="go-btn" onClick={startSpeedSession}>Start session</button>
          ) : running ? (
            <button className="go-btn stop" onClick={() => { stopAll(); if (tab === "speed") setSession(null); }}>Stop</button>
          ) : (
            <button className="go-btn" onClick={startAll}>Start</button>
          )}
        </div>
        <p className="hint-line center">Session progress lives in this tab for now. Saved history arrives with practice tracking.</p>
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

.tabs { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 12px; overflow: hidden; margin-bottom: 22px; }
.tabs button { background: none; border: none; color: var(--muted); padding: 10px 22px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; }
.tabs button.on { background: var(--amber); color: #1A130E; }
.tabs button:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }

.face { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 26px; max-width: 640px; display: flex; flex-direction: column; gap: 20px; }
.tempo-block { display: flex; flex-direction: column; gap: 14px; }
.bpm-row { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
.bpm-display { display: flex; flex-direction: column; align-items: center; min-width: 130px; }
.bpm-num { font-family: var(--font-display); font-size: 62px; font-weight: 650; line-height: 1; color: var(--ink); }
.bpm-word { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }
.mini-btn { background: var(--panel2); border: 1.5px solid var(--line); color: var(--ink); border-radius: 10px; padding: 9px 14px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: var(--font-mono); }
.mini-btn:hover { border-color: var(--amber); }
.mini-btn:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.mini-btn.tap { font-family: inherit; }
.bpm-slider { width: 100%; accent-color: var(--amber); }
.row-under { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.seg { display: inline-flex; background: var(--panel2); border: 1.5px solid var(--line); border-radius: 10px; overflow: hidden; }
.seg button { background: none; border: none; color: var(--muted); padding: 8px 13px; font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
.seg button.on { background: var(--line); color: var(--ink); }
.seg.small button { padding: 6px 11px; font-size: 12.5px; }

.lights { display: flex; gap: 14px; justify-content: center; }
.light { width: 16px; height: 16px; border-radius: 50%; background: var(--panel2); border: 1.5px solid var(--line); transition: transform 0.05s ease, background 0.05s ease; }
.light.hit { background: var(--ink); transform: scale(1.25); }
.light.hit.accent { background: var(--amber); border-color: var(--amber); transform: scale(1.45); }

.sb { display: flex; flex-direction: column; gap: 16px; border-top: 1px solid var(--line); padding-top: 18px; }
.sb-config { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; }
.sb-config label { display: flex; flex-direction: column; gap: 5px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.sb-config input { background: var(--panel2); border: 1.5px solid var(--line); color: var(--ink); border-radius: 8px; padding: 8px 10px; font-size: 15px; font-weight: 700; width: 74px; font-family: inherit; }
.sb-config input:focus-visible { outline: 2px solid var(--amber); outline-offset: 1px; }

.ladder-wrap { display: flex; flex-direction: column; gap: 10px; }
.ladder { position: relative; height: 26px; background: var(--panel2); border: 1px solid var(--line); border-radius: 999px; overflow: hidden; }
.ladder-fill { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, #8a6423, var(--amber)); transition: width 0.3s ease; }
.ladder-label { position: absolute; top: 50%; transform: translateY(-50%); font-family: var(--font-mono); font-size: 11px; color: var(--ink); }
.ladder-label.start { left: 10px; }
.ladder-label.end { right: 10px; }
.ladder-line { margin: 0; font-size: 14px; color: var(--ink); }
.pass-btns { display: flex; gap: 10px; flex-wrap: wrap; }
.go-btn { background: var(--amber); border: none; color: #1A130E; border-radius: 12px; padding: 12px 26px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; }
.go-btn:disabled { opacity: 0.45; cursor: default; }
.go-btn.stop { background: var(--panel2); color: var(--ink); border: 1.5px solid var(--line); }
.go-btn.clean { background: var(--green); }
.go-btn.missed { background: var(--panel2); color: var(--ink); border: 1.5px solid var(--line); }
.go-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.actions { display: flex; justify-content: center; }
.hint-line { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; }
.hint-line.center { text-align: center; }

@media (prefers-reduced-motion: reduce) { .light, .ladder-fill { transition: none; } }
`;
