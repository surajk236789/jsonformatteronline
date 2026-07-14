import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import YamlToJson from "../../components/YamlToJson";

export const metadata: Metadata = {
  title: "YAML to JSON Converter Online — Free & Instant | Developer Tools",
  description: "Convert YAML to JSON instantly online for free. Parse YAML files and export formatted JSON in your browser — no upload, no registration, 100% private.",
  keywords: [
    "YAML to JSON",
    "YAML to JSON converter",
    "convert YAML to JSON online",
    "YAML JSON parser",
    "parse YAML file",
    "YAML format to JSON format",
    "free YAML converter",
    "YAML online tool",
    "YAML syntax checker",
    "devops YAML tools",
  ],
  alternates: { canonical: "https://www.jsondiff.space/tools/yaml-to-json" },
};

const features = [
  { emoji: "🔄", title: "Instant Conversion", desc: "Instantly parse and convert YAML structures into properly formatted JSON." },
  { emoji: "📋", title: "Copy with 1-Click", desc: "Easily copy the generated JSON code to your clipboard with a single click." },
  { emoji: "🔒", title: "Fully Private", desc: "All conversion happens in your browser. Your data never leaves your device." },
  { emoji: "⚡", title: "Works Instantly", desc: "No login, no upload, no waiting. Paste YAML and get JSON output right away." },
];

export default function YamlToJsonPage() {
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 mb-4">
          🔄 Converter
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          YAML to JSON Converter
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Convert YAML data to JSON instantly — all in your browser.
        </p>
      </div>

      <YamlToJson />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our YAML to JSON Converter?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
