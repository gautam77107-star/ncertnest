import { redirect } from "next/navigation";
import { isAdmin, getCurrentUser } from "@/lib/data";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Layers, FileText, GraduationCap } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const admin = await isAdmin();
  if (!user || !admin) {
    return <>{children}</>;
  }
  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/classes", label: "Classes", icon: GraduationCap },
    { href: "/admin/subjects", label: "Subjects", icon: Layers },
    { href: "/admin/chapters", label: "Chapters", icon: BookOpen },
  ];
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <aside className="w-64 border-r border-[var(--border)] bg-[var(--card)] p-5 space-y-1 hidden md:block">
        <Link href="/admin" className="flex items-center gap-2 font-extrabold text-lg mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          Admin
        </Link>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition">
            <n.icon className="w-4 h-4" /> {n.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
