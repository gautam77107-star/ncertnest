import { redirect } from "next/navigation";
import { isAdmin, getClasses, getSubjects } from "@/lib/data";
import { createSubject, updateSubject, deleteSubject } from "../actions";

export default async function AdminSubjects() {
  if (!(await isAdmin())) redirect("/admin/login");
  const classes = await getClasses();
  const subjectsByClass = await Promise.all(
    classes.map(async (c) => ({ class: c, subjects: await getSubjects(c.slug) }))
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>

      <form action={createSubject} className="border rounded p-4 mb-6 grid sm:grid-cols-5 gap-3">
        <select name="class_id" className="border rounded px-3 py-2" required>
          <option value="">Select class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input name="name" placeholder="Subject name" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="Slug" className="border rounded px-3 py-2" required />
        <input name="display_order" type="number" placeholder="Order" className="border rounded px-3 py-2" />
        <input name="description" placeholder="Description" className="border rounded px-3 py-2" />
        <button className="bg-blue-600 text-white rounded px-4 py-2 sm:col-span-5">Add Subject</button>
      </form>

      {subjectsByClass.map(({ class: c, subjects }) => (
        <div key={c.id} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{c.name}</h2>
          {subjects.length === 0 && <p className="text-zinc-500 text-sm">No subjects.</p>}
          <ul className="space-y-2">
            {subjects.map((s) => (
              <li key={s.id} className="border rounded p-3">
                <form action={updateSubject} className="grid sm:grid-cols-5 gap-2 items-center">
                  <input type="hidden" name="id" value={s.id} />
                  <input name="name" defaultValue={s.name} className="border rounded px-2 py-1" />
                  <input name="slug" defaultValue={s.slug} className="border rounded px-2 py-1" />
                  <input name="display_order" type="number" defaultValue={s.display_order} className="border rounded px-2 py-1" />
                  <input name="description" defaultValue={s.description ?? ""} className="border rounded px-2 py-1" />
                  <div className="flex gap-2">
                    <button className="text-blue-600 text-sm">Save</button>
                  </div>
                </form>
                <form action={deleteSubject} className="mt-1">
                  <input type="hidden" name="id" value={s.id} />
                  <button className="text-red-600 text-sm">Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
