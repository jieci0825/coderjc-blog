<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { JcTableProps } from './jc-table'

defineOptions({ name: 'JcTable' })

const props = withDefaults(defineProps<JcTableProps>(), {
	tableData: () => [],
	align: 'center',
	height: '100%'
})

const attrs = useAttrs()

const containerStyle = computed(() => {
	return {
		width: props.width || '100%'
	}
})
</script>

<template>
	<el-table
		v-bind="{ ...attrs, ...props }"
		:style="containerStyle"
		:data="props.tableData">
		<template
			v-for="item in props.columns"
			:key="item.property">
			<el-table-column
				v-bind="item"
				:align="props.align">
				<template #default="scope">
					<template v-if="item.slotName">
						<slot
							:name="item.slotName"
							:row="scope.row">
							{{ scope.row[item.property] }}
						</slot>
					</template>
					<template v-else>
						{{ scope.row[item.property] }}
					</template>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>

<style scoped lang="less">
.el-table {
	font-size: 16px;
	:deep(.el-table__header-wrapper) {
		display: flex;
	}
	:deep(.el-table__body-wrapper) {
		display: flex;
	}
}
</style>
