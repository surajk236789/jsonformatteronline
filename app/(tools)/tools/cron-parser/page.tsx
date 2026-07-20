import React from "react";
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
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mb-4">
          ⏰ Utility
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Cron Expression <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Parser</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Understand and build cron expressions in plain English — see the next run times and verify your schedule before deploying.
        </p>
      </div>

      <CronParser />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our Cron Parser?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto" aria-label="FAQ">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5 rounded-2xl border border-panel-border bg-panel [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-primary list-none">
                <span>{faq.q}</span>
                <span className="transition duration-300 group-open:-rotate-180 text-secondary">
                  <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-xs text-secondary leading-relaxed mt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
