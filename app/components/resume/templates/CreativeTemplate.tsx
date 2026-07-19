"use client";

import React from "react";
import { useResume } from "../ResumeContext";
import { ResumeData } from "../types";
import { themeColorMap, ThemeColorName } from "../themeConfig";

export function CreativeTemplate({ previewData }: { previewData?: ResumeData }) {
  const context = useResume();
  const resumeData = previewData || context.resumeData;
  const { personalInfo, experience, education, skills, projects = [], certifications = [], languages = [] } = resumeData;
  const theme = themeColorMap[(context.themeColor || "blue") as ThemeColorName];

  return (
    <div className="bg-neutral-50 text-neutral-800 font-sans max-w-[21cm] w-full mx-auto shadow-sm min-h-[29.7cm] box-border">
      {/* Header */}
      <header className="text-white p-10 rounded-br-[100px] mb-8" style={{ backgroundColor: theme.primary }}>
        <h1 className="text-4xl font-black tracking-tight mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-xl font-medium mb-6" style={{ color: theme.light }}>
          {personalInfo.jobTitle || "Job Title"}
        </p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/90">
          {personalInfo.email && <div className="flex items-center gap-1.5">✉ {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1.5">☏ {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1.5">⚲ {personalInfo.location}</div>}
          {personalInfo.website && <div className="flex items-center gap-1.5">🌐 {personalInfo.website}</div>}
        </div>
      </header>

      <div className="px-10 pb-10 grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && (
            <section>
              <h2 className="text-2xl font-black text-neutral-900 mb-4">Profile</h2>
              <p className="text-neutral-600 leading-relaxed text-sm">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-neutral-900 mb-6">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: theme.primary }}>{exp.position}</h3>
                        <div className="font-medium text-neutral-800">{exp.company}</div>
                      </div>
                      <div className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: theme.light, color: theme.dark }}>
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <ul className="text-sm space-y-2 text-neutral-600">
                        {exp.description.split("\n").filter(line => line.trim()).map((line, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1" style={{ color: theme.primary }}>✦</span>
                            <span>{line.replace(/^-/, "").trim()}</span>
                          </li>
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
              <h2 className="text-2xl font-black text-neutral-900 mb-6">Projects</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                    <div className="flex flex-col gap-1 mb-4">
                      <h3 className="font-bold text-lg" style={{ color: theme.primary }}>{project.name}</h3>
                      {project.url && (
                        <div className="text-sm font-medium text-neutral-500">{project.url}</div>
                      )}
                    </div>
                    {project.description && (
                      <ul className="text-sm space-y-2 text-neutral-600">
                        {project.description.split("\n").filter(line => line.trim()).map((line, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1" style={{ color: theme.primary }}>✦</span>
                            <span>{line.replace(/^-/, "").trim()}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar content but placed in grid */}
        <div className="col-span-4 space-y-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-neutral-900 mb-4">Skills</h2>
              <div className="flex flex-col gap-3">
                {skills.map((s) => (
                  <div key={s.id}>
                    <div className="text-sm font-bold text-neutral-700 mb-1">{s.name}</div>
                    <div className="w-full bg-neutral-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: theme.primary, width: s.level === 'Expert' ? '100%' : s.level === 'Intermediate' ? '75%' : '50%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-neutral-900 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: theme.light }}>
                    <h3 className="font-bold text-neutral-800 text-sm">{edu.degree}</h3>
                    <div className="text-neutral-600 text-sm font-medium my-0.5">{edu.institution}</div>
                    <div className="text-xs font-bold" style={{ color: theme.primary }}>
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-neutral-900 mb-4">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border-l-2 pl-4" style={{ borderColor: theme.light }}>
                    <h3 className="font-bold text-neutral-800 text-sm">{cert.name}</h3>
                    <div className="text-neutral-600 text-sm font-medium my-0.5">{cert.issuer}</div>
                    {cert.date && (
                      <div className="text-xs font-bold" style={{ color: theme.primary }}>{cert.date}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-neutral-900 mb-4">Languages</h2>
              <div className="flex flex-col gap-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-sm border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                    <span className="font-bold text-neutral-700">{lang.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.light, color: theme.dark }}>
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
