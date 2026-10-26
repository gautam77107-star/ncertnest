export interface Class {
  id: string;
  name: string;
  slug: string;
  display_order?: number;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  class_id: string;
  display_order?: number;
}

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  description?: string;
  subject_id: string;
  chapter_number: number;
  status: "published" | "draft";
  display_order?: number;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  display_order?: number;
  status: "published" | "draft";
}

export interface Question {
  id: string;
  question_text: string;
  answer?: string;
  chapter_id: string;
  display_order?: number;
}

export interface Mcq {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  chapter_id: string;
  display_order?: number;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: "note" | "solution" | "video" | "pdf";
  chapter_id: string;
  display_order?: number;
}

export interface MindMap {
  id: string;
  title: string;
  image_url?: string;
  chapter_id: string;
  display_order?: number;
}