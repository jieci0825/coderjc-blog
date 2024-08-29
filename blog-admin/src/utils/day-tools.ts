import dayjs from 'dayjs'

// 格式化日期时间
export const formatDateTime = (date: Date | string, str: string = 'YYYY-MM-DD HH:mm:ss') => {
	return dayjs(date).format(str)
}
