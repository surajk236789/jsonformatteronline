import { MetadataRoute } from 'next';
import { getEventsFromSheets } from '@/lib/google';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://www.allformatter.com';

  const mainRoutes = [
    { path: '', priority: 1.0 },
    { path: '/tools/html-beautifier', priority: 0.9 },
    { path: '/tools/json-compare', priority: 0.9 },
    { path: '/tools/json-to-xml', priority: 0.9 },
    { path: '/tools/base64-to-pdf', priority: 0.9 },
    { path: '/events', priority: 0.9 },
    { path: '/events/hackathons', priority: 0.8 },
    { path: '/events/ai-meetups', priority: 0.8 },
  ];

  const toolRoutes = [
    '/tools/xml-formatter',
    '/tools/sql-formatter',
    '/tools/json-minifier',
    '/tools/json-to-yaml',
    '/tools/regex-tester',
    '/tools/json-to-csv',
    '/tools/csv-to-json',
    '/tools/yaml-to-json',
    '/tools/jwt-decoder',
    '/tools/json-schema-validator',
    '/tools/base64-encode-decode',
    '/tools/url-encode-decode',
    '/tools/hash-generator',
    '/tools/password-generator',
    '/tools/cron-parser',
    '/tools/css-minifier',
    '/tools/markdown-to-html',
    '/tools/lorem-ipsum-generator',
    '/tools/qr-code-generator',
    '/tools/image-to-base64',
    '/tools/word-counter',
    '/tools/css-gradient-generator',
    '/tools/html-to-jsx',
    '/tools/html-entity-encoder',
    '/tools/uuid-generator',
    '/tools/http-status-codes',
    '/tools/git-command-generator',
    '/tools/hash-generator',
    '/tools/text-diff',
    '/tools/seo-checker',
    '/tools/meta-tag-generator',
    '/tools/robots-txt-generator',
    '/tools/sitemap-generator',
    '/tools/unix-timestamp-converter',
    '/tools/timezone-converter',
    '/tools/resume-builder',
    '/tools/javascript-formatter',
    '/tools/color-picker',
  ];

  const blogRoutes = [
    '/blogs',
    '/blogs/xml-formatter-guide',
    '/blogs/json-to-yaml-guide',
    '/blogs/lorem-ipsum-guide',
    '/blogs/qr-code-guide',
    '/blogs/image-to-base64-guide',
    '/blogs/word-counter-guide',
    '/blogs/markdown-to-html-guide',
    '/blogs/sql-formatter-guide',
    '/blogs/uuid-generator-guide',
    '/blogs/text-diff-guide',
    '/blogs/json-minifier-guide',
    '/blogs/regex-tester-guide',
    '/blogs/json-formatting-best-practices',
    '/blogs/html-beautifier-guide',
    '/blogs/base64-encoding-explained',
    '/blogs/json-vs-xml',
    '/blogs/comparing-json-objects',
    '/blogs/api-debugging-tips',
  ];

  const staticRoutes = [
    '/about',
    '/privacy',
    '/terms',
  ];

  const now = new Date();
  
  // Fetch dynamic event slugs
  const events = await getEventsFromSheets();
  const eventRoutes = events.map(event => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [
    ...mainRoutes.map(({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority,
    })),
    ...eventRoutes,
    ...toolRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    ...blogRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  ];
}

