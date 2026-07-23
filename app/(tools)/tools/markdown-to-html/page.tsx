import React from "react";
import type { Metadata } from "next";

import MarkdownToHtml from "@/app/components/MarkdownToHtml";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Free Markdown to HTML Converter Online",
  description: "Convert Markdown to clean, sanitized HTML online. Features side-by-side live preview and code output. 100% secure, browser-based converter.",
  keywords: ["Markdown to HTML", "Convert Markdown", "MD to HTML", "Markdown Preview", "Online Markdown Editor"],
  alternates: { canonical: "https://www.allformatter.com/tools/markdown-to-html" },
  openGraph: {
    title: "Free Markdown to HTML Converter Online",
    description: "Convert Markdown to clean, sanitized HTML online. Features side-by-side live preview and code output. 100% secure, browser-based converter.",
    url: "https://www.allformatter.com/tools/markdown-to-html",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Markdown to HTML Converter Online",
    description: "Convert Markdown to clean, sanitized HTML online. Features side-by-side live preview and code output. 100% secure, browser-based converter.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Live Conversion", desc: "Type your Markdown on the left and see the HTML output generated instantly on the right." },
  { emoji: "👀", title: "Visual Preview", desc: "Toggle between the raw HTML code output and a rendered visual preview of your document." },
  { emoji: "🛡️", title: "XSS Protection", desc: "All generated HTML is passed through DOMPurify to automatically strip out any malicious scripts or tags." },
  { emoji: "🔒", title: "100% Private", desc: "We don't send your documents to a server. Everything runs directly in your browser." },
];

const faqs = [
  { q: "What is Markdown?", a: "Markdown is a lightweight markup language that allows you to format text using standard keyboard symbols. For example, adding **asterisks** makes text bold. It's incredibly popular for writing documentation, README files, and blog posts." },
  { q: "Does this tool support GitHub Flavored Markdown (GFM)?", a: "Yes, this converter uses the 'marked' engine which fully supports tables, strikethrough, and other common GitHub Flavored Markdown extensions." },
  { q: "Is it safe to paste sensitive documents?", a: "Absolutely. This tool runs 100% locally in your web browser. Your text is never transmitted over the internet, stored in a database, or seen by our servers." },
];


const contentBlocks = [
  {
    title: "What is Markdown?",
    body: "Markdown is a lightweight markup language with plain-text formatting syntax. It is designed so that it can be converted to HTML and many other formats. It's widely used for readme files, forum discussions, and blogs."
  },
  {
    title: "How to Convert Markdown",
    body: "Type or paste your Markdown text into the left editor. The tool will instantly render a live visual preview of the formatted content and generate the raw HTML code on the right."
  }
];

export default function MarkdownToHtmlPage() {
  const relatedTools = [
    {
      "title": "HTML Beautifier",
      "desc": "Format and indent messy HTML code.",
      "href": "/tools/html-beautifier",
      "emoji": "🎨"
    },
    {
      "title": "HTML Entity Encoder",
      "desc": "Safely encode HTML special characters.",
      "href": "/tools/html-entity-encoder",
      "emoji": "🛡️"
    },
    {
      "title": "Text Diff",
      "desc": "Compare text documents side-by-side.",
      "href": "/tools/text-diff",
      "emoji": "📝"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Markdown to HTML Converter",
        "url": "https://www.allformatter.com/tools/markdown-to-html",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert Markdown to clean, sanitized HTML online. Features side-by-side live preview and code output. 100% secure, browser-based converter.",
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
        Markdown to HTML <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Converter</span>
      </>}
      description={<>
        Write Markdown and instantly export it as clean, sanitized HTML code.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our MD to HTML tool?" featureColor="blue"
      faqs={faqs}
    >
      <MarkdownToHtml />
    </ToolLayout>
  );
}
