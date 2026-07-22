import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AllFormatter",
  description: "Privacy policy for AllFormatter. Learn how we keep your data 100% secure and local.",
  alternates: { canonical: "https://www.allformatter.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-black text-primary mb-6">Privacy Policy</h1>
      <div className="prose prose-indigo dark:prose-invert max-w-none text-secondary">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-4">
          At AllFormatter, your privacy and data security are our top priorities. This Privacy Policy outlines our commitment to keeping your data safe.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Client-Side Processing</h2>
        <p className="mb-4">
          The core feature of AllFormatter is that <strong>we do not process your data on our servers</strong>. All data formatting, validation, decoding, and encoding (such as JSON parsing, JWT decoding, etc.) happens entirely within your browser using client-side JavaScript.
        </p>
        <p className="mb-4">
          This means that the code or data you paste into our tools is never transmitted across the internet to our servers.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Data Storage</h2>
        <p className="mb-4">
          We do not store, save, or log any of the content you input into our tools. Because processing is handled locally, we do not have a database containing your sensitive information.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Analytics and Cookies</h2>
        <p className="mb-4">
          We may use minimal, privacy-respecting analytics tools (like Google Analytics) to understand basic website traffic patterns (such as page views). This data is anonymized and does not include the data you process in our tools. You can opt out of analytics tracking using our cookie consent banner.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Third-Party Services</h2>
        <p className="mb-4">
          We may display advertisements (e.g., Google AdSense) to support the free nature of our tools. These third-party vendors may use cookies to serve ads based on your prior visits to our website or other websites.
        </p>
      </div>
    </div>
  );
}
