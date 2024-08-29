<script setup lang="ts">
import { ref } from 'vue'
import { commentApi } from '@/apis'
import type { CommentDetail } from '@/apis/modules/comment/type'
import type { CommentDetailProps } from '../types'

const props = defineProps<CommentDetailProps>()

const detailData = ref<CommentDetail>()

const getCommentDetail = async () => {
	const resp = await commentApi.reqGetCommentDetail(props)
	detailData.value = resp.data
}
getCommentDetail()
</script>

<template>
	<div class="comment-detail-wrap">
		<div class="comment-item">
			<div class="title">评论内容</div>
			<div class="content">{{ detailData?.content }}</div>
		</div>
		<div class="comment-images comment-item">
			<div class="title">评论附图</div>
			<div class="content">
				<template v-if="detailData?.imageList.length">
					<div
						v-for="(item, idx) in detailData?.imageList"
						:key="item.id"
						class="image-item">
						<el-image
							:src="item.url"
							:initial-index="idx"
							:preview-src-list="detailData?.imageList.map(item => item.url)"
							style="width: 100%; height: 100%"
							fit="cover"></el-image>
					</div>
				</template>
				<template v-else>
					<span>暂无评论附图</span>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.comment-detail-wrap {
	width: 100%;
	.comment-item {
		width: 100%;
		margin-bottom: 20px;
		.title {
			font-size: 18px;
			font-weight: 600;
			margin-bottom: 10px;
			color: var(--el-text-color-primary);
		}
		.content {
			font-size: 16px;
			color: var(--el-text-color-regular);
		}
		&.comment-images {
			.content {
				display: flex;
				flex-wrap: wrap;
				.image-item {
					width: 150px;
					height: 150px;
					background-color: #eee;
					margin-right: 20px;
					margin-bottom: 20px;
					border-radius: 4px;
					overflow: hidden;
					border: 1px solid var(--border-color);
					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}
		}
	}
}
</style>
