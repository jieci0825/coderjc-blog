import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { BlogCategoryItem, GetBlogRankParams, GetBlogListParams, BlogItem } from './type.ts'

/**
 * 获取博客分类列表
 */
export function reqGetBlogCategoryList() {
	return request.get<IBaseType<BlogCategoryItem[]>>({ url: '/blog/category' })
}

/**
 * 获取博客排行榜
 */
export function reqGetBlogRank(params: GetBlogRankParams) {
	return request.get<IBaseType<BlogItem[]>>({ url: '/blog/rank', params })
}

/**
 * 获取博客列表
 */
export function reqGetBlogList(params: GetBlogListParams) {
	return request.get<IBaseListType<BlogItem>>({ url: '/blog', params })
}

/**
 * 获取博客详情
 */
export function reqGetBlogDetail(id: number | string) {
	return request.get<IBaseType<BlogItem>>({ url: `/blog/${id}` })
}
