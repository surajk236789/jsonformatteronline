"use client";

import React from "react";
import { useResume } from "../ResumeContext";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { Experience } from "../types";

export function ExperienceForm() {
  const { resumeData, setResumeData } = useResume();
  const { experience } = resumeData;

  const handleAdd = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResumeData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const handleRemove = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-500" /> Work Experience
        </h2>
        <button
          onClick={handleAdd}
          className="text-sm flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {experience.length === 0 && (
        <p className="text-sm text-gray-500 italic">No experience added yet.</p>
      )}

      {experience.map((exp) => (
        <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 relative bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => handleRemove(exp.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleChange(exp.id, "position", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
              <div className="flex flex-col gap-1.5">
                <input
                  type="month"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 dark:bg-gray-800 dark:text-white"
                />
                <label className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 mt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => handleChange(exp.id, "current", e.target.checked)}
                    className="rounded text-indigo-600 w-4 h-4 cursor-pointer focus:ring-indigo-500"
                  />
                  I currently work here
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Bullets)</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleChange(exp.id, "description", e.target.value)}
              rows={4}
              placeholder="- Achieved X by doing Y&#10;- Led a team of Z..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
