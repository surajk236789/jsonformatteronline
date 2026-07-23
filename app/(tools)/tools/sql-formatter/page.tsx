import React from "react";
import type { Metadata } from "next";

import SqlFormatter from "@/app/components/SqlFormatter";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "SQL Formatter & Beautifier Online",
  description: "Format, beautify, and indent SQL queries online. Supports MySQL, PostgreSQL, SQL Server, and standard SQL syntax. Free and browser-based.",
  keywords: ["SQL Formatter", "Format SQL Online", "SQL Beautifier", "SQL Indent", "Prettify SQL"],
  alternates: { canonical: "https://www.allformatter.com/tools/sql-formatter" },
  openGraph: {
    title: "SQL Formatter & Beautifier Online",
    description: "Format, beautify, and indent SQL queries online. Supports MySQL, PostgreSQL, SQL Server, and standard SQL syntax. Free and browser-based.",
    url: "https://www.allformatter.com/tools/sql-formatter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Formatter & Beautifier Online",
    description: "Format, beautify, and indent SQL queries online. Supports MySQL, PostgreSQL, SQL Server, and standard SQL syntax. Free and browser-based.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Formatting", desc: "Instantly beautify complex, nested SQL queries as you type. See the structure clearly." },
  { emoji: "🗄️", title: "Multi-Dialect Support", desc: "Supports Standard SQL, MySQL, PostgreSQL, SQLite, T-SQL (SQL Server), and PL/SQL." },
  { emoji: "🔒", title: "Secure & Private", desc: "All formatting happens directly in your browser. Your database queries and table names are never sent to a server." },
  { emoji: "⚙️", title: "Customizable", desc: "Choose your preferred indentation level (2 or 4 spaces) and automatically uppercase SQL keywords." },
];

const faqs = [
  { q: "Why should I format my SQL queries?", a: "Formatting SQL queries improves readability, making it easier to spot errors, understand complex JOINs, and collaborate with other developers. It is especially useful when debugging long, minified queries extracted from application logs." },
  { q: "Is this tool safe for confidential queries?", a: "Yes. Our SQL Formatter is 100% client-side. Your SQL queries, table names, and column data never leave your browser, making it safe for enterprise and confidential use." },
  { q: "Does it validate my SQL syntax?", a: "This tool focuses on formatting and beautifying existing SQL. While it can handle most queries, it does not strictly validate the syntax or execute the SQL against a database engine." },
];


const contentBlocks = [
  {
    title: "Why Format SQL?",
    body: "Complex SQL queries can quickly become unreadable. Formatting SQL introduces consistent indentation, capitalizes keywords, and aligns clauses, making it vastly easier for developers to understand the logic and spot syntax errors."
  },
  {
    title: "How to Beautify SQL",
    body: "Paste your raw, unformatted SQL query into the left editor. The tool instantly parses the syntax and outputs a beautifully indented and standardized SQL query on the right."
  }
];

export default function SqlFormatterPage() {
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "Regex Tester",
        "desc": "Test regular expressions online.",
        "href": "/tools/regex-tester",
        "emoji": "🔍"
    },
    {
        "title": "Cron Parser",
        "desc": "Translate cron expressions to human-readable schedules.",
        "href": "/tools/cron-parser",
        "emoji": "⏰"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "SQL Formatter & Beautifier",
        "url": "https://www.allformatter.com/tools/sql-formatter",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Format, beautify, and indent SQL queries online. Supports MySQL, PostgreSQL, SQL Server, and standard SQL syntax. Free and browser-based.",
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
    <ToolLayout contentBlocks={contentBlocks}
      title={<>
              SQL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Formatter</span>
            </>}
      description={<>
              Format and beautify SQL queries instantly. Private, client-side formatting for MySQL, PostgreSQL, SQL Server, and more.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our SQL Formatter?" featureColor="blue"
      faqs={faqs}
    >
      <div className="mb-8">
        <SqlFormatter />
      </div>
      <div className="text-sm text-secondary bg-panel border border-panel-border p-4 rounded-xl text-center">
        Debugging a backend script? Format your queries here, and check your execution schedules with our <a href="/tools/cron-parser" className="text-indigo-500 hover:underline font-semibold">Cron Expression Parser</a>.
      </div>
    </ToolLayout>
  );
}
