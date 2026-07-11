import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MainLayout from "../../components/MainLayout";
import Link from "next/link";

/* ─── Blog content registry ───────────────────────────────────────────────── */
const blogContent: Record<
  string,
  {
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    readTime: string;
    date: string;
    emoji: string;
    content: string;
  }
> = {
  "json-formatting-best-practices": {
    title: "JSON Formatting Best Practices Every Developer Should Know",
    description:
      "Learn how proper JSON formatting improves API readability, reduces debugging time, and makes data exchange effortless across teams.",
    category: "JSON",
    categoryColor: "emerald",
    readTime: "5 min read",
    date: "June 28, 2026",
    emoji: "🗂️",
    content: `
## What is JSON Formatting?

JSON (JavaScript Object Notation) is the de-facto data interchange format of the modern web. A **well-formatted JSON** file is not just about aesthetics — it directly impacts API debugging speed, team collaboration, and long-term maintainability.

## Why Proper Formatting Matters

When you receive a minified API response like \`{"user":{"id":1,"name":"Alice","roles":["admin","editor"]}}\`, it becomes nearly impossible to spot errors quickly. Beautified JSON with consistent 2-space indentation lets you:

- **Scan structure instantly** — nested objects and arrays stand out
- **Spot missing commas or brackets** at a glance
- **Compare payloads side by side** in diffs and code reviews

## Top JSON Formatting Best Practices

### 1. Always Use 2-Space Indentation
Two spaces is the most universally adopted standard, used by major style guides (Google, Airbnb, StandardJS). It balances readability with compactness.

### 2. Validate Before Sending
Never send unvalidated JSON to an API. A single trailing comma or unquoted key will break the entire request. Use our **JSON Beautifier** to validate and format simultaneously.

### 3. Use Descriptive Keys
Avoid abbreviations. \`"usr_nm"\` → \`"username"\`. JSON is self-documenting — readable keys reduce the need for external documentation.

### 4. Keep Arrays Clean
For short arrays, single-line is fine: \`["admin", "editor"]\`. For long or nested arrays, use multi-line with consistent indentation.

### 5. Minify Only for Production
Minified JSON reduces payload size and speeds up API responses — but only minify at the build/transport stage. Always keep a formatted source copy.

### 6. Consistent Key Ordering (Optional but Helpful)
Alphabetically sorting keys makes comparing large JSON objects dramatically easier when debugging.

## Common JSON Mistakes to Avoid

| Mistake | Example | Fix |
|---|---|---|
| Trailing comma | \`{"a": 1,}\` | \`{"a": 1}\` |
| Single quotes | \`{'a': 1}\` | \`{"a": 1}\` |
| Unquoted keys | \`{a: 1}\` | \`{"a": 1}\` |
| Comments | \`// this breaks JSON\` | Remove comments |

## Tools That Help

Our free [JSON Beautifier](/) lets you format, validate, minify, and copy JSON in one click — no installation required, no data sent to servers.

---

Proper JSON formatting is a small habit with outsized returns. Start formatting your JSON consistently today and watch your debugging time drop.
    `,
  },

  "html-beautifier-guide": {
    title: "Why HTML Beautification Matters for Clean, Maintainable Code",
    description:
      "Messy HTML is a productivity killer. Discover why auto-formatting your HTML saves hours of manual work.",
    category: "HTML",
    categoryColor: "blue",
    readTime: "4 min read",
    date: "June 20, 2026",
    emoji: "🎨",
    content: `
## The Problem with Unformatted HTML

Copy-pasted HTML from email templates, CMS outputs, or legacy codebases often arrives as a single wall of text. Nested divs collapse, attributes jumble, and indentation disappears entirely. The result: hours wasted on manual reformatting.

## What an HTML Beautifier Does

An HTML beautifier (also called an HTML formatter or pretty-printer) automatically:

- **Adds consistent indentation** to nested elements
- **Breaks long attribute lists** onto separate lines
- **Normalises whitespace** between tags
- **Removes redundant blank lines**

## When Should You Beautify HTML?

### Before Code Review
Submitting unformatted HTML to a pull request makes the reviewer's job needlessly difficult. Beautify first.

### After CMS / Template Export
Most CMS platforms (WordPress, Webflow, Squarespace) export minified or inconsistently indented HTML. Always run it through a beautifier before editing.

### During Debugging
Finding a missing \`</div>\` in 400 lines of unindented HTML is painful. A formatted version makes structural errors obvious.

### When Onboarding New Team Members
Well-structured HTML is self-explanatory. It reduces the time new developers spend understanding page structure.

## Indentation Conventions

| Language | Recommended Indent |
|---|---|
| HTML | 2 spaces |
| CSS | 2 spaces |
| JavaScript | 2 spaces |
| XML | 2 or 4 spaces |

## Try It Now

Our free [HTML Beautifier](/html-beautifier) uses the industry-standard \`js-beautify\` library with 2-space indentation, producing clean, readable HTML instantly — right in your browser.

---

Clean HTML is not a luxury — it's a professional standard. Make it a habit.
    `,
  },

  "base64-encoding-explained": {
    title: "Base64 Encoding Explained: From PDF to String and Back",
    description:
      "Understand how Base64 encoding works, why it's used to embed binary data in APIs and emails, and how to convert Base64 strings back to PDF files.",
    category: "Base64",
    categoryColor: "indigo",
    readTime: "6 min read",
    date: "June 15, 2026",
    emoji: "🔐",
    content: `
## What is Base64 Encoding?

Base64 is a binary-to-text encoding scheme that represents binary data (like images, PDFs, or audio files) as a string of printable ASCII characters. It's named "Base64" because it uses 64 different characters to represent data.

The 64 characters are: \`A-Z\`, \`a-z\`, \`0-9\`, \`+\`, \`/\` — and \`=\` is used for padding.

## Why is Base64 Used?

Many transport protocols (HTTP, SMTP email, JSON APIs) are designed to handle text. Binary data like a PDF would break these protocols. Base64 solves this by converting binary → safe text.

### Common use cases:
- **Email attachments** — MIME protocol uses Base64 to embed files
- **REST APIs** — Returning file contents as a JSON string field
- **Data URIs** — Embedding images directly in HTML: \`<img src="data:image/png;base64,...">\`
- **JWT tokens** — JSON Web Tokens use Base64URL encoding

## How Does It Work?

Base64 takes 3 bytes (24 bits) of binary data and converts them into 4 printable characters. This means Base64-encoded data is approximately **33% larger** than the original binary.

\`\`\`
Binary:  01001000 01100101 01101100
Groups:  010010 000110 010101 101100
Base64:  H      G      V      s
\`\`\`

## Base64 and PDFs

When a backend API returns a PDF as a Base64 string, you'll see something like:

\`\`\`
JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PC9MZW5ndGggNiAwIFIvRmlsdGVyIC9GbGF0...
\`\`\`

To view it, you need to decode this string back to binary and render it as a PDF. Our [Base64 → PDF Converter](/base64-to-pdf) does exactly this — paste the string, and get an instant PDF preview.

## Data URI Format

APIs sometimes return the full data URI format:

\`\`\`
data:application/pdf;base64,JVBERi0xLjQK...
\`\`\`

Our tool automatically strips the \`data:application/pdf;base64,\` prefix before decoding.

## Security Note

Base64 is **encoding, not encryption**. Anyone can decode a Base64 string trivially. Never use it as a security measure.

---

Understanding Base64 unlocks a whole class of API integrations that return binary data. Try our [Base64 → PDF tool](/base64-to-pdf) to convert any PDF Base64 string instantly.
    `,
  },

  "json-vs-xml": {
    title: "JSON vs XML: Which Data Format Should You Use in 2026?",
    description:
      "A comprehensive comparison of JSON and XML — their syntax, performance, use cases, and when to convert between the two.",
    category: "JSON & XML",
    categoryColor: "orange",
    readTime: "7 min read",
    date: "June 10, 2026",
    emoji: "⚖️",
    content: `
## JSON vs XML: The Showdown

Both JSON and XML are data interchange formats that enable systems to communicate. But they take very different approaches — and choosing the wrong one can complicate integrations unnecessarily.

## Syntax Comparison

**JSON:**
\`\`\`json
{
  "user": {
    "id": 1,
    "name": "Alice",
    "roles": ["admin", "editor"]
  }
}
\`\`\`

**XML:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>1</id>
  <name>Alice</name>
  <roles>
    <role>admin</role>
    <role>editor</role>
  </roles>
</user>
\`\`\`

JSON is significantly more concise for the same data.

## Feature Comparison

| Feature | JSON | XML |
|---|---|---|
| Verbosity | Low | High |
| Human readability | High | Medium |
| Native JS support | ✅ Yes | ❌ Requires parsing |
| Comments | ❌ No | ✅ Yes |
| Attributes | ❌ No | ✅ Yes |
| Schema validation | JSON Schema | XSD, DTD |
| Namespace support | ❌ No | ✅ Yes |
| Binary data | ❌ (use Base64) | ❌ (use Base64) |

## When to Use JSON

- **REST APIs** — The modern standard. Native JavaScript support, smaller payload size
- **Configuration files** — \`.json\` files are used everywhere (package.json, tsconfig.json)
- **NoSQL databases** — MongoDB, DynamoDB store documents as JSON
- **Frontend data binding** — JavaScript can \`JSON.parse()\` without external libraries

## When to Use XML

- **SOAP APIs** — Older enterprise services often require SOAP/XML
- **Document markup** — HTML is a subset of XML; great for rich text documents
- **Microsoft Office formats** — DOCX, XLSX are ZIP files containing XML
- **RSS/Atom feeds** — Still predominantly XML
- **Config with comments** — XML supports \`<!-- comments -->\` which JSON doesn't

## Converting Between Them

Sometimes you'll receive data in XML but need JSON (or vice versa). Our free [JSON → XML Converter](/json-to-xml) handles this conversion instantly, preserving your data structure and generating clean, valid XML output.

## 2026 Recommendation

For new projects: **use JSON** unless you have a specific requirement for XML (SOAP API, document format, legacy system integration). JSON is faster to parse, more readable, and universally supported in modern stacks.

---

Both formats have their place. Understanding their strengths lets you make the right choice — and convert between them seamlessly when needed.
    `,
  },

  "comparing-json-objects": {
    title: "How to Compare JSON Objects Like a Pro",
    description:
      "Dive into techniques for diffing JSON data and how to spot subtle mismatches in complex API responses.",
    category: "JSON",
    categoryColor: "emerald",
    readTime: "5 min read",
    date: "May 30, 2026",
    emoji: "🔍",
    content: `
## Why JSON Comparison Matters

In API-driven development, you'll constantly need to compare JSON objects:

- **Debugging** — Is the API returning what you expect?
- **Testing** — Do two API versions return identical data?
- **Code review** — What changed in this configuration file?
- **Data migration** — Did the transformation preserve all fields?

## Methods for Comparing JSON

### 1. Visual Side-by-Side Comparison
The most intuitive approach. Paste two JSON objects into a diff viewer and scan highlighted differences. Our [JSON Compare tool](/json-compare) provides a Monaco-powered VS Code-like diff experience.

### 2. Deep Equality Check (JavaScript)
\`\`\`javascript
JSON.stringify(obj1) === JSON.stringify(obj2)
\`\`\`
**Caveat:** Key order matters — \`{a:1, b:2}\` ≠ \`{b:2, a:1}\` with this method. Normalize key order first.

### 3. Structural Comparison Libraries
Libraries like \`fast-deep-equal\` or \`lodash.isEqual\` handle deep equality correctly regardless of key order.

### 4. JSON Patch (RFC 6902)
JSON Patch describes the difference between two JSON documents as a series of operations (\`add\`, \`remove\`, \`replace\`). Ideal for programmatic diffing.

## Common JSON Differences to Watch For

| Difference Type | Example | Often Missed? |
|---|---|---|
| Extra whitespace in strings | \`"Alice "\` vs \`"Alice"\` | ✅ Yes |
| Number vs string | \`"1"\` vs \`1\` | ✅ Yes |
| Null vs missing key | \`{"a": null}\` vs \`{}\` | ✅ Yes |
| Array order | \`[1,2]\` vs \`[2,1]\` | ✅ Yes |
| Case sensitivity | \`"Active"\` vs \`"active"\` | ✅ Yes |

## Pro Tips

**Normalize first.** Before comparing, sort keys alphabetically and trim string values. This eliminates false positives.

**Compare incrementally.** For large JSON (1000+ keys), compare top-level keys first, then drill into mismatching objects.

**Use color-coded diffs.** Green for additions, red for deletions. Our [JSON Compare](/json-compare) tool uses Monaco's native diff highlighting.

---

Mastering JSON comparison saves hours of manual debugging. Bookmark our [JSON Compare tool](/json-compare) for instant side-by-side diffs.
    `,
  },

  "api-debugging-tips": {
    title: "10 Pro Tips for Debugging APIs Faster with Developer Tools",
    description:
      "From formatting raw JSON payloads to comparing request/response objects, these productivity tips will dramatically cut your API debugging time.",
    category: "API Tips",
    categoryColor: "purple",
    readTime: "8 min read",
    date: "May 22, 2026",
    emoji: "🚀",
    content: `
## Why API Debugging is Hard

APIs are the nervous system of modern software — and when they break, everything breaks. The challenge: API issues often surface as cryptic status codes or malformed data deep inside minified JSON blobs. Here are 10 tips to debug faster.

## Tip 1: Always Format the Response First
Never inspect a raw minified API response. Copy it, paste it into our [JSON Beautifier](/), and read the formatted version. Structure becomes immediately obvious.

## Tip 2: Validate Before Assuming Logic Bugs
Before digging into application logic, validate the JSON. An invalid response (e.g., a server-side error embedded in JSON) will look correct but fail silently. Our JSON Beautifier shows validation errors instantly.

## Tip 3: Compare Expected vs Actual
When the API returns unexpected data, use [JSON Compare](/json-compare) to diff what you expected vs what you got. Differences are highlighted in seconds.

## Tip 4: Check Data Types Carefully
APIs frequently return \`"123"\` (string) instead of \`123\` (number), or \`null\` instead of \`[]\`. These type mismatches cause subtle bugs. JSON Compare catches them.

## Tip 5: Log the Full Request Payload
Never assume the request is correct. Log the serialized request JSON before sending. Format it with the beautifier to verify all fields are present and properly structured.

## Tip 6: Use Base64 Decoding for File APIs
If an API returns a Base64-encoded file, use our [Base64 → PDF converter](/base64-to-pdf) to instantly preview the decoded content. This verifies the file wasn't corrupted in transit.

## Tip 7: Convert JSON → XML for Legacy Systems
Integrating with SOAP APIs or legacy enterprise systems? Use our [JSON → XML converter](/json-to-xml) to transform JSON payloads into the XML format these systems expect.

## Tip 8: Minify Payloads for Performance Testing
When measuring API performance impact of payload size, use our JSON Beautifier's **Minify** function to remove whitespace and get the production-sized payload.

## Tip 9: Check HTTP Status Codes Systematically
| Status | Meaning | Debugging Action |
|---|---|---|
| 400 | Bad Request | Check request payload JSON validity |
| 401 | Unauthorized | Check auth headers / tokens |
| 403 | Forbidden | Check permissions, not auth |
| 404 | Not Found | Check endpoint URL and resource ID |
| 422 | Validation Error | Inspect response body for field errors |
| 500 | Server Error | Check server logs, not client code |

## Tip 10: Document API Contracts as JSON
Use JSON Schema or example payloads to document what an endpoint returns. This becomes your reference for comparison during debugging and regression testing.

---

Faster API debugging starts with the right tools. Bookmark [Developer Tools](/) for instant JSON formatting, comparison, and file conversion — all free, all in-browser.
    `,
  },
};

/* ─── generateStaticParams ────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }));
}

/* ─── generateMetadata ────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogContent[slug];
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: `${blog.title} | Developer Tools Blog`,
    description: blog.description,
    alternates: { canonical: `https://www.jsondiff.space/blogs/${slug}` },
  };
}

/* ─── Simple Markdown renderer ────────────────────────────────────────────── */
function renderMarkdown(md: string) {
  const lines = md.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-3">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-slate-700 dark:text-slate-200 mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={i}
          className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 overflow-x-auto text-xs font-mono text-slate-700 dark:text-slate-300 my-4"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      i++;
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0]
        .split("|")
        .filter(Boolean)
        .map((h) => h.trim());
      const rows = tableLines.slice(2).map((r) =>
        r
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim())
      );
      elements.push(
        <div key={i} className="overflow-x-auto my-6">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {headers.map((h, hi) => (
                  <th
                    key={hi}
                    className="text-left px-3 py-2 font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="even:bg-slate-100 dark:even:bg-slate-800/50"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Horizontal rule
    if (line.startsWith("---")) {
      elements.push(
        <hr key={i} className="border-slate-200 dark:border-slate-800 my-8" />
      );
      i++;
      continue;
    }

    // List item
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1.5 my-4 text-slate-600 dark:text-slate-300 text-sm">
          {listItems.map((item, li) => (
            <li key={li} dangerouslySetInnerHTML={{ __html: item.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs font-mono">$1</code>') }} />
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Normal paragraph
    const html = line
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 dark:text-indigo-400 underline hover:no-underline">$1</a>');

    elements.push(
      <p
        key={i}
        className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
    i++;
  }

  return <>{elements}</>;
}

const colorBadge: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
};

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogContent[slug];

  if (!blog) notFound();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-indigo-600 dark:hover:text-indigo-400">Blogs</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200 font-medium truncate max-w-xs">{blog.title}</span>
        </nav>

        {/* Hero card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl flex-shrink-0">
              {blog.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold mb-3 ${colorBadge[blog.categoryColor] ?? colorBadge.indigo}`}>
                {blog.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-3">
                {blog.title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{blog.description}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-400 dark:text-slate-500">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article content */}
        <article className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-8 shadow-sm">
          {renderMarkdown(blog.content)}
        </article>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all"
          >
            ← Back to all blogs
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
