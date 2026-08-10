import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, lessonBySlug } from "@/lib/learnContent";
import { toolBySlug } from "@/lib/site";
import { getToolComponent } from "@/components/tools/registry";
import JsonLd from "@/components/JsonLd";
import ArticleSidebar from "@/components/ArticleSidebar";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "@/components/Article.module.css";

export function generateStaticParams() {
  return Object.keys(LESSONS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const lesson = lessonBySlug(params.slug);
  if (!lesson) return {};
  const path = `/learn/${params.slug}`;
  const description = lesson.intro.slice(0, 155);
  const title = `${lesson.title} · Fretwork`;
  return {
    title: lesson.title,
    description,
    alternates: { canonical: path },
    openGraph: buildOpenGraph({ title, description, path, type: "article" }),
    twitter: buildTwitter({ title, description }),
  };
}

const slugifyHeading = (h) =>
  h
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function LessonPage({ params }) {
  const lesson = lessonBySlug(params.slug);
  if (!lesson) notFound();

  const Embedded = lesson.embedTool ? getToolComponent(lesson.embedTool) : null;
  const embeddedTool = lesson.embedTool ? toolBySlug(lesson.embedTool) : null;

  const blocks = lesson.blocks.map((b) => ({ ...b, id: slugifyHeading(b.h2) }));

  const relatedTools = (lesson.related || [])
    .map((s) => toolBySlug(s))
    .filter(Boolean);
  const moreLessons = Object.keys(LESSONS)
    .filter((s) => s !== params.slug)
    .map((s) => ({ slug: s, title: LESSONS[s].title }));

  const toc = blocks.map((b) => ({ id: b.id, label: b.h2 }));
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
      title: "More lessons",
      links: moreLessons.map((l) => ({
        href: `/learn/${l.slug}`,
        label: l.title,
      })),
    },
  ];

  return (
    <div className={styles.layout}>
      <JsonLd data={articleSchema(lesson, `/learn/${params.slug}`)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: lesson.title, path: `/learn/${params.slug}` },
        ])}
      />

      <article className={styles.article}>
        <div className={styles.eyebrow}>{lesson.eyebrow}</div>
        <h1>{lesson.title}</h1>
        <p>{lesson.intro}</p>

        {blocks.map((b, i) => (
          <section key={i}>
            <h2 id={b.id}>{b.h2}</h2>
            <p>{b.p}</p>
            {i === 0 && Embedded && (
              <div className={styles.toolMount}>
                <Embedded />
              </div>
            )}
          </section>
        ))}

        {embeddedTool && (
          <p className={styles.muted}>
            Open the full tool on its own page:{" "}
            <Link href={`/tools/${embeddedTool.slug}`}>{embeddedTool.name}</Link>
            .
          </p>
        )}

        <Link href="/learn" className={styles.backLink}>
          All lessons
        </Link>
      </article>

      <ArticleSidebar toc={toc} groups={groups} />
    </div>
  );
}
