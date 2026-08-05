import Link from "next/link";
import { TOOLS } from "@/lib/site";
import cards from "@/components/Cards.module.css";

export const metadata = {
  title: "Tools",
  description:
    "Ten free interactive guitar tools: tuner, CAGED fretboard explorer, chord library, key bridge, capo calculator, Nashville trainer, ear trainer, metronome, circle of fifths, and progression player.",
};

export default function ToolsIndex() {
  return (
    <section className={cards.wrap}>
      <div className={cards.header}>
        <div className={cards.eyebrow}>Tools · all free, no account</div>
        <h1 className={cards.h1}>The toolkit</h1>
        <p className={cards.lede}>
          Pick a tool. Each one generates everything from music theory and math,
          and links back to the lesson that explains it.
        </p>
      </div>
      <div className={cards.grid}>
        {TOOLS.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className={cards.card}>
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
  );
}
