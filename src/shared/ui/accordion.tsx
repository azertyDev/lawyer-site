'use client'

import { cn } from '@/shared/lib'
import { Icon } from '@iconify/react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
} from 'react'

const Accordion = AccordionPrimitive.Root

const AccordionItem = forwardRef<
	ElementRef<typeof AccordionPrimitive.Item>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn('border-b border-border', className)}
		{...props}
	/>
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = forwardRef<
	ElementRef<typeof AccordionPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex flex-1 items-center justify-between py-5 text-left',
				'font-medium text-navy transition-all',
				'hover:text-gold',
				'focus-visible:outline-none focus-visible:ring-2',
				'focus-visible:ring-gold focus-visible:ring-offset-2 rounded',
				'[&[data-state=open]>svg]:rotate-180',
				className
			)}
			{...props}
		>
			{children}
			<Icon
				icon="lucide:chevron-down"
				className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200"
			/>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = forwardRef<
	ElementRef<typeof AccordionPrimitive.Content>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn('pb-5 pt-0', className)}>{children}</div>
	</AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
