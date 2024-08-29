<script setup lang="ts">
import categoryFormConfig from './config/category-form.config'
import categoryTableConfig from './config/category-table.config'
import { musicApi } from '@/apis'
import { ActionType } from './types'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import type { IPageContent } from '@/hooks'
import type { MusicCategoryItem, CreateMusicCategoryParams } from '@/apis/modules/music/type'

const diaglogTitle = ref('')
const dialogVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const curCategoryInfo = ref<MusicCategoryItem | CreateMusicCategoryParams>()
const modeTitleMap = {
	[ActionType.CREATE]: '创建分类',
	[ActionType.EDIT]: '编辑分类'
}

function setInfo(row: MusicCategoryItem | null, mode: ActionType, isVisable: boolean = true) {
	curCategoryInfo.value = row ? { ...row } : ({} as MusicCategoryItem)
	curAction.value = mode
	diaglogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

const handleCreateCategory = () => {
	setInfo(null, ActionType.CREATE)
}

const handleTableEdit = (row: MusicCategoryItem) => {
	setInfo(row, ActionType.EDIT)
}

const handleTableDelete = async (row: MusicCategoryItem) => {
	await openDeleteMessageBox()
	const resp = await musicApi.reqDeleteMusicCategory(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (data: MusicCategoryItem) => {
	let resp: any = undefined
	if (curAction.value === ActionType.CREATE) {
		resp = await musicApi.reqCreateMusicCategory(data)
	} else {
		resp = await musicApi.reqEditMusicCategory(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.musicCategoryPageContentRef?.fetchData()
}

const usePageContent: IPageContent = {
	request: musicApi.reqGetMusicCategoryList
}
</script>

<template>
	<div class="music-category-container container">
		<PageContent
			@handleTableEdit="handleTableEdit"
			@handleTableDelete="handleTableDelete"
			@actCreate="handleCreateCategory"
			:isPaginator="false"
			:ref="setRef('musicCategoryPageContentRef')"
			:use-page-content="usePageContent"
			:tableConfig="categoryTableConfig">
			<template #categoryIcon="{ row }">
				<span
					style="font-size: 24px"
					:class="['iconfont', row.categoryIcon]"></span>
			</template>
		</PageContent>

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
