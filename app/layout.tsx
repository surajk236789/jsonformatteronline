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
  title: "Best Online JSON Formatter, HTML Beautifier & Base64 to PDF | Developer Tools",
  description: "Free online developer tools: Format, parse, validate, and minify JSON; beautify HTML code; and convert Base64 strings to downloadable PDF files. Fast, secure, and user-friendly.",
  keywords: ["JSON Formatter", "JSON Beautifier", "HTML Beautifier", "Base64 to PDF", "Developer Tools", "JSON Parser", "Format JSON Online", "HTML Formatter"],
  authors: [{ name: "Developer Tools Team" }],
  creator: "Developer Tools",
  openGraph: {
    title: "Best Online JSON Formatter, HTML Beautifier & Base64 to PDF | Developer Tools",
    description: "Format, validate, and minify JSON; clean HTML; and convert Base64 to PDF instantly with our modern, secure developer utility workspace.",
    url: "https://jsonformatteronline.com",
    siteName: "Developer Tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Online JSON Formatter, HTML Beautifier & Base64 to PDF | Developer Tools",
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
        <meta name="google-adsense-account" content="ca-pub-2678573850280758" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2678573850280758"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7X1Q9VXQ1R"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7X1Q9VXQ1R');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="devtools-theme">
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
