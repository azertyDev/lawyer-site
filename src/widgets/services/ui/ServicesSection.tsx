'use client'

import { getServicesByAudience, type Service } from '@/entities/service'
import { cn } from '@/shared/lib'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Container,
	ScrollReveal,
	Section,
	SectionHeader,
} from '@/shared/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useState } from 'react'

type Audience = 'business' | 'individual'

const tabs: { value: Audience; label: string; icon: string }[] = [
	{ value: 'business', label: 'Для бизнеса', icon: 'lucide:briefcase' },
	{ value: 'individual', label: 'Для граждан', icon: 'lucide:user' },
]

interface ServiceCardProps {
	service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
	return (
		<Card className="group hover:shadow-lg transition-all duration-300 h-full">
			<CardHeader>
				<div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
					<Icon
						icon={service.icon}
						className="w-6 h-6 text-navy group-hover:text-gold transition-colors"
					/>
				</div>
				<CardTitle className="text-xl">{service.title}</CardTitle>
				<CardDescription className="line-clamp-2">
					{service.shortDescription}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Link href={`/services/${service.slug}`}>
					<Button variant="ghost" className="p-0 h-auto text-gold">
						Подробнее
						<Icon icon="lucide:arrow-right" className="w-4 h-4 ml-1" />
					</Button>
				</Link>
			</CardContent>
		</Card>
	)
}

export function ServicesSection() {
	const [activeTab, setActiveTab] = useState<Audience>('business')
	const services = getServicesByAudience(activeTab)

	return (
		<Section id="services">
			<Container>
				<ScrollReveal>
					<SectionHeader
						title="Услуги"
						subtitle="Комплексная юридическая помощь для бизнеса и частных лиц"
					/>
				</ScrollReveal>

				<ScrollReveal delay={0.1}>
					<div className="flex justify-center mb-10">
						<div className="inline-flex p-1 bg-muted rounded-lg">
							{tabs.map((tab) => (
								<button
									key={tab.value}
									type="button"
									onClick={() => setActiveTab(tab.value)}
									className={cn(
										'flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all',
										activeTab === tab.value
											? 'bg-white text-navy shadow-sm'
											: 'text-muted-foreground hover:text-navy'
									)}
								>
									<Icon icon={tab.icon} className="w-4 h-4" />
									{tab.label}
								</button>
							))}
						</div>
					</div>
				</ScrollReveal>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service, index) => (
						<ScrollReveal
							key={service.slug}
							delay={0.1 + index * 0.1}
							variant="scale"
						>
							<ServiceCard service={service} />
						</ScrollReveal>
					))}
				</div>

				<ScrollReveal delay={0.4}>
					<div className="mt-10 text-center">
						<Link href="/services">
							<Button variant="secondary">
								Все услуги
								<Icon icon="lucide:arrow-right" className="w-4 h-4 ml-2" />
							</Button>
						</Link>
					</div>
				</ScrollReveal>
			</Container>
		</Section>
	)
}
