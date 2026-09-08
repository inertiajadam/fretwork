/* Flat list of every real, indexable path on the site, driven by the same  */
/* registries the sitemap uses. Shared by the IndexNow submitter so search   */
/* engines get pinged with exactly what the sitemap lists.                   */

import { TOOLS } from "@/lib/site";
import { LESSONS } from "@/lib/learnContent";
import { GUIDES } from "@/lib/guides";
import { ALL_CHORDS } from "@/lib/chords";
import { ALL_SCALES } from "@/lib/scales";
import { ALL_KEYS } from "@/lib/keys";

export function allPaths() {
  return [
    "/",
    "/tools",
    "/chords",
    "/scales",
    "/keys",
    "/guides",
    "/learn",
    "/about",
    ...TOOLS.map((t) => `/tools/${t.slug}`),
    ...Object.keys(LESSONS).map((slug) => `/learn/${slug}`),
    ...GUIDES.map((g) => `/guides/${g.slug}`),
    ...ALL_CHORDS.map((c) => `/chords/${c.slug}`),
    ...ALL_SCALES.map((s) => `/scales/${s.slug}`),
    ...ALL_KEYS.map((k) => `/keys/${k.slug}`),
  ];
}
