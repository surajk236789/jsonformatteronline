# Project Developer & Agentic Mode Guide

Welcome! This guide outlines the core architecture and features of the **Developer Tools Hub** application, and details the **best practices for AI coding agents** (and developers) working on this repository in Agentic Mode.

---

## 🚀 Application Overview & Features

The Developer Tools Hub is a single-page utility dashboard designed for developers. It supports internationalization (i18n), automatic light/dark theme switching, and responsive simulated Google Ads.

### 1. Main Workspace Portal
* **File Reference**: [app/page.tsx](file:///d:/Project/jsonformatteronline/app/page.tsx)
* **Description**: Serves as the landing page and implements a state-driven tab switcher.
* **Layout**:
  * **Header**: Contains the dynamic brand identity, dark mode toggles, and language switching button.
  * **Ad Slots**: Renders [AdSenseContainer.tsx](file:///d:/Project/jsonformatteronline/app/components/AdSenseContainer.tsx) banners above and below the main workspace.
  * **Tab Control**: Buttons toggle the `activeTab` state between `"json"`, `"html"`, and `"pdf"`.
  * **JSON Beautifier** is open/rendered by default.

### 2. JSON Beautifier
* **File Reference**: [app/components/JsonBeautifier.tsx](file:///d:/Project/jsonformatteronline/app/components/JsonBeautifier.tsx)
* **Description**: Parses, validates, minifies, and formats raw JSON data.
* **Features**:
  * Action buttons for **Format & Beautify** and **Minify JSON**.
  * Interactive **Paste Sample JSON** helper.
  * Real-time parsing error boundaries highlighting syntax validation issues.
  * Copy-to-clipboard button with visual success state transitions.

### 3. HTML Beautifier
* **File Reference**: [app/components/HtmlBeautifier.tsx](file:///d:/Project/jsonformatteronline/app/components/HtmlBeautifier.tsx)
* **Description**: Reformats and cleans messy HTML markup using the `js-beautify` library.
* **Features**:
  * Beautifies inputs with custom indent configurations (`indent_size: 2`).
  * Action buttons to format, copy results, or clear the workspace.
  * Dual-pane live syntax layout.

### 4. Base64 to PDF Converter
* **File Reference**: [app/components/Base64ToPdf.tsx](file:///d:/Project/jsonformatteronline/app/components/Base64ToPdf.tsx)
* **Description**: Decodes Base64-encoded strings back into readable PDF documents.
* **Features**:
  * Automatically strips Data URI headers (e.g., `data:application/pdf;base64,...`) and spacing.
  * Embeds a live sandboxed PDF preview iframe for instant validation.
  * Proper hook-based cleanups utilizing `URL.revokeObjectURL(pdfUrl)` on source changes or unmounting to avoid memory leaks.

### 5. AdSense Container
* **File Reference**: [app/components/AdSenseContainer.tsx](file:///d:/Project/jsonformatteronline/app/components/AdSenseContainer.tsx)
* **Description**: Wraps advertisement script loaders or renders responsive visual mock ads during development/testing. Includes a dynamic shimmer loading overlay.

---

## 🔍 SEO & Typography Setup

* **Fonts**: `layout.tsx` imports the premium Google Font `Outfit` via `next/font/google`. Custom variables in `globals.css` map `font-sans` to `--font-outfit`.
* **Metadata**: Optimized in [app/layout.tsx](file:///d:/Project/jsonformatteronline/app/layout.tsx) with comprehensive descriptive title, keywords, index settings, OpenGraph site configurations, and Twitter card protocols.

---

## 🤖 Best Practices for Agentic Mode

When an AI coding agent is editing or extending this codebase, the following practices **must be followed strictly**:

### 1. Version-Matched Documentation
* **Rule**: Next.js 16+ has breaking changes compared to standard pre-2026 training data.
* **Action**: **Always read the version-matched documentation** inside `node_modules/next/dist/docs/` before making any major code changes or modifying routing.
* **Important Paths**:
  * App Router Docs: `node_modules/next/dist/docs/01-app/`
  * Guides: `node_modules/next/dist/docs/01-app/02-guides/`

### 2. Model Context Protocol (MCP) Server
* **Action**: Start the development server (`npm run dev`) and connect using the MCP client definitions declared in `.mcp.json`. Use tools like `get_errors`, `get_routes`, `get_page_metadata`, and `get_logs` to diagnose compile and hydration issues instantly.

### 3. Styling & Styling Frameworks
* **Framework**: Tailwind CSS v4.0.0+ and PostCSS.
* **Practice**: Apply styles strictly using Tailwind utility classes. Maintain dark-mode compatibility with `dark:` utility variants. Use custom scrollbar or card transitions defined in [app/globals.css](file:///d:/Project/jsonformatteronline/app/globals.css).

### 4. Internationalization Compliance
* **Action**: Add any new user-facing strings to the translation map inside [i18n.js](file:///d:/Project/jsonformatteronline/i18n.js) under both `en` and `hi` scopes, and fetch using `t("key")` inside components.

### 5. Hydration Safeguards
* **Action**: To avoid mismatch errors with theme providers or client-side storage states, ensure that server-rendered HTML matches the first client paint by wrapping layout controls in a `mounted` check hook or utilizing `suppressHydrationWarning` on root tags where appropriate.
