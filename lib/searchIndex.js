/* Flat search index over everything on the site: tools, guides, lessons.
   Built at module load from the registries so it always stays in sync. */
import { TOOLS, TOOL_KEYWORDS } from "@/lib/site";
import { GUIDE_CARDS } from "@/lib/guides";
import { LESSONS } from "@/lib/learnContent";

export const SEARCH_INDEX = [
  ...TOOLS.map((t) => ({
    type: "Tool",
    title: t.name,
    description: t.blurb,
    href: `/tools/${t.slug}`,
    keywords: [t.tag, ...(TOOL_KEYWORDS[t.slug] || [])],
  })),
  ...GUIDE_CARDS.map((g) => ({
    type: "Guide",
    title: g.title,
    description: g.description,
    href: `/guides/${g.slug}`,
    keywords: [g.keyword, g.category].filter(Boolean),
  })),
  ...Object.entries(LESSONS).map(([slug, l]) => ({
    type: "Lesson",
    title: l.title,
    description: (l.intro || "").slice(0, 150),
    href: `/learn/${slug}`,
    keywords: [],
  })),
];

/* Simple case-insensitive substring search over title + description +
   keywords. Ranks title matches above the rest. */
export function searchSite(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);

  const scored = [];
  for (const entry of SEARCH_INDEX) {
    const title = entry.title.toLowerCase();
    const hay = `${title} ${entry.description.toLowerCase()} ${entry.keywords
      .join(" ")
      .toLowerCase()}`;
    if (!terms.every((t) => hay.includes(t))) continue;
    let score = 0;
    if (title.includes(q)) score += 10;
    if (title.startsWith(q)) score += 5;
    if (entry.type === "Tool") score += 2; // tools are the main destination
    scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}
