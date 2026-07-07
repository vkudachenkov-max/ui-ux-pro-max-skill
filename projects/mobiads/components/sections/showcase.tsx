import { MousePointer2 } from 'lucide-react';
import CardFanCarousel, { type FanCard } from '@/components/ui/card-fan-carousel';
import { Reveal } from '@/components/reveal';
import { Sparkle } from '@/components/brand';

const CASE_CARDS: FanCard[] = [
	{ imgUrl: '/showcase/01.svg', alt: 'Кейс: In-App реклама — +2.1M установок' },
	{ imgUrl: '/showcase/02.svg', alt: 'Кейс: ремаркетинг — ROAS ×3.1' },
	{ imgUrl: '/showcase/03.svg', alt: 'Кейс: ASO — +62% органики' },
	{ imgUrl: '/showcase/04.svg', alt: 'Кейс: номинация RU WARD 2026' },
	{ imgUrl: '/showcase/05.svg', alt: 'Кейс: AI-креативы и playable-реклама' },
	{ imgUrl: '/showcase/06.svg', alt: 'Кейс: рост MAU +180% за 6 месяцев' },
	{ imgUrl: '/showcase/07.svg', alt: 'Кейс: gaming user acquisition — D30 ×2.4' },
	{ imgUrl: '/showcase/08.svg', alt: 'Кейс: performance — CPI −34%' },
	{ imgUrl: '/showcase/09.svg', alt: 'Кейс: финтех super app' },
	{ imgUrl: '/showcase/10.svg', alt: 'Кейс: мобильный форум 2026' },
];

export function Showcase() {
	return (
		<section id="portfolio" className="relative overflow-hidden py-24 sm:py-32">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						'radial-gradient(45% 40% at 50% 30%, rgba(222,107,255,0.16), transparent 70%)',
				}}
			/>
			<div className="container">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<Reveal>
						<span className="eyebrow inline-flex items-center gap-2 text-brand-magenta">
							<Sparkle className="size-3.5" /> Портфолио
						</span>
					</Reveal>
					<Reveal delay={0.05}>
						<h2 className="display-2 mt-4">
							Кейсы в <span className="text-grad">историях</span>
						</h2>
					</Reveal>
					<Reveal delay={0.1}>
						<p className="mx-auto mt-5 max-w-md text-foreground/60">
							Листайте карточки — перетаскиванием, стрелками или свайпом. Каждая
							история — реальная задача и результат в цифрах.
						</p>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<CardFanCarousel cards={CASE_CARDS} />
				</Reveal>

				<Reveal delay={0.15}>
					<p className="mt-6 flex items-center justify-center gap-2 text-sm text-foreground/45">
						<MousePointer2 className="size-4" />
						Перетащите активную карточку или используйте стрелки
					</p>
				</Reveal>
			</div>
		</section>
	);
}
