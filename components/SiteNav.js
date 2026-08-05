"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME, NAV } from "@/lib/site";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.topnav}>
      <Link href="/" className={styles.brand}>
        {SITE_NAME}
      </Link>
      <div className={styles.navlinks}>
        {NAV.map((n) => {
          const active =
            n.href === "/"
              ? pathname === "/"
              : pathname.startsWith(n.href);
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
      <span className={styles.freeBadge}>100% free</span>
    </nav>
  );
}
