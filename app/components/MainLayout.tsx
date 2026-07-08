"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdSenseContainer from "./AdSenseContainer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const tools = [
  {
    href: "/",
    label: "JSON Beautifier",
    description: "Format & validate JSON",
    emoji: "🗂️",
    color: "emerald",
  },
  {
    href: "/html-beautifier",
    label: "HTML Beautifier",
    description: "Clean & indent HTML",
    emoji: "🎨",
    color: "blue",
  },
  {
    href: "/base64-to-pdf",
    label: "Base64 → PDF",
    description: "Decode Base64 to PDF",
    emoji: "📄",
    color: "indigo",
  },
  {
    href: "/json-compare",
    label: "JSON Compare",
    description: "Diff two JSON objects",
    emoji: "🔍",
    color: "violet",
  },
  {
    href: "/json-to-xml",
    label: "JSON → XML",
    description: "Convert JSON to XML",
    emoji: "🔄",
    color: "orange",
  },
];

const toolColorMap: Record<string, string> = {
  emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
  blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
  indigo: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400",
  violet: "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400",
  orange: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const pathname = usePathname();

  const [toolsOpen, setToolsOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
      if (blogsRef.current && !blogsRef.current.contains(e.target as Node)) {
        setBlogsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on route change
  useEffect(() => {
    setToolsOpen(false);
    setBlogsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(nextLang);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mb-4" />
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Loading DevTools...
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 pb-12 transition-colors duration-300">
      {/* ── Premium Header ── */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/20">
              DT
            </div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent hidden sm:block">
              Developer Tools
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Tools dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                id="header-tools-btn"
                onClick={() => {
                  setToolsOpen((v) => !v);
                  setBlogsOpen(false);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  toolsOpen
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                🛠️ Tools
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Tools dropdown panel */}
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 py-2">
                      All Developer Tools
                    </p>
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        id={`header-tool-${tool.href.replace(/\//g, "").replace(/-/g, "_") || "json"}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group ${
                          pathname === tool.href ? "bg-slate-50 dark:bg-slate-800" : ""
                        }`}
                      >
                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${toolColorMap[tool.color]}`}>
                          {tool.emoji}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tool.label}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {tool.description}
                          </div>
                        </div>
                        {pathname === tool.href && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blogs dropdown */}
            <div className="relative" ref={blogsRef}>
              <button
                id="header-blogs-btn"
                onClick={() => {
                  setBlogsOpen((v) => !v);
                  setToolsOpen(false);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  blogsOpen || pathname.startsWith("/blogs")
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                📚 Blogs
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${blogsOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Blogs dropdown panel */}
              {blogsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 py-2">
                      Recent Articles
                    </p>
                    {[
                      { slug: "json-formatting-best-practices", label: "JSON Formatting Best Practices", emoji: "🗂️" },
                      { slug: "html-beautifier-guide", label: "HTML Beautification Guide", emoji: "🎨" },
                      { slug: "base64-encoding-explained", label: "Base64 Encoding Explained", emoji: "🔐" },
                      { slug: "json-vs-xml", label: "JSON vs XML: Full Comparison", emoji: "⚖️" },
                      { slug: "comparing-json-objects", label: "Comparing JSON Objects Like a Pro", emoji: "🔍" },
                      { slug: "api-debugging-tips", label: "10 Pro API Debugging Tips", emoji: "🚀" },
                    ].map((b) => (
                      <Link
                        key={b.slug}
                        href={`/blogs/${b.slug}`}
                        id={`header-blog-${b.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <span className="text-base">{b.emoji}</span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
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
            {/* Language Selector */}
            <button
              id="header-lang-toggle"
              onClick={toggleLanguage}
              className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              🌐 {i18n.language === "en" ? "हिन्दी" : "English"}
            </button>

            {/* Theme Toggle */}
            <button
              id="header-theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-all cursor-pointer"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "dark" ? (
                /* Sun icon for dark mode (click to go light) */
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                /* Moon icon for light mode (click to go dark) */
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              id="header-mobile-menu-btn"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
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
          <div className="md:hidden border-t border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 pt-1 pb-2">Tools</p>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === tool.href
                    ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span>{tool.emoji}</span> {tool.label}
              </Link>
            ))}
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 pt-3 pb-2">Blogs</p>
            <Link
              href="/blogs"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname.startsWith("/blogs")
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              📚 All Articles
            </Link>
          </div>
        )}
      </header>

      {/* ── Main Container ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Title Block */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {t("hubTitle", {
              defaultValue: "The Ultimate Developer Utility Workspace",
            })}
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t("hubSubtitle", {
              defaultValue:
                "Format, validate, parse, clean, and convert your data instantly in a single secure window.",
            })}
          </p>
        </div>

        {/* Top Google Ads Slot */}
        <AdSenseContainer slot="top-banner" />

        {/* Segmented Tab Navigation Controls */}
        <nav aria-label="Tool Navigation" className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-slate-200/60 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl shadow-sm gap-1">
            {/* JSON Formatter Tab Button */}
            <Link
              href="/"
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                pathname === "/"
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${pathname === "/" ? "bg-emerald-500" : "bg-slate-400"}`}
              ></span>
              {t("jsonBeautifier", { defaultValue: "JSON Beautifier" })}
            </Link>

            {/* HTML Beautifier Tab Button */}
            <Link
              href="/html-beautifier"
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                pathname === "/html-beautifier"
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${pathname === "/html-beautifier" ? "bg-blue-500" : "bg-slate-400"}`}
              ></span>
              {t("htmlBeautifier", { defaultValue: "HTML Beautifier" })}
            </Link>

            {/* Base64 to PDF Tab Button */}
            <Link
              href="/base64-to-pdf"
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                pathname === "/base64-to-pdf"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${pathname === "/base64-to-pdf" ? "bg-indigo-500" : "bg-slate-400"}`}
              ></span>
              {t("base64Pdf", { defaultValue: "Base64 → PDF" })}
            </Link>

            {/* JSON Compare Tab Button */}
            <Link
              href="/json-compare"
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                pathname === "/json-compare"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${pathname === "/json-compare" ? "bg-indigo-500" : "bg-slate-400"}`}
              ></span>
              {t("jsonCompare", { defaultValue: "JSON Compare" })}
            </Link>

            {/* JSON to XML Tab Button */}
            <Link
              href="/json-to-xml"
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                pathname === "/json-to-xml"
                  ? "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${pathname === "/json-to-xml" ? "bg-orange-500" : "bg-slate-400"}`}
              ></span>
              {t("jsonToXml", { defaultValue: "JSON → XML" })}
            </Link>
          </div>
        </nav>

        {/* Dynamic State Component Loader */}
        <div className="transition-all duration-300 transform scale-100 opacity-100">
          {children}
        </div>

        {/* Bottom Google Ads Slot */}
        <AdSenseContainer slot="bottom-banner" />
      </section>

      {/* ── SEO Footer ── */}
      <footer className="mt-16 border-t border-slate-200/50 dark:border-slate-800/40 py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          {/* Copyright */}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Developer Tools.{" "}
            {t("footerText", {
              defaultValue:
                "All conversion, parsing and formatting occurs client-side for absolute privacy and security.",
            })}
          </p>

          {/* SEO-rich description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Developer Tools offers free online utilities for developers and IT
            professionals. Instantly format and beautify JSON, clean and
            validate HTML, convert Base64 strings into secure downloadable PDF
            files, and compare JSON data side by side. All tools run directly in
            your browser — fast, private, and reliable.
          </p>

          {/* Internal links */}
          <nav className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Link href="/">JSON Formatter</Link>
            <Link href="/html-beautifier">HTML Beautifier</Link>
            <Link href="/base64-to-pdf">Base64 → PDF</Link>
            <Link href="/json-compare">JSON Compare</Link>
            <Link href="/json-to-xml">JSON → XML</Link>
            <Link href="/blogs">Blog</Link>
          </nav>

          {/* External link for authority */}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Learn more about JSON at{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON"
              target="_blank"
              rel="noopener"
              className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              MDN Web Docs
            </a>
            .
          </p>

          {/* Hidden SEO Article Block */}
          <article className="hidden">
            <h1>Developer Tools Formatter &amp; Beautifier</h1>
            <p>
              Welcome to Developer Tools — your one‑stop solution for formatting,
              validating, and beautifying JSON data online. Our JSON Formatter
              instantly parses and structures your JSON, making it easier to
              debug APIs, share data, and improve readability.
            </p>

            <h2>Why Choose Our JSON Formatter?</h2>
            <ul>
              <li>✅ Instant JSON validation and error detection</li>
              <li>✅ Beautify messy JSON into clean, readable format</li>
              <li>✅ Minify JSON for faster performance</li>
              <li>✅ Secure, browser‑based — no data leaves your device</li>
            </ul>

            <h2>Other Developer Tools You&apos;ll Love</h2>
            <p>
              Alongside JSON Beautifier, we also provide:
              <Link href="/html-beautifier"> HTML Beautifier</Link>,
              <Link href="/base64-to-pdf"> Base64 to PDF Converter</Link>,
              <Link href="/json-compare"> JSON Compare Tool</Link>, and
              <Link href="/json-to-xml"> JSON to XML Converter</Link>. These tools
              help developers streamline workflows and improve productivity.
            </p>

            <h2>Frequently Asked Questions</h2>
            <h3>What is JSON?</h3>
            <p>
              JSON (JavaScript Object Notation) is a lightweight data format
              used for APIs and data exchange.
            </p>
            <h3>Can I use this tool offline?</h3>
            <p>
              Yes, since it runs in your browser, your JSON never leaves your
              computer.
            </p>
          </article>
        </div>
      </footer>
    </main>
  );
}
