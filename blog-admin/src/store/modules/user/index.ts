import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLocalCache, removeLocalCache, setLocalCache } from '@/utils'
import { BLOG_ADMIN_CURRENT_MENU_LIST } from '@/constants'
import type { MenuItem } from '@/apis/modules/menu/type'
import type { UserItem } from '@/apis/modules/user/type'

export const piniaUserStore = defineStore('user', () => {
	// 当前登录的用户信息
	const userInfo = ref<UserItem | null>(null)
	// 设置用户信息
	const setUserInfo = (data: UserItem) => {
		userInfo.value = data
	}
	// 清除用户信息
	const clearUserInfo = () => {
		userInfo.value = null
	}

	// 当前登录用户的菜单列表
	const userMenuList = ref<MenuItem[]>(getLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST) || [])
	// 设置用户菜单列表
	const setUserMenuList = (data: MenuItem[]) => {
		userMenuList.value = data
		setLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST, data)
	}
	// 清除用户菜单列表
	const clearUserMenuList = () => {
		userMenuList.value = []
		removeLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST)
	}

	return {
		userInfo,
		setUserInfo,
		clearUserInfo,
		userMenuList,
		setUserMenuList,
		clearUserMenuList
	}
})
