export interface Article {
	slug: string
	title: string
	description: string
	content: string
	category: ArticleCategory
	tags: string[]
	author: Author
	publishedAt: string
	updatedAt?: string
	readingTime: number
	image: string
	imageAlt: string
	featured?: boolean
}

export interface Author {
	name: string
	role: string
}

export type ArticleCategory =
	| 'debt-collection'
	| 'contract-disputes'
	| 'court-representation'
	| 'legal-tips'
	| 'legislation'

export interface ArticleCategoryInfo {
	slug: ArticleCategory
	name: string
	description: string
}

export const articleCategories: ArticleCategoryInfo[] = [
	{
		slug: 'debt-collection',
		name: 'Взыскание долгов',
		description: 'Статьи о взыскании задолженности',
	},
	{
		slug: 'contract-disputes',
		name: 'Договорные споры',
		description: 'Статьи о спорах по договорам',
	},
	{
		slug: 'court-representation',
		name: 'Судебная практика',
		description: 'Статьи о представительстве в суде',
	},
	{
		slug: 'legal-tips',
		name: 'Юридические советы',
		description: 'Практические рекомендации',
	},
	{
		slug: 'legislation',
		name: 'Законодательство',
		description: 'Обзоры изменений в законах',
	},
]
