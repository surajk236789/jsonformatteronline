import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "Why Markdown is the Standard for Developer Documentation | AllFormatter",
  description: "Explore the history of Markdown, why it overtook WYSIWYG editors, and how tools convert it to HTML under the hood.",
  alternates: { canonical: "https://www.allformatter.com/blogs/markdown-to-html-guide" },
  openGraph: {
    title: "Why Markdown is the Standard for Developer Documentation",
    description: "Explore the history of Markdown, why it overtook WYSIWYG editors, and how tools convert it to HTML under the hood.",
    url: "https://www.allformatter.com/blogs/markdown-to-html-guide",
    siteName: "AllFormatter",
    type: "article",
  },
};

export default function MarkdownToHtmlGuide() {
  return (
    <div className="min-h-screen bg-background selection:bg-blue-500/30">
      <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-24">
        {/* Navigation */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-8 md:mb-12 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              Web Development
            </span>
            <time className="text-sm text-secondary font-medium" dateTime="2026-07-22">
              July 22, 2026
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] mb-6">
            Why Markdown is the Standard for Developer Documentation
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            From GitHub READMEs to static site generators, Markdown is everywhere. Here is why developers prefer it over rich text editors, and how to convert it to HTML.
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none">
          <p>
            Created by John Gruber in 2004, Markdown was designed with one specific goal in mind: <strong>to be easy to read in its raw state.</strong>
          </p>
          <p>
            Unlike HTML, which is cluttered with <code>&lt;tags&gt;</code> that make it difficult for humans to quickly scan, Markdown uses familiar punctuation marks to format text. A word surrounded by asterisks becomes bold. A line starting with a hash becomes a heading.
          </p>

          <h2>The Problem with WYSIWYG</h2>
          <p>
            Before Markdown took over, content management systems relied heavily on WYSIWYG (What You See Is What You Get) editors. While these editors are great for non-technical users, developers hate them for several reasons:
          </p>
          <ul>
            <li><strong>Bloated Output:</strong> WYSIWYG editors often generate terrible, inline-styled HTML that is a nightmare to clean up.</li>
            <li><strong>Keyboard Flow:</strong> To make a word bold in a WYSIWYG editor, you have to take your hands off the keyboard, use the mouse to highlight the word, and click a 'B' icon. In Markdown, you just type <code>**bold**</code> and keep writing.</li>
            <li><strong>Version Control:</strong> Markdown is just plain text. This means it works perfectly with Git. You can easily diff two versions of a Markdown file to see exactly what changed. Diffing the output of a WYSIWYG editor is almost impossible.</li>
          </ul>

          <h2>How Markdown Converts to HTML</h2>
          <p>
            While Markdown is great for writing, browsers don't understand it. To display a Markdown document on a webpage, it must be compiled into HTML.
          </p>
          <p>
            This is usually done using a parsing library (like <code>marked</code> or <code>markdown-it</code> in the JavaScript ecosystem). The parser reads the plain text, identifies the syntax tokens (like a <code>#</code> symbol), and maps them to their equivalent HTML elements (like an <code>&lt;h1&gt;</code> tag).
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 my-8">
            <h3 className="text-blue-900 dark:text-blue-300 mt-0">Convert Markdown Instantly</h3>
            <p className="text-blue-800 dark:text-blue-400 mb-6">
              Need to quickly grab the HTML equivalent of your Markdown document? Our free tool converts Markdown to sanitized HTML in real-time.
            </p>
            <Link href="/tools/markdown-to-html">
              <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                Open Converter
              </Button>
            </Link>
          </div>

          <h2>Security Warning: XSS</h2>
          <p>
            Because Markdown allows you to embed raw HTML directly within the document, it can be a significant vector for Cross-Site Scripting (XSS) attacks. If you allow users to submit Markdown on your application, and you compile and render that Markdown on your frontend, a malicious user could embed a <code>&lt;script&gt;</code> tag in their Markdown.
          </p>
          <p>
            To prevent this, you must <strong>always sanitize the output HTML</strong> before injecting it into the DOM. The industry standard tool for this in JavaScript is DOMPurify, which strips out any dangerous scripts or event handlers from the HTML string.
          </p>
        </article>
      </main>
    </div>
  );
}
