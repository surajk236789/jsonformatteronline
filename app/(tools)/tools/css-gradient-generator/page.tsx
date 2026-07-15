import React from "react";
import type { Metadata } from "next";

import CssGradientGenerator from "@/app/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "CSS Gradient Generator Online — Build Beautiful Gradients | Developer Tools",
  description: "Create stunning CSS linear and radial gradients visually. Copy the generated CSS code instantly — free, browser-based gradient builder.",
  keywords: ["CSS Gradient Generator", "Linear Gradient CSS", "Radial Gradient Tool", "CSS Background Generator", "Gradient Builder Online"],
  alternates: { canonical: "https://www.allformatter.com/tools/css-gradient-generator" },
};

const features = [
  { emoji: "🌈", title: "Visual Gradient Builder", desc: "Build linear and radial gradients visually with color pickers and direction controls — no CSS knowledge needed." },
  { emoji: "📋", title: "Copy-Ready CSS", desc: "Get production-ready CSS code including vendor prefixes that works across all modern browsers." },
  { emoji: "🎨", title: "Custom Color Stops", desc: "Add as many color stops as you need, set precise positions, and fine-tune opacity for each." },
  { emoji: "👁️", title: "Live Preview", desc: "See your gradient update in real time as you adjust colors, angles, and positions." },
];

const faqs = [
  { q: "What is a CSS gradient?", a: "A CSS gradient is a smooth transition between two or more colors generated entirely using CSS — without needing image files. They are lightweight, scalable, and work on any display resolution." },
  { q: "What's the difference between linear and radial gradients?", a: "Linear gradients transition colors along a straight line (e.g., left to right, top to bottom). Radial gradients transition outward from a center point in a circular or elliptical pattern." },
  { q: "Will the CSS work in all browsers?", a: "Yes. The generated CSS includes the standard syntax that works in all modern browsers. Older browser prefixes (-webkit-) are included for maximum compatibility." },
  { q: "Can I use gradients for text or borders?", a: "Yes! Use 'background-clip: text' for gradient text effects, or apply gradients to borders using 'border-image'. The basic gradient code from this generator works as a starting point." },
];

export default function CssGradientGeneratorPage() {
  return (
    <>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 mb-4">
          🌈 Generator
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          CSS Gradient Generator
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Build stunning linear and radial CSS gradients visually — copy the ready-to-use CSS code in one click.
        </p>
      </div>

      <CssGradientGenerator />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our CSS Gradient Generator?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto" aria-label="FAQ">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5 rounded-2xl border border-panel-border bg-panel [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-primary list-none">
                <span>{faq.q}</span>
                <span className="transition duration-300 group-open:-rotate-180 text-secondary">
                  <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-xs text-secondary leading-relaxed mt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
