import "./globals.css";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // configure i18n separately

export const metadata = {
  title: "Developer Tools Hub",
  description: "Base64 to PDF, JSON Beautifier, HTML Beautifier",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
