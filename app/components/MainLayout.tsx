import React from "react";
import Link from "next/link";
import AdSenseContainer from "./AdSenseContainer";
import NavBar from "./NavBar";
import Brand from "./Brand";

interface MainLayoutProps {
  children: React.ReactNode;
  /** Pass "blog" on /blogs/* routes to suppress the tool ads + latest articles duplicate section */
  variant?: "tool" | "blog";
}

/* ─── All tools: existing + extras from devtoolslabs ─────────────────────── */
const toolGroups = [
  {
    category: "JSON",
    emoji: "🗂️",
    tools: [
      { href: "/", label: "JSON Beautifier", description: "Format & validate JSON", emoji: "🗂️", color: "emerald" },
      { href: "/tools/json-compare", label: "JSON Compare", description: "Diff two JSON objects", emoji: "🔍", color: "violet" },
      { href: "/tools/json-to-xml", label: "JSON → XML", description: "Convert JSON to XML", emoji: "🔄", color: "orange" },
      { href: "/tools/json-to-csv", label: "JSON → CSV", description: "Export JSON as CSV", emoji: "📊", color: "teal" },
      { href: "/tools/csv-to-json", label: "CSV → JSON", description: "Import CSV as JSON", emoji: "📥", color: "teal" },
      { href: "/tools/yaml-to-json", label: "YAML → JSON", description: "Convert YAML to JSON", emoji: "🔄", color: "orange" },
      { href: "/tools/json-schema-validator", label: "JSON Schema Validator", description: "Validate against schema", emoji: "✅", color: "emerald" },
    ],
  },
  {
    category: "HTML / CSS",
    emoji: "🎨",
    tools: [
      { href: "/tools/html-beautifier", label: "HTML Beautifier", description: "Clean & indent HTML", emoji: "🎨", color: "blue" },
      { href: "/tools/css-minifier", label: "CSS Minifier", description: "Minify CSS code", emoji: "💨", color: "blue" },
      { href: "/tools/css-gradient-generator", label: "CSS Gradient Generator", description: "Build CSS gradients", emoji: "🌈", color: "purple" },
      { href: "/tools/html-to-jsx", label: "HTML → JSX", description: "Convert HTML to React JSX", emoji: "⚛️", color: "blue" },
      { href: "/tools/html-entity-encoder", label: "HTML Entity Encoder", description: "Encode HTML entities", emoji: "🔠", color: "slate" },
    ],
  },
  {
    category: "Encode / Decode",
    emoji: "🔐",
    tools: [
      { href: "/tools/base64-to-pdf", label: "Base64 → PDF", description: "Decode Base64 to PDF", emoji: "📄", color: "indigo" },
      { href: "/tools/base64-encode-decode", label: "Base64 Encode/Decode", description: "Encode or decode strings", emoji: "🔐", color: "indigo" },
      { href: "/tools/url-encode-decode", label: "URL Encode/Decode", description: "Encode or decode URLs", emoji: "🔗", color: "cyan" },
      { href: "/tools/jwt-decoder", label: "JWT Decoder", description: "Decode JSON Web Tokens", emoji: "🔑", color: "purple" },
      { href: "/tools/hash-generator", label: "Hash Generator", description: "MD5, SHA-256 & more", emoji: "#️⃣", color: "slate" },
    ],
  },
  {
    category: "SEO",
    emoji: "📈",
    tools: [
      { href: "/tools/seo-checker", label: "SEO Checker", description: "Analyze on-page SEO", emoji: "🔍", color: "indigo" },
      { href: "/tools/meta-tag-generator", label: "Meta Tag Generator", description: "Generate Meta & OG tags", emoji: "🏷️", color: "blue" },
      { href: "/tools/robots-txt-generator", label: "Robots.txt Generator", description: "Create robots.txt files", emoji: "🤖", color: "orange" },
      { href: "/tools/sitemap-generator", label: "XML Sitemap Generator", description: "Generate XML Sitemaps", emoji: "🗺️", color: "emerald" },
    ],
  },
  {
    category: "Utilities",
    emoji: "🛠️",
    tools: [
      { href: "/tools/cron-parser", label: "Cron Parser", description: "Parse cron expressions", emoji: "⏰", color: "amber" },
      { href: "/tools/password-generator", label: "Password Generator", description: "Secure random passwords", emoji: "🔑", color: "rose" },
      { href: "/tools/git-command-generator", label: "Git Command Generator", description: "Build git commands", emoji: "🐙", color: "slate" },
      { href: "/tools/http-status-codes", label: "HTTP Status Codes", description: "Reference & lookup", emoji: "🌐", color: "sky" },
      { href: "/tools/unix-timestamp-converter", label: "Unix Timestamp Converter", description: "Convert Unix timestamps", emoji: "⏱️", color: "violet" },
      { href: "/tools/timezone-converter", label: "Timezone Converter", description: "Compare & convert timezones", emoji: "🌍", color: "purple" },
      { href: "/tools/resume-builder", label: "Resume Builder", description: "Create ATS-friendly resumes", emoji: "📄", color: "indigo" },
    ],
  },
];

const blogLinks = [
  { slug: "json-formatting-best-practices", label: "JSON Formatting Best Practices", emoji: "🗂️", description: "Learn how to structure, format, and organize your JSON data for maximum readability and team collaboration." },
  { slug: "html-beautifier-guide", label: "HTML Beautification Guide", emoji: "🎨", description: "A comprehensive guide on maintaining clean, indented, and professional HTML code in modern web development." },
  { slug: "base64-encoding-explained", label: "Base64 Encoding Explained", emoji: "🔐", description: "Demystifying Base64 encoding: what it is, how it works, and when to use it securely in your applications." },
  { slug: "json-vs-xml", label: "JSON vs XML: Full Comparison", emoji: "⚖️", description: "An in-depth look at the differences between JSON and XML, and how to choose the right format for your API." },
  { slug: "comparing-json-objects", label: "Comparing JSON Objects Like a Pro", emoji: "🔍", description: "Techniques and tools for diffing JSON objects efficiently, finding nested changes, and debugging payloads." },
  { slug: "api-debugging-tips", label: "10 Pro API Debugging Tips", emoji: "🚀", description: "Boost your productivity with these 10 expert tips for testing, debugging, and resolving REST API issues." },
];

/* Static JSON-LD for the site as a whole (injected server-side) */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AllFormatter",
  "url": "https://www.allformatter.com",
  "description": "AllFormatter — free online developer tools: JSON Formatter, HTML Beautifier, JWT Decoder, YAML converter, CSS Minifier, Base64 encoder, Hash Generator, and more.",
  "publisher": {
    "@type": "Organization",
    "name": "AllFormatter",
    "url": "https://www.allformatter.com",
  },
};

export default function MainLayout({ children, variant = "tool" }: MainLayoutProps) {
  const isBlogPage = variant === "blog";
  return (
    <main className="min-h-screen bg-background text-primary pb-12 transition-colors duration-300">
      {/* ── Static JSON-LD Schema (server-rendered) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />

      {/* ── NavBar (client component — only interactive parts) ── */}
      <NavBar toolGroups={toolGroups} blogLinks={blogLinks} />

      {/* ── Main Container ── */}
      <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 mt-8">
        {/* {!isBlogPage && <AdSenseContainer slot="5523061044" />} */}

        {/* Dynamic Content */}
        <div className="transition-all duration-300 transform scale-100 opacity-100">
          {children}
        </div>

        {/* Bottom Ads — tool pages only */}
        {!isBlogPage && <AdSenseContainer slot="5523061044" />}
      </section>

      {/* ── Latest Blogs Section (server-rendered static HTML, tool pages only) ── */}
      {!isBlogPage && (
        <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              📚 Recommended Articles
            </h2>
            <Link
              href="/blogs"
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              See more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogLinks.slice(0, 3).map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col justify-between bg-panel border border-panel-border rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {blog.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-1">
                      {blog.label}
                    </h3>
                    <p className="text-sm text-secondary line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── SEO Footer (server-rendered static HTML) ── */}
      <footer className="mt-16 border-t border-panel-border py-16 bg-panel">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-7 gap-10">

            {/* Left Panel: Brand & Copyright */}
            <div className="lg:col-span-2 space-y-6">
              <Brand />
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                AllFormatter offers free online tools for developers: JSON Formatter, HTML Beautifier, JWT Decoder, YAML converter, CSS Minifier, Base64 encoder, and more. All tools run directly in your browser — fast, private, and reliable.
              </p>
              <div className="space-y-2">
                <p className="text-xs font-medium text-secondary">
                  &copy; {new Date().getFullYear()} AllFormatter.
                </p>
                <p className="text-[11px] text-secondary">
                  All JSON formatting, parsing, and conversion occurs client-side for absolute privacy and security.
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
                <Link href="/privacy" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Tool Categories Columns (server-rendered links) */}
            {toolGroups.map((group) => (
              <div key={group.category} className="space-y-5">
                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                  <span>{group.emoji}</span> {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.tools.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className="inline-block px-2 py-1 -ml-2 rounded-lg text-sm transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {tool.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
