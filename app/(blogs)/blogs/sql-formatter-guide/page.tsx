import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "Why You Should Always Format Your SQL Queries | AllFormatter",
  description: "Writing clean SQL is a superpower. Learn how formatting your SQL queries improves readability, team collaboration, and debugging speed.",
  alternates: { canonical: "https://www.allformatter.com/blogs/sql-formatter-guide" },
  openGraph: {
    title: "Why You Should Always Format Your SQL Queries",
    description: "Writing clean SQL is a superpower. Learn how formatting your SQL queries improves readability, team collaboration, and debugging speed.",
    url: "https://www.allformatter.com/blogs/sql-formatter-guide",
    siteName: "AllFormatter",
    type: "article",
  },
};

export default function SqlFormatterGuide() {
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
              Best Practices
            </span>
            <time className="text-sm text-secondary font-medium" dateTime="2026-07-22">
              July 22, 2026
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] mb-6">
            Why You Should Always Format Your SQL Queries
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            Writing clean SQL is a superpower. Learn how formatting your SQL queries improves readability, team collaboration, and debugging speed.
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none">
          <p>
            SQL is the universal language of data. Yet, despite its importance, SQL queries are often written as massive, unreadable blocks of text. Whether you're pulling data for a quick report or embedding queries deep within an application's backend, how you format your SQL matters.
          </p>
          
          <h2>The Problem with Unformatted SQL</h2>
          <p>
            When application ORMs (Object-Relational Mappers) or log files output SQL, they typically print it as a single, continuous line. Reading a 500-character query without line breaks or indentation is a nightmare for developers trying to debug a slow query or a syntax error.
          </p>

          <h3>Before Formatting:</h3>
          <pre><code>{`SELECT p.product_name, c.category_name, SUM(o.quantity) as total_sold FROM products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN order_items o ON p.id = o.product_id WHERE p.active = true GROUP BY p.product_name, c.category_name ORDER BY total_sold DESC;`}</code></pre>

          <h3>After Formatting:</h3>
          <pre><code>{`SELECT
  p.product_name,
  c.category_name,
  SUM(o.quantity) AS total_sold
FROM
  products p
  INNER JOIN categories c ON p.category_id = c.id
  INNER JOIN order_items o ON p.id = o.product_id
WHERE
  p.active = true
GROUP BY
  p.product_name,
  c.category_name
ORDER BY
  total_sold DESC;`}</code></pre>

          <h2>Benefits of Formatting SQL</h2>
          <ul>
            <li><strong>Immediate Understanding:</strong> By aligning <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, and <code>JOIN</code> clauses, a reviewer can instantly grasp the query's structure and intent.</li>
            <li><strong>Easier Debugging:</strong> When a query fails, having it broken out onto multiple lines makes it much easier to isolate the exact clause causing the issue.</li>
            <li><strong>Better Code Reviews:</strong> Diffing unformatted SQL is nearly impossible. Formatted SQL allows Git and code review tools to clearly show exactly which column or condition was added or removed.</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 my-8">
            <h3 className="text-blue-900 dark:text-blue-300 mt-0">Format SQL Safely</h3>
            <p className="text-blue-800 dark:text-blue-400 mb-6">
              Database queries often contain sensitive table names and structure data. Our SQL Formatter runs 100% in your browser—meaning your schema is never sent to a server.
            </p>
            <Link href="/tools/sql-formatter">
              <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                Try the SQL Formatter
              </Button>
            </Link>
          </div>

          <h2>Key SQL Formatting Conventions</h2>
          <p>
            While teams may have slightly different style guides, a few rules are almost universal:
          </p>
          <ol>
            <li><strong>Capitalize Keywords:</strong> Always use uppercase for SQL commands (<code>SELECT</code>, <code>UPDATE</code>, <code>JOIN</code>) and lowercase for table and column names.</li>
            <li><strong>One Column Per Line:</strong> In the <code>SELECT</code> clause, place each column on its own line for readability.</li>
            <li><strong>Indent JOINs:</strong> Clearly indent <code>JOIN</code> conditions so you can see how tables relate to the primary <code>FROM</code> table.</li>
          </ol>
        </article>
      </main>
    </div>
  );
}
