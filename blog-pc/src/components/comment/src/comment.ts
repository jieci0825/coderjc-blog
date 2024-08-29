import type { CommentItem, PublishChildCommentParams } from '@/apis/modules/comment/type'
import type { BlogRankType, ESubjectType } from '@/typings'

export interface CommentProps {
	commentList: CommentItem[]
	total?: number
	emptyText?: string
	sort: BlogRankType
	signText?: string
}

export interface CommentEmits {
	(e: 'reply', payload: PublishChildCommentParams): void
	(e: 'like', payload: CommentItem, type: ESubjectType): void
}

export interface CommentItemProps {
	commentItem: CommentItem
	parentId: number
}

export interface CommentNode extends CommentItem {
	isMoreChildren: boolean
}

export interface SignProps {
	userId: number
}
