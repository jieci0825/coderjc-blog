<script setup lang="ts">
import roleTableConfig from './config/role-table.config'
import roleFormConfig from './config/role-form.config'
import RoleAssign from './components/role-assign.vue'
import { SUPER_ADMIN_NAME } from '@/constants'
import { useRoleActions, useRoleGetters } from '@/store'
import { Edit, Delete, Plus, Postcard } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { roleApi, menuApi } from '@/apis'
import { ActionType } from './types'
import { openDeleteMessageBox } from '@/utils'
import type { MenuItem } from '@/apis/modules/menu/type'
import type { RoleItem } from '@/apis/modules/role/type'

const { reqGetRoleList } = useRoleActions()
const { getRoleList } = useRoleGetters()
reqGetRoleList()

const drawerVisable = ref(false)
const modeTitleMap = {
	[ActionType.CREATE]: '创建角色',
	[ActionType.EDIT]: '编辑角色信息',
	[ActionType.ASSIGN]: '给角色分配权限'
}
const curAction = ref(ActionType.CREATE)
const drawerTitle = computed(() => modeTitleMap[curAction.value])
const curRoleInfo = ref<RoleItem>()

const handleTableDelete = async (row: any) => {
	await openDeleteMessageBox()
	const resp = await roleApi.reqDeleteRole(row.id)
	ElMessage.success(resp.msg)
	reqGetRoleList()
}

function setRoleInfo(row: RoleItem | null, mode: ActionType, isVisable: boolean = true) {
	curRoleInfo.value = row ? { ...row } : ({} as RoleItem)
	curAction.value = mode
	drawerVisable.value = isVisable
}

const handleSubmit = async (data: RoleItem | number[]) => {
	let resp: any = undefined
	if (curAction.value === ActionType.EDIT) {
		resp = await roleApi.reqEditRole(data as RoleItem)
	} else if (curAction.value === ActionType.CREATE) {
		resp = await roleApi.reqCreateRole(data as RoleItem)
	} else if (curAction.value === ActionType.ASSIGN) {
		resp = await roleApi.reqAssignPermission({
			roleId: curRoleInfo.value?.id as number,
			menuIds: data as number[]
		})
	}
	ElMessage.success(resp.msg)
	reqGetRoleList()
	closeDrawer()
}

function closeDrawer() {
	drawerVisable.value = false
}

// 全部的菜单列表
const allMenuList = ref<MenuItem[]>([])
const getAllMenuList = async () => {
	const resp = await menuApi.reqGetAllMenuList({ type: 'tree' })
	allMenuList.value = resp.data
}
getAllMenuList()
</script>

<template>
	<div class="role-container container">
		<div class="actions">
			<el-button
				@click="setRoleInfo(null, ActionType.CREATE)"
				type="primary"
				plain>
				<el-icon
					style="margin-right: 5px"
					:size="14">
					<Plus />
				</el-icon>
				新增
			</el-button>
		</div>
		<JcTable
			v-bind="roleTableConfig"
			:table-data="getRoleList">
			<template #operate="{ row }">
				<el-button
					@click="setRoleInfo(row, ActionType.ASSIGN)"
					:icon="Postcard"
					type="primary"
					plain
					size="small"
					>分配权限</el-button
				>
				<el-button
					:disabled="row.roleName === SUPER_ADMIN_NAME"
					@click="setRoleInfo(row, ActionType.EDIT)"
					:icon="Edit"
					type="primary"
					plain
					size="small"
					>编辑</el-button
				>
				<el-button
					:disabled="row.roleName === SUPER_ADMIN_NAME"
					@click="handleTableDelete(row)"
					:icon="Delete"
					type="danger"
					plain
					size="small"
					>删除</el-button
				>
			</template>
		</JcTable>

		<JcDrawer
			v-model="drawerVisable"
			:title="drawerTitle">
			<template v-if="curAction === ActionType.ASSIGN">
				<RoleAssign
					@submit="handleSubmit"
					:all-menu-list="allMenuList"
					:cur-role-info="curRoleInfo!"></RoleAssign>
			</template>
			<template v-else>
				<JcForm
					@submit="handleSubmit"
					v-bind="roleFormConfig"
					v-model="curRoleInfo"></JcForm>
			</template>
		</JcDrawer>
	</div>
</template>

<style scoped lang="less">
.role-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	.actions {
		margin-bottom: 20px;
	}
}
</style>
