'use client'

import { useEffect } from 'react'

interface InstagramEmbedProps {
	html: string
	className?: string
}

declare global {
	interface Window {
		instgrm?: {
			Embeds: {
				process: () => void
			}
		}
	}
}

export function InstagramEmbed({ html, className }: InstagramEmbedProps) {
	useEffect(() => {
		// Load Instagram embed script if not already loaded
		const existingScript = document.querySelector(
			'script[src*="instagram.com/embed.js"]'
		)

		if (!existingScript) {
			const script = document.createElement('script')
			script.src = '//www.instagram.com/embed.js'
			script.async = true
			document.body.appendChild(script)

			script.onload = () => {
				if (window.instgrm) {
					window.instgrm.Embeds.process()
				}
			}
		} else {
			// Script already loaded, just process embeds
			if (window.instgrm) {
				window.instgrm.Embeds.process()
			}
		}
	}, [html])

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
