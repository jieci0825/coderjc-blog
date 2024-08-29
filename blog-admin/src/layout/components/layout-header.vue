<script setup lang="ts">
import LayoutBreadcrumb from './layout-breadcrumb.vue'
import LayoutNav from './layout-nav.vue'
import LayoutAction from './layout-action.vue'
import LayoutUser from './layout-user.vue'
</script>

<template>
	<div class="layout-header-wrapper">
		<!-- top -->
		<div class="header-top">
			<slot name="logo"></slot>
			<slot name="collapse"></slot>
			<slot name="menu">
				<LayoutBreadcrumb />
			</slot>
			<!-- action -->
			<LayoutAction />
			<!-- user -->
			<LayoutUser />
		</div>
		<!-- bottom -->
		<div class="header-bootom">
			<LayoutNav></LayoutNav>
		</div>
	</div>
</template>

<style scoped lang="less">
.layout-header-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: var(--bg-color);
	padding: 0 20px;
	.header-top {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--border-color);
		flex-shrink: 0;
		:deep(.el-menu) {
			flex: 1;
			overflow: hidden;
			margin-right: 30px;
		}
	}
	.header-bootom {
		width: 100%;
		flex: 1;
	}
}
</style>
