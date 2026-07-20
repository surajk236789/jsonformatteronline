import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import Base64EncodeDecode from "@/app/components/Base64EncodeDecode";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode Online",
  description: "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
  keywords: ["Base64 Encode", "Base64 Decode", "Base64 Converter", "Encode to Base64", "Decode Base64 Online"],
  alternates: { canonical: "https://www.allformatter.com/tools/base64-encode-decode" },
  openGraph: {
    title: "Base64 Encode & Decode Online",
    description: "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
    url: "https://www.allformatter.com/tools/base64-encode-decode",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encode & Decode Online",
    description: "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔐", title: "Encode & Decode", desc: "Instantly encode any text string to Base64 or decode Base64 back to the original plain text." },
  { emoji: "🔒", title: "100% Private", desc: "All encoding and decoding is done in your browser. Nothing is sent to any server." },
  { emoji: "⚡", title: "Real-time Conversion", desc: "Results update as you type — no need to click a button or submit a form." },
  { emoji: "📋", title: "One-click Copy", desc: "Copy the encoded or decoded output to your clipboard instantly with a single click." },
];

const faqs = [
  { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 printable ASCII characters. It's commonly used in email attachments, data URIs, and API token transport." },
  { q: "Is Base64 a form of encryption?", a: "No. Base64 is an encoding, not encryption. It's easily reversible and provides no security. Never use Base64 as a security measure — use proper encryption algorithms instead." },
  { q: "Why do APIs use Base64?", a: "Base64 allows binary data (like images, files, or certificates) to be safely embedded in text-based formats like JSON, HTML, XML, or email headers that don't support raw binary." },
  { q: "What does 'padding' mean in Base64?", a: "Base64 output is padded with '=' characters to make its length a multiple of 4. Some implementations strip padding — both forms are valid and widely supported." },
];

export default function Base64EncoderPage() {
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "JSON to XML",
        "desc": "Convert JSON to well-formed XML.",
        "href": "/tools/json-to-xml",
        "emoji": "🔄"
    },
    {
        "title": "CSV to JSON",
        "desc": "Convert CSV to JSON arrays.",
        "href": "/tools/csv-to-json",
        "emoji": "📊"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Base64 Encode and Decode Online",
        "url": "https://www.allformatter.com/tools/base64-encode-decode",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
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
          Base64 Encode &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Decode</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Encode text to Base64 or decode Base64 strings back to plain text — instantly and privately in your browser.
        </p>
      </div>

      <Base64EncodeDecode />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our Base64 Encoder / Decoder?" color="indigo" />

      <FaqSection faqs={faqs} />
      </>
  );
}
