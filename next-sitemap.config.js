/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jsonformatteronline.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://jsonformatteronline.com/sitemap.xml',
    ],
  },
}
