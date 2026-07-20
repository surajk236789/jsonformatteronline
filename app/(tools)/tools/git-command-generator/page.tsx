import React from "react";
import type { Metadata } from "next";

import GitCommandGenerator from "@/app/components/GitCommandGenerator";

export const metadata: Metadata = {
  title: "Git Command Generator Online",
  description: "Generate complex Git commands visually without memorizing syntax. Select the operation and options, then copy the ready-to-run command.",
  keywords: ["Git Command Generator", "Git Commands Online", "Generate Git Commands", "Git Helper Tool", "Git Cheat Sheet"],
  alternates: { canonical: "https://www.allformatter.com/tools/git-command-generator" },
  openGraph: {
    title: "Git Command Generator Online",
    description: "Generate complex Git commands visually without memorizing syntax. Select the operation and options, then copy the ready-to-run command.",
    url: "https://www.allformatter.com/tools/git-command-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Command Generator Online",
    description: "Generate complex Git commands visually without memorizing syntax. Select the operation and options, then copy the ready-to-run command.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🐙", title: "Visual Command Builder", desc: "Select the Git operation and options visually, then get the exact command string ready to paste in your terminal." },
  { emoji: "📋", title: "One-Click Copy", desc: "Copy the generated command to your clipboard instantly — no manual typing of complex flags and options." },
  { emoji: "📚", title: "Command Explanations", desc: "Every generated command comes with a plain-English explanation of what it does and what to expect." },
  { emoji: "🎯", title: "Common Workflows", desc: "Covers the most common Git workflows: branching, merging, rebasing, stashing, cherry-picking, and more." },
];

const faqs = [
  { q: "Who is this tool for?", a: "Both beginners who are still learning Git syntax and experienced developers who occasionally need to look up less common flags or advanced command combinations." },
  { q: "Does it cover Git advanced commands?", a: "Yes. Beyond the basics (commit, push, pull), it covers rebase, cherry-pick, bisect, reflog, stash, worktree, and more complex multi-flag commands." },
  { q: "Can I trust these commands to run safely?", a: "Always review the generated command before running it, especially for destructive operations like reset --hard, force push, or branch deletion. The tool shows what each command does before you copy it." },
  { q: "Does it require any login or extension?", a: "No. The tool runs entirely in your browser with no account, no extension, and no server-side processing required." },
];

export default function GitCommandGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Git Command Generator Online",
        "url": "https://www.allformatter.com/tools/git-command-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Generate complex Git commands visually without memorizing syntax. Select the operation and options, then copy the ready-to-run command.",
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
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
          🐙 Generator
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Git Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Build Git commands visually without memorizing syntax — select your operation, copy the command, and run it.
        </p>
      </div>

      <GitCommandGenerator />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our Git Command Generator?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-slate-400/40 hover:shadow-lg hover:shadow-slate-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
