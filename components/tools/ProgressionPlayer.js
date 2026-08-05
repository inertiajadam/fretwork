"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { FIFTHS, SCALES } from "@/lib/theory";
import GuidePanel from "@/components/ui/GuidePanel";
import { newAudioContext, midiToFreq } from "@/lib/audio";

/* ------------------------------------------------------------------ */
/* Music data                                                          */
/* ------------------------------------------------------------------ */
const MINOR_KEYS = ["A","E","B","F#","C#","G#","D#","Bb","F","C","G","D"];
const MINOR_REL = { "A":"C","E":"G","B":"D","F#":"A","C#":"E","G#":"B","D#":"F#","Bb":"Db","F":"Ab","C":"Eb","G":"Bb","D":"F" };
const minorScale = (root) => {
  const rel = SCALES[MINOR_REL[root]];
  return rel.slice(5).concat(rel.slice(0, 5));
};

/* Degree tables. Minor includes an 8th entry: the harmonic-minor V (major),
   the borrowed dominant nearly every minor song leans on. */
const DEG_TABLES = {
  major: {
    offsets: [0, 2, 4, 5, 7, 9, 11],
    thirds:  [4, 3, 3, 4, 4, 3, 3],
    fifths:  [7, 7, 7, 7, 7, 7, 6],
    sufs:    ["", "m", "m", "", "", "m", "°"],
    nums:    ["1", "2m", "3m", "4", "5", "6m", "7°"],
  },
  minor: {
    offsets: [0, 2, 3, 5, 7, 8, 10, 7],
    thirds:  [3, 3, 4, 3, 3, 4, 4, 4],
    fifths:  [7, 6, 7, 7, 7, 7, 7, 7],
    sufs:    ["m", "°", "", "m", "m", "", "", ""],
    nums:    ["1m", "2°", "b3", "4m", "5m", "b6", "b7", "5"],
  },
};
const nameIdx = (mode, d) => (mode === "minor" && d === 7 ? 4 : d);

const KEY_ROOT_MIDI = { "C": 48, "G": 43, "D": 50, "A": 45, "E": 52, "B": 47, "F#": 54, "Db": 49, "Ab": 44, "Eb": 51, "Bb": 46, "F": 53, "C#": 49, "G#": 44, "D#": 51 };

const PRESETS = [
  { name: "Workhorse",    degrees: [0, 3, 4, 0], seventh: false },
  { name: "Anthem",       degrees: [0, 4, 5, 3], seventh: false },
  { name: "Moody pop",    degrees: [5, 3, 0, 4], seventh: false },
  { name: "Doo-wop",      degrees: [0, 5, 3, 4], seventh: false },
  { name: "Turnaround",   degrees: [1, 4, 0, 0], seventh: false },
  { name: "12-bar blues", degrees: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4], seventh: true },
];
const MINOR_PRESETS = [
  { name: "Minor anthem",   degrees: [0, 5, 2, 6], seventh: false },
  { name: "Rock ballad",    degrees: [0, 6, 5, 6], seventh: false },
  { name: "Andalusian",     degrees: [0, 6, 5, 7], seventh: false },
  { name: "Dark turnaround",degrees: [0, 3, 5, 7], seventh: false },
  { name: "Minor blues",    degrees: [0, 0, 0, 0, 3, 3, 0, 0, 7, 5, 0, 7], seventh: true },
];

/* ------------------------------------------------------------------ */
/* Meters: scheduling units per bar, unit length as a fraction of a    */
/* quarter note, strong pulses, and backbeats. Compound meters count   */
/* in eighths and the tempo knob counts their big (dotted) pulse.      */
/* ------------------------------------------------------------------ */
const METERS = {
  "2/4":  { units: 2,  unitFactor: 1,     strong: [0],           back: [1],    compound: false },
  "3/4":  { units: 3,  unitFactor: 1,     strong: [0],           back: [2],    compound: false },
  "4/4":  { units: 4,  unitFactor: 1,     strong: [0, 2],        back: [1, 3], compound: false },
  "5/4":  { units: 5,  unitFactor: 1,     strong: [0, 3],        back: [1, 4], compound: false },
  "7/8":  { units: 7,  unitFactor: 0.5,   strong: [0, 2, 4],     back: [4],    compound: true },
  "6/8":  { units: 6,  unitFactor: 1 / 3, strong: [0, 3],        back: [3],    compound: true },
  "9/8":  { units: 9,  unitFactor: 1 / 3, strong: [0, 3, 6],     back: [3],    compound: true },
  "12/8": { units: 12, unitFactor: 1 / 3, strong: [0, 3, 6, 9],  back: [3, 9], compound: true },
};

/* Each feel is a generator: given a meter, it lays its pattern onto    */
/* that meter's pulses. Times and durations are in scheduling units.    */
const genBallad = (M) => {
  const ev = [
    { b: 0, t: "bass", d: M.units * 0.95 },
    { b: 0, t: "chord", d: M.units * 0.95 },
    { b: 0, t: "kick" },
  ];
  if (M.back.length) ev.push({ b: M.back[Math.floor(M.back.length / 2)], t: "snare" });
  if (M.compound) M.strong.forEach((u) => ev.push({ b: u, t: "hat" }));
  else for (let u = 0; u < M.units; u++) ev.push({ b: u, t: "hat" });
  return ev;
};

const genFolk = (M) => {
  const ev = [{ b: 0, t: "bass", d: (M.strong[1] ?? M.units) * 0.95 }];
  if (M.strong[1] !== undefined)
    ev.push({ b: M.strong[1], t: "fifth", d: (M.units - M.strong[1]) * 0.95 });
  if (M.compound) {
    M.strong.forEach((g) => {
      ev.push({ b: g, t: "chord", d: 1.6 });
      if (g + 2 < M.units) ev.push({ b: g + 2, t: "up", d: 0.8 });
    });
  } else {
    for (let u = 0; u < M.units; u++) ev.push({ b: u, t: "chord", d: 0.45 });
    const ups = [...new Set([...M.back, M.units - 1])];
    ups.forEach((u) => { if (u + 0.5 < M.units) ev.push({ b: u + 0.5, t: "up", d: 0.4 }); });
  }
  M.strong.forEach((u) => ev.push({ b: u, t: "kick" }));
  M.back.forEach((u) => ev.push({ b: u, t: "snare" }));
  if (M.compound) for (let u = 0; u < M.units; u++) ev.push({ b: u, t: "hat" });
  else for (let u = 0; u < M.units; u++) ev.push({ b: u + 0.5, t: "hat" });
  return ev;
};

const genRock = (M) => {
  const ev = [];
  const step = M.compound ? 1 : 0.5;
  for (let b = 0; b < M.units; b += step) ev.push({ b, t: "bass", d: step * 0.9 });
  const mid = M.strong[1] ?? Math.floor(M.units / 2);
  ev.push({ b: 0, t: "chord", d: Math.max(mid * 0.9, 1) });
  ev.push({ b: mid, t: "chord", d: Math.max((M.units - mid) * 0.7, 1) });
  ev.push({ b: M.units - step, t: "up", d: step });
  ev.push({ b: 0, t: "kick" });
  ev.push({ b: mid, t: "kick" });
  if (!M.compound && M.units >= 4) ev.push({ b: 1.5, t: "kick" });
  M.back.forEach((u) => ev.push({ b: u, t: "snare" }));
  for (let b = 0; b < M.units; b += step) ev.push({ b, t: "hat" });
  return ev;
};

const genBoomChick = (M) => {
  const ev = [];
  M.strong.forEach((g, gi) => {
    const next = M.strong[gi + 1] ?? M.units;
    ev.push({ b: g, t: "bass", d: (next - g) * 0.95 });
    ev.push({ b: g, t: "kick" });
    for (let u = g + 1; u < next; u++) {
      ev.push({ b: u, t: "chord", d: 0.8 });
      ev.push({ b: u, t: "hat" });
    }
  });
  return ev;
};

const FEELS = {
  ballad: { label: "Ballad",     gen: genBallad,    roll: 0.072, rollUp: 0.05 },
  folk:   { label: "Folk strum", gen: genFolk,      roll: 0.046, rollUp: 0.034 },
  rock:   { label: "Pop rock",   gen: genRock,      roll: 0.028, rollUp: 0.022 },
  boom:   { label: "Boom chick", gen: genBoomChick, roll: 0.06,  rollUp: 0.042 },
};

/* ------------------------------------------------------------------ */
export default function ProgressionPlayer() {
  const [key, setKey] = useState("A");
  const [mode, setMode] = useState("major");
  const [degrees, setDegrees] = useState(PRESETS[1].degrees);
  const [seventh, setSeventh] = useState(false);
  const [feelId, setFeelId] = useState("folk");
  const [meterId, setMeterId] = useState("4/4");
  const [bpm, setBpm] = useState(92);
  const [drums, setDrums] = useState(true);
  const [running, setRunning] = useState(false);
  const [bar, setBar] = useState(-1);

  /* build the chord objects the engine plays */
  const table = DEG_TABLES[mode];
  const scale = useMemo(() => (mode === "major" ? SCALES[key] : minorScale(key)), [mode, key]);
  const chords = useMemo(() => degrees.map((d) => {
    const root = KEY_ROOT_MIDI[key] + table.offsets[d];
    const tones = [root, root + table.thirds[d], root + table.fifths[d], root + 12];
    if (seventh) tones.push(root + 10);
    return {
      name: scale[nameIdx(mode, d)] + table.sufs[d] + (seventh ? "7" : ""),
      num: table.nums[d] + (seventh ? "7" : ""),
      tones,
      bass: root - 12,
      fifthBass: root - 12 + table.fifths[d],
    };
  }), [degrees, key, seventh, mode, table, scale]);

  const switchMode = (m) => {
    if (m === mode) return;
    setMode(m);
    const keyList = m === "major" ? FIFTHS : MINOR_KEYS;
    if (!keyList.includes(key)) setKey("A");
    const defaults = m === "major" ? PRESETS[1] : MINOR_PRESETS[0];
    setDegrees(defaults.degrees);
    setSeventh(defaults.seventh);
  };

  /* live refs for the scheduler */
  const bpmRef = useRef(bpm);        useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  const chordsRef = useRef(chords);  useEffect(() => { chordsRef.current = chords; }, [chords]);
  const feelRef = useRef(FEELS[feelId]); useEffect(() => { feelRef.current = FEELS[feelId]; }, [feelId]);
  const meterRef = useRef(METERS[meterId]); useEffect(() => { meterRef.current = METERS[meterId]; }, [meterId]);
  const events = useMemo(() => FEELS[feelId].gen(METERS[meterId]), [feelId, meterId]);
  const eventsRef = useRef(events); useEffect(() => { eventsRef.current = events; }, [events]);
  const drumsRef = useRef(drums);    useEffect(() => { drumsRef.current = drums; }, [drums]);

  const ctxRef = useRef(null);
  const noiseRef = useRef(null);
  const ksCacheRef = useRef(null);
  const busRef = useRef(null);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const nextBarTimeRef = useRef(0);
  const barIdxRef = useRef(0);
  const queueRef = useRef([]);

  /* ------------------------- instruments -------------------------- */
  /* Master chain: everything -> bus -> (compressor, reverb send) -> out */
  const buildMaster = (ctx) => {
    const bus = ctx.createGain();
    bus.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 24; comp.ratio.value = 3;
    comp.attack.value = 0.004; comp.release.value = 0.22;
    /* generated impulse response: a short room of decaying noise */
    const sr = ctx.sampleRate, irLen = Math.floor(sr * 1.6);
    const ir = ctx.createBuffer(2, irLen, sr);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < irLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 2.6);
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    const rev = ctx.createGain();
    rev.gain.value = 0.2;
    const shelf = ctx.createBiquadFilter();
    shelf.type = "highshelf";
    shelf.frequency.value = 3800;
    shelf.gain.value = -5;
    bus.connect(shelf);
    shelf.connect(comp);
    shelf.connect(conv); conv.connect(rev); rev.connect(comp);
    comp.connect(ctx.destination);
    busRef.current = bus;
  };

  /* Karplus-Strong plucked string, rendered once per pitch and cached */
  const ksBuffer = (ctx, midi, dark) => {
    if (!ksCacheRef.current) ksCacheRef.current = new Map();
    const cache = ksCacheRef.current;
    const key = midi + (dark ? "d" : "");
    if (cache.has(key)) return cache.get(key);
    const sr = ctx.sampleRate;
    const freq = midiToFreq(midi);
    const N = Math.max(2, Math.round(sr / freq));
    const len = Math.floor(sr * (dark ? 2.6 : 2.2));
    const buf = ctx.createBuffer(1, len, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < N; i++) data[i] = Math.random() * 2 - 1;
    const passes = dark ? 5 : 4; // smooth the excitation for a warmer pluck
    for (let pss = 0; pss < passes; pss++)
      for (let i = 1; i < N; i++) data[i] = (data[i] + data[i - 1]) / 2;
    const g = dark ? 0.999 : 0.998;
    for (let i = N; i < len; i++) data[i] = g * 0.5 * (data[i - N] + data[i - N + 1]);
    cache.set(key, buf);
    return buf;
  };

  const jitter = (t) => t + (Math.random() - 0.5) * 0.006;
  const vJitter = (v) => v * (0.92 + Math.random() * 0.16);

  const playString = (ctx, midi, t, d, vel, dark) => {
    const src = ctx.createBufferSource();
    src.buffer = ksBuffer(ctx, midi, dark);
    const g = ctx.createGain();
    const hold = Math.max(0.08, d);
    const v = vJitter(vel);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + 0.024);
    g.gain.setValueAtTime(v, t + hold);
    g.gain.linearRampToValueAtTime(0.0001, t + hold + 0.09);
    src.connect(g).connect(busRef.current);
    src.start(t);
    src.stop(t + hold + 0.15);
  };

  const bassNote = (ctx, midi, t, d) => playString(ctx, midi, jitter(t), d, 0.85, true);
  const strumDown = (ctx, tones, t, d, roll) =>
    tones.forEach((m, i) =>
      playString(ctx, m, jitter(t + i * roll), d, 0.3 * (0.86 + i * 0.05), false));
  const strumUp = (ctx, tones, t, d, roll) =>
    [...tones].reverse().slice(0, 3).forEach((m, i) =>
      playString(ctx, m, jitter(t + i * roll), d, 0.24, false));

  const noiseBuf = (ctx) => {
    if (!noiseRef.current) {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      noiseRef.current = buf;
    }
    return noiseRef.current;
  };
  const kick = (ctx, t) => {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(118, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.1);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.8, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    osc.connect(g).connect(busRef.current);
    osc.start(t); osc.stop(t + 0.2);
    /* beater click for definition */
    const click = ctx.createBufferSource();
    click.buffer = noiseBuf(ctx);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 3200;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.22, t);
    cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
    click.connect(hp).connect(cg).connect(busRef.current);
    click.start(t); click.stop(t + 0.02);
  };
  const snare = (ctx, t) => {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf(ctx);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 1300;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.26, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
    src.connect(hp).connect(g).connect(busRef.current);
    src.start(t); src.stop(t + 0.15);
    /* drum body */
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(190, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0.22, t);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    osc.connect(bg).connect(busRef.current);
    osc.start(t); osc.stop(t + 0.1);
  };
  const hat = (ctx, t) => {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 8200; bp.Q.value = 1;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.07, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    src.connect(bp).connect(g).connect(busRef.current);
    src.start(t); src.stop(t + 0.05);
  };

  /* ------------------------- scheduler ----------------------------- */
  const scheduleBar = useCallback((ctx, t0) => {
    const feel = feelRef.current;
    const M = meterRef.current;
    const list = chordsRef.current;
    const idx = barIdxRef.current % list.length;
    const ch = list[idx];
    const unitSec = (60 / bpmRef.current) * M.unitFactor;
    for (const e of eventsRef.current) {
      const t = t0 + e.b * unitSec;
      const d = Math.max((e.d || 0.4) * unitSec, 0.2);
      if (e.t === "chord") strumDown(ctx, ch.tones, t, Math.max(d, 0.25), feel.roll);
      else if (e.t === "up") strumUp(ctx, ch.tones, t, d, feel.rollUp);
      else if (e.t === "bass") bassNote(ctx, ch.bass, t, d);
      else if (e.t === "fifth") bassNote(ctx, ch.fifthBass, t, d);
      else if (drumsRef.current) {
        if (e.t === "kick") kick(ctx, t);
        else if (e.t === "snare") snare(ctx, t);
        else if (e.t === "hat") hat(ctx, t);
      }
    }
    queueRef.current.push({ time: t0, idx });
    barIdxRef.current += 1;
    return M.units * unitSec;
  }, []);

  const tick = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    while (nextBarTimeRef.current < ctx.currentTime + 0.35) {
      const dur = scheduleBar(ctx, nextBarTimeRef.current);
      nextBarTimeRef.current += dur;
    }
  }, [scheduleBar]);

  const draw = useCallback(() => {
    const ctx = ctxRef.current;
    if (ctx) {
      const qq = queueRef.current;
      while (qq.length && qq[0].time <= ctx.currentTime) {
        setBar(qq[0].idx);
        qq.shift();
      }
    }
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timerRef.current = null; rafRef.current = null;
    ctxRef.current?.close().catch(() => {});
    ctxRef.current = null; noiseRef.current = null;
    ksCacheRef.current = null; busRef.current = null;
    queueRef.current = [];
    setRunning(false); setBar(-1);
  }, []);

  const start = useCallback(() => {
    const ctx = newAudioContext();
    ctxRef.current = ctx;
    buildMaster(ctx);
    barIdxRef.current = 0;
    queueRef.current = [];
    nextBarTimeRef.current = ctx.currentTime + 0.1;
    timerRef.current = setInterval(tick, 50);
    rafRef.current = requestAnimationFrame(draw);
    setRunning(true);
  }, [tick, draw]);

  useEffect(() => stop, [stop]);

  const addDegree = (d) => setDegrees((s) => (s.length >= 12 ? s : [...s, d]));
  const loadPreset = (p) => { setDegrees(p.degrees); setSeventh(p.seventh); };

  const current = bar >= 0 ? chords[bar % chords.length] : null;
  const next = bar >= 0 ? chords[(bar + 1) % chords.length] : null;

  return (
    <div className="app">
      <style>{css}</style>

      <header>
        <div className="eyebrow">A band that never gets tired</div>
        <h1>Progression Player</h1>
        <p className="lede">
          Pick a progression, a key, a feel, and a tempo. Get a looping backing
          band, generated right here, to practice changes and solos over.
        </p>
      </header>

      <GuidePanel
        prompt="How do I use this?"
        columns={[
          {
            title: "The idea",
            body: "Chords make sense in motion. Reading that the anthem progression is 1, 5, 6m, 4 teaches you a fact; playing over it for ten minutes teaches you the sound. This is a patient rhythm section for exactly that: it loops forever, never speeds up, and never asks to take a break.",
          },
          {
            title: "Ways to practice",
            body: "Strum along to lock in your changes, watching the next chord preview so you're never surprised. Or solo over the loop: pull up the Fretboard Explorer in the same key and aim for chord tones as each bar lands. Try the 12-bar blues preset with sevenths on, the sound that launched a million solos.",
          },
          {
            title: "Make it yours",
            body: "Tap numbers to build any progression up to twelve bars, one chord per bar. Change the key and the whole band transposes instantly; the numbers are doing the work, exactly as the Nashville trainer promised. Slow the tempo when learning, and drop the drums for a quieter bed.",
          },
        ]}
      />

      <section className="controls">
        <div className="ctrl-row">
          <div className="ctrl-group">
            <span className="ctrl-label">Mode</span>
            <div className="seg">
              <button className={mode === "major" ? "on" : ""} aria-pressed={mode === "major"} onClick={() => switchMode("major")}>Major</button>
              <button className={mode === "minor" ? "on" : ""} aria-pressed={mode === "minor"} onClick={() => switchMode("minor")}>Minor</button>
            </div>
          </div>
          <div className="ctrl-group">
            <span className="ctrl-label">Key</span>
            <div className="chip-row">
              {(mode === "major" ? FIFTHS : MINOR_KEYS).map((k) => (
                <button key={k} className={"chip" + (k === key ? " on" : "")} aria-pressed={k === key} onClick={() => setKey(k)}>
                  {k}{mode === "minor" ? "m" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="ctrl-row">
          <div className="ctrl-group">
            <span className="ctrl-label">Time signature</span>
            <div className="seg">
              {Object.keys(METERS).map((m) => (
                <button key={m} className={meterId === m ? "on" : ""} aria-pressed={meterId === m} onClick={() => setMeterId(m)}>{m}</button>
              ))}
            </div>
          </div>
          <div className="ctrl-group">
            <span className="ctrl-label">Feel</span>
            <div className="seg">
              {Object.entries(FEELS).map(([id, f]) => (
                <button key={id} className={feelId === id ? "on" : ""} aria-pressed={feelId === id} onClick={() => setFeelId(id)}>{f.label}</button>
              ))}
            </div>
          </div>
          <div className="ctrl-group">
            <span className="ctrl-label">Tempo · {bpm} bpm{METERS[meterId].compound ? " · counts the big pulse" : ""}</span>
            <input type="range" min="50" max="180" value={bpm} className="bpm-slider" onChange={(e) => setBpm(Number(e.target.value))} aria-label="Tempo" />
          </div>
          <div className="ctrl-group">
            <span className="ctrl-label">Band</span>
            <div className="seg">
              <button className={drums ? "on" : ""} aria-pressed={drums} onClick={() => setDrums(true)}>Drums on</button>
              <button className={!drums ? "on" : ""} aria-pressed={!drums} onClick={() => setDrums(false)}>Drums off</button>
            </div>
          </div>
        </div>
        <div className="ctrl-group">
          <span className="ctrl-label">Build · one chord per bar · or load a classic</span>
          <div className="chip-row">
            {table.nums.map((n, d) => (
              <button key={n} className="num-chip" onClick={() => addDegree(d)}>
                <b>{n}</b><i>{scale[nameIdx(mode, d)] + table.sufs[d]}</i>
              </button>
            ))}
            <span className="divider" />
            {(mode === "major" ? PRESETS : MINOR_PRESETS).map((p) => (
              <button key={p.name} className="chip ghost" onClick={() => loadPreset(p)}>{p.name}</button>
            ))}
            <button className={"chip ghost" + (seventh ? " lit" : "")} onClick={() => setSeventh(!seventh)}>7ths {seventh ? "on" : "off"}</button>
          </div>
        </div>
      </section>

      <section className="stage">
        <div className="now-panel">
          <div className="now">
            <span className="now-label">now</span>
            <span className="now-chord">{running && current ? current.name : "·"}</span>
            <span className="now-num">{running && current ? current.num : ""}</span>
          </div>
          <div className="next">
            <span className="now-label">next</span>
            <span className="next-chord">{running && next ? next.name : "·"}</span>
          </div>
        </div>

        <div className="prog-strip">
          {chords.map((c, i) => (
            <div key={i} className={"bar-chip" + (running && bar % chords.length === i ? " live" : "")}>
              <span className="bar-num">{c.num}</span>
              <span className="bar-chord">{c.name}</span>
              <button className="bar-x" aria-label={`Remove bar ${i + 1}`} onClick={() => setDegrees((s) => s.filter((_, j) => j !== i))}>×</button>
            </div>
          ))}
          {chords.length === 0 && <span className="hint-line">Tap numbers above to add bars.</span>}
        </div>

        <div className="actions">
          {running ? (
            <button className="go-btn stop" onClick={stop}>Stop</button>
          ) : (
            <button className="go-btn" onClick={start} disabled={chords.length === 0}>Play</button>
          )}
        </div>
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

.controls { display: flex; flex-direction: column; gap: 16px; margin-bottom: 22px; max-width: 1100px; }
.ctrl-row { display: flex; flex-wrap: wrap; gap: 16px 28px; align-items: flex-end; }
.ctrl-group { display: flex; flex-direction: column; gap: 7px; }
.ctrl-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.chip-row { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.chip { background: var(--panel); border: 1.5px solid var(--line); color: var(--ink); border-radius: 999px; padding: 7px 13px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; min-width: 42px; }
.chip:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.chip.on { background: var(--amber); border-color: var(--amber); color: #1A130E; }
.chip.ghost { color: var(--muted); font-weight: 500; }
.chip.ghost.lit { color: var(--amber); border-color: var(--amber); }
.divider { width: 1.5px; height: 26px; background: var(--line); margin: 0 6px; }
.num-chip { display: flex; flex-direction: column; align-items: center; gap: 1px; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; padding: 7px 13px; cursor: pointer; font-family: inherit; color: var(--ink); }
.num-chip:hover { border-color: var(--amber); }
.num-chip b { font-size: 16px; font-family: var(--font-display); }
.num-chip i { font-style: normal; font-family: var(--font-mono); font-size: 9.5px; color: var(--muted); }
.seg { display: inline-flex; background: var(--panel); border: 1.5px solid var(--line); border-radius: 10px; overflow: hidden; flex-wrap: wrap; }
.seg button { background: none; border: none; color: var(--muted); padding: 8px 14px; font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
.seg button:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
.seg button.on { background: var(--panel2); color: var(--ink); }
.bpm-slider { width: 220px; accent-color: var(--amber); }

.stage { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 24px; max-width: 1100px; display: flex; flex-direction: column; gap: 20px; }
.now-panel { display: flex; align-items: flex-end; gap: 34px; flex-wrap: wrap; }
.now, .next { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
.now-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.now-chord { font-family: var(--font-display); font-size: 58px; font-weight: 650; line-height: 1; color: var(--amber); }
.now-num { font-family: var(--font-mono); font-size: 13px; color: var(--muted); }
.next-chord { font-family: var(--font-display); font-size: 30px; font-weight: 650; line-height: 1; color: var(--ink); opacity: 0.75; }

.prog-strip { display: flex; flex-wrap: wrap; gap: 10px; }
.bar-chip { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px; background: var(--panel2); border: 1.5px solid var(--line); border-radius: 12px; padding: 10px 18px 9px; min-width: 64px; transition: border-color 0.1s ease, transform 0.1s ease; }
.bar-chip.live { border-color: var(--amber); transform: translateY(-3px); }
.bar-num { font-family: var(--font-display); font-size: 19px; font-weight: 650; color: var(--amber); line-height: 1; }
.bar-chord { font-size: 13.5px; font-weight: 700; }
.bar-x { position: absolute; top: -7px; right: -7px; width: 19px; height: 19px; border-radius: 50%; background: var(--line); border: none; color: var(--muted); font-size: 12px; line-height: 1; cursor: pointer; }
.bar-x:hover { background: var(--amber); color: #1A130E; }

.actions { display: flex; }
.go-btn { background: var(--amber); border: none; color: #1A130E; border-radius: 12px; padding: 13px 34px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: inherit; }
.go-btn:disabled { opacity: 0.45; cursor: default; }
.go-btn.stop { background: var(--panel2); color: var(--ink); border: 1.5px solid var(--line); }
.go-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.hint-line { color: var(--muted); font-size: 13.5px; margin: 0; }

@media (prefers-reduced-motion: reduce) { .bar-chip { transition: none; } }
`;
