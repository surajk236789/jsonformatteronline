import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import Base64ToPdf from "@/app/components/Base64ToPdf";
import ToolHeader from "@/app/components/ToolHeader";

export const metadata: Metadata = {
  title: "Base64 to PDF Converter Online",
  description: "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
  keywords: ["Base64 to PDF", "Decode Base64", "Base64 Converter", "Convert Base64 String to PDF", "AllFormatter"],
  alternates: { canonical: "https://www.allformatter.com/tools/base64-to-pdf" },
  openGraph: {
    title: "Base64 to PDF Converter Online",
    description: "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
    url: "https://www.allformatter.com/tools/base64-to-pdf",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 to PDF Converter Online",
    description: "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "📄", title: "Instant PDF Preview", desc: "Paste your Base64 string and preview the decoded PDF right in your browser — no download required." },
  { emoji: "🔒", title: "Fully Private", desc: "Decoding happens 100% client-side. Your Base64 data is never sent to any server." },
  { emoji: "⬇️", title: "One-Click Download", desc: "Download the decoded PDF file to your device instantly with a single click." },
  { emoji: "⚡", title: "No File Size Limits", desc: "Decode large Base64-encoded PDFs without any artificial restrictions or throttling." },
];

const faqs = [
  { q: "What is Base64 encoding?", a: "Base64 is a way to encode binary data (like PDFs, images, or files) as a text string using only printable ASCII characters. It's widely used in APIs, email attachments, and data URIs." },
  { q: "When would I have a Base64-encoded PDF?", a: "Base64-encoded PDFs often appear in API responses, email attachments encoded as MIME, database blobs, or embedded data URIs in web applications." },
  { q: "Is my PDF data safe?", a: "Absolutely. All decoding is done in your browser using JavaScript. Nothing is uploaded to our servers. Your data stays completely private." },
  { q: "What if the output looks corrupted?", a: "A corrupted output usually means the Base64 string is truncated or has invalid characters. Ensure you paste the complete, clean Base64 string without any extra spaces or line breaks." },
];

export default function Base64ToPdfPage() {
  const relatedTools = [
    {
        "title": "JSON Schema Validator",
        "desc": "Validate JSON against a Schema.",
        "href": "/tools/json-schema-validator",
        "emoji": "✅"
    },
    {
        "title": "Base64 Encode/Decode",
        "desc": "Encode text to Base64 or decode it.",
        "href": "/tools/base64-encode-decode",
        "emoji": "🔐"
    },
    {
        "title": "Cron Parser",
        "desc": "Parse cron expressions to human readable text.",
        "href": "/tools/cron-parser",
        "emoji": "⏱️"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Base64 to PDF Converter Online",
        "url": "https://www.allformatter.com/tools/base64-to-pdf",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
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
              Base64 to PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
            </>
          }
          description={
            <>
              Decode Base64 strings to PDF instantly — preview and download securely in your browser, no uploads needed.
            </>
          }
        />

      <Base64ToPdf />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our Base64 to PDF Converter?" color="indigo" />

      <FaqSection faqs={faqs} />
      </>
  );
}
