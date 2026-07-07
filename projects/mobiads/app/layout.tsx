import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/montserrat';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
	metadataBase: new URL('https://mobiads.io'),
	title: 'MobiAds — топливо для мобильных приложений',
	description:
		'MobiAds — агентство мобильного маркетинга. In-App реклама, ремаркетинг, ASO, performance и медиабаинг для роста MAU. Отдельное направление MobiAds Gaming.',
	keywords: [
		'мобильный маркетинг',
		'in-app реклама',
		'ремаркетинг',
		'ASO',
		'user acquisition',
		'MobiAds',
		'mobile marketing agency',
	],
	openGraph: {
		title: 'MobiAds — топливо для мобильных приложений',
		description:
			'Агентство мобильного маркетинга: In-App реклама, ремаркетинг, ASO и performance для роста мобильных приложений.',
		type: 'website',
		locale: 'ru_RU',
	},
};

export const viewport: Viewport = {
	themeColor: '#691E9A',
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
