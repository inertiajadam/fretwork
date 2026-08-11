import SavedList from "@/components/SavedList";
import ProgressSummary from "@/components/ProgressSummary";
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
        <div className={cards.eyebrow}>Your progress</div>
        <h1 className={cards.h1}>Your practice</h1>
        <p className={cards.lede}>
          Your streak, quiz bests, and saved list, all in one place. It lives in
          this browser now, and will follow you across devices once accounts
          arrive.
        </p>
      </div>
      <ProgressSummary />
      <SavedList />
    </section>
  );
}
