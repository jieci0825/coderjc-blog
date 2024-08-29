import { computed } from 'vue'
import { piniaRoleStore } from '../modules/role'
import { roleApi } from '@/apis'

export const useRoleGetters = () => {
	const roleStore = piniaRoleStore()

	// 获取角色列表
	const getRoleList = computed(() => roleStore.roleList)

	return {
		getRoleList
	}
}

export const useRoleActions = () => {
	const { setRoleList } = piniaRoleStore()

	// 请求角色列表
	const reqGetRoleList = async () => {
		const resp = await roleApi.reqGetRoleList()
		setRoleList(resp.data)
	}

	return {
		reqGetRoleList
	}
}
