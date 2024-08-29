import { computed } from 'vue'
import { piniaGlobalStore } from '../modules/global'
import { globalApi } from '@/apis'
import { getLocalCache, removeLocalCache, setLocalCache } from '@/utils'
import { BLOG_TOKEN, BLOG_REFRESH_TOKEN } from '@/constants'
import { useUserActions } from './use-user-store'
import { useRouter } from 'vue-router'
import type { LoginParams } from '@/apis/modules/global/type'

export const useGlobalGetters = () => {
	const globalStore = piniaGlobalStore()

	// 获取作者信息
	const getAuthorInfo = computed(() => {
		return globalStore.authorInfo
	})

	// route-animation
	const getRouteAnimation = computed(() => globalStore.routeAnimation)
	// 灰色模式
	const getGrayMode = computed(() => globalStore.grayMode)
	// 色弱模式
	const getColorWeakness = computed(() => globalStore.colorWeakness)
	// 字体美化
	const getFontBeautify = computed(() => globalStore.fontBeautify)
	// 主题切换
	const getTheme = computed(() => globalStore.theme)
	// 获取主色
	const getPrimaryColor = computed(() => globalStore.primaryColor)
	// 获取站点首页信息
	const getSiteHomeInfo = computed(() => globalStore.siteHomeInfo)
	// 获取token
	const getToken = computed(() => globalStore.token)

	return {
		getAuthorInfo,
		getRouteAnimation,
		getGrayMode,
		getColorWeakness,
		getFontBeautify,
		getTheme,
		getPrimaryColor,
		getSiteHomeInfo,
		getToken
	}
}

export const useGlobalActions = () => {
	const {
		setAuthorInfo,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		toggleFontBeautify,
		toggleTheme,
		setPrimaryColor,
		setSiteHomeInfo,
		setToken
	} = piniaGlobalStore()
	const { reqGetLoginUserInfo, clearLoginUserInfo } = useUserActions()
	const router = useRouter()

	// 登录
	const login = async (data: LoginParams) => {
		const resp = await globalApi.reqLogin(data)
		setToken(resp.data.accessToken)
		setLocalCache(BLOG_TOKEN, resp.data.accessToken)
		setLocalCache(BLOG_REFRESH_TOKEN, resp.data.refreshToken)

		// 获取登录的用户信息
		await reqGetLoginUserInfo()
	}

	// 退出登录
	const logout = async () => {
		setToken('')
		clearLoginUserInfo()
		removeLocalCache(BLOG_TOKEN)
		removeLocalCache(BLOG_REFRESH_TOKEN)
		router.push('/home')
	}

	// 获取站点首页信息
	const reqGetSiteHomeInfo = async () => {
		const resp = await globalApi.reqGetSiteHomeInfo()
		setSiteHomeInfo(resp.data)
	}

	// 加载本地数据
	const loadLocal = async () => {
		const token = getLocalCache(BLOG_TOKEN)
		if (token) {
			await reqGetLoginUserInfo()
		}
	}

	return {
		setAuthorInfo,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		toggleFontBeautify,
		toggleTheme,
		setPrimaryColor,
		login,
		reqGetSiteHomeInfo,
		loadLocal,
		logout
	}
}
