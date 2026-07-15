import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import PasswordGenerator from "../../components/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator Online — Secure & Random | Developer Tools",
  description: "Generate strong, random, and secure passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols — free and browser-based.",
  keywords: ["Password Generator", "Secure Password", "Random Password", "Strong Password Generator", "Online Password Tool"],
  alternates: { canonical: "https://www.allformatter.com/tools/password-generator" },
};

const features = [
  { emoji: "🔑", title: "Customizable Rules", desc: "Choose length, toggle uppercase, lowercase, numbers, and symbols to match any password policy." },
  { emoji: "🎲", title: "Cryptographically Random", desc: "Uses the browser's Web Crypto API for truly random password generation — not predictable Math.random()." },
  { emoji: "🔒", title: "Never Stored", desc: "Passwords are generated entirely in your browser and never sent to or stored on any server." },
  { emoji: "⚡", title: "Instant Generation", desc: "Generate a new password in one click. Regenerate as many times as you need, instantly." },
];

const faqs = [
  { q: "What makes a password strong?", a: "A strong password is at least 12 characters long and uses a mix of uppercase letters, lowercase letters, numbers, and symbols. Avoid dictionary words, names, or predictable patterns." },
  { q: "Is it safe to use a browser-based password generator?", a: "Yes — our generator uses the Web Crypto API (window.crypto.getRandomValues) which is cryptographically secure and runs entirely in your browser. The password is never transmitted anywhere." },
  { q: "Should I use a password manager?", a: "Absolutely. Use this tool to generate a strong password, then store it in a trusted password manager like 1Password, Bitwarden, or LastPass. Never reuse passwords across accounts." },
  { q: "How long should my password be?", a: "At minimum 12 characters for personal accounts, 16+ for financial and critical systems, and 20+ for root/admin credentials. Longer passwords are exponentially harder to crack." },
];

export default function PasswordGeneratorPage() {
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 mb-4">
          🔑 Generator
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Secure Password Generator
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Generate strong, random passwords with custom rules — cryptographically secure and never stored or transmitted.
        </p>
      </div>

      <PasswordGenerator />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our Password Generator?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-rose-400/40 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
    </MainLayout>
  );
}
