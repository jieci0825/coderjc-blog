import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { BlogTagItem, GetBlogTagListParams, CreateBlogTagParams } from './type.ts'

const PREFIX = '/blog/tag'

/**
 * 获取标签列表
 */
export const reqGetBlogTagList = (params: GetBlogTagListParams) => {
	return request.get<IBaseListType<BlogTagItem>>({ url: PREFIX, params })
}

/**
 * 创建标签
 */
export const reqCreateBlogTag = (data: CreateBlogTagParams) => {
	return request.post<IBaseType<string>>({ url: PREFIX, data })
}

/**
 * 编辑标签
 */
export const reqEditBlogTag = (data: BlogTagItem) => {
	return request.put<IBaseType<string>>({ url: PREFIX, data })
}

/**
 * 删除标签
 */
export const reqDeleteBlogTag = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/${id}` })
}
