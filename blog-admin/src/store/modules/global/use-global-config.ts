import { reactive, watch } from 'vue'
import { getLocalCache, setLocalCache } from '@/utils'
import { BLOG_ADMIN_GLOBAL_CONFIG, LAYOUT_MODE } from '@/constants'
import type { GlobalConfig, LayoutModeType } from './type'

export function useGlobalConfig() {
	// 全局配置
	const defaultGlobalConfig: GlobalConfig = {
		isCollapse: false,
		isAccordion: false,
		routeAnimation: 'fade',
		asideWidth: 240,
		grayMode: false,
		colorWeakness: false,
		layoutMode: LAYOUT_MODE.VERTICAL
	}
	const globalConfig = reactive<GlobalConfig>(
		Object.assign(defaultGlobalConfig, getLocalCache(BLOG_ADMIN_GLOBAL_CONFIG) || {})
	)
	const toggleCollapse = (value?: boolean) => setSwitchGlobalConfig('isCollapse', value)
	const toggleAccordion = (value?: boolean) => setSwitchGlobalConfig('isAccordion', value)
	const toggleGrayMode = (value?: boolean) => {
		setSwitchGlobalConfig('grayMode', value)
		document.body.classList.toggle('gray-mode', value)
	}
	const toggleColorWeakness = (value?: boolean) => {
		setSwitchGlobalConfig('colorWeakness', value)
		document.body.classList.toggle('color-weakness', value)
	}
	const setRouteAnimation = (value: string) => (globalConfig.routeAnimation = value)
	const setMenuWidth = (value: number) => (globalConfig.asideWidth = value)
	const setLayoutMode = (value: LayoutModeType) => (globalConfig.layoutMode = value)

	watch(
		() => globalConfig,
		() => storageGlobalConfig(),
		{ deep: true, immediate: true }
	)

	// 存储全局配置
	function storageGlobalConfig() {
		setLocalCache(BLOG_ADMIN_GLOBAL_CONFIG, globalConfig)
	}

	// 设置开关的全局配置
	function setSwitchGlobalConfig(field: keyof GlobalConfig, value?: boolean) {
		;(globalConfig[field] as boolean) = value === undefined ? !globalConfig[field] : value
	}

	return {
		globalConfig,
		toggleCollapse,
		toggleAccordion,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		setMenuWidth,
		setLayoutMode
	}
}
