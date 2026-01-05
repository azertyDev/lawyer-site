import { siteConfig } from '@/shared/config'
import { generateBreadcrumbSchema } from '@/shared/lib'
import { Breadcrumb, Container, Section } from '@/shared/ui'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Согласие на обработку персональных данных',
	description: 'Согласие на обработку персональных данных',
	robots: {
		index: false,
		follow: false,
	},
}

const sections = [
	{
		id: 'personal-data',
		icon: 'lucide:user-circle',
		title: 'Перечень персональных данных',
		description: 'Согласие дается на обработку следующих данных:',
		items: [
			'Фамилия, имя, отчество',
			'Номер телефона',
			'Адрес электронной почты',
			'Иная информация, добровольно предоставленная в формах на Сайте',
		],
	},
	{
		id: 'purposes',
		icon: 'lucide:target',
		title: 'Цели обработки',
		description: 'Персональные данные обрабатываются в целях:',
		items: [
			'Обработки вашего обращения или заявки',
			'Связи с вами по указанным контактам',
			'Оказания юридических услуг',
			'Направления информационных сообщений (с вашего согласия)',
		],
	},
	{
		id: 'methods',
		icon: 'lucide:settings',
		title: 'Способы обработки',
		description:
			'Оператор вправе осуществлять обработку персональных данных следующими способами:',
		items: [
			'Сбор, запись, систематизация, накопление',
			'Хранение, уточнение (обновление, изменение)',
			'Извлечение, использование, передача (предоставление, доступ)',
			'Блокирование, удаление, уничтожение',
		],
		note: 'Обработка осуществляется с использованием средств автоматизации и/или без использования таких средств.',
	},
	{
		id: 'duration',
		icon: 'lucide:clock',
		title: 'Срок действия согласия',
		description:
			'Согласие действует до достижения целей обработки, но не более 3 лет с момента предоставления данных, либо до момента отзыва согласия.',
	},
	{
		id: 'withdrawal',
		icon: 'lucide:undo-2',
		title: 'Отзыв согласия',
		description:
			'Согласие может быть отозвано путем направления письменного заявления на адрес электронной почты или почтовый адрес Оператора.',
		note: 'В случае отзыва согласия Оператор прекращает обработку персональных данных и уничтожает их в срок не более 30 дней с момента получения отзыва, за исключением случаев, когда дальнейшая обработка предусмотрена законодательством.',
	},
	{
		id: 'guarantees',
		icon: 'lucide:shield-check',
		title: 'Гарантии',
		description:
			'Оператор гарантирует, что обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и иными нормативными правовыми актами Российской Федерации.',
	},
]

export default function DataProcessingConsentPage() {
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'Согласие на обработку данных', url: '/data-processing-consent' },
	])

	return (
		<>
			<Script
				id="breadcrumb-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>

			<Section className="pt-24 md:pt-32">
				<Container size="md">
					<Breadcrumb
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'Согласие на обработку данных' },
						]}
					/>

					<div className="mt-8">
						<div className="mb-10">
							<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
								Согласие на обработку персональных данных
							</h1>
							<p className="text-lg text-muted-foreground">
								Отправляя форму на сайте{' '}
								<span className="text-navy font-medium">{siteConfig.url}</span>,
								вы даёте своё согласие{' '}
								<span className="text-navy font-medium">
									{siteConfig.legal.companyName}
								</span>
								, ИНН {siteConfig.legal.inn} (далее — Оператор) на обработку
								персональных данных на следующих условиях:
							</p>
						</div>

						<div className="space-y-6">
							{sections.map((section, index) => (
								<div
									key={section.id}
									className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
								>
									<div className="flex gap-4">
										<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
											<Icon
												icon={section.icon}
												className="w-6 h-6 text-navy"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h2 className="font-serif text-xl text-navy mb-2">
												<span className="text-gold">{index + 1}.</span>{' '}
												{section.title}
											</h2>
											<p className="text-muted-foreground mb-3">
												{section.description}
											</p>
											{section.items && (
												<ul className="space-y-2">
													{section.items.map((item) => (
														<li key={item} className="flex items-start gap-2">
															<Icon
																icon="lucide:check"
																className="w-5 h-5 text-gold shrink-0 mt-0.5"
															/>
															<span className="text-foreground">{item}</span>
														</li>
													))}
												</ul>
											)}
											{section.note && (
												<div className="mt-4 p-4 bg-muted rounded-lg">
													<p className="text-sm text-muted-foreground">
														{section.note}
													</p>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 bg-gradient-to-br from-navy/5 to-gold/5 rounded-xl border p-6">
							<div className="flex gap-4">
								<div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
									<Icon icon="lucide:mail" className="w-6 h-6 text-gold" />
								</div>
								<div>
									<h2 className="font-serif text-xl text-navy mb-4">
										<span className="text-gold">7.</span> Контакты
									</h2>
									<p className="text-muted-foreground mb-4">
										По вопросам обработки персональных данных обращайтесь:
									</p>
									<div className="space-y-3">
										<a
											href={`mailto:${siteConfig.contact.email}`}
											className="flex items-center gap-3 text-navy hover:text-gold transition-colors group"
										>
											<div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:bg-gold/10 transition-colors">
												<Icon icon="lucide:at-sign" className="w-5 h-5" />
											</div>
											<span className="font-medium">
												{siteConfig.contact.email}
											</span>
										</a>
										<a
											href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
											className="flex items-center gap-3 text-navy hover:text-gold transition-colors group"
										>
											<div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:bg-gold/10 transition-colors">
												<Icon icon="lucide:phone" className="w-5 h-5" />
											</div>
											<span className="font-medium">
												{siteConfig.contact.phone}
											</span>
										</a>
										<div className="flex items-center gap-3 text-navy">
											<div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
												<Icon icon="lucide:map-pin" className="w-5 h-5" />
											</div>
											<span>{siteConfig.contact.address}</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 text-center">
							<p className="text-sm text-muted-foreground">
								Ознакомьтесь также с нашей{' '}
								<a
									href="/privacy"
									className="text-gold hover:text-gold/80 underline underline-offset-2 transition-colors"
								>
									Политикой конфиденциальности
								</a>
							</p>
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
