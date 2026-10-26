import { createClient } from "./supabase/server";
import type { Class, Subject, Chapter, Video, Question, Mcq, Resource, MindMap } from "../types";
import {
  demoClasses,
  getDemoClassBySlug,
  getDemoSubjects,
  getDemoSubject,
  getDemoChapters,
  getDemoChapter,
  getDemoQuestions,
  getDemoMcqs,
  getDemoChapterById,
  searchDemoContent,
} from "./fallback";

export async function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export async function getClasses(): Promise<Class[]> {
  const supabase = await createClient();
  if (!supabase) return demoClasses;
  const { data, error } = await supabase.from("classes").select("*").order("display_order");
  if (error || !data) return demoClasses;
  return data as Class[];
}

export async function getClassBySlug(slug: string): Promise<Class | null> {
  const cls = demoClasses.find((c) => c.slug === slug);
  if (cls) return cls;
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.from("classes").select("*").eq("slug", slug).maybeSingle();
  return (data as Class) ?? null;
}

export async function getSubjects(classSlug: string): Promise<(Subject & { class: Class })[]> {
  const cls = await getClassBySlug(classSlug);
  if (!cls) return [];
  const supabase = await createClient();
  if (!supabase) return getDemoSubjects(classSlug);
  const { data } = await supabase
    .from("subjects")
    .select("*")
    .eq("class_id", cls.id)
    .order("display_order");
  if (!data) return [];
  return data.map((s) => ({ ...(s as Subject), class: cls }));
}

export async function getSubject(classSlug: string, subjectSlug: string) {
  const cls = await getClassBySlug(classSlug);
  if (!cls) return null;
  const supabase = await createClient();
  if (!supabase) return getDemoSubject(classSlug, subjectSlug);
  const { data } = await supabase
    .from("subjects")
    .select("*")
    .eq("class_id", cls.id)
    .eq("slug", subjectSlug)
    .maybeSingle();
  if (!data) return null;
  return { class: cls, subject: data as Subject };
}

export async function getChapters(classSlug: string, subjectSlug: string): Promise<Chapter[]> {
  const ctx = await getSubject(classSlug, subjectSlug);
  if (!ctx) return [];
  const supabase = await createClient();
  if (!supabase) return getDemoChapters(classSlug, subjectSlug);
  const { data } = await supabase
    .from("chapters")
    .select("*")
    .eq("subject_id", ctx.subject.id)
    .order("chapter_number");
  if (!data) return [];
  return data as Chapter[];
}

export async function getPublishedChapters(classSlug: string, subjectSlug: string): Promise<Chapter[]> {
  const chapters = await getChapters(classSlug, subjectSlug);
  return chapters.filter((c) => c.status === "published");
}

export async function getChapter(classSlug: string, subjectSlug: string, chapterSlug: string) {
  const ctx = await getSubject(classSlug, subjectSlug);
  if (!ctx) return null;
  const supabase = await createClient();
  if (!supabase) return getDemoChapter(classSlug, subjectSlug, chapterSlug);
  const { data } = await supabase
    .from("chapters")
    .select("*")
    .eq("subject_id", ctx.subject.id)
    .eq("slug", chapterSlug)
    .maybeSingle();
  if (!data) return null;
  return { class: ctx.class, subject: ctx.subject, chapter: data as Chapter };
}

export async function getVideos(chapterId: string): Promise<Video[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("videos")
    .select("*")
    .eq("chapter_id", chapterId)
    .order("display_order");
  return (data as Video[]) ?? [];
}

export async function getQuestions(chapterId: string): Promise<Question[]> {
  const supabase = await createClient();
  if (!supabase) return getDemoQuestions(chapterId);
  const { data } = await supabase
    .from("questions")
    .select("*")
    .eq("chapter_id", chapterId)
    .order("display_order");
  return (data as Question[]) ?? [];
}

export async function getMcqs(chapterId: string): Promise<Mcq[]> {
  const supabase = await createClient();
  if (!supabase) return getDemoMcqs(chapterId);
  const { data } = await supabase
    .from("mcqs")
    .select("*")
    .eq("chapter_id", chapterId)
    .order("display_order");
  return (data as Mcq[]) ?? [];
}

export async function getResources(chapterId: string): Promise<Resource[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("resources")
    .select("*")
    .eq("chapter_id", chapterId)
    .order("created_at");
  return (data as Resource[]) ?? [];
}

export async function getMindMaps(chapterId: string): Promise<MindMap[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("mind_maps")
    .select("*")
    .eq("chapter_id", chapterId)
    .order("created_at");
  return (data as MindMap[]) ?? [];
}

export async function searchContent(query: string) {
  const supabase = await createClient();
  if (!supabase) return searchDemoContent(query);
  const q = query.trim();
  if (!q) return [];
  const results: { type: string; title: string; description?: string | null; url: string }[] = [];

  // Chapters
  const { data: chapters } = await supabase
    .from("chapters")
    .select("id, title, slug, description, status, subject_id")
    .eq("status", "published")
    .or(`title.ilike.%${q}%,description.ilike.%${q}%`)
    .limit(20);
  if (chapters) {
    for (const ch of chapters) {
      const { data: subj } = await supabase.from("subjects").select("slug, class_id").eq("id", ch.subject_id).maybeSingle();
      if (subj) {
        const { data: cls } = await supabase.from("classes").select("slug").eq("id", subj.class_id).maybeSingle();
        if (cls) {
          results.push({
            type: "chapter",
            title: ch.title,
            description: ch.description,
            url: `/class-${cls.slug}/${subj.slug}/${ch.slug}`,
          });
        }
      }
    }
  }

  // Subjects
  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, slug, description, class_id")
    .ilike("name", `%${q}%`)
    .limit(10);
  if (subjects) {
    for (const s of subjects) {
      const { data: cls } = await supabase.from("classes").select("slug").eq("id", s.class_id).maybeSingle();
      if (cls) {
        results.push({
          type: "subject",
          title: s.name,
          description: s.description,
          url: `/class-${cls.slug}/${s.slug}`,
        });
      }
    }
  }

  // Questions
  const { data: questions } = await supabase
    .from("questions")
    .select("id, question_text, chapter_id")
    .ilike("question_text", `%${q}%`)
    .limit(10);
  if (questions) {
    for (const qu of questions) {
      const { data: ch } = await supabase.from("chapters").select("title, slug, subject_id, status").eq("id", qu.chapter_id).maybeSingle();
      if (ch && ch.status === "published") {
        const { data: subj } = await supabase.from("subjects").select("slug, class_id").eq("id", ch.subject_id).maybeSingle();
        if (subj) {
          const { data: cls } = await supabase.from("classes").select("slug").eq("id", subj.class_id).maybeSingle();
          if (cls) {
            results.push({
              type: "question",
              title: qu.question_text.slice(0, 80),
              description: ch.title,
              url: `/class-${cls.slug}/${subj.slug}/${ch.slug}`,
            });
          }
        }
      }
    }
  }

  return results;
}

export async function getChapterById(id: string) {
  const supabase = await createClient();
  if (!supabase) return getDemoChapterById(id);
  const { data: ch } = await supabase.from("chapters").select("*").eq("id", id).maybeSingle();
  if (!ch) return null;
  const { data: subj } = await supabase.from("subjects").select("*").eq("id", ch.subject_id).maybeSingle();
  if (!subj) return null;
  const { data: cls } = await supabase.from("classes").select("*").eq("id", subj.class_id).maybeSingle();
  if (!cls) return null;
  return { class: cls as Class, subject: subj as Subject, chapter: ch as Chapter };
}
export async function getCurrentUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function getAdminStats() {
  const supabase = await createClient();
  if (!supabase) return null;
  const [classes, subjects, chapters, videos, resources] = await Promise.all([
    supabase.from("classes").select("id", { count: "exact", head: true }),
    supabase.from("subjects").select("id", { count: "exact", head: true }),
    supabase.from("chapters").select("id, status", { count: "exact" }),
    supabase.from("videos").select("id, status, chapter_id", { count: "exact" }),
    supabase.from("resources").select("id", { count: "exact", head: true }),
  ]);
  const allChapters = (chapters.data as { status: string }[]) ?? [];
  const publishedChapters = allChapters.filter((c) => c.status === "published").length;
  const draftChapters = allChapters.filter((c) => c.status === "draft").length;
  const allVideos = (videos.data as { status: string }[]) ?? [];
  const publishedVideos = allVideos.filter((v) => v.status === "published").length;
  const chaptersWithVideos = new Set(allVideos.map((v) => (v as any).chapter_id)).size;
  return {
    classes: classes.count ?? 0,
    subjects: subjects.count ?? 0,
    chapters: allChapters.length,
    publishedChapters,
    draftChapters,
    videos: allVideos.length,
    publishedVideos,
    chaptersWithVideos,
    chaptersWithoutVideos: allChapters.length - chaptersWithVideos,
    resources: resources.count ?? 0,
  };
}
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return false;
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  return data?.role === "admin";
}