import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "JSON vs YAML: When to Use Which | AllFormatter",
  description: "Understand the differences between JSON and YAML. Learn when to use JSON for APIs and when to use YAML for configuration files.",
  alternates: { canonical: "https://www.allformatter.com/blogs/json-to-yaml-guide" },
  openGraph: {
    title: "JSON vs YAML: When to Use Which",
    description: "Understand the differences between JSON and YAML. Learn when to use JSON for APIs and when to use YAML for configuration files.",
    url: "https://www.allformatter.com/blogs/json-to-yaml-guide",
    siteName: "AllFormatter",
    type: "article",
  },
};

export default function JsonToYamlGuide() {
  return (
    <div className="min-h-screen bg-background selection:bg-orange-500/30">
      <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-24">
        {/* Navigation */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-8 md:mb-12 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
              Comparison
            </span>
            <time className="text-sm text-secondary font-medium" dateTime="2026-07-22">
              July 22, 2026
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] mb-6">
            JSON vs YAML: When to Use Which
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            JSON and YAML are both data serialization languages, but they serve very different purposes. Learn how to choose the right format for your next project.
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none">
          <p>
            When exchanging data or writing configuration files, developers constantly run into two popular formats: <strong>JSON</strong> (JavaScript Object Notation) and <strong>YAML</strong> (YAML Ain't Markup Language).
          </p>
          <p>
            While YAML is technically a superset of JSON (meaning valid JSON is also valid YAML in modern YAML parsers), the way we write and read them is drastically different.
          </p>

          <h2>1. Syntax and Readability</h2>
          <p>
            <strong>JSON</strong> uses strict brackets <code>{`{}`}</code>, braces <code>[]</code>, and double quotes <code>" "</code>. It is heavily structured and rigid.
          </p>
          <p>
            <strong>YAML</strong> relies on indentation (spaces, not tabs!) to define structure. It drops the quotes, brackets, and commas, making it look much closer to plain English.
          </p>

          <h3>JSON Example:</h3>
          <pre><code>{`{
  "server": {
    "port": 8080,
    "environment": "production"
  }
}`}</code></pre>

          <h3>YAML Example:</h3>
          <pre><code>{`server:
  port: 8080
  environment: production`}</code></pre>

          <h2>2. Comments</h2>
          <p>
            One of the biggest limitations of JSON is that it does not support comments natively. If you need to document a config file, you often have to use hacky workarounds like adding a <code>"_comment": "..."</code> key.
          </p>
          <p>
            YAML supports comments natively using the <code>#</code> symbol. This makes it infinitely better for configuration files that human developers need to read and modify.
          </p>

          <h2>When to use JSON</h2>
          <ul>
            <li><strong>APIs and Data Transfer:</strong> JSON is the absolute king of APIs. It is natively parsed by browsers (using <code>JSON.parse()</code>), extremely fast for machines to read, and widely supported across all programming languages.</li>
            <li><strong>Logging:</strong> Structured logs are almost always written in JSON format so they can be ingested by tools like ElasticSearch or Datadog.</li>
            <li><strong>Payload Size Matters:</strong> JSON can be minified into a single line to save bandwidth. YAML relies on newlines and spacing, so it cannot be easily minified.</li>
          </ul>

          <h2>When to use YAML</h2>
          <ul>
            <li><strong>Configuration Files:</strong> YAML shines when humans have to write it. Docker Compose, Kubernetes, GitHub Actions, and Ansible all use YAML.</li>
            <li><strong>Complex Data with References:</strong> YAML supports advanced features like anchors (<code>&</code>) and aliases (<code>*</code>) to reuse blocks of data, which JSON cannot do natively.</li>
          </ul>

          <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/50 my-8">
            <h3 className="text-orange-900 dark:text-orange-300 mt-0">Convert Between JSON and YAML</h3>
            <p className="text-orange-800 dark:text-orange-400 mb-6">
              Need to switch formats quickly? We offer free, 100% client-side tools for converting in both directions.
            </p>
            <div className="flex gap-4">
              <Link href="/tools/json-to-yaml">
                <Button variant="primary" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20">
                  JSON to YAML
                </Button>
              </Link>
              <Link href="/tools/yaml-to-json">
                <Button variant="secondary" className="shadow-lg">
                  YAML to JSON
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
