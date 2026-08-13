import Link from "next/link";
import styles from "./prose.module.css";

export default function NotFound() {
  return (
    <article className={styles.prose}>
      <div className={styles.eyebrow}>404</div>
      <h1>That page went off the fretboard</h1>
      <p>
        We could not find what you were looking for. It may have been renamed or
        it never existed.
      </p>
      <p>
        <Link href="/tools">Browse the tools</Link> or head back to the{" "}
        <Link href="/">home page</Link>.
      </p>
      <p className={styles.muted}>
        Lost for good? Here is a song that is{" "}
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          never gonna give you up
        </a>
        . 🎸
      </p>
    </article>
  );
}
