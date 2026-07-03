import React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import I18nProvider from "./I18nProvider";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best Online JSON Formatter, HTML Beautifier & Base64 to PDF | DevTools Hub",
  description: "Free online developer tools: Format, parse, validate, and minify JSON; beautify HTML code; and convert Base64 strings to downloadable PDF files. Fast, secure, and user-friendly.",
  keywords: ["JSON Formatter", "JSON Beautifier", "HTML Beautifier", "Base64 to PDF", "Developer Tools", "JSON Parser", "Format JSON Online", "HTML Formatter"],
  authors: [{ name: "DevTools Hub Team" }],
  creator: "DevTools Hub",
  openGraph: {
    title: "Best Online JSON Formatter, HTML Beautifier & Base64 to PDF | DevTools Hub",
    description: "Format, validate, and minify JSON; clean HTML; and convert Base64 to PDF instantly with our modern, secure developer utility workspace.",
    url: "https://jsonformatteronline.com",
    siteName: "DevTools Hub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Online JSON Formatter, HTML Beautifier & Base64 to PDF | DevTools Hub",
    description: "Format, validate, and minify JSON; clean HTML; and convert Base64 to PDF instantly with our modern, secure developer utility workspace.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2678573850280758"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light">
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
