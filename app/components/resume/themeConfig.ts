export type ThemeColorName = "blue" | "indigo" | "emerald" | "rose" | "purple";

export interface ThemeColors {
  primary: string;
  light: string;
  dark: string;
}

export const themeColorMap: Record<ThemeColorName, ThemeColors> = {
  blue: {
    primary: "#2563eb", // blue-600
    light: "#dbeafe",   // blue-100
    dark: "#1e40af",    // blue-800
  },
  indigo: {
    primary: "#4f46e5", // indigo-600
    light: "#e0e7ff",   // indigo-100
    dark: "#3730a3",    // indigo-800
  },
  emerald: {
    primary: "#059669", // emerald-600
    light: "#d1fae5",   // emerald-100
    dark: "#065f46",    // emerald-800
  },
  rose: {
    primary: "#e11d48", // rose-600
    light: "#ffe4e6",   // rose-100
    dark: "#9f1239",    // rose-800
  },
  purple: {
    primary: "#9333ea", // purple-600
    light: "#f3e8ff",   // purple-100
    dark: "#6b21a8",    // purple-800
  },
};
