import React from 'react';

export interface ContentBlock {
  title: string;
  body: React.ReactNode;
}

interface ContentSectionProps {
  blocks: ContentBlock[];
}

export default function ContentSection({ blocks }: ContentSectionProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-12 px-4 sm:px-6 space-y-12">
      {blocks.map((block, i) => (
        <section key={i} className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {block.title}
          </h2>
          <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg space-y-4">
            {block.body}
          </div>
        </section>
      ))}
    </div>
  );
}
