"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type RelatedToolInfo = {
  title: string;
  desc: string;
  href: string;
  emoji: string;
};

export default function RelatedTools({ tools }: { tools: RelatedToolInfo[] }) {
  const pathname = usePathname();
  if (!tools || tools.length === 0) return null;

  return (
    <section key={pathname} className="mt-16 max-w-5xl mx-auto mb-12" aria-label="Related Tools">
      <h2 className="text-xl font-bold text-primary text-center mb-8">Explore Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex flex-col p-5 rounded-2xl border border-panel-border bg-panel hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 mb-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl flex-shrink-0">
              {tool.emoji}
            </div>
            <h3 className="text-sm font-bold text-primary mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
              {tool.title}
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
