import Link from "next/link";
import { notFound } from "next/navigation";
import { getClassBySlug, getSubjects, getChapters } from "@/lib/data";
import { BookOpen, Layers, Clock, ArrowRight, Sparkles } from "lucide-react";

const subjectColors = ["from-indigo-500 to-blue-500", "from-purple-500 to-indigo-500", "from-pink-500 to-rose-500", "from-amber-500 to-orange-500", "from-emerald-500 to-teal-500", "from-cyan-500 to-blue-500"];

export default async function ClassPage({ params }: { params: Promise<{ classSlug: string }> }) {
  const { classSlug } = await params;
  const slug = classSlug.replace(/^class-/, "");
  const cls = await getClassBySlug(slug);
  if (!cls) notFound();
  const subjects = await getSubjects(slug);

  let totalChapters = 0;
  const recentlyUpdated: { subject: string; chapter: any }[] = [];
  for (const s of subjects) {
    const chs = await getChapters(slug, s.slug);
    const published = chs.filter((c) => c.status === "published");
    totalChapters += published.length;
    for (const c of published) {
      recentlyUpdated.push({ subject: s.name, chapter: c });
    }
  }
  recentlyUpdated.sort((a, b) => new Date(b.chapter.updated_at).getTime() - new Date(a.chapter.updated_at).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--muted)] mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{cls.name}</span>
      </nav>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-8 md:p-12 mb-10 shadow-xl">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
            <Sparkles className="w-4 h-4" /> {cls.name}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{cls.name}</h1>
          {cls.description && <p className="text-indigo-100 mt-3 max-w-2xl text-lg">{cls.description}</p>}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full"><Layers className="w-4 h-4" /> {subjects.length} subjects</span>
            <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full"><BookOpen className="w-4 h-4" /> {totalChapters} chapters</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="section-eyebrow mb-1">Subjects</p>
          <h2 className="section-title !text-2xl md:!text-3xl">Choose a subject</h2>
        </div>
      </div>

      {subjects.length === 0 ? (
        <p className="text-[var(--muted)]">No subjects available yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {subjects.map((s, i) => (
            <Link
              key={s.id}
              href={`/class-${slug}/${s.slug}`}
              className="card-hover group bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:border-[var(--primary)]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subjectColors[i % subjectColors.length]} text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-110 transition`}>
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg group-hover:text-[var(--primary)] transition">{s.name}</h3>
                  {s.description && <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{s.description}</p>}
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {recentlyUpdated.length > 0 && (
        <section className="mt-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="section-eyebrow mb-1">Fresh content</p>
              <h2 className="section-title !text-2xl md:!text-3xl">Recently updated chapters</h2>
            </div>
          </div>
          <ul className="space-y-2">
            {recentlyUpdated.slice(0, 8).map(({ subject, chapter }) => (
              <li key={chapter.id} className="card-hover bg-white border border-[var(--border)] rounded-xl p-4 flex justify-between items-center gap-3">
                <Link
                  href={`/class-${slug}/${subjects.find((s) => s.name === subject)?.slug}/${chapter.slug}`}
                  className="text-[var(--primary)] hover:underline font-medium flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  {subject} · Chapter {chapter.chapter_number}: {chapter.title}
                </Link>
                <span className="text-xs text-[var(--muted)] flex items-center gap-1 shrink-0">
                  <Clock className="w-3.5 h-3.5" /> {new Date(chapter.updated_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ classSlug: string }> }) {
  const { classSlug } = await params;
  const slug = classSlug.replace(/^class-/, "");
  const cls = await getClassBySlug(slug);
  return {
    title: cls ? `${cls.name}` : "Class",
    description: cls?.description ?? "NCERT study materials",
  };
}
