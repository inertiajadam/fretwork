"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  snapshotAll,
  applyAll,
  subscribe,
  readJSON,
  removeKey,
  writeJSON,
} from "@/lib/prefs";

/* Optional account layer. When Supabase is configured, signing in syncs the
   local-first data (the whole "fw:" namespace) to the cloud so it follows you
   across devices. When it is not configured, this is an inert pass-through and
   everything keeps working locally. */

const AuthContext = createContext({
  enabled: false,
  user: null,
  ready: true,
});

export function AuthProvider({ children }) {
  const supabase = getSupabase();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const pushTimer = useRef(null);

  const pushState = useCallback(
    async (u) => {
      const who = u || user;
      if (!supabase || !who) return;
      const data = snapshotAll();
      await supabase
        .from("user_state")
        .upsert({ user_id: who.id, data, updated_at: new Date().toISOString() });
    },
    [supabase, user]
  );

  const syncOnLogin = useCallback(
    async (u) => {
      if (!supabase || !u) return;
      const { data, error } = await supabase
        .from("user_state")
        .select("data")
        .eq("user_id", u.id)
        .maybeSingle();
      if (!error && data && data.data && Object.keys(data.data).length > 0) {
        // Cloud has data: adopt it, then reload so every provider re-reads.
        applyAll(data.data);
        window.location.reload();
      } else {
        // First sign-in on this account: seed the cloud from local data.
        await pushState(u);
      }
    },
    [supabase, pushState]
  );

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN" && session?.user) {
        // Apply a marketing opt-in captured before an OAuth redirect.
        if (readJSON("pendingOptIn", false)) {
          supabase.auth
            .updateUser({ data: { marketing_opt_in: true } })
            .catch(() => {});
          removeKey("pendingOptIn");
        }
        syncOnLogin(session.user);
      }
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase, syncOnLogin]);

  // While signed in, push local changes up (debounced).
  useEffect(() => {
    if (!supabase || !user) return;
    const unsub = subscribe(() => {
      clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => pushState(), 1200);
    });
    return () => {
      unsub();
      clearTimeout(pushTimer.current);
    };
  }, [supabase, user, pushState]);

  const value = {
    enabled: isSupabaseConfigured,
    ready,
    user,
    signInWithEmail: (email, optIn = false) =>
      supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
          // Persists to the created user's metadata regardless of device.
          data: { marketing_opt_in: !!optIn },
        },
      }),
    signInWithGoogle: (optIn = false) => {
      // OAuth redirects away, so stash the choice and apply it on return.
      writeJSON("pendingOptIn", !!optIn);
      return supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/account` },
      });
    },
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
