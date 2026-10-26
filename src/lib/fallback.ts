import type { Class, Subject, Chapter, Question, Mcq } from "./types";

const now = "2026-01-01T00:00:00.000Z";

const classNumbers = [6, 7, 8, 9, 10, 11, 12];

const subjectsForClass: Record<number, string[]> = {
  6: ["Maths", "Science", "Social Science", "English"],
  7: ["Maths", "Science", "Social Science", "English"],
  8: ["Maths", "Science", "Social Science", "English"],
  9: ["Maths", "Science", "Social Science", "English"],
  10: ["Maths", "Science", "Social Science", "English"],
  11: ["Maths", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
  12: ["Maths", "Physics", "Chemistry", "Biology", "English", "Economics", "Accountancy"],
};

const subjectDescriptions: Record<string, string> = {
  Maths: "Build strong problem-solving skills with clear concepts and step-by-step practice.",
  Science: "Explore the living and physical world through experiments, diagrams and simple explanations.",
  "Social Science": "Understand history, geography, civics and economics with structured notes.",
  English: "Improve reading, writing, grammar and literature skills with guided lessons.",
  Physics: "Master motion, force, energy and modern physics with worked examples.",
  Chemistry: "Learn matter, reactions, bonding and organic chemistry with clarity.",
  Biology: "Discover cells, life processes, genetics and human physiology.",
  "Computer Science": "Learn programming fundamentals, data structures and computational thinking.",
  Economics: "Understand micro and macroeconomics with real-world examples.",
  Accountancy: "Master journal entries, ledgers, balance sheets and financial statements.",
};

const topicsBySubject: Record<string, string[]> = {
  Maths: ["Number Systems", "Polynomials", "Linear Equations", "Geometry Essentials"],
  Science: ["Matter Around Us", "Motion and Force", "Life Processes", "Electricity and Light"],
  "Social Science": ["Our Past", "Geography of India", "Democratic Politics", "Understanding Economics"],
  English: ["Reading Comprehension", "Grammar Essentials", "Writing Skills", "Literature and Poetry"],
  Physics: ["Units and Measurement", "Motion in a Straight Line", "Laws of Motion", "Work, Energy and Power"],
  Chemistry: ["Some Basic Concepts", "Structure of Atom", "Chemical Bonding", "Thermodynamics"],
  Biology: ["The Living World", "Cell Structure and Function", "Plant Physiology", "Human Physiology"],
  "Computer Science": ["Python Basics", "Data Types and Operators", "Control Flow", "Functions and Modules"],
  Economics: ["Introduction to Economics", "Consumer Behaviour", "Market Forms", "National Income"],
  Accountancy: ["Accounting Basics", "Journal Entries", "Trial Balance", "Final Accounts"],
};

export const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const demoClasses: Class[] = classNumbers.map((n) => ({
  id: `demo-class-${n}`,
  name: `Class ${n}`,
  slug: String(n),
  description:
    n <= 10
      ? `Complete NCERT study material for Class ${n} with notes, solutions, videos and practice questions.`
      : `Exam-focused NCERT study material for Class ${n} with in-depth notes, solutions and practice.`,
  display_order: n,
  created_at: now,
  updated_at: now,
}));

export const demoSubjects: Subject[] = classNumbers.flatMap((n) =>
  subjectsForClass[n].map((name, index) => ({
    id: `demo-subject-${n}-${slugify(name)}`,
    class_id: `demo-class-${n}`,
    name,
    slug: slugify(name),
    description: subjectDescriptions[name] ?? null,
    display_order: index + 1,
    created_at: now,
    updated_at: now,
  }))
);

export const demoChapters: Chapter[] = demoSubjects.flatMap((subject) => {
  const classNumber = Number(subject.id.split("-")[2]);
  const topics = topicsBySubject[subject.name] ?? ["Introduction", "Core Concepts", "Applications"];
  return topics.map((title, index) => {
    const chapterNumber = index + 1;
    return {
      id: `demo-chapter-${classNumber}-${subject.slug}-${chapterNumber}`,
      subject_id: subject.id,
      chapter_number: chapterNumber,
      title,
      slug: slugify(title),
      description: `Understand ${title.toLowerCase()} with clear notes, solved examples and practice questions for ${subject.name}.`,
      learning_objectives: `## Learning objectives\n\n- Understand the core ideas of ${title.toLowerCase()}.\n- Apply the concepts to solve NCERT exercise questions.\n- Revise the chapter with quick summaries and MCQs.`,
      notes_content: `## ${title}\n\nThis chapter covers the essential ideas of **${title.toLowerCase()}** in ${subject.name}. The notes below are designed for quick understanding and revision.\n\n### Key concepts\n\n- Definitions and important terms.\n- Step-by-step methods with examples.\n- Common mistakes to avoid in exams.\n\n### Worked example\n\n1. Read the question carefully and identify the given information.\n2. Choose the correct formula or concept.\n3. Show every step clearly and state the final answer with units where needed.\n\n### Quick revision\n\n- Revise the definitions before attempting exercises.\n- Practise at least five questions from each subtopic.\n- Use the MCQ section to test your understanding.\n\n> Tip: Write short notes in your own words after reading each section.`,
      status: "published",
      seo_title: `${title} - ${subject.name} Notes`,
      seo_description: `Free ${title} notes and solutions for ${subject.name}.`,
      estimated_study_time: 18 + chapterNumber * 3,
      source_reference: "NCERT",
      textbook_edition: "2025-26",
      academic_session: "2025-26",
      created_at: now,
      updated_at: now,
      published_at: now,
    };
  });
});

const chapterQuestions = new Map<string, Question[]>();
const chapterMcqs = new Map<string, Mcq[]>();

for (const ch of demoChapters) {
  chapterQuestions.set(ch.id, [
    {
      id: `${ch.id}-q1`,
      chapter_id: ch.id,
      question_number: "1",
      question_text: `Explain the main idea of ${ch.title.toLowerCase()} with a suitable example.`,
      answer_content: `The main idea of **${ch.title.toLowerCase()}** is to understand the underlying principle and apply it to familiar situations.\n\n**Example:** Consider a simple everyday situation related to the topic, identify the given values, and apply the concept step by step. State the final result clearly.`,
      explanation: `Focus on the definition, the reasoning, and one clear example. This is how examiners expect the answer to be structured.`,
      question_type: "ncert",
      category: null,
      display_order: 1,
      created_at: now,
    },
    {
      id: `${ch.id}-q2`,
      chapter_id: ch.id,
      question_number: "2",
      question_text: `List any three important points from ${ch.title.toLowerCase()}.`,
      answer_content: `1. The definition and meaning of the key term.\n2. The process or formula used to solve problems.\n3. One real-life application of the concept.`,
      explanation: `Short-answer questions should be precise. Use bullet points and key terms.`,
      question_type: "ncert",
      category: null,
      display_order: 2,
      created_at: now,
    },
    {
      id: `${ch.id}-q3`,
      chapter_id: ch.id,
      question_number: null,
      question_text: `Why is ${ch.title.toLowerCase()} important for your exams?`,
      answer_content: `It builds the foundation for later chapters and is frequently asked in board exams. Practising the solved examples helps you attempt application-based questions confidently.`,
      explanation: `Mention both conceptual importance and exam relevance.`,
      question_type: "practice",
      category: "Exam preparation",
      display_order: 3,
      created_at: now,
    },
  ]);

  chapterMcqs.set(ch.id, [
    {
      id: `${ch.id}-m1`,
      chapter_id: ch.id,
      question_text: `Which of the following best describes ${ch.title.toLowerCase()}?`,
      options: ["A core concept of the chapter", "An unrelated topic", "Only a practical activity", "None of the above"],
      correct_option_index: 0,
      explanation: `${ch.title} is one of the core concepts covered in this chapter.`,
      difficulty: "easy",
      topic: ch.title,
      display_order: 1,
      created_at: now,
    },
    {
      id: `${ch.id}-m2`,
      chapter_id: ch.id,
      question_text: `What is the best way to revise ${ch.title.toLowerCase()}?`,
      options: ["Read once and forget", "Practise questions and write short notes", "Only watch videos", "Skip the exercises"],
      correct_option_index: 1,
      explanation: `Active recall through practice and short notes is the most effective revision method.`,
      difficulty: "easy",
      topic: ch.title,
      display_order: 2,
      created_at: now,
    },
    {
      id: `${ch.id}-m3`,
      chapter_id: ch.id,
      question_text: `Which resource is most useful for exam practice?`,
      options: ["NCERT exercise questions", "Only the index page", "Unrelated worksheets", "None of the above"],
      correct_option_index: 0,
      explanation: `NCERT exercises match the exam pattern and build conceptual clarity.`,
      difficulty: "medium",
      topic: ch.title,
      display_order: 3,
      created_at: now,
    },
  ]);
}

export function getDemoClassBySlug(slug: string) {
  return demoClasses.find((c) => c.slug === slug) ?? null;
}

export function getDemoSubjects(classSlug: string) {
  const cls = getDemoClassBySlug(classSlug);
  if (!cls) return [];
  return demoSubjects.filter((s) => s.class_id === cls.id).map((s) => ({ ...s, class: cls }));
}

export function getDemoSubject(classSlug: string, subjectSlug: string) {
  const cls = getDemoClassBySlug(classSlug);
  if (!cls) return null;
  const subject = demoSubjects.find((s) => s.class_id === cls.id && s.slug === subjectSlug);
  if (!subject) return null;
  return { class: cls, subject };
}

export function getDemoChapters(classSlug: string, subjectSlug: string) {
  const ctx = getDemoSubject(classSlug, subjectSlug);
  if (!ctx) return [];
  return demoChapters.filter((c) => c.subject_id === ctx.subject.id);
}

export function getDemoChapter(classSlug: string, subjectSlug: string, chapterSlug: string) {
  const ctx = getDemoSubject(classSlug, subjectSlug);
  if (!ctx) return null;
  const chapter = demoChapters.find((c) => c.subject_id === ctx.subject.id && c.slug === chapterSlug);
  if (!chapter) return null;
  return { class: ctx.class, subject: ctx.subject, chapter };
}

export function getDemoQuestions(chapterId: string) {
  return chapterQuestions.get(chapterId) ?? [];
}

export function getDemoMcqs(chapterId: string) {
  return chapterMcqs.get(chapterId) ?? [];
}

export function getDemoChapterById(id: string) {
  const chapter = demoChapters.find((c) => c.id === id);
  if (!chapter) return null;
  const subject = demoSubjects.find((s) => s.id === chapter.subject_id);
  if (!subject) return null;
  const cls = demoClasses.find((c) => c.id === subject.class_id);
  if (!cls) return null;
  return { class: cls, subject, chapter };
}

export function searchDemoContent(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: { type: string; title: string; description?: string | null; url: string }[] = [];

  for (const ch of demoChapters) {
    if (ch.title.toLowerCase().includes(q) || (ch.description ?? "").toLowerCase().includes(q)) {
      const subject = demoSubjects.find((s) => s.id === ch.subject_id);
      const cls = subject ? demoClasses.find((c) => c.id === subject.class_id) : null;
      if (subject && cls) {
        results.push({
          type: "chapter",
          title: ch.title,
          description: ch.description,
          url: `/class-${cls.slug}/${subject.slug}/${ch.slug}`,
        });
      }
    }
  }

  for (const subject of demoSubjects) {
    if (subject.name.toLowerCase().includes(q)) {
      const cls = demoClasses.find((c) => c.id === subject.class_id);
      if (cls) {
        results.push({
          type: "subject",
          title: subject.name,
          description: subject.description,
          url: `/class-${cls.slug}/${subject.slug}`,
        });
      }
    }
  }

  return results.slice(0, 20);
}
