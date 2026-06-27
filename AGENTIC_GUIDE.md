# Project Developer & Agentic Mode Guide

Welcome! This guide outlines the core architecture and features of the **Developer Tools Hub** application, and details the **best practices for AI coding agents** (and developers) working on this repository.

---

## 🚀 Application Overview & Features

The Developer Tools Hub is a lightweight, responsive tool suite designed for developers. It supports internationalization (i18n) and automatic light/dark theme switching.

### 1. Main Hub / Home Portal
* **File Reference**: [app/page.tsx](file:///d:/Project/jsonformatteronline/app/page.tsx)
* **Description**: Serves as the landing page and navigation control.
* **Key Integrations**:
  * **Theme Switcher**: Utilizes `next-themes` (configured in [app/layout.tsx](file:///d:/Project/jsonformatteronline/app/layout.tsx)) to toggle classes between Light and Dark mode.
  * **Localization**: Imports translations dynamically via the `useTranslation` hook.
  * **Ad Placement**: Includes a placeholder box for Google Ads integration.

### 2. Base64 to PDF Converter
* **File Reference**: [app/pages/base64-pdf.js](file:///d:/Project/jsonformatteronline/app/pages/base64-pdf.js)
* **Description**: Converts a Base64 string back into a readable/downloadable PDF file.
* **Implementation Details**:
  * Decodes the input string using the native Web API `atob()`.
  * Creates a binary array and converts it into a `Blob` of type `application/pdf`.
  * Triggers a browser download using a temporary `<a>` element and `URL.createObjectURL(blob)`.
  * Displays input validation errors if the input string is not valid Base64.

### 3. JSON Beautifier
* **File Reference**: [app/pages/json-beautifier.js](file:///d:/Project/jsonformatteronline/app/pages/json-beautifier.js)
* **Description**: Parses, validates, and pretty-prints raw JSON input.
* **Implementation Details**:
  * Validates structure via `JSON.parse()`.
  * Pretty-prints the result using `JSON.stringify(parsed, null, 2)`.
  * Provides a copy-to-clipboard button utilizing the asynchronous `navigator.clipboard` API.
  * Gracefully handles and displays parsing errors to the user.

### 4. HTML Beautifier
* **File Reference**: [app/pages/html-beautifier.js](file:///d:/Project/jsonformatteronline/app/pages/html-beautifier.js)
* **Description**: Beautifies and reformats messy HTML strings.
* **Implementation Details**:
  * Uses the third-party `js-beautify` library to format HTML code with standard indentation (`indent_size: 2`).
  * Features a copy-to-clipboard functionality and renders the formatted output in a clean, scrollable pre-formatted container.

### 5. Translation & Global State
* **File Reference**: [i18n.js](file:///d:/Project/jsonformatteronline/i18n.js), [app/I18nProvider.tsx](file:///d:/Project/jsonformatteronline/app/I18nProvider.tsx)
* **Description**: Provides translation context throughout the application, supporting English (`en`) and Hindi (`hi`).

---

## 🛠️ Project Architecture Warning (Routing Discrepancy)

> [!WARNING]
> There is a routing discrepancy in the current layout:
> * The main landing page [app/page.tsx](file:///d:/Project/jsonformatteronline/app/page.tsx) uses `<Link>` components pointing to `/base64-to-pdf`, `/json-beautifier`, and `/html-beautifier`.
> * However, the files implementing these tools are placed under `app/pages/` as `base64-pdf.js`, `json-beautifier.js`, and `html-beautifier.js`.
> * In the standard **Next.js App Router** structure, files in `app/pages/` do not resolve directly. For proper routing, these should be reorganized into `app/base64-to-pdf/page.tsx`, `app/json-beautifier/page.tsx`, and `app/html-beautifier/page.tsx` directories, or set up with a dynamic routing scheme.
> * Prioritize fixing or maintaining this routing structure in future tasks.

---

## 🤖 Best Practices for Agentic Mode

When an AI coding agent is editing or extending this codebase, the following practices **must be followed strictly**:

### 1. Do Not Trust Training Data (Next.js 16+ Context)
* **The Rule**: As set up in [AGENTS.md](file:///d:/Project/jsonformatteronline/AGENTS.md) and [CLAUDE.md](file:///d:/Project/jsonformatteronline/CLAUDE.md), the installed version of Next.js contains breaking changes, new APIs, and conventions that differ from standard pre-2026 training data.
* **Action**: **Always read the version-matched documentation** inside `node_modules/next/dist/docs/` before making any major code changes or modifying routing. Do not assume older Next.js 13/14/15 APIs are valid.
* **Important Paths**:
  * App Router Docs: `node_modules/next/dist/docs/01-app/`
  * Guides (AI Agents, Navigation, etc.): `node_modules/next/dist/docs/01-app/02-guides/`

### 2. Enable and Leverage the Next.js MCP Server
* **The Setup**: This project is compatible with the **Model Context Protocol (MCP)** via the `next-devtools-mcp` package.
* **How to use**:
  * An `.mcp.json` file can be declared in the root to define the MCP server:
    ```json
    {
      "mcpServers": {
        "next-devtools": {
          "command": "npx",
          "args": ["-y", "next-devtools-mcp@latest"]
        }
      }
    }
    ```
  * During agentic execution, if the dev server is active (`npm run dev`), the agent can run tools like `get_errors`, `get_routes`, `get_page_metadata`, and `get_logs` to diagnose build errors, dynamic hydration mismatches, and trace server actions.

### 3. Styling & Styling Frameworks
* **The Stack**: Tailwind CSS v4.0.0+ and PostCSS (see [package.json](file:///d:/Project/jsonformatteronline/package.json)).
* **Best Practice**: Apply styling strictly using Tailwind CSS classes rather than custom vanilla CSS files. Ensure color schemes remain dark-mode compatible by always utilizing tailwind dark classes (e.g., `dark:bg-gray-900`, `dark:text-indigo-300`).

### 4. Internationalization Compliance
* **Best Practice**: Never hardcode user-facing copy.
* **Action**:
  1. Add any new translation strings to [i18n.js](file:///d:/Project/jsonformatteronline/i18n.js) under both `en` and `hi` translation blocks.
  2. Implement them inside React components using the `t("key")` method retrieved from:
     ```tsx
     import { useTranslation } from "react-i18next";
     const { t } = useTranslation();
     ```

### 5. Hydration and Client-Side States
* **Best Practice**: When creating stateful client components, ensure they do not produce hydration errors.
* **Action**: Add `"use client";` at the top of client-only components. If elements depend on values that only resolve on the client (like `localStorage` or `window.innerWidth`), wrap them or utilize `useEffect` hooks to run code only after mounting.
