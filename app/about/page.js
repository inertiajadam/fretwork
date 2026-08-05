import styles from "../prose.module.css";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

const DESC =
  "Fretwork is a free, interactive guitar-learning site. Every tool is generated from music theory and math, every lesson is original, and everything is free forever.";

export const metadata = {
  title: "About",
  description: DESC,
  alternates: { canonical: "/about" },
  openGraph: buildOpenGraph({ title: "About · Fretwork", description: DESC, path: "/about" }),
  twitter: buildTwitter({ title: "About · Fretwork", description: DESC }),
};

export default function About() {
  return (
    <article className={styles.prose}>
      <div className={styles.eyebrow}>About</div>
      <h1>Free tools that teach the neck</h1>
      <p>
        Most guitar sites are either static lesson libraries or single-purpose
        utilities: just a tuner, just a metronome. Fretwork combines a coherent
        teaching approach with interactive tools built directly from it. The
        fretboard explorer teaches CAGED visually, the ear trainer builds
        recognition step by step, and every tool links back to the lesson that
        explains it.
      </p>
      <h2>How it works</h2>
      <p>
        Every tool generates its content from music theory and math: spelled
        scales, degree tables, interval math, CAGED shape templates. Nothing is
        copied from anywhere. That is what makes the interactive layer both
        correct and original.
      </p>
      <h2>Everything is free</h2>
      <p>
        No paywalls, no gated content, no required accounts. All tools, all
        lessons, forever. Free, genuinely useful tools get shared and
        recommended in a way gated content never does, and that is the whole
        growth plan.
      </p>
      <h2>Where it is going</h2>
      <p>
        Web first, mobile app later. Practice tracking and streaks arrive with
        optional free accounts, so nothing you rely on is ever locked behind a
        login. The name above is a working title until we settle on the real
        one.
      </p>
    </article>
  );
}
