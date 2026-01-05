import { LeadFormModal } from '@/features/lead-form'
import { Button, Container, Section, SectionHeader } from '@/shared/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const pricingModels = [
	{
		title: 'Фиксированная стоимость',
		description:
			'Вы знаете точную сумму до начала работы. Подходит для типовых задач с предсказуемым объемом.',
		icon: 'lucide:receipt',
	},
	{
		title: 'Почасовая оплата',
		description:
			'Оплата за фактически затраченное время. Подходит для консультаций и сложных проектов.',
		icon: 'lucide:clock',
	},
	{
		title: 'Оплата по результату',
		description:
			'Часть вознаграждения привязана к достигнутому результату. Для дел о взыскании.',
		icon: 'lucide:target',
	},
]

export function PricingSection() {
	return (
		<Section variant="muted">
			<Container size="lg">
				<SectionHeader
					title="Стоимость"
					subtitle="Прозрачные условия работы и несколько моделей оплаты"
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
					{pricingModels.map((model) => (
						<div
							key={model.title}
							className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
								<Icon icon={model.icon} className="w-6 h-6 text-gold" />
							</div>
							<h3 className="font-serif text-lg font-semibold text-navy mb-2">
								{model.title}
							</h3>
							<p className="text-sm text-muted-foreground">
								{model.description}
							</p>
						</div>
					))}
				</div>

				<div className="bg-navy rounded-2xl p-8 md:p-12 text-white text-center">
					<h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
						Первичная консультация — бесплатно
					</h3>
					<p className="text-white/70 max-w-2xl mx-auto mb-8">
						Обсудим вашу ситуацию, оценим перспективы дела и определим
						оптимальную модель работы. Без обязательств с вашей стороны.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<LeadFormModal
							trigger={
								<Button variant="gold" size="lg">
									<Icon icon="lucide:file-search" className="w-5 h-5" />
									Оценить перспективу
								</Button>
							}
						/>
						<Link href="/fees">
							<Button
								variant="secondary"
								size="lg"
								className="border-white/30 text-white hover:bg-white hover:text-navy"
							>
								Подробнее о ценах
							</Button>
						</Link>
					</div>
				</div>
			</Container>
		</Section>
	)
}
