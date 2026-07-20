import React from "react";
import type { Metadata } from "next";

import dynamic from "next/dynamic";

const HtmlBeautifier = dynamic(() => import("@/app/components/HtmlBeautifier"), {

  loading: () => (
    <div className="w-full h-80 flex items-center justify-center bg-panel border border-panel-border rounded-xl">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "HTML Beautifier & Formatter Online",
  description: "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
  keywords: ["HTML Beautifier", "HTML Formatter", "Clean HTML Online", "Format HTML Code", "HTML Parser"],
  alternates: { canonical: "https://www.allformatter.com/tools/html-beautifier" },
  openGraph: {
    title: "HTML Beautifier & Formatter Online",
    description: "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
    url: "https://www.allformatter.com/tools/html-beautifier",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Beautifier & Formatter Online",
    description: "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🎨", title: "Auto Indentation", desc: "Automatically formats nested tags with consistent 2-space indentation for crystal-clear structure." },
  { emoji: "🔒", title: "100% Private", desc: "All formatting runs in your browser. No HTML is sent to any server." },
  { emoji: "⚡", title: "Instant Results", desc: "Paste your HTML and get a formatted output instantly — no delays, no page reloads." },
  { emoji: "🧹", title: "Clean Messy Markup", desc: "Strips inline formatting chaos and restructures your code into a clean, maintainable format." },
];

const faqs = [
  { q: "What does an HTML Beautifier do?", a: "It takes minified or poorly formatted HTML and restructures it with proper indentation and line breaks, making it easy to read, maintain, and debug." },
  { q: "Does it fix invalid HTML?", a: "The beautifier formats your HTML as-is without rewriting invalid tags. For validation, use an HTML validator tool alongside it." },
  { q: "Is this safe to use for private code?", a: "Yes — all processing is done entirely in your browser using JavaScript. Nothing is uploaded to any server." },
  { q: "Can I use it to format HTML inside JSX?", a: "For JSX-specific formatting, use our HTML to JSX converter. This tool is optimized for standard HTML5 markup." },
];

export default function HtmlBeautifierPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "HTML Beautifier and Formatter Online",
        "url": "https://www.allformatter.com/tools/html-beautifier",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          HTML Beautifier &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Formatter</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Clean, indent, and format your messy HTML instantly — fully private, no server uploads.
        </p>
      </div>

      <HtmlBeautifier />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our HTML Beautifier?</h2>
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
    </>
  );
}
