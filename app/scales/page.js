import Link from "next/link";
import {
  ROOTS,
  SCALE_TYPE_ORDER,
  SCALE_TYPES,
  scaleSlug,
  rootNameFor,
} from "@/lib/scales";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "@/components/RefPage.module.css";

const DESC =
  "A free guitar scales library: major, minor, pentatonic, blues, and the modes in every key, each mapped across the fretboard with the notes and root labeled.";

export const metadata = {
  title: "Guitar Scales",
  description: DESC,
  keywords: [
    "guitar scales",
    "guitar scales chart",
    "scale diagrams",
    "pentatonic scale guitar",
    "guitar modes",
  ],
  alternates: { canonical: "/scales" },
  openGraph: buildOpenGraph({ title: "Guitar Scales · Fretwork", description: DESC, path: "/scales" }),
  twitter: buildTwitter({ title: "Guitar Scales · Fretwork", description: DESC }),
};

export default function ScalesIndex() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Scales", path: "/scales" },
        ])}
      />

      <div className={styles.eyebrow}>
        Scales library · {ROOTS.length * SCALE_TYPE_ORDER.length} fretboard maps
      </div>
      <h1 className={styles.h1}>Guitar scales, mapped across the neck</h1>
      <p className={styles.lede}>
        Every scale below is drawn out on the fretboard from the open strings to
        the 12th fret, with its notes, degrees, and root labeled. Pick a scale to
        see how it lays out.
      </p>
      <p className={styles.sub}>
        Looking for chords or keys instead? Browse the{" "}
        <Link href="/chords" style={{ color: "var(--amber)" }}>
          chord library
        </Link>{" "}
        or{" "}
        <Link href="/keys" style={{ color: "var(--amber)" }}>
          keys and their chords
        </Link>
        .
      </p>

      {SCALE_TYPE_ORDER.map((typeId) => {
        const t = SCALE_TYPES[typeId];
        return (
          <section key={typeId} className={styles.group}>
            <h2 className={styles.groupHead}>{t.name} scale</h2>
            <div className={styles.grid}>
              {ROOTS.map((pc) => (
                <Link
                  key={pc}
                  href={`/scales/${scaleSlug(pc, typeId)}`}
                  className={styles.cell}
                >
                  {rootNameFor(pc, t.family)} {t.name}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
