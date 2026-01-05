import { Button, Container, Section } from '@/shared/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function NotFound() {
	return (
		<Section className="pt-24 md:pt-32 min-h-[70vh] flex items-center">
			<Container className="text-center">
				<div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-8">
					<Icon icon="lucide:file-question" className="w-10 h-10 text-muted-foreground" />
				</div>

				<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
					Страница не найдена
				</h1>

				<p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
					Запрашиваемая страница не существует или была перемещена
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/">
						<Button variant="primary" size="lg">
							<Icon icon="lucide:home" className="w-5 h-5" />
							На главную
						</Button>
					</Link>
					<Link href="/contacts">
						<Button variant="secondary" size="lg">
							<Icon icon="lucide:phone" className="w-5 h-5" />
							Связаться
						</Button>
					</Link>
				</div>
			</Container>
		</Section>
	)
}
