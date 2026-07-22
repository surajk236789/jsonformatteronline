import React from "react";
import type { Metadata } from "next";

import WordCounter from "@/app/components/WordCounter";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Free Word & Character Counter Online | Instant Stats",
  description: "Count words, characters, sentences, and paragraphs in real-time. Free online word counter with reading time estimation. Perfect for essays and SEO.",
  keywords: ["Word Counter", "Character Counter", "Count Words Online", "Letter Counter", "Paragraph Counter"],
  alternates: { canonical: "https://www.allformatter.com/tools/word-counter" },
  openGraph: {
    title: "Free Word & Character Counter Online | Instant Stats",
    description: "Count words, characters, sentences, and paragraphs in real-time. Free online word counter with reading time estimation. Perfect for essays and SEO.",
    url: "https://www.allformatter.com/tools/word-counter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Word & Character Counter Online | Instant Stats",
    description: "Count words, characters, sentences, and paragraphs in real-time. Free online word counter with reading time estimation. Perfect for essays and SEO.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Real-Time Counting", desc: "Results update instantly as you type. No need to click any buttons." },
  { emoji: "📊", title: "Detailed Statistics", desc: "Counts words, characters (with and without spaces), sentences, paragraphs, and lines." },
  { emoji: "⏱️", title: "Reading Time", desc: "Estimates how long it will take the average person to read your text." },
  { emoji: "🔒", title: "100% Private", desc: "All processing happens in your browser. Your text is never sent to a server." },
];

const faqs = [
  { q: "Why do I need a word counter?", a: "Many platforms have strict character or word limits. For example, Twitter has a 280-character limit, SEO meta descriptions should be under 160 characters, and many college essays require a specific word count." },
  { q: "How is reading time calculated?", a: "Reading time is estimated based on the average adult reading speed, which is approximately 238 words per minute." },
  { q: "Does this tool save my text?", a: "No. This tool is completely client-side. The text you paste never leaves your device, making it safe for confidential documents and personal essays." },
];

export default function WordCounterPage() {
  const relatedTools = [
    {
      "title": "Text Diff",
      "desc": "Compare two text documents side-by-side.",
      "href": "/tools/text-diff",
      "emoji": "📝"
    },
    {
      "title": "Lorem Ipsum Generator",
      "desc": "Generate dummy placeholder text.",
      "href": "/tools/lorem-ipsum-generator",
      "emoji": "🏛️"
    },
    {
      "title": "Regex Tester",
      "desc": "Test regular expressions and patterns.",
      "href": "/tools/regex-tester",
      "emoji": "🔍"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Word and Character Counter",
        "url": "https://www.allformatter.com/tools/word-counter",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "description": "Count words, characters, sentences, and paragraphs in real-time. Free online word counter with reading time estimation. Perfect for essays and SEO.",
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
        Word & Character <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Counter</span>
      </>}
      description={<>
        Instantly count words, characters, and paragraphs in your text for free.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our Word Counter?" featureColor="cyan"
      faqs={faqs}
    >
      <WordCounter />
    </ToolLayout>
  );
}
