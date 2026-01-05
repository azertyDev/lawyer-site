import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts'],
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', 'src/test/'],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/app': path.resolve(__dirname, './src/app'),
			'@/widgets': path.resolve(__dirname, './src/widgets'),
			'@/features': path.resolve(__dirname, './src/features'),
			'@/entities': path.resolve(__dirname, './src/entities'),
			'@/shared': path.resolve(__dirname, './src/shared'),
		},
	},
})
