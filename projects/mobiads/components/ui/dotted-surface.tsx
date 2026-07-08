'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

const SEPARATION = 130;
const AMOUNTX = 44;
const AMOUNTY = 44;

type Variant = 'brand' | 'gaming';

const PALETTES: Record<Variant, [THREE.Color, THREE.Color, THREE.Color]> = {
	brand: [
		new THREE.Color('#691E9A'),
		new THREE.Color('#9A12AF'),
		new THREE.Color('#DE6BFF'),
	],
	gaming: [
		new THREE.Color('#5B54F2'),
		new THREE.Color('#6EDBFF'),
		new THREE.Color('#FB0CD2'),
	],
};

function Waves({ variant }: { variant: Variant }) {
	const ref = useRef<THREE.Points>(null!);
	const tick = useRef(0);
	const reduced = useRef(false);

	const { positions, colors } = useMemo(() => {
		const positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
		const colors = new Float32Array(AMOUNTX * AMOUNTY * 3);
		const [c0, c1, c2] = PALETTES[variant];
		const tmp = new THREE.Color();
		let i = 0;
		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				positions[i * 3] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				positions[i * 3 + 1] = 0;
				positions[i * 3 + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				// Diagonal gradient across the grid (brand purple → magenta → violet)
				const t = (ix / AMOUNTX + iy / AMOUNTY) / 2;
				if (t < 0.5) tmp.copy(c0).lerp(c1, t * 2);
				else tmp.copy(c1).lerp(c2, (t - 0.5) * 2);
				colors[i * 3] = tmp.r;
				colors[i * 3 + 1] = tmp.g;
				colors[i * 3 + 2] = tmp.b;
				i++;
			}
		}
		return { positions, colors };
	}, [variant]);

	useMemo(() => {
		if (typeof window !== 'undefined') {
			reduced.current = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			).matches;
		}
	}, []);

	useFrame(() => {
		const points = ref.current;
		if (!points) return;
		const pos = points.geometry.attributes.position.array as Float32Array;
		let i = 0;
		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				pos[i * 3 + 1] =
					Math.sin((ix + tick.current) * 0.3) * 40 +
					Math.sin((iy + tick.current) * 0.5) * 40;
				i++;
			}
		}
		points.geometry.attributes.position.needsUpdate = true;
		if (!reduced.current) tick.current += 0.08;
	});

	return (
		<points ref={ref}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" args={[positions, 3]} />
				<bufferAttribute attach="attributes-color" args={[colors, 3]} />
			</bufferGeometry>
			<pointsMaterial
				size={7}
				vertexColors
				transparent
				opacity={0.92}
				sizeAttenuation
				depthWrite={false}
			/>
		</points>
	);
}

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'> & {
	variant?: Variant;
};

/**
 * MobiAds animated dotted-surface — a Three.js (React Three Fiber) wave field,
 * coloured with the brand gradient. Fills its nearest positioned ancestor.
 */
export function DottedSurface({
	className,
	variant = 'brand',
	...props
}: DottedSurfaceProps) {
	// Only mount the WebGL canvas once WebGL2 is confirmed — otherwise render
	// nothing (the section's CSS gradients remain), never crash the page.
	const [ready, setReady] = React.useState(false);
	React.useEffect(() => {
		try {
			setReady(
				!!(
					window.WebGL2RenderingContext &&
					document.createElement('canvas').getContext('webgl2')
				),
			);
		} catch {
			setReady(false);
		}
	}, []);

	return (
		<div
			className={cn('pointer-events-none absolute inset-0 -z-10', className)}
			{...props}
		>
			{ready && (
				<Canvas
					dpr={[1, 2]}
					camera={{ position: [0, 355, 1220], fov: 60, near: 1, far: 10000 }}
					gl={{ alpha: true, antialias: true }}
					frameloop="always"
				>
					<Waves variant={variant} />
				</Canvas>
			)}
		</div>
	);
}
