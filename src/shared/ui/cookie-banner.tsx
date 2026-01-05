'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '../lib'
import { Button } from './button'

const COOKIE_CONSENT_KEY = 'cookie-consent'

export function CookieBanner() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
		if (!consent) {
			const timer = setTimeout(() => setIsVisible(true), 1500)
			return () => clearTimeout(timer)
		}
	}, [])

	const acceptCookies = () => {
		localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
		setIsVisible(false)
	}

	const declineCookies = () => {
		localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<div
			className={cn(
				'fixed bottom-0 left-0 right-0 z-50',
				'p-4 md:p-6',
				'animate-slide-up'
			)}
		>
			<div
				className={cn(
					'max-w-4xl mx-auto',
					'bg-white rounded-2xl shadow-2xl border',
					'p-4 md:p-6'
				)}
			>
				<div className="flex flex-col md:flex-row md:items-center gap-4">
					<div className="flex gap-3 flex-1">
						<div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
							<Icon icon="lucide:cookie" className="w-5 h-5 text-gold" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm text-muted-foreground">
								Мы используем cookies для улучшения работы сайта и анализа
								посещаемости. Продолжая использовать сайт, вы соглашаетесь с{' '}
								<Link
									href="/privacy"
									className="text-gold hover:underline underline-offset-2"
								>
									политикой конфиденциальности
								</Link>
								.
							</p>
						</div>
					</div>

					<div className="flex gap-2 shrink-0">
						<Button
							variant="ghost"
							size="sm"
							onClick={declineCookies}
							className="text-muted-foreground"
						>
							Отклонить
						</Button>
						<Button variant="gold" size="sm" onClick={acceptCookies}>
							Принять
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
