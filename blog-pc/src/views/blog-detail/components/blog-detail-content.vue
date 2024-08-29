<script setup lang="ts">
import { formatTime } from '@/utils'
import type { BlogDetailContentEmits, BlogDetailContentProps } from '../types'

const props = defineProps<BlogDetailContentProps>()
const emits = defineEmits<BlogDetailContentEmits>()
</script>

<template>
	<div class="content-wrap">
		<div class="header">
			<h1 class="title">{{ props.blogInfo.title }}</h1>
			<div class="info">
				<div class="show-item">
					<span class="iconfont icon-time"></span>
					<span class="value">{{ formatTime(props.blogInfo.date) }}</span>
				</div>
				<div
					@click="emits('like')"
					:class="[props.blogInfo.isLike ? 'active' : '']"
					class="show-item">
					<span
						:class="[props.blogInfo.isLike ? 'icon-like2-full' : 'icon-like2']"
						class="iconfont"></span>
					<span class="value">{{ props.blogInfo.likeNums }}</span>
				</div>
				<div class="show-item">
					<span class="iconfont icon-view"></span>
					<span class="value">{{ props.blogInfo.lookNums }}</span>
				</div>
			</div>
		</div>
		<div
			v-html="props.blogInfo.htmlContent"
			class="main markdown-body"></div>
	</div>
</template>

<style scoped lang="less">
.content-wrap {
	padding: 20px;
	width: 100%;
	border: 1px solid var(--border-color);
	border-radius: var(--base-b-r);
	margin-left: auto;
	margin-bottom: 20px;
	@media (max-width: @size-xs) {
		width: 100%;
		border: none;
		border-bottom: 1px solid var(--border-color);
		border-radius: 0;
		.markdown-body {
			font-size: 16px;
			line-height: 1.4;
		}
		.markdown-body pre {
			font-size: 12px !important;
		}
	}
	.header {
		margin-bottom: 30px;
		.title {
			margin-bottom: 10px;
			color: var(--el-text-color-primary);
		}
		.info {
			display: flex;
			margin-bottom: 10px;
			color: var(--el-text-color-placeholder);
			gap: 10px;
			font-size: 16px;
			.show-item {
				display: flex;
				gap: 5px;
				&.active {
					color: var(--primary-color);
					.iconfont {
						color: var(--primary-color);
					}
				}
				.value {
					vertical-align: bottom;
				}
			}
		}
	}
}
</style>
