import React from "react";
import ToolHeader from "@/app/components/ToolHeader";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const HtmlBeautifier = dynamic(() => import("@/app/components/HtmlBeautifier"), {

  loading: () => (
    <div className="w-full h-80 flex items-center justify-center bg-panel border border-panel-border rounded-xl">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "HTML Beautifier & Formatter Online",
  description: "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
  keywords: ["HTML Beautifier", "HTML Formatter", "Clean HTML Online", "Format HTML Code", "HTML Parser"],
  alternates: { canonical: "https://www.allformatter.com/tools/html-beautifier" },
  openGraph: {
    title: "HTML Beautifier & Formatter Online",
    description: "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
    url: "https://www.allformatter.com/tools/html-beautifier",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Beautifier & Formatter Online",
    description: "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🎨", title: "Auto Indentation", desc: "Automatically formats nested tags with consistent 2-space indentation for crystal-clear structure." },
  { emoji: "🔒", title: "100% Private", desc: "All formatting runs in your browser. No HTML is sent to any server." },
  { emoji: "⚡", title: "Instant Results", desc: "Paste your HTML and get a formatted output instantly — no delays, no page reloads." },
  { emoji: "🧹", title: "Clean Messy Markup", desc: "Strips inline formatting chaos and restructures your code into a clean, maintainable format." },
];

const faqs = [
  { q: "What does an HTML Beautifier do?", a: "It takes minified or poorly formatted HTML and restructures it with proper indentation and line breaks, making it easy to read, maintain, and debug." },
  { q: "Does it fix invalid HTML?", a: "The beautifier formats your HTML as-is without rewriting invalid tags. For validation, use an HTML validator tool alongside it." },
  { q: "Is this safe to use for private code?", a: "Yes — all processing is done entirely in your browser using JavaScript. Nothing is uploaded to any server." },
  { q: "Can I use it to format HTML inside JSX?", a: "For JSX-specific formatting, use our HTML to JSX converter. This tool is optimized for standard HTML5 markup." },
];

export default function HtmlBeautifierPage() {
  const relatedTools = [
    {
        "title": "JSON Compare",
        "desc": "Compare two JSON objects side-by-side.",
        "href": "/tools/json-compare",
        "emoji": "⚖️"
    },
    {
        "title": "Password Generator",
        "desc": "Generate strong, secure passwords.",
        "href": "/tools/password-generator",
        "emoji": "🛡️"
    },
    {
        "title": "JSON Schema Validator",
        "desc": "Validate JSON against a Schema.",
        "href": "/tools/json-schema-validator",
        "emoji": "✅"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "HTML Beautifier and Formatter Online",
        "url": "https://www.allformatter.com/tools/html-beautifier",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
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
              HTML Beautifier &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Formatter</span>
            </>
          }
          description={
            <>
              Clean, indent, and format your messy HTML instantly — fully private, no server uploads.
            </>
          }
        />

      <HtmlBeautifier />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our HTML Beautifier?" color="blue" />

      <FaqSection faqs={faqs} />
      </>
  );
}
