import React from "react";
import type { Metadata } from "next";

import LoremIpsumGenerator from "@/app/components/LoremIpsumGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator Online",
  description: "Generate Lorem Ipsum placeholder text for your designs, mockups, and websites. Customize paragraphs, words, and sentences. Copy plain text or HTML.",
  keywords: ["Lorem Ipsum", "Dummy Text", "Placeholder Text", "Lorem Ipsum Generator", "HTML Lorem Ipsum"],
  alternates: { canonical: "https://www.allformatter.com/tools/lorem-ipsum-generator" },
  openGraph: {
    title: "Free Lorem Ipsum Generator Online",
    description: "Generate Lorem Ipsum placeholder text for your designs, mockups, and websites. Customize paragraphs, words, and sentences. Copy plain text or HTML.",
    url: "https://www.allformatter.com/tools/lorem-ipsum-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Lorem Ipsum Generator Online",
    description: "Generate Lorem Ipsum placeholder text for your designs, mockups, and websites. Customize paragraphs, words, and sentences. Copy plain text or HTML.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Generation", desc: "Generate placeholder text instantly without reloading the page." },
  { emoji: "⚙️", title: "Highly Customizable", desc: "Choose exactly how many paragraphs, sentences, or words you need." },
  { emoji: "🌐", title: "HTML Mode", desc: "Automatically wrap your generated text in HTML <p> tags for easy copy-pasting into your code." },
  { emoji: "📋", title: "One-Click Copy", desc: "Copy the entire generated output to your clipboard with a single click." },
];

const faqs = [
  { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s." },
  { q: "Why do we use it?", a: "It has a more-or-less normal distribution of letters, making it look like readable English. If you use 'Content here, content here', the reader gets distracted by the words rather than looking at the layout." },
  { q: "Does this text mean anything?", a: "No. While it is derived from a real Latin text written by Cicero in 45 BC, words have been altered, added, and removed to make it nonsensical." },
];


const contentBlocks = [
  {
    title: "What is Lorem Ipsum?",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s, used to demonstrate the visual form of a document or typeface without relying on meaningful content."
  },
  {
    title: "How to Generate Text",
    body: "Select whether you want to generate paragraphs, sentences, or words, and specify the quantity. The tool will instantly generate the requested amount of filler text for you to use in your mockups."
  }
];

export default function LoremIpsumGeneratorPage() {
  const relatedTools = [
    {
      "title": "HTML Beautifier",
      "desc": "Format your HTML structure.",
      "href": "/tools/html-beautifier",
      "emoji": "🎨"
    },
    {
      "title": "Word Counter",
      "desc": "Count words and characters in text.",
      "href": "/tools/word-counter",
      "emoji": "📝"
    },
    {
      "title": "Markdown to HTML",
      "desc": "Convert MD to clean HTML.",
      "href": "/tools/markdown-to-html",
      "emoji": "🔄"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Lorem Ipsum Generator",
        "url": "https://www.allformatter.com/tools/lorem-ipsum-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Generate Lorem Ipsum placeholder text for your designs, mockups, and websites. Customize paragraphs, words, and sentences. Copy plain text or HTML.",
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
        Lorem Ipsum <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Generator</span>
      </>}
      description={<>
        Create custom placeholder text for your websites and designs in seconds.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our Generator?" featureColor="teal"
      faqs={faqs}
    >
      <LoremIpsumGenerator />
    </ToolLayout>
  );
}
