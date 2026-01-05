import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Юридические услуги — экономические и гражданские споры'
export const size = {
	width: 1200,
	height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#0B1121',
					backgroundImage:
						'radial-gradient(circle at 25% 25%, #1a2744 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a2744 0%, transparent 50%)',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '40px 80px',
						maxWidth: '100%',
					}}
				>
					{/* Decorative line */}
					<div
						style={{
							width: '80px',
							height: '4px',
							backgroundColor: '#D4AF37',
							marginBottom: '40px',
							borderRadius: '2px',
						}}
					/>

					{/* Main title */}
					<div
						style={{
							display: 'flex',
							fontSize: 72,
							fontWeight: 700,
							color: '#ffffff',
							textAlign: 'center',
							marginBottom: '24px',
							letterSpacing: '-0.02em',
						}}
					>
						Юридические услуги
					</div>

					{/* Subtitle */}
					<div
						style={{
							display: 'flex',
							fontSize: 32,
							color: '#D4AF37',
							textAlign: 'center',
							marginBottom: '40px',
							fontWeight: 500,
						}}
					>
						Экономические и гражданские споры
					</div>

					{/* Services list */}
					<div
						style={{
							display: 'flex',
							gap: '24px',
							flexWrap: 'wrap',
							justifyContent: 'center',
							maxWidth: '900px',
						}}
					>
						{[
							'Арбитражные споры',
							'Взыскание долгов',
							'Договорные споры',
							'Представительство в суде',
						].map((service) => (
							<div
								key={service}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									color: '#94a3b8',
									fontSize: 24,
								}}
							>
								<div
									style={{
										width: '8px',
										height: '8px',
										backgroundColor: '#D4AF37',
										borderRadius: '50%',
									}}
								/>
								{service}
							</div>
						))}
					</div>

					{/* Bottom decorative line */}
					<div
						style={{
							width: '80px',
							height: '4px',
							backgroundColor: '#D4AF37',
							marginTop: '40px',
							borderRadius: '2px',
						}}
					/>
				</div>
			</div>
		),
		{
			...size,
		}
	)
}
