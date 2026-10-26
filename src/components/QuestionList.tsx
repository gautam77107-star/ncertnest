"use client";
import { useState } from "react";
import Markdown from "@/components/Markdown";
import type { Question } from "@/lib/types";

const types = ["all", "vsa", "sa", "la", "application", "practice"];

export default function QuestionList({ questions }: { questions: Question[] }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? questions : questions.filter((q) => q.question_type === filter);
  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${filter === t ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"}`}
          >
            {t === "all" ? "All" : t.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map((q) => (
          <div key={q.id} className="bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <p className="text-xs uppercase font-semibold text-[var(--primary)] mb-1">{q.question_type}</p>
            <p className="font-medium mb-2">{q.question_text}</p>
            {q.answer_content && <Markdown content={q.answer_content} />}
            {q.explanation && (
              <div className="mt-2 text-sm text-[var(--muted)] bg-[var(--background)] rounded-xl p-3">
                <strong className="text-[var(--foreground)]">Explanation:</strong> <Markdown content={q.explanation} />
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-[var(--muted)]">No questions for this filter.</p>}
      </div>
    </div>
  );
}
