import type { CommentType, BlogRankType } from '@/typings'
import type { IPageParams } from '../types'

export interface PublishParentCommentParams {
	content: string
	imageIds?: string
	subjectId: number
	subjectType: CommentType
}

export interface PublishChildCommentParams {
	content: string
	imageIds?: string
	parentId: number
	replyId: number
}

export interface GetParentCommentListParams extends IPageParams {
	subjectId: number
	subjectType: CommentType
	sort: BlogRankType
}

export interface GetChildCommentListParams extends IPageParams {
	sort: BlogRankType
	parentId: number
}

interface UserItem {
	id: number
	nickname: string
	avatarUrl: string
	sign?: string
}

export interface CommentItem {
	id: number
	content: string
	datetime: string
	imageList: { id: number; url: string }[]
	likeNums: number
	userInfo: UserItem
	childCommentNums?: number
	parentId: number
	isLike: boolean
	replyUserInfo: UserItem | null
	children: CommentItem[]
}
