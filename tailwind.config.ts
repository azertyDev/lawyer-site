import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/features/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/entities/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/shared/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					foreground: 'hsl(var(--gold-foreground))',
				},
				navy: {
					DEFAULT: 'hsl(var(--navy))',
					50: 'hsl(var(--navy-50))',
					100: 'hsl(var(--navy-100))',
					200: 'hsl(var(--navy-200))',
					800: 'hsl(var(--navy-800))',
					900: 'hsl(var(--navy-900))',
				},
			},
			fontFamily: {
				serif: ['var(--font-serif)', 'Georgia', 'serif'],
				sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
				'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out forwards',
				'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
				'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
				'scale-in': 'scaleIn 0.4s ease-out forwards',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
			},
		},
	},
	plugins: [],
}

export default config
