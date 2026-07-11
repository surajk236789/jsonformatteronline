import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.jsondiff.space';

  const routes = [
    '',
    '/html-beautifier',
    '/json-compare',
    '/json-to-xml',
    '/base64-to-pdf',
    '/tools/json-to-csv',
    '/tools/csv-to-json',
    '/tools/base64-encode-decode',
    '/tools/url-encode-decode',
    '/tools/hash-generator',
    '/tools/password-generator',
    '/tools/json-schema-validator',
    '/tools/css-minifier',
    '/tools/css-gradient-generator',
    '/tools/http-status-codes',
    '/tools/git-command-generator',
    '/tools/html-entity-encoder'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
