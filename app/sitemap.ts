import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://www.allformatter.com';

  const mainRoutes = [
    { path: '', priority: 1.0 },
    { path: '/tools/html-beautifier', priority: 0.9 },
    { path: '/tools/json-compare', priority: 0.9 },
    { path: '/tools/json-to-xml', priority: 0.9 },
    { path: '/tools/base64-to-pdf', priority: 0.9 },
  ];

  const toolRoutes = [
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
    '/tools/css-gradient-generator',
    '/tools/html-to-jsx',
    '/tools/html-entity-encoder',
    '/tools/http-status-codes',
    '/tools/git-command-generator',
    '/tools/seo-checker',
    '/tools/meta-tag-generator',
    '/tools/robots-txt-generator',
    '/tools/sitemap-generator',
    '/tools/unix-timestamp-converter',
    '/tools/timezone-converter',
  ];

  const blogRoutes = [
    '/blogs',
    '/blogs/json-formatting-best-practices',
    '/blogs/html-beautifier-guide',
    '/blogs/base64-encoding-explained',
    '/blogs/json-vs-xml',
    '/blogs/comparing-json-objects',
    '/blogs/api-debugging-tips',
  ];

  const now = new Date();

  return [
    ...mainRoutes.map(({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority,
    })),
    ...toolRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
