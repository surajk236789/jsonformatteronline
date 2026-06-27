# Developer Tools Hub

A premium, highly secure, and responsive utility suite designed for developers. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **react-i18next**.

All operations (parsing, formatting, and file conversion) occur strictly client-side to ensure maximum privacy and data security.

---

## ✨ Features

- **JSON Beautifier & Formatter (Default)**: Parse, format, validate, and minify raw JSON strings with real-time syntax checking.
- **HTML Beautifier**: Format and clean raw HTML markup with customizable indent spaces using `js-beautify`.
- **Base64 to PDF Converter**: Convert Base64 data-URI or standard strings back into PDF files, including an in-app sandboxed PDF document preview.
- **Google Ads Integrations**: Structured placements for Google Ads banners using simulated, responsive ad containers.
- **Dynamic Theme Engine**: Smooth, class-based toggle controls supporting Light and Dark modes.
- **Localization**: Full internationalization (i18n) support for English and Hindi (हिन्दी).
- **SEO Optimized**: Advanced semantic HTML layout, Google Fonts (`Outfit`), and metadata tag configurations.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the dashboard.

### 3. Production Build

Verify compilation, linting, and optimized bundle sizes:

```bash
npm run lint
npm run build
```

---

## 📁 Project Architecture

- **`app/page.tsx`**: Main entry dashboard hosting the state-driven tab workspace switcher.
- **`app/layout.tsx`**: Roots layout wrapping SEO configurations, global styling, Google Fonts, theme providers, and internationalization contexts.
- **`app/components/`**: Modular sub-components for each developer utility tool (`JsonBeautifier`, `HtmlBeautifier`, `Base64ToPdf`, `AdSenseContainer`).
- **`i18n.js`**: Translation dictionary and configurations.
- **`AGENTIC_GUIDE.md`**: Guide outlining codebase specifications and best practices for future AI agents operating in agentic mode.
