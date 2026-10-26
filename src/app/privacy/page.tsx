import { ShieldCheck } from "lucide-react";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      </div>
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm prose">
        <p>This site respects your privacy. No student registration is required to read content. We do not collect personal data beyond standard analytics. Content is served for educational purposes.</p>
      </div>
    </div>
  );
}
