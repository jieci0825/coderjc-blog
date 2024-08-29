import type { BlogStatus, BlogRankType } from '@/typings'
import { IPageParams } from '../types'

export interface BlogCategoryItem {
	id: number
	categoryName: string
	blogNums: number
}

export interface BlogTagItem {
	id: number
	tagName: string
}

export interface BlogItem {
	id: number
	date: string
	title: string
	previewUrl?: any
	description?: string
	htmlContent: string
	status: BlogStatus
	categoryName?: string
	lookNums: number
	likeNums: number
	isLike: boolean
	tags: BlogTagItem[]
	tagIds?: number[]
	categoryId?: number | null
	authorId: number
	commentNums: number
}

export interface GetBlogRankParams {
	type: BlogRankType
}

export interface GetBlogListParams extends IPageParams {
	title: string
	categoryId?: number | undefined
}
