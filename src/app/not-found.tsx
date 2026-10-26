import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-8xl font-extrabold gradient-text mb-2">404</div>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-[var(--muted)] mb-8">Oops — the page you're looking for doesn't exist or has moved.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Home className="w-4 h-4" /> Go home
        </Link>
        <Link href="/search" className="btn-secondary">
          <Search className="w-4 h-4" /> Search
        </Link>
      </div>
    </div>
  );
}
