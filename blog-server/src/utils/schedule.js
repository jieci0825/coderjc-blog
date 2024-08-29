const schedule = require('node-schedule')
const { SiteData } = require('@/app/models/site-data.model')
const { formatDateTime } = require('.')

/**
 * 每天0点给 site_datas 表增加一条数据
 */
async function createSiteData() {
	const rule = new schedule.RecurrenceRule()
	rule.hour = 0
	rule.minute = 0
	rule.second = 0
	// 启动任务
	schedule.scheduleJob(rule, async () => {
		const today = formatDateTime(new Date(), 'YYYY-MM-DD')
		// 如果今天的日期存在，则不创建
		const data = await SiteData.findOne({ where: { date: today } })
		if (!data) {
			SiteData.create({ date: today })
		}
	})
}

module.exports = {
	createSiteData
}
