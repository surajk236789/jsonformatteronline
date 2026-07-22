import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "The Ultimate Guide to Regular Expressions (Regex) | AllFormatter",
  description: "Learn how to master regular expressions. We cover common patterns, capture groups, and how to test your regex safely using client-side tools.",
  alternates: { canonical: "https://www.allformatter.com/blogs/regex-tester-guide" },
  openGraph: {
    title: "The Ultimate Guide to Regular Expressions (Regex)",
    description: "Learn how to master regular expressions. We cover common patterns, capture groups, and how to test your regex safely using client-side tools.",
    url: "https://www.allformatter.com/blogs/regex-tester-guide",
    siteName: "AllFormatter",
    type: "article",
  },
};

export default function RegexTesterGuide() {
  return (
    <div className="min-h-screen bg-background selection:bg-indigo-500/30">
      <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-24">
        {/* Navigation */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-8 md:mb-12 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
              Guide
            </span>
            <time className="text-sm text-secondary font-medium" dateTime="2026-07-22">
              July 22, 2026
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] mb-6">
            The Ultimate Guide to Regular Expressions (Regex)
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            Master the art of pattern matching. Learn the basics of regex, common patterns, and how to debug them effectively.
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none">
          <p>
            Regular expressions (often called <strong>regex</strong> or <strong>regexp</strong>) are a sequence of characters that define a search pattern. They are an incredibly powerful tool for any developer, data scientist, or IT professional. Whether you need to validate an email address, extract phone numbers from a document, or find and replace text across a large codebase, regex is the answer.
          </p>

          <h2>Why Learn Regex?</h2>
          <p>
            While regex syntax can look intimidating—like a random string of punctuation—it is universally supported across almost all programming languages, command-line tools, and text editors. Learning it once pays dividends throughout your entire career.
          </p>

          <h2>Core Concepts</h2>
          <ul>
            <li><strong>Anchors:</strong> <code>^</code> matches the start of a string, and <code>$</code> matches the end.</li>
            <li><strong>Character Classes:</strong> <code>\d</code> matches any digit, <code>\w</code> matches any word character (alphanumeric + underscore), and <code>\s</code> matches any whitespace.</li>
            <li><strong>Quantifiers:</strong> <code>*</code> matches zero or more times, <code>+</code> matches one or more times, and <code>?</code> matches zero or one time.</li>
            <li><strong>Groups:</strong> Parentheses <code>()</code> group tokens together and create capture groups, allowing you to extract specific parts of a match.</li>
          </ul>

          <h2>Common Regex Patterns</h2>
          
          <h3>1. Email Validation</h3>
          <p>While a perfect email regex is incredibly complex, this simple version covers 99% of use cases:</p>
          <pre><code>{"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}</code></pre>

          <h3>2. Phone Number (US)</h3>
          <pre><code>{"^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"}</code></pre>
          <p>This pattern optionally matches parentheses around the area code, and allows dashes, dots, or spaces as separators.</p>

          <h2>How to Test and Debug Regex safely</h2>
          <p>
            Writing a regular expression from scratch is rarely a one-shot process. You need a way to test your pattern against sample text and see the results instantly.
          </p>
          <p>
            <strong>Security Warning:</strong> When testing regex against real production data, be careful not to paste sensitive information (like real emails, passwords, or PII) into random online tools that might log your data on their servers.
          </p>
          
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 my-8">
            <h3 className="text-indigo-900 dark:text-indigo-300 mt-0">Test Your Regex Client-Side</h3>
            <p className="text-indigo-800 dark:text-indigo-400 mb-6">
              We built a 100% client-side <strong>Regex Tester</strong> where you can debug your patterns safely. No data leaves your browser.
            </p>
            <Link href="/tools/regex-tester">
              <Button variant="primary" className="shadow-lg">
                Try the Regex Tester
              </Button>
            </Link>
          </div>

          <h2>Common Pitfalls</h2>
          <p>
            <strong>1. Catastrophic Backtracking:</strong> Poorly written regular expressions (usually involving nested quantifiers like <code>(a+)+</code>) can cause the regex engine to take an exponentially long time to fail a match. This can lead to ReDoS (Regular Expression Denial of Service) attacks.
          </p>
          <p>
            <strong>2. Forgetting to escape special characters:</strong> Characters like <code>.</code>, <code>*</code>, <code>+</code>, and <code>?</code> have special meanings in regex. If you want to match a literal period, you must escape it: <code>\.</code>.
          </p>
        </article>
      </main>
    </div>
  );
}
