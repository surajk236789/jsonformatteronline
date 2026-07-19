"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ResumeData, defaultResumeData } from "./types";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonalInfo: (data: Partial<ResumeData["personalInfo"]>) => void;
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
  themeColor: string;
  setThemeColor: React.Dispatch<React.SetStateAction<string>>;
  hasStartedEditing: boolean;
  setHasStartedEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("professional");
  const [themeColor, setThemeColor] = useState<string>("blue");
  const [isLoaded, setIsLoaded] = useState(false);

  const [hasStartedEditing, setHasStartedEditing] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    const savedTemplate = localStorage.getItem("selectedTemplate");
    const savedThemeColor = localStorage.getItem("themeColor");
    const savedEditing = localStorage.getItem("hasStartedEditing");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse resume data from local storage", e);
      }
    }
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
    if (savedThemeColor) {
      setThemeColor(savedThemeColor);
    }
    if (savedEditing === "true") {
      setHasStartedEditing(true);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      localStorage.setItem("selectedTemplate", selectedTemplate);
      localStorage.setItem("themeColor", themeColor);
      localStorage.setItem("hasStartedEditing", String(hasStartedEditing));
    }
  }, [resumeData, selectedTemplate, themeColor, hasStartedEditing, isLoaded]);

  const updatePersonalInfo = (data: Partial<ResumeData["personalInfo"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updatePersonalInfo,
        selectedTemplate,
        setSelectedTemplate,
        themeColor,
        setThemeColor,
        hasStartedEditing,
        setHasStartedEditing,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
