import { env } from '@/shared/config'
import type { AnalyticsEvent } from './events'

declare global {
	interface Window {
		gtag?: (
			command: string,
			targetId: string,
			params?: Record<string, unknown>
		) => void
		ym?: (
			counterId: string,
			method: string,
			...args: unknown[]
		) => void
	}
}

class AnalyticsTracker {
	private gaId: string | undefined
	private ymId: string | undefined

	constructor() {
		this.gaId = env.NEXT_PUBLIC_GA_ID
		this.ymId = env.NEXT_PUBLIC_YM_ID
	}

	track<E extends AnalyticsEvent>(event: E): void {
		if (typeof window === 'undefined') return

		this.trackGA(event)
		this.trackYM(event)
		this.logEvent(event)
	}

	private trackGA(event: AnalyticsEvent): void {
		if (!this.gaId || !window.gtag) return

		window.gtag('event', event.name, event.params)
	}

	private trackYM(event: AnalyticsEvent): void {
		if (!this.ymId || !window.ym) return

		window.ym(this.ymId, 'reachGoal', event.name, event.params)
	}

	private logEvent(event: AnalyticsEvent): void {
		if (process.env.NODE_ENV === 'development') {
			console.log('[Analytics]', event.name, event.params)
		}
	}

	pageView(url: string): void {
		if (typeof window === 'undefined') return

		if (this.gaId && window.gtag) {
			window.gtag('config', this.gaId, { page_path: url })
		}

		if (this.ymId && window.ym) {
			window.ym(this.ymId, 'hit', url)
		}
	}
}

export const analytics = new AnalyticsTracker()
