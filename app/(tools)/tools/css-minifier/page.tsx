import React from "react";
import type { Metadata } from "next";

import CssMinifier from "@/app/components/CssMinifier";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "CSS Minifier & Compressor Online",
  description: "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
  keywords: ["CSS Minifier", "Compress CSS", "Minify CSS Online", "CSS Optimizer", "Reduce CSS Size"],
  alternates: { canonical: "https://www.allformatter.com/tools/css-minifier" },
  openGraph: {
    title: "CSS Minifier & Compressor Online",
    description: "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
    url: "https://www.allformatter.com/tools/css-minifier",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Minifier & Compressor Online",
    description: "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "💨", title: "Maximum Compression", desc: "Strips all whitespace, comments, and unnecessary characters to produce the smallest possible CSS output." },
  { emoji: "📊", title: "Size Reduction Stats", desc: "See exactly how many bytes you saved and the percentage reduction after minification." },
  { emoji: "🔒", title: "Fully Private", desc: "All minification runs locally in your browser. Your CSS is never sent to any server." },
  { emoji: "⚡", title: "Instant Results", desc: "Paste your CSS and get minified output immediately — no delays, no page reloads." },
];

const faqs = [
  { q: "Why minify CSS?", a: "Minified CSS has smaller file sizes, which means faster page loads, lower bandwidth usage, and better Core Web Vitals scores — all of which directly impact SEO rankings and user experience." },
  { q: "Will minified CSS still work correctly?", a: "Yes. Minification only removes unnecessary whitespace and comments. It does not change how the CSS rules apply — your styles will behave exactly the same." },
  { q: "Should I minify CSS in development?", a: "No — keep readable CSS during development for easy debugging. Minify only in your production build, typically using your build tool (webpack, Vite, etc.) automatically." },
  { q: "Does it handle CSS variables and custom properties?", a: "Yes. Modern CSS features including variables (--custom-property), calc(), clamp(), grid, and flexbox are fully preserved during minification." },
];

export default function CssMinifierPage() {
  const relatedTools = [
    {
        "title": "Base64 Encode/Decode",
        "desc": "Encode text to Base64 or decode it.",
        "href": "/tools/base64-encode-decode",
        "emoji": "🔐"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
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
        "name": "CSS Minifier",
        "url": "https://www.allformatter.com/tools/css-minifier",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
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
              CSS Minifier &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Compressor</span>
            </>}
      description={<>
              Compress and minify your CSS code to reduce file size and improve page load speed — instantly in your browser.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our CSS Minifier?" featureColor="blue"
      faqs={faqs}
    >
      <CssMinifier />
    </ToolLayout>
  );
}
