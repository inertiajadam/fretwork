"use client";

import Link from "next/link";
import { useSaved } from "./SavedProvider";
import cards from "./Cards.module.css";
import styles from "./SavedList.module.css";

export default function SavedList() {
  const { items, remove, hydrated } = useSaved();

  if (!hydrated) {
    return <p className={styles.note}>Loading your list...</p>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Nothing saved yet</h2>
        <p>
          Tap <strong>Save</strong> on any tool or guide to add it here, so you
          always know what to work on next. Your list lives in this browser, no
          account needed.
        </p>
        <div className={styles.emptyActions}>
          <Link href="/tools" className={styles.primaryBtn}>
            Browse tools
          </Link>
          <Link href="/guides" className={styles.secondaryBtn}>
            Browse guides
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cards.grid}>
      {items.map((it) => (
        <div key={it.href} className={cards.card}>
          <div className={cards.cardTop}>
            <span className={cards.tag}>{it.type}</span>
            <button
              type="button"
              className={styles.remove}
              onClick={() => remove(it.href)}
              aria-label={`Remove ${it.title}`}
            >
              Remove
            </button>
          </div>
          <h3>
            <Link href={it.href} className={styles.titleLink}>
              {it.title}
            </Link>
          </h3>
          {it.description && <p>{it.description}</p>}
        </div>
      ))}
    </div>
  );
}
