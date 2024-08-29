<script setup lang="ts">
import { formatTime } from '@/utils'
import { BlogKey } from '../constants'
import { inject } from 'vue'
import type { BlogItem } from '@/apis/modules/blog/type'

const props = defineProps<{ itemData: BlogItem }>()

const blogInject = inject(BlogKey, undefined)
</script>

<template>
	<div class="content-item-wrap">
		<div
			class="content-item"
			@click="blogInject?.goToBlogDetail(props.itemData.id)">
			<div class="title">{{ props.itemData.title }}</div>
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
			<div class="description">
				<div class="text">
					{{ props.itemData.description }}
				</div>
			</div>
			<div
				class="cover"
				@click.stop>
				<div class="cover-inner">
					<el-image
						:src="props.itemData.previewUrl"
						:zoom-rate="1.2"
						:max-scale="7"
						:min-scale="0.2"
						:preview-src-list="[props.itemData.previewUrl]"
						:initial-index="4"
						style="width: 100%; height: 100%"
						fit="cover" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.content-item-wrap {
	padding: 0 10px;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	&:nth-child(1) {
		margin-top: 0;
	}
	.content-item {
		padding: 10px 0;
		border-bottom: 1px solid var(--border-color);
		.title {
			text-align: center;
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 5px;
			color: var(--primary-color);
		}
		.data-show {
			margin: 10px 0;
			display: flex;
			justify-content: center;
			gap: 10px;

			.show-item {
				display: flex;
				align-items: center;
				gap: 5px;
				color: var(--el-text-color-placeholder);
				font-size: 14px;
				letter-spacing: -0.4px;
				.iconfont {
					font-size: 16px;
				}
			}
		}
		.description {
			font-size: 15px;
			color: var(--el-text-color-regular);
			margin-bottom: 10px;
			.text {
				width: 100%;
				.more-omit(2);
			}
		}
		.cover {
			border: 1px solid var(--border-color);
			margin: 0 auto;
			width: 100%;
			overflow: hidden;
			border-radius: var(--base-b-r);
			height: 0;
			padding-bottom: 56%;
			position: relative;
			.cover-inner {
				position: absolute;
				inset: 0;
			}
		}
	}
}
</style>
