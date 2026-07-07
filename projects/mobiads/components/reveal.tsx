'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

type RevealProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	y?: number;
	as?: 'div' | 'li' | 'span';
};

/** Scroll-into-view reveal: fade + rise, once, with spring easing. */
export function Reveal({
	children,
	className,
	delay = 0,
	y = 28,
}: RevealProps) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}

/** Staggered container — children reveal 60ms apart (MD stagger-sequence). */
export function RevealGroup({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: '-60px' }}
			variants={{
				hidden: {},
				show: { transition: { staggerChildren: 0.06 } },
			}}
		>
			{children}
		</motion.div>
	);
}

export function RevealItem({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			variants={{
				hidden: { opacity: 0, y: 24 },
				show: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
				},
			}}
		>
			{children}
		</motion.div>
	);
}
