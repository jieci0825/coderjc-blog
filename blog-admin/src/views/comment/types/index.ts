import type { CommentType } from '@/typings'

export interface CommentChildProps {
	parentId: number
	subjectType: number
}

export interface CommentDetailProps {
	id: number
	type: CommentType
}
