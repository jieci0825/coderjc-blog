import { piniaBlogStore } from '../modules/blog'
import { computed } from 'vue'
import { blogApi } from '@/apis'
import type { GetBlogListParams } from '@/apis/modules/blog/type'

export const useBlogGetters = () => {
	const blogStore = piniaBlogStore()

	const queryBlogListState = computed(() => blogStore.queryBlogListState)

	return {
		queryBlogListState
	}
}

export const useBlogActions = () => {
	const { setQueryBlogListState } = piniaBlogStore()

	// 获取查询的博客列表
	const getQueryBlogList = (
		condition: GetBlogListParams = {
			page: 1,
			pageSize: 20,
			title: ''
		}
	) => {
		setTimeout(async () => {
			if (condition.title === undefined || !condition.title.length) return setQueryBlogListState([])

			const resp = await blogApi.reqGetBlogList(condition)
			setQueryBlogListState(resp.data.list)
		}, 0)
	}

	// 清空搜索blog列表
	const clearQueryBlogList = () => setQueryBlogListState([])

	return {
		getQueryBlogList,
		clearQueryBlogList
	}
}
