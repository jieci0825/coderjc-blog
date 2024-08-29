import { piniaUserStore } from '../modules/user'
import { computed } from 'vue'
import { userApi } from '@/apis'

export const useUserGetters = () => {
	const userStore = piniaUserStore()

	// 当前登录用户的信息
	const getCurUserInfo = computed(() => userStore.userInfo)
	// 是否登录
	const isLogin = computed(() => !!userStore.userInfo)

	return {
		getCurUserInfo,
		isLogin
	}
}

export const useUserActions = () => {
	const { setUserInfo } = piniaUserStore()

	// 获取登录用户的信息
	const reqGetLoginUserInfo = async () => {
		const resp = await userApi.reqGetLoginUserInfo()
		setUserInfo(resp.data)
	}

	// 清空登录用户的信息
	const clearLoginUserInfo = () => {
		setUserInfo(null)
	}

	return {
		reqGetLoginUserInfo,
		clearLoginUserInfo
	}
}
