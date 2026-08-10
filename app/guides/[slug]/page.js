import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, guideBySlug } from "@/lib/guides";
import { toolBySlug } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ArticleSidebar from "@/components/ArticleSidebar";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "@/components/Article.module.css";

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

const slugifyHeading = (h) =>
  h
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

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
  const sections = guide.sections.map((s) => ({
    ...s,
    id: s.heading ? slugifyHeading(s.heading) : null,
  }));
  const faqId = "frequently-asked-questions";

  const relatedTools = (guide.relatedTools || [])
    .map((s) => toolBySlug(s))
    .filter(Boolean);
  const relatedGuides = (guide.relatedGuides || [])
    .map((s) => guideBySlug(s))
    .filter(Boolean);

  const toc = [
    ...sections.filter((s) => s.heading).map((s) => ({ id: s.id, label: s.heading })),
    ...(guide.faqs?.length ? [{ id: faqId, label: "FAQ" }] : []),
  ];

  const groups = [
    {
      title: "Try it free",
      links: relatedTools.map((t) => ({
        href: `/tools/${t.slug}`,
        label: t.name,
        accent: true,
      })),
    },
    {
      title: "Keep reading",
      links: relatedGuides.map((g) => ({
        href: `/guides/${g.slug}`,
        label: g.title,
      })),
    },
  ];

  return (
    <div className={styles.layout}>
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

      <article className={styles.article}>
        <div className={styles.eyebrow}>Guide · {guide.readMins} min read</div>
        <h1>{guide.title}</h1>

        {intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {sections.map((s, i) => (
          <section key={i}>
            {s.heading && <h2 id={s.id}>{s.heading}</h2>}
            <Body items={s.body} />
          </section>
        ))}

        {guide.faqs?.length > 0 && (
          <section>
            <h2 id={faqId}>Frequently asked questions</h2>
            {guide.faqs.map((f, i) => (
              <div key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>
        )}

        <Link href="/guides" className={styles.backLink}>
          All guides
        </Link>
      </article>

      <ArticleSidebar toc={toc} groups={groups} />
    </div>
  );
}
