import { getAllFAQItems } from '@/entities/faq'
import { generateFAQSchema } from '@/shared/lib'
import {
	CasesSection,
	ContactsSection,
	FAQSection,
	Hero,
	HowWeWorkSection,
	PricingSection,
	ServicesSection,
} from '@/widgets'
import Script from 'next/script'

export default function HomePage() {
	const faqItems = getAllFAQItems().slice(0, 6)
	const faqSchema = generateFAQSchema(
		faqItems.map((item) => ({
			question: item.question,
			answer: item.answer,
		}))
	)

	return (
		<>
			<Script
				id="faq-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqSchema),
				}}
			/>

			<Hero />
			<ServicesSection />
			<HowWeWorkSection />
			<CasesSection />
			<PricingSection />
			<FAQSection items={faqItems} />
			<ContactsSection />
		</>
	)
}
