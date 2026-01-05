'use client'

import { getAllFAQItems, type FAQItem } from '@/entities/faq'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Container,
	ScrollReveal,
	Section,
	SectionHeader,
} from '@/shared/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'

interface FAQSectionProps {
	items?: FAQItem[]
	showAll?: boolean
	limit?: number
	title?: string
	subtitle?: string
}

export function FAQSection({
	items,
	showAll = false,
	limit = 6,
	title = 'Частые вопросы',
	subtitle = 'Ответы на вопросы, которые задают чаще всего',
}: FAQSectionProps) {
	const faqItems = items || getAllFAQItems()
	const displayItems = showAll ? faqItems : faqItems.slice(0, limit)

	return (
		<Section>
			<Container size="md">
				<ScrollReveal>
					<SectionHeader title={title} subtitle={subtitle} />
				</ScrollReveal>

				<ScrollReveal delay={0.1}>
					<Accordion type="single" collapsible className="w-full">
						{displayItems.map((item) => (
							<AccordionItem key={item.id} value={item.id}>
								<AccordionTrigger className="text-left">
									{item.question}
								</AccordionTrigger>
								<AccordionContent>{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</ScrollReveal>

				{!showAll && faqItems.length > limit && (
					<ScrollReveal delay={0.2}>
						<div className="mt-10 text-center">
							<Link href="/faq">
								<Button variant="secondary">
									Все вопросы
									<Icon icon="lucide:arrow-right" className="w-4 h-4 ml-2" />
								</Button>
							</Link>
						</div>
					</ScrollReveal>
				)}
			</Container>
		</Section>
	)
}
