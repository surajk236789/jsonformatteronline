import React from "react";
import { Metadata } from "next";
import { ResumeProvider } from "../../components/resume/ResumeContext";
import { ResumeBuilderApp } from "../../components/resume/ResumeBuilderApp";
import MainLayout from "../../components/MainLayout";
export const metadata: Metadata = {
  title: "Free ATS-Friendly Resume Builder | Download PDF",
  description: "Create a professional, modern, or creative resume in minutes. Optimize for ATS systems and download instantly as a PDF. Choose from 10+ beautiful templates.",
  keywords: "resume builder, ATS friendly resume maker, download PDF resume, free resume creator, modern resume template",
};

export default function ResumeBuilderPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 md:px-6 py-6">
        <div className="w-full space-y-6">

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
      </div>
    </MainLayout>
  );
}
