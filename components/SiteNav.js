"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE_NAME, NAV } from "@/lib/site";
import { LogoMark } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useSaved } from "./SavedProvider";
import { useAuth } from "./AuthProvider";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const { items, hydrated } = useSaved();
  const savedCount = hydrated ? items.length : 0;
  const { enabled: authEnabled, user } = useAuth();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onSubmit = (e) => {
    e.preventDefault();
    const query = q.trim();
    setOpen(false);
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  const searchForm = (
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
  );

  const navLinks = (className, onClick) =>
    NAV.map((n) => {
      const active =
        n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
      return (
        <Link
          key={n.href}
          href={n.href}
          className={active ? `${className} ${styles.on}` : className}
          aria-current={active ? "page" : undefined}
          onClick={onClick}
        >
          {n.label}
        </Link>
      );
    });

  return (
    <nav className={styles.topnav}>
      <Link href="/" className={styles.brand} aria-label={`${SITE_NAME} home`}>
        <LogoMark size={26} />
        <span>{SITE_NAME}</span>
      </Link>

      <div className={styles.navlinks}>{navLinks(styles.navlink)}</div>

      <div className={styles.barSearch}>{searchForm}</div>

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
        {authEnabled && (
          <Link
            href="/account"
            className={
              pathname.startsWith("/account")
                ? `${styles.account} ${styles.savedOn}`
                : styles.account
            }
            aria-label={user ? "Your account" : "Sign in"}
            title={user ? "Your account" : "Sign in"}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="2" />
              <path
                d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        )}
        <button
          type="button"
          className={styles.menuBtn}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="3.5" y1="7" x2="20.5" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="3.5" y1="17" x2="20.5" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <div className={styles.mobileSearch}>{searchForm}</div>
          <div className={styles.mobileLinks}>
            {navLinks(styles.mobileLink, () => setOpen(false))}
          </div>
        </div>
      )}
    </nav>
  );
}
