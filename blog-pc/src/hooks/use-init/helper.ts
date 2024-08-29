import { BLOG_GLOBAL_CONFIG, DEFAULT_PRIMARY_COLOR } from '@/constants'
import { switchFontBeautify } from '@/store/modules/global/helper'
import { getLocalCache } from '@/utils'
import { useTheme } from '../use-theme'

const { switchTheme, setPrimaryColor } = useTheme()

// 初始化字体美化
export const initFontBeautify = () => {
	const isFontBeautify = getLocalCache(BLOG_GLOBAL_CONFIG) ? getLocalCache(BLOG_GLOBAL_CONFIG).fontBeautify : true
	switchFontBeautify(isFontBeautify)
}

// 初始化主题
export const initTheme = () => {
	const theme = getLocalCache(BLOG_GLOBAL_CONFIG) ? getLocalCache(BLOG_GLOBAL_CONFIG).theme : 'light'
	switchTheme(theme)
}

// 初始化primaryColor
export const initPrimaryColor = () => {
	const primaryColor = getLocalCache(BLOG_GLOBAL_CONFIG)
		? getLocalCache(BLOG_GLOBAL_CONFIG).primaryColor
		: DEFAULT_PRIMARY_COLOR
	setPrimaryColor(primaryColor)
}
