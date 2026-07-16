import React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { CookieBanner } from "./components/CookieBanner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allformatter.com"),
  title: {
    default: "AllFormatter — Free Online JSON Formatter, YAML, JWT, HTML & CSS Tools",
    template: "%s | AllFormatter",
  },
  description: "AllFormatter offers free online developer tools: JSON Formatter & Beautifier, YAML to JSON converter, JWT Decoder, HTML Beautifier, CSS Minifier, Base64 encoder, Hash Generator, and more. Fast, secure, and 100% browser-based.",
  keywords: [
    // Brand
    "AllFormatter",
    "allformatter.com",
    // JSON
    "JSON Formatter",
    "JSON Beautifier",
    "JSON Parser Online",
    "JSON Validator",
    "Format JSON Online",
    "JSON Minifier",
    "JSON Compare",
    "JSON to XML",
    "JSON to CSV",
    "CSV to JSON",
    "JSON Schema Validator",
    // YAML
    "YAML to JSON",
    "YAML converter online",
    // JWT
    "JWT Decoder",
    "decode JWT online",
    "JSON Web Token inspector",
    // HTML / CSS
    "HTML Beautifier",
    "HTML Formatter",
    "CSS Minifier",
    "CSS Gradient Generator",
    "HTML to JSX",
    // Encode / Decode
    "Base64 to PDF",
    "Base64 Encode Decode",
    "URL Encode Decode",
    "Hash Generator",
    "MD5 SHA256 online",
    // Utilities
    "Cron Parser",
    "Password Generator",
    "Git Command Generator",
    "HTTP Status Codes",
    // General
    "online developer tools",
    "free developer utilities",
    "browser based dev tools",
  ],
  authors: [{ name: "AllFormatter" }],
  creator: "AllFormatter",

  openGraph: {
    title: "AllFormatter — Free Online JSON Formatter, YAML, JWT, HTML & CSS Tools",
    description: "AllFormatter: Format JSON, convert YAML, decode JWTs, beautify HTML, minify CSS, generate hashes and more — all free and 100% browser-based at allformatter.com.",
    url: "https://www.allformatter.com",
    siteName: "AllFormatter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllFormatter — Free Online JSON Formatter, YAML, JWT, HTML & CSS Tools",
    description: "AllFormatter: Format JSON, convert YAML, decode JWTs, beautify HTML, minify CSS, generate hashes and more — all free and 100% browser-based.",
    site: "@allformatter",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-2678573850280758",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2678573850280758" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AllFormatter" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans antialiased">
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2678573850280758"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* Google Analytics */}
        <Script
          id="gtag-script"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7X1Q9VXQ1R"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            gtag('js', new Date());
            gtag('config', 'G-7X1Q9VXQ1R');
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="devtools-theme">
            {children}
            <CookieBanner />
          </ThemeProvider>
      </body>
    </html>
  );
}
