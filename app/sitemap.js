import { TOOLS } from "@/lib/site";
import { LESSONS } from "@/lib/learnContent";
import { GUIDES } from "@/lib/guides";
import { ALL_CHORDS } from "@/lib/chords";
import { ALL_SCALES } from "@/lib/scales";
import { ALL_KEYS } from "@/lib/keys";
import { absoluteUrl } from "@/lib/seo";

/* Generated sitemap covering every real route. Driven by the registries, */
/* so new tools/lessons appear here automatically.                         */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/tools", priority: 0.9, changeFrequency: "weekly" },
    { path: "/chords", priority: 0.9, changeFrequency: "weekly" },
    { path: "/scales", priority: 0.9, changeFrequency: "weekly" },
    { path: "/keys", priority: 0.9, changeFrequency: "weekly" },
    { path: "/guides", priority: 0.9, changeFrequency: "weekly" },
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

  const guideRoutes = GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const chordRoutes = ALL_CHORDS.map((c) => ({
    path: `/chords/${c.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const scaleRoutes = ALL_SCALES.map((s) => ({
    path: `/scales/${s.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const keyRoutes = ALL_KEYS.map((k) => ({
    path: `/keys/${k.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...lessonRoutes,
    ...guideRoutes,
    ...chordRoutes,
    ...scaleRoutes,
    ...keyRoutes,
  ].map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
