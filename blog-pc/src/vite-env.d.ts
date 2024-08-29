/// <reference types="vite/client" />

declare module 'nprogress'
declare module 'crypto-js'
declare module '@/cos'
declare module 'spark-md5'
declare module 'element-plus/dist/locale/zh-cn.mjs'

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string
	// 更多环境变量...
}

declare module '*.vue' {
	import Vue from 'vue'
	export default Vue
}