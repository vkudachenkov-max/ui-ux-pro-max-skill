import {
	Smartphone,
	RefreshCw,
	Search,
	Target,
	Wand2,
	LineChart,
	ArrowUpRight,
} from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { Sparkle } from '@/components/brand';

const SERVICES = [
	{
		icon: Smartphone,
		title: 'In-App реклама',
		desc: 'Закупка трафика в топовых приложениях и рекламных сетях с точным таргетингом на платящую аудиторию.',
	},
	{
		icon: RefreshCw,
		title: 'Ремаркетинг',
		desc: 'Возвращаем пользователей и растим LTV: сегментные сценарии, динамические креативы, реактивация.',
	},
	{
		icon: Search,
		title: 'ASO',
		desc: 'Оптимизация в App Store и Google Play — семантика, визуал, A/B-тесты страниц и рост органики.',
	},
	{
		icon: Target,
		title: 'Performance / UA',
		desc: 'User acquisition под KPI: CPI, ROAS и окупаемость когорт. Масштабируем то, что приносит деньги.',
	},
	{
		icon: Wand2,
		title: 'Креативы',
		desc: 'Продакшн performance-креативов: playable, video и статик — на языке вашей аудитории.',
	},
	{
		icon: LineChart,
		title: 'Аналитика & MAU',
		desc: 'Сквозная аналитика, атрибуция и дашборды. Прозрачно показываем рост MAU и удержания.',
	},
];

export function Services() {
	return (
		<section id="services" className="relative py-24 sm:py-32">
			<div className="container">
				<div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div className="max-w-2xl">
						<Reveal>
							<span className="eyebrow inline-flex items-center gap-2 text-brand-magenta">
								<Sparkle className="size-3.5" /> Что мы делаем
							</span>
						</Reveal>
						<Reveal delay={0.05}>
							<h2 className="display-2 mt-4">
								Полный цикл <span className="text-grad">роста</span> приложения
							</h2>
						</Reveal>
					</div>
					<Reveal delay={0.1}>
						<p className="max-w-sm text-foreground/60">
							От первой установки до окупаемости когорты. Собираем воронку,
							которая работает на бизнес-метрики, а не на «показы».
						</p>
					</Reveal>
				</div>

				<RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{SERVICES.map((s) => {
						const Icon = s.icon;
						return (
							<RevealItem key={s.title}>
								<article className="group relative h-full overflow-hidden rounded-3xl border border-foreground/10 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-brand-purple/20">
									<div className="pointer-events-none absolute inset-0 bg-brand-grad opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<div className="relative">
										<div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-mist text-brand-purple transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
											<Icon className="size-7" strokeWidth={1.8} />
										</div>
										<div className="flex items-start justify-between gap-3">
											<h3 className="font-display text-xl text-foreground transition-colors duration-300 group-hover:text-white">
												{s.title}
											</h3>
											<ArrowUpRight className="size-5 shrink-0 -translate-y-0.5 text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
										</div>
										<p className="mt-3 text-sm leading-relaxed text-foreground/60 transition-colors duration-300 group-hover:text-white/85">
											{s.desc}
										</p>
									</div>
								</article>
							</RevealItem>
						);
					})}
				</RevealGroup>
			</div>
		</section>
	);
}
