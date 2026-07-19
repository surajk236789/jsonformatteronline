import React from "react";
import { useResume } from "../ResumeContext";
import { Language } from "../types";
import { Trash2, Plus } from "lucide-react";
import { Button } from "../../ui/Button";

export function LanguagesForm() {
  const { resumeData, setResumeData } = useResume();
  const languages = resumeData.languages || [];

  const addLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: "",
      proficiency: "Native",
    };
    setResumeData({ ...resumeData, languages: [...languages, newLang] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setResumeData({
      ...resumeData,
      languages: languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    setResumeData({
      ...resumeData,
      languages: languages.filter((lang) => lang.id !== id),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">What languages do you speak?</p>
        </div>
        {languages.length > 0 && (
          <Button onClick={addLanguage} variant="primary" size="sm" className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Language
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {languages.map((lang, index) => (
          <div key={lang.id} className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/50 relative group transition-all hover:border-gray-300 dark:hover:border-gray-700">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-indigo-200 dark:border-indigo-800">
              {index + 1}
            </div>
            
            <button
              onClick={() => removeLanguage(lang.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Remove"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pr-8">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Language</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                  placeholder="e.g. English, Spanish"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Proficiency</label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white text-sm"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {languages.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">No languages added yet.</p>
            <Button onClick={addLanguage} variant="secondary" size="sm" className="mt-4">
              <Plus className="w-4 h-4 mr-1.5" /> Add your first language
            </Button>
          </div>
        ) : (
          <Button onClick={addLanguage} variant="secondary" size="sm" className="w-full py-3 mt-4 border-dashed border-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-1.5" /> Add another language
          </Button>
        )}
      </div>
    </div>
  );
}
