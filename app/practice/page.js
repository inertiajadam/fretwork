import styles from "../prose.module.css";

export const metadata = {
  title: "Practice",
  description:
    "Routine builder, streaks, and progress tracking are coming with optional free accounts. Nothing here will ever be required.",
};

export default function Practice() {
  return (
    <article className={styles.prose}>
      <div className={styles.eyebrow}>Practice</div>
      <h1>Build a routine, keep a streak</h1>
      <p>
        The practice hub assembles the tools into a daily routine and tracks your
        streaks and progress over time. It is coming with optional free accounts,
        so your history follows you across devices, but every tool will keep
        working with nothing signed in.
      </p>
      <p className={styles.muted}>
        In the meantime, the metronome's speed builder and the ear trainer's quiz
        mode already keep score locally in your browser while you work.
      </p>
    </article>
  );
}
