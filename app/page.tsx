"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-300 mb-6">
        {t("title", { defaultValue: "Developer Tools Hub" })}
      </h1>

      {/* Navigation */}
      <nav className="flex gap-6 mb-8">
        <Link href="/base64-to-pdf" className="text-blue-600 hover:underline">
          {t("base64Pdf", { defaultValue: "Base64 → PDF" })}
        </Link>
        <Link href="/json-beautifier" className="text-green-600 hover:underline">
          {t("jsonBeautifier", { defaultValue: "JSON Beautifier" })}
        </Link>
        <Link href="/html-beautifier" className="text-purple-600 hover:underline">
          {t("htmlBeautifier", { defaultValue: "HTML Beautifier" })}
        </Link>
      </nav>

      {/* Theme Switcher */}
      <div className="mb-6">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {theme === "light" ? t("darkMode", { defaultValue: "Dark Mode" }) : t("lightMode", { defaultValue: "Light Mode" })}
        </button>
      </div>

      {/* Google Ads Placeholder */}
      <div className="w-full max-w-3xl h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg shadow mb-8">
        <p className="text-gray-600 dark:text-gray-300">
          Google Ads Space
        </p>
      </div>

      <p className="text-gray-700 dark:text-gray-300">
        {t("welcome", { defaultValue: "Choose a tool above to get started." })}
      </p>
    </main>
  );
}
