import Link from "next/link";
import { LEARN } from "@/lib/site";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";
import cards from "@/components/Cards.module.css";

const DESC =
  "Plain-language guitar lessons written around interactive tools: CAGED and the fretboard, chords, theory and Nashville numbers, ear training, and technique.";

export const metadata = {
  title: "Learn",
  description: DESC,
  alternates: { canonical: "/learn" },
  openGraph: buildOpenGraph({ title: "Learn · Fretwork", description: DESC, path: "/learn" }),
  twitter: buildTwitter({ title: "Learn · Fretwork", description: DESC }),
};

export default function LearnIndex() {
  return (
    <section className={cards.wrap}>
      <div className={cards.header}>
        <div className={cards.eyebrow}>Learn</div>
        <h1 className={cards.h1}>Understand the neck</h1>
        <p className={cards.lede}>
          Short, original lessons for intermediate players who know some chords
          and songs but not how the neck fits together. Each one embeds the tool
          that makes it click.
        </p>
      </div>
      <div className={cards.grid}>
        {LEARN.map((l) => {
          const isWritten = l.status === "written";
          const inner = (
            <>
              <div className={cards.cardTop}>
                <span className={cards.tag}>Lesson</span>
                <span
                  className={`${cards.status} ${
                    isWritten ? cards.built : cards.planned
                  }`}
                >
                  {isWritten ? "Read" : "Planned"}
                </span>
              </div>
              <h3>{l.name}</h3>
              <p>{l.blurb}</p>
            </>
          );
          return isWritten ? (
            <Link key={l.slug} href={`/learn/${l.slug}`} className={cards.card}>
              {inner}
            </Link>
          ) : (
            <div key={l.slug} className={`${cards.card} ${cards.dim}`}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
