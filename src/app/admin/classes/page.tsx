import { redirect } from "next/navigation";
import { isAdmin, getClasses } from "@/lib/data";
import { createClass, updateClass, deleteClass } from "../actions";

export default async function AdminClasses() {
  if (!(await isAdmin())) redirect("/admin/login");
  const classes = await getClasses();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Classes</h1>

      <form action={createClass} className="border rounded p-4 mb-6 grid sm:grid-cols-4 gap-3">
        <input name="name" placeholder="Name (e.g. Class 10)" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="Slug (e.g. 10)" className="border rounded px-3 py-2" required />
        <input name="display_order" type="number" placeholder="Order" className="border rounded px-3 py-2" />
        <input name="description" placeholder="Description" className="border rounded px-3 py-2" />
        <button className="bg-blue-600 text-white rounded px-4 py-2 sm:col-span-4">Add Class</button>
      </form>

      <ul className="space-y-3">
        {classes.map((c) => (
          <li key={c.id} className="border rounded p-4">
            <form action={updateClass} className="grid sm:grid-cols-5 gap-2 items-center">
              <input type="hidden" name="id" value={c.id} />
              <input name="name" defaultValue={c.name} className="border rounded px-2 py-1" />
              <input name="slug" defaultValue={c.slug} className="border rounded px-2 py-1" />
              <input name="display_order" type="number" defaultValue={c.display_order} className="border rounded px-2 py-1" />
              <input name="description" defaultValue={c.description ?? ""} className="border rounded px-2 py-1" />
              <div className="flex gap-2">
                <button className="text-blue-600 text-sm">Save</button>
              </div>
            </form>
            <form action={deleteClass} className="mt-2">
              <input type="hidden" name="id" value={c.id} />
              <button className="text-red-600 text-sm">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
