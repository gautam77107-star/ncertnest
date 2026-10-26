import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin, getClasses, getSubjects, getChapters } from "@/lib/data";
import { createChapter } from "../actions";

export default async function AdminChapters() {
  if (!(await isAdmin())) redirect("/admin/login");
  const classes = await getClasses();
  const tree = await Promise.all(
    classes.map(async (c) => {
      const subjects = await getSubjects(c.slug);
      const subjectChapters = await Promise.all(
        subjects.map(async (s) => ({ subject: s, chapters: await getChapters(c.slug, s.slug) }))
      );
      return { class: c, subjectChapters };
    })
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chapters</h1>

      <form action={createChapter} className="border rounded p-4 mb-6 grid sm:grid-cols-4 gap-3">
        <select name="subject_id" className="border rounded px-3 py-2" required>
          <option value="">Select subject</option>
          {tree.map(({ class: c, subjectChapters }) =>
            subjectChapters.map(({ subject: s }) => (
              <option key={s.id} value={s.id}>
                {c.name} - {s.name}
              </option>
            ))
          )}
        </select>
        <input name="chapter_number" type="number" placeholder="Chapter #" className="border rounded px-3 py-2" required />
        <input name="title" placeholder="Title" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="Slug" className="border rounded px-3 py-2" required />
        <input name="description" placeholder="Description" className="border rounded px-3 py-2 sm:col-span-2" />
        <select name="status" className="border rounded px-3 py-2">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button className="bg-blue-600 text-white rounded px-4 py-2 sm:col-span-4">Add Chapter</button>
      </form>

      {tree.map(({ class: c, subjectChapters }) => (
        <div key={c.id} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{c.name}</h2>
          {subjectChapters.map(({ subject: s, chapters }) => (
            <div key={s.id} className="mb-3 ml-2">
              <h3 className="font-medium text-zinc-700 mb-1">{s.name}</h3>
              {chapters.length === 0 && <p className="text-zinc-400 text-sm">No chapters.</p>}
              <ul className="space-y-1">
                {chapters.map((ch) => (
                  <li key={ch.id} className="flex items-center gap-3 text-sm">
                    <span className="text-zinc-400">Ch {ch.chapter_number}</span>
                    <Link href={`/admin/chapters/${ch.id}`} className="text-blue-600 hover:underline">
                      {ch.title}
                    </Link>
                    <span className="text-xs text-zinc-400">({ch.status})</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
