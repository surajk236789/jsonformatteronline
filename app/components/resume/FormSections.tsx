"use client";

import React, { useState } from "react";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { LanguagesForm } from "./forms/LanguagesForm";
import { Button } from "../ui/Button";

const STEPS = [
  { id: "personal", label: "Personal Info", component: PersonalInfoForm },
  { id: "experience", label: "Experience", component: ExperienceForm },
  { id: "projects", label: "Projects", component: ProjectsForm },
  { id: "education", label: "Education", component: EducationForm },
  { id: "certifications", label: "Certifications", component: CertificationsForm },
  { id: "languages", label: "Languages", component: LanguagesForm },
  { id: "skills", label: "Skills", component: SkillsForm },
];

export function FormSections() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const nextStep = () => !isLastStep && setCurrentStepIndex(i => i + 1);
  const prevStep = () => !isFirstStep && setCurrentStepIndex(i => i - 1);

  const CurrentComponent = STEPS[currentStepIndex].component;

  return (
    <div className="flex flex-col h-full">
      {/* Stepper Header */}
      <div className="flex items-center overflow-x-auto custom-scrollbar pb-4 mb-6 border-b border-gray-200 dark:border-gray-800 gap-2">
        {STEPS.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStepIndex(index)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : isCompleted
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {index + 1}. {step.label}
            </button>
          );
        })}
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar min-h-[50vh]">
        <CurrentComponent />
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={isFirstStep}
          className={isFirstStep ? "invisible" : ""}
        >
          &larr; Back
        </Button>
        
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={isLastStep}
          className={isLastStep ? "invisible" : ""}
        >
          Next Step &rarr;
        </Button>
      </div>
    </div>
  );
}
