import AccountClient from "@/components/AccountClient";
import cards from "@/components/Cards.module.css";

export const metadata = {
  title: "Account",
  description: "Sign in to sync your practice across devices. Free and optional.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <section className={cards.wrap}>
      <div className={cards.header}>
        <div className={cards.eyebrow}>Account · free and optional</div>
        <h1 className={cards.h1}>Your account</h1>
        <p className={cards.lede}>
          Everything on Fretwork works without an account. Signing in just keeps
          your streak, saved list, and settings in sync across your devices.
        </p>
      </div>
      <AccountClient />
    </section>
  );
}
