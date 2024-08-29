<script setup lang="ts">
import { computed, inject } from 'vue'
import { HomeKey } from '../types'

const homeInject = inject(HomeKey, undefined)

const curUserInfo = computed(() => {
	return homeInject?.curUserInfo.value
})

const siteHomeInfo = computed(() => {
	return homeInject?.siteHomeInfo.value
})
</script>

<template>
	<div class="home-header-wrapper">
		<div class="avatar-box">
			<el-image
				style="width: 100%; height: 100%"
				:src="curUserInfo?.avatarUrl"
				:preview-src-list="[curUserInfo?.avatarUrl]"
				fit="cover"
				lazy />
		</div>
		<div class="info-box">
			<div class="title">{{ siteHomeInfo?.title }}</div>
			<div class="slogan">{{ siteHomeInfo?.slogan }}</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-header-wrapper {
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px 10px 20px 10px;
	border-bottom: 1px solid var(--border-color);
	gap: 20px;
	--size: 80px;
	.avatar-box {
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		border: 1px solid var(--border-color);
		overflow: hidden;
	}
	.info-box {
		height: var(--size);
		display: flex;
		flex-direction: column;
		justify-content: center;
		.title {
			font-size: 20px;
			font-weight: bold;
			color: var(--el-text-color-primary);
		}
		.slogan {
			margin-top: 10px;
		}
	}
}
</style>
