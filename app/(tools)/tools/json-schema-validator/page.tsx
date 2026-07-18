import React from "react";
import type { Metadata } from "next";

import JsonSchemaValidator from "@/app/components/JsonSchemaValidator";

export const metadata: Metadata = {
  title: "JSON Schema Validator Online",
  description: "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
  keywords: ["JSON Schema Validator", "Validate JSON Schema", "JSON Validation Online", "JSON Draft-07", "Schema Checker"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-schema-validator" },
  openGraph: {
    title: "JSON Schema Validator Online",
    description: "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
    url: "https://www.allformatter.com/tools/json-schema-validator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Schema Validator Online",
    description: "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "✅", title: "Schema Validation", desc: "Validate any JSON document against a JSON Schema and get clear, actionable error messages for every violation." },
  { emoji: "🎯", title: "Detailed Errors", desc: "See exactly which property failed, what the expected type was, and where the error occurred in your data." },
  { emoji: "🔒", title: "Fully Private", desc: "All validation runs in your browser. Your JSON data and schema are never sent to any server." },
  { emoji: "⚡", title: "Instant Feedback", desc: "Results appear immediately — paste your JSON and schema and see validation results right away." },
];

const faqs = [
  { q: "What is JSON Schema?", a: "JSON Schema is a vocabulary for annotating and validating JSON documents. It lets you define the structure, types, required fields, and constraints your JSON data must conform to." },
  { q: "Which JSON Schema draft is supported?", a: "This tool supports JSON Schema Draft-07 and many common keywords including type, required, properties, enum, minLength, maxLength, minimum, maximum, and more." },
  { q: "What does a validation error mean?", a: "A validation error means your JSON data doesn't match one of the rules in your schema — for example, a required field is missing, a value is the wrong type, or a number is out of range." },
  { q: "Can I validate nested objects?", a: "Yes. JSON Schema supports deeply nested object and array validation through the properties, items, and $ref keywords, and this tool handles nested schemas correctly." },
];

export default function JsonSchemaValidatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON Schema Validator Online",
        "url": "https://www.allformatter.com/tools/json-schema-validator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
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
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4">
          ✅ Validator
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          JSON Schema Validator
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Validate your JSON data against a JSON Schema — get clear error messages for every violation, instantly and privately.
        </p>
      </div>

      <JsonSchemaValidator />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our JSON Schema Validator?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
