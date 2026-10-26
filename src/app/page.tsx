import Link from "next/link";
import { getClasses } from "@/lib/data";
import FAQ from "@/components/FAQ";
import { BookOpen, Video, FileText, Brain, Trophy, Zap, ArrowRight, Search, Sparkles } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Video solutions", icon: Video },
  { value: "4.9", label: "Student rating", icon: Trophy },
  { value: "1M+", label: "Students", icon: BookOpen },
  { value: "45 min", label: "Avg. daily learning", icon: Zap },
];

const features = [
  { icon: BookOpen, title: "Crystal-clear notes", desc: "Concise chapter notes that make complex topics simple.", color: "from-blue-500 to-indigo-500" },
  { icon: FileText, title: "Step-by-step solutions", desc: "Every NCERT exercise solved with full working.", color: "from-emerald-500 to-teal-500" },
  { icon: Video, title: "Video lectures", desc: "Watch, pause, rewind — learn at your own pace.", color: "from-rose-500 to-pink-500" },
  { icon: Brain, title: "Practice & MCQs", desc: "Reinforce concepts with quizzes and important questions.", color: "from-amber-500 to-orange-500" },
];

const testimonials = [
  { name: "Priya Sharma", meta: "Class 10 · Delhi", text: "The step-by-step solutions are so easy to follow. Scored 94 in boards!" },
  { name: "Rahul Gupta", meta: "CA Student · Mumbai", text: "Clear, practical explanations. Helped me grasp concepts quickly." },
  { name: "Ananya Singh", meta: "Class 12 · Lucknow", text: "Best explanations I have found anywhere. Every step is clear." },
];

const classColors = ["from-indigo-500 to-blue-500", "from-purple-500 to-indigo-500", "from-pink-500 to-rose-500", "from-amber-500 to-orange-500", "from-emerald-500 to-teal-500", "from-cyan-500 to-blue-500", "from-violet-500 to-purple-500"];

export default async function Home() {
  const classes = await getClasses();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-white -z-10" />
        <div className="blob bg-indigo-400 w-72 h-72 -top-20 -left-20" />
        <div className="blob bg-pink-400 w-80 h-80 top-10 right-0" />
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full mb-5">
              <Sparkles className="w-4 h-4" /> Free for all students
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Learn anything. <span className="gradient-text">Step by step.</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[var(--muted)] max-w-xl">
              NCERT solutions, notes, video lectures and practice questions — powered to help you close the gap and ace your boards.
            </p>

            <form action="/search" method="get" className="mt-8 max-w-xl flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  name="q"
                  placeholder="Search chapters, topics, questions..."
                  className="w-full border border-[var(--border)] rounded-2xl pl-12 pr-4 py-3.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-sm"
                />
              </div>
              <button className="btn-primary !rounded-2xl">Search</button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Maths", "Science", "English", "Social Science"].map((s) => (
                <Link
                  key={s}
                  href="/search"
                  className="text-sm bg-white/80 backdrop-blur border border-[var(--border)] px-4 py-2 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition shadow-sm"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl border border-[var(--border)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Class 10 · Science</p>
                    <p className="text-xs text-[var(--muted)]">Chapter 12 · Electricity</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {["Notes", "NCERT Solutions", "Video Lecture", "MCQs"].map((t, i) => (
                    <div key={t} className="flex items-center justify-between bg-[var(--background)] rounded-xl px-4 py-3">
                      <span className="text-sm font-medium">{t}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${i % 2 === 0 ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                        Ready
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-2 rounded-full bg-[var(--border)] overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">Progress: 67% complete</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 justify-center">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-extrabold text-[var(--primary)]">{s.value}</div>
                <div className="text-xs text-[var(--muted)]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Classes */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-eyebrow mb-2">For school students</p>
            <h2 className="section-title">Pick your class to get started</h2>
            <p className="text-[var(--muted)] mt-2">Comprehensive coverage for Classes 6 to 12.</p>
          </div>
        </div>

        {classes.length === 0 ? (
          <p className="text-[var(--muted)]">No classes configured yet. Please configure Supabase and add content via admin.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {classes.map((c, i) => (
              <Link
                key={c.id}
                href={`/class-${c.slug}`}
                className="card-hover group bg-white border border-[var(--border)] rounded-2xl p-5 text-center shadow-sm hover:border-[var(--primary)]"
              >
                <div className={`mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br ${classColors[i % classColors.length]} text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition`}>
                  {c.name.replace("Class ", "")}
                </div>
                <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mt-3">Class</div>
                <div className="text-sm font-semibold mt-1 group-hover:text-[var(--primary)] transition">{c.name}</div>
                <div className="text-xs text-[var(--muted)] mt-1">View subjects &rarr;</div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {[6, 7, 8, 9, 10, 11, 12].map((c) => (
            <Link
              key={c}
              href={`/class-${c}`}
              className="border border-[var(--border)] bg-white rounded-full px-4 py-1.5 text-sm hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition"
            >
              Class {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="section-eyebrow mb-2">Why NCERT Nest</p>
            <h2 className="section-title">Everything you need to excel</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card-hover bg-[var(--background)] border border-[var(--border)] rounded-2xl p-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shadow-md mb-4`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">{f.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium promo */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Learn without distractions</h3>
            <p className="mt-2 text-indigo-100">Ad-free experience · Worksheets · Sample papers · Priority doubt support</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {["Ad-free", "Worksheets", "Sample papers", "Priority support"].map((t) => (
                <span key={t} className="bg-white/20 px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          <div className="text-center shrink-0">
            <div className="text-4xl font-extrabold">&#8377;99<span className="text-base font-normal">/month</span></div>
            <Link href="/about" className="mt-3 inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition shadow">
              Get Premium <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-2">Loved by students</p>
          <h2 className="section-title">What students say</h2>
          <p className="text-[var(--muted)] mt-2">4.9/5 on student reviews</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="card-hover bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <div className="text-amber-400 mb-3 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-[var(--foreground)] italic leading-relaxed">“{t.text}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${classColors[i]} text-white flex items-center justify-center font-bold`}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-[var(--muted)]">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ />
    </div>
  );
}