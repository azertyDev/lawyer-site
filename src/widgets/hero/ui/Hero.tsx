'use client'

import { ConsultationFormModal } from '@/features/consultation-form'
import { LeadFormModal } from '@/features/lead-form'
import { analytics, EventNames } from '@/shared/lib'
import { Button, Container } from '@/shared/ui'
import { Icon } from '@iconify/react'

export function Hero() {
	const handlePrimaryCTA = () => {
		analytics.track({
			name: EventNames.CLICK_PRIMARY_CTA,
			params: { location: 'hero' },
		})
	}

	const handleSecondaryCTA = () => {
		analytics.track({
			name: EventNames.CLICK_SECONDARY_CTA,
			params: { location: 'hero' },
		})
	}

	return (
		<section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-navy-50 via-white to-gold/5" />

			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 15H25L30 5zM30 55L25 45H35L30 55zM5 30L15 25V35L5 30zM55 30L45 35V25L55 30z' fill='%230B1121' fill-opacity='1'/%3E%3C/svg%3E")`,
				}}
			/>

			<Container className="relative z-10">
				<div className="max-w-4xl">
					<div className="animate-fade-in-up">
						<span className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 rounded-full text-sm text-navy mb-6">
							<Icon icon="lucide:scale" className="w-4 h-4 text-gold" />
							Экономические и гражданские споры
						</span>
					</div>

					<h1
						className="font-serif text-display-md md:text-display-lg lg:text-display-xl text-navy mb-6 animate-fade-in-up"
						style={{ animationDelay: '0.1s' }}
					>
						Представительство
						<br />
						<span className="text-gold">в судах</span>
					</h1>

					<p
						className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in-up"
						style={{ animationDelay: '0.2s' }}
					>
						Защита интересов бизнеса и граждан в арбитражных судах и судах
						общей юрисдикции. Взыскание задолженности, договорные споры,
						корпоративные конфликты.
					</p>

					<div
						className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
						style={{ animationDelay: '0.3s' }}
					>
						<LeadFormModal
							trigger={
								<Button variant="gold" size="lg" onClick={handlePrimaryCTA}>
									<Icon icon="lucide:file-search" className="w-5 h-5" />
									Оценить перспективу
								</Button>
							}
						/>
						<ConsultationFormModal
							trigger={
								<Button variant="secondary" size="lg" onClick={handleSecondaryCTA}>
									<Icon icon="lucide:calendar" className="w-5 h-5" />
									Записаться на консультацию
								</Button>
							}
						/>
					</div>

					<div
						className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up"
						style={{ animationDelay: '0.4s' }}
					>
						{[
							{ value: '10+', label: 'лет практики' },
							{ value: '500+', label: 'выигранных дел' },
							{ value: '95%', label: 'успешных взысканий' },
							{ value: '24ч', label: 'срок ответа' },
						].map((stat) => (
							<div key={stat.label} className="text-center md:text-left">
								<div className="font-serif text-3xl md:text-4xl text-navy font-semibold">
									{stat.value}
								</div>
								<div className="text-sm text-muted-foreground mt-1">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<Icon icon="lucide:chevron-down" className="w-6 h-6 text-navy/30" />
			</div>
		</section>
	)
}
