import React from "react";
import type { Metadata } from "next";
import MainLayout from "../components/MainLayout";
import JsonToXml from "../components/JsonToXml";

export const metadata: Metadata = {
  title: "JSON to XML Converter Online | Free & Instant | Developer Tools",
  description: "Convert JSON to XML online for free. Fast, secure, browser-based JSON to XML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
  keywords: ["JSON to XML", "Convert JSON to XML", "JSON XML Converter", "JSON to XML Online", "Free JSON Converter"],
  alternates: {
    canonical: "https://www.jsondiff.space/json-to-xml",
  },
};

const features = [
  { emoji: "🔄", title: "Full Structure Conversion", desc: "Converts nested JSON objects, arrays, and all primitive types to well-formed XML with proper tag hierarchy." },
  { emoji: "⚡", title: "Instant Output", desc: "Get your converted XML immediately — no server round-trips, no waiting, no rate limits." },
  { emoji: "🔒", title: "Secure & Private", desc: "All conversion happens in your browser. Your data is never uploaded to any external server." },
  { emoji: "📋", title: "Copy-Ready XML", desc: "One-click copy to clipboard for easy integration into your codebase, SOAP APIs, or config files." },
];

const faqs = [
  { q: "Why convert JSON to XML?", a: "XML is widely used in enterprise systems, SOAP APIs, config files, and legacy integrations. Converting from JSON lets you work with both modern APIs and older systems that require XML input." },
  { q: "How are JSON arrays handled in XML?", a: "JSON arrays are converted to repeated XML elements with the same tag name. For example, a JSON array named 'item' becomes multiple <item> tags in the XML output." },
  { q: "Does it produce valid XML?", a: "Yes. The converter generates well-formed XML with a proper declaration and correctly nested tags. Always validate the output if your target system requires a specific schema." },
  { q: "Can I convert XML back to JSON?", a: "This tool converts JSON to XML. For the reverse, use a dedicated XML to JSON converter — conversion in both directions is possible but requires a separate parsing step." },
];

export default function JsonToXmlPage() {
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 mb-4">
          🔄 Converter
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          JSON to XML Converter
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Convert any JSON data to well-formed XML instantly — free, private, and with full support for nested structures.
        </p>
      </div>

      <JsonToXml />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our JSON to XML Converter?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
