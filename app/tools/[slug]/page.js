import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOLS, toolBySlug } from "@/lib/site";
import { getToolComponent } from "@/components/tools/registry";
import styles from "./toolPage.module.css";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tool = toolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.blurb,
  };
}

export default function ToolPage({ params }) {
  const tool = toolBySlug(params.slug);
  if (!tool) notFound();

  const ToolComponent = getToolComponent(params.slug);
  if (!ToolComponent) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.crumb}>
        <Link href="/tools">Tools</Link>
        <span aria-hidden="true">/</span>
        <span>{tool.name}</span>
      </div>
      <ToolComponent />
    </div>
  );
}
