import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin, getChapterById, getVideos, getQuestions, getMcqs, getResources, getMindMaps } from "@/lib/data";
import { updateChapter, deleteChapter, addVideo, deleteVideo, addQuestion, deleteQuestion, addMcq, deleteMcq, addResource, deleteResource, addMindMap, deleteMindMap } from "../../actions";

export default async function AdminChapterEdit({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  const ctx = await getChapterById(id);
  if (!ctx) redirect("/admin/chapters");
  const { class: cls, subject: subj, chapter: ch } = ctx;
  const [videos, questions, mcqs, resources, mindMaps] = await Promise.all([
    getVideos(id),
    getQuestions(id),
    getMcqs(id),
    getResources(id),
    getMindMaps(id),
  ]);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <Link href="/admin/chapters" className="text-sm text-blue-600">â† Back</Link>
        <h1 className="text-2xl font-bold mt-2">Edit: {ch.title}</h1>
        <p className="text-zinc-500 text-sm">{cls.name} Â· {subj.name}</p>
      </div>

      {/* Basic info */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-3">Basic Information</h2>
        <form action={updateChapter} className="space-y-3">
          <input type="hidden" name="id" value={ch.id} />
          <div className="grid sm:grid-cols-2 gap-3">
            <input name="chapter_number" type="number" defaultValue={ch.chapter_number} placeholder="Chapter #" className="border rounded px-3 py-2" required />
            <input name="title" defaultValue={ch.title} placeholder="Title" className="border rounded px-3 py-2" required />
            <input name="slug" defaultValue={ch.slug} placeholder="Slug" className="border rounded px-3 py-2" required />
            <select name="status" defaultValue={ch.status} className="border rounded px-3 py-2">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <textarea name="description" defaultValue={ch.description ?? ""} placeholder="Description" className="w-full border rounded px-3 py-2" rows={2} />
          <textarea name="learning_objectives" defaultValue={ch.learning_objectives ?? ""} placeholder="Learning objectives (markdown)" className="w-full border rounded px-3 py-2" rows={3} />
          <textarea name="notes_content" defaultValue={ch.notes_content ?? ""} placeholder="Notes content (markdown)" className="w-full border rounded px-3 py-2" rows={8} />
          <input name="seo_title" defaultValue={ch.seo_title ?? ""} placeholder="SEO title" className="w-full border rounded px-3 py-2" />
          <input name="seo_description" defaultValue={ch.seo_description ?? ""} placeholder="SEO description" className="w-full border rounded px-3 py-2" />
          <input name="estimated_study_time" type="number" defaultValue={ch.estimated_study_time ?? ""} placeholder="Estimated study time (min)" className="w-full border rounded px-3 py-2" />
          <input name="source_reference" defaultValue={ch.source_reference ?? ""} placeholder="Source reference" className="w-full border rounded px-3 py-2" />
          <input name="textbook_edition" defaultValue={ch.textbook_edition ?? ""} placeholder="Textbook edition" className="w-full border rounded px-3 py-2" />
          <input name="academic_session" defaultValue={ch.academic_session ?? ""} placeholder="Academic session" className="w-full border rounded px-3 py-2" />
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white rounded px-4 py-2">Save</button>
          </div>
        </form>
        <form action={deleteChapter} className="mt-3">
          <input type="hidden" name="id" value={ch.id} />
          <button className="text-red-600 text-sm">Delete chapter</button>
        </form>
      </section>

      {/* Videos */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-3">YouTube Videos</h2>
        <ul className="space-y-2 mb-4">
          {videos.map((v) => (
            <li key={v.id} className="flex items-center justify-between text-sm border rounded p-2">
              <span>{v.title} ({v.status}) - {v.youtube_video_id}</span>
              <form action={deleteVideo}>
                <input type="hidden" name="id" value={v.id} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
        <form action={addVideo} className="space-y-2">
          <input type="hidden" name="chapter_id" value={ch.id} />
          <input name="youtube_url" placeholder="YouTube URL or ID" className="w-full border rounded px-3 py-2" required />
          <input name="title" placeholder="Video title" className="w-full border rounded px-3 py-2" required />
          <textarea name="description" placeholder="Description" className="w-full border rounded px-3 py-2" rows={2} />
          <div className="grid sm:grid-cols-3 gap-2">
            <select name="status" className="border rounded px-3 py-2">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <input name="display_order" type="number" placeholder="Order" className="border rounded px-3 py-2" />
            <input name="playlist_url" placeholder="Playlist URL (optional)" className="border rounded px-3 py-2" />
          </div>
          <button className="bg-blue-600 text-white rounded px-4 py-2">Add Video</button>
        </form>
      </section>

      {/* Questions */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-3">Questions & Solutions</h2>
        <ul className="space-y-2 mb-4">
          {questions.map((q) => (
            <li key={q.id} className="flex items-center justify-between text-sm border rounded p-2">
              <span>{q.question_number ? `Q${q.question_number}. ` : ""}{q.question_text.slice(0, 60)} ({q.question_type})</span>
              <form action={deleteQuestion}>
                <input type="hidden" name="id" value={q.id} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
        <form action={addQuestion} className="space-y-2">
          <input type="hidden" name="chapter_id" value={ch.id} />
          <div className="grid sm:grid-cols-3 gap-2">
            <input name="question_number" placeholder="Q#" className="border rounded px-3 py-2" />
            <select name="question_type" className="border rounded px-3 py-2">
              <option value="ncert">NCERT</option>
              <option value="vsa">VSA</option>
              <option value="sa">SA</option>
              <option value="la">LA</option>
              <option value="application">Application</option>
              <option value="practice">Practice</option>
            </select>
            <input name="display_order" type="number" placeholder="Order" className="border rounded px-3 py-2" />
          </div>
          <textarea name="question_text" placeholder="Question text" className="w-full border rounded px-3 py-2" rows={2} required />
          <textarea name="answer_content" placeholder="Answer (markdown)" className="w-full border rounded px-3 py-2" rows={4} />
          <textarea name="explanation" placeholder="Explanation" className="w-full border rounded px-3 py-2" rows={2} />
          <input name="category" placeholder="Category" className="w-full border rounded px-3 py-2" />
          <button className="bg-blue-600 text-white rounded px-4 py-2">Add Question</button>
        </form>
      </section>

      {/* MCQs */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-3">MCQs</h2>
        <ul className="space-y-2 mb-4">
          {mcqs.map((m) => (
            <li key={m.id} className="flex items-center justify-between text-sm border rounded p-2">
              <span>{m.question_text.slice(0, 60)}</span>
              <form action={deleteMcq}>
                <input type="hidden" name="id" value={m.id} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
        <form action={addMcq} className="space-y-2">
          <input type="hidden" name="chapter_id" value={ch.id} />
          <textarea name="question_text" placeholder="Question text" className="w-full border rounded px-3 py-2" rows={2} required />
          <div className="grid sm:grid-cols-2 gap-2">
            <input name="opt0" placeholder="Option A" className="border rounded px-3 py-2" required />
            <input name="opt1" placeholder="Option B" className="border rounded px-3 py-2" required />
            <input name="opt2" placeholder="Option C" className="border rounded px-3 py-2" />
            <input name="opt3" placeholder="Option D" className="border rounded px-3 py-2" />
          </div>
          <div className="grid sm:grid-cols-3 gap-2">
            <input name="correct" type="number" placeholder="Correct index (0-based)" className="border rounded px-3 py-2" />
            <input name="difficulty" placeholder="Difficulty" className="border rounded px-3 py-2" />
            <input name="topic" placeholder="Topic" className="border rounded px-3 py-2" />
          </div>
          <textarea name="explanation" placeholder="Explanation" className="w-full border rounded px-3 py-2" rows={2} />
          <input name="display_order" type="number" placeholder="Order" className="border rounded px-3 py-2" />
          <button className="bg-blue-600 text-white rounded px-4 py-2">Add MCQ</button>
        </form>
      </section>

      {/* Resources */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-3">PDF / Resources</h2>
        <ul className="space-y-2 mb-4">
          {resources.map((r) => (
            <li key={r.id} className="flex items-center justify-between text-sm border rounded p-2">
              <span>{r.title} ({r.resource_type})</span>
              <form action={deleteResource}>
                <input type="hidden" name="id" value={r.id} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
        <form action={addResource} className="space-y-2">
          <input type="hidden" name="chapter_id" value={ch.id} />
          <input name="title" placeholder="Title" className="w-full border rounded px-3 py-2" required />
          <input name="storage_path" placeholder="File URL" className="w-full border rounded px-3 py-2" required />
          <textarea name="description" placeholder="Description" className="w-full border rounded px-3 py-2" rows={2} />
          <div className="grid sm:grid-cols-2 gap-2">
            <select name="resource_type" className="border rounded px-3 py-2">
              <option value="pdf">PDF</option>
              <option value="note">Note</option>
              <option value="worksheet">Worksheet</option>
              <option value="mindmap">Mind Map</option>
            </select>
            <select name="status" className="border rounded px-3 py-2">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white rounded px-4 py-2">Add Resource</button>
        </form>
      </section>

      {/* Mind maps */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-3">Mind Maps & Diagrams</h2>
        <ul className="space-y-2 mb-4">
          {mindMaps.map((m) => (
            <li key={m.id} className="flex items-center justify-between text-sm border rounded p-2">
              <span>{m.title}</span>
              <form action={deleteMindMap}>
                <input type="hidden" name="id" value={m.id} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
        <form action={addMindMap} className="space-y-2">
          <input type="hidden" name="chapter_id" value={ch.id} />
          <input name="title" placeholder="Title" className="w-full border rounded px-3 py-2" required />
          <input name="image_path" placeholder="Image URL" className="w-full border rounded px-3 py-2" required />
          <textarea name="description" placeholder="Description" className="w-full border rounded px-3 py-2" rows={2} />
          <input name="alt_text" placeholder="Alt text" className="w-full border rounded px-3 py-2" />
          <button className="bg-blue-600 text-white rounded px-4 py-2">Add Mind Map</button>
        </form>
      </section>
    </div>
  );
}
