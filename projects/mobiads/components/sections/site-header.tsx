'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/magnetic';
import { cn } from '@/lib/utils';

const NAV = [
	{ label: 'Услуги', href: '#services' },
	{ label: 'Кейсы', href: '#cases' },
	{ label: 'Портфолио', href: '#portfolio' },
	{ label: 'Gaming', href: '#gaming' },
	{ label: 'Контакты', href: '#contact' },
];

export function SiteHeader() {
	const [scrolled, setScrolled] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-50 transition-all duration-300',
				scrolled ? 'py-2.5' : 'py-4',
			)}
		>
			<div className="container">
				<div
					className={cn(
						'flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5',
						scrolled ? 'glass shadow-lg shadow-brand-purple/5' : 'bg-transparent',
					)}
				>
					<a href="#top" className="flex items-center" aria-label="MobiAds — на главную">
						<Logo />
					</a>

					<nav className="hidden items-center gap-1 md:flex">
						{NAV.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
							>
								{item.label}
							</a>
						))}
					</nav>

					<div className="hidden md:block">
						<Magnetic strength={0.4}>
							<Button asChild size="sm" variant="primary">
								<a href="#contact">Обсудить проект</a>
							</Button>
						</Magnetic>
					</div>

					<button
						className="flex size-11 items-center justify-center rounded-full text-foreground md:hidden"
						onClick={() => setOpen((v) => !v)}
						aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
						aria-expanded={open}
					>
						{open ? <X className="size-6" /> : <Menu className="size-6" />}
					</button>
				</div>

				{open && (
					<div className="mt-2 rounded-3xl glass p-4 shadow-xl md:hidden">
						<nav className="flex flex-col">
							{NAV.map((item) => (
								<a
									key={item.href}
									href={item.href}
									onClick={() => setOpen(false)}
									className="rounded-2xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5"
								>
									{item.label}
								</a>
							))}
							<Button asChild size="md" variant="primary" className="mt-2">
								<a href="#contact" onClick={() => setOpen(false)}>
									Обсудить проект
								</a>
							</Button>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
