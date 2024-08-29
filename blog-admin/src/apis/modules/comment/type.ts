import type { UserItem } from '@/apis/modules/user/type'
import type { IPageParams } from '../types'
import type { CommentSubjectType, CommentType } from '@/typings'

export interface GetParentCommentListParams extends IPageParams {
	content: string
	nickname: string
	subjectType: CommentSubjectType
}

export interface CommentItem {
	id: number
	content: string
	datetime: string
	likeNums: number
	childCommentNums?: number
	parentId?: number
	subjectType: CommentSubjectType
	subjectId: number
	userInfo: UserItem
}

export interface CommentDetail extends CommentItem {
	imageList: { url: string; id: number }[]
}

export interface GetCommentDetailParams {
	id: number
	type: CommentType
}
