'use client'

import { cn } from '@/shared/lib'
import { Icon } from '@iconify/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
} from 'react'

const Checkbox = forwardRef<
	ElementRef<typeof CheckboxPrimitive.Root>,
	ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'peer h-5 w-5 shrink-0 rounded border border-input',
			'transition-colors duration-200',
			'focus-visible:outline-none focus-visible:ring-2',
			'focus-visible:ring-gold focus-visible:ring-offset-2',
			'disabled:cursor-not-allowed disabled:opacity-50',
			'data-[state=checked]:bg-navy data-[state=checked]:border-navy',
			'data-[state=checked]:text-white',
			'hover:border-navy-200',
			className
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn('flex items-center justify-center text-current')}
		>
			<Icon icon="lucide:check" className="h-3.5 w-3.5" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
