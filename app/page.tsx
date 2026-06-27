"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import JsonBeautifier from "./components/JsonBeautifier";
import HtmlBeautifier from "./components/HtmlBeautifier";
import Base64ToPdf from "./components/Base64ToPdf";
import AdSenseContainer from "./components/AdSenseContainer";

type TabType = "json" | "html" | "pdf";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("json"); // JSON formatter open by default
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(nextLang);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mb-4" />
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading DevTools...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 pb-12 transition-colors duration-300">
      
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/20">
              DH
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                DevTools Hub
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              🌐 {i18n.language === "en" ? "हिन्दी" : "English"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-all cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 16.2A7.2 7.2 0 1112 4.8a7.2 7.2 0 010 14.4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Title Block */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {t("hubTitle", { defaultValue: "The Ultimate Developer Utility Workspace" })}
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t("hubSubtitle", { defaultValue: "Format, validate, parse, clean, and convert your data instantly in a single secure window." })}
          </p>
        </div>

        {/* Top Google Ads Slot */}
        <AdSenseContainer slot="top-banner" />

        {/* Segmented Tab Navigation Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-200/60 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl shadow-sm">
            
            {/* JSON Formatter Tab Button */}
            <button
              onClick={() => setActiveTab("json")}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === "json"
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === "json" ? "bg-emerald-500" : "bg-slate-400"}`}></span>
              {t("jsonBeautifier", { defaultValue: "JSON Beautifier" })}
            </button>

            {/* HTML Beautifier Tab Button */}
            <button
              onClick={() => setActiveTab("html")}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === "html"
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === "html" ? "bg-blue-500" : "bg-slate-400"}`}></span>
              {t("htmlBeautifier", { defaultValue: "HTML Beautifier" })}
            </button>

            {/* Base64 to PDF Tab Button */}
            <button
              onClick={() => setActiveTab("pdf")}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === "pdf"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === "pdf" ? "bg-indigo-500" : "bg-slate-400"}`}></span>
              {t("base64Pdf", { defaultValue: "Base64 → PDF" })}
            </button>
            
          </div>
        </div>

        {/* Dynamic State Component Loader */}
        <div className="transition-all duration-300 transform scale-100 opacity-100">
          {activeTab === "json" && <JsonBeautifier />}
          {activeTab === "html" && <HtmlBeautifier />}
          {activeTab === "pdf" && <Base64ToPdf />}
        </div>

        {/* Bottom Google Ads Slot */}
        <AdSenseContainer slot="bottom-banner" />

      </section>

      {/* Semantic Footer */}
      <footer className="mt-16 border-t border-slate-200/50 dark:border-slate-800/40 py-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} DevTools Hub. {t("footerText", { defaultValue: "All conversion, parsing and formatting occurs client-side for absolute privacy and security." })}
          </p>
        </div>
      </footer>

    </main>
  );
}
