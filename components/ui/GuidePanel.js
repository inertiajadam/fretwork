"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { readJSON, writeJSON } from "@/lib/prefs";
import styles from "./GuidePanel.module.css";

/* Shared collapsible "guide" explainer used by every tool. Each tool passes    */
/* its own prompt label and column copy; the markup, styling, and toggle        */
/* behavior live here once. Column `body` may be a string or any React node.    */
/* Open/closed state is remembered per page (localStorage), so a guide you      */
/* close stays closed on your next visit.                                       */
export default function GuidePanel({
  columns,
  prompt = "What am I looking at?",
  hideLabel = "Hide the guide",
  defaultOpen = true,
}) {
  const pathname = usePathname();
  const storageKey = `guide:${pathname}`;
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    const stored = readJSON(storageKey, null);
    if (stored !== null) setOpen(stored);
  }, [storageKey]);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      writeJSON(storageKey, next);
      return next;
    });
  };

  return (
    <section className={styles.guide}>
      <button className={styles.toggle} aria-expanded={open} onClick={toggle}>
        {open ? hideLabel : prompt}
      </button>
      {open && (
        <div className={styles.body}>
          {columns.map((c, i) => (
            <div key={i} className={styles.col}>
              <h3>{c.title}</h3>
              {typeof c.body === "string" ? <p>{c.body}</p> : c.body}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
