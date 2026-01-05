import {
	articleCategories,
	articles,
	getArticleBySlug,
	getRelatedArticles,
} from '@/entities'
import { siteConfig } from '@/shared/config'
import { Breadcrumb, Container, CopyButton, Section } from '@/shared/ui'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'

interface PageProps {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	return articles.map((article) => ({
		slug: article.slug,
	}))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params
	const article = getArticleBySlug(slug)

	if (!article) {
		return {
			title: 'Статья не найдена',
		}
	}

	return {
		title: article.title,
		description: article.description,
		keywords: article.tags,
		authors: [{ name: article.author.name }],
		openGraph: {
			type: 'article',
			title: article.title,
			description: article.description,
			publishedTime: article.publishedAt,
			modifiedTime: article.updatedAt ?? article.publishedAt,
			authors: [article.author.name],
			tags: article.tags,
			images: [
				{
					url: article.image,
					width: 1200,
					height: 630,
					alt: article.imageAlt,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: article.title,
			description: article.description,
			images: [article.image],
		},
	}
}

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

function getCategoryName(slug: string): string {
	return articleCategories.find((c) => c.slug === slug)?.name ?? slug
}

function renderMarkdown(content: string): string {
	return content
		// Headers
		.replace(/^## (.*$)/gim, '<h2 class="font-serif text-2xl text-navy mt-10 mb-4">$1</h2>')
		.replace(/^### (.*$)/gim, '<h3 class="font-serif text-xl text-navy mt-8 mb-3">$1</h3>')
		// Bold
		.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
		// Italic
		.replace(/\*(.*?)\*/g, '<em>$1</em>')
		// Blockquotes
		.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gold pl-4 my-6 text-muted-foreground italic">$1</blockquote>')
		// Code blocks
		.replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm"><code>$1</code></pre>')
		// Inline code
		.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
		// Unordered lists
		.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
		// Ordered lists
		.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
		// Links
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold hover:underline">$1</a>')
		// Horizontal rules
		.replace(/^---$/gim, '<hr class="my-8 border-border" />')
		// Tables (basic)
		.replace(/\|(.+)\|/g, (match) => {
			const cells = match.split('|').filter(Boolean)
			if (cells.some(cell => cell.includes('---'))) {
				return ''
			}
			const cellTags = cells.map(cell => `<td class="border border-border px-4 py-2">${cell.trim()}</td>`).join('')
			return `<tr>${cellTags}</tr>`
		})
		// Paragraphs
		.replace(/\n\n/g, '</p><p class="mb-4 text-foreground leading-relaxed">')
		// Line breaks
		.replace(/\n/g, '<br />')
}

export default async function ArticlePage({ params }: PageProps) {
	const { slug } = await params
	const article = getArticleBySlug(slug)

	if (!article) {
		notFound()
	}

	const relatedArticles = getRelatedArticles(slug, 3)

	const articleSchema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: article.description,
		image: article.image,
		author: {
			'@type': 'Person',
			name: article.author.name,
			jobTitle: article.author.role,
		},
		publisher: {
			'@type': 'Organization',
			name: siteConfig.name,
			url: siteConfig.url,
		},
		datePublished: article.publishedAt,
		dateModified: article.updatedAt ?? article.publishedAt,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${siteConfig.url}/blog/${article.slug}`,
		},
		keywords: article.tags.join(', '),
		articleSection: getCategoryName(article.category),
		wordCount: article.content.split(/\s+/).length,
	}

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Главная',
				item: siteConfig.url,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Блог',
				item: `${siteConfig.url}/blog`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: article.title,
				item: `${siteConfig.url}/blog/${article.slug}`,
			},
		],
	}

	return (
		<>
			<Script
				id="article-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
			/>
			<Script
				id="breadcrumb-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			{/* Hero Section */}
			<Section className="pt-24 md:pt-32 pb-0">
				<Container>
					<Breadcrumb
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'Блог', href: '/blog' },
							{ label: article.title, href: `/blog/${article.slug}` },
						]}
					/>
				</Container>
			</Section>

			{/* Article Header */}
			<Section className="py-8">
				<Container>
					<div className="max-w-4xl mx-auto">
						<div className="mb-6">
							<Link
								href={`/blog?category=${article.category}`}
								className="inline-block px-3 py-1 bg-gold/10 text-gold text-sm font-medium rounded-full hover:bg-gold/20 transition-colors"
							>
								{getCategoryName(article.category)}
							</Link>
						</div>

						<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-6">
							{article.title}
						</h1>

						<p className="text-lg text-muted-foreground mb-8">
							{article.description}
						</p>

						<div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
									<span className="text-navy font-semibold text-sm">
										{article.author.name.charAt(0)}
									</span>
								</div>
								<div>
									<div className="font-medium text-navy">
										{article.author.name}
									</div>
									<div className="text-sm text-muted-foreground">
										{article.author.role}
									</div>
								</div>
							</div>

							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span>{formatDate(article.publishedAt)}</span>
								<span>•</span>
								<span>{article.readingTime} мин чтения</span>
							</div>
						</div>
					</div>
				</Container>
			</Section>

			{/* Featured Image */}
			<Section className="py-0">
				<Container>
					<div className="max-w-4xl mx-auto">
						<div className="relative aspect-[16/9] rounded-xl overflow-hidden">
							<Image
								src={article.image}
								alt={article.imageAlt}
								fill
								className="object-cover"
								sizes="(max-width: 896px) 100vw, 896px"
								priority
							/>
						</div>
					</div>
				</Container>
			</Section>

			{/* Article Content */}
			<Section className="py-12">
				<Container>
					<div className="max-w-4xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
							{/* Main Content */}
							<article
								className="prose prose-lg max-w-none"
								dangerouslySetInnerHTML={{
									__html: `<p class="mb-4 text-foreground leading-relaxed">${renderMarkdown(article.content)}</p>`,
								}}
							/>

							{/* Sidebar */}
							<aside className="hidden lg:block">
								<div className="sticky top-24 space-y-8">
									{/* Tags */}
									<div>
										<h3 className="font-serif text-lg text-navy mb-4">Теги</h3>
										<div className="flex flex-wrap gap-2">
											{article.tags.map((tag) => (
												<span
													key={tag}
													className="px-3 py-1 bg-muted text-sm text-muted-foreground rounded-full"
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									{/* Share */}
									<div>
										<h3 className="font-serif text-lg text-navy mb-4">
											Поделиться
										</h3>
										<div className="flex gap-3">
											<a
												href={`https://t.me/share/url?url=${encodeURIComponent(`${siteConfig.url}/blog/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-colors"
												aria-label="Поделиться в Telegram"
											>
												<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
													<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
												</svg>
											</a>
											<a
												href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${siteConfig.url}/blog/${article.slug}`)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-colors"
												aria-label="Поделиться в WhatsApp"
											>
												<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
												</svg>
											</a>
											<CopyButton
												text={`${siteConfig.url}/blog/${article.slug}`}
												className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-colors"
											/>
										</div>
									</div>

									{/* CTA */}
									<div className="p-6 bg-navy rounded-xl text-white">
										<h3 className="font-serif text-lg mb-3">
											Нужна консультация?
										</h3>
										<p className="text-sm text-white/70 mb-4">
											Разберём вашу ситуацию и подскажем решение
										</p>
										<Link
											href="/contacts"
											className="block w-full py-2.5 bg-gold text-navy text-center font-semibold rounded-lg hover:brightness-110 transition-all"
										>
											Записаться
										</Link>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</Container>
			</Section>

			{/* Related Articles */}
			{relatedArticles.length > 0 && (
				<Section className="py-12 bg-muted">
					<Container>
						<div className="max-w-4xl mx-auto">
							<h2 className="font-serif text-2xl text-navy mb-8">
								Похожие статьи
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{relatedArticles.map((related) => (
									<Link
										key={related.slug}
										href={`/blog/${related.slug}`}
										className="group"
									>
										<article className="rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
											<div className="relative h-40 overflow-hidden">
												<Image
													src={related.image}
													alt={related.imageAlt}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-300"
													sizes="(max-width: 768px) 100vw, 33vw"
												/>
											</div>
											<div className="p-4 flex flex-col flex-grow">
												<h3 className="font-serif font-semibold text-navy mb-2 group-hover:text-gold transition-colors line-clamp-2">
													{related.title}
												</h3>
												<div className="text-xs text-muted-foreground mt-auto">
													{related.readingTime} мин чтения
												</div>
											</div>
										</article>
									</Link>
								))}
							</div>
						</div>
					</Container>
				</Section>
			)}

			{/* Mobile CTA */}
			<Section className="py-8 lg:hidden bg-navy">
				<Container>
					<div className="text-center">
						<h3 className="font-serif text-xl text-white mb-3">
							Нужна консультация?
						</h3>
						<p className="text-sm text-white/70 mb-4">
							Разберём вашу ситуацию и подскажем решение
						</p>
						<Link
							href="/contacts"
							className="inline-block px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:brightness-110 transition-all"
						>
							Записаться на консультацию
						</Link>
					</div>
				</Container>
			</Section>
		</>
	)
}
