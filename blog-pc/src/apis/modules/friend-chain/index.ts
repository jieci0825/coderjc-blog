import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { FriendChainItem } from './type'

/**
 * 获取友链列表
 */
export const reqGetFriendChainList = () => {
	return request.get<IBaseType<FriendChainItem[]>>({ url: '/friend-chain' })
}
