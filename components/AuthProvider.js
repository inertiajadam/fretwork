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
   everything keeps working locally.

   Note: the sync callbacks read the current user from a ref, not from state,
   so they keep a stable identity. Depending on the `user` state here would make
   the auth effect re-run every time the session object changes and loop. */

const AuthContext = createContext({
  enabled: false,
  user: null,
  ready: true,
});

export function AuthProvider({ children }) {
  const supabase = getSupabase();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const userRef = useRef(null);
  const pushTimer = useRef(null);
  const syncedRef = useRef(false);

  const setCurrentUser = useCallback((u) => {
    userRef.current = u;
    setUser(u);
  }, []);

  const pushState = useCallback(async () => {
    const who = userRef.current;
    if (!supabase || !who) return;
    try {
      const data = snapshotAll();
      await supabase
        .from("user_state")
        .upsert({ user_id: who.id, data, updated_at: new Date().toISOString() });
    } catch {
      /* offline or table missing; keep working locally */
    }
  }, [supabase]);

  const syncOnLogin = useCallback(
    async (u) => {
      if (!supabase || !u || syncedRef.current) return;
      syncedRef.current = true; // run once per page load
      try {
        const { data, error } = await supabase
          .from("user_state")
          .select("data")
          .eq("user_id", u.id)
          .maybeSingle();
        const cloud =
          !error && data && data.data && Object.keys(data.data).length > 0
            ? data.data
            : null;
        if (cloud) {
          applyAll(cloud);
          // Reflect synced data once. The sessionStorage guard prevents an
          // extra reload if SIGNED_IN fires again after the reload.
          if (
            typeof window !== "undefined" &&
            !window.sessionStorage.getItem("fw_synced")
          ) {
            window.sessionStorage.setItem("fw_synced", "1");
            window.location.reload();
          }
        } else {
          // First sign-in on this account: seed the cloud from local data.
          await pushState();
        }
      } catch {
        /* ignore sync errors; local-first still works */
      }
    },
    [supabase, pushState]
  );

  // Runs once (all deps are stable): track the session and sync on sign-in.
  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setCurrentUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
      if (event === "SIGNED_IN" && session?.user) {
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
  }, [supabase, syncOnLogin, setCurrentUser]);

  // Push local changes up (debounced). pushState no-ops when not signed in.
  useEffect(() => {
    if (!supabase) return;
    const unsub = subscribe(() => {
      clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => pushState(), 1200);
    });
    return () => {
      unsub();
      clearTimeout(pushTimer.current);
    };
  }, [supabase, pushState]);

  const value = {
    enabled: isSupabaseConfigured,
    ready,
    user,
    signInWithEmail: (email, optIn = false) =>
      supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
          data: { marketing_opt_in: !!optIn },
        },
      }),
    signInWithGoogle: (optIn = false) => {
      writeJSON("pendingOptIn", !!optIn);
      return supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/account` },
      });
    },
    signOut: () => {
      try {
        window.sessionStorage.removeItem("fw_synced");
      } catch {
        /* ignore */
      }
      syncedRef.current = false;
      return supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
