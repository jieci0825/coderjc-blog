<script setup lang="ts">
import Comment from '@/components/comment'
import CommentPublish, { type FileItem } from '@/components/comment-publish'
import { behaviorApi, commentApi, globalApi } from '@/apis'
import { ref, watch } from 'vue'
import { uploadFile } from '@/cos'
import { useUserGetters } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { EBlogRank, ECommentType, type SubjectType, type BlogRankType } from '@/typings'
import type { GetParentCommentListParams, CommentItem, PublishParentCommentParams } from '@/apis/modules/comment/type'
import type { LikeParams } from '@/apis/modules/behavior/type'

const { getCurUserInfo, isLogin } = useUserGetters()
const route = useRoute()
const router = useRouter()

const goToLogin = () => {
	if (isLogin.value) return
	router.push({ path: '/login', query: { redirect: route.fullPath } })
}

const isMoreComment = ref(true)
const commentSort = ref<BlogRankType>(EBlogRank.HOT)
const total = ref(0)

const queryParentCommentCondition = ref<GetParentCommentListParams>({
	subjectId: +route.params.id,
	subjectType: ECommentType.BLOG_COMMENT,
	sort: commentSort.value,
	page: 1,
	pageSize: 5
})

watch(
	() => commentSort.value,
	() => {
		queryParentCommentCondition.value.sort = commentSort.value
		queryParentCommentCondition.value.page = 1
		parentComment.value = []
		isMoreComment.value = true
		getParentComment()
	}
)

// 获取父级评论列表
const parentComment = ref<CommentItem[]>([])
async function getParentComment() {
	if (!isMoreComment.value) return
	const resp = await commentApi.reqGetParentCommentList(queryParentCommentCondition.value)
	if (resp.data.list.length < queryParentCommentCondition.value.pageSize) {
		// 没有更多数据了
		isMoreComment.value = false
	}
	parentComment.value.push(...resp.data.list)
	total.value = resp.data.total
	queryParentCommentCondition.value.page++
}
getParentComment()

// 发布父级评论
const handlePublish = async (content: string, fileList: FileItem[]) => {
	const data: PublishParentCommentParams = {
		content,
		imageIds: '',
		subjectId: +route.params.id,
		subjectType: ECommentType.BLOG_COMMENT
	}

	if (fileList.length) {
		// 上传文件
		const uploadFileTasks = fileList.map(async item => {
			const fileResp = await uploadFile(item.raw)
			return fileResp
		})
		const uploadFileTaskResp = await Promise.all(uploadFileTasks)
		// 添加文件记录获取文件记录id
		const addFileIds = await globalApi.reqCreateFileRecord(uploadFileTaskResp)
		data.imageIds = addFileIds.data.join(',')
	}
	const resp = await commentApi.reqPublishParentComment(data)
	ElMessage.success(resp.msg)
	parentComment.value.unshift(resp.data)
}

const handleLike = async (payload: CommentItem, type: SubjectType) => {
	const data: LikeParams = { subjectId: payload.id, subjectType: type }
	if (payload.isLike) {
		await behaviorApi.reqLike(data)
	} else {
		await behaviorApi.reqCancelLike(data)
	}
}
</script>

<template>
	<div class="blog-comment-wrap">
		<div class="title">
			<span class="label">评论</span>
			<span class="value">{{ total }}</span>
		</div>
		<div
			class="top"
			v-if="isLogin">
			<div class="avatar-box">
				<img :src="getCurUserInfo?.avatarUrl" />
			</div>
			<CommentPublish @publish="handlePublish" />
		</div>
		<div
			class="top tip-wrap"
			v-else>
			<el-button
				@click="goToLogin"
				type="primary"
				plain
				>登录</el-button
			>
			<span class="tip">登录后发表评论</span>
		</div>
		<div class="bottom">
			<div class="sort-wrap">
				<span
					@click="commentSort = EBlogRank.HOT"
					:class="['sort-item', commentSort === EBlogRank.HOT ? 'active' : '']"
					>最热</span
				>
				<span class="divide">|</span>
				<span
					@click="commentSort = EBlogRank.LATEST"
					:class="['sort-item', commentSort === EBlogRank.LATEST ? 'active' : '']"
					>最新</span
				>
			</div>
			<Comment
				@like="handleLike"
				:comment-list="parentComment"
				:sort="commentSort"
				:total="total" />
			<div
				@click="getParentComment"
				v-if="isMoreComment"
				class="more-wrap">
				<span>加载更多评论</span>
			</div>
			<div
				v-else
				class="more-wrap">
				<span>没有更多了</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.blog-comment-wrap {
	width: 100%;
	border: 1px solid var(--border-color);
	border-radius: var(--base-b-r);
	padding: 20px;
	margin-bottom: 20px;
	@media (max-width: @size-xs) {
		padding: 10px;
		border: none;
		border-top: 1px solid var(--border-color);
		border-radius: 0;
	}
	.title {
		margin-bottom: 20px;
		.label {
			font-size: 20px;
			margin-right: 10px;
		}
		.value {
			font-size: 18px;
		}
	}
	.top {
		width: 100%;
		display: flex;
		.avatar-box {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			flex-shrink: 0;
			margin-right: 20px;
			border: 1px solid var(--border-color);
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			span {
				color: var(--el-text-color-placeholder);
				font-weight: bold;
			}
		}
		@media (max-width: @size-xs) {
			.avatar-box {
				width: 40px;
				height: 40px;
				margin-right: 10px;
			}
		}
		&.tip-wrap {
			flex-direction: column;
			align-items: center;
			.tip {
				width: 100%;
				padding: 10px 0;
				text-align: center;
				font-size: 24px;
				color: var(--primary-color);
				font-weight: bold;
			}
		}
	}
	.bottom {
		width: 100%;
		margin-top: 20px;
		.sort-wrap {
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			.sort-item {
				cursor: pointer;
				font-size: 18px;
				&.active {
					color: var(--primary-color);
				}
			}
			.divide {
				margin: 0 3px;
				color: var(--el-text-color-placeholder);
			}
		}
		.more-wrap {
			margin-top: 20px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--bg-color-1);
			border-radius: var(--base-b-r);
			padding: 15px 0;
			transition: var(--color-transition);
			cursor: pointer;
			&:hover {
				color: var(--primary-color);
			}
		}
	}
}
</style>
