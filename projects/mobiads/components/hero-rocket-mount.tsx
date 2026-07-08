'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { HeroRocket as HeroRocketSVG } from '@/components/hero-rocket';

const BOX_3D =
	'relative mx-auto -mb-2 aspect-[4/5] w-[clamp(180px,20vw,300px)]';
const BOX_SVG = 'relative mx-auto mb-3 w-[clamp(110px,13vw,168px)]';

const HeroRocket3D = dynamic(
	() => import('@/components/hero-rocket-3d').then((m) => m.HeroRocket3D),
	{ ssr: false, loading: () => <HeroRocketSVG className={BOX_SVG} /> },
);

/** Falls back to the SVG rocket if the 3D scene throws (WebGL/driver issues). */
class RocketBoundary extends React.Component<
	{ fallback: React.ReactNode; children: React.ReactNode },
	{ failed: boolean }
> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch() {
		/* swallow — the fallback rocket is enough */
	}
	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
}

/**
 * Renders the premium 3D rocket when WebGL2 is available, otherwise (or on any
 * runtime error) the animated SVG rocket. Guarantees the hero always shows a
 * rocket — never an empty gap.
 */
export function HeroRocketMount() {
	const [webgl, setWebgl] = React.useState<boolean | null>(null);

	React.useEffect(() => {
		let ok = false;
		try {
			const c = document.createElement('canvas');
			ok = !!(
				typeof window !== 'undefined' &&
				window.WebGL2RenderingContext &&
				c.getContext('webgl2')
			);
		} catch {
			ok = false;
		}
		setWebgl(ok);
	}, []);

	// Before detection resolves, show the SVG rocket (no empty gap, no fl[...]
	if (webgl === null) return <HeroRocketSVG className={BOX_SVG} />;
	if (!webgl) return <HeroRocketSVG className={BOX_SVG} />;

	return (
		<RocketBoundary fallback={<HeroRocketSVG className={BOX_SVG} />}>
			<HeroRocket3D className={BOX_3D} />
		</RocketBoundary>
	);
}
