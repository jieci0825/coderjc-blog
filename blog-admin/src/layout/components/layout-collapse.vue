<script setup lang="ts">
import { useGlobalActions, useGlobalGetters } from '@/store'
import { Expand, Fold } from '@element-plus/icons-vue'

const { getCollapse } = useGlobalGetters()
const { toggleCollapse } = useGlobalActions()
</script>

<template>
	<div class="collapse-box">
		<el-icon
			:size="20"
			@click="() => toggleCollapse()"
			class="layout-collapse-icon">
			<component :is="getCollapse ? Expand : Fold"></component>
		</el-icon>
	</div>
</template>

<style scoped lang="less">
.collapse-box {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
