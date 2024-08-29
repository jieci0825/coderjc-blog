<script setup lang="ts">
import CommentItem from './comment-item.vue'
import { computed, provide, watchEffect } from 'vue'
import { CommentKey } from './constants'
import { useDataShare } from '../hooks/use-data-share'
import { commentApi, globalApi } from '@/apis'
import { uploadFile } from '@/cos'
import { debounce } from '@/utils'
import type { CommentEmits, CommentProps } from './comment'
import type { PublishChildCommentParams } from '@/apis/modules/comment/type'
import type { FileItem } from '@/components/comment-publish'
import type { CommentItem as CommentItemType } from '@/apis/modules/comment/type'
import type { SubjectType } from '@/typings'

defineOptions({ name: 'Comment' })

const props = withDefaults(defineProps<CommentProps>(), {
	commentList: () => [],
	total: 0,
	emptyText: '空空如也，空空如也',
	signText: '站主'
})
const emits = defineEmits<CommentEmits>()

const isEmpty = computed(() => props.commentList.length === 0)

const { setValue } = useDataShare()
watchEffect(() => {
	setValue('sort', props.sort)
})

const publishChildComment = async (
	content: string,
	fileList: FileItem[],
	parentId: number,
	replyId: number,
	callback: Function
) => {
	if (!content.length) return
	const data: PublishChildCommentParams = { content, imageIds: '', parentId, replyId }
	if (fileList.length) {
		const uploadFileTasks = fileList.map(async item => {
			const fileResp = await uploadFile(item.raw)
			return fileResp
		})
		const uploadFileTaskResp = await Promise.all(uploadFileTasks)
		const addFileIds = await globalApi.reqCreateFileRecord(uploadFileTaskResp)
		data.imageIds = addFileIds.data.join(',')
	}
	const resp = await commentApi.reqPublishChildComment(data)
	ElMessage.success(resp.msg)
	callback(resp.data)
}

const dSendLikeEmit = debounce((payload: CommentItemType, type: SubjectType) => {
	emits('like', payload, type)
}, 300)

const handleLike = (payload: CommentItemType, type: SubjectType) => {
	dSendLikeEmit(payload, type)
}

provide(CommentKey, {
	signText: props.signText,
	publishChildComment,
	handleLike
})
</script>

<template>
	<div class="comment-wrap">
		<div
			v-if="isEmpty"
			class="empty-tip">
			<div class="iconfont icon-empty-data"></div>
			<span>{{ props.emptyText }}</span>
		</div>
		<div
			v-else
			class="comment-list">
			<div
				v-for="item in props.commentList"
				:key="item.id"
				class="comment-item-wrap">
				<!-- 评论项 -->
				<CommentItem
					@reply="publishChildComment"
					:parent-id="item.id"
					:comment-item="item" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.comment-wrap {
	width: 100%;
	.comment-list {
		width: 100%;
		.comment-item-wrap {
			width: 100%;
		}
	}
	.empty-tip {
		text-align: center;
		width: 100%;
		font-size: 18px;
		color: var(--el-text-color-placeholder);
		.iconfont {
			margin-bottom: 10px;
			font-size: 50px;
			margin-right: 10px;
		}
	}
}
</style>
