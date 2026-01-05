import { siteConfig } from '@/shared/config'
import { generateOrganizationSchema } from '@/shared/lib'
import { CookieBanner, ScrollToTop, Toaster } from '@/shared/ui'
import { Footer, Header, MobileActions } from '@/widgets'
import type { Metadata, Viewport } from 'next'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const serif = Source_Serif_4({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	variable: '--font-serif',
})

const sans = Source_Sans_3({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	variable: '--font-sans',
})

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: `${siteConfig.name} — юридические услуги`,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: [{ name: siteConfig.name }],
	creator: siteConfig.name,
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		url: siteConfig.url,
		title: `${siteConfig.name} — юридические услуги`,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: '/opengraph-image',
				width: 1200,
				height: 630,
				alt: 'Юридические услуги — экономические и гражданские споры',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: `${siteConfig.name} — юридические услуги`,
		description: siteConfig.description,
		images: ['/twitter-image'],
	},
	other: {
		'telegram:channel': '@lawyer_site',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export const viewport: Viewport = {
	themeColor: '#0B1121',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const organizationSchema = generateOrganizationSchema()

	return (
		<html lang="ru" className={`${serif.variable} ${sans.variable}`}>
			<head>
				<Script
					id="organization-schema"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>
			</head>
			<body className="min-h-screen font-sans antialiased">
				<Header />
				<main className="pb-16 md:pb-0">{children}</main>
				<Footer />
				<MobileActions />
				<ScrollToTop />
				<CookieBanner />
				<Toaster />
			</body>
		</html>
	)
}
