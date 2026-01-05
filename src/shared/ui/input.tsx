'use client'

import { cn } from '@/shared/lib'
import { forwardRef, type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-11 w-full rounded-lg border bg-white px-4 py-2',
					'text-base text-navy placeholder:text-muted-foreground',
					'transition-colors duration-200',
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
Input.displayName = 'Input'

export { Input }
