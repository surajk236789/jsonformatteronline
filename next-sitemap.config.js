/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://www.allformatter.com';

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
