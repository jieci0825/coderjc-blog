import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types/index.ts'
import type {
	MusicCategoryItem,
	CreateMusicCategoryParams,
	EditMusicCategoryParams,
	GetMusicListParams,
	CreateMusicParams,
	MusicItem
} from './type.ts'

const PREFIX = '/music'

/**
 * 获取音乐分类列表
 */
export const reqGetMusicCategoryList = () => {
	return request.get<IBaseType<MusicCategoryItem[]>>({ url: `${PREFIX}/category` })
}

/**
 * 添加音乐分类
 */
export const reqCreateMusicCategory = (data: CreateMusicCategoryParams) => {
	return request.post<IBaseType<string>>({ url: `${PREFIX}/category`, data })
}

/**
 * 编辑音乐分类
 */
export const reqEditMusicCategory = (data: EditMusicCategoryParams) => {
	return request.put<IBaseType<string>>({ url: `${PREFIX}/category`, data })
}

/**
 * 删除音乐分类
 */
export const reqDeleteMusicCategory = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/category/${id}` })
}

/**
 * 获取音乐列表
 */
export const reqGetMusicList = (params: GetMusicListParams) => {
	return request.get<IBaseListType<MusicItem>>({ url: `${PREFIX}/song`, params })
}

/**
 * 添加音乐
 */
export const reqCreateMusic = (data: CreateMusicParams) => {
	return request.post<IBaseType<string>>({ url: `${PREFIX}/song`, data })
}

/**
 * 编辑音乐
 */
export const reqEditMusic = (data: MusicItem) => {
	return request.put<IBaseType<string>>({ url: `${PREFIX}/song`, data })
}

/**
 * 删除音乐
 */
export const reqDeleteMusic = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/song/${id}` })
}
