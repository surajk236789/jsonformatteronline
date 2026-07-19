"use client";

import React from "react";
import { useResume } from "../ResumeContext";
import { ResumeData } from "../types";
import { themeColorMap, ThemeColorName } from "../themeConfig";

export function ModernTemplate({ previewData }: { previewData?: ResumeData }) {
  const context = useResume();
  const resumeData = previewData || context.resumeData;
  const { personalInfo, experience, education, skills, projects = [], certifications = [], languages = [] } = resumeData;
  const theme = themeColorMap[(context.themeColor || "blue") as ThemeColorName];

  return (
    <div className="bg-white text-slate-800 font-sans max-w-[21cm] w-full mx-auto shadow-sm min-h-[29.7cm] box-border flex">
      {/* Left Column - Sidebar */}
      <div className="w-1/3 bg-slate-100 p-8 flex flex-col gap-8 border-r border-slate-200">
        <div className="break-words">
          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg font-medium mb-6" style={{ color: theme.primary }}>
            {personalInfo.jobTitle || "Job Title"}
          </p>
          
          <div className="space-y-3 text-sm text-slate-600 font-medium">
            {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div className="break-all" style={{ color: theme.primary }}>{personalInfo.website}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 tracking-wide uppercase">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s.id} className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 tracking-wide uppercase">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3>
                  <div className="text-slate-600 text-sm mt-0.5">{edu.institution}</div>
                  <div className="text-slate-400 text-xs mt-1 font-medium">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 tracking-wide uppercase">Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-bold text-slate-800 text-sm">{cert.name}</h3>
                  <div className="text-slate-600 text-sm mt-0.5">{cert.issuer}</div>
                  {cert.date && (
                    <div className="text-slate-400 text-xs mt-1 font-medium">{cert.date}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 tracking-wide uppercase">Languages</h2>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-800">{lang.name}</span>
                  <span className="text-slate-500 font-medium">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Main Content */}
      <div className="w-2/3 p-8 flex flex-col gap-8">
        {personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 inline-block rounded-full" style={{ backgroundColor: theme.primary }}></span>
              Profile
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 inline-block rounded-full" style={{ backgroundColor: theme.primary }}></span>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:ring-4"
                     style={{ "--tw-ring-color": theme.light } as React.CSSProperties}>
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                  <div className="mb-2">
                    <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold" style={{ color: theme.primary }}>{exp.company}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-medium">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 text-sm space-y-1.5 text-slate-700">
                      {exp.description.split("\n").filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^-/, "").trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 inline-block rounded-full" style={{ backgroundColor: theme.primary }}></span>
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:ring-4"
                     style={{ "--tw-ring-color": theme.light } as React.CSSProperties}>
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                  <div className="mb-2">
                    <h3 className="font-bold text-lg text-slate-800">{project.name}</h3>
                    {project.url && (
                      <div className="text-sm font-medium" style={{ color: theme.primary }}>
                        {project.url}
                      </div>
                    )}
                  </div>
                  {project.description && (
                    <ul className="list-disc list-outside ml-4 text-sm space-y-1.5 text-slate-700">
                      {project.description.split("\n").filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^-/, "").trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
