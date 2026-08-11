"use client";

import { useSaved } from "./SavedProvider";
import styles from "./SaveButton.module.css";

/* item: { type, title, href }. Toggles the item in the practice list. */
export default function SaveButton({ item, label = true }) {
  const { isSaved, toggle, hydrated } = useSaved();
  const saved = hydrated && isSaved(item.href);

  return (
    <button
      type="button"
      className={saved ? `${styles.btn} ${styles.on}` : styles.btn}
      aria-pressed={saved}
      onClick={() => toggle(item)}
      title={saved ? "Remove from your practice list" : "Save to your practice list"}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {label && <span>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
