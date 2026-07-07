import { cn } from '@/lib/utils';

/** Bold rocket mark — the brand's "fuel for mobile apps" motif. */
export function RocketMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 48 48"
			fill="none"
			className={cn('size-6', className)}
			aria-hidden="true"
		>
			<path
				d="M30.5 4.2c6.6.4 11.1 2.1 13.3 4.3 2.2 2.2 3.9 6.7 4.3 13.3-6 3-11.2 3.2-15.6 1.9L21.9 34.3c1.2.9 1.4 2.6.5 3.7l-3 3.8c-.6.7-1.6.9-2.4.4l-1.7-1.1-4.6 4.6a1.7 1.7 0 0 1-2.4-2.4l4.6-4.6-1.1-1.7c-.5-.8-.3-1.8.4-2.4l3.8-3c1.1-.9 2.8-.7 3.7.5l10.6-10.6c-1.3-4.4-1.1-9.6 1.9-15.6Z"
				fill="currentColor"
			/>
			<circle cx="33.5" cy="14.5" r="3.4" className="fill-white/90" />
		</svg>
	);
}

/** 4-point sparkle used across MobiAds collateral. */
export function Sparkle({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			className={cn('size-4', className)}
			aria-hidden="true"
			fill="currentColor"
		>
			<path d="M12 0c.7 6.1 5.9 11.3 12 12-6.1.7-11.3 5.9-12 12-.7-6.1-5.9-11.3-12-12C6.1 11.3 11.3 6.1 12 0Z" />
		</svg>
	);
}

/** MOBIADS wordmark. `gaming` swaps the rocket in for the "GAMING" lockup. */
export function Logo({
	className,
	gaming = false,
}: {
	className?: string;
	gaming?: boolean;
}) {
	return (
		<span
			className={cn(
				'inline-flex items-center gap-2 font-display text-xl leading-none tracking-tight',
				className,
			)}
		>
			<span>
				MOBI<span className="text-grad">ADS</span>
			</span>
			{gaming && (
				<>
					<RocketMark className="size-5 text-current" />
					<span className="text-[0.55em] tracking-[0.3em] opacity-80">
						GAMING
					</span>
				</>
			)}
		</span>
	);
}
