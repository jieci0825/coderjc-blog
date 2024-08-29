<script setup lang="ts">
import JcTable from '@/components/jc-table'
import { computed, ref } from 'vue'
import { usePageContent } from '@/hooks'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import type { PageConteEmits, PageContentProps } from './page-content'

defineOptions({ name: 'PageContent' })

const props = withDefaults(defineProps<PageContentProps>(), {
	isAction: true,
	isPaginator: true,
	paginatorConfig: {}
})
const emits = defineEmits<PageConteEmits>()

const initFormData: { [key: string]: any } = {}
props.formConfig?.formItems.forEach(item => {
	initFormData[item.field] = item.defaultValue ?? ''
})
const formData = ref<{ [key: string]: any }>(initFormData)

const queryCondition = computed(() => {
	const _q = props.usePageContent?.queryParams || {}
	return Object.assign({}, formData.value, _q)
})

const { onPageChange, onSizeChange, data, pagination, fetchData, search } = usePageContent({
	...props.usePageContent,
	queryParams: queryCondition,
	isPage: props.isPaginator
})

const onSubmit = () => {
	search()
	emits('search')
}

const handleTableEdit = (scope: any) => {
	emits('handleTableEdit', scope)
}
const handleTableDelete = (scope: any) => {
	emits('handleTableDelete', scope)
}

defineExpose({
	search,
	fetchData,
	data
})
</script>

<template>
	<div class="page-content">
		<!-- form -->
		<div class="form-wrapper">
			<JcForm
				v-if="props.formConfig"
				@submit="onSubmit"
				v-model="formData"
				v-bind="props.formConfig"></JcForm>
		</div>
		<!-- actions -->
		<div
			class="action-wrapper"
			v-if="props.isAction">
			<slot name="actions">
				<el-button
					@click="emits('actCreate')"
					type="primary"
					plain>
					<el-icon :size="14"> <Plus /> </el-icon>新增
				</el-button>
			</slot>
		</div>
		<!-- table -->
		<div class="table-wrapper">
			<!-- <Component :is="h(JcTable, { ...props.tableConfig, tableData: data }, $slots)">
			</Component> -->
			<JcTable
				v-bind="props.tableConfig"
				:table-data="data">
				<template
					v-for="(_, slot) in $slots"
					:key="slot"
					v-slot:[slot]="scope">
					<slot
						v-bind="scope"
						:name="slot"></slot>
				</template>
				<template #operate="scope">
					<el-button
						@click="handleTableEdit(scope.row)"
						:icon="Edit"
						type="primary"
						plain
						size="small"
						>编辑</el-button
					>
					<el-button
						@click="handleTableDelete(scope.row)"
						:icon="Delete"
						type="danger"
						plain
						size="small"
						>删除</el-button
					>
				</template>
			</JcTable>
		</div>
		<!-- paginator -->
		<div
			class="paginator-wrapper"
			v-if="props.isPaginator">
			<JcPaginator
				@page-change="onPageChange"
				@size-change="onSizeChange"
				v-model:pageSize="pagination.pageSize"
				v-bind="props.paginatorConfig"
				:total="pagination.total"></JcPaginator>
		</div>
	</div>
</template>

<style scoped lang="less">
.page-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.form-wrapper {
		width: 100%;
		flex-shrink: 0;
	}
	.action-wrapper {
		width: 100%;
		flex-shrink: 0;
		margin-bottom: 20px;
		display: flex;
		:deep(.el-button) {
			.el-icon {
				margin-right: 5px;
			}
		}
	}
	.table-wrapper {
		flex: 1;
		width: 100%;
		overflow: hidden;
		:deep(.el-table__header-wrapper) {
			display: flex;
		}
		:deep(.el-table__body-wrapper) {
			display: flex;
		}
	}
	.paginator-wrapper {
		flex-shrink: 0;
		height: 50px;
		width: 100%;
		margin-top: 20px;
	}
}
</style>
