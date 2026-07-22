import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "When to use Base64 Images vs Image Files | AllFormatter",
  description: "Learn the pros, cons, and performance implications of converting images to Base64 Data URIs vs loading standard image files over HTTP.",
  alternates: { canonical: "https://www.allformatter.com/blogs/image-to-base64-guide" },
  openGraph: {
    title: "When to use Base64 Images vs Image Files",
    description: "Learn the pros, cons, and performance implications of converting images to Base64 Data URIs vs loading standard image files over HTTP.",
    url: "https://www.allformatter.com/blogs/image-to-base64-guide",
    siteName: "AllFormatter",
    type: "article",
  },
};

export default function ImageToBase64Guide() {
  return (
    <div className="min-h-screen bg-background selection:bg-pink-500/30">
      <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-24">
        {/* Navigation */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-8 md:mb-12 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">
              Web Performance
            </span>
            <time className="text-sm text-secondary font-medium" dateTime="2026-07-22">
              July 22, 2026
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] mb-6">
            When to use Base64 Images vs Image Files
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            Embedding an image directly into your HTML as a Base64 string sounds like a great way to speed up a website, but it often does the exact opposite.
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none">
          <p>
            When building a webpage, every image tag (<code>&lt;img src="logo.png"&gt;</code>) triggers a separate HTTP request to the server. If your page has 30 small icons, that is 30 separate network requests, which can slow down rendering.
          </p>
          <p>
            One technique developers use to solve this is converting the image into a <strong>Data URI</strong> using Base64 encoding. Instead of linking to a file, the image data is embedded directly in the HTML:
          </p>
          <pre><code>&lt;img src="data:image/png;base64,iVBORw0KGgo..." /&gt;</code></pre>

          <h2>The Pros of Base64 Images</h2>
          <ul>
            <li><strong>Fewer HTTP Requests:</strong> Because the image data is inside the HTML/CSS file, the browser doesn't need to ask the server for the image file.</li>
            <li><strong>Instant Rendering:</strong> As soon as the HTML is parsed, the image appears. There is no pop-in delay while an image downloads.</li>
            <li><strong>Offline Capabilities:</strong> If the HTML is saved locally, the images will still load without an internet connection.</li>
          </ul>

          <h2>The Cons (Why you shouldn't encode everything)</h2>
          <p>
            So if Base64 removes network requests, why don't we encode every image on the internet?
          </p>
          <h3>1. It increases file size by ~33%</h3>
          <p>
            Binary data is efficient. Base64 is not. Converting an image to ASCII characters increases its total byte size by about 33%. A 100KB JPEG becomes a 133KB text string.
          </p>
          <h3>2. It blocks the HTML parser</h3>
          <p>
            Browsers download HTML first, and then fetch images in the background asynchronously. If you embed a massive 2MB image as a Base64 string inside your HTML, the browser has to download and parse that massive string before it can continue rendering the rest of the page. Your users will stare at a blank white screen.
          </p>
          <h3>3. Poor Caching</h3>
          <p>
            Standard image files are cached heavily by the browser. If a user visits a second page, the logo image doesn't need to be downloaded again. If that logo is embedded in the HTML as Base64, it gets downloaded every time the HTML is requested (unless the whole HTML file is cached).
          </p>

          <div className="bg-pink-50 dark:bg-pink-950/30 p-6 rounded-2xl border border-pink-100 dark:border-pink-900/50 my-8">
            <h3 className="text-pink-900 dark:text-pink-300 mt-0">Convert Small Images Securely</h3>
            <p className="text-pink-800 dark:text-pink-400 mb-6">
              If you have tiny icons, logos, or loading spinners, converting them to Base64 is still a valid strategy. Use our free, offline-capable converter.
            </p>
            <Link href="/tools/image-to-base64">
              <Button variant="primary" className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20">
                Image to Base64 Converter
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
