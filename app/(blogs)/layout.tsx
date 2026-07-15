import React from "react";
import MainLayout from "@/app/components/MainLayout";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout variant="blog">{children}</MainLayout>;
}
