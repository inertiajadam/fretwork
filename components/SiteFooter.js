import { SITE_NAME } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <span>
        {SITE_NAME} · web first, mobile app later · every tool works without an
        account
      </span>
    </footer>
  );
}
