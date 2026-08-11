/* Local-first preference storage. Everything works with no account: values
   live in the browser's localStorage under the "fw:" namespace. When accounts
   arrive, this same data syncs to the cloud. SSR-safe (no-ops on the server). */

const PREFIX = "fw:";

/* Change listeners: the account layer subscribes to push updates to the cloud
   when signed in. Local-first works with zero subscribers. */
const listeners = new Set();
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function notify() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* ignore listener errors */
    }
  });
}

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
    notify();
  } catch {
    /* storage full or blocked; ignore */
  }
}

export function removeKey(key) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PREFIX + key);
    notify();
  } catch {
    /* ignore */
  }
}

/* Read every "fw:" pref into one plain object (for syncing up to an account). */
export function snapshotAll() {
  if (typeof window === "undefined") return {};
  const out = {};
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && k.startsWith(PREFIX)) {
      try {
        out[k.slice(PREFIX.length)] = JSON.parse(window.localStorage.getItem(k));
      } catch {
        /* skip unparseable */
      }
    }
  }
  return out;
}

/* Write a snapshot object back into localStorage (for syncing down from an
   account). Does not notify, to avoid a push/pull loop. */
export function applyAll(obj) {
  if (typeof window === "undefined" || !obj) return;
  Object.entries(obj).forEach(([k, v]) => {
    try {
      window.localStorage.setItem(PREFIX + k, JSON.stringify(v));
    } catch {
      /* ignore */
    }
  });
}
