import { getAllCases } from '@/entities/case'
import { Button, Card, CardContent, Container, Section, SectionHeader } from '@/shared/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export function CasesSection() {
	const cases = getAllCases().slice(0, 3)

	return (
		<Section>
			<Container>
				<SectionHeader
					title="Практика"
					subtitle="Примеры успешно завершённых дел"
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{cases.map((caseItem) => (
						<Card key={caseItem.id} className="h-full">
							<CardContent className="pt-6">
								<div className="flex items-center gap-2 text-gold text-sm font-medium mb-3">
									<Icon icon="lucide:folder-open" className="w-4 h-4" />
									{caseItem.category === 'debt-collection' &&
										'Взыскание задолженности'}
									{caseItem.category === 'contract-disputes' &&
										'Договорные споры'}
									{caseItem.category === 'civil-disputes' && 'Гражданские споры'}
								</div>

								<h3 className="font-serif text-lg font-semibold text-navy mb-3 line-clamp-2">
									{caseItem.title}
								</h3>

								<p className="text-sm text-muted-foreground mb-4 line-clamp-3">
									{caseItem.task}
								</p>

								<div className="flex items-center justify-between pt-4 border-t">
									<div className="text-sm">
										<span className="text-muted-foreground">Срок: </span>
										<span className="font-medium text-navy">
											{caseItem.duration}
										</span>
									</div>
									{caseItem.amount && (
										<div className="text-sm">
											<span className="font-medium text-gold">
												{caseItem.amount}
											</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-10 text-center">
					<Link href="/practice">
						<Button variant="secondary">
							Все кейсы
							<Icon icon="lucide:arrow-right" className="w-4 h-4 ml-2" />
						</Button>
					</Link>
				</div>

				<p className="mt-6 text-xs text-center text-muted-foreground max-w-2xl mx-auto">
					Результаты зависят от обстоятельств конкретного дела. Информация
					обезличена в соответствии с требованиями конфиденциальности.
				</p>
			</Container>
		</Section>
	)
}
