import { getAllFAQItems } from '@/entities/faq'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/shared/lib'
import { Breadcrumb, Container, Section } from '@/shared/ui'
import { FAQSection } from '@/widgets'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Частые вопросы',
	description:
		'Ответы на частые вопросы о юридических услугах: консультации, стоимость, сроки, процесс работы.',
}

export default function FAQPage() {
	const faqItems = getAllFAQItems()
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'FAQ', url: '/faq' },
	])
	const faqSchema = generateFAQSchema(
		faqItems.map((item) => ({
			question: item.question,
			answer: item.answer,
		}))
	)

	return (
		<>
			<Script
				id="breadcrumb-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			<Script
				id="faq-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqSchema),
				}}
			/>

			<Section className="pt-24 md:pt-32">
				<Container>
					<Breadcrumb
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'FAQ' },
						]}
					/>

					<div className="mt-8 mb-12">
						<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
							Частые вопросы
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Ответы на вопросы, которые чаще всего задают клиенты
						</p>
					</div>
				</Container>
			</Section>

			<FAQSection
				items={faqItems}
				showAll
				title=""
				subtitle=""
			/>
		</>
	)
}
