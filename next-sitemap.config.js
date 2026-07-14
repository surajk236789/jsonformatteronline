/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://www.jsondiff.space';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
    ],
  },
}
