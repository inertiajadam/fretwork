import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import cards from "@/components/Cards.module.css";

const DESC =
  "Plain-language guitar guides: how to tune, use a capo, the CAGED system, changing key, the circle of fifths, ear training, and more. Free, with an interactive tool for each.";

export const metadata = {
  title: "Guides",
  description: DESC,
  alternates: { canonical: "/guides" },
  openGraph: buildOpenGraph({ title: "Guides · Fretwork", description: DESC, path: "/guides" }),
  twitter: buildTwitter({ title: "Guides · Fretwork", description: DESC }),
};

export default function GuidesIndex() {
  return (
    <section className={cards.wrap}>
      <div className={cards.header}>
        <div className={cards.eyebrow}>Guides · free, no account</div>
        <h1 className={cards.h1}>Guitar guides that actually click</h1>
        <p className={cards.lede}>
          Short, plain-language explainers for the things guitarists get stuck
          on, each paired with a free interactive tool so you can try it as you
          read.
        </p>
      </div>
      <div className={cards.grid}>
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className={cards.card}>
            <div className={cards.cardTop}>
              <span className={cards.tag}>Guide</span>
              <span className={`${cards.status} ${cards.built}`}>
                {g.readMins} min
              </span>
            </div>
            <h3>{g.title}</h3>
            <p>{g.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
