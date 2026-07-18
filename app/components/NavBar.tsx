"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "./ui/Button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Brand from "./Brand";

interface Tool {
  href: string;
  label: string;
  description: string;
  emoji: string;
  color: string;
}

interface ToolGroup {
  category: string;
  emoji: string;
  tools: Tool[];
}

interface BlogLink {
  slug: string;
  label: string;
  emoji: string;
}

interface NavBarProps {
  toolGroups: ToolGroup[];
  blogLinks: BlogLink[];
}

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

export default function NavBar({ toolGroups, blogLinks }: NavBarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLInputElement>(null);

  const isBlogPage = pathname.startsWith("/blogs");
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.checked = false;
    }
  }, [pathname]);

  return (
    <header
      className={`group/header relative sticky top-0 z-50 w-full transition-all duration-500 ease-in-out has-[:checked]:bg-panel/90 has-[:checked]:backdrop-blur-md has-[:checked]:border-b has-[:checked]:border-panel-border ${
        isHomePage && !scrolled
          ? "bg-transparent border-transparent shadow-none"
          : "bg-panel/90 backdrop-blur-md border-b border-panel-border shadow-sm shadow-slate-100 dark:shadow-none"
      }`}
    >
      {/* Hidden checkbox for CSS-only mobile menu toggle */}
      <input 
        type="checkbox" 
        id="mobile-menu-toggle" 
        className="peer hidden" 
        ref={mobileMenuRef}
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 h-16 flex items-center justify-between relative z-10">
        <Brand />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {toolGroups.map((group) => {
            return (
              <div className="relative group/navitem" key={group.category}>
                <Button
                  aria-haspopup="true"
                  variant="ghost"
                >
                  <span className="text-base">{group.emoji}</span>
                  <span className="hidden lg:block">{group.category}</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover/navitem:rotate-180"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>

                <div className="absolute top-full left-0 mt-2 w-[340px] opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-200 bg-panel border border-panel-border rounded-2xl shadow-2xl shadow-slate-200/60 dark:shadow-slate-950/50 overflow-hidden z-50">
                  <div className="p-2 flex flex-col gap-1">
                    {group.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        prefetch={false}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group ${
                          pathname === tool.href ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
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
              </div>
            );
          })}

          {/* Blogs Dropdown */}
          <div className="relative group/navitem">
            <Button
              id="header-blogs-btn"
              aria-haspopup="true"
              variant="ghost"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isBlogPage
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-blue-600 dark:text-blue-400 group-hover/navitem:text-indigo-600 group-hover/navitem:bg-slate-100 dark:group-hover/navitem:text-indigo-400 dark:group-hover/navitem:bg-slate-800"
              }`}
            >
              📚 Blogs
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover/navitem:rotate-180"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Button>

            <div className="absolute top-full left-0 mt-2 w-72 opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-200 bg-panel border border-panel-border rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden z-50">
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
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            id="header-theme-toggle"
            variant="ghost"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : mounted ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            ) : (
              <div className="w-4 h-4" />
            )}
          </Button>

          {/* Mobile hamburger label */}
          <label
            htmlFor="mobile-menu-toggle"
            id="header-mobile-menu-btn"
            className="md:hidden p-2 rounded-lg text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer select-none"
            aria-label="Toggle menu"
          >
            {/* Hamburger icon (hidden when checked using Tailwind has-[:checked]) */}
            <svg className="w-5 h-5 block group-has-[:checked]/header:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon (shown when checked) */}
            <svg className="w-5 h-5 hidden group-has-[:checked]/header:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>
      </div>

      {/* Mobile menu (shown when peer is checked) */}
      <div className="hidden peer-checked:block md:hidden border-t border-panel-border bg-panel px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto absolute top-full left-0 w-full shadow-lg">
        {toolGroups.map((group) => (
          <div key={group.category}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary px-2 pt-3 pb-1">
              {group.emoji} {group.category}
            </p>
            {group.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === tool.href
                    ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                    : "text-secondary hover:text-indigo-600 hover:bg-slate-100 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
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
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
            isBlogPage
              ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
              : "text-secondary hover:text-indigo-600 hover:bg-slate-100 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
          }`}
        >
          All Articles
        </Link>
      </div>
    </header>
  );
}
