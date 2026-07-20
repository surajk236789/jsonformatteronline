import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import HtmlToJsx from "@/app/components/HtmlToJsx";

export const metadata: Metadata = {
  title: "HTML to JSX Converter Online",
  description: "Convert HTML markup to React JSX instantly. Handles class→className, inline styles, self-closing tags, and all JSX syntax differences automatically.",
  keywords: ["HTML to JSX", "Convert HTML to React", "HTML JSX Converter", "React Component HTML", "JSX Syntax Converter"],
  alternates: { canonical: "https://www.allformatter.com/tools/html-to-jsx" },
  openGraph: {
    title: "HTML to JSX Converter Online",
    description: "Convert HTML markup to React JSX instantly. Handles class→className, inline styles, self-closing tags, and all JSX syntax differences automatically.",
    url: "https://www.allformatter.com/tools/html-to-jsx",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML to JSX Converter Online",
    description: "Convert HTML markup to React JSX instantly. Handles class→className, inline styles, self-closing tags, and all JSX syntax differences automatically.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚛️", title: "Full JSX Conversion", desc: "Converts class to className, for to htmlFor, inline style strings to objects, and handles all self-closing tags." },
  { emoji: "🎯", title: "React-Ready Output", desc: "Paste the output directly into your React component — no manual edits needed for most standard HTML." },
  { emoji: "🔒", title: "Fully Private", desc: "Conversion happens entirely in your browser. Your HTML code is never sent to any server." },
  { emoji: "⚡", title: "Instant Conversion", desc: "Get JSX output immediately as you paste — no form submissions or extra steps." },
];

const faqs = [
  { q: "What's different between HTML and JSX?", a: "JSX is React's syntax extension. Key differences include: class becomes className, for becomes htmlFor, self-closing tags like <br> become <br />, and inline styles are objects not strings." },
  { q: "Will it handle all HTML attributes?", a: "Most standard attributes are converted automatically. Some custom or data-* attributes may need minor adjustments. Event handlers like onclick should be converted to onClick manually or via code review." },
  { q: "Can I paste multi-element HTML?", a: "Yes, but JSX requires a single root element. If your HTML has multiple top-level elements, the converter will wrap them in a React Fragment (<> </>) automatically." },
  { q: "Does it work with Tailwind CSS classes?", a: "Yes. All class values (including long Tailwind class strings) are simply moved into className attributes without any modification to the class names themselves." },
];

export default function HtmlToJsxPage() {
  const relatedTools = [
    {
        "title": "URL Encode/Decode",
        "desc": "Encode or decode URL components.",
        "href": "/tools/url-encode-decode",
        "emoji": "🔗"
    },
    {
        "title": "CSV to JSON",
        "desc": "Convert CSV to JSON arrays.",
        "href": "/tools/csv-to-json",
        "emoji": "📊"
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
        "name": "HTML to JSX Converter Online",
        "url": "https://www.allformatter.com/tools/html-to-jsx",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert HTML markup to React JSX instantly. Handles class→className, inline styles, self-closing tags, and all JSX syntax differences automatically.",
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
          HTML to JSX <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Convert HTML to React JSX instantly — handles className, htmlFor, self-closing tags, and all JSX syntax rules automatically.
        </p>
      </div>

      <HtmlToJsx />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our HTML to JSX Converter?" color="blue" />

      <FaqSection faqs={faqs} />
      </>
  );
}
