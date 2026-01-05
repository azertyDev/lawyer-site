import {
	articleCategories,
	articles,
	getFeaturedArticles,
} from '@/entities'
import { siteConfig } from '@/shared/config'
import { Breadcrumb, Container, Section } from '@/shared/ui'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Блог — юридические статьи и советы',
	description:
		'Полезные статьи по юридическим вопросам: взыскание долгов, договорные споры, судебная практика. Практические советы от юриста.',
	keywords: [
		'юридический блог',
		'статьи юриста',
		'правовые советы',
		'судебная практика',
		...siteConfig.keywords,
	],
	openGraph: {
		title: 'Блог — юридические статьи и советы',
		description:
			'Полезные статьи по юридическим вопросам: взыскание долгов, договорные споры, судебная практика.',
	},
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

export default function BlogPage() {
	const featuredArticles = getFeaturedArticles()
	const otherArticles = articles.filter((a) => !a.featured)

	return (
		<>
			<Section className="pt-24 md:pt-32 pb-12 bg-gradient-to-b from-navy-50 to-white">
				<Container>
					<Breadcrumb
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'Блог', href: '/blog' },
						]}
					/>

					<div className="mt-8 max-w-3xl">
						<h1 className="font-serif text-display-sm md:text-display-md text-navy mb-4">
							Юридический блог
						</h1>
						<p className="text-lg text-muted-foreground">
							Полезные статьи по юридическим вопросам, разбор судебной практики
							и практические советы для бизнеса и граждан.
						</p>
					</div>
				</Container>
			</Section>

			{/* Featured Articles */}
			{featuredArticles.length > 0 && (
				<Section className="py-12">
					<Container>
						<h2 className="font-serif text-2xl text-navy mb-8">
							Популярные статьи
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{featuredArticles.map((article) => (
								<Link
									key={article.slug}
									href={`/blog/${article.slug}`}
									className="group"
								>
									<article className="rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
										<div className="relative h-48 overflow-hidden">
											<Image
												src={article.image}
												alt={article.imageAlt}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-300"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
											<div className="absolute top-4 left-4">
												<span className="inline-block px-3 py-1 bg-gold text-navy text-xs font-semibold rounded-full">
													{getCategoryName(article.category)}
												</span>
											</div>
										</div>
										<div className="p-6 flex flex-col flex-grow">
											<h3 className="font-serif text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors line-clamp-2">
												{article.title}
											</h3>
											<p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
												{article.description}
											</p>
											<div className="flex items-center justify-between text-xs text-muted-foreground">
												<span>{formatDate(article.publishedAt)}</span>
												<span>{article.readingTime} мин чтения</span>
											</div>
										</div>
									</article>
								</Link>
							))}
						</div>
					</Container>
				</Section>
			)}

			{/* Categories */}
			<Section className="py-12 bg-muted">
				<Container>
					<h2 className="font-serif text-2xl text-navy mb-8">
						Категории статей
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{articleCategories.map((category) => {
							const count = articles.filter(
								(a) => a.category === category.slug
							).length
							return (
								<Link
									key={category.slug}
									href={`/blog?category=${category.slug}`}
									className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
								>
									<div className="font-medium text-navy group-hover:text-gold transition-colors">
										{category.name}
									</div>
									<div className="text-sm text-muted-foreground mt-1">
										{count} {count === 1 ? 'статья' : count < 5 ? 'статьи' : 'статей'}
									</div>
								</Link>
							)
						})}
					</div>
				</Container>
			</Section>

			{/* All Articles */}
			<Section className="py-12 md:py-16">
				<Container>
					<h2 className="font-serif text-2xl text-navy mb-8">Все статьи</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{[...articles]
							.sort(
								(a, b) =>
									new Date(b.publishedAt).getTime() -
									new Date(a.publishedAt).getTime()
							)
							.map((article) => (
								<Link
									key={article.slug}
									href={`/blog/${article.slug}`}
									className="group"
								>
									<article className="flex gap-6 items-start">
										<div className="relative w-32 h-24 md:w-48 md:h-32 rounded-lg overflow-hidden shrink-0">
											<Image
												src={article.image}
												alt={article.imageAlt}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-300"
												sizes="(max-width: 768px) 128px, 192px"
											/>
										</div>
										<div className="flex flex-col">
											<span className="text-xs text-gold font-medium mb-2">
												{getCategoryName(article.category)}
											</span>
											<h3 className="font-serif text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors line-clamp-2">
												{article.title}
											</h3>
											<p className="text-sm text-muted-foreground mb-3 line-clamp-2 hidden md:block">
												{article.description}
											</p>
											<div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
												<span>{formatDate(article.publishedAt)}</span>
												<span>{article.readingTime} мин</span>
											</div>
										</div>
									</article>
								</Link>
							))}
					</div>
				</Container>
			</Section>

			{/* CTA Section */}
			<Section className="py-12 md:py-16 bg-navy">
				<Container>
					<div className="text-center max-w-2xl mx-auto">
						<h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
							Не нашли ответ на свой вопрос?
						</h2>
						<p className="text-white/70 mb-8">
							Запишитесь на бесплатную консультацию — разберём вашу ситуацию
							и подскажем оптимальное решение.
						</p>
						<Link
							href="/contacts"
							className="inline-flex items-center justify-center h-12 px-8 bg-gold text-navy font-semibold rounded-lg hover:brightness-110 transition-all"
						>
							Записаться на консультацию
						</Link>
					</div>
				</Container>
			</Section>
		</>
	)
}
