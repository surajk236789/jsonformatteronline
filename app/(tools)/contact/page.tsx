import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | AllFormatter",
  description: "Get in touch with the AllFormatter team for support, feature requests, or business inquiries.",
  alternates: { canonical: "https://www.allformatter.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-black text-primary mb-6">Contact Us</h1>
      <div className="prose prose-indigo dark:prose-invert max-w-none text-secondary">
        <p className="mb-4">
          We would love to hear from you! Whether you have a question about one of our tools, a suggestion for a new feature, or simply want to report a bug, please don't hesitate to reach out.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">How to Reach Us</h2>
        <p className="mb-4">
          The best way to get in touch with the AllFormatter team is via email. We strive to respond to all inquiries within 24-48 hours.
        </p>

        <div className="bg-panel border border-panel-border rounded-xl p-6 my-6">
          <h3 className="text-lg font-bold text-primary mb-2">Email Support</h3>
          <p className="mb-0">
            For general inquiries, support, and feedback, please email us at:
            <br />
            <a href="mailto:support@allformatter.com" className="text-indigo-500 hover:underline font-semibold text-lg">support@allformatter.com</a>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Business Inquiries & Partnerships</h2>
        <p className="mb-4">
          If you are interested in advertising on AllFormatter, API integrations, or other business partnerships, please use the email address below:
          <br />
          <a href="mailto:business@allformatter.com" className="text-indigo-500 hover:underline font-semibold">business@allformatter.com</a>
        </p>

        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Feedback</h2>
        <p className="mb-4">
          We are constantly adding new features and tools. If there is a specific developer tool you wish we had, send us an email! User feedback is the primary driver for our roadmap.
        </p>
      </div>
    </div>
  );
}
