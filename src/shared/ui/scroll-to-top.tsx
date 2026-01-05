'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { cn } from '../lib'

interface ScrollToTopProps {
	threshold?: number
	className?: string
}

export function ScrollToTop({ threshold = 400, className }: ScrollToTopProps) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > threshold)
		}

		window.addEventListener('scroll', toggleVisibility, { passive: true })
		toggleVisibility()

		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [threshold])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<button
			type="button"
			onClick={scrollToTop}
			className={cn(
				'fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40',
				'w-12 h-12 rounded-full',
				'bg-navy text-white shadow-lg',
				'flex items-center justify-center',
				'transition-all duration-300 ease-out',
				'hover:bg-navy/90 hover:scale-110',
				'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
				isVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-4 pointer-events-none',
				className
			)}
			aria-label="Наверх"
		>
			<Icon icon="lucide:chevron-up" className="w-6 h-6" />
		</button>
	)
}
