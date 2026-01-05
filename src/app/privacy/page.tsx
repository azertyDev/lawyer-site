import { siteConfig } from '@/shared/config'
import { generateBreadcrumbSchema } from '@/shared/lib'
import { Breadcrumb, Container, Section } from '@/shared/ui'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности',
	description: 'Политика обработки персональных данных',
}

const sections = [
	{
		id: 'general',
		icon: 'lucide:file-text',
		title: 'Общие положения',
		description: `Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта ${siteConfig.url} (далее — Сайт).`,
		note: `Оператор персональных данных: ${siteConfig.legal.companyName}, ИНН ${siteConfig.legal.inn}.`,
	},
	{
		id: 'data-collected',
		icon: 'lucide:database',
		title: 'Какие данные мы собираем',
		description: 'Мы можем собирать следующие персональные данные:',
		items: [
			'Имя (как к вам обращаться)',
			'Номер телефона',
			'Адрес электронной почты',
			'Информация, предоставленная в формах обратной связи',
			'Технические данные (IP-адрес, cookies, данные браузера)',
		],
	},
	{
		id: 'purposes',
		icon: 'lucide:target',
		title: 'Цели обработки данных',
		description: 'Персональные данные обрабатываются в следующих целях:',
		items: [
			'Обработка обращений и заявок',
			'Связь с пользователями',
			'Оказание юридических услуг',
			'Улучшение работы Сайта',
			'Статистический анализ посещаемости',
		],
	},
	{
		id: 'legal-basis',
		icon: 'lucide:scale',
		title: 'Правовые основания обработки',
		description: 'Обработка персональных данных осуществляется на основании:',
		items: [
			'Согласия субъекта персональных данных',
			'Исполнения договора, стороной которого является субъект персональных данных',
			'Законных интересов Оператора (улучшение сервиса, безопасность)',
		],
	},
	{
		id: 'storage',
		icon: 'lucide:hard-drive',
		title: 'Хранение и защита данных',
		description:
			'Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не более 3 лет с момента последнего взаимодействия, если иное не предусмотрено законом.',
		note: 'Мы принимаем необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, распространения.',
	},
	{
		id: 'third-parties',
		icon: 'lucide:share-2',
		title: 'Передача данных третьим лицам',
		description:
			'Персональные данные не передаются третьим лицам, за исключением случаев:',
		items: [
			'С согласия субъекта персональных данных',
			'По требованию законодательства',
			'Для обеспечения работы Сайта (хостинг, аналитика) — только обезличенные данные',
		],
	},
	{
		id: 'rights',
		icon: 'lucide:user-check',
		title: 'Права субъекта персональных данных',
		description: 'Вы имеете право:',
		items: [
			'Получить информацию об обработке ваших данных',
			'Требовать уточнения или удаления данных',
			'Отозвать согласие на обработку',
			'Подать жалобу в уполномоченный орган',
		],
	},
	{
		id: 'cookies',
		icon: 'lucide:cookie',
		title: 'Cookies',
		description:
			'Сайт использует cookies для обеспечения работы и сбора статистики. Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность Сайта.',
	},
	{
		id: 'changes',
		icon: 'lucide:refresh-cw',
		title: 'Изменения в политике',
		description:
			'Мы можем обновлять настоящую Политику. Актуальная версия всегда доступна на данной странице. Продолжая пользоваться Сайтом, вы соглашаетесь с изменениями.',
	},
]

export default function PrivacyPage() {
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'Политика конфиденциальности', url: '/privacy' },
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
							{ label: 'Политика конфиденциальности' },
						]}
					/>

					<div className="mt-8">
						<div className="mb-10">
							<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
								Политика конфиденциальности
							</h1>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
								<Icon
									icon="lucide:calendar"
									className="w-4 h-4 text-muted-foreground"
								/>
								<span className="text-sm text-muted-foreground">
									Дата последнего обновления:{' '}
									{new Date().toLocaleDateString('ru-RU')}
								</span>
							</div>
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
										<span className="text-gold">10.</span> Контакты
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
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 text-center">
							<p className="text-sm text-muted-foreground">
								Ознакомьтесь также с{' '}
								<a
									href="/data-processing-consent"
									className="text-gold hover:text-gold/80 underline underline-offset-2 transition-colors"
								>
									Согласием на обработку персональных данных
								</a>
							</p>
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
