import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ALL_SCALES,
  SCALE_TYPES,
  SCALE_TYPE_ORDER,
  ROOTS,
  scaleFromSlug,
  scaleSlug,
  scaleName,
  buildScale,
  rootNameFor,
} from "@/lib/scales";
import JsonLd from "@/components/JsonLd";
import ScaleFretboard from "@/components/ScaleFretboard";
import SaveButton from "@/components/SaveButton";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { keyExistsFor } from "@/lib/keys";
import styles from "@/components/RefPage.module.css";

export function generateStaticParams() {
  return ALL_SCALES.map((s) => ({ scale: s.slug }));
}

function joinAnd(arr) {
  if (arr.length <= 1) return arr.join("");
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

export function generateMetadata({ params }) {
  const found = scaleFromSlug(params.scale);
  if (!found) return {};
  const scale = buildScale(found.rootPc, found.typeId);
  const name = scaleName(found.rootPc, found.typeId);
  const noteList = scale.notes.map((n) => n.name).join(", ");
  const path = `/scales/${scale.slug}`;
  const title = `${name} Scale`;
  const description = `The ${name} scale on guitar: the notes are ${noteList}. See the scale mapped across the fretboard from open position to the 12th fret, with the root and every note labeled. Free.`;

  return {
    title,
    description,
    keywords: [
      `${name} scale`,
      `${name} scale guitar`,
      `${name} scale notes`,
      `how to play ${name} scale`,
      `${scale.rootName} ${SCALE_TYPES[found.typeId].name.toLowerCase()}`,
    ],
    alternates: { canonical: path },
    openGraph: buildOpenGraph({ title: `${name} Scale · Fretwork`, description, path, type: "article" }),
    twitter: buildTwitter({ title: `${name} Scale · Fretwork`, description }),
  };
}

export default function ScalePage({ params }) {
  const found = scaleFromSlug(params.scale);
  if (!found) notFound();

  const { rootPc, typeId } = found;
  const t = SCALE_TYPES[typeId];
  const scale = buildScale(rootPc, typeId);
  const name = scaleName(rootPc, typeId);
  const root = scale.rootName;
  const path = `/scales/${scale.slug}`;

  const noteNames = scale.notes.map((n) => n.name);
  const nameByPc = {};
  scale.notes.forEach((n) => {
    nameByPc[n.pc] = n.name;
  });

  const faqs = [
    {
      q: `What notes are in the ${name} scale?`,
      a: `The ${name} scale contains ${scale.notes.length} notes: ${joinAnd(
        noteNames
      )}. As scale degrees those are ${scale.notes.map((n) => n.label).join(", ")}.`,
    },
    {
      q: `How do you play the ${name} scale on guitar?`,
      a: `Every note above is shown on the fretboard diagram, from the open strings up to the 12th fret, with the root (${root}) highlighted. The pattern is movable: learn the shape once and you can slide it to start on any root. Anchor your playing to the ${root} notes so the scale sounds resolved.`,
    },
    {
      q: `What is the ${name} scale used for?`,
      a: `The ${t.name.toLowerCase()} scale is ${t.blurb}. Once the shape is under your fingers, try improvising over a backing track in ${root} and listen for how each note pulls back toward the root.`,
    },
  ];

  const otherTypes = SCALE_TYPE_ORDER.filter((id) => id !== typeId).map((id) => ({
    slug: scaleSlug(rootPc, id),
    label: `${rootNameFor(rootPc, SCALE_TYPES[id].family)} ${SCALE_TYPES[id].name}`,
  }));
  const otherRoots = ROOTS.filter((pc) => pc !== rootPc).map((pc) => ({
    slug: scaleSlug(pc, typeId),
    label: rootNameFor(pc, t.family),
  }));

  const keyLink = keyExistsFor(rootPc, typeId); // { slug, label } or null

  return (
    <div className={styles.page}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${name} Scale for Guitar`,
          url: absoluteUrl(path),
          isAccessibleForFree: true,
          about: {
            "@type": "Thing",
            name: `${name} scale`,
            description: `The ${name} scale contains the notes ${noteNames.join(", ")}.`,
          },
        }}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Scales", path: "/scales" },
          { name: `${name} scale`, path },
        ])}
      />

      <div className={styles.crumb}>
        <Link href="/scales">Scales</Link>
        <span aria-hidden="true">/</span>
        <span>{name}</span>
        <SaveButton
          item={{
            type: "Scale",
            title: `${name} scale`,
            href: path,
            description: `${name} scale: ${noteNames.join(", ")}.`,
          }}
        />
      </div>

      <div className={styles.eyebrow}>Guitar scale · fretboard map</div>
      <h1 className={styles.h1}>{name} Scale</h1>

      <p className={styles.lede}>
        The <b>{name} scale</b> is built from the notes <b>{joinAnd(noteNames)}</b>
        {t.aka ? `, also known as ${t.aka}` : ""}. The diagram below maps every
        one of those notes across the guitar neck, from the open strings up to
        the 12th fret, with the root {root} highlighted.
      </p>
      <p className={styles.sub}>
        The {t.name.toLowerCase()} scale is {t.blurb}.
      </p>

      <h2 className={styles.h2}>Notes in the {name} scale</h2>
      <div className={styles.facts}>
        {scale.notes.map((n, i) => (
          <div key={i} className={styles.tone}>
            <span className={styles.toneName}>{n.name}</span>
            <span className={styles.toneRole}>{n.label}</span>
          </div>
        ))}
      </div>

      <h2 className={styles.h2}>{name} scale on the fretboard</h2>
      <div className={styles.fretWrap}>
        <ScaleFretboard pcSet={scale.pcSet} rootPc={rootPc} nameByPc={nameByPc} />
      </div>
      <div className={styles.legend}>
        <span>
          <i className={styles.dot} style={{ background: "var(--amber)" }} /> root ({root})
        </span>
        <span>
          <i className={styles.dot} style={{ background: "var(--ink)" }} /> other scale notes
        </span>
      </div>

      {keyLink && (
        <Link href={`/keys/${keyLink.slug}`} className={styles.cta}>
          <p className={styles.ctaTitle}>Chords in the key of {keyLink.label} &rarr;</p>
          <p className={styles.ctaSub}>
            See the seven chords that come from this scale, plus common
            progressions in the key.
          </p>
        </Link>
      )}

      <Link href="/tools/fretboard-explorer" className={styles.cta}>
        <p className={styles.ctaTitle}>Explore this on the interactive fretboard &rarr;</p>
        <p className={styles.ctaSub}>
          The free Fretboard Explorer lets you switch keys and see the CAGED
          shapes and scale overlays tile the whole neck.
        </p>
      </Link>

      <h2 className={styles.h2}>Other scales in {root}</h2>
      <div className={styles.chips}>
        {otherTypes.map((s) => (
          <Link key={s.slug} href={`/scales/${s.slug}`} className={styles.chip}>
            {s.label}
          </Link>
        ))}
      </div>

      <h2 className={styles.h2}>The {t.name.toLowerCase()} scale in other keys</h2>
      <div className={styles.chips}>
        {otherRoots.map((s) => (
          <Link key={s.slug} href={`/scales/${s.slug}`} className={styles.chip}>
            {s.label}
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
