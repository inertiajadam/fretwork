"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE_NAME, NAV } from "@/lib/site";
import { LogoMark } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useSaved } from "./SavedProvider";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const { items, hydrated } = useSaved();
  const savedCount = hydrated ? items.length : 0;

  const onSubmit = (e) => {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  return (
    <nav className={styles.topnav}>
      <Link href="/" className={styles.brand} aria-label={`${SITE_NAME} home`}>
        <LogoMark size={26} />
        <span>{SITE_NAME}</span>
      </Link>
      <div className={styles.navlinks}>
        {NAV.map((n) => {
          const active =
            n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={active ? `${styles.navlink} ${styles.on}` : styles.navlink}
              aria-current={active ? "page" : undefined}
            >
              {n.label}
            </Link>
          );
        })}
      </div>

      <form className={styles.search} role="search" onSubmit={onSubmit}>
        <svg
          className={styles.searchIcon}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line
            x1="16.5"
            y1="16.5"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          className={styles.searchInput}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          aria-label="Search the site"
        />
      </form>

      <span className={styles.freeBadge}>100% free</span>

      <div className={styles.actions}>
        <Link
          href="/saved"
          className={
            pathname.startsWith("/saved")
              ? `${styles.saved} ${styles.savedOn}`
              : styles.saved
          }
          aria-label={`Saved list${savedCount ? `, ${savedCount} items` : ""}`}
          title="Your practice list"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"
              fill={savedCount ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {savedCount > 0 && <span className={styles.savedCount}>{savedCount}</span>}
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
