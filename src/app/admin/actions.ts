"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/data";

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");
  return supabase;
}

export async function createClass(formData: FormData) {
  const supabase = await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const display_order = Number(formData.get("display_order") || 0);
  if (!name || !slug) throw new Error("Name and slug required");
  const { error } = await supabase.from("classes").insert({ name, slug, description, display_order });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/classes");
}

export async function updateClass(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const display_order = Number(formData.get("display_order") || 0);
  const { error } = await supabase.from("classes").update({ name, slug, description, display_order }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/classes");
}

export async function deleteClass(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("classes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/classes");
}

export async function createSubject(formData: FormData) {
  const supabase = await requireAdmin();
  const class_id = String(formData.get("class_id"));
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const display_order = Number(formData.get("display_order") || 0);
  if (!name || !slug || !class_id) throw new Error("Missing fields");
  const { error } = await supabase.from("subjects").insert({ class_id, name, slug, description, display_order });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/subjects`);
}

export async function updateSubject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const display_order = Number(formData.get("display_order") || 0);
  const { error } = await supabase.from("subjects").update({ name, slug, description, display_order }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/subjects");
}

export async function deleteSubject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("subjects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/subjects");
}

export async function createChapter(formData: FormData) {
  const supabase = await requireAdmin();
  const subject_id = String(formData.get("subject_id"));
  const chapter_number = Number(formData.get("chapter_number") || 1);
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const learning_objectives = String(formData.get("learning_objectives") || "").trim() || null;
  const notes_content = String(formData.get("notes_content") || "").trim() || null;
  const status = String(formData.get("status") || "draft");
  const seo_title = String(formData.get("seo_title") || "").trim() || null;
  const seo_description = String(formData.get("seo_description") || "").trim() || null;
  const estimated_study_time = formData.get("estimated_study_time") ? Number(formData.get("estimated_study_time")) : null;
  const source_reference = String(formData.get("source_reference") || "").trim() || null;
  const textbook_edition = String(formData.get("textbook_edition") || "").trim() || null;
  const academic_session = String(formData.get("academic_session") || "").trim() || null;
  if (!title || !slug || !subject_id) throw new Error("Missing fields");
  const published_at = status === "published" ? new Date().toISOString() : null;
  const { error } = await supabase.from("chapters").insert({
    subject_id, chapter_number, title, slug, description, learning_objectives, notes_content, status, seo_title, seo_description, estimated_study_time, source_reference, textbook_edition, academic_session, published_at,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

export async function updateChapter(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const chapter_number = Number(formData.get("chapter_number") || 1);
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const learning_objectives = String(formData.get("learning_objectives") || "").trim() || null;
  const notes_content = String(formData.get("notes_content") || "").trim() || null;
  const status = String(formData.get("status") || "draft");
  const seo_title = String(formData.get("seo_title") || "").trim() || null;
  const seo_description = String(formData.get("seo_description") || "").trim() || null;
  const estimated_study_time = formData.get("estimated_study_time") ? Number(formData.get("estimated_study_time")) : null;
  const source_reference = String(formData.get("source_reference") || "").trim() || null;
  const textbook_edition = String(formData.get("textbook_edition") || "").trim() || null;
  const academic_session = String(formData.get("academic_session") || "").trim() || null;
  const published_at = status === "published" ? new Date().toISOString() : null;
  const { error } = await supabase.from("chapters").update({
    chapter_number, title, slug, description, learning_objectives, notes_content, status, seo_title, seo_description, estimated_study_time, source_reference, textbook_edition, academic_session, published_at, updated_at: new Date().toISOString(),
  }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

export async function deleteChapter(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("chapters").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

// Videos
export async function addVideo(formData: FormData) {
  const supabase = await requireAdmin();
  const chapter_id = String(formData.get("chapter_id"));
  const rawUrl = String(formData.get("youtube_url") || "").trim();
  const { extractYouTubeId } = await import("@/lib/youtube");
  const youtube_video_id = extractYouTubeId(rawUrl);
  if (!youtube_video_id) throw new Error("Invalid YouTube URL");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const status = String(formData.get("status") || "draft");
  const display_order = Number(formData.get("display_order") || 0);
  const playlist_url = String(formData.get("playlist_url") || "").trim() || null;
  const { error } = await supabase.from("videos").insert({
    chapter_id, youtube_video_id, title, description, status, display_order, playlist_url,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

export async function deleteVideo(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

// Questions
export async function addQuestion(formData: FormData) {
  const supabase = await requireAdmin();
  const chapter_id = String(formData.get("chapter_id"));
  const question_number = String(formData.get("question_number") || "").trim() || null;
  const question_text = String(formData.get("question_text") || "").trim();
  const answer_content = String(formData.get("answer_content") || "").trim() || null;
  const explanation = String(formData.get("explanation") || "").trim() || null;
  const question_type = String(formData.get("question_type") || "ncert");
  const category = String(formData.get("category") || "").trim() || null;
  const display_order = Number(formData.get("display_order") || 0);
  if (!question_text) throw new Error("Question text required");
  const { error } = await supabase.from("questions").insert({
    chapter_id, question_number, question_text, answer_content, explanation, question_type, category, display_order,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

export async function deleteQuestion(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("questions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

// MCQs
export async function addMcq(formData: FormData) {
  const supabase = await requireAdmin();
  const chapter_id = String(formData.get("chapter_id"));
  const question_text = String(formData.get("question_text") || "").trim();
  const options = [
    String(formData.get("opt0") || "").trim(),
    String(formData.get("opt1") || "").trim(),
    String(formData.get("opt2") || "").trim(),
    String(formData.get("opt3") || "").trim(),
  ].filter(Boolean);
  const correct_option_index = Number(formData.get("correct") || 0);
  const explanation = String(formData.get("explanation") || "").trim() || null;
  const difficulty = String(formData.get("difficulty") || "").trim() || null;
  const topic = String(formData.get("topic") || "").trim() || null;
  const display_order = Number(formData.get("display_order") || 0);
  if (!question_text || options.length < 2) throw new Error("Question and at least 2 options required");
  const { error } = await supabase.from("mcqs").insert({
    chapter_id, question_text, options, correct_option_index, explanation, difficulty, topic, display_order,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

export async function deleteMcq(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("mcqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

// Resources
export async function addResource(formData: FormData) {
  const supabase = await requireAdmin();
  const chapter_id = String(formData.get("chapter_id"));
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const resource_type = String(formData.get("resource_type") || "pdf");
  const storage_path = String(formData.get("storage_path") || "").trim();
  const status = String(formData.get("status") || "published");
  if (!title || !storage_path) throw new Error("Title and URL required");
  const { error } = await supabase.from("resources").insert({
    chapter_id, title, description, resource_type, storage_path, status,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

export async function deleteResource(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

// Mind maps
export async function addMindMap(formData: FormData) {
  const supabase = await requireAdmin();
  const chapter_id = String(formData.get("chapter_id"));
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const image_path = String(formData.get("image_path") || "").trim();
  const alt_text = String(formData.get("alt_text") || "").trim() || null;
  if (!title || !image_path) throw new Error("Title and image URL required");
  const { error } = await supabase.from("mind_maps").insert({
    chapter_id, title, description, image_path, alt_text,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}

export async function deleteMindMap(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("mind_maps").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chapters");
}
