import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { CommentItem, GetParentCommentListParams, CommentDetail, GetCommentDetailParams } from './type.ts'

const PREFIX = '/comment'

/**
 * 获取父级评论列表
 */
export const reqGetParentCommentList = (params: GetParentCommentListParams) => {
	return request.get<IBaseListType<CommentItem>>({ url: `${PREFIX}/parent`, params })
}

/**
 * 获取子级评论列表
 */
export const reqGetChildCommentList = (params: GetParentCommentListParams) => {
	return request.get<IBaseListType<CommentItem>>({ url: `${PREFIX}/child`, params })
}

/**
 * 获取评论详情
 */
export const reqGetCommentDetail = (params: GetCommentDetailParams) => {
	return request.get<IBaseType<CommentDetail>>({ url: `${PREFIX}/detail`, params })
}

/**
 * 删除评论
 */
export const reqDeleteComment = (params: GetCommentDetailParams) => {
	return request.delete<IBaseType<CommentDetail>>({ url: `${PREFIX}/delete`, params })
}
