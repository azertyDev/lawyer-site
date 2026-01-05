/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		formats: ['image/avif', 'image/webp'],
	},
	experimental: {
		optimizePackageImports: ['@iconify/react'],
	},
}

export default nextConfig
