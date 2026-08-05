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

export function articleSchema(lesson, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lesson.title,
    description: lesson.intro.slice(0, 200),
    url: absoluteUrl(`/learn/${slug}`),
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
