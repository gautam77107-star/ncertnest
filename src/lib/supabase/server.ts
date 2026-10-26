"use client";

import { createClient, type SupabaseClient } from "@supabase/ssr";
import { cookies } from "next/navigation";

export function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      sessionToken: typeof window !== "undefined" ? cookies().get("sb:token")?.value : undefined,
    },
  });
}