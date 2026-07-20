import React from "react";

export interface Faq {
  q: string;
  a: string;
}

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16 max-w-3xl mx-auto" aria-label="FAQ">
      <h2 className="text-xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="group p-5 rounded-2xl border border-panel-border bg-panel [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-primary list-none">
              <span>{faq.q}</span>
              <span className="transition duration-300 group-open:-rotate-180 text-secondary">
                <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-xs text-secondary leading-relaxed mt-4">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
