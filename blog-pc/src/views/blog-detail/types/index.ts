import type { BlogItem } from '@/apis/modules/blog/type'

export interface BlogInfo {
	title: string
	author: string
	date: string
	htmlContent: string
}

export interface BlogDetailContentProps {
	blogInfo: BlogItem
}

export interface BlogDetailContentEmits {
	(e: 'like'): void
}

export interface BlogDetailSidebarProps {
	titleList: Element[]
}

export interface TitleNode {
	titleLevel: number
	title: string
	children: TitleNode[]
	raw: Element
	parent: TitleNode | null
}
