import { ConsultationFormModal } from '@/features/consultation-form'
import { generateBreadcrumbSchema } from '@/shared/lib'
import { Breadcrumb, Button, Container, Section } from '@/shared/ui'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'О юристе',
	description:
		'Юрист по экономическим и гражданским спорам с опытом более 10 лет. Представительство в арбитражных судах и судах общей юрисдикции.',
}

const experience = [
	{
		years: '10+',
		label: 'лет практики',
	},
	{
		years: '500+',
		label: 'дел в судах',
	},
	{
		years: '95%',
		label: 'успешных дел',
	},
]

const expertise = [
	'Арбитражный процесс',
	'Гражданский процесс',
	'Корпоративное право',
	'Договорное право',
	'Исполнительное производство',
	'Банкротство',
]

const principles = [
	{
		title: 'Честность',
		description:
			'Реалистичная оценка перспектив дела. Я не обещаю невозможного и предупреждаю о рисках.',
		icon: 'lucide:shield-check',
	},
	{
		title: 'Прозрачность',
		description:
			'Понятные условия работы, регулярные отчёты о ходе дела, доступность для связи.',
		icon: 'lucide:eye',
	},
	{
		title: 'Результат',
		description:
			'Фокус на достижении целей клиента, а не на формальном выполнении работы.',
		icon: 'lucide:target',
	},
	{
		title: 'Конфиденциальность',
		description:
			'Строгое соблюдение адвокатской тайны и защита информации клиента.',
		icon: 'lucide:lock',
	},
]

export default function AboutPage() {
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'О юристе', url: '/about' },
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
				<Container>
					<Breadcrumb
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'О юристе' },
						]}
					/>

					<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						<div>
							<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-6">
								О юристе
							</h1>

							<p className="text-lg text-muted-foreground mb-6">
								Специализируюсь на представительстве в экономических и
								гражданских спорах. За более чем 10 лет практики провёл сотни
								дел в арбитражных судах и судах общей юрисдикции.
							</p>

							<p className="text-muted-foreground mb-8">
								Работаю с бизнесом и частными лицами. Основные направления —
								взыскание задолженности, договорные споры, корпоративные
								конфликты, защита права собственности. Представляю интересы
								клиентов на всех стадиях: от досудебного урегулирования до
								исполнительного производства.
							</p>

							<div className="grid grid-cols-3 gap-4 mb-8">
								{experience.map((item) => (
									<div
										key={item.label}
										className="text-center p-4 bg-muted rounded-xl"
									>
										<div className="font-serif text-3xl font-semibold text-navy">
											{item.years}
										</div>
										<div className="text-sm text-muted-foreground mt-1">
											{item.label}
										</div>
									</div>
								))}
							</div>

							<div className="mb-8">
								<h2 className="font-serif text-xl text-navy mb-4">
									Специализация
								</h2>
								<div className="flex flex-wrap gap-2">
									{expertise.map((item) => (
										<span
											key={item}
											className="px-3 py-1.5 bg-navy/5 text-navy text-sm rounded-full"
										>
											{item}
										</span>
									))}
								</div>
							</div>

							<ConsultationFormModal
								trigger={
									<Button variant="gold" size="lg">
										<Icon icon="lucide:calendar" className="w-5 h-5" />
										Записаться на консультацию
									</Button>
								}
							/>
						</div>

						<div className="space-y-6">
							<h2 className="font-serif text-2xl text-navy mb-6">
								Принципы работы
							</h2>

							{principles.map((principle) => (
								<div
									key={principle.title}
									className="flex gap-4 p-6 bg-white rounded-xl border hover:shadow-md transition-shadow"
								>
									<div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
										<Icon
											icon={principle.icon}
											className="w-6 h-6 text-gold"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-navy mb-1">
											{principle.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{principle.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
