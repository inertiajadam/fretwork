import Link from "next/link";
import { TOOLS, LEARN } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { websiteSchema, organizationSchema } from "@/lib/schema";
import cards from "@/components/Cards.module.css";
import styles from "./page.module.css";

export default function Home() {
  const built = TOOLS.filter((t) => t.status === "built").length;

  return (
    <div>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={organizationSchema()} />
      <section className={styles.hero}>
        <div className={cards.eyebrow}>
          Free forever · {built} interactive tools live
        </div>
        <h1 className={styles.heroTitle}>
          Everything on the neck,
          <br />
          explained by hand.
        </h1>
        <p className={styles.heroLede}>
          Interactive tools and plain-language lessons for guitarists who want to
          understand what they're playing. No paywalls, no accounts required.
        </p>
        <div className={styles.heroActions}>
          <Link href="/tools" className={styles.primaryBtn}>
            Browse the tools
          </Link>
          <Link href="/learn" className={styles.secondaryBtn}>
            Start learning
          </Link>
        </div>
      </section>

      <section className={cards.wrap}>
        <div className={cards.header}>
          <div className={cards.eyebrow}>Tools</div>
          <p className={cards.lede}>
            Every tool generates its content from music theory and math, so what
            you see is always correct and always original.
          </p>
        </div>
        <div className={cards.grid}>
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className={cards.card}
            >
              <div className={cards.cardTop}>
                <span className={cards.tag}>{t.tag}</span>
                <span className={`${cards.status} ${cards.built}`}>Live</span>
              </div>
              <h3>{t.name}</h3>
              <p>{t.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={cards.wrap}>
        <div className={cards.header}>
          <div className={cards.eyebrow}>Learn</div>
          <p className={cards.lede}>
            Every lesson is written around a tool and links straight to it.
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
              <Link
                key={l.slug}
                href={`/learn/${l.slug}`}
                className={cards.card}
              >
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
    </div>
  );
}
