'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FanCard = { imgUrl: string; alt: string };

/**
 * Card fan carousel — a fanned deck of cards you can drag, click, or arrow
 * through. Inspired by 21st.dev/@aayush-duhan/card-fan-carousel, rebuilt on
 * framer-motion with keyboard + reduced-motion support.
 *
 * The nearest card is centred and upright; neighbours fan out with rotation,
 * lift, and scale. Only the centre card is draggable (outer element positions
 * the card, inner element owns the drag gesture — avoids transform conflicts).
 */
export default function CardFanCarousel({
	cards,
	className,
}: {
	cards: FanCard[];
	className?: string;
}) {
	const [active, setActive] = React.useState(0);
	const reduce = useReducedMotion();
	const n = cards.length;
	const VISIBLE = 3;

	const go = React.useCallback(
		(dir: number) => setActive((a) => (a + dir + n) % n),
		[n],
	);

	// Circular shortest-path offset of card i from the active card.
	const rel = (i: number) => {
		let d = i - active;
		if (d > n / 2) d -= n;
		if (d < -n / 2) d += n;
		return d;
	};

	const spring = reduce
		? { duration: 0 }
		: ({ type: 'spring', stiffness: 260, damping: 30 } as const);

	return (
		<div className={cn('relative w-full select-none', className)}>
			<div
				role="group"
				aria-roledescription="карусель"
				aria-label="Кейсы MobiAds"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'ArrowLeft') {
						e.preventDefault();
						go(-1);
					} else if (e.key === 'ArrowRight') {
						e.preventDefault();
						go(1);
					}
				}}
				className="relative mx-auto flex h-[420px] w-full max-w-[680px] items-center justify-center rounded-3xl outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-[520px]"
			>
				{cards.map((card, i) => {
					const d = rel(i);
					const hidden = Math.abs(d) > VISIBLE;
					const isCenter = d === 0;
					return (
						<motion.figure
							key={i}
							className="absolute h-[340px] w-[210px] sm:h-[440px] sm:w-[270px]"
							initial={false}
							animate={{
								x: `${d * 46}%`,
								rotate: d * 7,
								y: Math.abs(d) * 20,
								scale: isCenter ? 1 : 1 - Math.abs(d) * 0.07,
								opacity: hidden ? 0 : 1 - Math.abs(d) * 0.1,
								zIndex: 30 - Math.abs(d),
								pointerEvents: hidden ? 'none' : 'auto',
							}}
							transition={spring}
							onClick={() => !isCenter && setActive(i)}
							aria-hidden={!isCenter}
						>
							<motion.div
								className={cn(
									'h-full w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-brand-purple shadow-2xl',
									isCenter
										? 'cursor-grab shadow-brand-purple/40 active:cursor-grabbing'
										: 'cursor-pointer brightness-[0.82]',
								)}
								drag={isCenter ? 'x' : false}
								dragElastic={0.14}
								dragConstraints={{ left: 0, right: 0 }}
								dragSnapToOrigin
								onDragEnd={(_, info) => {
									if (info.offset.x < -60 || info.velocity.x < -320) go(1);
									else if (info.offset.x > 60 || info.velocity.x > 320) go(-1);
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={card.imgUrl}
									alt={card.alt}
									draggable={false}
									loading="lazy"
									className="pointer-events-none h-full w-full object-cover"
								/>
							</motion.div>
						</motion.figure>
					);
				})}
			</div>

			{/* Controls */}
			<div className="mt-8 flex items-center justify-center gap-5">
				<button
					type="button"
					onClick={() => go(-1)}
					aria-label="Предыдущий кейс"
					className="flex size-12 items-center justify-center rounded-full pill-neu text-brand-purple transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
				>
					<ChevronLeft className="size-5" />
				</button>

				<div className="flex items-center gap-2" role="tablist" aria-label="Выбор кейса">
					{cards.map((c, i) => (
						<button
							key={i}
							type="button"
							role="tab"
							aria-selected={i === active}
							aria-label={c.alt}
							onClick={() => setActive(i)}
							className={cn(
								'h-2.5 rounded-full transition-all duration-300',
								i === active
									? 'w-7 bg-brand-magenta'
									: 'w-2.5 bg-foreground/20 hover:bg-foreground/40',
							)}
						/>
					))}
				</div>

				<button
					type="button"
					onClick={() => go(1)}
					aria-label="Следующий кейс"
					className="flex size-12 items-center justify-center rounded-full pill-neu text-brand-purple transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
				>
					<ChevronRight className="size-5" />
				</button>
			</div>
		</div>
	);
}
