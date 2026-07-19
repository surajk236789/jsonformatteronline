"use client";

import React from "react";
import { useResume } from "../ResumeContext";
import { FolderGit2, Plus, Trash2 } from "lucide-react";
import { Project } from "../types";

export function ProjectsForm() {
  const { resumeData, setResumeData } = useResume();
  const { projects = [] } = resumeData;

  const handleAdd = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      url: "",
      description: "",
    };
    setResumeData((prev) => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
  };

  const handleRemove = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleChange = (id: string, field: keyof Project, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-indigo-500" /> Projects
        </h2>
        <button
          onClick={handleAdd}
          className="text-sm flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-gray-500 italic">No projects added yet.</p>
      )}

      {projects.map((project) => (
        <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 relative bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => handleRemove(project.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleChange(project.id, "name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL / Link</label>
              <input
                type="url"
                value={project.url}
                onChange={(e) => handleChange(project.id, "url", e.target.value)}
                placeholder="https://"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Bullets)</label>
            <textarea
              value={project.description}
              onChange={(e) => handleChange(project.id, "description", e.target.value)}
              rows={3}
              placeholder="- Built X using Y&#10;- Increased performance by Z..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
