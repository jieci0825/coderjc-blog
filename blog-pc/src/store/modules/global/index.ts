import { defineStore } from 'pinia'
import { ref, watch, reactive, toRefs } from 'vue'
import { setLocalCache, getLocalCache, removeLocalCache } from '@/utils'
import { BLOG_GLOBAL_CONFIG, BLOG_TOKEN, DEFAULT_PRIMARY_COLOR } from '@/constants'
import { switchFontBeautify } from './helper'
import { useTheme } from '@/hooks/use-theme'
import type { AuthorInfo } from '@/apis/modules/global/type'
import type { GlobalConfig, ThemeType } from './type'
import type { SiteHomeInfo } from '@/apis/modules/global/type'

const { setPrimaryColor: setThemePrimaryColor } = useTheme()

export const piniaGlobalStore = defineStore('global', () => {
	// 作者信息
	const authorInfo = ref<AuthorInfo | null>(null)
	const setAuthorInfo = (info: AuthorInfo) => {
		authorInfo.value = info
	}

	// token
	const token = ref<string | undefined>(getLocalCache(BLOG_TOKEN))
	const setToken = (value: string) => {
		setLocalCache(BLOG_TOKEN, value)
		token.value = value
	}
	const clearToken = () => {
		removeLocalCache(BLOG_TOKEN)
		token.value = undefined
	}

	// 全局配置
	const defaultGlobalConfig: GlobalConfig = {
		routeAnimation: 'fade',
		grayMode: false,
		colorWeakness: false,
		fontBeautify: true,
		theme: 'light',
		primaryColor: DEFAULT_PRIMARY_COLOR
	}
	const globalConfig = reactive<GlobalConfig>(
		Object.assign(defaultGlobalConfig, getLocalCache(BLOG_GLOBAL_CONFIG) || {})
	)
	const toggleGrayMode = (value?: boolean) => {
		setSwitchGlobalConfig('grayMode', value)
		document.body.classList.toggle('gray-mode', value)
	}
	const toggleColorWeakness = (value?: boolean) => {
		setSwitchGlobalConfig('colorWeakness', value)
		document.body.classList.toggle('color-weakness', value)
	}
	const setRouteAnimation = (value: string) => (globalConfig.routeAnimation = value)
	const toggleFontBeautify = (value: boolean) => {
		setSwitchGlobalConfig('fontBeautify', value)
		switchFontBeautify(value)
	}
	const toggleTheme = (value: ThemeType) => {
		globalConfig.theme = value
	}
	const setPrimaryColor = (value: string) => {
		globalConfig.primaryColor = value
		setThemePrimaryColor(value)
	}

	watch(
		() => globalConfig,
		() => storageGlobalConfig(),
		{ deep: true, immediate: true }
	)

	// 存储全局配置
	function storageGlobalConfig() {
		setLocalCache(BLOG_GLOBAL_CONFIG, globalConfig)
	}

	// 设置开关的全局配置
	function setSwitchGlobalConfig(field: keyof GlobalConfig, value?: boolean) {
		;(globalConfig[field] as boolean) = value === undefined ? !globalConfig[field] : value
	}

	// 站点首页信息
	const siteHomeInfo = ref<SiteHomeInfo | null>()
	const setSiteHomeInfo = (data: SiteHomeInfo) => {
		siteHomeInfo.value = data
	}

	return {
		...toRefs(globalConfig),
		authorInfo,
		setAuthorInfo,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		toggleFontBeautify,
		toggleTheme,
		setPrimaryColor,
		token,
		setToken,
		clearToken,
		siteHomeInfo,
		setSiteHomeInfo
	}
})
