import { cn } from '@/shared/lib'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import type { HTMLAttributes } from 'react'

export interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
	items: BreadcrumbItem[]
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
	return (
		<nav
			aria-label="Навигация по сайту"
			className={cn('py-4', className)}
			{...props}
		>
			<div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
				<ol className="flex items-center gap-2 text-sm whitespace-nowrap min-w-max">
					{items.map((item, index) => {
						const isLast = index === items.length - 1

						return (
							<li key={item.label} className="flex items-center gap-2">
								{index > 0 && (
									<Icon
										icon="lucide:chevron-right"
										className="h-4 w-4 text-muted-foreground shrink-0"
										aria-hidden="true"
									/>
								)}
								{isLast || !item.href ? (
									<span
										className={cn(
											'py-1 transition-colors',
											isLast
												? 'text-navy font-medium'
												: 'text-muted-foreground'
										)}
										aria-current={isLast ? 'page' : undefined}
									>
										{item.label}
									</span>
								) : (
									<Link
										href={item.href}
										className={cn(
											'py-1 text-muted-foreground hover:text-navy transition-colors',
											'rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-1'
										)}
									>
										{item.label}
									</Link>
								)}
							</li>
						)
					})}
				</ol>
			</div>
		</nav>
	)
}
