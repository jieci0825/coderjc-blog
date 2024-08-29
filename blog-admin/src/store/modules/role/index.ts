import { RoleItem } from '@/apis/modules/role/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const piniaRoleStore = defineStore('role', () => {
	// 角色列表
	const roleList = ref<RoleItem[]>([])
	// 设置角色列表
	const setRoleList = (list: RoleItem[]) => {
		roleList.value = list
	}

	return {
		roleList,
		setRoleList
	}
})
