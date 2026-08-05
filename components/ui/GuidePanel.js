"use client";

import { useState } from "react";
import styles from "./GuidePanel.module.css";

/* Shared collapsible "guide" explainer used by every tool. Each tool passes    */
/* its own prompt label and column copy; the markup, styling, and toggle        */
/* behavior live here once. Column `body` may be a string or any React node.    */
export default function GuidePanel({
  columns,
  prompt = "What am I looking at?",
  hideLabel = "Hide the guide",
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={styles.guide}>
      <button
        className={styles.toggle}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
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
