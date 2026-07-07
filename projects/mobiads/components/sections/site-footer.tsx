import { Logo, Sparkle } from '@/components/brand';

const COLS = [
	{
		title: 'Услуги',
		links: ['In-App реклама', 'Ремаркетинг', 'ASO', 'Performance / UA', 'Аналитика'],
	},
	{
		title: 'Компания',
		links: ['О нас', 'Кейсы', 'MobiAds Gaming', 'Блог', 'Вакансии'],
	},
	{
		title: 'Контакты',
		links: ['welcome@mobiads.io', '+7 499 110 07 39', '@mobiads_agency', 'mobiads.io'],
	},
];

export function SiteFooter() {
	return (
		<footer className="border-t border-foreground/10 bg-background">
			<div className="container py-16">
				<div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
					<div>
						<Logo className="text-2xl" />
						<p className="mt-4 max-w-xs text-sm text-foreground/55">
							Топливо для мобильных приложений. Агентство мобильного маркетинга
							полного цикла.
						</p>
						<div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-mist px-4 py-2 text-xs font-semibold text-brand-purple">
							<Sparkle className="size-3.5 text-brand-magenta" />
							MOBILE × MARKETING × AGENCY
						</div>
					</div>

					{COLS.map((col) => (
						<div key={col.title}>
							<h3 className="font-display text-sm uppercase tracking-wide text-foreground/50">
								{col.title}
							</h3>
							<ul className="mt-4 space-y-2.5">
								{col.links.map((l) => (
									<li key={l}>
										<a
											href="#"
											className="text-sm text-foreground/70 transition-colors hover:text-brand-magenta"
										>
											{l}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 text-sm text-foreground/50 sm:flex-row">
					<p>© {new Date().getFullYear()} АО «МОБИАДС». Все права защищены.</p>
					<div className="flex gap-6">
						<a href="#" className="transition-colors hover:text-foreground">
							Политика конфиденциальности
						</a>
						<a href="#" className="transition-colors hover:text-foreground">
							Cookies
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
