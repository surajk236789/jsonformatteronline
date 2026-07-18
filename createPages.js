const fs = require('fs');
const path = require('path');

const tools = [
  {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    desc: 'Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.',
    componentName: 'MetaTagGenerator',
    emoji: '🏷️'
  },
  {
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    desc: 'Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.',
    componentName: 'RobotsTxtGenerator',
    emoji: '🤖'
  },
  {
    slug: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    desc: 'Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.',
    componentName: 'SitemapGenerator',
    emoji: '🗺️'
  },
  {
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    desc: 'Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.',
    componentName: 'UnixTimestampConverter',
    emoji: '⏱️'
  },
  {
    slug: 'timezone-converter',
    name: 'Timezone Converter',
    desc: 'Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.',
    componentName: 'TimezoneConverter',
    emoji: '🌍'
  }
];

const template = (tool) => `import React from "react";
import type { Metadata } from "next";

import ${tool.componentName} from "@/app/components/${tool.componentName}";

export const metadata: Metadata = {
  title: "Free ${tool.name} Online",
  description: "${tool.desc}",
  alternates: { canonical: "https://www.allformatter.com/tools/${tool.slug}" },
  openGraph: {
    title: "Free ${tool.name} Online",
    description: "${tool.desc}",
    url: "https://www.allformatter.com/tools/${tool.slug}",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ${tool.name} Online",
    description: "${tool.desc}",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${tool.name}",
    "url": "https://www.allformatter.com/tools/${tool.slug}",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "${tool.desc}",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 mb-4">
          ${tool.emoji} Tool
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          ${tool.name}
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          ${tool.desc}
        </p>
      </div>

      <${tool.componentName} />
    </>
  );
}
`;

tools.forEach(tool => {
  const dir = path.join(__dirname, 'app/(tools)/tools', tool.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), template(tool));
  console.log('Created page for', tool.slug);
});
