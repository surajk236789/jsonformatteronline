import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import CronParser from "@/app/components/CronParser";

export const metadata: Metadata = {
  title: "Online Cron Parser & Generator",
  description: "Parse and explain cron expressions in plain English. Generate cron schedules visually and see the next run times. Free, browser-based cron parser.",
  keywords: ["Cron Parser", "Cron Expression", "Cron Generator", "Cron Schedule", "Parse Cron Online", "Cron Job Tester", "crontab"],
  alternates: { canonical: "https://www.allformatter.com/tools/cron-parser" },
  openGraph: {
    title: "Online Cron Parser & Generator",
    description: "Parse and explain cron expressions in plain English. Generate cron schedules visually and see the next run times.",
    url: "https://www.allformatter.com/tools/cron-parser",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Cron Parser & Generator",
    description: "Parse and explain cron expressions in plain English. Generate cron schedules visually and see the next run times.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  }
};

const features = [
  { emoji: "⏰", title: "Plain English Explanation", desc: "Paste any cron expression and instantly see a human-readable description of what it does — no guesswork." },
  { emoji: "📅", title: "Next Run Times", desc: "See the next N scheduled execution times so you can verify your cron is set up correctly before deploying." },
  { emoji: "🎯", title: "Visual Builder", desc: "Build cron expressions visually by selecting fields — no need to memorize the 5-field cron syntax." },
  { emoji: "🔒", title: "Fully Private", desc: "All parsing happens in your browser. Your cron schedules are never sent to any server." },
];

const faqs = [
  { q: "What is a cron expression?", a: "A cron expression is a string of 5 (or 6) space-separated fields that define a recurring schedule: minute, hour, day-of-month, month, and day-of-week. For example, '0 9 * * 1' means every Monday at 9:00 AM." },
  { q: "What does * mean in a cron expression?", a: "An asterisk (*) means 'every' for that field. '* * * * *' means 'every minute of every hour of every day'." },
  { q: "How do I run a job every 15 minutes?", a: "Use '*/15 * * * *'. The */ syntax means 'every N units'. Similarly, '*/5 * * * *' runs every 5 minutes." },
  { q: "What's the difference between 5-field and 6-field cron?", a: "Standard Unix cron uses 5 fields (minute through day-of-week). Some tools like AWS and Kubernetes add a 6th field for seconds at the start, or a year field at the end." },
];

export default function CronParserPage() {
  const relatedTools = [
    {
        "title": "Password Generator",
        "desc": "Generate strong, secure passwords.",
        "href": "/tools/password-generator",
        "emoji": "🛡️"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    },
    {
        "title": "JSON to XML",
        "desc": "Convert JSON to well-formed XML.",
        "href": "/tools/json-to-xml",
        "emoji": "🔄"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Cron Expression Parser & Generator",
        "url": "https://www.allformatter.com/tools/cron-parser",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Parse and explain cron expressions in plain English. Generate cron schedules visually and see the next run times.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          Cron Expression <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Parser</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Understand and build cron expressions in plain English — see the next run times and verify your schedule before deploying.
        </p>
      </div>

      <CronParser />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our Cron Parser?" color="amber" />

      <FaqSection faqs={faqs} />
      </>
  );
}
