import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import HtmlEntityEncoder from "@/app/components/HtmlEntityEncoder";
import ToolHeader from "@/app/components/ToolHeader";

export const metadata: Metadata = {
  title: "HTML Entity Encoder & Decoder Online",
  description: "Encode special characters to HTML entities or decode HTML entities back to readable text. Free, browser-based HTML entity converter.",
  keywords: ["HTML Entity Encoder", "HTML Encode", "HTML Decode", "Escape HTML", "HTML Special Characters"],
  alternates: { canonical: "https://www.allformatter.com/tools/html-entity-encoder" },
  openGraph: {
    title: "HTML Entity Encoder & Decoder Online",
    description: "Encode special characters to HTML entities or decode HTML entities back to readable text. Free, browser-based HTML entity converter.",
    url: "https://www.allformatter.com/tools/html-entity-encoder",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Entity Encoder & Decoder Online",
    description: "Encode special characters to HTML entities or decode HTML entities back to readable text. Free, browser-based HTML entity converter.",
  },
  robots: {
    index: true,
    follow: true,
  }
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
  const relatedTools = [
    {
        "title": "Hash Generator",
        "desc": "Generate MD5, SHA-1, SHA-256 hashes.",
        "href": "/tools/hash-generator",
        "emoji": "#️⃣"
    },
    {
        "title": "YAML to JSON",
        "desc": "Convert YAML to JSON format.",
        "href": "/tools/yaml-to-json",
        "emoji": "📝"
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
        "name": "HTML Entity Encoder and Decoder Online",
        "url": "https://www.allformatter.com/tools/html-entity-encoder",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Encode special characters to HTML entities or decode HTML entities back to readable text. Free, browser-based HTML entity converter.",
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
      <ToolHeader 
          title={
            <>
              HTML Entity Encoder &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Decoder</span>
            </>
          }
          description={
            <>
              Encode special characters to HTML entities or decode them back — prevent XSS and ensure safe HTML rendering.
            </>
          }
        />

      <HtmlEntityEncoder />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our HTML Entity Encoder?" color="slate" />

      <FaqSection faqs={faqs} />
      </>
  );
}
