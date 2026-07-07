import { SiteHeader } from '@/components/sections/site-header';
import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { Services } from '@/components/sections/services';
import { Cases } from '@/components/sections/cases';
import { Gaming } from '@/components/sections/gaming';
import { Contact } from '@/components/sections/contact';
import { SiteFooter } from '@/components/sections/site-footer';

export default function Home() {
	return (
		<>
			<SiteHeader />
			<main>
				<Hero />
				<Marquee />
				<Services />
				<Cases />
				<Gaming />
				<Contact />
			</main>
			<SiteFooter />
		</>
	);
}
