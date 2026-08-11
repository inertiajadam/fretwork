import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOLS, toolBySlug, TOOL_KEYWORDS } from "@/lib/site";
import { toolContentBySlug } from "@/lib/toolContent";
import { getToolComponent } from "@/components/tools/registry";
import JsonLd from "@/components/JsonLd";
import SaveButton from "@/components/SaveButton";
import { toolSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import styles from "./toolPage.module.css";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tool = toolBySlug(params.slug);
  if (!tool) return {};
  const path = `/tools/${tool.slug}`;
  const title = `${tool.name} · Fretwork`;
  return {
    title: tool.name,
    description: tool.blurb,
    keywords: TOOL_KEYWORDS[tool.slug],
    alternates: { canonical: path },
    openGraph: buildOpenGraph({ title, description: tool.blurb, path }),
    twitter: buildTwitter({ title, description: tool.blurb }),
  };
}

export default function ToolPage({ params }) {
  const tool = toolBySlug(params.slug);
  if (!tool) notFound();

  const ToolComponent = getToolComponent(params.slug);
  if (!ToolComponent) notFound();

  const content = toolContentBySlug(params.slug);

  return (
    <div className={styles.page}>
      <JsonLd data={toolSchema(tool)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: tool.name, path: `/tools/${tool.slug}` },
        ])}
      />
      {content && <JsonLd data={faqSchema(content.faqs)} />}
      <div className={styles.crumb}>
        <Link href="/tools">Tools</Link>
        <span aria-hidden="true">/</span>
        <span>{tool.name}</span>
        <SaveButton
          item={{
            type: "Tool",
            title: tool.name,
            href: `/tools/${tool.slug}`,
            description: tool.blurb,
          }}
        />
      </div>
      <ToolComponent />

      {content && (
        <section className={styles.seo}>
          <h2>{content.heading}</h2>
          <p>{content.intro}</p>

          <h3>{content.stepsTitle}</h3>
          <ol>
            {content.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>

          <h3>Frequently asked questions</h3>
          <dl className={styles.faq}>
            {content.faqs.map((f, i) => (
              <div key={i}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>

          {content.related?.length > 0 && (
            <p className={styles.related}>
              Related free tools:{" "}
              {content.related
                .map((slug) => toolBySlug(slug))
                .filter(Boolean)
                .map((t, i, arr) => (
                  <span key={t.slug}>
                    <Link href={`/tools/${t.slug}`}>{t.name}</Link>
                    {i < arr.length - 1 ? ", " : "."}
                  </span>
                ))}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
