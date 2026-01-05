'use client'

import { cn } from '@/shared/lib'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
} from 'react'

const RadioGroup = forwardRef<
	ElementRef<typeof RadioGroupPrimitive.Root>,
	ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Root
			className={cn('grid gap-2', className)}
			{...props}
			ref={ref}
		/>
	)
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<
	ElementRef<typeof RadioGroupPrimitive.Item>,
	ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				'aspect-square h-5 w-5 rounded-full border border-input',
				'transition-colors duration-200',
				'focus:outline-none focus-visible:ring-2',
				'focus-visible:ring-gold focus-visible:ring-offset-2',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'hover:border-navy-200',
				'data-[state=checked]:border-navy',
				className
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<div className="h-2.5 w-2.5 rounded-full bg-navy" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
