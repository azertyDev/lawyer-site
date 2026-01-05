'use client'

import { analytics, EventNames } from '@/shared/lib'
import {
	Button,
	Checkbox,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
	toast,
} from '@/shared/ui'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { submitLeadForm } from '../api/submit'
import {
	clientTypeOptions,
	contactChannelOptions,
	disputeTypeOptions,
	leadFormDefaultValues,
	leadFormSchema,
	stageOptions,
} from '../model/schema'

interface LeadFormProps {
	onSuccess?: () => void
}

export function LeadForm({ onSuccess }: LeadFormProps) {
	const [formTimestamp, setFormTimestamp] = useState<number>(0)

	useEffect(() => {
		setFormTimestamp(Date.now())
	}, [])

	const form = useForm({
		defaultValues: {
			...leadFormDefaultValues,
			_ts: formTimestamp,
		},
		validatorAdapter: zodValidator(),
		validators: {
			onChange: leadFormSchema,
		},
		onSubmit: async ({ value }) => {
			analytics.track({
				name: EventNames.FORM_SUBMIT_ATTEMPT,
				params: { form_type: 'lead' },
			})

			try {
				const formData = {
					clientType: value.clientType || 'individual',
					disputeType: value.disputeType || '',
					stage: value.stage || 'pre-court',
					description: value.description || '',
					amount: value.amount,
					name: value.name || '',
					phone: value.phone || '',
					email: value.email,
					contactChannel: value.contactChannel || 'phone',
					consent: value.consent || false,
					_hp: value._hp,
					_ts: formTimestamp,
				}
				const response = await submitLeadForm(formData)

				if (response.success) {
					analytics.track({
						name: EventNames.FORM_SUBMIT_SUCCESS,
						params: { form_type: 'lead' },
					})

					toast({
						title: 'Заявка отправлена',
						description: 'Мы свяжемся с вами в течение рабочего дня',
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
					params: { form_type: 'lead', error: message },
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

			<form.Field name="clientType">
				{(field) => (
					<div className="space-y-3">
						<Label>Тип клиента *</Label>
						<RadioGroup
							value={field.state.value}
							onValueChange={(val) =>
								field.handleChange(val as 'legal' | 'individual')
							}
							className="flex flex-col sm:flex-row gap-4"
						>
							{clientTypeOptions.map((option) => (
								<div key={option.value} className="flex items-center space-x-2">
									<RadioGroupItem
										value={option.value}
										id={`client-${option.value}`}
									/>
									<Label
										htmlFor={`client-${option.value}`}
										className="cursor-pointer font-normal"
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
						{field.state.meta.errors.length > 0 && (
							<p className="text-sm text-destructive">
								{field.state.meta.errors[0]}
							</p>
						)}
					</div>
				)}
			</form.Field>

			<form.Field name="disputeType">
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor="disputeType">Тип спора *</Label>
						<Select
							value={field.state.value}
							onValueChange={field.handleChange}
						>
							<SelectTrigger
								id="disputeType"
								error={field.state.meta.errors.length > 0}
							>
								<SelectValue placeholder="Выберите тип спора" />
							</SelectTrigger>
							<SelectContent>
								{disputeTypeOptions.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{field.state.meta.errors.length > 0 && (
							<p className="text-sm text-destructive">
								{field.state.meta.errors[0]}
							</p>
						)}
					</div>
				)}
			</form.Field>

			<form.Field name="stage">
				{(field) => (
					<div className="space-y-3">
						<Label>Стадия *</Label>
						<RadioGroup
							value={field.state.value}
							onValueChange={(val) =>
								field.handleChange(
									val as 'pre-court' | 'court' | 'enforcement'
								)
							}
							className="flex flex-col gap-2"
						>
							{stageOptions.map((option) => (
								<div key={option.value} className="flex items-center space-x-2">
									<RadioGroupItem
										value={option.value}
										id={`stage-${option.value}`}
									/>
									<Label
										htmlFor={`stage-${option.value}`}
										className="cursor-pointer font-normal"
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
						{field.state.meta.errors.length > 0 && (
							<p className="text-sm text-destructive">
								{field.state.meta.errors[0]}
							</p>
						)}
					</div>
				)}
			</form.Field>

			<form.Field name="description">
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor="description">Опишите ситуацию *</Label>
						<Textarea
							id="description"
							placeholder="Кратко опишите суть спора, какие документы есть, чего хотите добиться"
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

			<form.Field name="amount">
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor="amount">Сумма / предмет спора (опционально)</Label>
						<Input
							id="amount"
							placeholder="Например: 500 000 ₽ или квартира"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<form.Field name="name">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor="name">Имя *</Label>
							<Input
								id="name"
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
							<Label htmlFor="phone">Телефон *</Label>
							<Input
								id="phone"
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

			<form.Field name="email">
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor="email">Email (опционально)</Label>
						<Input
							id="email"
							type="email"
							placeholder="email@example.com"
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
										id={`channel-${option.value}`}
									/>
									<Label
										htmlFor={`channel-${option.value}`}
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
								id="consent"
								checked={field.state.value}
								onCheckedChange={(checked) =>
									field.handleChange(checked === true)
								}
							/>
							<Label
								htmlFor="consent"
								className="text-sm font-normal leading-relaxed cursor-pointer"
							>
								Я согласен на{' '}
								<Link
									href="/data-processing-consent"
									className="text-gold hover:underline"
									target="_blank"
								>
									обработку персональных данных
								</Link>{' '}
								и ознакомлен с{' '}
								<Link
									href="/privacy"
									className="text-gold hover:underline"
									target="_blank"
								>
									политикой конфиденциальности
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
						variant="gold"
						size="lg"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Отправка...' : 'Оценить перспективу'}
					</Button>
				)}
			</form.Subscribe>
		</form>
	)
}
