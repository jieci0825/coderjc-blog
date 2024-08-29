import type { InjectionKey } from 'vue'
import type { FileItem } from '@/components/comment-publish'
import type { CommentItem } from '@/apis/modules/comment/type'
import type { SubjectType } from '@/typings'

interface CommentKey {
	signText: string
	publishChildComment: (
		content: string,
		fileList: FileItem[],
		parentId: number,
		replyId: number,
		callback: Function
	) => void
	handleLike: (payload: CommentItem, type: SubjectType) => void
}

export const CommentKey: InjectionKey<CommentKey> = Symbol('CommentKey')
