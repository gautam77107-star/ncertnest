"use client";
import { useState } from "react";
import type { Mcq } from "@/lib/types";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

export default function Quiz({ mcqs }: { mcqs: Mcq[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!mcqs.length) return <p className="text-[var(--muted)]">No MCQs available.</p>;

  const score = mcqs.reduce((acc, m) => {
    return acc + (answers[m.id] === m.correct_option_index ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {mcqs.map((m, i) => (
        <div key={m.id} className="bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm">
          <p className="font-semibold mb-3 flex items-start gap-2">
            <span className="text-[var(--primary)]">{i + 1}.</span>
            <span>{m.question_text}</span>
          </p>
          <div className="space-y-2">
            {m.options.map((opt, idx) => {
              const selected = answers[m.id] === idx;
              const isCorrect = idx === m.correct_option_index;
              let cls = "border border-[var(--border)] rounded-xl px-4 py-3 cursor-pointer flex items-center gap-3 transition";
              if (submitted) {
                if (isCorrect) cls += " bg-emerald-50 border-emerald-400";
                else if (selected) cls += " bg-rose-50 border-rose-400";
              } else if (selected) {
                cls += " bg-indigo-50 border-indigo-400";
              } else {
                cls += " hover:bg-[var(--background)]";
              }
              return (
                <label key={idx} className={cls}>
                  <input
                    type="radio"
                    name={m.id}
                    disabled={submitted}
                    checked={selected}
                    onChange={() => setAnswers((a) => ({ ...a, [m.id]: idx }))}
                    className="accent-[var(--primary)]"
                  />
                  <span className="flex-1">{opt}</span>
                  {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {submitted && selected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                </label>
              );
            })}
          </div>
          {submitted && m.explanation && (
            <div className="mt-3 text-sm text-[var(--muted)] bg-[var(--background)] rounded-xl p-3">
              <strong className="text-[var(--foreground)]">Explanation:</strong> {m.explanation}
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="btn-primary"
          >
            Submit
          </button>
        ) : (
          <>
            <div className="text-lg font-semibold flex items-center gap-2">
              Score: <span className="text-[var(--primary)]">{score}</span> / {mcqs.length}
            </div>
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="btn-secondary"
            >
              <RotateCcw className="w-4 h-4" /> Restart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
