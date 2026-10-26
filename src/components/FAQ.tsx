export function FAQ() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="section-eyebrow mb-2">Frequently Asked Questions</p>
        <h2 className="section-title">Have a question? We've got answers</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">How do I find a specific chapter?</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Select your class from the homepage</li>
            <li>Choose your subject from the class page</li>
            <li>Browse chapters or use the search bar</li>
          </ol>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Are the NCERT solutions free?</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            Yes, all NCERT solutions, notes, and practice questions on NCERT Nest are completely free for students.
          </p>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Can I access video lectures?</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            Video lectures are available for premium users. Free users can access select sample videos.
          </p>
        </div>
      </div>
    </section>
  );
}