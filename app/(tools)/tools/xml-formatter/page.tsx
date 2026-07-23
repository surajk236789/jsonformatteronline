import React from "react";
import type { Metadata } from "next";

import XmlFormatter from "@/app/components/XmlFormatter";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "XML Formatter & Beautifier Online",
  description: "Format, beautify, and validate XML documents online. Auto-indent, syntax check, and error highlighting. 100% client-side processing.",
  keywords: ["XML Formatter", "Beautify XML Online", "XML Validator", "Format XML", "Prettify XML"],
  alternates: { canonical: "https://www.allformatter.com/tools/xml-formatter" },
  openGraph: {
    title: "XML Formatter & Beautifier Online",
    description: "Format, beautify, and validate XML documents online. Auto-indent, syntax check, and error highlighting. 100% client-side processing.",
    url: "https://www.allformatter.com/tools/xml-formatter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XML Formatter & Beautifier Online",
    description: "Format, beautify, and validate XML documents online. Auto-indent, syntax check, and error highlighting. 100% client-side processing.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Beautification", desc: "Format messy, unreadable XML strings into clean, indented code instantly as you type." },
  { emoji: "✅", title: "Syntax Validation", desc: "Catch errors early. The tool will warn you if your XML is malformed or invalid." },
  { emoji: "🔒", title: "Secure & Private", desc: "All formatting and validation happens in your browser. Your data is never sent to a server." },
  { emoji: "⚙️", title: "Customizable", desc: "Adjust indentation spaces and toggle whether short text elements should be collapsed onto a single line." },
];

const faqs = [
  { q: "What does an XML Formatter do?", a: "An XML Formatter takes unformatted, minified, or messy XML code and organizes it by adding proper indentation and line breaks. This makes the nested tree structure of the XML document easy for humans to read and understand." },
  { q: "Is it safe to format sensitive XML data?", a: "Yes. This tool runs 100% locally in your web browser. Your XML data is never uploaded, stored, or processed on our servers." },
  { q: "How do I use the 'Collapse Short Elements' feature?", a: "When enabled, elements that contain only short text and no child elements (e.g., <name>John</name>) will be kept on a single line to save vertical space. When disabled, the opening tag, text, and closing tag will each get their own line." },
];

export default function XmlFormatterPage() {
  const relatedTools = [
    {
      "title": "JSON to XML",
      "desc": "Convert JSON structure into XML.",
      "href": "/tools/json-to-xml",
      "emoji": "🔄"
    },
    {
      "title": "HTML Beautifier",
      "desc": "Format and indent HTML code.",
      "href": "/tools/html-beautifier",
      "emoji": "🎨"
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
        "name": "XML Formatter & Validator",
        "url": "https://www.allformatter.com/tools/xml-formatter",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Format, beautify, and validate XML documents online. Auto-indent, syntax check, and error highlighting. 100% client-side processing.",
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
        XML <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Formatter</span>
      </>}
      description={<>
        Format, beautify, and validate XML documents online instantly. Secure, customizable, and 100% browser-based.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our XML Formatter?" featureColor="orange"
      faqs={faqs}
    >
      <XmlFormatter />
    </ToolLayout>
  );
}
