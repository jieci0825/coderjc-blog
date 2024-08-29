<script setup lang="ts">
import userTableConfig from './config/user-table.config'
import userSearchFormConfig from './config/user-search-form.config'
import userFormFn from './config/user-form.config'
import { userApi } from '@/apis'
import { Postcard, Edit, Aim } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ActionType } from './types'
import { uploadFile } from '@/cos'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox, previewImage } from '@/utils'
import { useRoleActions, useRoleGetters } from '@/store'
import type { UserItem } from '@/apis/modules/user/type'

const drawerTitle = ref('')
const curAction = ref<ActionType>(ActionType.EDIT)
const drawerVisable = ref(false)
const curUserInfo = ref<UserItem>()

const modeTitleMap = {
	[ActionType.CREATE]: '创建用户',
	[ActionType.EDIT]: '编辑用户信息'
}
// 表单配置
let userFormConfig = userFormFn(ActionType.CREATE)
function setInfo(row: UserItem | null, mode: ActionType, isVisable: boolean = true) {
	userFormConfig = userFormFn(mode)
	curUserInfo.value = row ? { ...row } : ({} as UserItem)
	curAction.value = mode
	drawerTitle.value = modeTitleMap[mode]
	drawerVisable.value = isVisable
}

// 编辑用户信息
const handleTableEdit = (row: UserItem) => {
	setInfo(row, ActionType.EDIT)
}
// 删除用户
const handleTableLogoff = async (row: UserItem) => {
	await openDeleteMessageBox()
	const resp = await userApi.reqLogoffUser(row.id)
	ElMessage.success(resp.msg)
	refs.userPageContentRef?.search()
}

const { refs, setRef } = useRefs()

// 处理表单提交
const handleSubmit = async (data: UserItem) => {
	let resp: any = undefined
	// 处理文件
	if (data.avatarUrl && typeof data.avatarUrl !== 'string') {
		const result = await uploadFile(data.avatarUrl as unknown as File)
		data.avatarUrl = result.url
	}
	// 分发请求
	if (curAction.value === ActionType.EDIT) {
		resp = await userApi.reqEditUserInfo(data)
	} else if (curAction.value === ActionType.CREATE) {
		resp = await userApi.reqCreateUser(data)
	}
	ElMessage.success(resp.msg)
	drawerVisable.value = false
	refs.userPageContentRef?.search()
}

// 创建用户
const handleCreateUser = () => {
	setInfo(null, ActionType.CREATE)
}

const dialogVisable = ref(false)
const selectRole = ref('')
const { getRoleList } = useRoleGetters()
const { reqGetRoleList } = useRoleActions()
reqGetRoleList()
// 打开分配角色面板
const openRoleAssignPanel = (row: UserItem) => {
	curUserInfo.value = { ...row }
	selectRole.value = row.roleId as unknown as string
	dialogVisable.value = true
}
// 分配角色
const handleAssignRole = async () => {
	if (selectRole.value) {
		const resp = await userApi.reqAssignRole({
			userId: curUserInfo.value?.id!,
			roleId: selectRole.value
		})
		ElMessage.success(resp.msg)
	}
	refs.userPageContentRef?.fetchData()
	dialogVisable.value = false
}
</script>

<template>
	<div class="user-contaier container">
		<PageContent
			@actCreate="handleCreateUser"
			:ref="setRef('userPageContentRef')"
			:use-page-content="{ request: userApi.reqGetUserList }"
			:form-config="userSearchFormConfig"
			:tableConfig="userTableConfig"
			:paginator-config="{}">
			<template #avatarUrl="{ row }">
				<div
					@click="previewImage({ urlList: [row.avatarUrl] })"
					class="img-box">
					<el-image
						:src="row.avatarUrl"
						fit="cover"
						style="width: 100%; height: 100%" />
				</div>
			</template>
			<template #roleNickname="{ row }">
				<el-tag v-if="row.roleNickname">{{ row.roleNickname }}</el-tag>
			</template>
			<template #status="{ row }">
				<el-tag :type="row.status === 1 ? 'success' : 'danger'">{{ row.status === 1 ? '启用' : '停用' }}</el-tag>
			</template>
			<template #operate="{ row }">
				<el-button
					@click="openRoleAssignPanel(row)"
					:icon="Postcard"
					type="primary"
					plain
					size="small"
					>分配角色</el-button
				>
				<el-button
					@click="handleTableEdit(row)"
					:icon="Edit"
					type="primary"
					plain
					size="small"
					>编辑</el-button
				>
				<el-button
					@click="handleTableLogoff(row)"
					:icon="Aim"
					type="danger"
					plain
					size="small"
					>注销</el-button
				>
			</template>
		</PageContent>

		<!-- 抽屉 -->
		<JcDrawer
			v-model="drawerVisable"
			:title="drawerTitle"
			size="500px">
			<JcForm
				v-model="curUserInfo"
				v-bind="userFormConfig"
				@submit="handleSubmit"></JcForm>
		</JcDrawer>

		<JcDialog
			v-model="dialogVisable"
			title="分配角色">
			<el-radio-group v-model="selectRole">
				<el-radio
					v-for="role in getRoleList"
					:value="role.id"
					:key="role.id"
					>{{ role.roleNickname }}</el-radio
				>
			</el-radio-group>
			<template #footer>
				<el-button @click="dialogVisable = false">取消</el-button>
				<el-button
					@click="handleAssignRole"
					type="primary"
					>确定</el-button
				>
			</template>
		</JcDialog>
	</div>
</template>

<style scoped lang="less">
.user-container {
	width: 100%;
}
.img-box {
	margin: auto;
	width: 40px;
	height: 40px;
	border: 1px solid var(--border-color);
	border-radius: 50%;
	overflow: hidden;
}
</style>
