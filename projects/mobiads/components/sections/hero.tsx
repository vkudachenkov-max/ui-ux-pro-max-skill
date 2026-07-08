'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/magnetic';
import { Sparkle } from '@/components/brand';
import { HeroRocketMount } from '@/components/hero-rocket-mount';

const STATS = [
	{ v: '10 лет', l: 'на рынке mobile' },
	{ v: '150+', l: 'медиабаеров' },
	{ v: '300+', l: 'приложений' },
	{ v: '×2.4', l: 'средний ROAS' },
];

const line = {
	hidden: { opacity: 0, y: 32 },
	show: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: 0.1 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
	}),
};

export function Hero() {
	return (
		<section
			id="top"
			className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16"
		>
			{/* 3D dotted-surface field */}
			<DottedSurface variant="brand" />

			{/* Brand radial glow + soft grid over the 3D field */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						'radial-gradient(60% 50% at 50% 38%, rgba(222,107,255,0.28), transparent 60%), radial-gradient(50% 40% at 82% 12%, rgba(91,84,242,0.22), transparent 60%)',
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
				style={{
					backgroundImage:
						'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
					backgroundSize: '48px 48px',
					maskImage:
						'radial-gradient(70% 60% at 50% 40%, #000 30%, transparent 75%)',
				}}
			/>

			<div className="container relative">
				<motion.div
					initial="hidden"
					animate="show"
					className="mx-auto max-w-6xl text-center"
				>
					<HeroRocketMount />

					<motion.div
						variants={line}
						custom={0}
						className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold tracking-wide text-brand-purple"
					>
						<Sparkle className="size-3.5 text-brand-magenta" />
						MOBILE&nbsp;×&nbsp;MARKETING&nbsp;×&nbsp;AGENCY
					</motion.div>

					<h1 className="display-1">
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
						className="mx-auto mt-7 max-w-xl text-base text-foreground/70 sm:text-lg"
					>
						Привлекаем платящих пользователей через In-App рекламу,
						ремаркетинг, ASO и performance-медиабаинг. Разгоняем MAU и
						удержание — предсказуемо и в масштабе.
					</motion.p>

					<motion.div
						variants={line}
						custom={5}
						className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
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
				</motion.div>

				{/* Floating stat chips */}
				<motion.dl
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
					className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
				>
					{STATS.map((s) => (
						<motion.div
							key={s.l}
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
							}}
							className="rounded-2xl glass px-4 py-4 text-center"
						>
							<dt className="font-display text-2xl text-brand-purple sm:text-3xl">
								{s.v}
							</dt>
							<dd className="mt-1 text-xs text-foreground/60">{s.l}</dd>
						</motion.div>
					))}
				</motion.dl>
			</div>
		</section>
	);
}
