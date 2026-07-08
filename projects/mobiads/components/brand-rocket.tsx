'use client';

import * as React from 'react';
import {
	motion,
	useMotionValue,
	useSpring,
	useReducedMotion,
} from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * MobiAds brandbook rocket.
 *
 * Uses the real brand asset `/public/rocket.png` if present (transparent PNG,
 * already tilted), otherwise a faithful SVG recreation.
 *
 * → To use your exact render: upload it as `projects/mobiads/public/rocket.png`
 *   (transparent background). It swaps in automatically — no code change.
 *
 * Animated: launches in, floats, flame flickers, trails smoke, and gently
 * leans toward the cursor. Respects prefers-reduced-motion. Pass a square-ish
 * sizing className (e.g. aspect-square w-[...]).
 */
export function BrandRocket({ className }: { className?: string }) {
	const reduce = useReducedMotion();
	const ref = React.useRef<HTMLDivElement>(null);

	// Real PNG detection (default to SVG so there's never a broken image).
	const [usePng, setUsePng] = React.useState(false);
	React.useEffect(() => {
		let alive = true;
		fetch('/rocket.png', { method: 'HEAD' })
			.then((r) => {
				const ct = r.headers.get('content-type') || '';
				if (alive && r.ok && ct.startsWith('image/')) setUsePng(true);
			})
			.catch(() => {});
		return () => {
			alive = false;
		};
	}, []);

	// Cursor parallax — the rocket leans toward the pointer.
	const px = useMotionValue(0);
	const py = useMotionValue(0);
	const pr = useMotionValue(0);
	const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.6 });
	const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.6 });
	const sr = useSpring(pr, { stiffness: 90, damping: 20, mass: 0.6 });

	React.useEffect(() => {
		if (reduce || !window.matchMedia('(hover: hover)').matches) return;
		const onMove = (e: MouseEvent) => {
			const el = ref.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
			const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
			px.set(dx * 46);
			py.set(dy * 34);
			pr.set(dx * 9);
		};
		window.addEventListener('mousemove', onMove);
		return () => window.removeEventListener('mousemove', onMove);
	}, [reduce, px, py, pr]);

	return (
		<motion.div
			ref={ref}
			className={cn('relative', className)}
			initial={reduce ? false : { opacity: 0, y: 120 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ type: 'spring', stiffness: 46, damping: 15, delay: 0.1 }}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
				style={{
					background:
						'radial-gradient(48% 44% at 52% 50%, rgba(222,107,255,0.5), transparent 70%)',
				}}
			/>

			{/* Smoke trail (emitted from the engine, drifts down-left) */}
			{!reduce && <SmokeTrail />}

			{/* Cursor parallax layer */}
			<motion.div
				className="absolute inset-0"
				style={{ x: sx, y: sy, rotate: sr }}
			>
				{/* Float layer */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					animate={
						reduce ? undefined : { y: [0, -16, 0], rotate: [-1.4, 1.4, -1.4] }
					}
					transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
				>
					{usePng ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src="/rocket.png"
							alt="Ракета MobiAds"
							className="h-full w-full select-none object-contain drop-shadow-[0_40px_60px_rgba(105,30,154,0.35)]"
							draggable={false}
							onError={() => setUsePng(false)}
						/>
					) : (
						<RocketSvg
							reduce={!!reduce}
							className="h-[94%] w-auto rotate-[30deg] drop-shadow-[0_40px_60px_rgba(105,30,154,0.35)]"
						/>
					)}
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

function SmokeTrail() {
	const puffs = [0, 1, 2, 3, 4, 5];
	const colors = ['216,170,240', '243,169,192', '198,190,214'];
	return (
		<div
			aria-hidden
			className="pointer-events-none absolute left-[47%] top-[66%] -z-10"
		>
			{puffs.map((i) => {
				const size = 32 + i * 11;
				return (
					<motion.span
						key={i}
						className="absolute block rounded-full"
						style={{
							width: size,
							height: size,
							background: `radial-gradient(circle, rgba(${colors[i % 3]},0.72), rgba(${colors[i % 3]},0) 70%)`,
							filter: 'blur(8px)',
						}}
						initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
						animate={{
							x: [0, -70 - i * 14, -130 - i * 18],
							y: [0, 52 + i * 9, 100 + i * 15],
							opacity: [0, 0.7, 0],
							scale: [0.5, 1.3, 2],
						}}
						transition={{
							duration: 2.4 + i * 0.2,
							repeat: Infinity,
							ease: 'easeOut',
							delay: i * 0.34,
						}}
					/>
				);
			})}
		</div>
	);
}

function RocketSvg({
	reduce,
	className,
}: {
	reduce: boolean;
	className?: string;
}) {
	return (
		<svg viewBox="0 0 360 720" className={className} role="img" aria-label="Ракета MobiAds">
			<defs>
				<linearGradient id="br-body" x1="0.15" y1="0" x2="0.85" y2="1">
					<stop offset="0" stopColor="#F3EEFF" />
					<stop offset="0.45" stopColor="#EBD3F4" />
					<stop offset="0.8" stopColor="#F4B8CC" />
					<stop offset="1" stopColor="#EFA6C4" />
				</linearGradient>
				<linearGradient id="br-nose" x1="0.2" y1="0" x2="0.8" y2="1">
					<stop offset="0" stopColor="#3A2E63" />
					<stop offset="0.5" stopColor="#171233" />
					<stop offset="1" stopColor="#0C0A1E" />
				</linearGradient>
				<linearGradient id="br-fin" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#F6CFE6" />
					<stop offset="1" stopColor="#F09FC0" />
				</linearGradient>
				<linearGradient id="br-neon" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#B7FF8A" />
					<stop offset="1" stopColor="#6EDBFF" />
				</linearGradient>
				<linearGradient id="br-engine" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#FFD25A" />
					<stop offset="1" stopColor="#FF8A1E" />
				</linearGradient>
				<radialGradient id="br-flame" cx="0.5" cy="0.18" r="0.85">
					<stop offset="0" stopColor="#FFF6D2" />
					<stop offset="0.32" stopColor="#FFC24B" />
					<stop offset="0.62" stopColor="#FF7A16" />
					<stop offset="0.85" stopColor="#F25E00" stopOpacity="0.55" />
					<stop offset="1" stopColor="#9BFF6A" stopOpacity="0" />
				</radialGradient>
				<filter id="br-blur" x="-60%" y="-60%" width="220%" height="220%">
					<feGaussianBlur stdDeviation="10" />
				</filter>
			</defs>

			<motion.g
				style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
				animate={
					reduce
						? undefined
						: { scaleY: [1, 1.28, 0.9, 1.18, 1], opacity: [0.9, 1, 0.72, 1, 0.9] }
				}
				transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
			>
				<ellipse cx="180" cy="640" rx="52" ry="118" fill="url(#br-flame)" filter="url(#br-blur)" />
				<ellipse cx="180" cy="612" rx="24" ry="66" fill="#FFF3C6" opacity="0.9" filter="url(#br-blur)" />
			</motion.g>

			<path d="M104,430 L40,548 C36,556 46,560 54,555 L118,512 Z" fill="url(#br-fin)" />
			<path d="M256,430 L320,548 C324,556 314,560 306,555 L242,512 Z" fill="url(#br-fin)" />
			<path d="M40,548 C36,556 46,560 54,555 L118,512" fill="none" stroke="url(#br-neon)" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
			<path d="M320,548 C324,556 314,560 306,555 L242,512" fill="none" stroke="url(#br-neon)" strokeWidth="7" strokeLinecap="round" opacity="0.9" />

			<path
				d="M180,44 C226,84 258,190 262,300 L262,430 C262,492 228,520 180,520 C132,520 98,492 98,430 L98,300 C102,190 134,84 180,44 Z"
				fill="url(#br-body)"
			/>
			<path
				d="M180,44 C226,84 258,190 262,300 C236,262 210,250 180,250 C150,250 124,262 98,300 C102,190 134,84 180,44 Z"
				fill="url(#br-nose)"
			/>
			<path d="M198,70 C222,120 244,200 250,278" fill="none" stroke="#5B6FF7" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
			<path d="M150,120 C130,180 126,320 138,440" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="10" strokeLinecap="round" />
			<path d="M215,300 C220,360 218,420 210,470" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="6" strokeLinecap="round" />

			<path d="M120,516 L240,516 L232,556 L128,556 Z" fill="url(#br-engine)" />
			<rect x="150" y="556" width="60" height="18" rx="6" fill="#E9761A" />
		</svg>
	);
}
