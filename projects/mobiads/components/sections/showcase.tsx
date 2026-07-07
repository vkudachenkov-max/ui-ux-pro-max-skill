import { MousePointer2, Trophy } from 'lucide-react';
import CardFanCarousel, { type FanItem } from '@/components/ui/card-fan-carousel';
import { Reveal } from '@/components/reveal';
import { Sparkle } from '@/components/brand';

type Metric = { label: string; value: string; sub?: string };
type CaseData = {
	brand: string;
	category: string;
	title: string;
	grad: string;
	primary: Metric;
	metrics: [Metric, Metric];
};

const CASES: CaseData[] = [
	{
		brand: 'Магнит Плюс',
		category: 'Food delivery',
		title: 'Медийка в performance',
		grad: 'linear-gradient(150deg,#342EBB,#691E9A 55%,#9A12AF)',
		primary: {
			value: '20.000+',
			label: 'продаж в месяц · +275%',
			sub: 'средний объём 5.336',
		},
		metrics: [
			{ label: 'CR', value: '4,57%', sub: '×1,3 к плану' },
			{ label: 'CAC', value: '800 ₽', sub: 'ниже плана' },
		],
	},
	{
		brand: 'Много Лосося',
		category: 'QSR',
		title: 'Медийка в performance',
		grad: 'linear-gradient(150deg,#691E9A,#9A12AF 55%,#DE6BFF)',
		primary: {
			value: '10% → 17%',
			label: 'CR после запуска',
			sub: 'доля доставок 20% → 35%',
		},
		metrics: [
			{ label: 'CAC', value: '850→500 ₽', sub: 'после теста' },
			{ label: 'AOV', value: 'выше', sub: 'у доставок' },
		],
	},
	{
		brand: 'ВкусВилл',
		category: 'Food delivery',
		title: 'Работа с масштабированием',
		grad: 'linear-gradient(150deg,#342EBB,#5B54F2 50%,#691E9A)',
		primary: {
			value: '29.000+',
			label: 'продаж в месяц',
			sub: 'средний объём 17.147',
		},
		metrics: [
			{ label: 'CR', value: '9,17%', sub: 'средний' },
			{ label: 'CAC', value: '1.000 ₽', sub: 'средний' },
		],
	},
	{
		brand: 'Подружка',
		category: 'E-commerce',
		title: 'Кейс по объёму и CR',
		grad: 'linear-gradient(150deg,#5B54F2,#9A12AF 55%,#DE6BFF)',
		primary: {
			value: '7.000+',
			label: 'продаж в месяц · +30% к плану',
			sub: 'средний объём 5.367',
		},
		metrics: [
			{ label: 'CR', value: '6,58%', sub: '×3,7 к плану' },
			{ label: 'CAC', value: '1.000 ₽', sub: 'в пределах плана' },
		],
	},
];

const AWARDS = [
	{ place: '1', text: 'по приросту оборота за год' },
	{ place: '3', text: 'по обороту бюджетов среди агентств mobile performance' },
	{ place: '10', text: 'Рейтинг Рунета — мобильный маркетинг' },
	{ place: '17', text: 'Рейтинг Рунета — перформанс маркетинг' },
];

function Stat({ m, light }: { m: Metric; light?: boolean }) {
	return (
		<div>
			<div className="text-[0.7rem] font-semibold uppercase tracking-wide text-white/60">
				{m.label}
			</div>
			<div className={`font-display leading-tight ${light ? 'text-xl' : 'text-2xl'}`}>
				{m.value}
			</div>
			{m.sub && <div className="mt-0.5 text-[0.7rem] text-white/60">{m.sub}</div>}
		</div>
	);
}

function CaseCardFace({ c }: { c: CaseData }) {
	return (
		<div
			className="relative flex h-full w-full flex-col justify-between p-6 text-white sm:p-7"
			style={{ backgroundImage: c.grad }}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl"
			/>
			<div className="relative flex items-start justify-between">
				<span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
					{c.category}
				</span>
				<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
					<Sparkle className="size-3.5" /> MOBIADS
				</span>
			</div>

			<div className="relative">
				<p className="text-sm text-white/70">Кейс · {c.title}</p>
				<h3 className="mt-1 font-display text-2xl leading-tight sm:text-[1.7rem]">
					{c.brand}
				</h3>

				<div className="mt-5">
					<div className="font-display text-4xl leading-none sm:text-5xl">
						{c.primary.value}
					</div>
					<div className="mt-2 text-sm text-white/80">{c.primary.label}</div>
					{c.primary.sub && (
						<div className="text-xs text-white/55">{c.primary.sub}</div>
					)}
				</div>

				<div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
					{c.metrics.map((m) => (
						<Stat key={m.label} m={m} />
					))}
				</div>
			</div>
		</div>
	);
}

function AwardsCardFace() {
	return (
		<div
			className="relative flex h-full w-full flex-col justify-between p-6 text-white sm:p-7"
			style={{ backgroundImage: 'linear-gradient(150deg,#342EBB,#5B54F2 60%,#6EA1FF)' }}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/15 blur-2xl"
			/>
			<div className="relative flex items-start justify-between">
				<span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
					<Trophy className="size-3.5" /> Признание рынка
				</span>
				<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
					<Sparkle className="size-3.5" /> MOBIADS
				</span>
			</div>

			<div className="relative">
				<h3 className="font-display text-2xl leading-tight sm:text-[1.7rem]">
					Награды
				</h3>
				<ul className="mt-4 space-y-3">
					{AWARDS.map((a) => (
						<li key={a.text} className="flex items-start gap-3">
							<span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 font-display text-sm">
								{a.place}
							</span>
							<span className="pt-1 text-[0.82rem] leading-snug text-white/85">
								{a.text}
							</span>
						</li>
					))}
				</ul>
				<p className="mt-4 border-t border-white/20 pt-3 text-xs text-white/70">
					RUWARD · Workspace Digital Awards 2025 — шортлист с кейсом
				</p>
			</div>
		</div>
	);
}

const ITEMS: FanItem[] = [
	...CASES.map((c) => ({
		key: c.brand,
		label: `Кейс ${c.brand} — ${c.category}`,
		content: <CaseCardFace c={c} />,
	})),
	{
		key: 'awards',
		label: 'Награды и признание рынка',
		content: <AwardsCardFace />,
	},
];

export function Showcase() {
	return (
		<section id="portfolio" className="relative overflow-hidden py-24 sm:py-32">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						'radial-gradient(45% 40% at 50% 28%, rgba(222,107,255,0.16), transparent 70%)',
				}}
			/>
			<div className="container">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<Reveal>
						<span className="eyebrow inline-flex items-center gap-2 text-brand-magenta">
							<Sparkle className="size-3.5" /> Портфолио
						</span>
					</Reveal>
					<Reveal delay={0.05}>
						<h2 className="display-2 mt-4">
							Кейсы в <span className="text-grad">историях</span>
						</h2>
					</Reveal>
					<Reveal delay={0.1}>
						<p className="mx-auto mt-5 max-w-md text-foreground/60">
							Реальные клиенты и результаты в цифрах. Листайте карточки —
							перетаскиванием, стрелками или свайпом.
						</p>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<CardFanCarousel items={ITEMS} />
				</Reveal>

				<Reveal delay={0.15}>
					<p className="mt-6 flex items-center justify-center gap-2 text-sm text-foreground/45">
						<MousePointer2 className="size-4" />
						Перетащите активную карточку или используйте стрелки
					</p>
				</Reveal>
			</div>
		</section>
	);
}
