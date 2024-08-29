<script setup lang="ts">
import { useAttrs, watch } from 'vue'
import { JcPaginatorEmits, JcPaginatorProps } from './jc-paginator'

defineOptions({ name: 'JcPaginator' })

const props = withDefaults(defineProps<JcPaginatorProps>(), {
	pageSizes: () => [5, 10, 20, 30],
	total: 0,
	background: true,
	layout: 'total, sizes, ->, prev, pager, next, jumper'
})
const emits = defineEmits<JcPaginatorEmits>()
const attrs = useAttrs()

const currentPageModel = defineModel('currentPage', { type: Number, default: 1 })
const pageSizeModel = defineModel('pageSize', { type: Number, default: 10 })

watch(
	() => currentPageModel.value,
	newValue => {
		emits('page-change', newValue)
	}
)
watch(
	() => pageSizeModel.value,
	newValue => {
		emits('size-change', newValue)
	}
)
</script>

<template>
	<el-pagination
		v-bind="attrs"
		v-model:current-page="currentPageModel"
		v-model:page-size="pageSizeModel"
		:page-sizes="props.pageSizes"
		:total="props.total"
		:background="props.background"
		:layout="props.layout"
		class="jc-paginator-wrapper" />
</template>

<style scoped lang="less"></style>
