<script setup lang="ts">
import categoryFormConfig from './config/category-form.config'
import categoryTableConfig from './config/category-table.config'
import { friendChainApi } from '@/apis'
import { ActionType } from './types'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import type { IPageContent } from '@/hooks'
import type { FriendChainCategoryItem, CreateFriendChainCategoryParams } from '@/apis/modules/friend-chain/type'

const diaglogTitle = ref('')
const dialogVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const curCategoryInfo = ref<FriendChainCategoryItem | CreateFriendChainCategoryParams>()
const modeTitleMap = {
	[ActionType.CREATE]: '创建分类',
	[ActionType.EDIT]: '编辑分类'
}

function setInfo(row: FriendChainCategoryItem | null, mode: ActionType, isVisable: boolean = true) {
	curCategoryInfo.value = row ? { ...row } : ({} as FriendChainCategoryItem)
	curAction.value = mode
	diaglogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

const handleCreateCategory = () => {
	setInfo(null, ActionType.CREATE)
}

const handleTableEdit = (row: FriendChainCategoryItem) => {
	setInfo(row, ActionType.EDIT)
}

const handleTableDelete = async (row: FriendChainCategoryItem) => {
	await openDeleteMessageBox()
	const resp = await friendChainApi.reqDeleteFriendChainCategory(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (data: FriendChainCategoryItem) => {
	let resp: any = undefined
	if (curAction.value === ActionType.CREATE) {
		resp = await friendChainApi.reqCreateFriendChainCategory(data)
	} else {
		resp = await friendChainApi.reqEditFriendChainCategory(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.friendChainPageContentRef?.fetchData()
}

const usePageContent: IPageContent = {
	request: friendChainApi.reqGetFriendChainCategoryList
}
</script>

<template>
	<div class="friend-chain-category-container container">
		<PageContent
			@handleTableEdit="handleTableEdit"
			@handleTableDelete="handleTableDelete"
			@actCreate="handleCreateCategory"
			:isPaginator="false"
			:ref="setRef('friendChainPageContentRef')"
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
