import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
	width: 32,
	height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#0B1121',
					borderRadius: '6px',
				}}
			>
				{/* Scales of justice symbol */}
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* Center pillar */}
					<rect x="11" y="4" width="2" height="16" fill="#D4AF37" />
					{/* Base */}
					<rect x="7" y="19" width="10" height="2" rx="1" fill="#D4AF37" />
					{/* Top bar */}
					<rect x="3" y="4" width="18" height="2" rx="1" fill="#D4AF37" />
					{/* Left scale */}
					<path
						d="M3 7L6 14H0L3 7Z"
						fill="#D4AF37"
						transform="translate(1, 0)"
					/>
					{/* Right scale */}
					<path
						d="M3 7L6 14H0L3 7Z"
						fill="#D4AF37"
						transform="translate(17, 0)"
					/>
					{/* Left chain */}
					<rect x="4" y="6" width="1" height="2" fill="#D4AF37" />
					{/* Right chain */}
					<rect x="19" y="6" width="1" height="2" fill="#D4AF37" />
				</svg>
			</div>
		),
		{
			...size,
		}
	)
}
