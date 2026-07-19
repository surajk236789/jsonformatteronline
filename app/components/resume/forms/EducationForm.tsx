"use client";

import React from "react";
import { useResume } from "../ResumeContext";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { Education } from "../types";

export function EducationForm() {
  const { resumeData, setResumeData } = useResume();
  const { education } = resumeData;

  const handleAdd = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const handleRemove = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleChange = (id: string, field: keyof Education, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-500" /> Education
        </h2>
        <button
          onClick={handleAdd}
          className="text-sm flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {education.length === 0 && (
        <p className="text-sm text-gray-500 italic">No education added yet.</p>
      )}

      {education.map((edu) => (
        <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 relative bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => handleRemove(edu.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
              <div className="flex items-center gap-2">
                <input
                  type="month"
                  value={edu.endDate}
                  disabled={edu.current}
                  onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 dark:bg-gray-800 dark:text-white"
                />
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={(e) => handleChange(edu.id, "current", e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  Present
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
