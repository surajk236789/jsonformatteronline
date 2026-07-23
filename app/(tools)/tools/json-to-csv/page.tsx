import React from "react";
import type { Metadata } from "next";

import JsonToCsv from "@/app/components/JsonToCsv";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "JSON to CSV Converter Online",
  description: "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
  keywords: ["JSON to CSV", "Convert JSON to CSV", "JSON CSV Converter", "Export JSON as CSV", "JSON Table"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-to-csv" },
  openGraph: {
    title: "JSON to CSV Converter Online",
    description: "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
    url: "https://www.allformatter.com/tools/json-to-csv",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Converter Online",
    description: "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "📊", title: "JSON Arrays to Rows", desc: "Converts JSON arrays of objects to clean CSV rows with auto-detected column headers from your JSON keys." },
  { emoji: "⬇️", title: "Download as .csv", desc: "One-click download exports your converted data as a proper .csv file ready for Excel, Google Sheets, or any data tool." },
  { emoji: "🔒", title: "Fully Private", desc: "All conversion happens in your browser. Your data never leaves your device." },
  { emoji: "⚡", title: "Works Instantly", desc: "No login, no upload, no waiting. Paste JSON and get CSV output right away." },
];

const faqs = [
  { q: "What JSON structure works best for CSV conversion?", a: "A JSON array of flat objects works best — each object becomes a row and each key becomes a column. For example: [{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":25}]." },
  { q: "Does it support nested JSON objects?", a: "Nested objects are flattened or serialized as strings in the CSV output. For complex nested data, consider flattening your JSON first using a transformation step." },
  { q: "Can I open the output in Excel?", a: "Yes. Download the .csv file and open it directly in Microsoft Excel, Google Sheets, or any spreadsheet application that supports CSV." },
  { q: "Is there a size limit?", a: "There's no hard limit — but very large JSON datasets may slow down browser rendering. For best performance, process in batches if needed." },
];

export default function JsonToCsvPage() {
  const relatedTools = [
    {
      "title": "JSON Beautifier",
      "desc": "Format, clean, and beautify your JSON data.",
      "href": "/",
      "emoji": "🗂️"
    },
    {
      "title": "HTML Beautifier",
      "desc": "Format and beautify your HTML.",
      "href": "/tools/html-beautifier",
      "emoji": "🌐"
    },
    {
      "title": "JSON Compare",
      "desc": "Compare two JSON objects side-by-side.",
      "href": "/tools/json-compare",
      "emoji": "⚖️"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON to CSV Converter Online",
        "url": "https://www.allformatter.com/tools/json-to-csv",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
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
    <ToolLayout
      title={<>
        JSON to CSV <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
      </>}
      description={<>
        Convert JSON arrays to CSV rows instantly — download as a file, open in Excel or Google Sheets, all in your browser.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our JSON to CSV Converter?" featureColor="teal"
      faqs={faqs}
    >
      <JsonToCsv />
    </ToolLayout>
  );
}
