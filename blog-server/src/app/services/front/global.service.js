const { User } = require('@model/user.model')
const { SiteData } = require('@model/site-data.model')
const { DailyQuote } = require('@model/daily-quote.model')
const { formatDateTime } = require('@/utils')
const { sequelize } = require('@/core/db')

/**
 * 获取作者信息
 */
async function getAuthorInfo() {
	const authroInfo = await User.findOne({
		where: { account: global.config.adminAccount },
		attributes: { exclude: ['role_id', 'password'] }
	})
	return authroInfo
}

/**
 * 增加站点访问量
 */
async function increaseSiteVisit() {
	const where = {
		date: formatDateTime(new Date(), 'YYYY-MM-DD')
	}
	const siteInfo = await SiteData.findOne({ where })
	siteInfo && (await siteInfo.increment('site_day_visits', { by: 1 }))
}

/**
 * 获取每日一言
 */
async function getDailyQuote() {
	const dailyQuote = await DailyQuote.findOne({ order: sequelize.literal('RAND()') })
	return dailyQuote
}

module.exports = {
	getAuthorInfo,
	increaseSiteVisit,
	getDailyQuote
}
