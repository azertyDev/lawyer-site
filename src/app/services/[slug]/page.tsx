import { getAllServices, getServiceBySlug } from '@/entities/service'
import { LeadFormModal } from '@/features/lead-form'
import { siteConfig } from '@/shared/config'
import {
	generateBreadcrumbSchema,
	generateFAQSchema,
	generateServiceSchema,
} from '@/shared/lib'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Breadcrumb,
	Button,
	Container,
	Section,
} from '@/shared/ui'
import { ContactsSection } from '@/widgets'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'

interface PageProps {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	const services = getAllServices()
	return services.map((service) => ({
		slug: service.slug,
	}))
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params
	const service = getServiceBySlug(slug)

	if (!service) {
		return {
			title: 'Услуга не найдена',
		}
	}

	return {
		title: service.seo.title,
		description: service.seo.description,
		keywords: service.seo.keywords,
		openGraph: {
			title: service.seo.title,
			description: service.seo.description,
			type: 'website',
		},
	}
}

export default async function ServicePage({ params }: PageProps) {
	const { slug } = await params
	const service = getServiceBySlug(slug)

	if (!service) {
		notFound()
	}

	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Главная', url: '/' },
		{ name: 'Услуги', url: '/services' },
		{ name: service.title, url: `/services/${service.slug}` },
	])

	const serviceSchema = generateServiceSchema({
		name: service.title,
		description: service.fullDescription,
		url: `/services/${service.slug}`,
	})

	const faqSchema =
		service.faq.length > 0 ? generateFAQSchema(service.faq) : null

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
				id="service-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(serviceSchema),
				}}
			/>
			{faqSchema && (
				<Script
					id="faq-schema"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(faqSchema),
					}}
				/>
			)}

			<Section className="pt-24 md:pt-32">
				<Container>
					<Breadcrumb
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'Услуги', href: '/services' },
							{ label: service.title },
						]}
					/>

					<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
						<div className="lg:col-span-2">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
									<Icon icon={service.icon} className="w-7 h-7 text-gold" />
								</div>
								<span className="px-3 py-1 bg-navy/5 rounded-full text-sm text-navy">
									{service.audience === 'business'
										? 'Для бизнеса'
										: service.audience === 'individual'
											? 'Для граждан'
											: 'Для бизнеса и граждан'}
								</span>
							</div>

							<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-6">
								{service.title}
							</h1>

							<p className="text-lg text-muted-foreground mb-12">
								{service.fullDescription}
							</p>

							<div className="space-y-12">
								<div>
									<h2 className="font-serif text-2xl text-navy mb-4 flex items-center gap-3">
										<Icon
											icon="lucide:check-circle"
											className="w-6 h-6 text-gold"
										/>
										Когда применимо
									</h2>
									<ul className="space-y-3">
										{service.applicability.map((item) => (
											<li key={item} className="flex items-start gap-3">
												<Icon
													icon="lucide:check"
													className="w-5 h-5 text-gold mt-0.5 shrink-0"
												/>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>

								<div>
									<h2 className="font-serif text-2xl text-navy mb-4 flex items-center gap-3">
										<Icon
											icon="lucide:briefcase"
											className="w-6 h-6 text-gold"
										/>
										Что делаем
									</h2>
									<ul className="space-y-3">
										{service.whatWeDo.map((item) => (
											<li key={item} className="flex items-start gap-3">
												<Icon
													icon="lucide:arrow-right"
													className="w-5 h-5 text-gold mt-0.5 shrink-0"
												/>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>

								<div>
									<h2 className="font-serif text-2xl text-navy mb-4 flex items-center gap-3">
										<Icon
											icon="lucide:file-text"
											className="w-6 h-6 text-gold"
										/>
										Необходимые документы
									</h2>
									<ul className="space-y-3">
										{service.documents.map((item) => (
											<li key={item} className="flex items-start gap-3">
												<Icon
													icon="lucide:file"
													className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0"
												/>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="bg-muted rounded-xl p-6">
										<h3 className="font-serif text-lg text-navy mb-3 flex items-center gap-2">
											<Icon icon="lucide:clock" className="w-5 h-5 text-gold" />
											Сроки
										</h3>
										<p className="text-2xl font-semibold text-navy mb-2">
											{service.timeline.min} — {service.timeline.max}
										</p>
										<p className="text-sm text-muted-foreground mb-4">
											Что влияет на сроки:
										</p>
										<ul className="space-y-1 text-sm text-muted-foreground">
											{service.timeline.factors.map((factor) => (
												<li key={factor}>• {factor}</li>
											))}
										</ul>
									</div>

									<div className="bg-muted rounded-xl p-6">
										<h3 className="font-serif text-lg text-navy mb-3 flex items-center gap-2">
											<Icon
												icon="lucide:credit-card"
												className="w-5 h-5 text-gold"
											/>
											Стоимость
										</h3>
										<p className="font-semibold text-navy mb-2">
											{service.pricing.model}
										</p>
										<p className="text-sm text-muted-foreground mb-4">
											{service.pricing.description}
										</p>
										<p className="text-sm text-muted-foreground mb-2">
											Что влияет на стоимость:
										</p>
										<ul className="space-y-1 text-sm text-muted-foreground">
											{service.pricing.factors.map((factor) => (
												<li key={factor}>• {factor}</li>
											))}
										</ul>
									</div>
								</div>

								{service.faq.length > 0 && (
									<div>
										<h2 className="font-serif text-2xl text-navy mb-6">
											Частые вопросы
										</h2>
										<Accordion type="single" collapsible className="w-full">
											{service.faq.map((item, index) => (
												<AccordionItem
													key={`${service.slug}-faq-${index}`}
													value={`faq-${index}`}
												>
													<AccordionTrigger className="text-left">
														{item.question}
													</AccordionTrigger>
													<AccordionContent>{item.answer}</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>
								)}
							</div>
						</div>

						<div className="lg:col-span-1">
							<div className="sticky top-24 bg-white rounded-2xl border p-6 shadow-sm">
								<h3 className="font-serif text-xl text-navy mb-4">
									Обсудить вашу ситуацию
								</h3>
								<p className="text-sm text-muted-foreground mb-6">
									Оставьте заявку, и я свяжусь с вами для бесплатной оценки
									перспектив дела
								</p>
								<LeadFormModal
									trigger={
										<Button variant="gold" size="lg" className="w-full mb-4">
											<Icon icon="lucide:file-search" className="w-5 h-5" />
											Оценить перспективу
										</Button>
									}
								/>
								<div className="text-center">
									<a
										href={`tel:${siteConfig.contact.phoneClean}`}
										className="text-sm text-navy hover:text-gold transition-colors"
									>
										или позвоните: {siteConfig.contact.phone}
									</a>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</Section>

			<ContactsSection />
		</>
	)
}
