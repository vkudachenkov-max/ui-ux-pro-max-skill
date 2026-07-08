'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Animated brand rocket — MobiAds' "fuel for apps" motif. Launches in on mount,
 * then floats with a flickering plasma exhaust in brand colours. Respects
 * prefers-reduced-motion (renders a static rocket).
 */
export function HeroRocket({ className }: { className?: string }) {
	const reduce = useReducedMotion();

	return (
		<motion.div
			className={cn('pointer-events-none absolute', className)}
			initial={reduce ? false : { y: 200, opacity: 0, rotate: -10 }}
			animate={{ y: 0, opacity: 1, rotate: 0 }}
			transition={{ type: 'spring', stiffness: 52, damping: 14, delay: 0.15 }}
		>
			{/* Continuous float */}
			<motion.div
				className="relative"
				animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-2.5, 2.5, -2.5] }}
				transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
			>
				{/* Glow halo */}
				<div
					aria-hidden
					className="absolute inset-0 -z-10 blur-2xl"
					style={{
						background:
							'radial-gradient(45% 40% at 50% 45%, rgba(222,107,255,0.55), transparent 70%)',
					}}
				/>

				<svg
					viewBox="0 0 140 220"
					className="relative w-full drop-shadow-[0_20px_40px_rgba(105,30,154,0.45)]"
					role="img"
					aria-label="Ракета MobiAds"
				>
					<defs>
						<linearGradient id="r-body" x1="0" y1="0" x2="0.4" y2="1">
							<stop offset="0" stopColor="#DE6BFF" />
							<stop offset="0.5" stopColor="#9A12AF" />
							<stop offset="1" stopColor="#691E9A" />
						</linearGradient>
						<linearGradient id="r-nose" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#FB0CD2" />
							<stop offset="1" stopColor="#9A12AF" />
						</linearGradient>
						<linearGradient id="r-fin" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0" stopColor="#6EA1FF" />
							<stop offset="1" stopColor="#342EBB" />
						</linearGradient>
						<radialGradient id="r-glass" cx="0.4" cy="0.35" r="0.7">
							<stop offset="0" stopColor="#ffffff" />
							<stop offset="0.45" stopColor="#6EDBFF" />
							<stop offset="1" stopColor="#5B54F2" />
						</radialGradient>
					</defs>

					{/* Fins */}
					<path d="M42,150 L18,196 L46,180 Z" fill="url(#r-fin)" />
					<path d="M98,150 L122,196 L94,180 Z" fill="url(#r-fin)" />

					{/* Body + nose silhouette */}
					<path
						d="M70,8 C88,26 100,58 100,98 L100,168 C100,184 92,192 70,192 C48,192 40,184 40,168 L40,98 C40,58 52,26 70,8 Z"
						fill="url(#r-body)"
					/>
					{/* Nose accent */}
					<path
						d="M70,8 C88,26 100,58 100,98 C86,90 78,88 70,88 C62,88 54,90 40,98 C40,58 52,26 70,8 Z"
						fill="url(#r-nose)"
					/>
					{/* Glossy highlight */}
					<path
						d="M55,44 C48,66 47,120 53,162"
						stroke="#ffffff"
						strokeOpacity="0.4"
						strokeWidth="6"
						strokeLinecap="round"
						fill="none"
					/>

					{/* Window */}
					<circle cx="70" cy="110" r="20" fill="#342EBB" />
					<circle cx="70" cy="110" r="16" fill="url(#r-glass)" />
					<circle cx="64" cy="104" r="4.5" fill="#ffffff" fillOpacity="0.8" />

					{/* Nozzle */}
					<path d="M58,192 L82,192 L86,206 L54,206 Z" fill="#2A2560" />
				</svg>

				{/* Plasma exhaust (HTML — reliable flicker) */}
				<motion.div
					aria-hidden
					className="absolute left-1/2 top-[92%] h-[26%] w-[22%] -translate-x-1/2 origin-top"
					animate={
						reduce
							? undefined
							: { scaleY: [1, 1.35, 0.85, 1.2, 1], opacity: [0.85, 1, 0.7, 1, 0.85] }
					}
					transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
				>
					<div
						className="h-full w-full"
						style={{
							background:
								'radial-gradient(50% 60% at 50% 25%, #ffffff, #6EDBFF 28%, #FB0CD2 62%, transparent 78%)',
							borderRadius: '46% 46% 50% 50% / 26% 26% 74% 74%',
							filter: 'blur(2px)',
						}}
					/>
				</motion.div>

				{/* Rising spark particles */}
				{!reduce &&
					[0, 1, 2, 3].map((i) => (
						<motion.span
							aria-hidden
							key={i}
							className="absolute left-1/2 top-[104%] block size-1.5 rounded-full"
							style={{
								background: i % 2 ? '#6EDBFF' : '#DE6BFF',
								marginLeft: (i - 1.5) * 12,
							}}
							animate={{ y: [0, 46], opacity: [0, 1, 0], scale: [1, 0.4] }}
							transition={{
								duration: 1.1 + i * 0.2,
								repeat: Infinity,
								ease: 'easeIn',
								delay: i * 0.28,
							}}
						/>
					))}
			</motion.div>
		</motion.div>
	);
}
