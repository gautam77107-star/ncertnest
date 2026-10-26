"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase not configured.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-white px-4">
      <form onSubmit={handleSubmit} className="bg-white border border-[var(--border)] rounded-3xl p-8 w-full max-w-sm space-y-5 shadow-xl">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="text-sm text-[var(--muted)] mt-1">Sign in to manage content</p>
        </div>
        {error && <p className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">{error}</p>}
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[var(--border)] rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[var(--border)] rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
        </div>
        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
