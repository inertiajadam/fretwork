/* Local-first preference storage. Everything works with no account: values
   live in the browser's localStorage under the "fw:" namespace. When accounts
   arrive, this same data syncs to the cloud. SSR-safe (no-ops on the server). */

const PREFIX = "fw:";

export function readJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage full or blocked; ignore */
  }
}

export function removeKey(key) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
}
