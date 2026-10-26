import Link from "next/link";
import { BookOpen, Target, Heart, Users, Sparkles } from "lucide-react";

const values = [
  { icon: Target, title: "Student-first", desc: "Every decision starts with what helps a student learn better." },
  { icon: BookOpen, title: "Quality content", desc: "Notes and solutions reviewed for accuracy and clarity." },
  { icon: Heart, title: "Free & open", desc: "Core learning resources stay free for every student." },
  { icon: Users, title: "Community", desc: "Built with feedback from teachers and learners." },
];

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="section-eyebrow mb-3">About us</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Helping every student <span className="gradient-text">learn better</span>
          </h1>
          <p className="mt-5 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            NCERT Nest is an independent educational platform providing study materials for Classes 6 to 12 — notes, solutions, video lectures and practice questions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="section-title mb-4">Our mission</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We believe quality education should be accessible to everyone. NCERT Nest exists to make difficult concepts approachable through clear explanations, structured notes and step-by-step solutions aligned with the NCERT curriculum.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            We are not affiliated with or endorsed by NCERT. All content is original and reviewed for accuracy. If you spot an issue, please reach out via our contact page.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="btn-primary">Get in touch</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {values.map((v) => (
            <div key={v.title} className="card-hover bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold">{v.title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <Sparkles className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
          <h2 className="section-title">Start learning today</h2>
          <p className="text-[var(--muted)] mt-2 mb-6">Pick your class and dive into structured chapters.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[6, 7, 8, 9, 10, 11, 12].map((c) => (
              <Link key={c} href={`/class-${c}`} className="border border-[var(--border)] rounded-full px-4 py-1.5 text-sm hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition">
                Class {c}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
