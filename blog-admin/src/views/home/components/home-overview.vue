<script setup lang="ts">
import { computed, inject } from 'vue'
import { HomeKey } from '../types'

const homeInject = inject(HomeKey, undefined)

const siteVisitData = computed(() => {
	return homeInject?.siteVisitData.value
})

const siteOtherStatisticData = computed(() => {
	return homeInject?.siteOtherStatisticData.value
})

const overviewList = computed(() => {
	return [
		{ title: '总用户数量', text: siteOtherStatisticData.value?.totalUser, icon: 'icon-the-masses' },
		{ title: '总访问数量', text: siteVisitData.value?.total, icon: 'icon-footprint' },
		{ title: '总点赞数量', text: siteOtherStatisticData.value?.totalLike, icon: 'icon-like-full' },
		{ title: '总评论数量', text: siteOtherStatisticData.value?.totalComment, icon: 'icon-comment-full' }
	]
})
</script>

<template>
	<div class="home-overview">
		<div class="overview-list">
			<div
				class="overview-item border"
				v-for="(item, idx) in overviewList"
				:key="idx">
				<div class="left">
					<span :class="['iconfont', item.icon]"></span>
				</div>
				<div class="right">
					<span class="title">{{ item.title }}</span>
					<span class="text">{{ item.text }}</span>
				</div>
			</div>
		</div>
		<div class="today-overview border">
			<div class="header">
				<span>今日数据概览</span>
			</div>
			<div class="content"></div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-overview {
	margin-top: 20px;
	width: 100%;
	border-radius: var(--base-b-r);
	display: flex;
	flex-direction: column;
	gap: 20px;
	.overview-list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		.overview-item {
			width: calc(100% / 4);
			display: flex;
			align-items: center;
			padding: 20px;
			margin-left: 20px;
			overflow: hidden;
			&:first-child {
				margin-left: 0;
			}
			.left {
				flex-shrink: 0;
				width: 50px;
				height: 50px;
				background-color: var(--el-color-primary-light-9);
				border-radius: var(--base-b-r);
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10px;
				transition: var(--bg-color-transition);
				.iconfont {
					font-size: 25px;
					color: var(--el-color-primary);
				}
			}
			.right {
				flex-shrink: 0;
				width: 150px;
				display: flex;
				flex-direction: column;
				.title {
					font-size: 14px;
					margin-bottom: 5px;
				}
				.text {
					font-weight: bold;
					font-size: 20px;
				}
			}
		}
	}
	.today-overview {
		width: 100%;
		.header {
			height: 50px;
			line-height: 50px;
			font-size: 20px;
			padding-left: 10px;
			font-weight: bold;
			color: var(--el-text-color-primary);
			border-bottom: 1px solid var(--border-color);
		}
		.content {
			padding: 20px;
		}
	}
	.border {
		border-radius: var(--base-b-r);
		border: 1px solid var(--border-color);
	}
}
</style>
