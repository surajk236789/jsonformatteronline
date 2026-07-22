import React from "react";
import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Blog | JSON, HTML & API Tips | AllFormatter",
  description:
    "Explore expert articles on JSON formatting, HTML beautification, Base64 encoding, API development tips, and more on AllFormatter. Level up your developer workflow.",
  keywords: [
    "AllFormatter blog",
    "JSON blog",
    "HTML beautifier tips",
    "API development",
    "developer tools blog",
    "JSON tips",
    "Base64 encoding guide",
  ],
  alternates: {
    canonical: "https://www.allformatter.com/blogs",
  },
};

const blogs = [
  {
    slug: "json-formatting-best-practices",
    title: "JSON Formatting Best Practices Every Developer Should Know",
    description:
      "Learn how proper JSON formatting improves API readability, reduces debugging time, and makes data exchange effortless across teams.",
    category: "JSON",
    categoryColor: "emerald",
    readTime: "5 min read",
    date: "June 28, 2026",
    emoji: "🗂️",
  },
  {
    slug: "html-beautifier-guide",
    title: "Why HTML Beautification Matters for Clean, Maintainable Code",
    description:
      "Messy HTML is a productivity killer. Discover why auto-formatting your HTML with consistent indentation and structure saves hours of manual work.",
    category: "HTML",
    categoryColor: "blue",
    readTime: "4 min read",
    date: "June 20, 2026",
    emoji: "🎨",
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained: From PDF to String and Back",
    description:
      "Understand how Base64 encoding works, why it's used to embed binary data in APIs and emails, and how to convert Base64 strings back to PDF files instantly.",
    category: "Base64",
    categoryColor: "indigo",
    readTime: "6 min read",
    date: "June 15, 2026",
    emoji: "🔐",
  },
  {
    slug: "json-vs-xml",
    title: "JSON vs XML: Which Data Format Should You Use in 2026?",
    description:
      "A comprehensive comparison of JSON and XML — their syntax, performance, use cases, and when to convert between the two for maximum compatibility.",
    category: "JSON & XML",
    categoryColor: "orange",
    readTime: "7 min read",
    date: "June 10, 2026",
    emoji: "⚖️",
  },
  {
    slug: "comparing-json-objects",
    title: "How to Compare JSON Objects Like a Pro",
    description:
      "Dive into techniques for diffing JSON data: visual comparison tools, deep equality checks, and how to spot subtle mismatches in complex API responses.",
    category: "JSON",
    categoryColor: "emerald",
    readTime: "5 min read",
    date: "May 30, 2026",
    emoji: "🔍",
  },
  {
    slug: "api-debugging-tips",
    title: "10 Pro Tips for Debugging APIs Faster with AllFormatter",
    description:
      "From formatting raw JSON payloads to comparing request/response objects, these productivity tips will dramatically cut your API debugging time.",
    category: "API Tips",
    categoryColor: "purple",
    readTime: "8 min read",
    date: "May 22, 2026",
    emoji: "🚀",
  },
  {
    slug: "xml-formatter-guide",
    title: "XML Formatter Guide: Beautiful and Clean XML",
    description: "Learn how to format, prettify, and minify your XML documents seamlessly to improve readability and debug configurations faster.",
    category: "XML",
    categoryColor: "orange",
    readTime: "4 min read",
    date: "July 20, 2026",
    emoji: "📄",
  },
  {
    slug: "json-to-yaml-guide",
    title: "JSON to YAML: Translating Data Structures",
    description: "A comprehensive guide on translating JSON into human-readable YAML configurations without losing data integrity.",
    category: "YAML",
    categoryColor: "blue",
    readTime: "5 min read",
    date: "July 18, 2026",
    emoji: "⚙️",
  },
  {
    slug: "lorem-ipsum-guide",
    title: "The History and Future of Lorem Ipsum",
    description: "Discover why designers still use Lorem Ipsum, and how modern generators are adapting to new design workflows.",
    category: "Design",
    categoryColor: "purple",
    readTime: "3 min read",
    date: "July 15, 2026",
    emoji: "📝",
  },
  {
    slug: "qr-code-guide",
    title: "Maximizing Engagement with Custom QR Codes",
    description: "Learn how to generate, style, and utilize QR codes effectively for marketing campaigns and real-world interactions.",
    category: "Marketing",
    categoryColor: "emerald",
    readTime: "4 min read",
    date: "July 12, 2026",
    emoji: "📱",
  },
  {
    slug: "image-to-base64-guide",
    title: "Image to Base64: When to Inline Images",
    description: "Understand the performance trade-offs of embedding Base64 images directly into HTML and CSS files.",
    category: "Performance",
    categoryColor: "indigo",
    readTime: "6 min read",
    date: "July 10, 2026",
    emoji: "🖼️",
  },
  {
    slug: "word-counter-guide",
    title: "Why Word Counts Matter in SEO and Content Creation",
    description: "Discover how character limits, word counts, and reading times directly impact search engine rankings and user engagement.",
    category: "SEO",
    categoryColor: "emerald",
    readTime: "5 min read",
    date: "July 5, 2026",
    emoji: "📊",
  },
  {
    slug: "markdown-to-html-guide",
    title: "Mastering Markdown to HTML Workflows",
    description: "A guide on converting lightweight markdown into production-ready, sanitized HTML for blogs and documentation.",
    category: "HTML",
    categoryColor: "blue",
    readTime: "4 min read",
    date: "July 2, 2026",
    emoji: "🌐",
  },
  {
    slug: "sql-formatter-guide",
    title: "SQL Formatting: Writing Readable Queries",
    description: "Stop writing messy SQL. Learn how to format complex JOINs and subqueries to make your database code beautiful.",
    category: "Database",
    categoryColor: "orange",
    readTime: "5 min read",
    date: "June 29, 2026",
    emoji: "🗄️",
  },
  {
    slug: "uuid-generator-guide",
    title: "Understanding UUIDs: v4 vs v5 and Collisions",
    description: "Everything you need to know about generating unique identifiers, preventing collisions, and choosing the right UUID version.",
    category: "Architecture",
    categoryColor: "indigo",
    readTime: "7 min read",
    date: "June 25, 2026",
    emoji: "🔑",
  },
  {
    slug: "text-diff-guide",
    title: "How to Read Text Diffs Like a Senior Developer",
    description: "Master the art of comparing code files and understanding line-by-line and word-by-word differences during code reviews.",
    category: "Development",
    categoryColor: "purple",
    readTime: "6 min read",
    date: "June 22, 2026",
    emoji: "🔍",
  },
  {
    slug: "json-minifier-guide",
    title: "JSON Minification: Reducing API Payload Sizes",
    description: "Why stripping whitespace and comments from JSON can drastically improve your application's network performance.",
    category: "JSON",
    categoryColor: "emerald",
    readTime: "4 min read",
    date: "June 18, 2026",
    emoji: "⚡",
  },
  {
    slug: "regex-tester-guide",
    title: "Regex Demystified: Testing and Writing Regular Expressions",
    description: "A practical guide to writing, testing, and debugging complex regular expressions without pulling your hair out.",
    category: "Development",
    categoryColor: "blue",
    readTime: "8 min read",
    date: "June 12, 2026",
    emoji: "🧪",
  },
];

const colorMap: Record<string, { badge: string; dot: string; hover: string }> = {
  emerald: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
    hover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  blue: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    dot: "bg-blue-500",
    hover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  indigo: {
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
    dot: "bg-indigo-500",
    hover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
  },
  orange: {
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
    dot: "bg-orange-500",
    hover: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
  },
  purple: {
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
    dot: "bg-purple-500",
    hover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
  },
};

export default function BlogsPage() {
  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => {
            const colors = colorMap[blog.categoryColor] ?? colorMap.indigo;
            return (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  {/* Emoji icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
                    {blog.emoji}
                  </div>

                  {/* Category badge */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold w-fit ${colors.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {blog.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className={`text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug transition-colors ${colors.hover}`}>
                  {blog.title}
                </h2>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                  {blog.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>{blog.date}</span>
                  <span className="font-medium">{blog.readTime}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
