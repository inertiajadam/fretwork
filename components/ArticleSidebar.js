"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Article.module.css";

/* Sticky article sidebar: an "On this page" table of contents that highlights
   the section currently in view, plus link groups (related tools, guides).
   Props:
     toc:    [{ id, label }]
     groups: [{ title, links: [{ href, label, accent }] }]                   */
export default function ArticleSidebar({ toc = [], groups = [] }) {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? null);

  useEffect(() => {
    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-84px 0px -66% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <aside>
      <div className={styles.sticky}>
        {toc.length > 0 && (
          <nav className={styles.block} aria-label="On this page">
            <span className={styles.blockTitle}>On this page</span>
            <div className={styles.toc}>
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={
                    t.id === activeId
                      ? `${styles.tocLink} ${styles.tocLinkActive}`
                      : styles.tocLink
                  }
                  aria-current={t.id === activeId ? "true" : undefined}
                >
                  {t.label}
                </a>
              ))}
            </div>
          </nav>
        )}

        {groups.map((g, gi) =>
          g.links.length > 0 ? (
            <div key={gi} className={styles.block}>
              <span className={styles.blockTitle}>{g.title}</span>
              <div className={styles.sideLinks}>
                {g.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={
                      l.accent
                        ? `${styles.sideLink} ${styles.toolLink}`
                        : styles.sideLink
                    }
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </aside>
  );
}
