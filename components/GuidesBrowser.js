"use client";

import { useState } from "react";
import Link from "next/link";
import cards from "./Cards.module.css";
import styles from "./GuidesBrowser.module.css";

/* Category filter pills + filtered card grid for the Guides hub.
   Props: guides (light cards with .category), categories (ordered names). */
export default function GuidesBrowser({ guides, categories }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? guides : guides.filter((g) => g.category === active);

  const pills = ["All", ...categories];
  const countFor = (c) =>
    c === "All" ? guides.length : guides.filter((g) => g.category === c).length;

  return (
    <>
      <div className={styles.pills} role="tablist" aria-label="Filter guides by category">
        {pills.map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={p === active}
            className={p === active ? `${styles.pill} ${styles.on}` : styles.pill}
            onClick={() => setActive(p)}
          >
            {p}
            <span className={styles.count}>{countFor(p)}</span>
          </button>
        ))}
      </div>

      <div className={cards.grid}>
        {filtered.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className={cards.card}>
            <div className={cards.cardTop}>
              <span className={cards.tag}>{g.category}</span>
              <span className={`${cards.status} ${cards.built}`}>
                {g.readMins} min
              </span>
            </div>
            <h3>{g.title}</h3>
            <p>{g.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
