import Link from "next/link";
import {
  ROOTS,
  QUALITY_ORDER,
  QUALITIES,
  rootName,
  chordSlug,
  chordSymbol,
} from "@/lib/chords";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "./chords.module.css";

const DESC =
  "A free guitar chord library: every chord in nine flavors and all five CAGED positions, with the notes, intervals, and finger positions for each. Pick a chord to see how to play it.";

export const metadata = {
  title: "Guitar Chords",
  description: DESC,
  keywords: [
    "guitar chords",
    "guitar chord library",
    "chord finder",
    "guitar chord chart",
    "how to play guitar chords",
  ],
  alternates: { canonical: "/chords" },
  openGraph: buildOpenGraph({
    title: "Guitar Chord Library · Fretwork",
    description: DESC,
    path: "/chords",
  }),
  twitter: buildTwitter({ title: "Guitar Chord Library · Fretwork", description: DESC }),
};

export default function ChordsIndex() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Chords", path: "/chords" },
        ])}
      />

      <div className={styles.eyebrow}>Chord library · {ROOTS.length * QUALITY_ORDER.length} chords</div>
      <h1 className={styles.h1}>Guitar chords, every shape on the neck</h1>
      <p className={styles.lede}>
        Every chord below comes with its notes, its formula, and all five CAGED
        voicings drawn out from open position up the neck. Pick one to see how
        to play it.
      </p>
      <p className={styles.sub}>
        Prefer to explore interactively? The{" "}
        <Link href="/tools/chord-library" style={{ color: "var(--amber)" }}>
          Chord Library tool
        </Link>{" "}
        lets you flip through roots and flavors live.
      </p>

      {ROOTS.map((pc) => (
        <section key={pc} className={styles.group}>
          <h2 className={styles.groupHead}>{rootName(pc)} chords</h2>
          <div className={styles.grid}>
            {QUALITY_ORDER.map((id) => (
              <Link key={id} href={`/chords/${chordSlug(pc, id)}`} className={styles.cell}>
                {chordSymbol(pc, id)}
                <span className={styles.cellSub}>{QUALITIES[id].name}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
