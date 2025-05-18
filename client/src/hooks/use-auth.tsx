import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

// User types based on schema
export type UserRole = "admin" | "attorney" | "insuranceAgency" | "doctor";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  role?: UserRole;
  isAdmin?: boolean;
}

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  fullName?: string;
  role?: UserRole;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
  login: (data: LoginData) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

async function syncNeonUser(supabaseUser: any) {
  if (!supabaseUser) return null;
  const res = await fetch('/api/sync-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: supabaseUser.email,
      fullName: supabaseUser.user_metadata?.fullName || supabaseUser.user_metadata?.name,
      role: supabaseUser.user_metadata?.role,
    }),
  });
  if (!res.ok) return null;
  return await res.json();
}

// --- BRIDGE SESSION HELPER ---
async function bridgeSession(access_token: string) {
  const resp = await fetch('/api/login-supabase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token }),
    credentials: 'include',
  });
  if (!resp.ok) {
    const msg = await resp.text();
    throw new Error(msg);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Only for initial load
  const [error, setError] = useState<Error | null>(null);
  const [hasChecked, setHasChecked] = useState(false); // Track if initial auth check is done

  useEffect(() => {
    // --- PKCE OAuth: Exchange code for session if present in URL ---
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error("Error exchanging code for session:", error);
        }
        // Remove code from URL and reload
        url.searchParams.delete("code");
        window.location.replace(url.pathname + url.search);
      });
      return; // Don't run session logic until after exchange
    }
    // Handle Supabase OAuth redirect with tokens in hash
    if (window.location.hash.includes("access_token")) {
      console.log("Found access_token in hash, cleaning up URL and waiting for session...");
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    const getSession = async (showLoader = false) => {
      if (showLoader && !hasChecked) setIsLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log("supabase.auth.getUser() result:", user, error);
      if (user) {
        // Bridge session to Express backend
        const sessionResp = await supabase.auth.getSession();
        const access_token = sessionResp.data?.session?.access_token;
        console.log("Session access_token:", access_token);
        if (access_token) {
          console.log('Access token being sent to /api/login-supabase:', access_token);
          try {
            await bridgeSession(access_token);
            console.log("Bridge session to backend successful.");
          } catch (err: any) {
            toast({ title: "Backend login failed", description: err.message, variant: "destructive" });
            setUser(null);
            setIsLoading(false);
            setHasChecked(true);
            return;
          }
        }
        // Sync with NeonDB
        const neonUser = await syncNeonUser(user);
        console.log("NeonDB user after sync:", neonUser);
        setUser(neonUser ? { ...neonUser, id: user.id } : null);
      } else {
        setUser(null);
      }
      setIsLoading(false);
      setHasChecked(true);
      if (error) setError(error as Error);
    };
    getSession(true); // Only show loader on first mount
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("onAuthStateChange event:", event, session);
      getSession(false); // Do not show loader on subsequent auth changes
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // --- Login with email/password ---
  const login = async ({ email, password }: LoginData) => {
    setIsLoading(true);
    setError(null);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error as Error);
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }
    const access_token = data?.session?.access_token;
    if (access_token) {
      console.log('Access token being sent to /api/login-supabase:', access_token);
      try {
        await bridgeSession(access_token);
      } catch (err: any) {
        toast({ title: "Backend login failed", description: err.message, variant: "destructive" });
        setIsLoading(false);
        return;
      }
    }
    toast({ title: "Login successful", description: `Welcome back!` });
    const neonUser = await syncNeonUser(data.user);
    setUser(neonUser ? { ...neonUser, id: data.user.id } : null);
    setIsLoading(false);
  };

  // --- Login with Google ---
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      setError(error as Error);
      toast({ title: "Google login failed", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }
    // After redirect, onAuthStateChange will fire, so bridge there as well
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error as Error);
      toast({ title: "Logout failed", description: error.message, variant: "destructive" });
    } else {
      setUser(null);
      toast({ title: "Logged out", description: "You have been successfully logged out" });
    }
    setIsLoading(false);
  };

  const register = async ({ email, password, fullName, role }: RegisterData) => {
    setIsLoading(true);
    setError(null);
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, role },
    },
  });
    if (error) {
      setError(error as Error);
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }
    // Try to sync with NeonDB
    let neonUser = await syncNeonUser({ email, user_metadata: { fullName, role } });
    if (!neonUser) {
      // If not found, create in NeonDB
      const res = await fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, role }),
      });
      if (res.ok) {
        neonUser = await res.json();
        toast({ title: "Registration successful", description: "Check your email to confirm your account. User added to NeonDB." });
      } else {
        const msg = await res.text();
        toast({ title: "NeonDB user creation failed", description: msg, variant: "destructive" });
      }
    } else {
      toast({ title: "Registration successful", description: "Check your email to confirm your account." });
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAdmin: !!user?.isAdmin,
        login,
        loginWithGoogle,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}