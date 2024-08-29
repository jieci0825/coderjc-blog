<script setup lang="ts">
import CommentPublish, { FileItem } from '@/components/comment-publish'
import Sign from './sign.vue'
import { ref, inject, watch } from 'vue'
import { CommentItemProps, CommentNode } from './comment'
import { commentApi } from '@/apis'
import { CommentKey } from './constants'
import { useDataShare } from '../hooks/use-data-share'
import { useUserGetters } from '@/store'
import { ESubjectType, type SubjectType } from '@/typings'
import type { CommentItem, GetChildCommentListParams } from '@/apis/modules/comment/type'

defineOptions({ name: 'CommentItem' })

const props = withDefaults(defineProps<CommentItemProps>(), {})
const commentInject = inject(CommentKey, undefined)

const commentNode = ref<CommentNode>()

watch(
	() => props.commentItem,
	() => {
		commentNode.value = { ...props.commentItem, isMoreChildren: !!props.commentItem.childCommentNums }
	},
	{ deep: true, immediate: true }
)

const { getValue, setValue } = useDataShare()

const isShowReply = function (value: CommentItem) {
	return getValue('curCommentItem') === value
}

const { isLogin } = useUserGetters()
// 打开回复框
const openReplyBox = (item: CommentItem) => {
	if (!isLogin.value) {
		ElMessage.warning('请先登录')
		return
	}
	setValue('curCommentItem', item)
}
// 关闭回复框
const closeReplyBox = () => {
	setValue('curCommentItem', null)
}

// 子级评论查询条件
const queryParentCommentCondition = ref<GetChildCommentListParams>({
	sort: getValue('sort')!,
	page: 1,
	pageSize: 5,
	parentId: props.parentId
})
const isExpandChildComment = ref(false)
// 获取子级评论
async function getChildComment() {
	if (!commentNode.value?.isMoreChildren) {
		return
	}
	const resp = await commentApi.reqGetChildCommentList(queryParentCommentCondition.value)
	if (!resp.data || resp.data.length < queryParentCommentCondition.value.pageSize) {
		commentNode.value.isMoreChildren = false
	}
	queryParentCommentCondition.value.page++
	commentNode.value.children.push(...resp.data)
}

// 展开子级评论
const openChildComment = async () => {
	isExpandChildComment.value = true
	getChildComment()
}
// 关闭子级评论
const closeChildComment = () => {
	isExpandChildComment.value = false
	commentNode.value!.children = []
}
// 加载更多子级评论
const loadMoreChildComment = async () => {
	getChildComment()
}

// 发布子级评论
const publishChildComment = (
	content: string,
	fileList: FileItem[],
	parentId: number,
	replyId: number,
	index: number = 0
) => {
	const callback = (payload: CommentItem) => {
		// 根据索引插入指定位置，此处新增一个缓存之后改动了数组，所以索引 + 1
		commentNode.value?.children.splice(index + 1, 0, payload)
		if (typeof commentNode.value?.childCommentNums === 'number') {
			commentNode.value!.childCommentNums++
		}
		isExpandChildComment.value = true
	}
	commentInject?.publishChildComment(content, fileList, parentId, replyId, callback)
	setValue('curCommentItem', null)
}

const handleLike = (item: CommentItem, type: SubjectType) => {
	if (!isLogin.value) return ElMessage.warning('请先登录')
	item.isLike = !item.isLike
	item.isLike ? item.likeNums++ : item.likeNums--
	commentInject?.handleLike(item, type)
}
</script>

<template>
	<div class="comment-item">
		<div class="avatar-box">
			<img :src="commentNode?.userInfo.avatarUrl" />
		</div>
		<div class="info-box">
			<div class="info-header">
				<!-- username -->
				<div class="username">{{ commentNode?.userInfo.nickname }}</div>
				<Sign :user-id="commentNode?.userInfo.id!" />
			</div>
			<div class="datetime-xs">{{ commentNode?.datetime }}</div>
			<div class="info-main">
				<p class="content">{{ commentNode?.content }}</p>
				<div
					v-if="commentNode?.imageList.length"
					class="image-list">
					<div
						v-for="image in commentNode?.imageList"
						:key="image.id"
						class="image-item">
						<el-image
							:src="image.url"
							:preview-src-list="[image.url]"
							style="width: 100%; height: 100%"
							fit="cover" />
					</div>
				</div>
			</div>
			<div class="info-actions">
				<div class="datetime">{{ commentNode?.datetime }}</div>
				<div
					@click="handleLike(commentNode!, ESubjectType.PARENT_COMMENT)"
					:class="[commentNode?.isLike ? 'active' : '']"
					class="like">
					<span
						:class="[commentNode?.isLike ? 'icon-like2-full' : 'icon-like2']"
						class="iconfont"></span>
					<span class="text">{{ commentNode?.likeNums || '点赞' }}</span>
				</div>
				<div
					@click="closeReplyBox()"
					v-if="isShowReply(commentNode!)"
					class="reply active">
					<span class="iconfont icon-comment-full"></span>
					<span class="text">取消回复</span>
				</div>
				<div
					@click="openReplyBox(commentNode!)"
					v-else
					class="reply">
					<span class="iconfont icon-comment"></span>
					<span class="text">回复</span>
				</div>
			</div>
			<!-- 回复区-回复楼主 -->
			<CommentPublish
				@publish="(a, b) => publishChildComment(a, b, commentNode?.id!, 0, 0)"
				v-if="commentNode === getValue('curCommentItem')"
				:placeholder="`回复 @${commentNode?.userInfo.nickname}`" />
			<!-- 子级评论区域 -->
			<div
				class="child-comment-area"
				v-if="isExpandChildComment">
				<div
					class="child-comment-item"
					v-for="(item, index) in commentNode?.children"
					:key="item.id">
					<div class="child-left">
						<div class="avatar-box">
							<img :src="item.userInfo.avatarUrl" />
						</div>
					</div>
					<div class="child-right">
						<!-- content -->
						<div class="child-right-content">
							<!-- reply -->
							<div
								class="reply-wrap"
								v-if="item?.replyUserInfo">
								<span class="username">{{ item.userInfo.nickname }}</span>
								<Sign :user-id="item.userInfo.id" />
								<span class="divide-text">回复</span>
								<span class="username active">@{{ item?.replyUserInfo.nickname }}</span>
								<Sign :user-id="item.replyUserInfo.id" />
							</div>
							<div class="datetime-xs">{{ item?.datetime }}</div>
							<p>{{ item.content }}</p>
							<div
								v-if="item?.imageList.length"
								class="image-list">
								<div
									v-for="image in item?.imageList"
									:key="image.id"
									class="image-item">
									<el-image
										:src="image.url"
										:preview-src-list="[image.url]"
										style="width: 100%; height: 100%"
										fit="cover" />
								</div>
							</div>
						</div>
						<div class="info-actions">
							<div class="datetime">{{ item?.datetime }}</div>
							<div
								@click="handleLike(item, ESubjectType.CHILD_COMMENT)"
								:class="[item?.isLike ? 'active' : '']"
								class="like">
								<span
									:class="[item?.isLike ? 'icon-like2-full' : 'icon-like2']"
									class="iconfont"></span>
								<span class="text">{{ item?.likeNums || '点赞' }}</span>
							</div>
							<div
								@click="closeReplyBox()"
								v-if="isShowReply(item)"
								class="reply active">
								<span class="iconfont icon-comment-full"></span>
								<span class="text">取消回复</span>
							</div>
							<div
								@click="openReplyBox(item)"
								v-else
								class="reply">
								<span class="iconfont icon-comment"></span>
								<span class="text">回复</span>
							</div>
						</div>
						<!-- 子级回复-回复楼主下的其他评论 -->
						<CommentPublish
							@publish="(a, b) => publishChildComment(a, b, commentNode?.id!, item.id, index)"
							v-if="item === getValue('curCommentItem')"
							:placeholder="`回复 @${item?.userInfo.nickname}`" />
					</div>
				</div>
			</div>
			<!-- 展开、收起子级评论 -->
			<div
				class="footer"
				v-if="commentNode?.childCommentNums">
				<div
					v-if="!isExpandChildComment"
					class="show-item">
					<span
						>共<span style="margin: 0 3px">{{ commentNode.childCommentNums }}</span
						>条回复，</span
					>
					<span
						class="active"
						@click="openChildComment"
						>点击查看</span
					>
				</div>
				<div
					v-else
					class="show-item">
					<span
						v-if="commentNode.isMoreChildren"
						class="active"
						@click="loadMoreChildComment"
						>加载更多</span
					>
					<span v-else>没有更多了</span>
					<div class="divide"></div>
					<span
						class="active"
						@click="closeChildComment"
						>收起</span
					>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.comment-item {
	display: flex;
	padding: 12px 0;
	.image-list {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		.image-item {
			margin: 0 10px 10px 0;
			width: 120px;
			height: 90px;
			border: 1px solid var(--border-color);
			border-radius: var(--base-b-r);
			overflow: hidden;
		}
	}
	.avatar-box {
		flex-shrink: 0;
		margin-right: 10px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid var(--border-color);
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.info-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 5px;
		.info-header {
			display: flex;
			align-items: center;
			.username {
				font-size: 18px;
				color: var(--el-text-color-secondary);
				margin-right: 2px;
			}
		}
		.info-main {
			.content {
				font-size: 16px;
				color: var(--el-text-color-primary);
				line-height: 1.4;
			}
		}
		.datetime-xs {
			display: none;
			font-size: 13px;
			color: var(--el-text-color-placeholder);
			@media (max-width: @size-xs) {
				display: block;
			}
		}
		.info-actions {
			user-select: none;
			display: flex;
			align-items: flex-end;
			gap: 20px;
			color: var(--el-text-color-placeholder);
			@media (max-width: @size-xs) {
				gap: 10px;
				font-size: 14px;
			}
			.datetime {
				display: block;
				@media (max-width: @size-xs) {
					display: none;
				}
			}
			.iconfont {
				font-size: inherit;
			}
			.datetime {
				font-size: 13px;
			}
			.like,
			.reply {
				cursor: pointer;
				&:hover {
					color: var(--primary-color);
				}
				&.active {
					color: var(--primary-color);
				}
				.iconfont {
					margin-right: 3px;
				}
				.text {
					font-size: 14px;
				}
			}
		}
		.child-comment-area {
			width: 100%;
			.child-comment-item {
				width: 100%;
				display: flex;
				padding: 12px 0;
				.child-left {
					flex-shrink: 0;
					.avatar-box {
						width: 30px;
						height: 30px;
						margin-right: 5px;
					}
				}
				.child-right {
					flex: 1;
					.reply-wrap {
						flex-shrink: 0;
						display: flex;
						align-items: center;
						margin-right: 10px;
						margin-bottom: 5px;
						.divide-text {
							margin: 0 5px;
						}
						.username {
							color: var(--el-text-color-secondary);
							&.active {
								color: var(--primary-color);
							}
						}
					}
					.child-right-content {
						color: var(--el-text-color-primary);
						margin-bottom: 5px;
						p {
							margin-top: 6px;
							line-height: 1.4;
						}
					}
				}
			}
		}
		.footer {
			margin-top: 10px;
			width: 100%;
			.show-item {
				display: flex;
				align-items: center;
				font-size: 14px;
				color: var(--el-text-color-regular);
				.active {
					cursor: pointer;
					&:hover {
						color: var(--primary-color);
					}
				}
				.divide {
					margin: 0 8px;
					width: 1px;
					height: 12px;
					background-color: var(--border-color);
				}
			}
		}
	}
}
</style>
