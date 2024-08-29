import request from '@/apis/request'
import type {
	PublishParentCommentParams,
	CommentItem,
	GetParentCommentListParams,
	GetChildCommentListParams,
	PublishChildCommentParams
} from './type.ts'
import type { IBaseListType, IBaseType } from '../types'

/**
 * 发布父级评论
 */
export function reqPublishParentComment(data: PublishParentCommentParams) {
	return request.post<IBaseType<CommentItem>>({ url: '/comment/publish-parent', data })
}

/**
 * 发布子级评论
 */
export function reqPublishChildComment(data: PublishChildCommentParams) {
	return request.post<IBaseType<CommentItem>>({ url: '/comment/publish-child', data })
}

/**
 * 获取父级评论列表
 */
export function reqGetParentCommentList(params: GetParentCommentListParams) {
	return request.get<IBaseListType<CommentItem>>({ url: '/comment/parent', params })
}

/**
 * 获取子级评论列表
 */
export function reqGetChildCommentList(params: GetChildCommentListParams) {
	return request.get<IBaseType<CommentItem[]>>({ url: '/comment/child', params })
}
