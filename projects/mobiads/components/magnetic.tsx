'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic hover — the cursor gently pulls the element toward it, easing back
 * on leave (Kinetic Brutalism "elastic" micro-interaction). Respects
 * prefers-reduced-motion by rendering a plain wrapper.
 */
export function Magnetic({
	children,
	strength = 0.35,
	className,
}: {
	children: React.ReactNode;
	strength?: number;
	className?: string;
}) {
	const ref = React.useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, { stiffness: 160, damping: 12, mass: 0.4 });
	const springY = useSpring(y, { stiffness: 160, damping: 12, mass: 0.4 });

	const [enabled, setEnabled] = React.useState(true);
	React.useEffect(() => {
		setEnabled(
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
				window.matchMedia('(hover: hover)').matches,
		);
	}, []);

	function onMove(e: React.MouseEvent<HTMLDivElement>) {
		if (!enabled || !ref.current) return;
		const r = ref.current.getBoundingClientRect();
		x.set((e.clientX - r.left - r.width / 2) * strength);
		y.set((e.clientY - r.top - r.height / 2) * strength);
	}
	function reset() {
		x.set(0);
		y.set(0);
	}

	return (
		<motion.div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={reset}
			style={{ x: springX, y: springY }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
