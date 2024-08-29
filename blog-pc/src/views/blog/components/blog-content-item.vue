<script setup lang="ts">
import { inject } from 'vue'
import { formatTime } from '@/utils'
import { BlogKey } from '../constants'
import type { BlogItem } from '@/apis/modules/blog/type'

const props = defineProps<{ itemData: BlogItem }>()

const blogInject = inject(BlogKey, undefined)
</script>

<template>
	<div class="content-item-wrap">
		<div class="title">
			<span @click="blogInject?.goToBlogDetail(props.itemData.id)">{{ props.itemData.title }}</span>
		</div>
		<div class="data-show">
			<div class="show-item">
				<span class="iconfont icon-comment"></span>
				<span class="value">{{ props.itemData.commentNums }}</span>
			</div>
			<div class="show-item">
				<span class="iconfont icon-time"></span>
				<span class="value">{{ formatTime(props.itemData.date) }}</span>
			</div>
			<div class="show-item">
				<span class="iconfont icon-view"></span>
				<span class="value">{{ props.itemData.lookNums }}</span>
			</div>
		</div>
		<div class="main">
			<div class="left">
				<p class="description">
					{{ props.itemData.description }}
				</p>
				<div class="read-more">
					<a
						:href="`/blog-detail/${props.itemData.id}`"
						target="_blank">
						<span>阅读全文...</span>
					</a>
				</div>
				<div class="tags">
					<el-tag
						type="primary"
						size="small"
						>{{ props.itemData.categoryName }}</el-tag
					>
					<el-tag
						v-for="tag in props.itemData.tags"
						:key="tag.id"
						type="info"
						size="small">
						{{ tag.tagName }}
					</el-tag>
				</div>
			</div>
			<div class="right">
				<!-- cover -->
				<div class="cover">
					<el-image
						style="width: 100%; height: 100%"
						:src="props.itemData.previewUrl"
						:zoom-rate="1.2"
						:max-scale="7"
						:min-scale="0.2"
						:preview-src-list="[props.itemData.previewUrl]"
						:initial-index="4"
						fit="cover" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.content-item-wrap {
	width: 100%;
	margin-top: 10px;
	padding: 15px 0;
	border-bottom: 1px solid var(--border-color);
	display: flex;
	flex-direction: column;
	&:nth-child(1) {
		margin-top: 0;
	}
	a {
		text-decoration: none;
	}
	.title {
		margin: 0 auto;
		text-align: center;
		color: var(--primary-color);
		cursor: pointer;
		text-align: center;
		position: relative;
		font-size: 22px;
		font-weight: bold;
		text-decoration: none;
		padding: 0 30px;
		&:hover::before {
			transform: translate3d(10px, -7px, 0);
			opacity: 1;
		}
		&:hover::after {
			transform: translate3d(-10px, 7px, 0);
			opacity: 1;
		}
		&::before,
		&::after {
			content: '';
			position: absolute;
			width: 10px;
			height: 10px;
			opacity: 0;
			border: 2px solid;
			transition: 0.3s;
			transition-timing-function: cubic-bezier(0.17, 0.67, 0.05, 1.29);
		}
		&::before {
			top: 0;
			left: 0;
			border-width: 2px 0 0 2px;
			transform: translate3d(25px, 0, 0);
		}
		&::after {
			right: 0;
			bottom: 0;
			border-width: 0 2px 2px 0;
			transform: translate3d(-25px, 0, 0);
		}
	}
	.data-show {
		margin: 20px 0 10px;
		display: flex;
		justify-content: center;
		gap: 20px;

		.show-item {
			display: flex;
			align-items: center;
			gap: 5px;
			color: var(--el-text-color-placeholder);
			font-size: 14px;
			.iconfont {
				font-size: 18px;
			}
		}
	}
	.main {
		width: 100%;
		display: flex;
		.left {
			width: 100%;
			display: flex;
			flex-direction: column;
			.description {
				width: 100%;
				font-size: 16px;
				.more-omit(2);
				color: var(--el-text-color-regular);
			}
			.read-more {
				margin: 15px 0;
				font-weight: bold;
				cursor: pointer;
				span {
					color: var(--el-text-color-placeholder);
					transition: color 0.25s ease-in;
				}
				& span:hover {
					color: var(--el-text-color-regular);
				}
			}
			.tags {
				margin-top: auto;
				display: flex;
				align-items: center;
				gap: 10px;
				:deep(.el-tag__content) {
					font-size: 12px;
				}
				:deep(.el-tag) {
					cursor: pointer;
					border-radius: 2px;
				}
			}
		}
		.right {
			margin-left: auto;
			padding-left: 10px;
			.cover {
				width: 150px;
				height: 100px;
				border-radius: var(--base-b-r);
				overflow: hidden;
				border: 1px solid var(--border-color);
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
	}
}
</style>
