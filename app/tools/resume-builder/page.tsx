import React from "react";
import { Metadata } from "next";
import { ResumeProvider } from "../../components/resume/ResumeContext";
import { ResumeBuilderApp } from "../../components/resume/ResumeBuilderApp";
import MainLayout from "../../components/MainLayout";
export const metadata: Metadata = {
  title: "Free ATS-Friendly Resume Builder | AllFormatter",
  description: "Create a professional, modern, or creative resume in minutes. Optimize for ATS systems and download instantly as a PDF. Choose from 10+ beautiful templates.",
  keywords: ["resume builder", "ATS friendly resume maker", "download PDF resume", "free resume creator", "modern resume template", "resume generator", "cv builder"],
  alternates: { canonical: "https://www.allformatter.com/tools/resume-builder" },
  openGraph: {
    title: "Free ATS-Friendly Resume Builder | AllFormatter",
    description: "Create a professional, modern, or creative resume in minutes. Optimize for ATS systems and download instantly as a PDF. Choose from 10+ beautiful templates.",
    url: "https://www.allformatter.com/tools/resume-builder",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS-Friendly Resume Builder | AllFormatter",
    description: "Create a professional, modern, or creative resume in minutes. Optimize for ATS systems and download instantly as a PDF. Choose from 10+ beautiful templates.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ResumeBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free ATS-Friendly Resume Builder",
    "url": "https://www.allformatter.com/tools/resume-builder",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Create a professional, modern, or creative resume in minutes. Optimize for ATS systems and download instantly as a PDF. Choose from 10+ beautiful templates.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full space-y-6 mb-12">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Perfect Resume</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stand out to employers with beautifully designed, ATS-optimized templates. Download as PDF instantly.
          </p>
        </div>

        <ResumeProvider>
          <ResumeBuilderApp />
        </ResumeProvider>
      </div>
    </MainLayout>
  );
}
