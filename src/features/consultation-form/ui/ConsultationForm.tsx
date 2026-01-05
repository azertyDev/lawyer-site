'use client'

import { analytics, EventNames } from '@/shared/lib'
import {
	Button,
	Checkbox,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Textarea,
	toast,
} from '@/shared/ui'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { submitConsultationForm } from '../api/submit'
import {
	contactChannelOptions,
	consultationFormDefaultValues,
	consultationFormSchema,
} from '../model/schema'

interface ConsultationFormProps {
	onSuccess?: () => void
}

export function ConsultationForm({ onSuccess }: ConsultationFormProps) {
	const [formTimestamp, setFormTimestamp] = useState<number>(0)

	useEffect(() => {
		setFormTimestamp(Date.now())
	}, [])

	const form = useForm({
		defaultValues: {
			...consultationFormDefaultValues,
			_ts: formTimestamp,
		},
		validatorAdapter: zodValidator(),
		validators: {
			onChange: consultationFormSchema,
		},
		onSubmit: async ({ value }) => {
			analytics.track({
				name: EventNames.FORM_SUBMIT_ATTEMPT,
				params: { form_type: 'consultation' },
			})

			try {
				const formData = {
					name: value.name || '',
					phone: value.phone || '',
					comment: value.comment,
					contactChannel: value.contactChannel || 'phone',
					consent: value.consent || false,
					_hp: value._hp,
					_ts: formTimestamp,
				}
				const response = await submitConsultationForm(formData)

				if (response.success) {
					analytics.track({
						name: EventNames.FORM_SUBMIT_SUCCESS,
						params: { form_type: 'consultation' },
					})

					toast({
						title: 'Заявка отправлена',
						description: 'Мы свяжемся с вами в ближайшее время',
						variant: 'success',
					})

					form.reset()
					setFormTimestamp(Date.now())
					onSuccess?.()
				}
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Произошла ошибка'

				analytics.track({
					name: EventNames.FORM_SUBMIT_ERROR,
					params: { form_type: 'consultation', error: message },
				})

				toast({
					title: 'Ошибка отправки',
					description: message,
					variant: 'destructive',
				})
			}
		},
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
			className="space-y-6"
		>
			<input
				type="text"
				name="_hp"
				autoComplete="off"
				tabIndex={-1}
				className="absolute -left-[9999px] opacity-0"
				aria-hidden="true"
				onChange={(e) => form.setFieldValue('_hp', e.target.value)}
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<form.Field name="name">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor="consult-name">Имя *</Label>
							<Input
								id="consult-name"
								placeholder="Как к вам обращаться"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								error={
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0
								}
							/>
							{field.state.meta.isTouched &&
								field.state.meta.errors.length > 0 && (
									<p className="text-sm text-destructive">
										{field.state.meta.errors[0]}
									</p>
								)}
						</div>
					)}
				</form.Field>

				<form.Field name="phone">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor="consult-phone">Телефон *</Label>
							<Input
								id="consult-phone"
								type="tel"
								placeholder="+7 (999) 123-45-67"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								error={
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0
								}
							/>
							{field.state.meta.isTouched &&
								field.state.meta.errors.length > 0 && (
									<p className="text-sm text-destructive">
										{field.state.meta.errors[0]}
									</p>
								)}
						</div>
					)}
				</form.Field>
			</div>

			<form.Field name="comment">
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor="consult-comment">
							Удобное время / комментарий (опционально)
						</Label>
						<Textarea
							id="consult-comment"
							placeholder="Например: удобно после 18:00, или кратко о вопросе"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							className="min-h-[80px]"
						/>
					</div>
				)}
			</form.Field>

			<form.Field name="contactChannel">
				{(field) => (
					<div className="space-y-3">
						<Label>Предпочтительный способ связи *</Label>
						<RadioGroup
							value={field.state.value}
							onValueChange={(val) =>
								field.handleChange(
									val as 'phone' | 'telegram' | 'whatsapp' | 'email'
								)
							}
							className="flex flex-wrap gap-4"
						>
							{contactChannelOptions.map((option) => (
								<div key={option.value} className="flex items-center space-x-2">
									<RadioGroupItem
										value={option.value}
										id={`consult-channel-${option.value}`}
									/>
									<Label
										htmlFor={`consult-channel-${option.value}`}
										className="cursor-pointer font-normal"
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
					</div>
				)}
			</form.Field>

			<form.Field name="consent">
				{(field) => (
					<div className="space-y-2">
						<div className="flex items-start space-x-3">
							<Checkbox
								id="consult-consent"
								checked={field.state.value}
								onCheckedChange={(checked) =>
									field.handleChange(checked === true)
								}
							/>
							<Label
								htmlFor="consult-consent"
								className="text-sm font-normal leading-relaxed cursor-pointer"
							>
								Я согласен на{' '}
								<Link
									href="/data-processing-consent"
									className="text-gold hover:underline"
									target="_blank"
								>
									обработку персональных данных
								</Link>
							</Label>
						</div>
						{field.state.meta.errors.length > 0 && (
							<p className="text-sm text-destructive">
								{field.state.meta.errors[0]}
							</p>
						)}
					</div>
				)}
			</form.Field>

			<form.Subscribe selector={(state) => state.isSubmitting}>
				{(isSubmitting) => (
					<Button
						type="submit"
						variant="primary"
						size="lg"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Отправка...' : 'Записаться на консультацию'}
					</Button>
				)}
			</form.Subscribe>
		</form>
	)
}
