import React from "react";

export interface Feature {
  emoji: string;
  title: string;
  desc: string;
}

const colorStyles: Record<string, string> = {
  emerald: "hover:border-emerald-400/40 hover:shadow-emerald-500/5 bg-emerald-50 dark:bg-emerald-900/30",
  blue: "hover:border-blue-400/40 hover:shadow-blue-500/5 bg-blue-50 dark:bg-blue-900/30",
  indigo: "hover:border-indigo-400/40 hover:shadow-indigo-500/5 bg-indigo-50 dark:bg-indigo-900/30",
  violet: "hover:border-violet-400/40 hover:shadow-violet-500/5 bg-violet-50 dark:bg-violet-900/30",
  orange: "hover:border-orange-400/40 hover:shadow-orange-500/5 bg-orange-50 dark:bg-orange-900/30",
  teal: "hover:border-teal-400/40 hover:shadow-teal-500/5 bg-teal-50 dark:bg-teal-900/30",
  purple: "hover:border-purple-400/40 hover:shadow-purple-500/5 bg-purple-50 dark:bg-purple-900/30",
  slate: "hover:border-slate-400/40 hover:shadow-slate-500/5 bg-slate-100 dark:bg-slate-800",
  cyan: "hover:border-cyan-400/40 hover:shadow-cyan-500/5 bg-cyan-50 dark:bg-cyan-900/30",
  amber: "hover:border-amber-400/40 hover:shadow-amber-500/5 bg-amber-50 dark:bg-amber-900/30",
  rose: "hover:border-rose-400/40 hover:shadow-rose-500/5 bg-rose-50 dark:bg-rose-900/30",
  sky: "hover:border-sky-400/40 hover:shadow-sky-500/5 bg-sky-50 dark:bg-sky-900/30",
};

export default function FeatureSection({ features, color = "indigo", title = "Why use this tool?" }: { features: Feature[], color?: string, title?: string }) {
  if (!features || features.length === 0) return null;

  const styleClasses = colorStyles[color] || colorStyles.indigo;
  const iconClasses = styleClasses.split(" ").filter(c => c.startsWith("bg-")).join(" ");

  return (
    <section className="mt-16 w-full" aria-label="Features">
      <h2 className="text-xl font-bold text-primary text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <div key={f.title} className={`flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel transition-all duration-300 ${styleClasses.split(' ').filter(c => c.startsWith('hover:')).join(' ')}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${iconClasses}`}>
              {f.emoji}
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
              <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
