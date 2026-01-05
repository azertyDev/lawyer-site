'use client'

import { cn } from '@/shared/lib'
import { Icon } from '@iconify/react'
import * as SelectPrimitive from '@radix-ui/react-select'
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
} from 'react'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = forwardRef<
	ElementRef<typeof SelectPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: boolean }
>(({ className, children, error, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			'flex h-11 w-full items-center justify-between rounded-lg border bg-white px-4 py-2',
			'text-base text-navy placeholder:text-muted-foreground',
			'transition-colors duration-200',
			'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1',
			'disabled:cursor-not-allowed disabled:opacity-50',
			'[&>span]:line-clamp-1',
			error
				? 'border-destructive focus:ring-destructive'
				: 'border-input hover:border-navy-200',
			className
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<Icon
				icon="lucide:chevron-down"
				className="h-4 w-4 text-muted-foreground"
			/>
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = forwardRef<
	ElementRef<typeof SelectPrimitive.Content>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg',
				'border bg-white shadow-lg',
				'data-[state=open]:animate-in data-[state=closed]:animate-out',
				'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
				'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
				'data-[side=bottom]:slide-in-from-top-2',
				'data-[side=top]:slide-in-from-bottom-2',
				position === 'popper' &&
					'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
				className
			)}
			position={position}
			{...props}
		>
			<SelectPrimitive.Viewport
				className={cn(
					'p-1',
					position === 'popper' &&
						'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = forwardRef<
	ElementRef<typeof SelectPrimitive.Item>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-2',
			'text-sm text-navy outline-none',
			'focus:bg-navy-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<Icon icon="lucide:check" className="h-4 w-4 text-gold" />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectItem,
}
