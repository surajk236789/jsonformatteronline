import React from "react";
import ToolHeader from "./ToolHeader";
import RelatedTools, { RelatedToolInfo } from "./RelatedTools";
import FeatureSection, { Feature } from "./FeatureSection";
import FaqSection, { Faq } from "./FaqSection";
import ContentSection, { ContentBlock } from "./ContentSection";

interface ToolLayoutProps {
  title: React.ReactNode;
  description: React.ReactNode;
  jsonLd?: any;
  relatedTools?: RelatedToolInfo[];
  features?: Feature[];
  featureTitle?: string;
  featureColor?: string;
  faqs?: Faq[];
  contentBlocks?: ContentBlock[];
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  description,
  jsonLd,
  relatedTools,
  features,
  featureTitle = "Why use this tool?",
  featureColor = "indigo",
  faqs,
  contentBlocks,
  children,
}: ToolLayoutProps) {
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <ToolHeader title={title} description={description} />

      {/* The actual tool component is rendered here */}
      {children}

      {/* Recommended tools to keep users engaged */}
      {relatedTools && relatedTools.length > 0 && (
        <RelatedTools tools={relatedTools} />
      )}

      {/* Core features of the tool */}
      {features && features.length > 0 && (
        <FeatureSection
          features={features}
          title={featureTitle}
          color={featureColor}
        />
      )}

      {/* Informational Content (SEO) */}
      {contentBlocks && contentBlocks.length > 0 && (
        <ContentSection blocks={contentBlocks} />
      )}

      {/* SEO-optimized Frequently Asked Questions */}
      {faqs && faqs.length > 0 && <FaqSection faqs={faqs} />}
    </>
  );
}
