import router from '@/routers'
import routeDynamic from '@/routers/route-dynamic'
import { computed } from 'vue'
import { piniaGlobalStore } from '../modules/global'
import { globalApi } from '@/apis'
import { encrypt } from '@/utils'
import { LoginParams } from '@/apis/modules/global/type'
import { useUserActions } from './use-user-store'
import { getLocalCache, registerDynamicRoutes, removeDynamicRoutes, removeLocalCache } from '@/utils'
import { BLOG_ADMIN_CURRENT_MENU_LIST, BLOG_ADMIN_HEADER_NAV_LIST, BLOG_ADMIN_TOKEN } from '@/constants'

export const useGlobalGetters = () => {
	const globalStore = piniaGlobalStore()

	// 获取 token
	const getToken = computed(() => globalStore.token)

	// collapse
	const getCollapse = computed(() => globalStore.isCollapse)
	// accordion
	const getAccordion = computed(() => globalStore.isAccordion)
	// route-animation
	const getRouteAnimation = computed(() => globalStore.routeAnimation)
	// menu-width
	const getAsideWidth = computed(() => globalStore.asideWidth)
	// 灰色模式
	const getGrayMode = computed(() => globalStore.grayMode)
	// 色弱模式
	const getColorWeakness = computed(() => globalStore.colorWeakness)
	// 布局模式
	const getLayoutMode = computed(() => globalStore.layoutMode)

	// isRefresj
	const getRefresh = computed(() => globalStore.refresh)

	return {
		getToken,
		getCollapse,
		getRefresh,
		getAccordion,
		getAsideWidth,
		getGrayMode,
		getLayoutMode,
		getColorWeakness,
		getRouteAnimation
	}
}

export const useGlobalActions = () => {
	const {
		setToken,
		clearToken,
		toggleCollapse,
		toggleAccordion,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		setMenuWidth,
		handleRefresh,
		setLayoutMode
	} = piniaGlobalStore()
	const { clearUserInfo, reqGetUserInfo, reqGetUserMenuList, clearUserMenuList } = useUserActions()

	// 登录
	const login = async (data: LoginParams, path?: string) => {
		const payload = Object.assign({}, data, { password: encrypt(data.password) })
		const resp = await globalApi.reqLogin(payload)
		// 存储 token
		setToken(resp.data.token)

		// 获取用户信息
		await reqGetUserInfo()

		// 获取用户菜单列表
		await reqGetUserMenuList()
		// 注册路由
		const menus = getLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST)
		registerDynamicRoutes(routeDynamic, menus)

		// 检查是否携带路径参数，携带则跳转携带的参数，没有则是默认的
		const toPath = path || '/'
		router.push(toPath)
	}

	// 退出登录
	const logout = () => {
		clearToken()
		clearUserInfo()
		clearUserMenuList()
		clearNav()
		router.push({ path: '/login' }).then(removeDynamicRoutes)
	}

	// 清空 nav
	function clearNav() {
		removeLocalCache(BLOG_ADMIN_HEADER_NAV_LIST)
	}

	// 加载本地数据
	const loadLocal = async () => {
		const token = getLocalCache(BLOG_ADMIN_TOKEN)
		if (token) {
			const menus = getLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST)
			menus && registerDynamicRoutes(routeDynamic, menus)
			await reqGetUserInfo()
		}
	}

	return {
		login,
		setToken,
		logout,
		loadLocal,
		toggleCollapse,
		handleRefresh,
		toggleAccordion,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		setMenuWidth,
		setLayoutMode
	}
}
