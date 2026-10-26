import Link from "next/link";
import { searchContent } from "@/lib/data";
import { Search, BookOpen, HelpCircle, FileText, ArrowRight } from "lucide-react";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const results = q ? await searchContent(q) : [];

  const iconFor = (type: string) => {
    if (type === "chapter") return BookOpen;
    if (type === "subject") return FileText;
    return HelpCircle;
  };
  const colorFor = (type: string) => {
    if (type === "chapter") return "bg-blue-50 text-blue-700";
    if (type === "subject") return "bg-purple-50 text-purple-700";
    return "bg-emerald-50 text-emerald-700";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Search</p>
        <h1 className="section-title">Find anything</h1>
        <p className="text-[var(--muted)] mt-2">Search chapters, subjects and questions.</p>
      </div>

      <form action="/search" method="get" className="flex gap-2 mb-8">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search chapters, subjects, questions..."
            className="w-full border border-[var(--border)] rounded-2xl pl-12 pr-4 py-3.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-sm"
          />
        </div>
        <button className="btn-primary !rounded-2xl">Search</button>
      </form>

      {q && (
        <>
          <p className="text-sm text-[var(--muted)] mb-4">
            {results.length} result{results.length === 1 ? "" : "s"} for <span className="font-semibold text-[var(--foreground)]">"{q}"</span>
          </p>
          {results.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[var(--border)] rounded-2xl">
              <Search className="w-10 h-10 text-[var(--muted)] mx-auto mb-3" />
              <p className="text-[var(--muted)]">No results found. Try different keywords.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((r: any, i: number) => {
                const Icon = iconFor(r.type);
                return (
                  <li key={i} className="card-hover bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorFor(r.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs uppercase font-semibold px-2 py-0.5 rounded-full ${colorFor(r.type)}`}>{r.type}</span>
                        </div>
                        <Link href={r.url} className="font-semibold text-[var(--primary)] hover:underline flex items-center gap-1 group">
                          {r.title}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                        </Link>
                        {r.description && <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{r.description}</p>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
