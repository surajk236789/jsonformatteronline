import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

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
  { q: "What does this SEO Checker analyze?", a: "It analyzes critical on-page SEO factors including the Title tag, Meta Description, H1-H6 heading distribution, OpenGraph tags for social media, Image 'alt' attributes, and total word count." },
  { q: "Why is the Title Tag important?", a: "The Title tag is one of the strongest ranking factors for search engines. It should accurately describe the page content and be between 30 and 60 characters to prevent truncation in search results." },
  { q: "What are OpenGraph tags?", a: "OpenGraph (og:) tags dictate how your website appears when shared on social media platforms like Facebook, Twitter, and LinkedIn. Having an og:image, og:title, and og:description is highly recommended." },
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
        "href": "/tools/json-beautifier",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          Free SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Checker</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Enter a URL below to instantly analyze on-page SEO factors, meta tags, and content structure.
        </p>
      </div>

      <SeoChecker />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our SEO Analyzer?" color="indigo" />

      <FaqSection faqs={faqs} />
      </>
  );
}
