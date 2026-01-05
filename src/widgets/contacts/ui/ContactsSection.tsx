'use client'

import { ConsultationForm } from '@/features/consultation-form'
import { siteConfig } from '@/shared/config'
import { analytics, EventNames } from '@/shared/lib'
import { Container, Section, SectionHeader } from '@/shared/ui'
import { Icon } from '@iconify/react'

export function ContactsSection() {
	const handlePhoneClick = () => {
		analytics.track({
			name: EventNames.CLICK_PHONE,
			params: { location: 'contacts_section' },
		})
	}

	const handleTelegramClick = () => {
		analytics.track({
			name: EventNames.CLICK_MESSENGER_TG,
			params: { location: 'contacts_section' },
		})
	}

	const handleWhatsAppClick = () => {
		analytics.track({
			name: EventNames.CLICK_MESSENGER_WA,
			params: { location: 'contacts_section' },
		})
	}

	return (
		<Section variant="muted" id="contacts">
			<Container>
				<SectionHeader
					title="Контакты"
					subtitle="Свяжитесь со мной удобным способом"
				/>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div>
						<div className="space-y-6">
							<a
								href={`tel:${siteConfig.contact.phoneClean}`}
								onClick={handlePhoneClick}
								className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
							>
								<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
									<Icon
										icon="lucide:phone"
										className="w-6 h-6 text-navy group-hover:text-gold transition-colors"
									/>
								</div>
								<div>
									<div className="text-sm text-muted-foreground">Телефон</div>
									<div className="font-semibold text-navy">
										{siteConfig.contact.phone}
									</div>
								</div>
							</a>

							<a
								href={`mailto:${siteConfig.contact.email}`}
								className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
							>
								<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
									<Icon
										icon="lucide:mail"
										className="w-6 h-6 text-navy group-hover:text-gold transition-colors"
									/>
								</div>
								<div>
									<div className="text-sm text-muted-foreground">Email</div>
									<div className="font-semibold text-navy">
										{siteConfig.contact.email}
									</div>
								</div>
							</a>

							<div className="flex items-center gap-4 p-4 bg-white rounded-xl">
								<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center">
									<Icon icon="lucide:map-pin" className="w-6 h-6 text-navy" />
								</div>
								<div>
									<div className="text-sm text-muted-foreground">Адрес</div>
									<div className="font-semibold text-navy">
										{siteConfig.contact.address}
									</div>
								</div>
							</div>

							<div className="flex items-center gap-4 p-4 bg-white rounded-xl">
								<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center">
									<Icon icon="lucide:clock" className="w-6 h-6 text-navy" />
								</div>
								<div>
									<div className="text-sm text-muted-foreground">
										Часы работы
									</div>
									<div className="font-semibold text-navy">
										{siteConfig.contact.workingHours}
									</div>
								</div>
							</div>
						</div>

						<div className="mt-8">
							<h3 className="font-semibold text-navy mb-4">Мессенджеры</h3>
							<div className="flex gap-4">
								<a
									href={siteConfig.social.telegram}
									target="_blank"
									rel="noopener noreferrer"
									onClick={handleTelegramClick}
									className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg hover:shadow-md transition-shadow"
								>
									<Icon
										icon="lucide:send"
										className="w-5 h-5 text-[#0088cc]"
									/>
									<span className="text-sm font-medium">Telegram</span>
								</a>
								<a
									href={siteConfig.social.whatsapp}
									target="_blank"
									rel="noopener noreferrer"
									onClick={handleWhatsAppClick}
									className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg hover:shadow-md transition-shadow"
								>
									<Icon
										icon="lucide:message-circle"
										className="w-5 h-5 text-[#25D366]"
									/>
									<span className="text-sm font-medium">WhatsApp</span>
								</a>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
						<h3 className="font-serif text-xl font-semibold text-navy mb-2">
							Записаться на консультацию
						</h3>
						<p className="text-muted-foreground mb-6">
							Оставьте контакты, и я свяжусь с вами в течение рабочего дня
						</p>
						<ConsultationForm />
					</div>
				</div>
			</Container>
		</Section>
	)
}
