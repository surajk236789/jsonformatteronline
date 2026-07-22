import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "The Strange History of Lorem Ipsum | AllFormatter",
  description: "Learn where Lorem Ipsum came from, why it was created, and why designers still use dummy text in modern web development.",
  alternates: { canonical: "https://www.allformatter.com/blogs/lorem-ipsum-guide" },
  openGraph: {
    title: "The Strange History of Lorem Ipsum",
    description: "Learn where Lorem Ipsum came from, why it was created, and why designers still use dummy text in modern web development.",
    url: "https://www.allformatter.com/blogs/lorem-ipsum-guide",
    siteName: "AllFormatter",
    type: "article",
  },
};

export default function LoremIpsumGuide() {
  return (
    <div className="min-h-screen bg-background selection:bg-teal-500/30">
      <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-24">
        {/* Navigation */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-8 md:mb-12 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
              Design
            </span>
            <time className="text-sm text-secondary font-medium" dateTime="2026-07-22">
              July 22, 2026
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] mb-6">
            The Strange History of Lorem Ipsum
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            Every designer and web developer has seen it. But where did this nonsense Latin text actually come from?
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none">
          <p>
            If you've ever purchased a website template, looked at a Figma mockup, or tested a font family, you've seen it:
          </p>
          <blockquote>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </blockquote>
          
          <h2>Where did it come from?</h2>
          <p>
            For a long time, people assumed it was just random letters assembled by a confused printer in the 1500s. However, in the 1990s, a Latin professor named Richard McClintock decided to investigate.
          </p>
          <p>
            He traced the word <em>"consectetur"</em> (one of the more obscure words in the text) back to classical literature. He discovered that Lorem Ipsum is actually derived from sections 1.10.32 and 1.10.33 of <strong>"de Finibus Bonorum et Malorum"</strong> (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          </p>
          <p>
            An unknown printer took a galley of Cicero's type and scrambled it to make a type specimen book. Over 2,000 years later, we are still using it.
          </p>

          <h2>Why do we still use it?</h2>
          <p>
            The whole point of using dummy text is that it has a more-or-less normal distribution of letters, making it look like readable English.
          </p>
          <p>
            If a designer were to use <em>"Content here, content here"</em> in a mockup, the client would inevitably start reading the words and criticizing the grammar, rather than looking at the typography, alignment, and layout of the page. Lorem Ipsum forces the viewer to focus entirely on the design.
          </p>

          <div className="bg-teal-50 dark:bg-teal-950/30 p-6 rounded-2xl border border-teal-100 dark:border-teal-900/50 my-8">
            <h3 className="text-teal-900 dark:text-teal-300 mt-0">Need Placeholder Text?</h3>
            <p className="text-teal-800 dark:text-teal-400 mb-6">
              Generate custom lengths of Lorem Ipsum text instantly. You can even output it wrapped directly in HTML paragraph tags for easy pasting.
            </p>
            <Link href="/tools/lorem-ipsum-generator">
              <Button variant="primary" className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20">
                Generate Dummy Text
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
