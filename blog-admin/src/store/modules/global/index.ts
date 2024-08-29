import { defineStore } from 'pinia'
import { ref, toRefs } from 'vue'
import { getLocalCache, removeLocalCache, setLocalCache } from '@/utils'
import { useGlobalConfig } from './use-global-config'
import { BLOG_ADMIN_TOKEN } from '@/constants'

export const piniaGlobalStore = defineStore('global', () => {
	// token
	const token = ref<string | undefined>(getLocalCache(BLOG_ADMIN_TOKEN))
	const setToken = (value: string) => {
		setLocalCache(BLOG_ADMIN_TOKEN, value)
		token.value = value
	}
	const clearToken = () => {
		removeLocalCache(BLOG_ADMIN_TOKEN)
		token.value = undefined
	}

	// refresh
	const refresh = ref(true)
	const handleRefresh = () => (refresh.value = !refresh.value)

	const {
		globalConfig,
		toggleCollapse,
		toggleAccordion,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		setMenuWidth,
		setLayoutMode
	} = useGlobalConfig()

	return {
		...toRefs(globalConfig),
		token,
		refresh,
		setToken,
		clearToken,
		setMenuWidth,
		handleRefresh,
		toggleGrayMode,
		toggleCollapse,
		toggleAccordion,
		toggleColorWeakness,
		setRouteAnimation,
		setLayoutMode
	}
})
