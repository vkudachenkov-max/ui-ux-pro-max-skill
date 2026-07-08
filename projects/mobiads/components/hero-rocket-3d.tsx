'use client';

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Float, Sparkles } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

// Shared premium metal look (brand-tinted chrome / car-paint).
const METAL = {
	metalness: 1,
	roughness: 0.26,
	clearcoat: 1,
	clearcoatRoughness: 0.16,
	envMapIntensity: 1.35,
} as const;

/** Soft additive glow texture (fakes bloom without postprocessing). */
function makeGlow(color: string) {
	const c = document.createElement('canvas');
	c.width = c.height = 128;
	const ctx = c.getContext('2d')!;
	const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
	g.addColorStop(0, color);
	g.addColorStop(0.25, color);
	g.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 128, 128);
	const tex = new THREE.CanvasTexture(c);
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

function Glow({
	color,
	position,
	scale,
	opacity = 1,
}: {
	color: string;
	position: [number, number, number];
	scale: number;
	opacity?: number;
}) {
	const tex = React.useMemo(() => makeGlow(color), [color]);
	return (
		<sprite position={position} scale={[scale, scale, 1]}>
			<spriteMaterial
				map={tex}
				blending={THREE.AdditiveBlending}
				depthWrite={false}
				transparent
				opacity={opacity}
				toneMapped={false}
			/>
		</sprite>
	);
}

function Rocket({ reduce }: { reduce: boolean }) {
	const spin = React.useRef<THREE.Group>(null!);
	const flame = React.useRef<THREE.Group>(null!);
	const engineLight = React.useRef<THREE.PointLight>(null!);

	const finGeo = React.useMemo(() => {
		const s = new THREE.Shape();
		s.moveTo(0, 0);
		s.lineTo(0, 0.92);
		s.lineTo(0.72, -0.05);
		s.lineTo(0.16, -0.22);
		s.closePath();
		return new THREE.ExtrudeGeometry(s, {
			depth: 0.06,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.03,
			bevelSegments: 2,
		});
	}, []);

	useFrame((state, delta) => {
		if (reduce) return;
		spin.current.rotation.y += delta * 0.35;
		const t = state.clock.elapsedTime;
		const flick = 0.82 + Math.sin(t * 24) * 0.13 + Math.sin(t * 15) * 0.06;
		flame.current.scale.set(1, flick, 1);
		if (engineLight.current) engineLight.current.intensity = 5 + flick * 4;
	});

	return (
		<group ref={spin} position={[0, -0.05, 0]} scale={0.92}>
			{/* Body */}
			<mesh>
				<cylinderGeometry args={[0.5, 0.58, 1.9, 64]} />
				<meshPhysicalMaterial color="#6A1E9E" {...METAL} />
			</mesh>

			{/* Nose cone */}
			<mesh position={[0, 1.53, 0]}>
				<coneGeometry args={[0.5, 1.16, 64]} />
				<meshPhysicalMaterial color="#B317C7" {...METAL} roughness={0.2} />
			</mesh>

			{/* Chrome rings */}
			{[0.7, -0.5].map((y, i) => (
				<mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<torusGeometry args={[i ? 0.575 : 0.515, 0.03, 16, 64]} />
					<meshPhysicalMaterial color="#F0DCFF" metalness={1} roughness={0.12} />
				</mesh>
			))}

			{/* Porthole window (emissive cyan glass + chrome bezel + glow) */}
			<Glow color="#8fecff" position={[0, 0.42, 0.62]} scale={0.9} opacity={0.9} />
			<group position={[0, 0.42, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
				<mesh>
					<cylinderGeometry args={[0.17, 0.17, 0.06, 48]} />
					<meshStandardMaterial
						color="#8DE9FF"
						emissive="#4FD2FF"
						emissiveIntensity={2.6}
						toneMapped={false}
					/>
				</mesh>
				<mesh position={[0, -0.02, 0]}>
					<torusGeometry args={[0.19, 0.05, 20, 40]} />
					<meshPhysicalMaterial color="#E9EEFF" metalness={1} roughness={0.14} />
				</mesh>
			</group>

			{/* Fins (3, radial) */}
			{[0, 1, 2].map((i) => (
				<group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
					<mesh geometry={finGeo} position={[0.4, -0.95, -0.03]}>
						<meshPhysicalMaterial color="#4038D6" {...METAL} />
					</mesh>
				</group>
			))}

			{/* Engine nozzle bell */}
			<mesh position={[0, -1.18, 0]}>
				<coneGeometry args={[0.5, 0.55, 48, 1, true]} />
				<meshPhysicalMaterial
					color="#2A2560"
					metalness={1}
					roughness={0.35}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Plasma exhaust + glow */}
			<Glow color="#b0f0ff" position={[0, -1.7, 0]} scale={1.15} opacity={0.85} />
			<group ref={flame} position={[0, -1.42, 0]}>
				<mesh position={[0, -0.42, 0]} rotation={[Math.PI, 0, 0]}>
					<coneGeometry args={[0.3, 1.0, 28, 1, true]} />
					<meshBasicMaterial
						color="#D46BFF"
						transparent
						opacity={0.5}
						toneMapped={false}
						side={THREE.DoubleSide}
						blending={THREE.AdditiveBlending}
						depthWrite={false}
					/>
				</mesh>
				<mesh position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
					<coneGeometry args={[0.17, 0.72, 24, 1, true]} />
					<meshBasicMaterial
						color="#CFF6FF"
						transparent
						opacity={0.95}
						toneMapped={false}
						side={THREE.DoubleSide}
						blending={THREE.AdditiveBlending}
						depthWrite={false}
					/>
				</mesh>
			</group>
			<pointLight
				ref={engineLight}
				position={[0, -1.6, 0]}
				color="#6EDBFF"
				intensity={7}
				distance={4}
			/>
		</group>
	);
}

export function HeroRocket3D({ className }: { className?: string }) {
	const reduce = useReducedMotion() ?? false;

	return (
		<div className={cn('relative', className)}>
			{/* Soft brand halo behind the rocket (CSS — always visible) */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
				style={{
					background:
						'radial-gradient(45% 40% at 50% 42%, rgba(222,107,255,0.45), transparent 70%)',
				}}
			/>
			<Canvas
				dpr={[1, 1.8]}
				gl={{ alpha: true, antialias: true }}
				camera={{ position: [0, 0.1, 7.6], fov: 30 }}
				frameloop={reduce ? 'demand' : 'always'}
				style={{ background: 'transparent' }}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[3, 4, 5]} intensity={1.1} />
				<pointLight position={[-4, 1, 2]} color="#DE6BFF" intensity={22} distance={12} />
				<pointLight position={[4, -1, 3]} color="#6EDBFF" intensity={18} distance={12} />

				<React.Suspense fallback={null}>
					<Float
						speed={reduce ? 0 : 1.5}
						rotationIntensity={reduce ? 0 : 0.4}
						floatIntensity={reduce ? 0 : 0.9}
						floatingRange={[-0.12, 0.12]}
					>
						<Rocket reduce={reduce} />
					</Float>

					{!reduce && (
						<Sparkles
							count={26}
							scale={[2, 3.4, 2]}
							position={[0, -0.4, 0]}
							size={3}
							speed={0.5}
							color="#DE6BFF"
						/>
					)}

					<Environment resolution={256} frames={1}>
						<Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 3, 3]} scale={[5, 4, 1]} />
						<Lightformer form="rect" intensity={3.2} color="#DE6BFF" position={[-3.5, 0.5, 2]} scale={[2, 5, 1]} />
						<Lightformer form="rect" intensity={3} color="#6EDBFF" position={[3.5, -0.5, 2]} scale={[2, 5, 1]} />
						<Lightformer form="ring" intensity={2} color="#5B54F2" position={[0, -2.5, 3]} scale={2.5} />
					</Environment>
				</React.Suspense>
			</Canvas>
		</div>
	);
}
