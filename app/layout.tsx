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
  title: "Free Online Developer Tools — JSON, YAML, JWT, HTML, CSS & More | Developer Tools",
  description: "Free online developer tools: Format and validate JSON, convert YAML to JSON, decode JWTs, beautify HTML, minify CSS, generate hashes, encode Base64, and more. Fast, secure, and browser-based.",
  keywords: [
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
    "Developer Tools Online",
    "Free Developer Utilities",
    "browser based dev tools",
  ],
  authors: [{ name: "Developer Tools Team" }],
  creator: "Developer Tools",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Free Online Developer Tools — JSON, YAML, JWT, HTML, CSS & More | Developer Tools",
    description: "Format JSON, convert YAML, decode JWTs, beautify HTML, minify CSS, generate hashes and more — all free and browser-based.",
    url: "https://www.jsondiff.space",
    siteName: "Developer Tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Developer Tools — JSON, YAML, JWT, HTML, CSS & More | Developer Tools",
    description: "Format JSON, convert YAML, decode JWTs, beautify HTML, minify CSS, generate hashes and more — all free and browser-based.",
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
      </head>
      <body className="font-sans antialiased">
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2678573850280758"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          id="gtag-script"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7X1Q9VXQ1R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7X1Q9VXQ1R');
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="devtools-theme">
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
