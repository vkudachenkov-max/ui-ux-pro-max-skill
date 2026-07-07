'use client';

import { Gamepad2, Zap, Trophy, Users } from 'lucide-react';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/magnetic';
import { RocketMark, Sparkle } from '@/components/brand';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';

const FEATURES = [
	{ icon: Users, title: 'Игровой UA', desc: 'Масштабная закупка игроков в сетях, DSP и у инфлюенсеров.' },
	{ icon: Zap, title: 'Playable-креативы', desc: 'Интерактивные объявления, которые продают геймплей за 15 секунд.' },
	{ icon: Trophy, title: 'LiveOps & события', desc: 'Кампании под ивенты, батл-пассы и релизы — рост ARPU.' },
	{ icon: Gamepad2, title: 'Ретеншн-механики', desc: 'Возврат игроков и удержание D1–D30 через сегментные сценарии.' },
];

export function Gaming() {
	return (
		<section id="gaming" className="dark relative overflow-hidden bg-background py-24 text-foreground sm:py-32">
			{/* gaming-variant 3D field */}
			<DottedSurface variant="gaming" className="opacity-70" />
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						'radial-gradient(55% 45% at 20% 25%, rgba(91,84,242,0.4), transparent 60%), radial-gradient(45% 40% at 85% 70%, rgba(251,12,210,0.32), transparent 60%)',
				}}
			/>

			<div className="container relative">
				<div className="grid items-center gap-14 lg:grid-cols-2">
					<div>
						<Reveal>
							<span className="eyebrow inline-flex items-center gap-2 text-gaming-cyan">
								<RocketMark className="size-4 text-gaming-cyan" />
								MOBIADS GAMING
							</span>
						</Reveal>
						<Reveal delay={0.05}>
							<h2 className="display-2 mt-5">
								Запускаем игры
								<span className="block text-grad-gaming">на орбиту</span>
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="mt-6 max-w-md text-white/70">
								Отдельное направление под мобильный гейминг: user acquisition,
								playable-креативы и LiveOps. Приводим игроков, которые остаются
								и платят.
							</p>
						</Reveal>
						<Reveal delay={0.15}>
							<div className="mt-9 flex flex-wrap gap-3">
								<Magnetic strength={0.4}>
									<Button asChild size="lg" variant="gaming">
										<a href="#contact">
											Продвигать игру
											<RocketMark className="size-4" />
										</a>
									</Button>
								</Magnetic>
								<Magnetic strength={0.25}>
									<Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:border-gaming-cyan hover:text-gaming-cyan">
										<a href="#cases">Кейсы гейминга</a>
									</Button>
								</Magnetic>
							</div>
						</Reveal>
					</div>

					<RevealGroup className="grid gap-4 sm:grid-cols-2">
						{FEATURES.map((f) => {
							const Icon = f.icon;
							return (
								<RevealItem key={f.title}>
									<div className="group h-full rounded-3xl glass-dark p-6 transition-all duration-300 hover:neon-ring hover:-translate-y-1">
										<div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-gaming-grad text-white">
											<Icon className="size-6" strokeWidth={1.8} />
										</div>
										<h3 className="font-display text-lg text-white">{f.title}</h3>
										<p className="mt-2 text-sm text-white/65">{f.desc}</p>
									</div>
								</RevealItem>
							);
						})}
					</RevealGroup>
				</div>

				<Reveal delay={0.1}>
					<div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-3xl glass-dark px-8 py-6 text-center">
						{[
							['2.1M+', 'установок игр'],
							['D30 ×2.4', 'окупаемость'],
							['40+', 'игровых проектов'],
							['12', 'жанров'],
						].map(([v, l]) => (
							<div key={l} className="flex items-center gap-3">
								<span className="font-display text-2xl text-gaming-cyan">{v}</span>
								<span className="text-sm text-white/60">{l}</span>
								<Sparkle className="ml-4 hidden size-3 text-gaming-pink sm:block" />
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
