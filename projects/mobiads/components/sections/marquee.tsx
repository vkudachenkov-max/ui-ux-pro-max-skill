import { Sparkle } from '@/components/brand';

const WORDS = [
	'IN-APP ADS',
	'РЕМАРКЕТИНГ',
	'ASO',
	'USER ACQUISITION',
	'МЕДИАБАИНГ',
	'CREATIVE',
	'MAU GROWTH',
	'RETENTION',
];

export function Marquee() {
	return (
		<div className="relative overflow-hidden border-y-2 border-foreground/10 bg-brand-grad py-4 text-white">
			<div className="flex w-max animate-marquee will-change-transform">
				{[0, 1].map((dup) => (
					<div key={dup} className="flex items-center" aria-hidden={dup === 1}>
						{WORDS.map((w) => (
							<span key={w} className="flex items-center">
								<span className="px-6 font-display text-lg tracking-wide sm:text-2xl">
									{w}
								</span>
								<Sparkle className="size-4 shrink-0 opacity-80" />
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
