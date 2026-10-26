export const demoClasses: Class[] = [
  { id: "1", name: "Class 6", slug: "6", display_order: 1 },
  { id: "2", name: "Class 7", slug: "7", display_order: 2 },
  { id: "3", name: "Class 8", slug: "8", display_order: 3 },
  { id: "4", name: "Class 9", slug: "9", display_order: 4 },
  { id: "5", name: "Class 10", slug: "10", display_order: 5 },
  { id: "6", name: "Class 11", slug: "11", display_order: 6 },
  { id: "7", name: "Class 12", slug: "12", display_order: 7 },
];

export function getDemoClassBySlug(slug: string): Class | null {
  const cls = demoClasses.find((c) => c.slug === slug);
  return cls ?? null;
}

export function getDemoSubjects(classSlug: string) {
  const subjects: Subject[] = [
    { id: "1", name: "Maths", slug: "maths", description: "Mathematics", class_id: classSlug },
    { id: "2", name: "Science", slug: "science", description: "Science", class_id: classSlug },
    { id: "3", name: "Social Science", slug: "social-science", description: "Social Science", class_id: classSlug },
    { id: "4", name: "English", slug: "english", description: "English", class_id: classSlug },
  ];
  return subjects;
}

export function getDemoSubject(classSlug: string, subjectSlug: string): Subject | null {
  const subjects = getDemoSubjects(classSlug);
  return subjects.find((s) => s.slug === subjectSlug) ?? null;
}

export function getDemoChapters(classSlug: string, subjectSlug: string) {
  const subjects = getDemoSubjects(classSlug);
  const subject = subjects.find((s) => s.slug === subjectSlug);
  if (!subject) return [];

  const chapters: Chapter[] = [];
  for (let i = 1; i <= 10; i++) {
    chapters.push({
      id: `${i}`,
      title: `Chapter ${i}`,
      slug: `chapter-${i}`,
      description: `Chapter ${i} description`,
      subject_id: subject.id,
      chapter_number: i,
      status: "published",
      display_order: i,
    });
  }
  return chapters;
}

export function getDemoChapter(classSlug: string, subjectSlug: string, chapterSlug: string): Chapter | null {
  const chapters = getDemoChapters(classSlug, subjectSlug);
  return chapters.find((c) => c.slug === chapterSlug) ?? null;
}

export function getDemoQuestions(chapterId: string) {
  return [
    {
      id: "1",
      question_text: "What is the formula for ...?",
      answer: "The formula is ...",
      chapter_id: chapterId,
    },
  ];
}

export function getDemoMcqs(chapterId: string) {
  return [
    {
      id: "1",
      question_text: "What is ...?",
      options: ["A", "B", "C", "D"],
      correct_answer: 0,
      explanation: "This is the correct answer",
      chapter_id: chapterId,
    },
  ];
}

export function getDemoResources(chapterId: string) {
  return [
    {
      id: "1",
      title: "Chapter Notes",
      url: "/notes",
      type: "note",
      chapter_id: chapterId,
    },
  ];
}

export function getDemoMindMaps(chapterId: string) {
  return [
    {
      id: "1",
      title: "Chapter Mind Map",
      image_url: "/mindmap.svg",
      chapter_id: chapterId,
    },
  ];
}

export function searchDemoContent(query: string) {
  const results: { type: string; title: string; description?: string | null; url: string }[] = [];

  // Simple demo search
  if (query.trim()) {
    results.push({
      type: "chapter",
      title: `Sample result for: ${query}`,
      description: "This is a demo search result",
      url: "/class-10/science/chapter-1",
    });
  }

  return results;
}