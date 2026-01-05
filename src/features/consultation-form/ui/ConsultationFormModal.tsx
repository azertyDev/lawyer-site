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
import { ConsultationForm } from './ConsultationForm'

interface ConsultationFormModalProps {
	trigger: ReactNode
}

export function ConsultationFormModal({ trigger }: ConsultationFormModalProps) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Записаться на консультацию</DialogTitle>
					<DialogDescription>
						Оставьте контакты, и я свяжусь с вами для назначения удобного
						времени
					</DialogDescription>
				</DialogHeader>
				<ConsultationForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
