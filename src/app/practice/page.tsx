import { getAllCases } from '@/entities/case'
import { generateBreadcrumbSchema } from '@/shared/lib'
import {
	Breadcrumb,
	Card,
	CardContent,
	Container,
	Section,
} from '@/shared/ui'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Практика',
	description:
		'Примеры успешно завершённых дел: взыскание задолженности, договорные споры, гражданские дела.',
}

export default function PracticePage() {
	const cases = getAllCases()
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'Практика', url: '/practice' },
	])

	const categoryLabels: Record<string, string> = {
		'debt-collection': 'Взыскание задолженности',
		'contract-disputes': 'Договорные споры',
		'civil-disputes': 'Гражданские споры',
	}

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
							{ label: 'Практика' },
						]}
					/>

					<div className="mt-8">
						<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
							Практика
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Примеры успешно завершённых дел. Каждое дело уникально, и
							результаты зависят от конкретных обстоятельств.
						</p>
					</div>

					<div className="mt-12 space-y-8">
						{cases.map((caseItem) => (
							<Card key={caseItem.id}>
								<CardContent className="p-6 md:p-8">
									<div className="flex flex-wrap items-center gap-4 mb-4">
										<span className="flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium">
											<Icon icon="lucide:folder-open" className="w-4 h-4" />
											{categoryLabels[caseItem.category]}
										</span>
										<span className="text-sm text-muted-foreground">
											Срок: {caseItem.duration}
										</span>
										{caseItem.amount && (
											<span className="text-sm font-medium text-navy">
												{caseItem.amount}
											</span>
										)}
									</div>

									<h2 className="font-serif text-xl md:text-2xl text-navy mb-6">
										{caseItem.title}
									</h2>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
										<div>
											<h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
												<Icon
													icon="lucide:target"
													className="w-4 h-4 text-gold"
												/>
												Задача
											</h3>
											<p className="text-sm text-muted-foreground">
												{caseItem.task}
											</p>
										</div>

										<div>
											<h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
												<Icon
													icon="lucide:list"
													className="w-4 h-4 text-gold"
												/>
												Действия
											</h3>
											<ul className="space-y-1 text-sm text-muted-foreground">
												{caseItem.actions.map((action, index) => (
													<li
														key={`${caseItem.id}-action-${index}`}
														className="flex items-start gap-2"
													>
														<span className="text-gold">•</span>
														{action}
													</li>
												))}
											</ul>
										</div>

										<div>
											<h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
												<Icon
													icon="lucide:check-circle"
													className="w-4 h-4 text-gold"
												/>
												Результат
											</h3>
											<p className="text-sm text-muted-foreground">
												{caseItem.result}
											</p>
										</div>
									</div>

									<p className="mt-6 text-xs text-muted-foreground border-t pt-4">
										{caseItem.disclaimer}
									</p>
								</CardContent>
							</Card>
						))}
					</div>

					<p className="mt-12 text-sm text-center text-muted-foreground max-w-2xl mx-auto">
						Приведённые примеры не гарантируют аналогичных результатов в других
						делах. Каждая ситуация индивидуальна и требует отдельного анализа.
					</p>
				</Container>
			</Section>
		</>
	)
}
