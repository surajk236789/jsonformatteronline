import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AllFormatter",
  description: "Terms of service and usage conditions for AllFormatter tools.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-black text-primary mb-6">Terms of Service</h1>
      <div className="prose prose-indigo dark:prose-invert max-w-none text-secondary">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using AllFormatter (the "Service"), you accept and agree to be bound by the terms and provision of this agreement.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Use of Service</h2>
        <p className="mb-4">
          The tools provided on AllFormatter are for personal and professional use. We provide these tools "as is" and without any warranty. While we strive for 100% accuracy in our parsers and validators, you agree that AllFormatter is not liable for any damages or losses resulting from the use of our tools.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. User Responsibility</h2>
        <p className="mb-4">
          Although our tools process data locally, you are solely responsible for the data you input. We do not monitor, store, or take responsibility for the content you format, encode, or decode.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. Your continued use of the Service following any changes indicates your acceptance of the new Terms.
        </p>
      </div>
    </div>
  );
}
