'use client';

import * as React from 'react';
import { ArrowUpRight, Mail, Phone, AtSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { Sparkle } from '@/components/brand';

const CONTACTS = [
	{ icon: Phone, label: '+7 499 110 07 39', href: 'tel:+74991100739' },
	{ icon: Mail, label: 'welcome@mobiads.io', href: 'mailto:welcome@mobiads.io' },
	{ icon: AtSign, label: '@mobiads_agency', href: 'https://t.me/mobiads_agency' },
];

export function Contact() {
	const [sent, setSent] = React.useState(false);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// Demo handler — wire to your CRM / API route.
		setSent(true);
	}

	return (
		<section id="contact" className="relative py-24 sm:py-32">
			<div className="container">
				<div className="relative overflow-hidden rounded-[2.5rem] bg-brand-grad p-8 text-white sm:p-12 lg:p-16">
					<div
						aria-hidden
						className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl"
					/>
					<div className="relative grid gap-12 lg:grid-cols-2">
						<div>
							<span className="eyebrow inline-flex items-center gap-2 text-white/80">
								<Sparkle className="size-3.5" /> Контакты
							</span>
							<h2 className="display-2 mt-5">
								Обсудим ваш <span className="text-white">рост?</span>
							</h2>
							<p className="mt-5 max-w-md text-white/75">
								Расскажите про приложение и цели — вернёмся с гипотезами по
								каналам и медиапланом в течение одного рабочего дня.
							</p>

							<ul className="mt-9 space-y-3">
								{CONTACTS.map((c) => {
									const Icon = c.icon;
									return (
										<li key={c.label}>
											<a
												href={c.href}
												className="inline-flex items-center gap-3 text-white/85 transition-colors hover:text-white"
											>
												<span className="flex size-10 items-center justify-center rounded-full bg-white/15">
													<Icon className="size-4" />
												</span>
												<span className="font-medium">{c.label}</span>
											</a>
										</li>
									);
								})}
							</ul>
						</div>

						{sent ? (
							<div className="flex flex-col items-center justify-center rounded-3xl bg-white/10 p-10 text-center backdrop-blur">
								<span className="mb-4 flex size-16 items-center justify-center rounded-full bg-white text-brand-purple">
									<Check className="size-8" />
								</span>
								<h3 className="font-display text-2xl">Заявка отправлена</h3>
								<p className="mt-2 text-white/75">
									Спасибо! Свяжемся с вами в ближайшее время.
								</p>
							</div>
						) : (
							<form
								onSubmit={onSubmit}
								className="rounded-3xl bg-white/10 p-6 backdrop-blur sm:p-8"
							>
								<div className="space-y-4">
									<Field id="name" label="Имя" placeholder="Как к вам обращаться" autoComplete="name" required />
									<Field
										id="contact"
										label="Телефон или e-mail"
										placeholder="+7 ··· или you@company.com"
										autoComplete="email"
										required
									/>
									<div>
										<label htmlFor="msg" className="mb-1.5 block text-sm font-medium text-white/85">
											Задача <span className="text-gaming-cyan">*</span>
										</label>
										<textarea
											id="msg"
											name="msg"
											required
											rows={3}
											placeholder="Приложение, гео, цели по KPI…"
											className="w-full resize-none rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition focus:border-white/60 focus:ring-2 focus:ring-white/40"
										/>
									</div>
									<Button type="submit" size="lg" variant="neo" className="w-full">
										Отправить заявку
										<ArrowUpRight />
									</Button>
									<p className="text-center text-xs text-white/55">
										Нажимая кнопку, вы соглашаетесь с политикой обработки данных.
									</p>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

function Field({
	id,
	label,
	...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div>
			<label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/85">
				{label} {props.required && <span className="text-gaming-cyan">*</span>}
			</label>
			<input
				id={id}
				name={id}
				className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition focus:border-white/60 focus:ring-2 focus:ring-white/40"
				{...props}
			/>
		</div>
	);
}
