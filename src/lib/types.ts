export type Class = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Subject = {
  id: string;
  class_id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ChapterStatus = "draft" | "published" | "archived";

export type Chapter = {
  id: string;
  subject_id: string;
  chapter_number: number;
  title: string;
  slug: string;
  description: string | null;
  learning_objectives: string | null;
  notes_content: string | null;
  status: ChapterStatus;
  seo_title: string | null;
  seo_description: string | null;
  estimated_study_time: number | null;
  source_reference: string | null;
  textbook_edition: string | null;
  academic_session: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type VideoStatus = "draft" | "published";

export type Video = {
  id: string;
  chapter_id: string;
  youtube_video_id: string;
  title: string;
  description: string | null;
  status: VideoStatus;
  display_order: number;
  playlist_url: string | null;
  created_at: string;
};

export type QuestionType =
  | "ncert"
  | "vsa"
  | "sa"
  | "la"
  | "application"
  | "practice";

export type Question = {
  id: string;
  chapter_id: string;
  question_number: string | null;
  question_text: string;
  answer_content: string | null;
  explanation: string | null;
  question_type: QuestionType;
  category: string | null;
  display_order: number;
  created_at: string;
};

export type Mcq = {
  id: string;
  chapter_id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  explanation: string | null;
  difficulty: string | null;
  topic: string | null;
  display_order: number;
  created_at: string;
};

export type Resource = {
  id: string;
  chapter_id: string;
  title: string;
  description: string | null;
  resource_type: string;
  storage_path: string;
  file_size: number | null;
  status: string;
  created_at: string;
};

export type MindMap = {
  id: string;
  chapter_id: string;
  title: string;
  description: string | null;
  image_path: string;
  alt_text: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "user" | "admin";
  created_at: string;
};
