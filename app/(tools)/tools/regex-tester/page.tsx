import React from "react";
import type { Metadata } from "next";

import RegexTester from "@/app/components/RegexTester";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Regex Tester & Debugger Online",
  description: "Test and debug regular expressions online with real-time matching, capture group highlighting, and common regex patterns. 100% client-side, no data stored.",
  keywords: ["Regex Tester", "Regular Expression Tester", "Online Regex", "Regex Generator", "Debug Regex"],
  alternates: { canonical: "https://www.allformatter.com/tools/regex-tester" },
  openGraph: {
    title: "Regex Tester & Debugger Online",
    description: "Test and debug regular expressions online with real-time matching, capture group highlighting, and common regex patterns. 100% client-side, no data stored.",
    url: "https://www.allformatter.com/tools/regex-tester",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Tester & Debugger Online",
    description: "Test and debug regular expressions online with real-time matching, capture group highlighting, and common regex patterns. 100% client-side, no data stored.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Real-time Testing", desc: "See matches instantly as you type your regex pattern or test string." },
  { emoji: "🎯", title: "Capture Groups", desc: "Clearly see all capture groups extracted from your matched strings." },
  { emoji: "🔒", title: "Secure & Private", desc: "All regex testing happens in your browser. Your data is never uploaded to any external server." },
  { emoji: "🚩", title: "Regex Flags", desc: "Easily toggle flags like global (g), case-insensitive (i), multiline (m), and more." },
];

const faqs = [
  { q: "What is a regular expression (regex)?", a: "A regular expression is a sequence of characters that specifies a search pattern in text. It's used by string-searching algorithms for 'find' or 'find and replace' operations." },
  { q: "Is this tool safe for sensitive data?", a: "Yes. This Regex Tester is 100% client-side. Your regular expressions and test strings are never sent to any server, making it completely safe for sensitive data." },
  { q: "What regex engine does this use?", a: "This tool uses the standard JavaScript (ECMAScript) regular expression engine built into your web browser." },
  { q: "How do I use capture groups?", a: "Wrap a part of your pattern in parentheses like (pattern). The captured content will appear under the Match Results section." },
];


const contentBlocks = [
  {
    title: "What is a Regular Expression?",
    body: "A regular expression (regex) is a sequence of characters that specifies a search pattern. They are extremely powerful tools used in programming for string matching, validation, and advanced search-and-replace operations."
  },
  {
    title: "How to Test Regex Patterns",
    body: "Enter your regular expression in the top input and the text you want to search in the main editor. The tool will highlight all matches in real-time, helping you debug complex patterns."
  }
];

export default function RegexTesterPage() {
  const relatedTools = [
    {
        "title": "URL Encode/Decode",
        "desc": "Encode or decode URL components.",
        "href": "/tools/url-encode-decode",
        "emoji": "🔗"
    },
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "String to Base64",
        "desc": "Encode or decode Base64 strings.",
        "href": "/tools/base64-encode-decode",
        "emoji": "🔐"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Regex Tester & Debugger",
        "url": "https://www.allformatter.com/tools/regex-tester",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Test and debug regular expressions online with real-time matching, capture group highlighting, and common regex pattern library. 100% client-side, no data stored.",
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
    <ToolLayout contentBlocks={contentBlocks}
      title={<>
              Regex <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Tester</span>
            </>}
      description={<>
              Test and debug regular expressions online with real-time matching. Fast, secure, and 100% browser-based.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our Regex Tester?" featureColor="indigo"
      faqs={faqs}
    >
      <RegexTester />
    </ToolLayout>
  );
}
