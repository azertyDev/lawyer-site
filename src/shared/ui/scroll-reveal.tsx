'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../lib'

type AnimationVariant = 'up' | 'left' | 'right' | 'scale'

interface ScrollRevealProps {
	children: ReactNode
	variant?: AnimationVariant
	delay?: number
	threshold?: number
	className?: string
	once?: boolean
}

export function ScrollReveal({
	children,
	variant = 'up',
	delay = 0,
	threshold = 0.1,
	className,
	once = true,
}: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					if (once) {
						observer.unobserve(element)
					}
				} else if (!once) {
					setIsVisible(false)
				}
			},
			{ threshold, rootMargin: '0px 0px -50px 0px' }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [threshold, once])

	const variantClass = {
		up: 'scroll-reveal',
		left: 'scroll-reveal scroll-reveal-left',
		right: 'scroll-reveal scroll-reveal-right',
		scale: 'scroll-reveal scroll-reveal-scale',
	}[variant]

	return (
		<div
			ref={ref}
			className={cn(variantClass, isVisible && 'is-visible', className)}
			style={{ animationDelay: delay ? `${delay}s` : undefined }}
		>
			{children}
		</div>
	)
}

interface ScrollRevealGroupProps {
	children: ReactNode
	staggerDelay?: number
	variant?: AnimationVariant
	className?: string
}

export function ScrollRevealGroup({
	children,
	staggerDelay = 0.1,
	variant = 'up',
	className,
}: ScrollRevealGroupProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.unobserve(element)
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	const variantClass = {
		up: 'scroll-reveal',
		left: 'scroll-reveal scroll-reveal-left',
		right: 'scroll-reveal scroll-reveal-right',
		scale: 'scroll-reveal scroll-reveal-scale',
	}[variant]

	return (
		<div ref={ref} className={className}>
			{Array.isArray(children)
				? children.map((child, index) => (
						<div
							key={index}
							className={cn(variantClass, isVisible && 'is-visible')}
							style={{ animationDelay: `${index * staggerDelay}s` }}
						>
							{child}
						</div>
					))
				: children}
		</div>
	)
}
