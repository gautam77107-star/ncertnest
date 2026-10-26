import { redirect } from "next/navigation";
import { isAdmin, getAdminStats } from "@/lib/data";
import Link from "next/link";

export default async function AdminDashboard() {
  if (!(await isAdmin())) redirect("/admin/login");
  const stats = await getAdminStats();
  const cards = stats
    ? [
        { label: "Classes", value: stats.classes },
        { label: "Subjects", value: stats.subjects },
        { label: "Chapters", value: stats.chapters },
        { label: "Published", value: stats.publishedChapters },
        { label: "Drafts", value: stats.draftChapters },
        { label: "Videos", value: stats.videos },
        { label: "Chapters with videos", value: stats.chaptersWithVideos },
        { label: "Chapters without videos", value: stats.chaptersWithoutVideos },
        { label: "Resources/PDFs", value: stats.resources },
      ]
    : [];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="border rounded p-4">
            <p className="text-sm text-zinc-500">{c.label}</p>
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-zinc-500">
        Manage content via Classes, Subjects, and Chapters in the sidebar.
      </p>
      <div className="mt-4 flex gap-3">
        <Link href="/admin/classes" className="text-blue-600">Classes</Link>
        <Link href="/admin/subjects" className="text-blue-600">Subjects</Link>
        <Link href="/admin/chapters" className="text-blue-600">Chapters</Link>
      </div>
    </div>
  );
}
