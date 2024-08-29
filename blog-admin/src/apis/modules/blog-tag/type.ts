import type { IPageParams } from '../types'

export interface BlogTagItem {
	id: number
	tagName: string
}

export interface GetBlogTagListParams extends IPageParams {
	tagName?: string
}

export interface CreateBlogTagParams {
	tagNames: string[]
}
