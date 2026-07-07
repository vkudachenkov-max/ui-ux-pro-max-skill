import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: { '2xl': '1360px' },
		},
		extend: {
			colors: {
				// ── MobiAds brand — Marketing ─────────────────────────
				brand: {
					purple: '#691E9A', // Фон
					magenta: '#9A12AF', // Свет
					lilac: '#C97DF3', // Форма
					violet: '#DE6BFF', // Форма
					pink: '#FDE2FC', // Форма
					mist: '#F4E9FF', // Форма
					fog: '#DCE6F3', // Фон (pale)
				},
				// ── MobiAds brand — Gaming ────────────────────────────
				gaming: {
					indigo: '#342EBB', // Фон
					blue: '#5B54F2', // Свет
					royal: '#5B6FF7', // Свет
					sky: '#6EA1FF', // Форма
					cyan: '#6EDBFF', // Форма
					pink: '#FB0CD2', // Форма
				},
				// ── Semantic (shadcn-style, mapped to brand) ──────────
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
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontFamily: {
				display: ['var(--font-display)', 'system-ui', 'sans-serif'],
				sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			backgroundImage: {
				'brand-grad':
					'linear-gradient(120deg, #342EBB 0%, #691E9A 46%, #9A12AF 100%)',
				'brand-grad-soft':
					'linear-gradient(120deg, #5B54F2 0%, #9A12AF 60%, #DE6BFF 100%)',
				'gaming-grad':
					'linear-gradient(120deg, #342EBB 0%, #5B54F2 45%, #FB0CD2 100%)',
			},
			keyframes: {
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' },
				},
				'marquee-rev': {
					from: { transform: 'translateX(-50%)' },
					to: { transform: 'translateX(0)' },
				},
				float: {
					'0%,100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-12px)' },
				},
				'grid-pan': {
					from: { backgroundPosition: '0 0' },
					to: { backgroundPosition: '48px 48px' },
				},
			},
			animation: {
				marquee: 'marquee 28s linear infinite',
				'marquee-rev': 'marquee-rev 28s linear infinite',
				float: 'float 6s ease-in-out infinite',
				'grid-pan': 'grid-pan 3s linear infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};

export default config;
