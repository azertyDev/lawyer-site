'use client'

import { siteConfig } from '@/shared/config'
import { analytics, EventNames } from '@/shared/lib'
import { Icon } from '@iconify/react'

export function MobileActions() {
	const handlePhoneClick = () => {
		analytics.track({
			name: EventNames.CLICK_PHONE,
			params: { location: 'mobile_actions' },
		})
	}

	const handleTelegramClick = () => {
		analytics.track({
			name: EventNames.CLICK_MESSENGER_TG,
			params: { location: 'mobile_actions' },
		})
	}

	const handleWhatsAppClick = () => {
		analytics.track({
			name: EventNames.CLICK_MESSENGER_WA,
			params: { location: 'mobile_actions' },
		})
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t shadow-lg safe-area-inset-bottom">
			<div className="grid grid-cols-3 divide-x">
				<a
					href={`tel:${siteConfig.contact.phoneClean}`}
					onClick={handlePhoneClick}
					className="flex flex-col items-center justify-center py-3 text-navy hover:bg-navy/5 transition-colors"
					aria-label="Позвонить"
				>
					<Icon icon="lucide:phone" className="w-5 h-5" />
					<span className="text-xs mt-1">Позвонить</span>
				</a>
				<a
					href={siteConfig.social.telegram}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleTelegramClick}
					className="flex flex-col items-center justify-center py-3 text-navy hover:bg-navy/5 transition-colors"
					aria-label="Написать в Telegram"
				>
					<Icon icon="lucide:send" className="w-5 h-5" />
					<span className="text-xs mt-1">Telegram</span>
				</a>
				<a
					href={siteConfig.social.whatsapp}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleWhatsAppClick}
					className="flex flex-col items-center justify-center py-3 text-navy hover:bg-navy/5 transition-colors"
					aria-label="Написать в WhatsApp"
				>
					<Icon icon="lucide:message-circle" className="w-5 h-5" />
					<span className="text-xs mt-1">WhatsApp</span>
				</a>
			</div>
		</div>
	)
}
