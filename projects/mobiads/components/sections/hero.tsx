'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/magnetic';
import { Sparkle } from '@/components/brand';
import { BrandRocket } from '@/components/brand-rocket';

const STATS = [
	{ v: '10 лет', l: 'на рынке mobile' },
	{ v: '150+', l: 'медиабаеров' },
	{ v: '300+', l: 'приложений' },
	{ v: '×2.4', l: 'средний ROAS' },
];

const line = {
	hidden: { opacity: 0, y: 28 },
	show: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	}),
};

export function Hero() {
	return (
		<section
			id="top"
			className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16"
		>
			<DottedSurface variant="brand" />
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						'radial-gradient(55% 55% at 72% 40%, rgba(222,107,255,0.24), transparent 60%), radial-gradient(45% 45% at 15% 20%, rgba(91,84,242,0.20), transparent 60%)',
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
				style={{
					backgroundImage:
						'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
					backgroundSize: '48px 48px',
					maskImage: 'radial-gradient(80% 70% at 50% 40%, #000 30%, transparent 80%)',
				}}
			/>

			<div className="container relative">
				<div className="grid items-center gap-4 lg:grid-cols-[1fr_1.15fr] lg:gap-2">
					{/* ── Text column ── */}
					<motion.div
						initial="hidden"
						animate="show"
						className="order-2 text-center lg:order-1 lg:text-left"
					>
						<motion.div
							variants={line}
							custom={0}
							className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold tracking-wide text-brand-purple"
						>
							<Sparkle className="size-3.5 text-brand-magenta" />
							MOBILE&nbsp;×&nbsp;MARKETING&nbsp;×&nbsp;AGENCY
						</motion.div>

						<h1 className="font-display uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(1.9rem,6.2vw,3.4rem)]">
							<motion.span variants={line} custom={1} className="block">
								Топливо для
							</motion.span>
							<motion.span variants={line} custom={2} className="block text-grad">
								мобильных
							</motion.span>
							<motion.span variants={line} custom={3} className="block">
								приложений
							</motion.span>
						</h1>

						<motion.p
							variants={line}
							custom={4}
							className="mx-auto mt-6 max-w-md text-base text-foreground/70 lg:mx-0 lg:text-lg"
						>
							Привлекаем платящих пользователей через In-App рекламу,
							ремаркетинг, ASO и performance-медиабаинг. Разгоняем MAU и
							удержание — предсказуемо и в масштабе.
						</motion.p>

						<motion.div
							variants={line}
							custom={5}
							className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
						>
							<Magnetic strength={0.4}>
								<Button asChild size="lg" variant="primary">
									<a href="#contact">
										Запустить рост
										<ArrowUpRight />
									</a>
								</Button>
							</Magnetic>
							<Magnetic strength={0.3}>
								<Button asChild size="lg" variant="neo">
									<a href="#cases">
										<PlayCircle />
										Смотреть кейсы
									</a>
								</Button>
							</Magnetic>
						</motion.div>

						<motion.dl
							variants={line}
							custom={6}
							className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0"
						>
							{STATS.map((s) => (
								<div key={s.l} className="rounded-2xl glass px-3 py-3 text-center lg:text-left">
									<dt className="font-display text-xl text-brand-purple sm:text-2xl">
										{s.v}
									</dt>
									<dd className="mt-1 text-[0.7rem] text-foreground/60">{s.l}</dd>
								</div>
							))}
						</motion.dl>
					</motion.div>

					{/* ── Rocket column ── */}
					<div className="order-1 flex justify-center lg:order-2 lg:justify-end">
						<BrandRocket className="aspect-square w-[clamp(280px,56vw,640px)] lg:-my-10 lg:-mr-6 xl:-mr-14" />
					</div>
				</div>
			</div>
		</section>
	);
}
