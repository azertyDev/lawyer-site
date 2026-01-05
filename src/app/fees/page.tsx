import { LeadFormModal } from '@/features/lead-form'
import { generateBreadcrumbSchema } from '@/shared/lib'
import {
	Breadcrumb,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
	Section,
} from '@/shared/ui'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Стоимость услуг',
	description:
		'Стоимость юридических услуг: модели оплаты, что входит в стоимость, дополнительные расходы.',
}

const pricingModels = [
	{
		title: 'Фиксированная стоимость',
		description: 'Вы знаете точную сумму до начала работы',
		icon: 'lucide:receipt',
		details: [
			'Подходит для типовых задач с предсказуемым объемом',
			'Стоимость фиксируется в договоре',
			'Оплата по этапам или полностью авансом',
			'Дополнительные работы — по согласованию',
		],
		examples: ['Подготовка иска', 'Составление договора', 'Правовой анализ'],
	},
	{
		title: 'Почасовая оплата',
		description: 'Оплата за фактически затраченное время',
		icon: 'lucide:clock',
		details: [
			'Подходит для консультаций и сложных проектов',
			'Ставка фиксируется в договоре',
			'Детальный учёт времени с отчётом',
			'Гибкость при изменении объёма работ',
		],
		examples: ['Консультации', 'Due diligence', 'Сопровождение переговоров'],
	},
	{
		title: 'Гонорар успеха',
		description: 'Часть вознаграждения зависит от результата',
		icon: 'lucide:target',
		details: [
			'Подходит для дел о взыскании',
			'Базовая часть + процент от взысканного',
			'Мотивация на достижение результата',
			'Риски разделяются между сторонами',
		],
		examples: [
			'Взыскание задолженности',
			'Компенсация убытков',
			'Взыскание неустойки',
		],
	},
]

const additionalCosts = [
	{
		title: 'Государственная пошлина',
		description:
			'Обязательный судебный сбор. Рассчитывается от суммы иска или фиксированная (для неимущественных требований). Взыскивается с проигравшей стороны.',
	},
	{
		title: 'Нотариальные расходы',
		description:
			'Заверение доверенности, копий документов. Зависит от тарифов нотариуса.',
	},
	{
		title: 'Экспертиза',
		description:
			'При необходимости судебной или досудебной экспертизы. Стоимость зависит от вида и сложности.',
	},
	{
		title: 'Командировочные',
		description:
			'При ведении дел в других городах — проезд и проживание. По согласованию.',
	},
]

export default function FeesPage() {
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'Стоимость', url: '/fees' },
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
							{ label: 'Стоимость' },
						]}
					/>

					<div className="mt-8">
						<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
							Стоимость услуг
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Прозрачные условия работы. Стоимость определяется после анализа
							вашей ситуации и зависит от сложности дела.
						</p>
					</div>

					<div className="mt-12">
						<h2 className="font-serif text-2xl text-navy mb-8">
							Модели оплаты
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{pricingModels.map((model) => (
								<Card key={model.title} className="h-full">
									<CardHeader>
										<div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
											<Icon icon={model.icon} className="w-6 h-6 text-gold" />
										</div>
										<CardTitle className="text-xl">{model.title}</CardTitle>
										<p className="text-sm text-muted-foreground">
											{model.description}
										</p>
									</CardHeader>
									<CardContent>
										<ul className="space-y-2 mb-6">
											{model.details.map((detail) => (
												<li
													key={detail}
													className="flex items-start gap-2 text-sm"
												>
													<Icon
														icon="lucide:check"
														className="w-4 h-4 text-gold mt-0.5 shrink-0"
													/>
													{detail}
												</li>
											))}
										</ul>
										<div className="pt-4 border-t">
											<p className="text-xs text-muted-foreground mb-2">
												Примеры применения:
											</p>
											<div className="flex flex-wrap gap-1">
												{model.examples.map((example) => (
													<span
														key={example}
														className="px-2 py-1 bg-muted text-xs rounded"
													>
														{example}
													</span>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>

					<div className="mt-16">
						<h2 className="font-serif text-2xl text-navy mb-8">
							Дополнительные расходы
						</h2>

						<div className="bg-muted rounded-2xl p-6 md:p-8">
							<p className="text-muted-foreground mb-6">
								Помимо гонорара юриста, могут возникнуть дополнительные расходы,
								связанные с ведением дела. Большинство из них взыскивается с
								проигравшей стороны.
							</p>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{additionalCosts.map((cost) => (
									<div key={cost.title} className="bg-white rounded-xl p-5">
										<h3 className="font-semibold text-navy mb-2">
											{cost.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{cost.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="mt-16 bg-navy rounded-2xl p-8 md:p-12 text-white text-center">
						<h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
							Первичная консультация — бесплатно
						</h2>
						<p className="text-white/70 max-w-2xl mx-auto mb-8">
							Обсудим вашу ситуацию, оценим перспективы и определим оптимальную
							модель работы. После консультации вы получите понимание стоимости
							и сроков.
						</p>
						<LeadFormModal
							trigger={
								<Button variant="gold" size="lg">
									<Icon icon="lucide:file-search" className="w-5 h-5" />
									Получить оценку стоимости
								</Button>
							}
						/>
					</div>
				</Container>
			</Section>
		</>
	)
}
