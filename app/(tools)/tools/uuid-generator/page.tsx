import React from "react";
import type { Metadata } from "next";

import UuidGenerator from "@/app/components/UuidGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "UUID Generator Online — Bulk v4",
  description: "Generate cryptographically secure v4 UUIDs (Universally Unique Identifiers) instantly. Create single or bulk GUIDs. Fast, secure, and 100% browser-based.",
  keywords: ["UUID Generator", "GUID Generator", "Generate UUID", "Bulk UUID", "UUID v4", "Online GUID"],
  alternates: { canonical: "https://www.allformatter.com/tools/uuid-generator" },
  openGraph: {
    title: "UUID Generator Online — Bulk v4",
    description: "Generate cryptographically secure v4 UUIDs (Universally Unique Identifiers) instantly. Create single or bulk GUIDs. Fast, secure, and 100% browser-based.",
    url: "https://www.allformatter.com/tools/uuid-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator Online — Bulk v4",
    description: "Generate cryptographically secure v4 UUIDs (Universally Unique Identifiers) instantly. Create single or bulk GUIDs. Fast, secure, and 100% browser-based.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Generation", desc: "Generate up to 500 UUIDs instantly in a single click." },
  { emoji: "🛡️", title: "Cryptographically Secure", desc: "Uses the browser's native Crypto API to generate truly random, secure v4 UUIDs." },
  { emoji: "⚙️", title: "Customizable Output", desc: "Toggle hyphens and switch between uppercase and lowercase letters easily." },
  { emoji: "🔒", title: "100% Private", desc: "All generation happens strictly within your browser. Nothing is ever sent to a server." },
];

const faqs = [
  { q: "What is a UUID?", a: "UUID stands for Universally Unique Identifier. It is a 128-bit number used to uniquely identify information in computer systems. A UUID looks like this: 123e4567-e89b-12d3-a456-426614174000." },
  { q: "What is the difference between UUID and GUID?", a: "There is no practical difference. GUID (Globally Unique Identifier) is simply Microsoft's implementation and specific terminology for the UUID standard." },
  { q: "What version of UUID does this tool generate?", a: "This tool generates Version 4 UUIDs. v4 UUIDs are created using pseudo-random numbers and are the most common standard used in web and software development today." },
  { q: "Are the generated UUIDs truly unique?", a: "While mathematically possible to have a collision (generating the same UUID twice), the chances are unimaginably small. Generating 1 billion UUIDs every second for 85 years would only result in a 50% chance of a single collision." },
];

export default function UuidGeneratorPage() {
  const relatedTools = [
    {
      "title": "Hash Generator",
      "desc": "Generate MD5, SHA-1, SHA-256 hashes.",
      "href": "/tools/hash-generator",
      "emoji": "🔐"
    },
    {
      "title": "Password Generator",
      "desc": "Generate strong, secure passwords.",
      "href": "/tools/password-generator",
      "emoji": "🔑"
    },
    {
      "title": "Base64 Encode",
      "desc": "Encode and decode Base64 strings.",
      "href": "/tools/base64-encode-decode",
      "emoji": "🔄"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "UUID / GUID Generator",
        "url": "https://www.allformatter.com/tools/uuid-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Generate cryptographically secure v4 UUIDs (Universally Unique Identifiers) instantly. Create single or bulk GUIDs. Fast, secure, and 100% browser-based.",
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
        UUID / GUID <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Generator</span>
      </>}
      description={<>
        Generate cryptographically secure version 4 UUIDs instantly. Free, private, and browser-based.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our UUID Generator?" featureColor="purple"
      faqs={faqs}
    >
      <UuidGenerator />
    </ToolLayout>
  );
}
