'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui'
import { useState, type ReactNode } from 'react'
import { LeadForm } from './LeadForm'

interface LeadFormModalProps {
	trigger: ReactNode
}

export function LeadFormModal({ trigger }: LeadFormModalProps) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Оценить перспективу дела</DialogTitle>
					<DialogDescription>
						Заполните форму, и я свяжусь с вами для бесплатной оценки
						перспектив вашего дела
					</DialogDescription>
				</DialogHeader>
				<LeadForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
