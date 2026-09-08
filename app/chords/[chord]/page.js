import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ALL_CHORDS,
  QUALITIES,
  QUALITY_ORDER,
  ROOTS,
  chordFromSlug,
  chordSlug,
  chordSymbol,
  chordDisplayName,
  chordTones,
  buildVoicings,
  rootName,
} from "@/lib/chords";
import JsonLd from "@/components/JsonLd";
import ChordDiagram from "@/components/ChordDiagram";
import SaveButton from "@/components/SaveButton";
import { chordSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "../chords.module.css";

export function generateStaticParams() {
  return ALL_CHORDS.map((c) => ({ chord: c.slug }));
}

/* A word for each interval degree, for readable prose. */
const DEGREE_WORD = {
  R: "root",
  "2": "second",
  b3: "flat third",
  "3": "third",
  "4": "fourth",
  "5": "fifth",
  "6": "sixth",
  b7: "flat seventh",
  "7": "seventh",
  "9": "ninth",
};

/* What each flavor sounds like and where it turns up, in one line. */
const QUALITY_BLURB = {
  maj: "bright and resolved, the backbone of most songs",
  min: "darker and more reflective than major, the other half of most music",
  dom7: "bluesy and restless: it wants to resolve, which is why it drives blues, funk, and the V chord in nearly every key",
  maj7: "lush and dreamy, a jazz and soul staple that softens a plain major",
  min7: "smooth and mellow, the everyday minor of jazz, R&B, and pop",
  six: "vintage and sweet, a major chord with an added sixth for a rootsy lift",
  sus2: "open and airy: the third is swapped for the second, so it sounds neither major nor minor",
  sus4: "tense and unresolved: the third becomes the fourth, leaning to fall back to the plain chord",
  add9: "a major chord with a shimmering ninth on top, common in modern pop and acoustic playing",
};

function joinAnd(arr) {
  if (arr.length <= 1) return arr.join("");
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

export function generateMetadata({ params }) {
  const chord = chordFromSlug(params.chord);
  if (!chord) return {};
  const { rootPc, qualityId } = chord;
  const name = chordDisplayName(rootPc, qualityId);
  const symbol = chordSymbol(rootPc, qualityId);
  const tones = chordTones(rootPc, qualityId);
  const noteList = tones.map((t) => t.name).join(", ");
  const path = `/chords/${chord.slug}`;
  const title = `${name} Guitar Chord (${symbol})`;
  const description = `How to play the ${symbol} chord on guitar. ${name} contains the notes ${noteList}. See all five CAGED voicings up the neck, with finger positions, notes, and intervals. Free.`;

  return {
    title,
    description,
    keywords: [
      `${symbol} chord`,
      `${symbol} guitar chord`,
      `how to play ${symbol}`,
      `${name} chord guitar`,
      `${symbol} chord shapes`,
    ],
    alternates: { canonical: path },
    openGraph: buildOpenGraph({
      title: `${name} Guitar Chord · Fretwork`,
      description,
      path,
      type: "article",
    }),
    twitter: buildTwitter({ title: `${name} Guitar Chord · Fretwork`, description }),
  };
}

export default function ChordPage({ params }) {
  const chord = chordFromSlug(params.chord);
  if (!chord) notFound();

  const { rootPc, qualityId } = chord;
  const q = QUALITIES[qualityId];
  const name = chordDisplayName(rootPc, qualityId);
  const symbol = chordSymbol(rootPc, qualityId);
  const root = rootName(rootPc);
  const path = `/chords/${chord.slug}`;

  const tones = chordTones(rootPc, qualityId);
  const noteList = tones.map((t) => t.name);
  const spokenTones = joinAnd(
    tones.map((t) => `${t.name} (the ${DEGREE_WORD[t.label] || t.label})`)
  );

  const voicings = buildVoicings(rootPc, qualityId);
  const lowest = voicings[0];
  const highest = voicings[voicings.length - 1];
  const openVoicing = voicings.find((v) => v.base === 0);

  const positionSentence = openVoicing
    ? `${symbol} can be played in open position, and it also appears four more times higher up the neck.`
    : `The lowest shape starts around fret ${lowest.base}, and ${symbol} appears in four more positions higher up the neck.`;

  const faqs = [
    {
      q: `What notes are in the ${name} chord?`,
      a: `The ${name} chord (${symbol}) contains the notes ${joinAnd(
        noteList
      )}. Those are the ${q.labels.join(", ")} of ${root}, so the chord is ${spokenTones}.`,
    },
    {
      q: `How do you play ${symbol} on guitar?`,
      a: `There are five ways to play ${symbol}, one for each CAGED shape. ${positionSentence} A nearby voicing often makes an awkward chord change much easier, so if one shape fights you, try the next one up or down the neck.`,
    },
    {
      q: `What does a ${symbol} chord sound like?`,
      a: `A ${q.spoken} chord is ${QUALITY_BLURB[qualityId]}. You can hear ${symbol} and any progression built from it in the free interactive tools on this site.`,
    },
    {
      q: `Is ${symbol} a hard chord to play?`,
      a: openVoicing
        ? `Not necessarily. ${symbol} has an open-position shape that beginners can reach, plus higher barre-style shapes for when you want a different position or are playing with another guitarist.`
        : `${symbol} has no open shape in standard tuning, so it is usually played as a barre chord. That takes a little hand strength, but the shape is movable: learn it once and you can slide it to other roots.`,
    },
  ];

  const otherQualities = QUALITY_ORDER.filter((id) => id !== qualityId).map((id) => ({
    slug: chordSlug(rootPc, id),
    label: chordSymbol(rootPc, id),
  }));
  const otherRoots = ROOTS.filter((pc) => pc !== rootPc).map((pc) => ({
    slug: chordSlug(pc, qualityId),
    label: chordSymbol(pc, qualityId),
  }));

  return (
    <div className={styles.page}>
      <JsonLd
        data={chordSchema({
          name,
          symbol,
          notes: noteList,
          formula: q.labels,
          path,
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Chords", path: "/chords" },
          { name: `${symbol} chord`, path },
        ])}
      />

      <div className={styles.crumb}>
        <Link href="/chords">Chords</Link>
        <span aria-hidden="true">/</span>
        <span>{symbol}</span>
        <SaveButton
          item={{
            type: "Chord",
            title: `${symbol} chord`,
            href: path,
            description: `The ${name} chord: ${noteList.join(", ")}.`,
          }}
        />
      </div>

      <div className={styles.eyebrow}>Guitar chord · five voicings</div>
      <h1 className={styles.h1}>
        {name} Guitar Chord <span style={{ color: "var(--muted)" }}>({symbol})</span>
      </h1>

      <p className={styles.lede}>
        The <b>{name} chord</b> ({symbol}) is built from the notes{" "}
        <b>{joinAnd(noteList)}</b>: the {q.labels.join(", ")} of {root}. Below are
        the five ways to play {symbol} on guitar, laid out in order from the
        lowest position on the neck to the highest.
      </p>
      <p className={styles.sub}>
        A {q.spoken} chord is {QUALITY_BLURB[qualityId]}. {positionSentence}
      </p>

      <h2 className={styles.h2}>Notes in {symbol}</h2>
      <div className={styles.facts}>
        {tones.map((t) => (
          <div key={t.label} className={styles.tone}>
            <span className={styles.toneName}>{t.name}</span>
            <span className={styles.toneRole}>{t.label}</span>
          </div>
        ))}
      </div>

      <h2 className={styles.h2}>How to play {symbol}: five positions</h2>
      <div className={styles.cards}>
        {voicings.map((v) => (
          <div key={v.shape} className={styles.card}>
            <ChordDiagram
              shape={v.shape}
              grid={v.grid}
              roots={v.roots}
              base={v.base}
              rootPc={rootPc}
            />
            <div className={styles.cardFoot}>
              {v.base === 0 ? "Open position" : `Frets ${v.lo} to ${v.hi}`}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.prose}>
        <p className="muted" style={{ marginTop: 18 }}>
          Strings run low E to high e, left to right. Dots are finger positions,
          a ringed dot is the root ({root}), an &#215; means don&apos;t play that
          string, and the label on the right (like &quot;{highest.base}fr&quot;)
          is the starting fret. Under each shape are the notes it sounds and
          their role in the chord.
        </p>
      </div>

      <Link href="/tools/chord-library" className={styles.cta}>
        <p className={styles.ctaTitle}>Hear it and explore other chords &rarr;</p>
        <p className={styles.ctaSub}>
          The free interactive Chord Library lets you switch roots and flavors
          instantly and see every voicing update live.
        </p>
      </Link>

      <h2 className={styles.h2}>Other {root} chords</h2>
      <div className={styles.chips}>
        {otherQualities.map((c) => (
          <Link key={c.slug} href={`/chords/${c.slug}`} className={styles.chip}>
            {c.label}
          </Link>
        ))}
      </div>

      <h2 className={styles.h2}>The {q.name.toLowerCase()} chord in other keys</h2>
      <div className={styles.chips}>
        {otherRoots.map((c) => (
          <Link key={c.slug} href={`/chords/${c.slug}`} className={styles.chip}>
            {c.label}
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
