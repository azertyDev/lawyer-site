import { getAllServices, serviceCategories } from '@/entities/service'
import { LeadFormModal } from '@/features/lead-form'
import { generateBreadcrumbSchema } from '@/shared/lib'
import {
	Breadcrumb,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Container,
	Section,
	SectionHeader,
} from '@/shared/ui'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Услуги',
	description:
		'Юридические услуги для бизнеса и граждан: взыскание задолженности, договорные споры, представительство в суде.',
}

export default function ServicesPage() {
	const services = getAllServices()
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'Услуги', url: '/services' },
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
							{ label: 'Услуги' },
						]}
					/>

					<div className="mt-8">
						<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
							Юридические услуги
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Комплексная юридическая помощь для бизнеса и частных лиц по
							экономическим и гражданским спорам
						</p>
					</div>

					{serviceCategories.map((category) => (
						<div key={category.slug} className="mt-16">
							<h2 className="font-serif text-2xl text-navy mb-2">
								{category.title}
							</h2>
							<p className="text-muted-foreground mb-8">
								{category.description}
							</p>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{category.services.map((serviceSlug) => {
									const service = services.find((s) => s.slug === serviceSlug)
									if (!service) return null

									return (
										<Card
											key={service.slug}
											className="group hover:shadow-lg transition-all duration-300 h-full"
										>
											<CardHeader>
												<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
													<Icon
														icon={service.icon}
														className="w-6 h-6 text-navy group-hover:text-gold transition-colors"
													/>
												</div>
												<CardTitle className="text-xl">
													{service.title}
												</CardTitle>
												<CardDescription className="line-clamp-3">
													{service.shortDescription}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<Link href={`/services/${service.slug}`}>
													<Button
														variant="ghost"
														className="p-0 h-auto text-gold"
													>
														Подробнее
														<Icon
															icon="lucide:arrow-right"
															className="w-4 h-4 ml-1"
														/>
													</Button>
												</Link>
											</CardContent>
										</Card>
									)
								})}
							</div>
						</div>
					))}

					<div className="mt-16 bg-navy rounded-2xl p-8 md:p-12 text-white text-center">
						<h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
							Не нашли нужную услугу?
						</h2>
						<p className="text-white/70 max-w-2xl mx-auto mb-8">
							Свяжитесь со мной для обсуждения вашей ситуации. Многие вопросы
							решаются комплексно.
						</p>
						<LeadFormModal
							trigger={
								<Button variant="gold" size="lg">
									<Icon icon="lucide:file-search" className="w-5 h-5" />
									Оценить перспективу
								</Button>
							}
						/>
					</div>
				</Container>
			</Section>
		</>
	)
}
