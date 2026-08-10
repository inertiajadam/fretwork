"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchSite } from "@/lib/searchIndex";
import styles from "./SearchClient.module.css";

export default function SearchClient() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  const results = searchSite(q);
  const trimmed = q.trim();

  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Search</div>
      <input
        type="search"
        className={styles.input}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools and guides"
        aria-label="Search tools and guides"
        autoFocus
      />

      {trimmed === "" ? (
        <p className={styles.hint}>
          Try &quot;capo&quot;, &quot;CAGED&quot;, &quot;bass tuning&quot;, or
          &quot;how to solo&quot;.
        </p>
      ) : results.length === 0 ? (
        <p className={styles.hint}>
          No results for &quot;{trimmed}&quot;. Try a simpler or different term.
        </p>
      ) : (
        <>
          <p className={styles.count}>
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          <ul className={styles.results}>
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className={styles.result}>
                  <span className={styles.type} data-type={r.type}>
                    {r.type}
                  </span>
                  <span className={styles.text}>
                    <span className={styles.title}>{r.title}</span>
                    <span className={styles.desc}>{r.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
