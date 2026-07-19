"use client";

import dynamic from "next/dynamic";

export const DynamicPreviewPane = dynamic(
  () => import("./PreviewPane").then((mod) => mod.PreviewPane),
  { ssr: false }
);
