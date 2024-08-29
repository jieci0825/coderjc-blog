<script setup lang="ts">
import JcDrawer from '@/components/jc-drawer'
import CommentDetail from './comment-detail.vue'
import commentSearchFormConfig from '../config/comment-search-form.config'
import commentTableConfig from '../config/comment-table.config'
import { commentApi } from '@/apis'
import { EComment, ECommentSubjectType } from '@/typings'
import { Delete, View } from '@element-plus/icons-vue'
import { openDeleteMessageBox } from '@/utils'
import { useRefs } from '@/hooks/use-refs'
import type { CommentItem } from '@/apis/modules/comment/type'
import type { IPageContent } from '@/hooks'
import type { CommentChildProps } from '../types'
import { ref } from 'vue'

const props = defineProps<CommentChildProps>()

const { refs, setRef } = useRefs()

const handleDeleteParentComment = async (row: CommentItem) => {
	await openDeleteMessageBox()
	const resp = await commentApi.reqDeleteComment({ id: row.id, type: EComment.CHILD })
	ElMessage.success(resp.msg)
	refs.commentChildPageContentRef?.search()
}

const curParentComment = ref<CommentItem>()
const commentDetailVisible = ref(false)
const handleViewCommentDetail = (row: CommentItem) => {
	curParentComment.value = row
	commentDetailVisible.value = true
}

const usePageContent: IPageContent = {
	request: commentApi.reqGetChildCommentList,
	queryParams: { parentId: props.parentId }
}
</script>

<template>
	<div class="comment-container container">
		<PageContent
			:ref="setRef('commentChildPageContentRef')"
			:is-action="false"
			:use-page-content="usePageContent"
			:form-config="commentSearchFormConfig"
			:tableConfig="commentTableConfig">
			<template #nickname="{ row }">
				<span>{{ row.userInfo.nickname }}</span>
			</template>
			<template #subjectType>
				<el-tag
					v-if="props.subjectType === ECommentSubjectType.BLOG_COMMENT"
					type="success"
					>博客评论</el-tag
				>
				<el-tag
					v-else-if="props.subjectType === ECommentSubjectType.SITE_MESSAGE"
					type="warning"
					>站点留言</el-tag
				>
			</template>
			<template #operate="{ row }">
				<el-button
					@click="handleViewCommentDetail(row)"
					:icon="View"
					type="primary"
					size="small"
					plain>
					查看详情
				</el-button>
				<el-button
					@click="handleDeleteParentComment(row)"
					:icon="Delete"
					type="danger"
					size="small"
					plain>
					删除
				</el-button>
			</template>
		</PageContent>

		<JcDrawer
			title="评论详情"
			width="600px"
			v-model="commentDetailVisible"></JcDrawer>

		<JcDrawer
			v-model="commentDetailVisible"
			title="子级评论详情"
			size="600">
			<CommentDetail
				:id="curParentComment!.id"
				:type="EComment.CHILD"></CommentDetail>
		</JcDrawer>
	</div>
</template>

<style scoped lang="less"></style>
