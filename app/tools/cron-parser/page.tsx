import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import CronParser from "../../components/CronParser";

export const metadata: Metadata = {
  title: "Cron Expression Parser | Developer Tools",
  description: "Parse and explain crontab expressions.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/cron-parser" },
};

export default function CronParserPage() {
  return (
    <MainLayout>
      <CronParser />
    </MainLayout>
  );
}
