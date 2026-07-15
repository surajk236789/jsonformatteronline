import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import HtmlEntityEncoder from "../../components/HtmlEntityEncoder";

export const metadata: Metadata = {
  title: "HTML Entity Encoder & Decoder Online | Developer Tools",
  description: "Encode special characters to HTML entities or decode HTML entities back to readable text. Free, browser-based HTML entity converter.",
  keywords: ["HTML Entity Encoder", "HTML Encode", "HTML Decode", "Escape HTML", "HTML Special Characters"],
  alternates: { canonical: "https://www.allformatter.com/tools/html-entity-encoder" },
};

const features = [
  { emoji: "🔠", title: "Encode & Decode", desc: "Convert special characters to HTML entities (e.g., & → &amp;) or decode entities back to readable characters." },
  { emoji: "🛡️", title: "Prevent XSS", desc: "Properly encoding user-provided content before inserting it into HTML prevents cross-site scripting (XSS) vulnerabilities." },
  { emoji: "🔒", title: "Fully Private", desc: "All encoding and decoding is done locally in your browser. Your data is never sent to a server." },
  { emoji: "⚡", title: "Instant Results", desc: "Paste your text and see encoded or decoded output immediately — no page loads or button clicks needed." },
];

const faqs = [
  { q: "What are HTML entities?", a: "HTML entities are special character sequences used to represent characters that have special meaning in HTML (like <, >, &, \") or characters that are not available on standard keyboards." },
  { q: "When do I need to encode HTML?", a: "Always encode user-generated content before rendering it as HTML. Failing to do so allows malicious users to inject scripts — a vulnerability called Cross-Site Scripting (XSS)." },
  { q: "What's the difference between named and numeric entities?", a: "Named entities use a descriptive name (e.g., &amp; for &). Numeric entities use the character's Unicode code point (e.g., &#38; for &). Both are valid and produce the same output." },
  { q: "Does it handle Unicode and emoji?", a: "Yes. Unicode characters and emoji can be encoded to their numeric HTML entity equivalents, ensuring compatibility across all browsers and email clients." },
];

export default function HtmlEntityEncoderPage() {
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
          🔠 Encoder
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          HTML Entity Encoder &amp; Decoder
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Encode special characters to HTML entities or decode them back — prevent XSS and ensure safe HTML rendering.
        </p>
      </div>

      <HtmlEntityEncoder />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our HTML Entity Encoder?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-slate-400/40 hover:shadow-lg hover:shadow-slate-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
    </MainLayout>
  );
}
