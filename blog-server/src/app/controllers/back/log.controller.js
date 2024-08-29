const { DataSuccess } = require('@/core/error-type')
const { getAccessLog } = require('@/utils/readline')

/**
 * 获取访问日志列表
 */
async function getAccessLogData(ctx) {
	const { date, order, page, pageSize } = ctx.request.body
	const result = await getAccessLog(date, { order, page, pageSize })
	throw new DataSuccess(result)
}

module.exports = {
	getAccessLogData
}
