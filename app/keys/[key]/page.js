import Link from "next/link";
import { notFound } from "next/navigation";
import { ROOTS } from "@/lib/theory";
import {
  ALL_KEYS,
  KEY_MODE_ORDER,
  buildKey,
  keyFromSlug,
  keySlug,
  keyName,
} from "@/lib/keys";
import JsonLd from "@/components/JsonLd";
import SaveButton from "@/components/SaveButton";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "@/components/RefPage.module.css";

export function generateStaticParams() {
  return ALL_KEYS.map((k) => ({ key: k.slug }));
}

function joinAnd(arr) {
  if (arr.length <= 1) return arr.join("");
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

export function generateMetadata({ params }) {
  const found = keyFromSlug(params.key);
  if (!found) return {};
  const key = buildKey(found.rootPc, found.mode);
  const chordList = key.degrees.map((d) => d.symbol).join(", ");
  const path = `/keys/${key.slug}`;
  const title = `Key of ${key.name}: Chords & Notes`;
  const description = `The key of ${key.name} has the chords ${chordList}. See the diatonic chords, key signature (${key.signature}), scale, and common chord progressions. Free guitar reference.`;

  return {
    title,
    description,
    keywords: [
      `key of ${key.name}`,
      `${key.name} chords`,
      `chords in the key of ${key.name}`,
      `${key.name} scale`,
      `${key.name} key signature`,
    ],
    alternates: { canonical: path },
    openGraph: buildOpenGraph({ title: `Key of ${key.name} · Fretwork`, description, path, type: "article" }),
    twitter: buildTwitter({ title: `Key of ${key.name} · Fretwork`, description }),
  };
}

/* A chord chip that links to the chord page when one exists (diminished
   triads are shown as plain text). */
function ChordChip({ chord }) {
  if (chord.slug)
    return (
      <Link href={`/chords/${chord.slug}`} className={styles.chip}>
        {chord.symbol}
      </Link>
    );
  return <span className={styles.chip}>{chord.symbol}</span>;
}

export default function KeyPage({ params }) {
  const found = keyFromSlug(params.key);
  if (!found) notFound();

  const { rootPc, mode } = found;
  const key = buildKey(rootPc, mode);
  const path = `/keys/${key.slug}`;

  const chordSymbols = key.degrees.map((d) => d.symbol);
  const isMinor = mode === "minor";

  const faqs = [
    {
      q: `What chords are in the key of ${key.name}?`,
      a: `The key of ${key.name} contains seven chords, one on each note of the scale: ${joinAnd(
        chordSymbols
      )}. In Roman numerals those are ${key.degrees.map((d) => d.roman).join(", ")}.`,
    },
    {
      q: `What is the key signature of ${key.name}?`,
      a: `${key.name} has ${key.signature}. It shares that key signature with its relative ${
        isMinor ? "major" : "minor"
      }, ${key.relative.label}.`,
    },
    {
      q: `What are common chord progressions in ${key.name}?`,
      a: `${key.progressions
        .slice(0, 2)
        .map((p) => `${p.label} is ${p.chords.map((c) => c.symbol).join(" – ")}`)
        .join("; ")}. ${
        isMinor
          ? `In minor keys the v chord (${key.degrees[4].symbol}) is often raised to a major V or V7 for a stronger pull back to the tonic.`
          : `The I, IV, and V chords (${key.degrees[0].symbol}, ${key.degrees[3].symbol}, ${key.degrees[4].symbol}) do most of the work in popular music.`
      }`,
    },
    {
      q: `What is the relative ${isMinor ? "major" : "minor"} of ${key.name}?`,
      a: `The relative ${isMinor ? "major" : "minor"} of ${key.name} is ${key.relative.label}. It uses the same notes and the same key signature, just starting from a different home note.`,
    },
  ];

  const otherKeys = ROOTS.filter((pc) => pc !== rootPc).map((pc) => ({
    slug: keySlug(pc, mode),
    label: keyName(pc, mode),
  }));

  return (
    <div className={styles.page}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Key of ${key.name}`,
          url: absoluteUrl(path),
          isAccessibleForFree: true,
          about: {
            "@type": "Thing",
            name: `${key.name} key`,
            description: `The key of ${key.name} contains the chords ${chordSymbols.join(", ")} and has ${key.signature}.`,
          },
        }}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Keys", path: "/keys" },
          { name: `Key of ${key.name}`, path },
        ])}
      />

      <div className={styles.crumb}>
        <Link href="/keys">Keys</Link>
        <span aria-hidden="true">/</span>
        <span>{key.name}</span>
        <SaveButton
          item={{
            type: "Key",
            title: `Key of ${key.name}`,
            href: path,
            description: `Chords in ${key.name}: ${chordSymbols.join(", ")}.`,
          }}
        />
      </div>

      <div className={styles.eyebrow}>Key reference · diatonic chords</div>
      <h1 className={styles.h1}>The Key of {key.name}</h1>

      <p className={styles.lede}>
        The key of <b>{key.name}</b> is built on the {key.name} scale and
        contains the seven chords <b>{joinAnd(chordSymbols)}</b>. Its key
        signature has <b>{key.signature}</b>.
      </p>
      <p className={styles.sub}>
        Below are those chords by scale degree, the progressions they build, and
        the related scale and key you can reach from here.
      </p>

      <h2 className={styles.h2}>Chords in the key of {key.name}</h2>
      <div className={styles.degrees}>
        {key.degrees.map((d, i) =>
          d.slug ? (
            <Link key={i} href={`/chords/${d.slug}`} className={styles.degree}>
              <span className={styles.roman}>{d.roman}</span>
              <span className={styles.degreeName}>{d.symbol}</span>
            </Link>
          ) : (
            <div key={i} className={styles.degree}>
              <span className={styles.roman}>{d.roman}</span>
              <span className={styles.degreeName}>{d.symbol}</span>
            </div>
          )
        )}
      </div>

      <h2 className={styles.h2}>Common progressions in {key.name}</h2>
      <div className={styles.progList}>
        {key.progressions.map((p, i) => (
          <div key={i} className={styles.prog}>
            <span className={styles.progRoman}>{p.label}</span>
            <span className={styles.progChords}>
              {p.chords.map((c, j) => (
                <ChordChip key={j} chord={c} />
              ))}
            </span>
          </div>
        ))}
      </div>

      <Link href={`/scales/${key.scaleSlug}`} className={styles.cta}>
        <p className={styles.ctaTitle}>The {key.name} scale on the fretboard &rarr;</p>
        <p className={styles.ctaSub}>
          See every note of the scale this key is built from, mapped across the
          neck.
        </p>
      </Link>

      <Link href="/tools/circle-of-fifths" className={styles.cta}>
        <p className={styles.ctaTitle}>Explore keys on the Circle of Fifths &rarr;</p>
        <p className={styles.ctaSub}>
          The free interactive circle shows every key signature and the chords
          that belong to each key.
        </p>
      </Link>

      <h2 className={styles.h2}>Other {mode} keys</h2>
      <div className={styles.chips}>
        {otherKeys.map((k) => (
          <Link key={k.slug} href={`/keys/${k.slug}`} className={styles.chip}>
            {k.label}
          </Link>
        ))}
      </div>

      <h2 className={styles.h2}>Frequently asked questions</h2>
      <dl className={styles.faq}>
        {faqs.map((f, i) => (
          <div key={i}>
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
