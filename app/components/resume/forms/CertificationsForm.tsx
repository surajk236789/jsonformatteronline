"use client";

import React from "react";
import { useResume } from "../ResumeContext";
import { Award, Plus, Trash2 } from "lucide-react";
import { Certification } from "../types";

export function CertificationsForm() {
  const { resumeData, setResumeData } = useResume();
  const { certifications = [] } = resumeData;

  const handleAdd = () => {
    const newCert: Certification = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      issuer: "",
      date: "",
    };
    setResumeData((prev) => ({ ...prev, certifications: [...(prev.certifications || []), newCert] }));
  };

  const handleRemove = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const handleChange = (id: string, field: keyof Certification, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-500" /> Certifications
        </h2>
        <button
          onClick={handleAdd}
          className="text-sm flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {certifications.length === 0 && (
        <p className="text-sm text-gray-500 italic">No certifications added yet.</p>
      )}

      {certifications.map((cert) => (
        <div key={cert.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 relative bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => handleRemove(cert.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Certification Name</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleChange(cert.id, "name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Issuer</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleChange(cert.id, "issuer", e.target.value)}
                placeholder="e.g. AWS, Google"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Issued</label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) => handleChange(cert.id, "date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
