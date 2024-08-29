<script setup lang="ts">
import categoryFormConfig from './config/category-form.config'
import categoryTableConfig from './config/category-table.config'
import { blogCategoryApi } from '@/apis'
import { ActionType } from './types'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import type { IPageContent } from '@/hooks'
import type { BlogCategoryItem, CreateBlogCategoryParams } from '@/apis/modules/blog-category/type'

const diaglogTitle = ref('')
const dialogVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const curCategoryInfo = ref<BlogCategoryItem | CreateBlogCategoryParams>()
const modeTitleMap = {
	[ActionType.CREATE]: '创建分类',
	[ActionType.EDIT]: '编辑分类'
}

function setInfo(row: BlogCategoryItem | null, mode: ActionType, isVisable: boolean = true) {
	curCategoryInfo.value = row ? { ...row } : ({} as BlogCategoryItem)
	curAction.value = mode
	diaglogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

const handleCreateCategory = () => {
	setInfo(null, ActionType.CREATE)
}

const handleTableEdit = (row: BlogCategoryItem) => {
	setInfo(row, ActionType.EDIT)
}

const handleTableDelete = async (row: BlogCategoryItem) => {
	await openDeleteMessageBox()
	const resp = await blogCategoryApi.reqDeleteBlogCategory(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (data: BlogCategoryItem) => {
	let resp: any = undefined
	if (curAction.value === ActionType.CREATE) {
		resp = await blogCategoryApi.reqCreateBlogCategory(data)
	} else {
		resp = await blogCategoryApi.reqEditBlogCategory(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.categoryPageContentRef?.fetchData()
}

const usePageContent: IPageContent = {
	request: blogCategoryApi.reqGetBlogCategoryList
}
</script>

<template>
	<div class="blog-category-container container">
		<PageContent
			@handleTableEdit="handleTableEdit"
			@handleTableDelete="handleTableDelete"
			@actCreate="handleCreateCategory"
			:isPaginator="false"
			:ref="setRef('categoryPageContentRef')"
			:use-page-content="usePageContent"
			:tableConfig="categoryTableConfig"></PageContent>

		<JcDialog
			v-model="dialogVisable"
			:title="diaglogTitle">
			<JcForm
				@submit="handleSubmit"
				v-model="curCategoryInfo"
				v-bind="categoryFormConfig"></JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less"></style>
