"use client";

import React, { useState } from "react";
import { useResume } from "../ResumeContext";
import { Wrench, Plus, X } from "lucide-react";
import { Skill } from "../types";

export function SkillsForm() {
  const { resumeData, setResumeData } = useResume();
  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSkill.trim(),
      level: "Intermediate",
    };
    
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    setNewSkill("");
  };

  const handleRemove = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <Wrench className="w-5 h-5 text-indigo-500" /> Skills
      </h2>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g. React, Node.js, Project Management"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-1 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800/50"
          >
            <span className="text-sm font-medium">{skill.name}</span>
            <button
              onClick={() => handleRemove(skill.id)}
              className="hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 italic w-full">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
