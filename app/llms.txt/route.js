import { SITE_NAME, TOOLS, LEARN } from "@/lib/site";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

/* Serves /llms.txt: a curated, plain-text map of the site for AI answer
   engines, following the llmstxt.org convention (H1 name, blockquote summary,
   then sections of annotated links). Generated from the same registries as the
   nav and sitemap, so it never goes stale. */
export const dynamic = "force-static";

export function GET() {
  const L = [];
  L.push(`# ${SITE_NAME}`);
  L.push("");
  L.push(
    "> Free, interactive guitar tools and plain-language reference for players who want to understand the neck. Includes a microphone tuner, chord and scale finders, a circle of fifths, a metronome, an ear trainer, and more, plus written guides and reference pages for every chord, scale, and key. Everything is free and no account is required."
  );
  L.push("");

  L.push("## Interactive tools");
  L.push("");
  TOOLS.forEach((t) => {
    L.push(`- [${t.name}](${absoluteUrl(`/tools/${t.slug}`)}): ${t.blurb}`);
  });
  L.push("");

  L.push("## Reference");
  L.push("");
  L.push(
    `- [Chord library](${absoluteUrl("/chords")}): every chord in nine qualities and all five CAGED voicings up the neck, with the notes and intervals labeled.`
  );
  L.push(
    `- [Scales library](${absoluteUrl("/scales")}): major, minor, pentatonic, blues, and the modes in every key, each mapped across the fretboard.`
  );
  L.push(
    `- [Keys](${absoluteUrl("/keys")}): the diatonic chords, key signature, and common chord progressions for all 12 major and 12 minor keys.`
  );
  L.push("");

  L.push("## Lessons");
  L.push("");
  LEARN.forEach((l) => {
    L.push(`- [${l.name}](${absoluteUrl(`/learn/${l.slug}`)}): ${l.blurb}`);
  });
  L.push("");

  L.push("## Guides");
  L.push("");
  GUIDES.forEach((g) => {
    L.push(`- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.description}`);
  });
  L.push("");

  return new Response(L.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
