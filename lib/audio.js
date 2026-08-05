/* ------------------------------------------------------------------ */
/* Shared audio helpers. Small, behavior-identical primitives that      */
/* several tools duplicated verbatim. The heavier per-tool engines       */
/* (pitch detection, lookahead schedulers, Karplus-Strong strings, drum   */
/* voices) stay with their tools: they are fragile timing/DSP code and    */
/* are not shared across tools, so centralizing them buys little and      */
/* risks much.                                                            */
/* ------------------------------------------------------------------ */

/* Create a Web Audio context, with the Safari-prefixed fallback.        */
/* Must be called from a user gesture (click/tap) to satisfy autoplay     */
/* policies, exactly as the tools already do.                             */
export function newAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

/* Equal-tempered frequency of a MIDI note number (A4 = 69 = 440 Hz).     */
export const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
