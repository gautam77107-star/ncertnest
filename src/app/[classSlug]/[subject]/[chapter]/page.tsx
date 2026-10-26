import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import YouTubePlayer from "@/components/YouTubePlayer";
import Quiz from "@/components/Quiz";
import QuestionList from "@/components/QuestionList";
import { getChapter, getVideos, getQuestions, getMcqs, getResources, getMindMaps, getPublishedChapters } from "@/lib/data";
import { BookOpen, ChevronLeft, ChevronRight, Clock, FileText, Video, HelpCircle, Download, Brain, Layers } from "lucide-react";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ classSlug: string; subject: string; chapter: string }>;
}) {
  const { classSlug, subject, chapter } = await params;
  const slug = classSlug.replace(/^class-/, "");
  const ctx = await getChapter(slug, subject, chapter);
  if (!ctx) notFound();
  const { class: cls, subject: subj, chapter: ch } = ctx;

  if (ch.status !== "published") notFound();

  const [videos, questions, mcqs, resources, mindMaps, siblings] = await Promise.all([
    getVideos(ch.id),
    getQuestions(ch.id),
    getMcqs(ch.id),
    getResources(ch.id),
    getMindMaps(ch.id),
    getPublishedChapters(slug, subject),
  ]);

  const publishedVideos = videos.filter((v) => v.status === "published");
  const sortedSiblings = siblings.sort((a, b) => a.chapter_number - b.chapter_number);
  const idx = sortedSiblings.findIndex((c) => c.id === ch.id);
  const prev = idx > 0 ? sortedSiblings[idx - 1] : null;
  const next = idx >= 0 && idx < sortedSiblings.length - 1 ? sortedSiblings[idx + 1] : null;

  const ncertQs = questions.filter((q) => q.question_type === "ncert");
  const importantQs = questions.filter((q) => q.question_type !== "ncert");

  const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--muted)] mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
        <span>/</span>
        <Link href={`/class-${slug}`} className="hover:text-[var(--primary)]">{cls.name}</Link>
        <span>/</span>
        <Link href={`/class-${slug}/${subject}`} className="hover:text-[var(--primary)]">{subj.name}</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium line-clamp-1">{ch.title}</span>
      </nav>

      <header className="mb-8 bg-white border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-sm">
        <p className="text-sm text-[var(--muted)] flex items-center gap-1.5">
          <Layers className="w-4 h-4" /> {cls.name} · {subj.name} · Chapter {ch.chapter_number}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">{ch.title}</h1>
        {ch.description && <p className="text-[var(--muted)] mt-3 leading-relaxed">{ch.description}</p>}
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Updated {new Date(ch.updated_at).toLocaleDateString()}</span>
          {ch.estimated_study_time && <span>· {ch.estimated_study_time} min read</span>}
        </div>
      </header>

      {/* Video section */}
      <Section title="Video Lecture" icon={Video}>
        {publishedVideos.length === 0 ? (
          <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl flex flex-col items-center justify-center text-[var(--muted)] gap-2">
            <Video className="w-10 h-10 opacity-40" />
            <span>Video lecture coming soon.</span>
          </div>
        ) : (
          <div className="space-y-4">
            {publishedVideos.map((v) => (
              <YouTubePlayer key={v.id} urlOrId={v.youtube_video_id} title={v.title} />
            ))}
          </div>
        )}
      </Section>

      {/* Overview */}
      {(ch.learning_objectives || ch.notes_content) && (
        <Section title="Chapter Overview" icon={BookOpen}>
          {ch.learning_objectives && (
            <div className="mb-4 bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold mb-2 text-[var(--primary)]">Learning Objectives</h3>
              <Markdown content={ch.learning_objectives} />
            </div>
          )}
        </Section>
      )}

      {/* Notes */}
      {ch.notes_content && (
        <Section title="Chapter Notes" icon={FileText}>
          <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm prose">
            <Markdown content={ch.notes_content} />
          </div>
        </Section>
      )}

      {/* NCERT Q&A */}
      {ncertQs.length > 0 && (
        <Section title="NCERT Exercise Solutions" icon={HelpCircle}>
          <div className="space-y-4">
            {ncertQs.map((q) => (
              <div key={q.id} className="bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm">
                <p className="font-semibold mb-2 flex items-start gap-2">
                  <span className="text-[var(--primary)]">{q.question_number ? `Q${q.question_number}.` : "Q."}</span>
                  <span>{q.question_text}</span>
                </p>
                {q.answer_content && <Markdown content={q.answer_content} />}
                {q.explanation && (
                  <div className="mt-3 text-sm text-[var(--muted)] bg-[var(--background)] rounded-xl p-3">
                    <strong className="text-[var(--foreground)]">Explanation:</strong> <Markdown content={q.explanation} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Important questions */}
      {importantQs.length > 0 && (
        <Section title="Important Questions" icon={HelpCircle}>
          <QuestionList questions={importantQs} />
        </Section>
      )}

      {/* MCQs */}
      {mcqs.length > 0 && (
        <Section title="MCQs & Quiz" icon={Brain}>
          <Quiz mcqs={mcqs} />
        </Section>
      )}

      {/* Resources / PDFs */}
      {resources.length > 0 && (
        <Section title="Downloads" icon={Download}>
          <ul className="space-y-2">
            {resources.map((r) => (
              <li key={r.id} className="bg-white border border-[var(--border)] rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <p className="font-medium">{r.title}</p>
                  {r.description && <p className="text-sm text-[var(--muted)]">{r.description}</p>}
                </div>
                <a href={r.storage_path} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2 !px-4 !text-sm">
                  Download
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Mind maps */}
      {mindMaps.length > 0 && (
        <Section title="Mind Maps & Diagrams" icon={Brain}>
          <div className="grid sm:grid-cols-2 gap-4">
            {mindMaps.map((m) => (
              <figure key={m.id} className="bg-white border border-[var(--border)] rounded-2xl p-3 shadow-sm">
                <img src={m.image_path} alt={m.alt_text || m.title} className="w-full rounded-xl" />
                <figcaption className="text-sm mt-2 text-[var(--muted)]">{m.title}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {/* Related chapters */}
      {sortedSiblings.filter((c) => c.id !== ch.id).length > 0 && (
        <Section title="Related Chapters" icon={BookOpen}>
          <ul className="space-y-1.5">
            {sortedSiblings
              .filter((c) => c.id !== ch.id)
              .slice(0, 5)
              .map((c) => (
                <li key={c.id}>
                  <Link href={`/class-${slug}/${subject}/${c.slug}`} className="text-[var(--primary)] hover:underline flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" /> Chapter {c.chapter_number}: {c.title}
                  </Link>
                </li>
              ))}
          </ul>
        </Section>
      )}

      {ch.source_reference && (
        <p className="text-xs text-[var(--muted)] mt-2">
          Source: {ch.source_reference} {ch.textbook_edition ? `(${ch.textbook_edition})` : ""}
        </p>
      )}

      {/* Prev/Next */}
      <nav className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-8 pt-6 border-t border-[var(--border)]">
        {prev ? (
          <Link href={`/class-${slug}/${subject}/${prev.slug}`} className="btn-secondary !justify-start">
            <ChevronLeft className="w-4 h-4" /> Chapter {prev.chapter_number}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/class-${slug}/${subject}/${next.slug}`} className="btn-secondary !justify-end">
            Chapter {next.chapter_number}: {next.title} <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ classSlug: string; subject: string; chapter: string }> }) {
  const { classSlug, subject, chapter } = await params;
  const slug = classSlug.replace(/^class-/, "");
  const ctx = await getChapter(slug, subject, chapter);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${base}/class-${slug}/${subject}/${chapter}`;
  return {
    title: ctx ? `${ctx.chapter.title} - ${ctx.subject.name}` : "Chapter",
    description: ctx?.chapter.seo_description ?? ctx?.chapter.description ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      title: ctx ? `${ctx.chapter.title} - ${ctx.subject.name}` : "Chapter",
      description: ctx?.chapter.seo_description ?? ctx?.chapter.description ?? undefined,
      url,
      type: "article",
    },
  };
}
