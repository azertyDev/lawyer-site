'use client'

import { Container, InstagramEmbed, Section } from '@/shared/ui'

interface InstagramPost {
	id: string
	permalink: string
	author?: string
}

const instagramPosts: InstagramPost[] = [
	{
		id: '1',
		permalink: 'https://www.instagram.com/reel/DSvG2T-je0Q/',
	},
	{
		id: '2',
		permalink: 'https://www.instagram.com/reel/DSr0aXUDbU3/',
		author: 'Маржона Хасановна (@yurist.marjona)',
	},
	{
		id: '3',
		permalink: 'https://www.instagram.com/reel/DSpAzXUjXfu/',
		author: 'Маржона Хасановна (@yurist.marjona)',
	},
	{
		id: '4',
		permalink: 'https://www.instagram.com/p/DSmfxmBjRn4/',
		author: 'Маржона Хасановна (@yurist.marjona)',
	},
]

function generateInstagramEmbed(post: InstagramPost): string {
	const encodedPermalink = `${post.permalink}?utm_source=ig_embed&amp;utm_campaign=loading`
	const authorText = post.author
		? `<a href="${encodedPermalink}" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Публикация от ${post.author}</a>`
		: ''

	return `
<blockquote
	class="instagram-media"
	data-instgrm-permalink="${encodedPermalink}"
	data-instgrm-version="14"
	style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:calc(100% - 2px);">
	<div style="padding:16px;">
		<a href="${encodedPermalink}"
			style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
			target="_blank">
			<div style="display:flex; flex-direction:row; align-items:center;">
				<div style="background-color:#F4F4F4; border-radius:50%; flex-grow:0; height:40px; margin-right:14px; width:40px;"></div>
				<div style="display:flex; flex-direction:column; flex-grow:1; justify-content:center;">
					<div style="background-color:#F4F4F4; border-radius:4px; flex-grow:0; height:14px; margin-bottom:6px; width:100px;"></div>
					<div style="background-color:#F4F4F4; border-radius:4px; flex-grow:0; height:14px; width:60px;"></div>
				</div>
			</div>
			<div style="padding-top:8px;">
				<div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">
					Посмотреть эту публикацию в Instagram
				</div>
			</div>
			<div style="padding:12.5% 0;"></div>
			<div style="display:flex; flex-direction:row; margin-bottom:14px; align-items:center;">
				<div>
					<div style="background-color:#F4F4F4; border-radius:50%; height:12.5px; width:12.5px; transform:translateX(0px) translateY(7px);"></div>
					<div style="background-color:#F4F4F4; height:12.5px; transform:rotate(-45deg) translateX(3px) translateY(1px); width:12.5px; flex-grow:0; margin-right:14px; margin-left:2px;"></div>
					<div style="background-color:#F4F4F4; border-radius:50%; height:12.5px; width:12.5px; transform:translateX(9px) translateY(-18px);"></div>
				</div>
				<div style="margin-left:8px;">
					<div style="background-color:#F4F4F4; border-radius:50%; flex-grow:0; height:20px; width:20px;"></div>
					<div style="width:0; height:0; border-top:2px solid transparent; border-left:6px solid #f4f4f4; border-bottom:2px solid transparent; transform:translateX(16px) translateY(-4px) rotate(30deg)"></div>
				</div>
				<div style="margin-left:auto;">
					<div style="width:0px; border-top:8px solid #F4F4F4; border-right:8px solid transparent; transform:translateY(16px);"></div>
					<div style="background-color:#F4F4F4; flex-grow:0; height:12px; width:16px; transform:translateY(-4px);"></div>
					<div style="width:0; height:0; border-top:8px solid #F4F4F4; border-left:8px solid transparent; transform:translateY(-4px) translateX(8px);"></div>
				</div>
			</div>
			<div style="display:flex; flex-direction:column; flex-grow:1; justify-content:center; margin-bottom:24px;">
				<div style="background-color:#F4F4F4; border-radius:4px; flex-grow:0; height:14px; margin-bottom:6px; width:224px;"></div>
				<div style="background-color:#F4F4F4; border-radius:4px; flex-grow:0; height:14px; width:144px;"></div>
			</div>
		</a>
		<p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">
			${authorText}
		</p>
	</div>
</blockquote>`
}

export function InstagramSection() {
	return (
		<Section className="py-16 md:py-24 bg-muted">
			<Container>
				<div className="mb-12 md:mb-16 text-center">
					<h2 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
						Мы в Instagram
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Следите за новостями и полезными материалами в нашем Instagram
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-6">
					{instagramPosts.map((post) => (
						<InstagramEmbed
							key={post.id}
							html={generateInstagramEmbed(post)}
							className="flex-shrink-0"
						/>
					))}
				</div>

				<div className="mt-10 text-center">
					<a
						href="https://www.instagram.com/yurist.marjona/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>Instagram</title>
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
						</svg>
						Подписаться
					</a>
				</div>
			</Container>
		</Section>
	)
}
