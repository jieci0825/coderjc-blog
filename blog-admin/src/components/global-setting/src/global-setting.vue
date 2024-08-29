<script setup lang="ts">
import PrimaryBox from './primary-box.vue'
import OtherConfigBox from './other-config-box.vue'
import LayoutBox from './layout-box.vue'
import { Notification, Ship, Setting } from '@element-plus/icons-vue'

defineOptions({ name: 'GlobalSetting' })
</script>

<template>
	<div class="global-setting-wrapper">
		<!-- primary -->
		<el-divider>
			<div class="divider-box">
				<el-icon><Ship /></el-icon>
				主题色彩
			</div>
		</el-divider>
		<PrimaryBox />

		<!-- layout -->
		<el-divider>
			<div class="divider-box">
				<el-icon><Notification /></el-icon>
				布局模式
			</div>
		</el-divider>
		<LayoutBox />

		<!-- other -->
		<el-divider>
			<div class="divider-box">
				<el-icon><Setting /></el-icon>
				其他设置
			</div>
		</el-divider>
		<OtherConfigBox />
	</div>
</template>

<style scoped lang="less">
.global-setting-wrapper {
	margin-top: -20px;
	width: 100%;
	.divider-box {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 18px;
	}
}
</style>
