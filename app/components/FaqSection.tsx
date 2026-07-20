import React from "react";

export interface Faq {
  q: string;
  a: string;
}

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16 max-w-4xl mx-auto w-full" aria-label="Frequently Asked Questions">
      <h2 className="text-xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="group p-5 md:p-6 rounded-2xl border border-panel-border bg-panel [&_summary::-webkit-details-marker]:hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-semibold text-primary list-none">
              <span>{faq.q}</span>
              <span className="transition duration-300 group-open:-rotate-180 text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 p-1.5 rounded-full ml-4 flex-shrink-0">
                <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-sm md:text-base text-secondary leading-relaxed mt-4">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
