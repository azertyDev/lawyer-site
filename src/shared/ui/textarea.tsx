'use client'

import { cn } from '@/shared/lib'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-[120px] w-full rounded-lg border bg-white px-4 py-3',
					'text-base text-navy placeholder:text-muted-foreground',
					'transition-colors duration-200 resize-y',
					'focus-visible:outline-none focus-visible:ring-2',
					'focus-visible:ring-gold focus-visible:ring-offset-1',
					'disabled:cursor-not-allowed disabled:opacity-50',
					error
						? 'border-destructive focus-visible:ring-destructive'
						: 'border-input hover:border-navy-200',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Textarea.displayName = 'Textarea'

export { Textarea }
