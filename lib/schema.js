/* Builders for JSON-LD structured data. All URLs are absolute.          */
import { SITE_NAME } from "@/lib/site";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free, interactive guitar tools and plain-language lessons for players who want to understand the neck.",
  };
}

/* Each interactive tool is a free web application. */
export function toolSchema(tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: absoluteUrl(`/tools/${tool.slug}`),
    description: tool.blurb,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

/* article: { title, intro }, path: full site-relative path e.g. "/guides/x". */
export function articleSchema(article, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: (article.intro || "").slice(0, 200),
    url: absoluteUrl(path),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
    },
    isAccessibleForFree: true,
  };
}

/* items: [{ name, path }] in order, root first. */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/* faqs: [{ q, a }]. Powers FAQ rich results in Google. */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* A single guitar chord as a reference page. There is no dedicated schema.org
   type for a chord, so this is a WebPage carrying the notes and formula as
   plain, machine-readable text, which is what AI answer engines extract. */
export function chordSchema({ name, symbol, notes, formula, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${name} Guitar Chord`,
    url: absoluteUrl(path),
    isAccessibleForFree: true,
    about: {
      "@type": "Thing",
      name: `${name} guitar chord (${symbol})`,
      description: `The ${name} chord contains the notes ${notes.join(
        ", "
      )} (${formula.join(" ")}).`,
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function toolListSchema(tools) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} tools`,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: absoluteUrl(`/tools/${t.slug}`),
    })),
  };
}
