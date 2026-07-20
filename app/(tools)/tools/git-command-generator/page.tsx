import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import GitCommandGenerator from "@/app/components/GitCommandGenerator";
import ToolHeader from "@/app/components/ToolHeader";

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
  const relatedTools = [
    {
        "title": "JSON Compare",
        "desc": "Compare two JSON objects side-by-side.",
        "href": "/tools/json-compare",
        "emoji": "⚖️"
    },
    {
        "title": "CSS Minifier",
        "desc": "Minify CSS code and reduce size.",
        "href": "/tools/css-minifier",
        "emoji": "🎨"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    }
];

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
      <ToolHeader 
          title={
            <>
              Git Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>
          }
          description={
            <>
              Build Git commands visually without memorizing syntax — select your operation, copy the command, and run it.
            </>
          }
        />

      <GitCommandGenerator />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our Git Command Generator?" color="slate" />

      <FaqSection faqs={faqs} />
      </>
  );
}
