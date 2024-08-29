import dayjs from 'dayjs'

export function formatTime(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(date).format(format)
}

// 检测是否为空
export function isEmpty(value: any): boolean {
	return value === null || value === undefined || value === ''
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

/**
 * 格式化文件类型
 */
export function formatFileType(type: string) {
	return `.${type.split('/').pop()}`
}

/**
 * 格式化歌词方法-->字符串转为数组
 */
export function formatLrc(data: string): any {
	if (!data) return []
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
