import request from '@/apis/request'
import type { IBaseType } from '../types/index.ts'
import type { MusicCategoryItem, GetMusicListByCategoryIdParams, MusicItem } from './type.ts'

/**
 * 获取分类分类列表
 */
export const reqGetMusicCategoryList = () => {
	return request.get<IBaseType<MusicCategoryItem[]>>({ url: `/music/category` })
}

/**
 * 根据音乐分类id获取音乐列表
 */
export const reqGetMusicListByCategoryId = (params: GetMusicListByCategoryIdParams) => {
	return request.get<IBaseType<MusicItem[]>>({ url: `/music`, params })
}
