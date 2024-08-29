import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type {
	FriendChainCategoryItem,
	CreateFriendChainCategoryParams,
	EditFriendChainCategoryParams,
	GetFriendChainLinkListParams,
	CreateFriendChainLinkParams,
	FriendChainLinkItem
} from './type.ts'

const PREFIX = '/friend-chain'

/**
 * 获取友人链分类列表
 */
export const reqGetFriendChainCategoryList = () => {
	return request.get<IBaseType<FriendChainCategoryItem[]>>({ url: `${PREFIX}/category` })
}

/**
 * 添加友人链分类
 */
export const reqCreateFriendChainCategory = (data: CreateFriendChainCategoryParams) => {
	return request.post<IBaseType<string>>({ url: `${PREFIX}/category`, data })
}

/**
 * 编辑友人链分类
 */
export const reqEditFriendChainCategory = (data: EditFriendChainCategoryParams) => {
	return request.put<IBaseType<string>>({ url: `${PREFIX}/category`, data })
}

/**
 * 删除友人链分类
 */
export const reqDeleteFriendChainCategory = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/category/${id}` })
}

/**
 * 获取链接列表
 */
export const reqGetFriendChainLinkList = (params: GetFriendChainLinkListParams) => {
	return request.get<IBaseListType<FriendChainLinkItem>>({ url: `${PREFIX}/link`, params })
}

/**
 * 添加链接
 */
export const reqCreateFriendChainLink = (data: CreateFriendChainLinkParams) => {
	return request.post<IBaseType<string>>({ url: `${PREFIX}/link`, data })
}

/**
 * 编辑链接
 */
export const reqEditFriendChainLink = (data: FriendChainLinkItem) => {
	return request.put<IBaseType<string>>({ url: `${PREFIX}/link`, data })
}

/**
 * 删除链接
 */
export const reqDeleteFriendChainLink = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/link/${id}` })
}
