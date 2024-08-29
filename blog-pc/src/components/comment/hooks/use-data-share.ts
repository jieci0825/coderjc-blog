import { computed, reactive } from 'vue'
import type { CommentItem } from '@/apis/modules/comment/type'
import type { EBlogRank } from '@/typings'

interface DataShareParams {
	sort?: EBlogRank // 评论排序
	curCommentItem?: null | CommentItem // 当前选中的评论
}

const state = reactive<DataShareParams>({})

export function useDataShare() {
	const setValue = (key: keyof DataShareParams, value: any) => {
		state[key] = value
	}

	const getValue = (key: keyof DataShareParams, isComputed: boolean = true): any => {
		if (!isComputed) return state[key]
		return computed(() => state[key]).value
	}

	return { setValue, getValue }
}
