import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { LikeParams } from './type.ts'

/**
 * 点赞
 */
export async function reqLike(data: LikeParams) {
	return request.post<IBaseType<string>>({ url: '/behavior/like', data })
}

/**
 * 取消点赞
 */
export async function reqCancelLike(data: LikeParams) {
	return request.post<IBaseType<string>>({ url: '/behavior/unlike', data })
}
