# Project Developer & Agentic Mode Guide

Welcome! This guide outlines the core architecture and features of the **Developer Tools Hub** application, and details the **best practices for AI coding agents** (and developers) working on this repository in Agentic Mode.

---

## 🚀 Application Overview & Features

The Developer Tools Hub is a multi-page utility dashboard designed for developers. It supports internationalization (i18n), persistent light/dark theme switching, a header with Tools and Blogs dropdowns, and responsive simulated Google Ads.

### 1. Main Workspace Portal
* **File Reference**: [app/page.tsx](file:///d:/Project/jsonformatteronline/app/page.tsx)
* **Description**: Serves as the landing page and renders the JSON Beautifier inside MainLayout.
* **Layout**:
  * **Header**: Contains brand logo, **Tools dropdown** (4 category groups), **Blogs dropdown**, and theme toggle.
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
  * **Floating copy icon button** (`absolute top-3 right-3`) overlaid on the output pane — toggles to a checkmark + "Copied!" for 2 seconds on click.

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
* **Description**: Converts valid JSON data into well-formed, pretty-printed XML entirely client-side with no external libraries.
* **Features**:
  * Pure recursive converter handles nested objects, arrays, `null`, booleans, numbers, and strings.
  * Automatic XML tag sanitization (invalid characters replaced; names starting with non-letters prefixed with `_`).
  * XML declaration `<?xml version="1.0" encoding="UTF-8"?>` always prepended.
  * Arrays are wrapped in `<root>` with `<item>` children; objects are wrapped in `<root>` using the key names as tag names.
  * Copy-to-clipboard button and **Download as `.xml`** button with visual confirmation states.
  * Accent colour: **orange** (`bg-orange-500/600`).

### 7. Additional Tools Suite
* **Directory**: `app/tools/*` and `app/components/*`
* **Description**: 16 secondary utility tools grouped into 4 navigation categories.

#### Tool Groups (defined in MainLayout.tsx `toolGroups`)

**🗂️ JSON Tools**
| Label | Route | Component |
|---|---|---|
| JSON Beautifier | `/` | JsonBeautifier.tsx |
| JSON Compare | `/json-compare` | JsonCompare.tsx |
| JSON → XML | `/json-to-xml` | JsonToXml.tsx |
| JSON → CSV | `/tools/json-to-csv` | JsonToCsv.tsx |
| CSV → JSON | `/tools/csv-to-json` | CsvToJson.tsx |
| YAML → JSON *(new)* | `/tools/yaml-to-json` | YamlToJson.tsx |
| JSON Schema Validator | `/tools/json-schema-validator` | JsonSchemaValidator.tsx |

**🎨 HTML / CSS Tools**
| Label | Route | Component |
|---|---|---|
| HTML Beautifier | `/html-beautifier` | HtmlBeautifier.tsx |
| CSS Minifier | `/tools/css-minifier` | CssMinifier.tsx |
| CSS Gradient Generator | `/tools/css-gradient-generator` | CssGradientGenerator.tsx |
| HTML → JSX | `/tools/html-to-jsx` | HtmlToJsx.tsx |
| HTML Entity Encoder | `/tools/html-entity-encoder` | HtmlEntityEncoder.tsx |

**🔐 Encode / Decode**
| Label | Route | Component |
|---|---|---|
| Base64 → PDF | `/base64-to-pdf` | Base64ToPdf.tsx |
| Base64 Encode/Decode | `/tools/base64-encode-decode` | Base64EncodeDecode.tsx |
| URL Encode/Decode | `/tools/url-encode-decode` | UrlEncodeDecode.tsx |
| JWT Decoder *(new)* | `/tools/jwt-decoder` | JwtDecoder.tsx |
| Hash Generator | `/tools/hash-generator` | HashGenerator.tsx |

**🛠️ Utilities**
| Label | Route | Component |
|---|---|---|
| Cron Parser | `/tools/cron-parser` | CronParser.tsx |
| Password Generator | `/tools/password-generator` | PasswordGenerator.tsx |
| Git Command Generator | `/tools/git-command-generator` | GitCommandGenerator.tsx |
| HTTP Status Codes | `/tools/http-status-codes` | HttpStatusCodes.tsx |

### 8. YAML to JSON Converter *(new)*
* **File Reference**: [app/components/YamlToJson.tsx](file:///d:/Project/jsonformatteronline/app/components/YamlToJson.tsx)
* **Route**: `/tools/yaml-to-json` → [app/tools/yaml-to-json/page.tsx](file:///d:/Project/jsonformatteronline/app/tools/yaml-to-json/page.tsx)
* **Description**: Converts valid YAML into formatted JSON entirely client-side using `js-yaml`.
* **Dependency**: `js-yaml` — must be imported as `import * as yaml from "js-yaml"` (namespace import). The ESM build does **not** have a default export.
* **Features**:
  * Dual-pane layout: YAML textarea input → JSON `pre/code` output with emerald syntax colouring.
  * **Floating copy icon button** overlaid on output pane (matches JsonBeautifier pattern).
  * Error display: rose-themed warning box with SVG icon (matches JsonBeautifier style).
  * Accent colour: **orange**.
* **SEO** (`page.tsx` metadata):
  * Title: `"YAML to JSON Converter Online — Free & Instant | Developer Tools"`
  * Canonical: `https://www.jsondiff.space/tools/yaml-to-json`

### 9. JWT Decoder *(new)*
* **File Reference**: [app/components/JwtDecoder.tsx](file:///d:/Project/jsonformatteronline/app/components/JwtDecoder.tsx)
* **Route**: `/tools/jwt-decoder` → [app/tools/jwt-decoder/page.tsx](file:///d:/Project/jsonformatteronline/app/tools/jwt-decoder/page.tsx)
* **Description**: Decodes JSON Web Tokens (JWT) into Header and Payload — entirely client-side, zero external JWT libraries.
* **Implementation**:
  * Splits token on `.` and asserts exactly 3 parts.
  * Custom `decodeBase64Url()` function: replaces `-`→`+`, `_`→`/`, pads with `=`, then uses `atob` + `decodeURIComponent`.
  * Parses both parts as JSON and pretty-prints.
* **Features**:
  * Header output: **red** text (`text-red-600 dark:text-red-400`).
  * Payload output: **purple** text (`text-purple-600 dark:text-purple-400`).
  * Accent colour: **purple**.
* **SEO** (`page.tsx` metadata):
  * Title: `"JWT Decoder Online — Free & Instant | Developer Tools"`
  * Canonical: `https://www.jsondiff.space/tools/jwt-decoder`

### 10. Blog System
* **Listing page**: [app/blogs/page.tsx](file:///d:/Project/jsonformatteronline/app/blogs/page.tsx) — Route: `/blogs`
* **Dynamic post page**: [app/blogs/[slug]/page.tsx](file:///d:/Project/jsonformatteronline/app/blogs/%5Bslug%5D/page.tsx) — Route: `/blogs/[slug]`
* **Description**: Static blog system with 6 articles.
* **Articles** (slugs): `json-formatting-best-practices`, `html-beautifier-guide`, `base64-encoding-explained`, `json-vs-xml`, `comparing-json-objects`, `api-debugging-tips`
* `generateStaticParams` pre-generates all slugs at build time.

### 11. AdSense Container
* **File Reference**: [app/components/AdSenseContainer.tsx](file:///d:/Project/jsonformatteronline/app/components/AdSenseContainer.tsx)
* **Description**: Wraps advertisement script loaders or renders responsive visual mock ads during development. Includes a shimmer loading overlay.

---

## 🎨 Header Navigation Architecture

The header is implemented in [MainLayout.tsx](file:///d:/Project/jsonformatteronline/app/components/MainLayout.tsx) and includes:

* **Brand logo** — rendered via [Brand.tsx](file:///d:/Project/jsonformatteronline/app/components/Brand.tsx), links to `/`
* **Tools dropdown** — 4 category groups rendered from `toolGroups` array
* **Blogs dropdown** — 6 recent articles + "View all" link
* **Theme toggle** — persists dark/light using `next-themes` (`storageKey="devtools-theme"`)
* **Mobile hamburger** — slide-down menu on small screens

### toolGroups shape:
```ts
const toolGroups = [
  {
    category: "JSON Tools",       // shown in dropdown header
    emoji: "🗂️",                  // shown on button
    tools: [
      { href: "/", label: "JSON Beautifier", description: "...", emoji: "🗂️", color: "emerald" },
      // ...
    ],
  },
  // ...
];
```
The `color` field maps to `colorMap` for icon badge styling.

### Dropdown behaviour:
* Clicking one dropdown closes the other (mutual exclusion via `openMenu` state).
* Outside clicks close all dropdowns (via `mousedown` listener on `document`).
* Route changes auto-close all dropdowns and the mobile menu.

---

## 🗂️ Floating Copy Icon Pattern (Standard)

**All output panes must follow this pattern** (established in `JsonBeautifier`, adopted in `YamlToJson`):

```tsx
const [copySuccess, setCopySuccess] = useState(false);

const handleCopy = () => {
  if (!output) return;
  navigator.clipboard.writeText(output);
  setCopySuccess(true);
  setTimeout(() => setCopySuccess(false), 2000);
};

// Output pane wrapper must be `position: relative`
<div className="relative ... flex flex-col">
  {output ? (
    <pre className="..."><code>{output}</code></pre>
  ) : (
    <div className="... empty state ...">...</div>
  )}

  {output && (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
    >
      {copySuccess ? (
        <><CheckmarkSVG /> Copied!</>
      ) : (
        <><CopySVG /> Copy</>
      )}
    </button>
  )}
</div>
```

**Do NOT** add a standalone "Copy" button at the bottom of the component. The icon overlay is the project standard.

---

## 🌗 Theme System

* **Provider**: `next-themes` `ThemeProvider` in [app/layout.tsx](file:///d:/Project/jsonformatteronline/app/layout.tsx)
* **Config**:
  ```tsx
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="devtools-theme">
  ```
* **`enableSystem={false}`** — Prevents OS system theme from overriding user preference.
* **Hydration guard**: `MainLayout` defers rendering until `mounted === true` to prevent SSR/client mismatches.

---

## 🔍 SEO & Typography Setup

* **Fonts**: `layout.tsx` imports `Outfit` via `next/font/google`. `globals.css` maps `font-sans` → `--font-outfit`.
* **Global Metadata**: In [app/layout.tsx](file:///d:/Project/jsonformatteronline/app/layout.tsx) — title, description, keywords, OpenGraph, Twitter card.
* **Blog SEO**: `generateMetadata` export in `[slug]/page.tsx` for per-post titles, descriptions, and canonical URLs.
* **Tool SEO**: Each `app/tools/<slug>/page.tsx` exports a `metadata` object:
  ```ts
  export const metadata: Metadata = {
    title: "Tool Name — Free & Instant | Developer Tools",
    description: "Short description of what it does.",
    keywords: ["keyword1", "keyword2"],
    alternates: { canonical: "https://www.jsondiff.space/tools/<slug>" },
  };
  ```
* **JSON-LD**: `MainLayout` auto-injects `WebApplication` schema for the current tool page.

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.9 | App framework (App Router) |
| `react` | 19.2.4 | UI library |
| `next-themes` | ^0.4.6 | Dark/light theme management |
| `@monaco-editor/react` | ^4.7.0 | Monaco DiffEditor (JSON Compare) |
| `js-beautify` | ^1.15.4 | HTML Beautifier formatting |
| `js-yaml` | latest | YAML parsing (YAML → JSON tool) |
| `i18next` + `react-i18next` | latest | Internationalization (en/hi) |
| `next-sitemap` | ^4.2.3 | Sitemap generation |
| `tailwindcss` | ^4.3.1 | Utility-first CSS (v4) |

---

## 🤖 Best Practices for Agentic Mode

### 1. Version-Matched Documentation
* **Rule**: Next.js 16+ has breaking changes vs pre-2026 training data.
* **Action**: Always read `node_modules/next/dist/docs/01-app/` before major routing or API changes.

### 2. MCP Server
* Start `npm run dev` and connect via `.mcp.json`. Use `get_errors`, `get_routes`, `get_page_metadata`, `get_logs` to diagnose issues.

### 3. Styling
* Tailwind CSS v4. Strict utility classes only. Always include `dark:` variants.

### 4. Internationalization Compliance
* Add new user-facing strings to [i18n.js](file:///d:/Project/jsonformatteronline/i18n.js) under both `en` and `hi`, then use `t("key")`.
* Secondary tools (e.g., YAML→JSON, JWT Decoder) currently use hardcoded English strings. Extend i18n if they are localised.

### 5. Hydration Safeguards
* Wrap theme-dependent or client-storage-dependent UI in a `mounted === true` guard from `useEffect`.

### 6. Adding New Blog Posts
1. Add slug + content to `blogContent` in `app/blogs/[slug]/page.tsx`.
2. Add entry to `blogs` array in `app/blogs/page.tsx`.
3. Add to `blogLinks` array in `MainLayout.tsx`.

### 7. Adding New Tools — Checklist
1. Create `app/components/MyTool.tsx` with `"use client"` directive.
2. Create `app/tools/<slug>/page.tsx` exporting `metadata` (title, description, keywords, canonical) and rendering `<MainLayout><MyTool /></MainLayout>`.
3. Add tool entry to correct category in `toolGroups` in `MainLayout.tsx`.
4. Use the **floating copy icon pattern** (see section above) for any output pane.
5. Choose a consistent accent colour (`color` key) and reflect it in feature card hover effects.

### 8. ESM Import Gotcha — `js-yaml`
* **Always** use the namespace import:
  ```ts
  import * as yaml from "js-yaml";   // ✅ correct
  import yaml from "js-yaml";         // ❌ causes build error
  ```
  The `js-yaml` ESM build (`js-yaml.mjs`) has no default export. Using a default import causes: `Export default doesn't exist in target module`.
