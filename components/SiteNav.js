"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE_NAME, NAV } from "@/lib/site";
import { LogoMark } from "./Logo";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

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
    </nav>
  );
}
