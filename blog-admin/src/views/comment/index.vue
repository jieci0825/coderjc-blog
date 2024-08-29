<script setup lang="ts">
import JcDialog from '@/components/jc-dialog'
import JcDrawer from '@/components/jc-drawer'
import CommentChild from './components/comment-child.vue'
import CommentDetail from './components/comment-detail.vue'
import commentSearchFormConfig from './config/comment-search-form.config'
import commentTableConfig from './config/comment-table.config'
import { commentApi } from '@/apis'
import { EComment, ECommentSubjectType } from '@/typings'
import { Delete, View, ChatDotSquare } from '@element-plus/icons-vue'
import { openDeleteMessageBox } from '@/utils'
import { useRefs } from '@/hooks/use-refs'
import { ref } from 'vue'
import type { CommentItem } from '@/apis/modules/comment/type'
import type { IPageContent } from '@/hooks'

const { refs, setRef } = useRefs()

const handleDeleteParentComment = async (row: CommentItem) => {
	await openDeleteMessageBox()
	const resp = await commentApi.reqDeleteComment({ id: row.id, type: EComment.PARENT })
	ElMessage.success(resp.msg)
	refs.commentPageContentRef?.search()
}

const childCommentVisible = ref(false)
const curParentComment = ref<CommentItem>()
const handleViewChildComment = (row: CommentItem) => {
	curParentComment.value = row
	childCommentVisible.value = true
}

const commentDetailVisible = ref(false)
const handleViewCommentDetail = (row: CommentItem) => {
	curParentComment.value = row
	commentDetailVisible.value = true
}

const usePageContent: IPageContent = {
	request: commentApi.reqGetParentCommentList,
	pageSize: 20
}
</script>

<template>
	<div class="comment-container container">
		<PageContent
			:ref="setRef('commentPageContentRef')"
			:is-action="false"
			:use-page-content="usePageContent"
			:form-config="commentSearchFormConfig"
			:tableConfig="commentTableConfig">
			<template #nickname="{ row }">
				<span>{{ row.userInfo.nickname }}</span>
			</template>
			<template #subjectType="{ row }">
				<el-tag :type="row.subjectType === ECommentSubjectType.BLOG_COMMENT ? 'success' : 'warning'">
					{{ row.subjectType === ECommentSubjectType.BLOG_COMMENT ? '博客评论' : '站点留言' }}
				</el-tag>
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
					@click="handleViewChildComment(row)"
					:icon="ChatDotSquare"
					type="primary"
					size="small"
					plain>
					查看子评论
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

		<JcDialog
			v-model="childCommentVisible"
			width="70%"
			title="子评论">
			<CommentChild
				:parent-id="curParentComment!.id"
				:subject-type="curParentComment!.subjectType"></CommentChild>
		</JcDialog>

		<JcDrawer
			v-model="commentDetailVisible"
			title="父级评论详情"
			size="600">
			<CommentDetail
				:id="curParentComment!.id"
				:type="EComment.PARENT"></CommentDetail>
		</JcDrawer>
	</div>
</template>

<style scoped lang="less"></style>
