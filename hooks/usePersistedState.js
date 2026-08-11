"use client";

import { useState, useEffect, useRef } from "react";
import { readJSON, writeJSON } from "@/lib/prefs";

/* Drop-in replacement for useState that remembers the value in localStorage.
   SSR-safe: first render uses `initial` (matching the server), then the stored
   value loads in an effect. Use for simple UI settings (strings, numbers,
   booleans), not audio nodes, refs, or large/ephemeral state.

   const [key, setKey] = usePersistedState("tool.fretboard.key", "C"); */
export function usePersistedState(storageKey, initial) {
  const [value, setValue] = useState(initial);
  const loaded = useRef(false);

  useEffect(() => {
    const stored = readJSON(storageKey, undefined);
    if (stored !== undefined) setValue(stored);
    loaded.current = true;
  }, [storageKey]);

  useEffect(() => {
    if (loaded.current) writeJSON(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue];
}
