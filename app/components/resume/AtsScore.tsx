"use client";

import React, { useMemo } from "react";
import { useResume } from "./ResumeContext";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export function AtsScore() {
  const { resumeData } = useResume();

  const { score, tips } = useMemo(() => {
    let currentScore = 0;
    const currentTips: string[] = [];

    // Personal Info (Max 30)
    if (resumeData.personalInfo.fullName) currentScore += 5;
    else currentTips.push("Add your full name.");

    if (resumeData.personalInfo.email) currentScore += 5;
    else currentTips.push("Add a professional email address.");

    if (resumeData.personalInfo.phone) currentScore += 5;
    else currentTips.push("Add a phone number.");

    if (resumeData.personalInfo.location) currentScore += 5;
    if (resumeData.personalInfo.website) currentScore += 5;
    else currentTips.push("Add a LinkedIn or portfolio link.");

    if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) currentScore += 5;
    else currentTips.push("Add a professional summary (at least 50 chars).");

    // Experience (Max 40)
    if (resumeData.experience.length > 0) {
      currentScore += 20;
      const hasDescriptions = resumeData.experience.some(exp => exp.description && exp.description.length > 20);
      if (hasDescriptions) currentScore += 20;
      else currentTips.push("Add detailed bullet points to your experience.");
    } else {
      currentTips.push("Add at least one relevant work experience.");
    }

    // Education (Max 15)
    if (resumeData.education.length > 0) {
      currentScore += 15;
    } else {
      currentTips.push("Add your educational background.");
    }

    // Skills (Max 15)
    if (resumeData.skills.length >= 5) {
      currentScore += 15;
    } else if (resumeData.skills.length > 0) {
      currentScore += 5;
      currentTips.push("Add at least 5 key skills for better keyword matching.");
    } else {
      currentTips.push("Add skills relevant to the job description.");
    }

    return { score: currentScore, tips: currentTips };
  }, [resumeData]);

  const getColor = (s: number) => {
    if (s >= 80) return "text-emerald-500";
    if (s >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getBgColor = (s: number) => {
    if (s >= 80) return "bg-emerald-50 dark:bg-emerald-900/20";
    if (s >= 50) return "bg-amber-50 dark:bg-amber-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  return (
    <div className={`p-4 rounded-xl border border-gray-200 dark:border-gray-700 ${getBgColor(score)} transition-colors duration-500`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          ATS Optimization Score
          <span title="Based on completeness and standard ATS requirements">
            <Info className="w-4 h-4 text-gray-400" />
          </span>
        </h3>
        <div className={`text-2xl font-bold ${getColor(score)}`}>
          {score}/100
        </div>
      </div>
      
      {score < 100 && (
        <div className="space-y-2 mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">How to improve:</p>
          <ul className="space-y-1">
            {tips.slice(0, 3).map((tip, idx) => (
              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {score >= 80 && (
        <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-2">
          <CheckCircle2 className="w-4 h-4" />
          Great job! Your resume is highly ATS-friendly.
        </div>
      )}
    </div>
  );
}
