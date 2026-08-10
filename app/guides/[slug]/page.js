import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, guideBySlug } from "@/lib/guides";
import { toolBySlug } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "../../prose.module.css";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const guide = guideBySlug(params.slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  const title = `${guide.title} · Fretwork`;
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keyword ? [guide.keyword] : undefined,
    alternates: { canonical: path },
    openGraph: buildOpenGraph({
      title,
      description: guide.description,
      path,
      type: "article",
    }),
    twitter: buildTwitter({ title, description: guide.description }),
  };
}

function Body({ items }) {
  return items.map((item, i) => {
    if (typeof item === "string") return <p key={i}>{item}</p>;
    if (item.list)
      return (
        <ul key={i}>
          {item.list.map((li, j) => (
            <li key={j}>{li}</li>
          ))}
        </ul>
      );
    return null;
  });
}

export default function GuidePage({ params }) {
  const guide = guideBySlug(params.slug);
  if (!guide) notFound();

  const intro = Array.isArray(guide.intro) ? guide.intro : [guide.intro];
  const relatedTools = (guide.relatedTools || [])
    .map((s) => toolBySlug(s))
    .filter(Boolean);
  const relatedGuides = (guide.relatedGuides || [])
    .map((s) => guideBySlug(s))
    .filter(Boolean);

  return (
    <article className={styles.prose}>
      <JsonLd
        data={articleSchema(
          { title: guide.title, intro: intro.join(" ") },
          `/guides/${guide.slug}`
        )}
      />
      <JsonLd data={faqSchema(guide.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />

      <div className={styles.eyebrow}>Guide · {guide.readMins} min read</div>
      <h1>{guide.title}</h1>

      {intro.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      {guide.sections.map((s, i) => (
        <section key={i}>
          {s.heading && <h2>{s.heading}</h2>}
          <Body items={s.body} />
        </section>
      ))}

      {guide.faqs?.length > 0 && (
        <>
          <h2>Frequently asked questions</h2>
          {guide.faqs.map((f, i) => (
            <div key={i}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </>
      )}

      {relatedTools.length > 0 && (
        <p>
          <strong>Try it free:</strong>{" "}
          {relatedTools.map((t, i, arr) => (
            <span key={t.slug}>
              <Link href={`/tools/${t.slug}`}>{t.name}</Link>
              {i < arr.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      )}

      {relatedGuides.length > 0 && (
        <p>
          <strong>Keep reading:</strong>{" "}
          {relatedGuides.map((g, i, arr) => (
            <span key={g.slug}>
              <Link href={`/guides/${g.slug}`}>{g.title}</Link>
              {i < arr.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      )}

      <Link href="/guides" className={styles.backLink}>
        All guides
      </Link>
    </article>
  );
}
