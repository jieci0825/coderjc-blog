<script setup lang="ts">
import menuTableConfig from './config/menu-table.config'
import menuCreateEditFormFn from './config/menu-create-edit-form.config'
import { ref } from 'vue'
import { menuApi } from '@/apis'
import { ActionType } from './types'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import type { MenuItem } from '@/apis/modules/menu/type'

// 打平的菜单列表
const flatMenuList = ref<MenuItem[]>([])
async function reqGetFlatMenuList() {
	const resp = await menuApi.reqGetAllMenuList({ type: 'flat' })
	// 添加一级菜单选项
	resp.data.unshift({
		id: 0,
		menuName: '',
		menuPath: '',
		menuTitle: '一级菜单',
		menuStatus: 1,
		menuSort: 0,
		menuIcon: '',
		menuPid: 0,
		children: null
	})
	flatMenuList.value = resp.data
}
reqGetFlatMenuList()

const drawerTitle = ref('')
const drawerVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const curMenuInfo = ref<MenuItem>()
const modeTitleMap = {
	[ActionType.CREATE]: '创建菜单',
	[ActionType.EDIT]: '编辑菜单信息'
}

let menuCreateEditFormConfig = {}
function setInfo(row: MenuItem | null, mode: ActionType, isVisable: boolean = true) {
	menuCreateEditFormConfig = menuCreateEditFormFn(flatMenuList.value)
	curMenuInfo.value = row ? { ...row } : ({} as MenuItem)
	curAction.value = mode
	drawerTitle.value = modeTitleMap[mode]
	drawerVisable.value = isVisable
}

const handleCreateMenu = () => {
	setInfo(null, ActionType.CREATE)
}
const handleEditMenu = (row: MenuItem) => {
	setInfo(row, ActionType.EDIT)
}
const handleDeleteMenu = async (row: MenuItem) => {
	await openDeleteMessageBox()
	const resp = await menuApi.reqDeleteMenu(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

// 处理表单提交
const handleSubmit = async (data: MenuItem) => {
	let resp: any = undefined
	if (curAction.value === ActionType.CREATE) {
		resp = await menuApi.reqCreateMenu(data)
	} else {
		resp = await menuApi.reqEditMenu(data)
	}
	ElMessage.success(resp.msg)
	drawerVisable.value = false
	refreshData()
}

function refreshData() {
	refs.menuPageContentRef?.fetchData()
}

const usePageContentData = {
	request: menuApi.reqGetAllMenuList,
	queryParams: { type: 'tree' }
}
</script>

<template>
	<div class="menu-container container">
		<PageContent
			@handleTableEdit="handleEditMenu"
			@handleTableDelete="handleDeleteMenu"
			@actCreate="handleCreateMenu"
			:isPaginator="false"
			:ref="setRef('menuPageContentRef')"
			:use-page-content="usePageContentData"
			:tableConfig="menuTableConfig">
			<template #menuIcon="{ row }">
				<span :class="['iconfont', row.menuIcon]"></span>
			</template>
			<template #menuSort="{ row }">
				<el-tag type="primary">{{ row.menuSort }}</el-tag>
			</template>
			<template #menuStatus="{ row }">
				<el-tag :type="row.menuStatus ? 'success' : 'info'">{{ row.menuStatus ? '显示' : '隐藏' }}</el-tag>
			</template>
		</PageContent>

		<!-- 抽屉 -->
		<JcDrawer
			v-model="drawerVisable"
			:title="drawerTitle"
			size="500px">
			<JcForm
				v-model="curMenuInfo"
				v-bind="menuCreateEditFormConfig"
				@submit="handleSubmit"></JcForm>
		</JcDrawer>
	</div>
</template>

<style scoped></style>
