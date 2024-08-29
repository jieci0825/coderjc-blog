<script setup lang="ts">
import type { JcDrawerProps } from './jc-drawer'

defineOptions({ name: 'JcDrawer', inheritAttrs: true })

const visable = defineModel({ type: Boolean, default: false })
const props = withDefaults(defineProps<JcDrawerProps>(), {
	closeOnClickModal: false,
	beforeClose: (done: (cancel?: boolean) => void) => {
		ElMessageBox.confirm('确定要关闭吗？', '提示', { type: 'warning' })
			.then(() => {
				done()
			})
			.catch(() => {})
	}
})
</script>

<template>
	<div
		class="jc-drawer-contianer"
		v-if="visable">
		<el-drawer
			v-model="visable"
			v-bind="$attrs"
			style="width: 500px"
			:close-on-click-modal="props.closeOnClickModal"
			:before-close="props.beforeClose">
			<template
				v-for="(_, slot) in $slots"
				v-slot:[slot]="slotProps"
				:key="slot">
				<slot
					v-bind="slotProps"
					:name="slot"></slot>
			</template>
		</el-drawer>
	</div>
</template>

<style scoped lang="less"></style>
