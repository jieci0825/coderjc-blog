import dayjs from 'dayjs'
import router from '@/routers'
import routeDynamicConfig from '@/routers/route-dynamic'
import type { MenuItem } from '@/apis/modules/menu/type'
import type { RouteRecordRaw } from 'vue-router'

// 格式化时间
export function formatTime(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(date).format(format)
}

// 检测是否为空
export function isEmpty(value: any): boolean {
	return value === null || value === undefined || value === ''
}

// 获取符合条件的动态路由
export function getDynamicRoutes(routes: RouteRecordRaw[], menus: MenuItem[], routeList: RouteRecordRaw[]) {
	menus.forEach(menu => {
		const route = routes.find(route => route.name === menu.menuName)
		if (menu.children && menu.children.length > 0) {
			getDynamicRoutes(routes, menu.children, routeList)
		}
		if (route) {
			route.meta = {
				...route.meta,
				id: menu.id,
				hidden: menu.menuStatus,
				title: menu.menuTitle,
				icon: menu.menuIcon,
				name: menu.menuName
			}
			routeList.push(route)
		}
	})

	return routeList
}

// 注册动态路由
export function registerDynamicRoutes(routes: RouteRecordRaw[], menus: MenuItem[]) {
	const routeList: RouteRecordRaw[] = []
	getDynamicRoutes(routes, menus, routeList)
	// 添加路由配置
	routeList.forEach(route => {
		router.addRoute('layout', route)
	})
}

// 移除动态路由
export function removeDynamicRoutes() {
	routeDynamicConfig.forEach(route => {
		router.removeRoute(route.name as string)
	})
}

// 获取在 tree 数据中一个节点的所有祖先元素
export function getAncestorNodes<T extends { [key: string]: any }>(tree: T[], value: any, field: keyof T): T[] {
	const getNodes = (list: T[]) => {
		for (const item of list) {
			if (item[field] === value) {
				return [item]
			}
			if (item.children && item.children.length > 0) {
				const result: any = getNodes(item.children)
				if (result && result.length) {
					result.push(item)
					return result
				}
			}
		}
		return undefined
	}
	return getNodes(tree)
}

// 转换文件大小单位
const units = ['B', 'KB', 'MB', 'GB'] as const
type ByteUnit = (typeof units)[number]
export function convertBytes(bytes: number, toUnit: ByteUnit = 'MB') {
	const index = units.indexOf(toUnit.toUpperCase() as ByteUnit)

	if (index === -1) {
		throw new Error(`无效的单位。请使用以下其中之一: ${units.join(', ')}`)
	}

	let result = bytes
	for (let i = 0; i < index; i++) {
		result /= 1024
	}

	return result.toFixed(2) + ' ' + units[index]
}

/**
 * 格式化时间
 * @param timestamp 时间戳
 */
export function formatTimestamp(timestamp?: number) {
	timestamp = timestamp || Date.now()
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')
	const milliseconds = String(date.getMilliseconds()).padStart(3, '0')
	return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`
}

/**
 * 生成随机字符串
 * @param len 字符串长度
 * @returns
 */
export function randomStr(len: number = 6): string {
	if (len <= 0) return ''
	// toString(36) 最多只能生成 11 位字符
	if (len <= 11) {
		return Math.random()
			.toString(36)
			.substring(2, 2 + len)
			.padEnd(len, '0')
	} else {
		// 如果需要的长度大于11，就使用递归实现
		return randomStr(11) + randomStr(len - 11)
	}
}

const fileTypeMap: { [key: string]: string } = {
	mpeg: 'mp3'
}

/**
 * 格式化文件类型
 */
export function formatFileType(type: string) {
	const _type = type.split('/').pop()
	return `.${fileTypeMap[_type!] || _type}`
}

/**
 * 在一个数组指定的索引位置上添加一项元素
 */
export function addAtIndex<T>(arr: T[], index: number, item: T): T[] {
	if (index < 0 || index > arr.length) {
		throw new Error('Index out of range')
	}

	return [...arr.slice(0, index), item, ...arr.slice(index)]
}

interface SetAtIndex<T> {
	value: any // 进行设置的新值
	prop: keyof T // 要进行设置的属性
	field: keyof T // 用于查找的属性
	target: any // 用于查找的目标值
}

/**
 * 设置数组中某一项的值
 */
export function setAtIndex<T>(arr: T[], options: SetAtIndex<T>): void {
	const item = arr.find(item => item[options.field] === options.target)
	if (item) item[options.prop] = options.value
}

/**
 * 格式化歌词方法-->字符串转为数组
 */
export function formatLrc(data: string): any {
	const lrcs: any[] = data
		.replaceAll('"', '')
		.split('\\n')
		.map((item: string) => {
			return {
				time: formatLyricTime(item),
				lrc: item.split(']')[1]
			}
		})
	return lrcs
}

/**
 * 将歌词的时间转为数值
 */
export function formatLyricTime(str: string) {
	const res = str.split(']')[0].substring(1)
	// 提取分钟
	const m = +res.split(':')[0]
	// 提取秒
	const s = +res.split(':')[1]
	// 保留两位小数
	return Number((m * 60 + s).toFixed(2))
}
