'use client'

import { cn } from '@/shared/lib'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
	[
		'inline-flex items-center justify-center gap-2',
		'whitespace-nowrap font-medium transition-all duration-200',
		'focus-visible:outline-none focus-visible:ring-2',
		'focus-visible:ring-gold focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50',
	].join(' '),
	{
		variants: {
			variant: {
				primary: [
					'bg-navy text-white',
					'hover:bg-navy-800 active:bg-navy-900',
					'shadow-lg hover:shadow-xl',
				].join(' '),
				secondary: [
					'bg-transparent text-navy border-2 border-navy',
					'hover:bg-navy hover:text-white',
				].join(' '),
				gold: [
					'bg-gold text-navy-900 font-semibold',
					'hover:brightness-110 active:brightness-95',
					'shadow-lg hover:shadow-xl',
				].join(' '),
				ghost: [
					'bg-transparent text-navy',
					'hover:bg-navy-50',
				].join(' '),
				link: [
					'bg-transparent text-navy underline-offset-4',
					'hover:underline',
				].join(' '),
			},
			size: {
				sm: 'h-9 px-4 text-sm rounded-md',
				md: 'h-11 px-6 text-base rounded-lg',
				lg: 'h-14 px-8 text-lg rounded-lg',
				icon: 'h-10 w-10 rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	}
)

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
