import React from "react";
import type { Metadata } from "next";

import MetaTagGenerator from "@/app/components/MetaTagGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Free Meta Tag Generator for SEO Online",
  description: "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
  keywords: ["Meta Tag Generator", "SEO Tags", "OpenGraph Generator", "Twitter Card Generator", "Create Meta Tags"],
  alternates: { canonical: "https://www.allformatter.com/tools/meta-tag-generator" },
  openGraph: {
    title: "Free Meta Tag Generator for SEO Online",
    description: "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
    url: "https://www.allformatter.com/tools/meta-tag-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Generator for SEO Online",
    description: "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
  },
  robots: {
    index: true,
    follow: true,
  }
};


const faqs = [
  { q: "Do meta tags still matter for SEO?", a: "Yes. While keywords are less important, Title, Description, and OpenGraph tags are critical for click-through rates and social sharing." },
  { q: "What is an OpenGraph tag?", a: "OpenGraph tags control how your website appears when shared on social media platforms like Facebook, Twitter, and LinkedIn." },
  { q: "How long should a meta description be?", a: "Meta descriptions should generally be between 150-160 characters to avoid being truncated by search engines." }
];


const contentBlocks = [
  {
    title: "Why are Meta Tags Important?",
    body: "Meta tags provide data about your webpage to search engines and website visitors. They are crucial for SEO, determining how your page appears in search engine results and when shared on social media networks."
  },
  {
    title: "How to Generate Meta Tags",
    body: "Fill in the form fields with your website's title, description, image URL, and author. The tool will automatically generate standard HTML meta tags, OpenGraph tags for Facebook, and Twitter Card tags."
  }
];

export default function Page() {
  const relatedTools = [
    {
      "title": "Hash Generator",
      "desc": "Generate MD5, SHA-1, SHA-256 hashes.",
      "href": "/tools/hash-generator",
      "emoji": "#️⃣"
    },
    {
      "title": "JWT Decoder",
      "desc": "Decode JSON Web Tokens instantly.",
      "href": "/tools/jwt-decoder",
      "emoji": "🔑"
    },
    {
      "title": "Base64 Encode/Decode",
      "desc": "Encode text to Base64 or decode it.",
      "href": "/tools/base64-encode-decode",
      "emoji": "🔐"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
    "name": "Meta Tag Generator",
    "url": "https://www.allformatter.com/tools/meta-tag-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
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
    <ToolLayout contentBlocks={contentBlocks} faqs={faqs}
      title={<>
        Meta Tag <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
      </>}
      description={<>
        Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
    >
      <MetaTagGenerator />
    </ToolLayout>
  );
}
