import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-light)] opacity-40 pointer-events-none" />
      <div className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5">
                <Image src="/logo.png" alt="NCERT Nest logo" width={40} height={40} className="rounded-xl shadow-sm" />
                <span className="font-extrabold text-xl tracking-tight">
                  NCERT<span className="text-[var(--primary)]">Nest</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-[var(--muted)] max-w-xs leading-relaxed">
                Free NCERT notes, solutions, video lectures and practice questions for Classes 6–12. Built with love for students.
              </p>
              <div className="flex gap-2 mt-5">
                {["FB", "IG", "YT", "X"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[var(--foreground)]">Classes</h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {[6, 7, 8, 9, 10, 11, 12].map((c) => (
                  <li key={c}>
                    <Link href={`/class-${c}`} className="hover:text-[var(--primary)] transition">
                      Class {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[var(--foreground)]">Subjects</h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {["Maths", "Science", "Social Science", "English", "Physics", "Chemistry", "Biology"].map((s) => (
                  <li key={s}>
                    <span className="hover:text-[var(--primary)] cursor-default transition">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[var(--foreground)]">Resources</h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li><Link href="/search" className="hover:text-[var(--primary)] transition">Search</Link></li>
                <li><Link href="/about" className="hover:text-[var(--primary)] transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--primary)] transition">Contact Us</Link></li>
                <li><Link href="/admin" className="hover:text-[var(--primary)] transition">Admin</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[var(--foreground)]">Legal</h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li><Link href="/privacy" className="hover:text-[var(--primary)] transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[var(--primary)] transition">Terms of Use</Link></li>
                <li><Link href="/copyright" className="hover:text-[var(--primary)] transition">Copyright</Link></li>
                <li><Link href="/disclaimer" className="hover:text-[var(--primary)] transition">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[var(--muted)]">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} NCERT Nest. Independent educational resource. Not affiliated with NCERT.
            </p>
            <p className="flex items-center gap-1.5">
              Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> and caffeine.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}