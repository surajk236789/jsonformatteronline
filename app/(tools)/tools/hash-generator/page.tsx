import React from "react";
import type { Metadata } from "next";

import HashGenerator from "@/app/components/HashGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Hash Generator Online",
  description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
  keywords: ["Hash Generator", "MD5 Generator", "SHA256 Online", "SHA-1 Hash", "Cryptographic Hash Tool"],
  alternates: { canonical: "https://www.allformatter.com/tools/hash-generator" },
  openGraph: {
    title: "Hash Generator Online",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
    url: "https://www.allformatter.com/tools/hash-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hash Generator Online",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "#️⃣", title: "Multiple Algorithms", desc: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes — choose the right algorithm for your use case." },
  { emoji: "🔒", title: "100% Private", desc: "All hashing is done locally in your browser using the Web Crypto API. Nothing is sent to any server." },
  { emoji: "⚡", title: "Instant Output", desc: "Hash is computed as you type — no form submission, no delays." },
  { emoji: "📋", title: "Copy Ready", desc: "One-click copy puts the hash string directly on your clipboard." },
];

const faqs = [
  { q: "What is a cryptographic hash?", a: "A hash function takes any input and produces a fixed-length string (the hash or digest). The same input always produces the same output, but it's computationally infeasible to reverse — making it ideal for checksums and data verification." },
  { q: "Which hash algorithm should I use?", a: "For security-sensitive uses, SHA-256 or SHA-512 are recommended. MD5 and SHA-1 are considered cryptographically broken for security purposes but are still useful for checksums and data integrity checks." },
  { q: "Can hashes be reversed?", a: "No. Hash functions are one-way by design. You cannot reconstruct the original input from a hash. However, common passwords can be cracked via rainbow tables — always salt your hashes in authentication systems." },
  { q: "What's the difference between MD5 and SHA-256?", a: "MD5 produces a 128-bit (32-character hex) hash and is fast but no longer secure. SHA-256 produces a 256-bit (64-character hex) hash and is considered cryptographically safe for most applications." },
];

export default function HashGeneratorPage() {
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "Password Generator",
        "desc": "Generate strong, secure passwords.",
        "href": "/tools/password-generator",
        "emoji": "🛡️"
    },
    {
        "title": "JWT Decoder",
        "desc": "Decode JSON Web Tokens instantly.",
        "href": "/tools/jwt-decoder",
        "emoji": "🔑"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Hash Generator Online",
        "url": "https://www.allformatter.com/tools/hash-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
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
              Hash <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>}
      description={<>
              Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text — instantly and privately in your browser.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our Hash Generator?" featureColor="slate"
      faqs={faqs}
    >
      <HashGenerator />
    </ToolLayout>
  );
}
