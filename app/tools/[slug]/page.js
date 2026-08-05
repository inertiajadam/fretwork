import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOLS, toolBySlug, TOOL_KEYWORDS } from "@/lib/site";
import { getToolComponent } from "@/components/tools/registry";
import JsonLd from "@/components/JsonLd";
import { toolSchema, breadcrumbSchema } from "@/lib/schema";
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
      <div className={styles.crumb}>
        <Link href="/tools">Tools</Link>
        <span aria-hidden="true">/</span>
        <span>{tool.name}</span>
      </div>
      <ToolComponent />
    </div>
  );
}
