import SavedList from "@/components/SavedList";
import cards from "@/components/Cards.module.css";

export const metadata = {
  title: "Your practice list",
  description: "The tools and guides you saved to work on.",
  alternates: { canonical: "/saved" },
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return (
    <section className={cards.wrap}>
      <div className={cards.header}>
        <div className={cards.eyebrow}>Your practice list</div>
        <h1 className={cards.h1}>Saved to work on</h1>
        <p className={cards.lede}>
          Everything you saved, in one place. It lives in this browser now, and
          will follow you across devices once accounts arrive.
        </p>
      </div>
      <SavedList />
    </section>
  );
}
