import { computed } from 'vue'
import { piniaUserStore } from '../modules/user'
import { userApi } from '@/apis'
import { getLocalCache } from '@/utils'
import { BLOG_ADMIN_CURRENT_MENU_LIST } from '@/constants'

export const useUserGetters = () => {
	const userStore = piniaUserStore()

	const getUserInfo = computed(() => userStore.userInfo)
	const getUserMenuList = computed(() => userStore.userMenuList)

	return {
		getUserInfo,
		getUserMenuList
	}
}

export const useUserActions = () => {
	const { setUserInfo, clearUserInfo, setUserMenuList, clearUserMenuList } = piniaUserStore()

	// 获取用户信息
	const reqGetUserInfo = async () => {
		const resp = await userApi.reqUserInfo()
		setUserInfo(resp.data)
	}

	// 获取用户菜单列表
	const reqGetUserMenuList = async () => {
		if (getLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST)) return
		const resp = await userApi.reqGetLoginUserMenuList()
		setUserMenuList(resp.data)
	}

	return {
		reqGetUserInfo,
		setUserInfo,
		clearUserInfo,
		reqGetUserMenuList,
		setUserMenuList,
		clearUserMenuList
	}
}
