<script setup lang="ts">
import linkTableConfig from './config/link-table.config'
import linkSearchFormConfig from './config/link-search-form.config'
import linkFormFn from './config/link-form.config'
import { friendChainApi } from '@/apis'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import { uploadFile } from '@/cos'
import { ActionType } from './types'
import type { FriendChainLinkItem, FriendChainCategoryItem } from '@/apis/modules/friend-chain/type'

const linkFormConfig = ref({})

// 分类列表
const categoryList = ref<FriendChainCategoryItem[]>([])
const getCategoryList = async () => {
	const resp = await friendChainApi.reqGetFriendChainCategoryList()
	categoryList.value = resp.data
}
getCategoryList()

const curLinkInfo = ref<FriendChainLinkItem>()

const diaglogTitle = ref('')
const dialogVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const modeTitleMap = {
	[ActionType.CREATE]: '创建链接',
	[ActionType.EDIT]: '编辑链接'
}

const openEditLinkDialog = async (row: FriendChainLinkItem) => {
	setInfo(row, ActionType.EDIT)
}

const openCreateLinkDialog = async () => {
	setInfo(null, ActionType.CREATE)
}

function setInfo(row: FriendChainLinkItem | null, mode: ActionType, isVisable: boolean = true) {
	linkFormConfig.value = linkFormFn(categoryList.value)
	curLinkInfo.value = row ? { ...row } : ({} as FriendChainLinkItem)
	curAction.value = mode
	diaglogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

const handleTableDelete = async (row: FriendChainLinkItem) => {
	await openDeleteMessageBox()
	const resp = await friendChainApi.reqDeleteFriendChainLink(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (payload: any) => {
	const data = { ...payload }
	// 处理文件
	if (data.previewFile && typeof data.previewFile !== 'string') {
		const result = await uploadFile(data.previewFile as unknown as File)
		data.linkPreview = result.url
	}
	let resp: any = null
	if (curAction.value === ActionType.EDIT) {
		resp = await friendChainApi.reqEditFriendChainLink(data)
	} else {
		resp = await friendChainApi.reqCreateFriendChainLink(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.friendChainLinkPageContentRef?.fetchData()
}

const usePageContent = {
	request: friendChainApi.reqGetFriendChainLinkList
}
</script>

<template>
	<div class="friend-chain-link-container container">
		<PageContent
			@handleTableEdit="openEditLinkDialog"
			@handleTableDelete="handleTableDelete"
			@actCreate="openCreateLinkDialog"
			:ref="setRef('friendChainLinkPageContentRef')"
			:use-page-content="usePageContent"
			:form-config="linkSearchFormConfig"
			:tableConfig="linkTableConfig">
			<template #linkPreview="{ row }">
				<el-image
					:src="row.linkPreview"
					:preview-src-list="[row.linkPreview]"
					style="width: 50px; height: 50px; border-radius: 50%"
					fit="cover"></el-image>
			</template>
		</PageContent>

		<JcDialog
			v-model="dialogVisable"
			width="50%"
			title="编辑博客">
			<JcForm
				@submit="handleSubmit"
				v-model="curLinkInfo"
				v-bind="linkFormConfig">
			</JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less">
.friend-chain-link-contaianer {
	width: 100%;
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	:deep(.el-dialog) {
		margin: 0;
		height: 100%;
		overflow: hidden auto;
	}
}
</style>
