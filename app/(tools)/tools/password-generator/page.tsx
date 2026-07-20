import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import PasswordGenerator from "@/app/components/PasswordGenerator";
import ToolHeader from "@/app/components/ToolHeader";

export const metadata: Metadata = {
  title: "Password Generator Online",
  description: "Generate strong, random, and secure passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols — free and browser-based.",
  keywords: ["Password Generator", "Secure Password", "Random Password", "Strong Password Generator", "Online Password Tool"],
  alternates: { canonical: "https://www.allformatter.com/tools/password-generator" },
  openGraph: {
    title: "Password Generator Online",
    description: "Generate strong, random, and secure passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols — free and browser-based.",
    url: "https://www.allformatter.com/tools/password-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator Online",
    description: "Generate strong, random, and secure passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols — free and browser-based.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔑", title: "Customizable Rules", desc: "Choose length, toggle uppercase, lowercase, numbers, and symbols to match any password policy." },
  { emoji: "🎲", title: "Cryptographically Random", desc: "Uses the browser's Web Crypto API for truly random password generation — not predictable Math.random()." },
  { emoji: "🔒", title: "Never Stored", desc: "Passwords are generated entirely in your browser and never sent to or stored on any server." },
  { emoji: "⚡", title: "Instant Generation", desc: "Generate a new password in one click. Regenerate as many times as you need, instantly." },
];

const faqs = [
  { q: "What makes a password strong?", a: "A strong password is at least 12 characters long and uses a mix of uppercase letters, lowercase letters, numbers, and symbols. Avoid dictionary words, names, or predictable patterns." },
  { q: "Is it safe to use a browser-based password generator?", a: "Yes — our generator uses the Web Crypto API (window.crypto.getRandomValues) which is cryptographically secure and runs entirely in your browser. The password is never transmitted anywhere." },
  { q: "Should I use a password manager?", a: "Absolutely. Use this tool to generate a strong password, then store it in a trusted password manager like 1Password, Bitwarden, or LastPass. Never reuse passwords across accounts." },
  { q: "How long should my password be?", a: "At minimum 12 characters for personal accounts, 16+ for financial and critical systems, and 20+ for root/admin credentials. Longer passwords are exponentially harder to crack." },
];

export default function PasswordGeneratorPage() {
  const relatedTools = [
    {
        "title": "JSON Compare",
        "desc": "Compare two JSON objects side-by-side.",
        "href": "/tools/json-compare",
        "emoji": "⚖️"
    },
    {
        "title": "Hash Generator",
        "desc": "Generate MD5, SHA-1, SHA-256 hashes.",
        "href": "/tools/hash-generator",
        "emoji": "#️⃣"
    },
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Password Generator Online",
        "url": "https://www.allformatter.com/tools/password-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Generate strong, random, and secure passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols — free and browser-based.",
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
              Secure Password <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>
          }
          description={
            <>
              Generate strong, random passwords with custom rules — cryptographically secure and never stored or transmitted.
            </>
          }
        />

      <PasswordGenerator />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our Password Generator?" color="rose" />

      <FaqSection faqs={faqs} />
      </>
  );
}
