import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AllFormatter",
  description: "Learn about the developers behind AllFormatter and our mission to build fast, secure, browser-based tools.",
  alternates: { canonical: "https://www.allformatter.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-black text-primary mb-6">About AllFormatter</h1>
      <div className="prose prose-indigo dark:prose-invert max-w-none text-secondary">
        <p className="mb-4">
          Welcome to AllFormatter, a suite of free, secure, and blazing-fast developer utilities.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          As developers, we frequently found ourselves needing to quickly format a JSON payload, decode a JWT, or minify some CSS. However, many online tools are slow, littered with intrusive ads, or worse—send sensitive data to external servers for processing.
        </p>
        <p className="mb-4">
          We built AllFormatter to solve these problems. Our mission is to provide an uncompromising suite of tools that run <strong>100% entirely in your browser</strong>. By leveraging modern client-side JavaScript, we ensure that your data is processed instantly without ever leaving your device.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Our Expertise</h2>
        <p className="mb-4">
          The team behind AllFormatter consists of experienced software engineers who understand the importance of data privacy, accurate validation (like strict JSON specification compliance), and clean UI/UX. We use these tools daily in our own development workflows, which means they are built by developers, for developers.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Security First</h2>
        <p className="mb-4">
          Trust is paramount. That's why AllFormatter uses no backend database for your parsed data. Everything happens in your browser's memory and is cleared the moment you close the tab. You can even load the site and disconnect from the internet, and the tools will continue to work flawlessly.
        </p>
      </div>
    </div>
  );
}
