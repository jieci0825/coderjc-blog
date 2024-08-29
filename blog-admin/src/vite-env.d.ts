/// <reference types="vite/client" />

declare module 'nprogress'
declare module 'crypto-js'
declare module 'dayjs'
declare module '@toast-ui/editor'
declare module 'resize-observer-polyfill'
declare module 'element-plus/dist/locale/zh-cn.mjs'

declare module '*.vue' {
	import Vue from 'vue'
	export default Vue
}

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string
	readonly VITE_AES_KEY: string
	// 更多环境变量...
}
