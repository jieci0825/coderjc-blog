import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BlogItem } from '@/apis/modules/blog/type'

export const piniaBlogStore = defineStore('blog', () => {
	const queryBlogListState = ref<BlogItem[]>([])
	const setQueryBlogListState = (data: BlogItem[]) => {
		queryBlogListState.value = data
	}

	return {
		queryBlogListState,
		setQueryBlogListState
	}
})
