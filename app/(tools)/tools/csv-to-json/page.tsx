import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import CsvToJson from "@/app/components/CsvToJson";

export const metadata: Metadata = {
  title: "CSV to JSON Converter Online",
  description: "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
  keywords: ["CSV to JSON", "Convert CSV to JSON", "CSV JSON Converter", "Import CSV as JSON", "Parse CSV Online"],
  alternates: { canonical: "https://www.allformatter.com/tools/csv-to-json" },
  openGraph: {
    title: "CSV to JSON Converter Online",
    description: "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
    url: "https://www.allformatter.com/tools/csv-to-json",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to JSON Converter Online",
    description: "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "📥", title: "Auto Header Detection", desc: "Automatically uses the first row of your CSV as JSON keys — no manual mapping needed." },
  { emoji: "🎯", title: "Clean JSON Output", desc: "Produces properly typed JSON — numbers stay numbers, booleans stay booleans, not everything is a string." },
  { emoji: "🔒", title: "Fully Private", desc: "All parsing happens in your browser. Your CSV data never leaves your device." },
  { emoji: "⚡", title: "Paste or Upload", desc: "Paste CSV text directly or work with raw data — instant conversion with no configuration required." },
];

const faqs = [
  { q: "What format should my CSV be in?", a: "Standard CSV with comma-separated values and a header row works best. The first row is used as JSON keys and each subsequent row becomes a JSON object in the output array." },
  { q: "Are quoted fields with commas handled correctly?", a: 'Yes. Fields wrapped in double quotes (e.g., "Smith, John") are parsed correctly, preserving the comma as part of the value rather than treating it as a delimiter.' },
  { q: "What happens with empty cells?", a: "Empty cells are converted to empty string values in the JSON output. You can handle null mapping manually after conversion if needed." },
  { q: "Can I use tab-separated values (TSV)?", a: "Some configurations support TSV. If your data is tab-separated, try replacing tabs with commas before pasting, or use the raw paste mode if available." },
];

export default function CsvToJsonPage() {
  const relatedTools = [
    {
        "title": "JSON Schema Validator",
        "desc": "Validate JSON against a Schema.",
        "href": "/tools/json-schema-validator",
        "emoji": "✅"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    },
    {
        "title": "JSON to XML",
        "desc": "Convert JSON to well-formed XML.",
        "href": "/tools/json-to-xml",
        "emoji": "🔄"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "CSV to JSON Converter Online",
        "url": "https://www.allformatter.com/tools/csv-to-json",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
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
          CSV to JSON <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Import CSV data as structured JSON instantly — auto-detects headers, fully private, no uploads.
        </p>
      </div>

      <CsvToJson />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our CSV to JSON Converter?" color="teal" />

      <FaqSection faqs={faqs} />
      </>
  );
}
