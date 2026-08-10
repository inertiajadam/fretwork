import { TOOLS } from "@/lib/site";
import { LESSONS } from "@/lib/learnContent";
import { absoluteUrl } from "@/lib/seo";

/* Generated sitemap covering every real route. Driven by the registries, */
/* so new tools/lessons appear here automatically.                         */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/tools", priority: 0.9, changeFrequency: "weekly" },
    { path: "/learn", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.4, changeFrequency: "monthly" },
    // /practice is hidden from nav for now, so it is omitted from the sitemap.
  ];

  const toolRoutes = TOOLS.map((t) => ({
    path: `/tools/${t.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const lessonRoutes = Object.keys(LESSONS).map((slug) => ({
    path: `/learn/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...toolRoutes, ...lessonRoutes].map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
