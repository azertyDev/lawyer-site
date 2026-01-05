import { cn } from '@/shared/lib'
import type { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
	variant?: 'default' | 'muted' | 'navy'
}

export function Section({
	className,
	variant = 'default',
	...props
}: SectionProps) {
	return (
		<section
			className={cn(
				'py-16 md:py-24',
				variant === 'muted' && 'bg-muted',
				variant === 'navy' && 'bg-navy text-white',
				className
			)}
			{...props}
		/>
	)
}

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
	title: string
	subtitle?: string
	centered?: boolean
}

export function SectionHeader({
	title,
	subtitle,
	centered = true,
	className,
	...props
}: SectionHeaderProps) {
	return (
		<div
			className={cn(
				'mb-12 md:mb-16',
				centered && 'text-center',
				className
			)}
			{...props}
		>
			<h2 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
				{title}
			</h2>
			{subtitle && (
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
					{subtitle}
				</p>
			)}
		</div>
	)
}
