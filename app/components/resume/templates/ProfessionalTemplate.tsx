"use client";

import React from "react";
import { useResume } from "../ResumeContext";
import { ResumeData } from "../types";
import { themeColorMap, ThemeColorName } from "../themeConfig";

export function ProfessionalTemplate({ previewData }: { previewData?: ResumeData }) {
  const context = useResume();
  const resumeData = previewData || context.resumeData;
  const { personalInfo, experience, education, skills, projects = [], certifications = [], languages = [] } = resumeData;
  const theme = themeColorMap[(context.themeColor || "blue") as ThemeColorName];

  return (
    <div className="bg-white text-gray-900 font-serif p-8 max-w-[21cm] w-full mx-auto shadow-sm min-h-[29.7cm] box-border">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 pb-6" style={{ borderColor: theme.primary }}>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2 uppercase tracking-wide">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-lg text-gray-700 mb-2">{personalInfo.jobTitle || "Job Title"}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b mb-3" style={{ borderColor: theme.light, color: theme.dark }}>Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-800">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b mb-3" style={{ borderColor: theme.light, color: theme.dark }}>Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-sm font-medium text-gray-600">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="font-medium text-gray-700 text-sm mb-2">{exp.company}</div>
                {exp.description && (
                  <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-gray-800">
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b mb-4" style={{ borderColor: theme.light, color: theme.dark }}>Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{project.name}</h3>
                  {project.url && (
                    <span className="text-sm text-indigo-600 font-medium">
                      {project.url}
                    </span>
                  )}
                </div>
                {project.description && (
                  <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-gray-800">
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-base">{edu.degree}</h3>
                  <div className="text-gray-700 text-sm">{edu.institution}</div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b mb-4" style={{ borderColor: theme.light, color: theme.dark }}>Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-base">{cert.name}</h3>
                  <div className="text-gray-700 text-sm">{cert.issuer}</div>
                </div>
                {cert.date && (
                  <span className="text-sm font-medium text-gray-600">{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b mb-4" style={{ borderColor: theme.light, color: theme.dark }}>Languages</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-800">
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between items-center border-b border-gray-100 pb-1 last:border-0">
                <span className="font-bold">{lang.name}</span>
                <span className="text-gray-600 font-medium italic">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b mb-4" style={{ borderColor: theme.light, color: theme.dark }}>Skills</h2>
          <div className="text-sm text-gray-800 leading-relaxed">
            {skills.map((s) => s.name).join(" • ")}
          </div>
        </section>
      )}
    </div>
  );
}
