"use client";

import React, { useRef, useState, useEffect } from "react";
import { useResume } from "./ResumeContext";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { Download, Loader2, Maximize2, X, LayoutTemplate } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Button } from "../ui/Button";

export function PreviewPane() {
  const { selectedTemplate, resumeData, setHasStartedEditing } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [debouncedResumeData, setDebouncedResumeData] = useState(resumeData);

  // Debounce resumeData to prevent lag while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedResumeData(resumeData);
    }, 500); // 500ms delay gives a very smooth typing experience
    return () => clearTimeout(timer);
  }, [resumeData]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) setIsExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsGenerating(true);

    try {
      const imgData = await toPng(resumeRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      const nameParts = (debouncedResumeData.personalInfo.fullName || "User").split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
      const fileName = [firstName, lastName, "allformatter", "resume.pdf"].filter(Boolean).join("_");
      
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "professional": return <ProfessionalTemplate previewData={debouncedResumeData} />;
      case "modern": return <ModernTemplate previewData={debouncedResumeData} />;
      case "creative": return <CreativeTemplate previewData={debouncedResumeData} />;
      default: return <ProfessionalTemplate previewData={debouncedResumeData} />;
    }
  };

  const PreviewContent = () => (
    <div className="w-[21cm] h-[29.7cm] bg-white mx-auto shadow-2xl">
      {renderTemplate()}
    </div>
  );

  return (
    <>
      <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden relative border border-gray-200 dark:border-gray-800">
        {/* Top Action Bar */}
        <div className="absolute top-2 right-2 left-2 z-10 flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsExpanded(true)}
              variant="ghost"
              size="icon"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-full text-gray-700 dark:text-gray-200"
              title="Expand Preview"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setHasStartedEditing(false)}
              variant="secondary"
              size="sm"
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm rounded-full text-xs font-medium px-3 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
            >
              <LayoutTemplate className="w-3.5 h-3.5 mr-1.5" />
              Change Template
            </Button>
          </div>

          <Button
            onClick={handleDownload}
            disabled={isGenerating}
            variant="primary"
            size="sm"
            className="shadow-md rounded-full text-xs px-3 py-1.5"
          >
            {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {isGenerating ? "..." : "PDF"}
          </Button>
        </div>

        {/* Mini Preview Container */}
        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900 flex justify-center items-start pt-16 pb-4 relative">
          <div className="origin-top transform scale-[0.25] sm:scale-[0.35] md:scale-[0.4] lg:scale-[0.25] xl:scale-[0.32] 2xl:scale-[0.4] transition-transform duration-300">
            <div className="w-[21cm] pointer-events-none">
              <PreviewContent />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden container specifically for high-quality PDF generation without scaling interference */}
      <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none opacity-0 z-[-1]">
        <div ref={resumeRef} className="w-[21cm] h-[29.7cm] bg-white">
          {renderTemplate()}
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute top-4 right-4 flex gap-4 z-50">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              variant="primary"
              className="shadow-xl rounded-full"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="secondary"
              size="icon"
              className="rounded-full shadow-xl"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="w-full h-full overflow-auto p-4 md:p-12 custom-scrollbar flex justify-center items-start">
            <div className="origin-top transform scale-[0.5] sm:scale-75 md:scale-90 lg:scale-100 xl:scale-110">
              <PreviewContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
