import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { Sparkle } from '@/components/brand';
import { cn } from '@/lib/utils';

const CASES = [
	{
		tag: 'Fintech · Super App',
		title: 'Разгон MAU финтех-суперприложения',
		grad: 'linear-gradient(135deg,#342EBB,#691E9A 55%,#9A12AF)',
		metrics: [
			{ v: '+180%', l: 'рост MAU за 6 мес.' },
			{ v: '−34%', l: 'CPI' },
		],
	},
	{
		tag: 'E-com · Marketplace',
		title: 'Ремаркетинг для маркетплейса',
		grad: 'linear-gradient(135deg,#9A12AF,#C97DF3 60%,#DE6BFF)',
		metrics: [
			{ v: '×3.1', l: 'ROAS по когортам' },
			{ v: '+62%', l: 'повторные покупки' },
		],
	},
	{
		tag: 'Mobile Game · Casual',
		title: 'UA-скейл казуальной игры',
		grad: 'linear-gradient(135deg,#5B54F2,#6EA1FF 55%,#FB0CD2)',
		metrics: [
			{ v: '2.1M', l: 'установок' },
			{ v: 'D30 ×2.4', l: 'окупаемость' },
		],
	},
];

export function Cases() {
	return (
		<section id="cases" className="relative py-24 sm:py-32">
			<div className="container">
				<div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div className="max-w-2xl">
						<Reveal>
							<span className="eyebrow inline-flex items-center gap-2 text-brand-magenta">
								<Sparkle className="size-3.5" /> Кейсы
							</span>
						</Reveal>
						<Reveal delay={0.05}>
							<h2 className="display-2 mt-4">
								Цифры, а не <span className="text-grad">обещания</span>
							</h2>
						</Reveal>
					</div>
					<Reveal delay={0.1}>
						<a
							href="#contact"
							className="group inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide text-brand-purple"
						>
							Все кейсы
							<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
					</Reveal>
				</div>

				<RevealGroup className="grid gap-4 md:grid-cols-3">
					{CASES.map((c, i) => (
						<RevealItem key={c.title}>
							<article
								className={cn(
									'group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl p-7 text-white shadow-xl transition-transform duration-300 hover:-translate-y-1.5',
									i === 1 && 'md:mt-10',
								)}
								style={{ backgroundImage: c.grad }}
							>
								<div
									aria-hidden
									className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
								/>
								<div className="relative flex items-start justify-between">
									<span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
										{c.tag}
									</span>
									<Sparkle className="size-5 opacity-70" />
								</div>

								<div className="relative">
									<h3 className="font-display text-2xl leading-tight">
										{c.title}
									</h3>
									<dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
										{c.metrics.map((m) => (
											<div key={m.l}>
												<dt className="font-display text-3xl">{m.v}</dt>
												<dd className="mt-1 text-xs text-white/75">{m.l}</dd>
											</div>
										))}
									</dl>
								</div>
							</article>
						</RevealItem>
					))}
				</RevealGroup>
			</div>
		</section>
	);
}
