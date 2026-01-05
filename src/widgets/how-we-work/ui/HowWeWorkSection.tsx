'use client'

import { cn } from '@/shared/lib'
import { Container, ScrollReveal, Section, SectionHeader } from '@/shared/ui'
import { Icon } from '@iconify/react'

const steps = [
	{
		number: '01',
		title: 'Консультация',
		description:
			'Обсуждаем ситуацию, анализируем документы, оцениваем перспективы дела',
		icon: 'lucide:message-square',
	},
	{
		number: '02',
		title: 'Стратегия',
		description:
			'Разрабатываем правовую позицию и план действий с учётом ваших целей',
		icon: 'lucide:target',
	},
	{
		number: '03',
		title: 'Досудебная работа',
		description:
			'Претензионная работа, переговоры, сбор доказательств и подготовка к суду',
		icon: 'lucide:file-text',
	},
	{
		number: '04',
		title: 'Судебный процесс',
		description:
			'Представляем ваши интересы в судах всех инстанций, готовим документы',
		icon: 'lucide:landmark',
	},
	{
		number: '05',
		title: 'Исполнение',
		description:
			'Сопровождаем исполнительное производство до достижения результата',
		icon: 'lucide:check-circle',
	},
]

export function HowWeWorkSection() {
	return (
		<Section variant="muted">
			<Container>
				<ScrollReveal>
					<SectionHeader
						title="Как работаем"
						subtitle="Прозрачный процесс от первого звонка до результата"
					/>
				</ScrollReveal>

				<div className="relative">
					<div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
						{steps.map((step, index) => (
							<ScrollReveal key={step.number} delay={0.1 + index * 0.1}>
								<div
									className={cn(
										'relative bg-white rounded-xl p-6 shadow-sm h-full',
										'hover:shadow-md transition-shadow'
									)}
								>
									<div className="absolute -top-3 left-6 bg-gold text-navy text-xs font-bold px-2 py-1 rounded">
										{step.number}
									</div>

									<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center mb-4">
										<Icon icon={step.icon} className="w-6 h-6 text-navy" />
									</div>

									<h3 className="font-serif text-lg font-semibold text-navy mb-2">
										{step.title}
									</h3>
									<p className="text-sm text-muted-foreground">
										{step.description}
									</p>
								</div>
							</ScrollReveal>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
