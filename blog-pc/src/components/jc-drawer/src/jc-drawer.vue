<script setup lang="ts">
import type { JcDrawerProps } from './jc-drawer'

defineOptions({ name: 'JcDrawer' })

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
			:close-on-click-modal="props.closeOnClickModal"
			:before-close="props.beforeClose"
			v-model="visable"
			v-bind="$attrs">
			<template
				v-for="(_, slot) in $slots"
				:key="slot"
				v-slot:[slot]="slotProps">
				<slot
					:name="slot"
					v-bind="slotProps"></slot>
			</template>
		</el-drawer>
	</div>
</template>

<style scoped lang="less"></style>
