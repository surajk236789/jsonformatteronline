# Project Developer & Agentic Mode Guide

Welcome! This guide outlines the core architecture and features of the **Developer Tools Hub** application, and details the **best practices for AI coding agents** (and developers) working on this repository in Agentic Mode.

---

## 🚀 Application Overview & Features

The Developer Tools Hub is a multi-page utility dashboard designed for developers. It supports internationalization (i18n), persistent light/dark theme switching, a header with Tools and Blogs dropdowns, and responsive simulated Google Ads.

### 1. Main Workspace Portal
* **File Reference**: [app/page.tsx](file:///d:/Project/jsonformatteronline/app/page.tsx)
* **Description**: Serves as the landing page and renders the JSON Beautifier inside MainLayout.
* **Layout**:
  * **Header**: Contains brand logo, **Tools dropdown** (all 5 tools), **Blogs dropdown**, language switcher, and theme toggle.
  * **Ad Slots**: Renders [AdSenseContainer.tsx](file:///d:/Project/jsonformatteronline/app/components/AdSenseContainer.tsx) banners above and below the main workspace.
  * **Tab Navigation**: A segmented pill nav (`/`, `/html-beautifier`, `/base64-to-pdf`, `/json-compare`, `/json-to-xml`) rendered below the title block.
  * **JSON Beautifier** is the default tool rendered on `/`.

### 2. JSON Beautifier
* **File Reference**: [app/components/JsonBeautifier.tsx](file:///d:/Project/jsonformatteronline/app/components/JsonBeautifier.tsx)
* **Route**: `/`
* **Description**: Parses, validates, minifies, and formats raw JSON data.
* **Features**:
  * Action buttons for **Format & Beautify** and **Minify JSON**.
  * Interactive **Paste Sample JSON** helper.
  * Real-time parsing error boundaries highlighting syntax validation issues.
  * Copy-to-clipboard button with visual success state transitions.

### 3. HTML Beautifier
* **File Reference**: [app/components/HtmlBeautifier.tsx](file:///d:/Project/jsonformatteronline/app/components/HtmlBeautifier.tsx)
* **Route**: `/html-beautifier` → [app/html-beautifier/page.tsx](file:///d:/Project/jsonformatteronline/app/html-beautifier/page.tsx)
* **Description**: Reformats and cleans messy HTML markup using the `js-beautify` library.
* **Features**:
  * Beautifies inputs with custom indent configurations (`indent_size: 2`).
  * Action buttons to format, copy results, or clear the workspace.
  * Dual-pane live syntax layout.

### 4. Base64 to PDF Converter
* **File Reference**: [app/components/Base64ToPdf.tsx](file:///d:/Project/jsonformatteronline/app/components/Base64ToPdf.tsx)
* **Route**: `/base64-to-pdf` → [app/base64-to-pdf/page.tsx](file:///d:/Project/jsonformatteronline/app/base64-to-pdf/page.tsx)
* **Description**: Decodes Base64-encoded strings back into readable PDF documents.
* **Features**:
  * Automatically strips Data URI headers (e.g., `data:application/pdf;base64,...`) and spacing.
  * Embeds a live sandboxed PDF preview iframe for instant validation.
  * Proper hook-based cleanups utilizing `URL.revokeObjectURL(pdfUrl)` on source changes or unmounting to avoid memory leaks.

### 5. JSON Compare
* **File Reference**: [app/components/JsonCompare.tsx](file:///d:/Project/jsonformatteronline/app/components/JsonCompare.tsx)
* **Route**: `/json-compare` → [app/json-compare/page.tsx](file:///d:/Project/jsonformatteronline/app/json-compare/page.tsx)
* **Description**: Visually compares two JSON objects with a side-by-side Monaco DiffEditor.
* **Features**:
  * VSCode-like editor experience with native line numbers.
  * Collapsible object and array nodes for easier navigation.
  * Live differences highlighting and editable panes.

### 6. JSON to XML Converter
* **File Reference**: [app/components/JsonToXml.tsx](file:///d:/Project/jsonformatteronline/app/components/JsonToXml.tsx)
* **Route**: `/json-to-xml` → [app/json-to-xml/page.tsx](file:///d:/Project/jsonformatteronline/app/json-to-xml/page.tsx)
* **Description**: Converts valid JSON data into well-formed, pretty-printed XML — entirely client-side with no external libraries.
* **Features**:
  * Pure recursive converter handles nested objects, arrays, `null`, booleans, numbers, and strings.
  * Automatic XML tag sanitization (invalid characters replaced; names starting with non-letters prefixed with `_`).
  * XML declaration `<?xml version="1.0" encoding="UTF-8"?>` always prepended.
  * Arrays are wrapped in `<root>` with `<item>` children; objects are wrapped in `<root>` using the key names as tag names.
  * Copy-to-clipboard button and **Download as `.xml`** button with visual confirmation states.
  * Accent colour: **orange** (`bg-orange-500/600`) — consistent with the tab indicator in `MainLayout.tsx`.

### 7. Blog System
* **Listing page**: [app/blogs/page.tsx](file:///d:/Project/jsonformatteronline/app/blogs/page.tsx) — Route: `/blogs`
* **Dynamic post page**: [app/blogs/[slug]/page.tsx](file:///d:/Project/jsonformatteronline/app/blogs/[slug]/page.tsx) — Route: `/blogs/[slug]`
* **Description**: A static blog system with 6 articles covering JSON formatting, HTML beautification, Base64 encoding, JSON vs XML, JSON comparison, and API debugging tips.
* **Articles** (slugs):
  * `json-formatting-best-practices`
  * `html-beautifier-guide`
  * `base64-encoding-explained`
  * `json-vs-xml`
  * `comparing-json-objects`
  * `api-debugging-tips`
* **Implementation note**: Blog content is co-located in the dynamic `[slug]/page.tsx` file. All content renders via a lightweight custom markdown renderer (no external library). `generateStaticParams` pre-generates all slugs at build time.

### 8. AdSense Container
* **File Reference**: [app/components/AdSenseContainer.tsx](file:///d:/Project/jsonformatteronline/app/components/AdSenseContainer.tsx)
* **Description**: Wraps advertisement script loaders or renders responsive visual mock ads during development/testing. Includes a dynamic shimmer loading overlay.

---

## 🎨 Header Navigation Architecture

The header is implemented in [MainLayout.tsx](file:///d:/Project/jsonformatteronline/app/components/MainLayout.tsx) and includes:

* **Brand logo** (left) — links to `/`
* **Tools dropdown** (desktop nav) — shows all 5 developer tools with emoji, label, and description
* **Blogs dropdown** (desktop nav) — shows 6 recent articles + "View all" link to `/blogs`
* **Language toggle** — switches between `en` and `hi` via react-i18next
* **Theme toggle** — persists dark/light mode using `next-themes` with `storageKey="devtools-theme"`
* **Mobile hamburger** — collapses tools and blogs into a single slide-down menu on small screens

### Dropdown behaviour:
* Clicking one dropdown closes the other (mutual exclusion)
* Outside clicks close all dropdowns (via `mousedown` listener on `document`)
* Route changes auto-close all dropdowns and the mobile menu

---

## 🌗 Theme System

* **Provider**: `next-themes` `ThemeProvider` in [app/layout.tsx](file:///d:/Project/jsonformatteronline/app/layout.tsx)
* **Config**:
  ```tsx
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="devtools-theme">
  ```
* **`enableSystem={false}`** — Critical. Prevents the OS system theme from overriding the user's explicit choice.
* **`storageKey="devtools-theme"`** — Stores the user preference in `localStorage` under this key for persistence across page loads and routes.
* **`attribute="class"`** — Adds/removes the `dark` class on `<html>` to activate `dark:` Tailwind variants.
* **Hydration guard**: `MainLayout` defers all rendering until `mounted === true` (via `useEffect`) to prevent SSR/client hydration mismatches.

---

## 🔍 SEO & Typography Setup

* **Fonts**: `layout.tsx` imports the premium Google Font `Outfit` via `next/font/google`. Custom variables in `globals.css` map `font-sans` to `--font-outfit`.
* **Metadata**: Optimized in [app/layout.tsx](file:///d:/Project/jsonformatteronline/app/layout.tsx) with comprehensive descriptive title, keywords, index settings, OpenGraph site configurations, and Twitter card protocols.
* **Blog SEO**: Each blog page exports `generateMetadata` for dynamic per-post titles and descriptions, plus canonical URLs.

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

### 6. Adding New Blog Posts
* **Action**: Add new slugs to the `blogContent` registry in [app/blogs/[slug]/page.tsx](file:///d:/Project/jsonformatteronline/app/blogs/%5Bslug%5D/page.tsx) and to the `blogs` array in [app/blogs/page.tsx](file:///d:/Project/jsonformatteronline/app/blogs/page.tsx). Also update the dropdown list in `MainLayout.tsx`.

### 7. Adding New Tools
* **Action**: Create a new route directory under `app/`, update the `tools` array in [MainLayout.tsx](file:///d:/Project/jsonformatteronline/app/components/MainLayout.tsx), and add a new tab `<Link>` to the segmented nav. Assign a consistent accent color.
