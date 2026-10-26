import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";

const info = [
  { icon: Mail, title: "Email us", desc: "support@ncertnest.example" },
  { icon: MessageSquare, title: "Feedback", desc: "We love hearing from students and teachers." },
  { icon: Clock, title: "Response time", desc: "Usually within 24–48 hours." },
  { icon: MapPin, title: "Location", desc: "India · Remote-first" },
];

export default function Contact() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="section-eyebrow mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">We’d love to hear from you</h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Have a question, suggestion or found an error? Send us a message.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          {info.map((i) => (
            <div key={i.title} className="card-hover bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <i.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{i.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{i.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input type="email" className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <textarea rows={5} className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="How can we help?" />
          </div>
          <button type="button" className="btn-primary w-full">Send message</button>
          <p className="text-xs text-[var(--muted)] text-center">Form is a placeholder — wire to your email service.</p>
        </form>
      </section>
    </div>
  );
}
