import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { CreateBlogParams, BlogItem, GetBlogListParams } from './type.ts'

const PREFIX = '/blog'

/**
 * 创建博客
 */
export const reqCreateBlog = (data: CreateBlogParams) => {
	return request.post<IBaseType<string>>({ url: PREFIX, data })
}

/**
 * 获取博客列表
 */
export const reqGetBlogList = (params: GetBlogListParams) => {
	return request.get<IBaseListType<BlogItem>>({ url: PREFIX, params })
}

/**
 * 获取博客详情
 */
export const reqGetBlogDetail = (id: number | string) => {
	return request.get<IBaseType<BlogItem>>({ url: `${PREFIX}/${id}` })
}

/**
 * 删除博客
 */
export const reqDeleteBlog = (id: number | string) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/${id}` })
}

/**
 * 编辑博客
 */
export const reqEditBlog = (data: BlogItem) => {
	return request.put<IBaseType<string>>({ url: PREFIX, data })
}
