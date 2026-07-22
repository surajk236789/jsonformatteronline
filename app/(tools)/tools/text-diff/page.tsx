import React from "react";
import type { Metadata } from "next";

import TextDiff from "@/app/components/TextDiff";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Text Diff & Compare Tool Online | Find String Differences",
  description: "Compare two text blocks side-by-side and find differences instantly. Supports line diff and word diff. 100% secure client-side comparison tool.",
  keywords: ["Text Diff", "String Compare", "Compare Text Online", "Diff Checker", "Diff Tool"],
  alternates: { canonical: "https://www.allformatter.com/tools/text-diff" },
  openGraph: {
    title: "Text Diff & Compare Tool Online | Find String Differences",
    description: "Compare two text blocks side-by-side and find differences instantly. Supports line diff and word diff. 100% secure client-side comparison tool.",
    url: "https://www.allformatter.com/tools/text-diff",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Diff & Compare Tool Online | Find String Differences",
    description: "Compare two text blocks side-by-side and find differences instantly. Supports line diff and word diff. 100% secure client-side comparison tool.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Comparison", desc: "See differences highlighted immediately as you type. No need to click a 'Compare' button." },
  { emoji: "🔍", title: "Line & Word Modes", desc: "Switch between comparing entire lines (great for code) or individual words (great for prose)." },
  { emoji: "🔒", title: "Secure & Private", desc: "All diffing happens directly in your browser. Your sensitive text is never sent to a server." },
  { emoji: "🔄", title: "Swap Inputs", desc: "Easily swap the original and modified text inputs with a single click." },
];

const faqs = [
  { q: "What is a diff tool?", a: "A diff (difference) tool analyzes two pieces of text and highlights exactly what was added, removed, or changed. It's incredibly useful for finding small typos in large code files or seeing what changed in a legal document." },
  { q: "What is the difference between Line Diff and Word Diff?", a: "Line Diff compares text line-by-line, highlighting entire rows that changed. Word Diff is more granular, highlighting the specific words or characters that changed within a sentence." },
  { q: "Does this work for code?", a: "Yes! While we have specific tools for JSON comparison, this Text Diff tool works perfectly for comparing generic code snippets, configuration files, or logs." },
];

export default function TextDiffPage() {
  const relatedTools = [
    {
      "title": "JSON Compare",
      "desc": "Diff two JSON objects structurally.",
      "href": "/tools/json-compare",
      "emoji": "🔍"
    },
    {
      "title": "Regex Tester",
      "desc": "Test regular expressions and patterns.",
      "href": "/tools/regex-tester",
      "emoji": "🔍"
    },
    {
      "title": "Word Counter",
      "desc": "Count words and characters in text.",
      "href": "/",
      "emoji": "📝"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Text Diff & Compare Tool",
        "url": "https://www.allformatter.com/tools/text-diff",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Compare two text blocks side-by-side and find differences instantly. Supports line diff and word diff. 100% secure client-side comparison tool.",
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
        Text <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Diff</span> Checker
      </>}
      description={<>
        Compare text files and strings online instantly. Secure, private, and fast.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our Diff Tool?" featureColor="pink"
      faqs={faqs}
    >
      <TextDiff />
    </ToolLayout>
  );
}
