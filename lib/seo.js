/* ------------------------------------------------------------------ */
/* Canonical site URL, resolved in priority order:                      */
/*   1. NEXT_PUBLIC_SITE_URL  (set this to your custom domain)          */
/*   2. Vercel's production domain (auto, on deployed builds)           */
/*   3. localhost fallback (dev)                                        */
/* Everything SEO (metadataBase, canonicals, sitemap, robots, OG URLs)  */
/* derives from here, so pointing the site at a real domain is a        */
/* one-line env change.                                                 */
/* ------------------------------------------------------------------ */

/* The live production domain. Overridable via NEXT_PUBLIC_SITE_URL. */
const PRODUCTION_URL = "https://fretwork.studio";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // Production and preview builds canonicalize to the real domain, so search
  // engines and social cards always point at fretwork.studio, never a
  // per-deploy vercel.app URL.
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/* Absolute URL for a site-relative path, e.g. absoluteUrl("/tools"). */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

/* The dynamically generated share image (app/opengraph-image.js). */
export const OG_IMAGE = "/opengraph-image";

/* Build a complete openGraph object. Needed because Next replaces (does  */
/* not deep-merge) a child page's openGraph, so each page must restate     */
/* siteName, locale, and the share image or they are lost.                 */
export function buildOpenGraph({ title, description, path = "/", type = "website" }) {
  return {
    type,
    siteName: "Fretwork",
    locale: "en_US",
    url: path,
    title,
    description,
    images: [OG_IMAGE],
  };
}

/* Same reasoning for twitter: a child twitter object replaces the parent, */
/* so restate the card type and image every time.                          */
export function buildTwitter({ title, description }) {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  };
}
