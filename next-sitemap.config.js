/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.jsondiff.space',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.jsondiff.space/sitemap.xml',
    ],
  },
}
