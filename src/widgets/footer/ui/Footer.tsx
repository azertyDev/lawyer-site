'use client'

import { siteConfig } from '@/shared/config'
import { analytics, EventNames } from '@/shared/lib'
import { Button, Container } from '@/shared/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const navigation = {
	services: [
		{ name: 'Взыскание задолженности', href: '/services/debt-collection' },
		{ name: 'Договорные споры', href: '/services/contract-disputes' },
		{ name: 'Экономические споры', href: '/services/economic-disputes' },
		{ name: 'Гражданские споры', href: '/services/civil-disputes' },
	],
	company: [
		{ name: 'О юристе', href: '/about' },
		{ name: 'Практика', href: '/practice' },
		{ name: 'Стоимость', href: '/fees' },
		{ name: 'FAQ', href: '/faq' },
		{ name: 'Контакты', href: '/contacts' },
	],
	legal: [
		{ name: 'Политика конфиденциальности', href: '/privacy' },
		{ name: 'Согласие на обработку данных', href: '/data-processing-consent' },
	],
}

export function Footer() {
	const handlePhoneClick = () => {
		analytics.track({
			name: EventNames.CLICK_PHONE,
			params: { location: 'footer' },
		})
	}

	const handleTelegramClick = () => {
		analytics.track({
			name: EventNames.CLICK_MESSENGER_TG,
			params: { location: 'footer' },
		})
	}

	const handleWhatsAppClick = () => {
		analytics.track({
			name: EventNames.CLICK_MESSENGER_WA,
			params: { location: 'footer' },
		})
	}

	return (
		<footer className="bg-navy text-white">
			<Container>
				<div className="py-16 md:py-20">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
						<div className="lg:col-span-1">
							<Link href="/" className="font-serif text-2xl font-semibold">
								{siteConfig.name}
							</Link>
							<p className="mt-4 text-white/70 text-sm leading-relaxed">
								Юридическая помощь по экономическим и гражданским спорам.
								Представительство в судах, взыскание задолженности, договорные
								споры.
							</p>
							<div className="mt-6 flex gap-3">
								<a
									href={siteConfig.social.telegram}
									target="_blank"
									rel="noopener noreferrer"
									onClick={handleTelegramClick}
									className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
									aria-label="Telegram"
								>
									<Icon icon="lucide:send" className="w-5 h-5" />
								</a>
								<a
									href={siteConfig.social.whatsapp}
									target="_blank"
									rel="noopener noreferrer"
									onClick={handleWhatsAppClick}
									className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
									aria-label="WhatsApp"
								>
									<Icon icon="lucide:message-circle" className="w-5 h-5" />
								</a>
							</div>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Услуги</h3>
							<ul className="space-y-3">
								{navigation.services.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="text-sm text-white/70 hover:text-gold transition-colors"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Информация</h3>
							<ul className="space-y-3">
								{navigation.company.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="text-sm text-white/70 hover:text-gold transition-colors"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Контакты</h3>
							<ul className="space-y-3 text-sm text-white/70">
								<li>
									<a
										href={`tel:${siteConfig.contact.phoneClean}`}
										onClick={handlePhoneClick}
										className="hover:text-gold transition-colors flex items-center gap-2"
									>
										<Icon icon="lucide:phone" className="w-4 h-4" />
										{siteConfig.contact.phone}
									</a>
								</li>
								<li>
									<a
										href={`mailto:${siteConfig.contact.email}`}
										className="hover:text-gold transition-colors flex items-center gap-2"
									>
										<Icon icon="lucide:mail" className="w-4 h-4" />
										{siteConfig.contact.email}
									</a>
								</li>
								<li className="flex items-start gap-2">
									<Icon icon="lucide:map-pin" className="w-4 h-4 mt-0.5" />
									{siteConfig.contact.address}
								</li>
								<li className="flex items-center gap-2">
									<Icon icon="lucide:clock" className="w-4 h-4" />
									{siteConfig.contact.workingHours}
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="py-6 border-t border-white/10">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="text-sm text-white/50">
							© {new Date().getFullYear()} {siteConfig.name}. Все права
							защищены.
						</div>
						<div className="flex gap-6">
							{navigation.legal.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="text-xs text-white/50 hover:text-white/70 transition-colors"
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
					<p className="mt-4 text-xs text-white/40 text-center md:text-left">
						Информация на сайте не является публичной офертой или юридической
						консультацией. Отношения с клиентом возникают после заключения
						договора.
					</p>
				</div>
			</Container>
		</footer>
	)
}
