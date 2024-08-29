<script setup lang="ts">
import { Ship, Setting } from '@element-plus/icons-vue'
import PrimaryBox from './primary-box.vue'
import OtherConfigBox from './other-config-box.vue'

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
