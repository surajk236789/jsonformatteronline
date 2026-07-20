"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/Button";

interface Tool {
  href: string;
  label: string;
  description: string;
  emoji: string;
  color: string;
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

export default function SearchTools({ tools }: { tools: Tool[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredTools = query === "" 
    ? tools 
    : tools.filter((tool) => 
        tool.label.toLowerCase().includes(query.toLowerCase()) || 
        tool.description.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % (filteredTools.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredTools.length) % (filteredTools.length || 1));
      } else if (e.key === "Enter" && filteredTools.length > 0) {
        e.preventDefault();
        const selectedTool = filteredTools[activeIndex];
        router.push(selectedTool.href);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, filteredTools, activeIndex, router]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border border-panel-border bg-slate-50 dark:bg-slate-900/50 hover:border-indigo-400/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm text-secondary shadow-sm w-32 md:w-40 lg:w-48"
        aria-label="Search tools"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="truncate">Search tools...</span>
        </div>
        <kbd className="hidden lg:inline-flex items-center gap-1 rounded bg-panel border border-panel-border px-1.5 text-[10px] font-medium text-secondary flex-shrink-0">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer mr-1"
        aria-label="Search tools"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-xl mx-4 bg-panel rounded-2xl shadow-2xl border border-panel-border overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center px-4 py-3 border-b border-panel-border">
              <svg className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-primary placeholder-slate-400 text-base py-1"
                placeholder="Search for tools... (e.g., json, base64)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-2 p-1 rounded-md text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium border border-panel-border shadow-sm"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scroll-smooth">
              {filteredTools.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {filteredTools.map((tool, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                          isActive 
                            ? "bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-500/20" 
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${colorMap[tool.color] ?? colorMap.slate}`}>
                          {tool.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className={`text-sm font-bold transition-colors leading-tight ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-primary"}`}>
                            {tool.label}
                          </div>
                          <div className={`text-xs truncate mt-0.5 ${isActive ? "text-indigo-500/80 dark:text-indigo-400/80" : "text-secondary"}`}>
                            {tool.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="hidden sm:flex items-center text-indigo-500 flex-shrink-0 ml-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-secondary">
                  <span className="text-4xl mb-3 block">🧐</span>
                  <p className="text-sm font-medium">No tools found for "{query}"</p>
                  <p className="text-xs mt-1 opacity-70">Try searching for something else.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
