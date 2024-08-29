<script setup lang="ts">
import type { JcDialogProps } from './jc-dialog'

defineOptions({ name: 'JcDialog' })

const visable = defineModel({ type: Boolean, default: false })
const props = withDefaults(defineProps<JcDialogProps>(), {
	closeOnClickModal: false
})
</script>

<template>
	<div
		class="jc-drawer-contianer"
		v-if="visable">
		<el-dialog
			v-model="visable"
			v-bind="$attrs"
			:close-on-click-modal="props.closeOnClickModal">
			<template
				v-for="(_, slot) in $slots"
				v-slot:[slot]="slotProps"
				:key="slot">
				<slot
					v-bind="slotProps"
					:name="slot"></slot>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="less">
:deep(.el-dialog) {
	.el-dialog__header {
		position: relative;
		height: 45px;
		.el-dialog__title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-weight: 600;
			font-size: 22px;
		}
		.el-dialog__headerbtn {
			position: absolute;
			right: -20px;
			top: -20px;
			.el-icon {
				font-size: 25px;
			}
		}
	}
}
</style>
