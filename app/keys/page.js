import Link from "next/link";
import { ROOTS } from "@/lib/theory";
import { KEY_MODE_ORDER, keySlug, keyName } from "@/lib/keys";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "@/components/RefPage.module.css";

const DESC =
  "A free guitar reference for every key: the diatonic chords, key signature, scale, and common chord progressions in all 12 major and 12 minor keys.";

const MODE_HEADS = { major: "Major keys", minor: "Minor keys" };

export const metadata = {
  title: "Guitar Keys & Chords",
  description: DESC,
  keywords: [
    "musical keys",
    "chords in every key",
    "key signatures",
    "chords in the key of",
    "guitar keys chart",
  ],
  alternates: { canonical: "/keys" },
  openGraph: buildOpenGraph({ title: "Keys & Chords · Fretwork", description: DESC, path: "/keys" }),
  twitter: buildTwitter({ title: "Keys & Chords · Fretwork", description: DESC }),
};

export default function KeysIndex() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Keys", path: "/keys" },
        ])}
      />

      <div className={styles.eyebrow}>Keys library · {ROOTS.length * KEY_MODE_ORDER.length} keys</div>
      <h1 className={styles.h1}>Every key and the chords in it</h1>
      <p className={styles.lede}>
        Pick a key to see its seven diatonic chords, its key signature, the scale
        it is built from, and the progressions players reach for most.
      </p>
      <p className={styles.sub}>
        Looking for a single chord or scale instead? Browse the{" "}
        <Link href="/chords" style={{ color: "var(--amber)" }}>
          chord library
        </Link>{" "}
        or the{" "}
        <Link href="/scales" style={{ color: "var(--amber)" }}>
          scales library
        </Link>
        .
      </p>

      {KEY_MODE_ORDER.map((mode) => (
        <section key={mode} className={styles.group}>
          <h2 className={styles.groupHead}>{MODE_HEADS[mode]}</h2>
          <div className={styles.grid}>
            {ROOTS.map((pc) => (
              <Link key={pc} href={`/keys/${keySlug(pc, mode)}`} className={styles.cell}>
                {keyName(pc, mode)}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
