"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, Menu, X, ChevronDown, GraduationCap, BookOpen, Sparkles } from "lucide-react";

const classes = [6, 7, 8, 9, 10, 11, 12];

const subjectsByClass: Record<number, string[]> = {
  6: ["Maths", "Science", "Social Science", "English"],
  7: ["Maths", "Science", "Social Science", "English"],
  8: ["Maths", "Science", "Social Science", "English"],
  9: ["Maths", "Science", "Social Science", "English"],
  10: ["Maths", "Science", "Social Science", "English"],
  11: ["Maths", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
  12: ["Maths", "Physics", "Chemistry", "Biology", "English", "Economics", "Accountancy"],
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="NCERT Nest logo"
                width={40}
                height={40}
                className="rounded-xl shadow-sm group-hover:scale-105 transition"
                priority
              />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight">
              NCERT<span className="text-[var(--primary)]">Nest</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link href="/" className="px-3 py-2 rounded-lg hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition">
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setClassesOpen(true)}
              onMouseLeave={() => setClassesOpen(false)}
            >
              <button className="px-3 py-2 rounded-lg hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition flex items-center gap-1">
                Classes <ChevronDown className="w-4 h-4" />
              </button>
              {classesOpen && (
                <div className="absolute left-0 top-full mt-2 w-[560px] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-5 grid grid-cols-3 gap-4 animate-fade-up">
                  {classes.map((c) => (
                    <div key={c} className="space-y-1.5">
                      <Link
                        href={`/class-${c}`}
                        className="flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] text-sm font-bold">
                          {c}
                        </span>
                        Class {c}
                      </Link>
                      <p className="text-xs text-[var(--muted)] leading-relaxed pl-10">
                        {subjectsByClass[c].join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/search" className="px-3 py-2 rounded-lg hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition">
              Search
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-lg hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-lg hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition">
              Contact
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="p-2 rounded-lg hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/admin/login"
              className="hidden sm:inline-flex items-center gap-1.5 btn-primary text-sm !py-2 !px-4 !rounded-lg !shadow-none"
            >
              <GraduationCap className="w-4 h-4" /> Login
            </button>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--primary-light)] transition"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <form action="/search" method="get" className="pb-3 pt-1 animate-fade-up">
            <div className="flex gap-2">
              <input
                name="q"
                autoFocus
                placeholder="Search chapters, subjects, questions..."
                className="flex-1 border border-[var(--border)] bg-[var(--card)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button className="btn-primary !py-2.5 !px-5 !rounded-xl">Search</button>
            </div>
          </form>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--border)] pt-3 space-y-1 animate-fade-up">
            <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-[var(--primary-light)]" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <details className="px-3 py-2">
              <summary className="cursor-pointer font-medium flex items-center gap-1">
                Classes <ChevronDown className="w-4 h-4" />
              </summary>
              <div className="mt-2 pl-3 space-y-1">
                {classes.map((c) => (
                  <Link
                    key={c}
                    href={`/class-${c}`}
                    className="block py-1.5 text-sm text-[var(--muted)] hover:text-[var(--primary)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Class {c}
                  </Link>
                ))}
              </div>
            </details>
            <Link href="/search" className="block px-3 py-2 rounded-lg hover:bg-[var(--primary-light)]" onClick={() => setMobileOpen(false)}>
              Search
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-lg hover:bg-[var(--primary-light)]" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-lg hover:bg-[var(--primary-light)]" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="block px-3 py-2 rounded-lg bg-[var(--primary)] text-white text-center font-medium mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}