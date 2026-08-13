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
        Lost for good? Here is a song that will never give you up. 🎸
      </p>
      <div
        style={{
          maxWidth: 560,
          marginTop: 6,
          aspectRatio: "16 / 9",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid var(--line)",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="A song that is never gonna give you up"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </article>
  );
}
