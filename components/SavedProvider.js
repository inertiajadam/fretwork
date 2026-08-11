"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { readJSON, writeJSON } from "@/lib/prefs";

/* Shared saved-items store (the "practice list"). Local-first: persists to
   localStorage now, syncs to an account later. One provider wraps the app so
   the nav count, save buttons, and the /saved page all stay in sync. */

const KEY = "saved";
const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readJSON(KEY, []));
    setHydrated(true);
  }, []);

  const isSaved = useCallback((href) => items.some((i) => i.href === href), [items]);

  const toggle = useCallback((item) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.href === item.href);
      const next = exists
        ? prev.filter((i) => i.href !== item.href)
        : [{ ...item, savedAt: Date.now() }, ...prev];
      writeJSON(KEY, next);
      return next;
    });
  }, []);

  const remove = useCallback((href) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.href !== href);
      writeJSON(KEY, next);
      return next;
    });
  }, []);

  return (
    <SavedContext.Provider value={{ items, isSaved, toggle, remove, hydrated }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
}
