import React from "react";
import MainLayout from "@/app/components/MainLayout";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout variant="tool">{children}</MainLayout>;
}
