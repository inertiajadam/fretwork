/* Practice streak + quiz progress, stored local-first (localStorage via prefs).
   Syncs to an account later. Browser-only; guarded by the prefs helpers. */

import { readJSON, writeJSON } from "@/lib/prefs";

function todayStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function dayDiff(a, b) {
  return Math.round(
    (new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000
  );
}

const EMPTY_STREAK = { last: null, current: 0, longest: 0, total: 0 };

/* Call once when a tool is used. Advances the streak, at most once per day. */
export function recordPractice() {
  const p = readJSON("practice", EMPTY_STREAK);
  const today = todayStr();
  if (p.last === today) return p;
  if (p.last && dayDiff(p.last, today) === 1) p.current += 1;
  else p.current = 1;
  p.longest = Math.max(p.longest || 0, p.current);
  p.total = (p.total || 0) + 1;
  p.last = today;
  writeJSON("practice", p);
  return p;
}

/* Read the streak for display. A gap of more than one day shows current 0
   (the stored value only resets on the next practice). */
export function getPractice() {
  const p = readJSON("practice", EMPTY_STREAK);
  if (p.last) {
    const gap = dayDiff(p.last, todayStr());
    if (gap > 1) return { ...p, current: 0 };
    return p;
  }
  return p;
}

/* Record a finished quiz round. `streak` is the run of correct answers; if you
   have an accuracy, pass correct/total too. Keeps the best of each. */
export function saveQuizResult(quizId, { streak = 0, correct = null, total = null } = {}) {
  const all = readJSON("quiz", {});
  const cur = all[quizId] || { plays: 0, bestStreak: 0, bestPct: 0, lastPct: 0 };
  cur.plays += 1;
  cur.bestStreak = Math.max(cur.bestStreak || 0, streak || 0);
  if (total) {
    const pct = Math.round((correct / total) * 100);
    cur.lastPct = pct;
    cur.bestPct = Math.max(cur.bestPct || 0, pct);
  }
  all[quizId] = cur;
  writeJSON("quiz", all);
  return cur;
}

/* Call once per quiz answer. Tracks the best streak, running accuracy, and a
   count of answers for a quiz. `streak` is the current run of correct answers;
   right/total are the running session tallies. */
export function recordAnswer(quizId, { streak = 0, right = 0, total = 0 } = {}) {
  const all = readJSON("quiz", {});
  const cur = all[quizId] || { bestStreak: 0, bestPct: 0, lastPct: 0, answered: 0 };
  cur.bestStreak = Math.max(cur.bestStreak || 0, streak || 0);
  cur.answered = (cur.answered || 0) + 1;
  if (total) {
    const pct = Math.round((right / total) * 100);
    cur.lastPct = pct;
    cur.bestPct = Math.max(cur.bestPct || 0, pct);
  }
  all[quizId] = cur;
  writeJSON("quiz", all);
  return cur;
}

export function getQuizStats() {
  return readJSON("quiz", {});
}
