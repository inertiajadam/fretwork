"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import styles from "./AccountClient.module.css";

export default function AccountClient() {
  const { enabled, ready, user, signInWithEmail, signInWithGoogle, signOut } =
    useAuth();
  // Google sign-in only shows once the provider is enabled in Supabase and
  // this flag is set (NEXT_PUBLIC_GOOGLE_AUTH=true), so users never hit the
  // "provider is not enabled" error.
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH === "true";
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!enabled) {
    return (
      <div className={styles.card}>
        <h2>Accounts are on the way</h2>
        <p>
          Sign-in is being set up. In the meantime, everything already works
          without an account: your theme, saved list, streak, and settings are
          all kept in this browser.
        </p>
      </div>
    );
  }

  if (!ready) {
    return <p className={styles.note}>Loading...</p>;
  }

  if (user) {
    return (
      <div className={styles.card}>
        <h2>Signed in</h2>
        <p>
          You are signed in as <strong>{user.email}</strong>. Your streak, saved
          list, and tool settings now sync to this account and follow you across
          devices.
        </p>
        <button className={styles.secondaryBtn} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  const sendLink = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await signInWithEmail(email.trim(), optIn);
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className={styles.card}>
      <h2>Sign in to sync</h2>
      <p className={styles.lede}>
        Free and optional. An account keeps your streak, saved list, and settings
        in sync across your devices. Nothing on the site is locked behind it.
      </p>

      {sent ? (
        <p className={styles.success}>
          Check your email for a sign-in link. You can close this tab; the link
          brings you back signed in.
        </p>
      ) : (
        <>
          <form className={styles.form} onSubmit={sendLink}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className={styles.input}
            />
            <label className={styles.optIn}>
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
              />
              <span>
                Send me occasional guitar tips and new-tool updates by email. You
                can unsubscribe anytime.
              </span>
            </label>
            <button type="submit" className={styles.primaryBtn} disabled={busy}>
              {busy ? "Sending..." : "Email me a sign-in link"}
            </button>
          </form>
          {googleEnabled && (
            <>
              <div className={styles.or}>or</div>
              <button
                className={styles.googleBtn}
                onClick={() => signInWithGoogle(optIn)}
              >
                Continue with Google
              </button>
            </>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
}
