"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { midiName } from "@/lib/theory";

/* ------------------------------------------------------------------ */
/* Music data. Shared note spelling (noteName == midiName) now comes    */
/* from @/lib/theory; TUNINGS stays local to this tool.                 */
/* ------------------------------------------------------------------ */
const noteName = midiName;

const TUNINGS = {
  standard: { label: "Standard",   strings: [40, 45, 50, 55, 59, 64], names: null },
  dropD:    { label: "Drop D",     strings: [38, 45, 50, 55, 59, 64], names: null },
  halfDown: { label: "Half down",  strings: [39, 44, 49, 54, 58, 63], names: ["Eb2","Ab2","Db3","Gb3","Bb3","Eb4"] },
  openG:    { label: "Open G",     strings: [38, 43, 50, 55, 59, 62], names: null },
  openD:    { label: "Open D",     strings: [38, 45, 50, 54, 57, 62], names: null },
  dadgad:   { label: "DADGAD",     strings: [38, 45, 50, 55, 57, 62], names: null },
};

/* ------------------------------------------------------------------ */
/* Pitch detection: autocorrelation with parabolic interpolation       */
/* ------------------------------------------------------------------ */
function autoCorrelate(buf, sampleRate) {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.008) return -1; // too quiet

  let r1 = 0, r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

  const b = buf.slice(r1, r2);
  const N = b.length;
  if (N < 64) return -1;

  const c = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = 0; j < N - i; j++) sum += b[j] * b[j + i];
    c[i] = sum;
  }

  let d = 0;
  while (d < N - 1 && c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < N; i++) if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
  if (maxpos <= 0) return -1;

  let T0 = maxpos;
  const x1 = c[T0 - 1] ?? c[T0], x2 = c[T0], x3 = c[T0 + 1] ?? c[T0];
  const a = (x1 + x3 - 2 * x2) / 2;
  const bb = (x3 - x1) / 2;
  if (a) T0 = T0 - bb / (2 * a);

  const freq = sampleRate / T0;
  return freq > 40 && freq < 1400 ? freq : -1;
}

/* ------------------------------------------------------------------ */
/* Gauge geometry                                                      */
/* ------------------------------------------------------------------ */
const GW = 320, GH = 190, GCX = 160, GCY = 168, GR = 138;
const centsToAngle = (cents) => (Math.max(-50, Math.min(50, cents)) / 50) * 62; // ±62 degrees
const polar = (r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [GCX + r * Math.cos(rad), GCY + r * Math.sin(rad)];
};

/* ------------------------------------------------------------------ */
export default function Tuner() {
  const [status, setStatus] = useState("idle"); // idle | listening | denied | error
  const [tuningId, setTuningId] = useState("standard");
  const [mode, setMode] = useState("strings"); // strings | chromatic
  const [refA, setRefA] = useState(440);
  const [reading, setReading] = useState(null); // { freq, midiFloat }
  const [showGuide, setShowGuide] = useState(true);

  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const histRef = useRef([]);

  const tuning = TUNINGS[tuningId];
  const stringLabels = useMemo(
    () => tuning.names || tuning.strings.map(noteName),
    [tuning]
  );

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    ctxRef.current?.close().catch(() => {});
    ctxRef.current = null;
    histRef.current = [];
    setReading(null);
    setStatus("idle");
  };

  useEffect(() => stop, []); // cleanup on unmount

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      streamRef.current = stream;
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      src.connect(analyser);
      analyserRef.current = analyser;
      setStatus("listening");

      const buf = new Float32Array(analyser.fftSize);
      const loop = () => {
        analyser.getFloatTimeDomainData(buf);
        const f = autoCorrelate(buf, ctx.sampleRate);
        if (f > 0) {
          const h = histRef.current;
          h.push(f);
          if (h.length > 5) h.shift();
          const sorted = [...h].sort((a, b) => a - b);
          const med = sorted[Math.floor(sorted.length / 2)];
          setReading({ freq: med, midiFloat: 69 + 12 * Math.log2(med / refARef.current) });
        } else if (histRef.current.length) {
          histRef.current = [];
          setReading(null);
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (e) {
      stop();
      setStatus(e && e.name === "NotAllowedError" ? "denied" : "error");
    }
  };

  /* keep ref pitch reachable inside the loop without restarting it */
  const refARef = useRef(refA);
  useEffect(() => { refARef.current = refA; }, [refA]);

  /* derive display values */
  const display = useMemo(() => {
    if (!reading) return null;
    const { freq, midiFloat } = reading;
    let targetMidi;
    if (mode === "strings") {
      targetMidi = tuning.strings.reduce((best, m) =>
        Math.abs(midiFloat - m) < Math.abs(midiFloat - best) ? m : best, tuning.strings[0]);
    } else {
      targetMidi = Math.round(midiFloat);
    }
    const cents = (midiFloat - targetMidi) * 100;
    const idx = tuning.strings.indexOf(targetMidi);
    return {
      freq,
      cents,
      targetLabel: mode === "strings" && idx >= 0 ? stringLabels[idx] : noteName(targetMidi),
      targetIdx: idx,
      detected: noteName(Math.round(midiFloat)),
      inTune: Math.abs(cents) <= 5,
      far: Math.abs(cents) > 50,
      dir: cents < 0 ? "flat" : "sharp",
    };
  }, [reading, mode, tuning, stringLabels]);

  const needleAngle = display ? centsToAngle(display.cents) : 0;
  const needleColor = display?.inTune ? "#86B36B" : "#E8A33D";

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">The audio layer begins</div>
        <h1>Tuner</h1>
        <p className="lede">
          Plug nothing in. Play a string, and the needle shows how close you are
          in cents, in any of six tunings.
        </p>
      </header>

      <section className="guide">
        <button className="guide-toggle" aria-expanded={showGuide} onClick={() => setShowGuide(!showGuide)}>
          {showGuide ? "Hide the guide" : "How do I use this?"}
        </button>
        {showGuide && (
          <div className="guide-body">
            <div className="guide-col">
              <h3>Getting a good read</h3>
              <p>
                Tap start and allow the microphone. Pluck one string at a time,
                near the neck pickup or over the soundhole, and let it ring. The
                needle steadies as the note sustains. Fresh strings and a quiet
                room both help; a washing machine in the background does not.
              </p>
            </div>
            <div className="guide-col">
              <h3>Reading the needle</h3>
              <p>
                The scale is in cents: hundredths of a semitone. Left of center
                is flat, so tighten the string. Right is sharp, so loosen it.
                Inside five cents the needle turns green, which is closer than
                most ears can hear. Tune up to pitch from below for better
                stability: if you overshoot sharp, drop below and come back up.
              </p>
            </div>
            <div className="guide-col">
              <h3>Strings vs chromatic</h3>
              <p>
                Strings mode aims you at the nearest string of your chosen
                tuning, which is what you want while tuning up. Chromatic mode
                names whatever pitch it hears, useful for checking intonation up
                the neck or tuning to something unusual. The reference pitch
                defaults to A440 and can be nudged to match a piano or a band.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="controls">
        <div className="ctrl-row">
          <div className="ctrl-group">
            <span className="ctrl-label">Tuning</span>
            <div className="seg">
              {Object.entries(TUNINGS).map(([id, t]) => (
                <button key={id} className={tuningId === id ? "on" : ""} aria-pressed={tuningId === id} onClick={() => setTuningId(id)}>{t.label}</button>
              ))}
            </div>
          </div>
          <div className="ctrl-group">
            <span className="ctrl-label">Mode</span>
            <div className="seg">
              <button className={mode === "strings" ? "on" : ""} aria-pressed={mode === "strings"} onClick={() => setMode("strings")}>Strings</button>
              <button className={mode === "chromatic" ? "on" : ""} aria-pressed={mode === "chromatic"} onClick={() => setMode("chromatic")}>Chromatic</button>
            </div>
          </div>
          <div className="ctrl-group">
            <span className="ctrl-label">Reference</span>
            <div className="ref-ctrl">
              <button className="mini-btn" onClick={() => setRefA((a) => Math.max(435, a - 1))} aria-label="Lower reference pitch">−</button>
              <span className="ref-val">A = {refA}</span>
              <button className="mini-btn" onClick={() => setRefA((a) => Math.min(446, a + 1))} aria-label="Raise reference pitch">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="tuner-face">
        <svg viewBox={`0 0 ${GW} ${GH}`} className="gauge" role="img" aria-label="Tuning gauge">
          {/* arc */}
          {(() => {
            const [ax, ay] = polar(GR, -62);
            const [bx, by] = polar(GR, 62);
            return <path d={`M ${ax} ${ay} A ${GR} ${GR} 0 0 1 ${bx} ${by}`} fill="none" stroke="#3A2F27" strokeWidth="10" strokeLinecap="round" />;
          })()}
          {/* green in-tune zone */}
          {(() => {
            const [ax, ay] = polar(GR, centsToAngle(-5));
            const [bx, by] = polar(GR, centsToAngle(5));
            return <path d={`M ${ax} ${ay} A ${GR} ${GR} 0 0 1 ${bx} ${by}`} fill="none" stroke="#86B36B" strokeWidth="10" strokeLinecap="round" opacity="0.85" />;
          })()}
          {/* ticks */}
          {[-50, -25, 0, 25, 50].map((c) => {
            const ang = centsToAngle(c);
            const [x1, y1] = polar(GR - 12, ang);
            const [x2, y2] = polar(GR - 24, ang);
            const [tx, ty] = polar(GR - 38, ang);
            return (
              <g key={c}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A89B8A" strokeWidth="2" />
                <text x={tx} y={ty + 4} textAnchor="middle" className="tick-txt">{c > 0 ? `+${c}` : c}</text>
              </g>
            );
          })}
          {/* needle */}
          {(() => {
            const [nx, ny] = polar(GR - 26, needleAngle);
            return (
              <g className="needle">
                <line x1={GCX} y1={GCY} x2={nx} y2={ny} stroke={needleColor} strokeWidth="3.5" strokeLinecap="round" opacity={display ? 1 : 0.25} />
                <circle cx={GCX} cy={GCY} r="7" fill={needleColor} opacity={display ? 1 : 0.25} />
              </g>
            );
          })()}
          <text x={GCX / 4} y={GH - 6} className="side-txt">flat · tighten</text>
          <text x={GW - GCX / 4} y={GH - 6} textAnchor="end" className="side-txt">sharp · loosen</text>
        </svg>

        <div className={"readout" + (display?.inTune ? " good" : "")}>
          {status !== "listening" ? (
            <span className="big-note idle">•</span>
          ) : display ? (
            <>
              <span className="big-note">{display.targetLabel}</span>
              <span className="read-line">
                {display.far
                  ? `hearing ${display.detected} at ${display.freq.toFixed(1)} Hz · way ${display.dir}, keep going`
                  : display.inTune
                  ? `${display.freq.toFixed(1)} Hz · in tune`
                  : `${display.freq.toFixed(1)} Hz · ${Math.abs(display.cents).toFixed(0)} cents ${display.dir}`}
              </span>
            </>
          ) : (
            <>
              <span className="big-note idle">· · ·</span>
              <span className="read-line">listening, play a string</span>
            </>
          )}
        </div>

        <div className="string-row">
          {stringLabels.map((n, i) => (
            <div key={i} className={"string-chip" + (display?.targetIdx === i ? (display.inTune ? " good" : " near") : "")}>
              {n}
            </div>
          ))}
        </div>

        <div className="actions">
          {status === "listening" ? (
            <button className="go-btn stop" onClick={stop}>Stop</button>
          ) : (
            <button className="go-btn" onClick={start}>Start tuning</button>
          )}
        </div>

        {status === "denied" && (
          <p className="err">
            Microphone access was blocked. Allow the mic for this page in your
            browser's site settings, then try again. Nothing is recorded or sent
            anywhere; the audio is analyzed on your device and discarded.
          </p>
        )}
        {status === "error" && (
          <p className="err">
            Couldn't open the microphone here. Some embedded environments block
            mic access entirely; the same tuner works normally on the live site.
          </p>
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

.guide { margin-bottom: 24px; max-width: 1100px; }
.guide-toggle { background: none; border: none; color: var(--amber); cursor: pointer; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; padding: 0 0 10px; font-weight: 500; }
.guide-toggle:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.guide-body { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 20px 22px; }
.guide-col h3 { font-family: var(--font-display); font-weight: 650; font-size: 17px; margin: 0 0 8px; }
.guide-col p { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 0; }

.controls { margin-bottom: 20px; }
.ctrl-row { display: flex; flex-wrap: wrap; gap: 16px 28px; align-items: flex-start; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.seg { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; overflow: hidden; flex-wrap: wrap; }
.seg button { background: none; border: none; color: var(--muted); padding: 8px 13px; font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
.seg button:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
.seg button.on { background: var(--panel2); color: var(--ink); }
.ref-ctrl { display: flex; align-items: center; gap: 8px; }
.ref-val { font-family: var(--font-mono); font-size: 13px; min-width: 64px; text-align: center; }
.mini-btn { background: var(--panel2); border: 1.5px solid var(--line); color: var(--ink); border-radius: 8px; padding: 5px 11px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
.mini-btn:hover { border-color: var(--amber); }
.mini-btn:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }

.tuner-face { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 26px 22px; max-width: 560px; display: flex; flex-direction: column; align-items: center; gap: 18px; }
.gauge { width: 100%; max-width: 380px; }
.tick-txt { font-family: var(--font-mono); font-size: 11px; fill: #A89B8A; }
.side-txt { font-family: var(--font-mono); font-size: 10px; fill: #7A6F60; letter-spacing: 0.06em; }
.needle line, .needle circle { transition: all 0.09s linear; }

.readout { display: flex; flex-direction: column; align-items: center; gap: 4px; min-height: 86px; }
.big-note { font-family: var(--font-display); font-size: 56px; font-weight: 650; line-height: 1; }
.big-note.idle { color: #4A3F35; }
.readout.good .big-note { color: var(--green); }
.read-line { font-family: var(--font-mono); font-size: 12.5px; color: var(--muted); }
.readout.good .read-line { color: var(--green); }

.string-row { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.string-chip { background: var(--panel2); border: 1.5px solid var(--line); border-radius: 10px; padding: 8px 13px; font-size: 14px; font-weight: 700; font-family: var(--font-mono); }
.string-chip.near { border-color: var(--amber); color: var(--amber); }
.string-chip.good { border-color: var(--green); color: var(--green); }

.actions { display: flex; gap: 10px; }
.go-btn { background: var(--amber); border: none; color: #1A130E; border-radius: 12px; padding: 12px 28px; font-size: 15.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.go-btn.stop { background: var(--panel2); color: var(--ink); border: 1.5px solid var(--line); }
.go-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.err { color: var(--muted); font-size: 13.5px; line-height: 1.6; margin: 0; text-align: center; max-width: 46ch; }

@media (prefers-reduced-motion: reduce) { .needle line, .needle circle { transition: none; } }
`;
