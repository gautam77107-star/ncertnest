import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject, getChapters, getVideos, getQuestions, getResources } from "@/lib/data";
import { BookOpen, ChevronRight, FileText, Video, HelpCircle, Layers } from "lucide-react";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subject: string }>;
}) {
  const { classSlug, subject } = await params;
  const slug = classSlug.replace(/^class-/, "");
  const ctx = await getSubject(slug, subject);
  if (!ctx) notFound();
  const chapters = await getChapters(slug, subject);

  const chapterData = await Promise.all(
    chapters.map(async (ch) => {
      const [videos, questions, resources] = await Promise.all([
        getVideos(ch.id),
        getQuestions(ch.id),
        getResources(ch.id),
      ]);
      return {
        chapter: ch,
        hasNotes: !!ch.notes_content,
        hasVideos: videos.filter((v) => v.status === "published").length > 0,
        hasSolutions: questions.filter((q) => q.question_type === "ncert").length > 0,
        hasPdfs: resources.length > 0,
      };
    })
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--muted)] mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
        <span>/</span>
        <Link href={`/class-${slug}`} className="hover:text-[var(--primary)]">{ctx.class.name}</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{ctx.subject.name}</span>
      </nav>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 md:p-10 mb-8 shadow-xl">
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative">
          <p className="text-indigo-100 text-sm mb-1">{ctx.class.name}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{ctx.subject.name}</h1>
          {ctx.subject.description && <p className="text-indigo-100 mt-2 max-w-2xl">{ctx.subject.description}</p>}
          <div className="mt-4 inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full text-sm">
            <Layers className="w-4 h-4" /> {chapters.length} chapters
          </div>
        </div>
      </div>

      <h2 className="section-title !text-2xl mb-4">Chapters</h2>
      {chapters.length === 0 ? (
        <p className="text-[var(--muted)]">No chapters published yet.</p>
      ) : (
        <ul className="space-y-3">
          {chapterData.map(({ chapter: ch, hasNotes, hasVideos, hasSolutions, hasPdfs }) => (
            <li key={ch.id} className="card-hover bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm hover:border-[var(--primary)]">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <Link
                  href={`/class-${slug}/${subject}/${ch.slug}`}
                  className="font-semibold text-lg hover:text-[var(--primary)] flex items-center gap-2 group"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm">
                    {ch.chapter_number}
                  </span>
                  Chapter {ch.chapter_number}: {ch.title}
                  <ChevronRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition" />
                </Link>
                <div className="flex gap-1.5 text-xs">
                  {hasNotes && <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"><FileText className="w-3 h-3" />Notes</span>}
                  {hasSolutions && <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"><HelpCircle className="w-3 h-3" />Solutions</span>}
                  {hasVideos && <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"><Video className="w-3 h-3" />Video</span>}
                  {hasPdfs && <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"><BookOpen className="w-3 h-3" />PDF</span>}
                </div>
              </div>
              {ch.description && <p className="text-sm text-[var(--muted)] mt-2 ml-11">{ch.description}</p>}
              {ch.status !== "published" && (
                <p className="text-xs text-[var(--muted)] mt-2 ml-11">Status: {ch.status} (not public)</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ classSlug: string; subject: string }> }) {
  const { classSlug, subject } = await params;
  const slug = classSlug.replace(/^class-/, "");
  const ctx = await getSubject(slug, subject);
  return {
    title: ctx ? `${ctx.subject.name} - ${ctx.class.name}` : "Subject",
    description: ctx?.subject.description ?? "NCERT study materials",
  };
}
