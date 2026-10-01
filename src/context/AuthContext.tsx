"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  enrolledCourseIds: string[];
  wishlistCourseIds: string[];
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;
  signInWithDemo: () => Promise<void>;
  signOut: () => Promise<void>;
  enrollCourse: (courseId: string) => boolean;
  toggleWishlist: (courseId: string) => boolean;
  removeFromWishlist: (courseId: string) => void;
  updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<void>;
}

const DEMO_USER: AuthUser = {
  id: "demo-user-bytespace-2026",
  email: "designer@bytespace.io",
  user_metadata: {
    full_name: "Alex Designer",
    avatar_url: "/images/hero-student.jpg",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [wishlistCourseIds, setWishlistCourseIds] = useState<string[]>([]);

  // Load local state & Supabase session on mount
  useEffect(() => {
    try {
      const savedEnrolled = localStorage.getItem("bytespace_enrolled");
      if (savedEnrolled) setEnrolledCourseIds(JSON.parse(savedEnrolled));

      const savedWishlist = localStorage.getItem("bytespace_wishlist");
      if (savedWishlist) setWishlistCourseIds(JSON.parse(savedWishlist));

      const savedDemoUser = localStorage.getItem("bytespace_demo_user");
      if (savedDemoUser) {
        setUser(JSON.parse(savedDemoUser));
      }
    } catch (e) {
      console.warn("Error accessing localStorage:", e);
    }

    // Check active Supabase session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            user_metadata: session.user.user_metadata,
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("Supabase session error:", err);
        setIsLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          user_metadata: session.user.user_metadata,
        });
      } else {
        const savedDemo = localStorage.getItem("bytespace_demo_user");
        if (savedDemo) {
          setUser(JSON.parse(savedDemo));
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Save enrolled & wishlist to localStorage
  const enrollCourse = (courseId: string): boolean => {
    if (enrolledCourseIds.includes(courseId)) return false;
    const updated = [...enrolledCourseIds, courseId];
    setEnrolledCourseIds(updated);
    try {
      localStorage.setItem("bytespace_enrolled", JSON.stringify(updated));
    } catch {}
    return true;
  };

  const toggleWishlist = (courseId: string): boolean => {
    let updated: string[];
    let isAdded = false;
    if (wishlistCourseIds.includes(courseId)) {
      updated = wishlistCourseIds.filter((id) => id !== courseId);
    } else {
      updated = [...wishlistCourseIds, courseId];
      isAdded = true;
    }
    setWishlistCourseIds(updated);
    try {
      localStorage.setItem("bytespace_wishlist", JSON.stringify(updated));
    } catch {}
    return isAdded;
  };

  const removeFromWishlist = (courseId: string) => {
    const updated = wishlistCourseIds.filter((id) => id !== courseId);
    setWishlistCourseIds(updated);
    try {
      localStorage.setItem("bytespace_wishlist", JSON.stringify(updated));
    } catch {}
  };

  const updateProfile = async (data: { full_name?: string; avatar_url?: string }) => {
    if (!user) return;
    try {
      if (session) {
        await supabase.auth.updateUser({
          data: {
            full_name: data.full_name,
            avatar_url: data.avatar_url,
          },
        });
      }
      const updatedUser: AuthUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...(data.full_name !== undefined ? { full_name: data.full_name } : {}),
          ...(data.avatar_url !== undefined ? { avatar_url: data.avatar_url } : {}),
        },
      };
      setUser(updatedUser);
      localStorage.setItem("bytespace_demo_user", JSON.stringify(updatedUser));
    } catch (e) {
      console.warn("Could not update profile:", e);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setIsLoading(false);
        return { error };
      }
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          user_metadata: data.user.user_metadata,
        });
      }
      setIsLoading(false);
      return { error: null };
    } catch (err: unknown) {
      setIsLoading(false);
      return { error: err as Error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName?: string
  ) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) {
        setIsLoading(false);
        return { error };
      }
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          user_metadata: data.user.user_metadata,
        });
      }
      setIsLoading(false);
      return { error: null };
    } catch (err: unknown) {
      setIsLoading(false);
      return { error: err as Error };
    }
  };

  const signInWithDemo = async () => {
    setIsLoading(true);
    setUser(DEMO_USER);
    try {
      localStorage.setItem("bytespace_demo_user", JSON.stringify(DEMO_USER));
    } catch {}
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch {}
    setUser(null);
    setSession(null);
    try {
      localStorage.removeItem("bytespace_demo_user");
    } catch {}
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        enrolledCourseIds,
        wishlistCourseIds,
        signIn,
        signUp,
        signInWithDemo,
        signOut,
        enrollCourse,
        toggleWishlist,
        removeFromWishlist,
        updateProfile,
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
