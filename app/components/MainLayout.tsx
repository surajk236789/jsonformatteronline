"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdSenseContainer from "./AdSenseContainer";
import Brand from "./Brand";

interface MainLayoutProps {
  children: React.ReactNode;
}

/* ─── All tools: existing + extras from devtoolslabs ─────────────────────── */
const toolGroups = [
  {
    category: "JSON Tools",
    emoji: "🗂️",
    tools: [
      { href: "/", label: "JSON Beautifier", description: "Format & validate JSON", emoji: "🗂️", color: "emerald" },
      { href: "/json-compare", label: "JSON Compare", description: "Diff two JSON objects", emoji: "🔍", color: "violet" },
      { href: "/json-to-xml", label: "JSON → XML", description: "Convert JSON to XML", emoji: "🔄", color: "orange" },
      { href: "/tools/json-to-csv", label: "JSON → CSV", description: "Export JSON as CSV", emoji: "📊", color: "teal" },
      { href: "/tools/csv-to-json", label: "CSV → JSON", description: "Import CSV as JSON", emoji: "📥", color: "teal" },
      { href: "/tools/json-schema-validator", label: "JSON Schema Validator", description: "Validate against schema", emoji: "✅", color: "emerald" },
    ],
  },
  {
    category: "HTML / CSS Tools",
    emoji: "🎨",
    tools: [
      { href: "/html-beautifier", label: "HTML Beautifier", description: "Clean & indent HTML", emoji: "🎨", color: "blue" },
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
      { href: "/base64-to-pdf", label: "Base64 → PDF", description: "Decode Base64 to PDF", emoji: "📄", color: "indigo" },
      { href: "/tools/base64-encode-decode", label: "Base64 Encode/Decode", description: "Encode or decode strings", emoji: "🔐", color: "indigo" },
      { href: "/tools/url-encode-decode", label: "URL Encode/Decode", description: "Encode or decode URLs", emoji: "🔗", color: "cyan" },
      { href: "/tools/hash-generator", label: "Hash Generator", description: "MD5, SHA-256 & more", emoji: "#️⃣", color: "slate" },
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
    ],
  },
];

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
  violet: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
  slate: "bg-slate-100 text-slate-600 dark:bg-slate-900/40 dark:text-slate-400",
  cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
  sky: "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400",
};

const blogLinks = [
  { slug: "json-formatting-best-practices", label: "JSON Formatting Best Practices", emoji: "🗂️", description: "Learn how to structure, format, and organize your JSON data for maximum readability and team collaboration." },
  { slug: "html-beautifier-guide", label: "HTML Beautification Guide", emoji: "🎨", description: "A comprehensive guide on maintaining clean, indented, and professional HTML code in modern web development." },
  { slug: "base64-encoding-explained", label: "Base64 Encoding Explained", emoji: "🔐", description: "Demystifying Base64 encoding: what it is, how it works, and when to use it securely in your applications." },
  { slug: "json-vs-xml", label: "JSON vs XML: Full Comparison", emoji: "⚖️", description: "An in-depth look at the differences between JSON and XML, and how to choose the right format for your API." },
  { slug: "comparing-json-objects", label: "Comparing JSON Objects Like a Pro", emoji: "🔍", description: "Techniques and tools for diffing JSON objects efficiently, finding nested changes, and debugging payloads." },
  { slug: "api-debugging-tips", label: "10 Pro API Debugging Tips", emoji: "🚀", description: "Boost your productivity with these 10 expert tips for testing, debugging, and resolving REST API issues." },
];

/* The 5 main tool tabs shown in the sub-navigation */
const mainTabs = [
  { href: "/", label: "JSON Beautifier", activeColor: "text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-500" },
  { href: "/html-beautifier", label: "HTML Beautifier", activeColor: "text-blue-600 dark:text-blue-400", dotColor: "bg-blue-500" },
  { href: "/base64-to-pdf", label: "Base64 → PDF", activeColor: "text-indigo-600 dark:text-indigo-400", dotColor: "bg-indigo-500" },
  { href: "/json-compare", label: "JSON Compare", activeColor: "text-violet-600 dark:text-violet-400", dotColor: "bg-violet-500" },
  { href: "/json-to-xml", label: "JSON → XML", activeColor: "text-orange-600 dark:text-orange-400", dotColor: "bg-orange-500" },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);

  const isBlogPage = pathname.startsWith("/blogs");
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    // Initialize scroll state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
      if (blogsRef.current && !blogsRef.current.contains(e.target as Node)) {
        setBlogsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setOpenMenu(null);
    setBlogsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);



  return (
    <main className="min-h-screen bg-background text-primary pb-12 transition-colors duration-300">
      {/* ── Sticky Header ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isHomePage && !scrolled
            ? "bg-transparent border-transparent shadow-none"
            : "bg-panel/90 backdrop-blur-md border-b border-panel-border shadow-sm shadow-slate-100 dark:shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Brand */}
          {/* <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/20 text-sm">
              DT
            </div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent hidden sm:block">
              Developer Tools
            </span>
          </Link> */}
          <Brand />
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" ref={navRef}>

            {/* ── Tool Category Dropdowns ── */}
            {toolGroups.map((group) => {
              const isOpen = openMenu === group.category;
              return (
                <div className="relative" key={group.category}>
                  <button
                    onClick={() => {
                      if (isOpen) {
                        setOpenMenu(null);
                      } else {
                        setOpenMenu(group.category);
                        setBlogsOpen(false);
                        // Prefetch all tool pages in this group
                        group.tools.forEach((tool) => router.prefetch(tool.href));
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${isOpen
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : "text-secondary hover:text-indigo-600 hover:bg-slate-100 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
                      }`}
                  >
                    <span className="text-base">{group.emoji}</span>
                    <span className="hidden lg:block">{group.category}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[340px] bg-panel border border-panel-border rounded-2xl shadow-2xl shadow-slate-200/60 dark:shadow-slate-950/50 overflow-hidden">
                      <div className="p-2 flex flex-col gap-1">
                        {group.tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            prefetch={true}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group ${pathname === tool.href ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                          >
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${colorMap[tool.color] ?? colorMap.slate}`}>
                              {tool.emoji}
                            </span>
                            <div className="min-w-0">
                              <div className={`text-sm font-bold text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight ${pathname === tool.href ? "text-indigo-600 dark:text-indigo-400" : ""}`}>
                                {tool.label}
                              </div>
                              <div className="text-xs text-secondary leading-tight truncate mt-0.5">
                                {tool.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ── Blogs Dropdown ── */}
            <div className="relative" ref={blogsRef}>
              <button
                id="header-blogs-btn"
                onClick={() => { setBlogsOpen((v) => !v); setOpenMenu(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${blogsOpen || isBlogPage
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-secondary hover:text-indigo-600 hover:bg-slate-100 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
                  }`}
              >
                📚 Blogs
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${blogsOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {blogsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-panel border border-panel-border rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden">
                  <div className="p-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary px-3 py-2">Recent Articles</p>
                    {blogLinks.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/blogs/${b.slug}`}
                        id={`header-blog-${b.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors group"
                      >
                        <span className="text-base">{b.emoji}</span>
                        <span className="text-xs font-medium text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                          {b.label}
                        </span>
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                      <Link
                        href="/blogs"
                        id="header-blogs-all"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                      >
                        View all articles →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              id="header-theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 border border-panel-border rounded-lg transition-all cursor-pointer ${
                mounted 
                  ? theme === "dark"
                    ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    : "bg-slate-800 text-slate-100 hover:bg-slate-700"
                  : "bg-transparent text-transparent"
              }`}
              title={mounted && theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {mounted && theme === "dark" ? (
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : mounted ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              id="header-mobile-menu-btn"
              className="md:hidden p-2 rounded-lg text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-panel-border bg-panel px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {toolGroups.map((group) => (
              <div key={group.category}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary px-2 pt-3 pb-1">
                  {group.emoji} {group.category}
                </p>
                {group.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${pathname === tool.href ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400" : "text-secondary hover:text-indigo-600 hover:bg-slate-100 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
                      }`}
                  >
                    <span>{tool.emoji}</span> {tool.label}
                  </Link>
                ))}
              </div>
            ))}
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary px-2 pt-3 pb-1">📚 Blog</p>
            <Link
              href="/blogs"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isBlogPage ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400" : "text-secondary hover:text-indigo-600 hover:bg-slate-100 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
                }`}
            >
              All Articles
            </Link>
          </div>
        )}
      </header>

      {/* ── Main Container ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Context-aware hero: show blog hero on blog pages, tool hub on tool pages */}
        {isBlogPage ? (
          /* Blog hero — shown only on /blogs/* routes */
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 mb-4">
              📚 Developer Blog
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-primary leading-tight">
              Tips, Guides &amp; Best Practices
            </h1>
            <p className="mt-3 text-sm md:text-base text-secondary max-w-xl mx-auto">
              Expert articles to help you work smarter with JSON, HTML, APIs, and developer tools.
            </p>
          </div>
        ) : (
          /* Tool hub hero — subtitle only, H1 comes from each page */
          <>
            <AdSenseContainer slot="5523061044" />
          </>
        )}

        {/* Dynamic Content */}
        <div className="transition-all duration-300 transform scale-100 opacity-100">
          {children}
        </div>

        {/* Bottom Ads — only on tool pages */}
        {!isBlogPage && <AdSenseContainer slot="5523061044" />}
      </section>

      {/* ── Latest Blogs Section ── */}
      {!isBlogPage && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              📚 Latest Articles
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
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {blog.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
                    {blog.label}
                  </h3>
                  <p className="text-sm text-secondary line-clamp-3">
                    {blog.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── SEO Footer ── */}
      <footer className="mt-16 border-t border-panel-border py-16 bg-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-10">

            {/* Left Panel: Brand & Copyright */}
            <div className="lg:col-span-2 space-y-6">
              {/* <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-sm text-xs">
                  DT
                </div>
                <span className="text-lg font-extrabold tracking-tight text-primary">
                  Developer Tools
                </span>
              </div> */}
              {/* <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/20 text-sm">
                  DT
                </div>
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent hidden sm:block">
                  Developer Tools
                </span>
              </Link> */}
              <Brand />
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Developer Tools offers free online utilities for developers and IT professionals. All tools run directly in your browser — fast, private, and reliable.
              </p>
              <div className="space-y-2">
                <p className="text-xs font-medium text-secondary">
                  &copy; {new Date().getFullYear()} Developer Tools.
                </p>
                <p className="text-[11px] text-secondary">
                  All conversion, parsing and formatting occurs client-side for absolute privacy and security.
                </p>
              </div>
            </div>

            {/* Tool Categories Columns */}
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
                        className={`inline-block px-2 py-1 -ml-2 rounded-lg text-sm transition-colors ${pathname === tool.href ? "bg-slate-100 dark:bg-slate-800/50 text-indigo-600 dark:text-indigo-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400"}`}
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
