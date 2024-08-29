const { DailyQuote } = require('@model/daily-quote.model')
const { Op } = require('sequelize')

/**
 * 创建每日一言
 */
async function createDailyQuote(data) {
	const insertData = {
		content: data.content,
		author: data.author
	}

	await DailyQuote.create(insertData)
}

/**
 * 编辑每日一言
 */
async function editDailyQuote(data) {
	const updateData = {
		content: data.content,
		author: data.author
	}

	await DailyQuote.update(updateData, { where: { id: data.id } })
}

/**
 * 获取每日一言列表
 */
async function getDailyQuoteList(condition) {
	const where = {}
	if (condition.content) {
		where.content = {
			[Op.substring]: condition.content
		}
	}

	const { rows, count } = await DailyQuote.findAndCountAll({
		where,
		order: [['id', 'desc']],
		offset: condition.page,
		limit: condition.pageSize
	})

	return { list: rows, total: count }
}

/**
 * 删除每日一言
 */
async function deleteDailyQuote(id) {
	await DailyQuote.destroy({ where: { id }, force: true })
}

module.exports = {
	createDailyQuote,
	editDailyQuote,
	getDailyQuoteList,
	deleteDailyQuote
}
