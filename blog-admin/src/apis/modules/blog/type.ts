import type { BlogStatus } from '@/typings'
import type { BlogTagItem } from '../blog-tag/type'
import type { IPageParams } from '../types'

export interface GetBlogListParams extends IPageParams {
	title?: string
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
	tags: BlogTagItem[]
	tagIds?: number[]
	categoryId?: number | null
	authorId: number
}

export interface CreateBlogParams {
	title: string
	previewUrl?: string
	description?: string
	htmlContent: string
	status: BlogStatus
	tagIds: number[]
	categoryId?: number
}
