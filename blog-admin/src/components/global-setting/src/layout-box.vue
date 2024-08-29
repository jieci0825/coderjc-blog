<script setup lang="ts">
import { LAYOUT_MODE } from '@/constants'
import { CircleCheckFilled } from '@element-plus/icons-vue'
import { useGlobalActions, useGlobalGetters } from '@/store'

const { getLayoutMode } = useGlobalGetters()
const { setLayoutMode } = useGlobalActions()
</script>

<template>
	<div class="layout-box">
		<el-tooltip
			placement="top"
			content="纵向">
			<div
				@click="setLayoutMode(LAYOUT_MODE.VERTICAL)"
				:class="['layout-item', getLayoutMode === LAYOUT_MODE.VERTICAL ? 'is-active' : '']">
				<div class="layout-horizontal">
					<div class="layout-aside light"></div>
					<div class="layout-vertical">
						<div class="layout-header dark"></div>
						<div class="layout-main"></div>
					</div>
				</div>
				<el-icon :size="18">
					<CircleCheckFilled />
				</el-icon>
			</div>
		</el-tooltip>
		<el-tooltip
			placement="top"
			content="横向">
			<div
				@click="setLayoutMode(LAYOUT_MODE.HORIZONTAL)"
				:class="['layout-item', getLayoutMode === LAYOUT_MODE.HORIZONTAL ? 'is-active' : '']">
				<div class="layout-vertical">
					<div class="layout-header dark"></div>
					<div class="layout-main"></div>
				</div>
				<el-icon :size="18">
					<CircleCheckFilled />
				</el-icon>
			</div>
		</el-tooltip>
	</div>
</template>

<style scoped lang="less">
.layout-box {
	margin-bottom: 30px;
	display: flex;
	gap: 50px;
	justify-content: center;
	.layout-item {
		position: relative;
		width: 120px;
		height: 80px;
		border-radius: 6px;
		cursor: pointer;
		padding: 8px;
		transition: box-shadow 0.25s;
		box-shadow: 0 0 5px 1px var(--el-border-color-dark);
		display: flex;
		flex-direction: column;
		gap: 8px;
		&:hover {
			box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
		}
		:deep(.el-icon) {
			display: none;
			position: absolute;
			right: 10px;
			bottom: 10px;
			width: 20px;
			height: 20px;
			color: var(--el-color-primary);
		}
		&.is-active {
			box-shadow: none;
			border: 2px solid var(--el-color-primary);
			:deep(.el-icon) {
				display: block;
			}
		}
		.layout-horizontal {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			gap: 8px;
		}
		.layout-vertical {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
		.layout-header,
		.layout-aside,
		.layout-main {
			background-color: var(--el-color-primary-light-8);
			border-radius: 4px;
		}
		.layout-header {
			height: 15px;
		}
		.layout-aside {
			width: 20px;
			height: 100%;
		}
		.layout-main {
			flex: 1;
			border: 1px dashed var(--el-color-primary);
		}
		.dark {
			background-color: var(--el-color-primary);
		}
		.light {
			background-color: var(--el-color-primary-light-5);
		}
	}
}
</style>
