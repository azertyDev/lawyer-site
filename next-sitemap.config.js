/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/', '/data-processing-consent'],
			},
		],
	},
	exclude: ['/api/*'],
	changefreq: 'weekly',
	priority: 0.7,
	transform: async (config, path) => {
		const priorities = {
			'/': 1.0,
			'/services': 0.9,
			'/contacts': 0.8,
			'/fees': 0.8,
			'/about': 0.7,
			'/faq': 0.7,
			'/practice': 0.7,
		}

		return {
			loc: path,
			changefreq: config.changefreq,
			priority: priorities[path] || config.priority,
			lastmod: new Date().toISOString(),
		}
	},
}
