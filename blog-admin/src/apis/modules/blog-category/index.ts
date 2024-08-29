import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { BlogCategoryItem, CreateBlogCategoryParams } from './type.ts'

const PREFIX = '/blog/category'

/**
 * 获取博客分类列表
 */
export const reqGetBlogCategoryList = () => {
	return request.get<IBaseType<BlogCategoryItem[]>>({ url: PREFIX })
}

/**
 * 创建博客分类
 */
export const reqCreateBlogCategory = (data: CreateBlogCategoryParams) => {
	return request.post<IBaseType<string>>({ url: PREFIX, data })
}

/**
 * 编辑博客分类
 */
export const reqEditBlogCategory = (data: BlogCategoryItem) => {
	return request.put<IBaseType<string>>({ url: PREFIX, data })
}

/**
 * 删除博客分类
 */
export const reqDeleteBlogCategory = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/${id}` })
}
