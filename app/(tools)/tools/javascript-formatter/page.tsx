import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/app/components/ToolLayout";
import JsFormatter from "@/app/components/JsFormatter";

export const metadata: Metadata = {
  title: "JavaScript Formatter & Beautifier Online",
  description: "Format, beautify, and minify your JavaScript code instantly in your browser. 100% secure and private.",
  keywords: ["JavaScript formatter", "JS beautifier", "JS minifier", "format JS online", "minify JavaScript"],
  alternates: { canonical: "https://www.allformatter.com/tools/javascript-formatter" },
  openGraph: {
    title: "JavaScript Formatter & Beautifier Online",
    description: "Format, beautify, and minify your JavaScript code instantly in your browser.",
    url: "https://www.allformatter.com/tools/javascript-formatter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Formatter & Beautifier Online",
    description: "Format, beautify, and minify your JavaScript code instantly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  }
};


const faqs = [
  { q: "Does this tool save my JavaScript code?", a: "No. All formatting happens client-side in your browser. Your code is never sent to our servers." },
  { q: "Can this fix syntax errors in my JS?", a: "The formatter organizes and beautifies your code, but it cannot fix broken logic or missing brackets." },
  { q: "Does it support modern ES6+ syntax?", a: "Yes, the formatter supports all modern JavaScript features including arrow functions, classes, and async/await." }
];

export default function JavascriptFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
    "name": "JavaScript Formatter and Minifier",
    "url": "https://www.allformatter.com/tools/javascript-formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Format, beautify, and minify your JavaScript code instantly in your browser.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
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
    <ToolLayout faqs={faqs}
      title={<>JavaScript <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Formatter & Minifier</span></>}
      description={<>Instantly beautify or minify your JS code. All processing happens entirely in your browser.</>}
      jsonLd={jsonLd}
    >
      <JsFormatter />
    </ToolLayout>
  );
}
