import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap font-display uppercase tracking-wide text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				primary:
					'rounded-full bg-brand-grad text-white shadow-[0_10px_30px_-8px_rgba(105,30,154,0.6)] hover:shadow-[0_16px_40px_-8px_rgba(154,18,175,0.7)] hover:-translate-y-0.5',
				neo: 'rounded-full pill-neu text-brand-purple hover:-translate-y-0.5',
				outline:
					'rounded-full border-2 border-foreground/15 bg-transparent text-foreground hover:border-brand-magenta hover:text-brand-magenta',
				gaming:
					'rounded-full bg-gaming-grad text-white shadow-[0_10px_30px_-8px_rgba(251,12,210,0.6)] hover:shadow-[0_16px_44px_-8px_rgba(110,161,255,0.7)] hover:-translate-y-0.5',
				ghost: 'rounded-full text-foreground hover:bg-foreground/5',
			},
			size: {
				sm: 'h-10 px-5',
				md: 'h-12 px-7',
				lg: 'h-14 px-9 text-base',
			},
		},
		defaultVariants: { variant: 'primary', size: 'md' },
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
