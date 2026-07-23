import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/app/components/ToolLayout";

const YamlToJson = dynamic(() => import("@/app/components/YamlToJson"), {

  loading: () => (
    <div className="w-full h-80 flex items-center justify-center bg-panel border border-panel-border rounded-xl">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "YAML to JSON Converter Online",
  description: "Convert YAML to JSON instantly online for free. Parse YAML files and export formatted JSON in your browser — no upload, no registration, 100% private.",
  keywords: [
    "YAML to JSON",
    "YAML to JSON converter",
    "convert YAML to JSON online",
    "YAML JSON parser",
    "parse YAML file",
    "YAML format to JSON format",
    "free YAML converter",
    "YAML online tool",
    "YAML syntax checker",
    "devops YAML tools",
  ],
  alternates: { canonical: "https://www.allformatter.com/tools/yaml-to-json" },
  openGraph: {
    title: "YAML to JSON Converter Online",
    description: "Convert YAML to JSON instantly online for free. Parse YAML files and export formatted JSON in your browser — no upload, no registration, 100% private.",
    url: "https://www.allformatter.com/tools/yaml-to-json",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YAML to JSON Converter Online",
    description: "Convert YAML to JSON instantly online for free. Parse YAML files and export formatted JSON in your browser — no upload, no registration, 100% private.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔄", title: "Instant Conversion", desc: "Instantly parse and convert YAML structures into properly formatted JSON." },
  { emoji: "📋", title: "Copy with 1-Click", desc: "Easily copy the generated JSON code to your clipboard with a single click." },
  { emoji: "🔒", title: "Fully Private", desc: "All conversion happens in your browser. Your data never leaves your device." },
  { emoji: "⚡", title: "Works Instantly", desc: "No login, no upload, no waiting. Paste YAML and get JSON output right away." },
];


const faqs = [
  { q: "Is YAML better than JSON?", a: "YAML is often considered more human-readable and supports comments, while JSON is better for machine parsing and data transfer." },
  { q: "Does this tool support nested YAML objects?", a: "Yes, it accurately converts deep nested objects, arrays, and lists from YAML to JSON format." },
  { q: "Is my data secure during conversion?", a: "Absolutely. The conversion runs entirely on your device with zero server interaction." }
];

export default function YamlToJsonPage() {
  const relatedTools = [
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    },
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "Hash Generator",
        "desc": "Generate MD5, SHA-1, SHA-256 hashes.",
        "href": "/tools/hash-generator",
        "emoji": "#️⃣"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "YAML to JSON Converter",
        "url": "https://www.allformatter.com/tools/yaml-to-json",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert YAML to JSON instantly online for free. Parse YAML files and export formatted JSON in your browser — no upload, no registration, 100% private.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <ToolLayout faqs={faqs}
      title={<>
              YAML to JSON <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
            </>}
      description={<>
              Convert YAML data to JSON instantly — all in your browser.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our YAML to JSON Converter?" featureColor="orange"
      >
      <YamlToJson />
    </ToolLayout>
  );
}
