import React from "react";
import type { Metadata } from "next";
import ToolLayout from "@/app/components/ToolLayout";

import SeoChecker from "@/app/components/SeoChecker";

export const metadata: Metadata = {
  title: "Free SEO Checker & Website Analyzer",
  description: "Analyze any website's on-page SEO. Check title tags, meta descriptions, headings, image alts, and OpenGraph social tags instantly in your browser.",
  keywords: ["SEO Checker", "SEO Analyzer", "Website SEO Test", "On-page SEO Checker", "Check Meta Tags"],
  alternates: { canonical: "https://www.allformatter.com/tools/seo-checker" },
  openGraph: {
    title: "Free SEO Checker & Website Analyzer",
    description: "Analyze any website's on-page SEO. Check title tags, meta descriptions, headings, image alts, and OpenGraph social tags instantly in your browser.",
    url: "https://www.allformatter.com/tools/seo-checker",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SEO Checker & Website Analyzer",
    description: "Analyze any website's on-page SEO. Check title tags, meta descriptions, headings, image alts, and OpenGraph social tags instantly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Analysis", desc: "Get a comprehensive on-page SEO report for any public URL in seconds." },
  { emoji: "🏷️", title: "Meta Tags", desc: "Analyze the length and content of title tags and meta descriptions against SEO best practices." },
  { emoji: "🔗", title: "Social Graph", desc: "Check if the website is properly configured for sharing on social media with OpenGraph tags." },
  { emoji: "🖼️", title: "Image Alts", desc: "Identify images that are missing 'alt' attributes, which is critical for accessibility and image SEO." },
];

const faqs = [
  { q: "What does this SEO Checker analyze?", a: "It analyzes critical on-page SEO factors including the Title Tag, Meta Description, Headings (H1, H2), Word Count, Keyword Density, Canonical Tag, OpenGraph (social) tags, Robots meta directives, and Image Alt Attributes. It provides actionable recommendations for any missing or suboptimal elements." },
  { q: "Why is the Title Tag important?", a: "The Title tag is one of the strongest ranking signals for search engines. It also determines the clickable headline displayed in search results. A well-crafted title tag improves both rankings and click-through rates (CTR)." },
  { q: "What are OpenGraph tags?", a: "OpenGraph (og:) tags dictate how your website appears when shared on social media platforms like Facebook, Twitter, and LinkedIn. Having proper og:title, og:description, and og:image tags drastically improves social engagement." },
  { q: "Why do images need alt attributes?", a: "Alt attributes provide a text alternative for search engines to understand what the image depicts. They are crucial for image search rankings and for visually impaired users using screen readers." },
];

export default function SeoCheckerPage() {
  const relatedTools = [
    {
        "title": "JSON Compare",
        "desc": "Compare two JSON objects side-by-side.",
        "href": "/tools/json-compare",
        "emoji": "⚖️"
    },
    {
        "title": "YAML to JSON",
        "desc": "Convert YAML to JSON format.",
        "href": "/tools/yaml-to-json",
        "emoji": "📝"
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
        "name": "SEO Checker and Website Analyzer",
        "url": "https://www.allformatter.com/tools/seo-checker",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Analyze any website's on-page SEO. Check title tags, meta descriptions, headings, image alts, and OpenGraph social tags instantly.",
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
              Free SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Checker</span>
            </>}
      description={<>
              Enter a URL below to instantly analyze on-page SEO factors, meta tags, and content structure.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our SEO Analyzer?" featureColor="indigo"
      faqs={faqs}
    >
      <SeoChecker />
    </ToolLayout>
  );
}
