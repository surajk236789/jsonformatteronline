import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import HtmlToJsx from "../../components/HtmlToJsx";

export const metadata: Metadata = {
  title: "HTML to JSX Converter Online — Free React Tool | Developer Tools",
  description: "Convert HTML markup to React JSX instantly. Handles class→className, inline styles, self-closing tags, and all JSX syntax differences automatically.",
  keywords: ["HTML to JSX", "Convert HTML to React", "HTML JSX Converter", "React Component HTML", "JSX Syntax Converter"],
  alternates: { canonical: "https://www.jsondiff.space/tools/html-to-jsx" },
};

const features = [
  { emoji: "⚛️", title: "Full JSX Conversion", desc: "Converts class to className, for to htmlFor, inline style strings to objects, and handles all self-closing tags." },
  { emoji: "🎯", title: "React-Ready Output", desc: "Paste the output directly into your React component — no manual edits needed for most standard HTML." },
  { emoji: "🔒", title: "Fully Private", desc: "Conversion happens entirely in your browser. Your HTML code is never sent to any server." },
  { emoji: "⚡", title: "Instant Conversion", desc: "Get JSX output immediately as you paste — no form submissions or extra steps." },
];

const faqs = [
  { q: "What's different between HTML and JSX?", a: "JSX is React's syntax extension. Key differences include: class becomes className, for becomes htmlFor, self-closing tags like <br> become <br />, and inline styles are objects not strings." },
  { q: "Will it handle all HTML attributes?", a: "Most standard attributes are converted automatically. Some custom or data-* attributes may need minor adjustments. Event handlers like onclick should be converted to onClick manually or via code review." },
  { q: "Can I paste multi-element HTML?", a: "Yes, but JSX requires a single root element. If your HTML has multiple top-level elements, the converter will wrap them in a React Fragment (<> </>) automatically." },
  { q: "Does it work with Tailwind CSS classes?", a: "Yes. All class values (including long Tailwind class strings) are simply moved into className attributes without any modification to the class names themselves." },
];

export default function HtmlToJsxPage() {
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 mb-4">
          ⚛️ Converter
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          HTML to JSX Converter
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Convert HTML to React JSX instantly — handles className, htmlFor, self-closing tags, and all JSX syntax rules automatically.
        </p>
      </div>

      <HtmlToJsx />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our HTML to JSX Converter?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
