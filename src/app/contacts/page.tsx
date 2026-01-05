import { generateBreadcrumbSchema } from '@/shared/lib'
import { Breadcrumb, Container, Section } from '@/shared/ui'
import { ContactsSection } from '@/widgets'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Контакты',
	description:
		'Контакты юриста: телефон, email, адрес, мессенджеры. Запишитесь на консультацию.',
}

export default function ContactsPage() {
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'Контакты', url: '/contacts' },
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
							{ label: 'Контакты' },
						]}
					/>

					<div className="mt-8 mb-12">
						<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
							Контакты
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Свяжитесь со мной удобным способом для обсуждения вашей ситуации
						</p>
					</div>
				</Container>
			</Section>

			<ContactsSection />
		</>
	)
}
