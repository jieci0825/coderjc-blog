<script setup lang="ts">
import tagTableConfig from './config/tag-table.config'
import tagSearchFormConfig from './config/tag-search-form.config'
import tagFormConfig from './config/tag-form.config'
import { blogTagApi } from '@/apis'
import { ActionType } from './types'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import type { CreateBlogTagParams, BlogTagItem } from '@/apis/modules/blog-tag/type'

const diaglogTitle = ref('')
const dialogVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const curTagInfo = ref<BlogTagItem | CreateBlogTagParams>()
const modeTitleMap = {
	[ActionType.CREATE]: '创建标签-多标签,隔开',
	[ActionType.EDIT]: '编辑标签信息'
}

function setInfo(row: BlogTagItem | null, mode: ActionType, isVisable: boolean = true) {
	curTagInfo.value = row ? { ...row } : ({} as BlogTagItem)
	curAction.value = mode
	diaglogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

const handleCreateTag = () => {
	setInfo(null, ActionType.CREATE)
}

const handleTableEdit = (row: BlogTagItem) => {
	setInfo(row, ActionType.EDIT)
}

const handleTableDelete = async (row: BlogTagItem) => {
	await openDeleteMessageBox()
	const resp = await blogTagApi.reqDeleteBlogTag(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (data: BlogTagItem) => {
	let resp: any = undefined
	if (curAction.value === ActionType.CREATE) {
		const tagNames = data.tagName.split(',')
		resp = await blogTagApi.reqCreateBlogTag({ tagNames })
	} else {
		resp = await blogTagApi.reqEditBlogTag(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.tagPageContentRef?.fetchData()
}

const usePageContent = {
	request: blogTagApi.reqGetBlogTagList
}
</script>

<template>
	<div class="blog-tag-container container">
		<PageContent
			@handleTableEdit="handleTableEdit"
			@handleTableDelete="handleTableDelete"
			@actCreate="handleCreateTag"
			:ref="setRef('tagPageContentRef')"
			:use-page-content="usePageContent"
			:form-config="tagSearchFormConfig"
			:tableConfig="tagTableConfig"
			:paginator-config="{}">
		</PageContent>

		<JcDialog
			v-model="dialogVisable"
			:title="diaglogTitle">
			<JcForm
				@submit="handleSubmit"
				v-model="curTagInfo"
				v-bind="tagFormConfig"></JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less"></style>
