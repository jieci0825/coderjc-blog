const { DataSuccess } = require('@/core/error-type')
const { getDaysDiff } = require('@/utils')
const siteService = require('@ser-back/site.service')

/**
 * 获取站点首页信息
 */
async function getSiteHomeInfo(ctx) {
	const data = { ...global.config.siteHomeInfo }
	data.runDays = getDaysDiff(data.publish, new Date())
	throw new DataSuccess(data)
}

/**
 * 获取站点访问数据
 */
async function getSiteVisits(ctx) {
	const result = await siteService.getSiteVisits()
	throw new DataSuccess(result)
}

/**
 * 获取站点其他统计数据
 */
async function getSiteOtherStatistics() {
	const result = await siteService.getSiteOtherStatistics()
	throw new DataSuccess(result)
}

module.exports = { getSiteHomeInfo, getSiteVisits, getSiteOtherStatistics }
