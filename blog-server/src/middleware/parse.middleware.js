const { hasOwnProp } = require('@/utils')

function setPageInfo(obj) {
	obj.page = (obj.page - 1) * obj.pageSize
	obj.pageSize = +obj.pageSize
}

/**
 * 解析 pageInfo
 */
async function parsePageInfo(ctx, next) {
	// 检测 ctx.query.page 是否存在
	if (hasOwnProp(ctx.request.query, 'page')) {
		setPageInfo(ctx.request.query)
	} else if (hasOwnProp(ctx.request.body, 'page')) {
		setPageInfo(ctx.request.body)
	}

	await next()
}

module.exports = {
	parsePageInfo
}
