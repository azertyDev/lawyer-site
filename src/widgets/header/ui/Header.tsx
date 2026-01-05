'use client'

import { siteConfig } from '@/shared/config'
import { analytics, cn, EventNames } from '@/shared/lib'
import { Button, Container } from '@/shared/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navigation = [
	{ name: 'Услуги', href: '/services' },
	{ name: 'Практика', href: '/practice' },
	{ name: 'О юристе', href: '/about' },
	{ name: 'Стоимость', href: '/fees' },
	{ name: 'FAQ', href: '/faq' },
	{ name: 'Контакты', href: '/contacts' },
]

export function Header() {
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		setIsMobileMenuOpen(false)
	}, [pathname])

	const handlePhoneClick = () => {
		analytics.track({
			name: EventNames.CLICK_PHONE,
			params: { location: 'header' },
		})
	}

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				isScrolled
					? 'bg-white/95 backdrop-blur-md shadow-sm'
					: 'bg-transparent'
			)}
		>
			<Container>
				<div className="flex items-center justify-between h-16 md:h-20">
					<Link
						href="/"
						className="font-serif text-xl md:text-2xl font-semibold text-navy"
					>
						{siteConfig.name}
					</Link>

					<nav className="hidden lg:flex items-center gap-8">
						{navigation.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'text-sm font-medium transition-colors',
									pathname === item.href || pathname.startsWith(`${item.href}/`)
										? 'text-gold'
										: 'text-navy hover:text-gold'
								)}
							>
								{item.name}
							</Link>
						))}
					</nav>

					<div className="hidden md:flex items-center gap-4">
						<a
							href={`tel:${siteConfig.contact.phoneClean}`}
							onClick={handlePhoneClick}
							className="text-sm font-medium text-navy hover:text-gold transition-colors"
							aria-label={`Позвонить: ${siteConfig.contact.phone}`}
						>
							{siteConfig.contact.phone}
						</a>
					</div>

					<button
						type="button"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="lg:hidden p-2 text-navy"
						aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
						aria-expanded={isMobileMenuOpen}
					>
						<Icon
							icon={isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'}
							className="w-6 h-6"
						/>
					</button>
				</div>
			</Container>

			{isMobileMenuOpen && (
				<div className="lg:hidden bg-white border-t">
					<Container>
						<nav className="py-4 space-y-2">
							{navigation.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										'block py-2 text-base font-medium transition-colors',
										pathname === item.href ||
											pathname.startsWith(`${item.href}/`)
											? 'text-gold'
											: 'text-navy hover:text-gold'
									)}
								>
									{item.name}
								</Link>
							))}
							<div className="pt-4 border-t">
								<a
									href={`tel:${siteConfig.contact.phoneClean}`}
									onClick={handlePhoneClick}
									className="flex items-center gap-2 py-2 text-navy"
								>
									<Icon icon="lucide:phone" className="w-5 h-5" />
									{siteConfig.contact.phone}
								</a>
							</div>
						</nav>
					</Container>
				</div>
			)}
		</header>
	)
}
