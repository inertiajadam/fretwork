import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, lessonBySlug } from "@/lib/learnContent";
import { toolBySlug } from "@/lib/site";
import { getToolComponent } from "@/components/tools/registry";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "../../prose.module.css";

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

export default function LessonPage({ params }) {
  const lesson = lessonBySlug(params.slug);
  if (!lesson) notFound();

  const Embedded = lesson.embedTool
    ? getToolComponent(lesson.embedTool)
    : null;
  const embeddedTool = lesson.embedTool ? toolBySlug(lesson.embedTool) : null;

  return (
    <article className={styles.prose}>
      <JsonLd data={articleSchema(lesson, params.slug)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: lesson.title, path: `/learn/${params.slug}` },
        ])}
      />
      <div className={styles.eyebrow}>{lesson.eyebrow}</div>
      <h1>{lesson.title}</h1>
      <p>{lesson.intro}</p>

      {lesson.blocks.map((b, i) => (
        <div key={i}>
          <h2>{b.h2}</h2>
          <p>{b.p}</p>
          {/* Embed the tool right after the first block, where the lesson
              starts pointing at it. */}
          {i === 0 && Embedded && (
            <div className={styles.toolMount}>
              <Embedded />
            </div>
          )}
        </div>
      ))}

      {embeddedTool && (
        <p className={styles.muted}>
          Open the full tool on its own page:{" "}
          <Link href={`/tools/${embeddedTool.slug}`}>{embeddedTool.name}</Link>.
        </p>
      )}

      {lesson.related?.length > 0 && (
        <>
          <h2>Related tools</h2>
          <ul>
            {lesson.related.map((slug) => {
              const t = toolBySlug(slug);
              if (!t) return null;
              return (
                <li key={slug}>
                  <Link href={`/tools/${slug}`}>{t.name}</Link>: {t.blurb}
                </li>
              );
            })}
          </ul>
        </>
      )}

      <Link href="/learn" className={styles.backLink}>
        ← All lessons
      </Link>
    </article>
  );
}
