const { createDailyQuoteRules, editDailyQuoteRules } = require('@/app/rules/back/daily-quote.rule')
const { DataSuccess, Success } = require('@/core/error-type')
const { Validator } = require('@/validator')
const dailyQuoteService = require('@ser-back/daily-quote.service')

/**
 * 创建每日一言
 */
async function createDailyQuote(ctx) {
	const { data } = new Validator().validate(ctx, createDailyQuoteRules)
	await dailyQuoteService.createDailyQuote(data)
	throw new Success('创建成功')
}

/**
 * 编辑每日一言
 */
async function editDailyQuote(ctx) {
	const { data } = new Validator().validate(ctx, editDailyQuoteRules)
	await dailyQuoteService.editDailyQuote(data)
	throw new Success('编辑成功')
}

/**
 * 获取每日一言列表
 */
async function getDailyQuoteList(ctx) {
	const { data } = new Validator().validate(ctx)
	const result = await dailyQuoteService.getDailyQuoteList(data)
	throw new DataSuccess(result)
}

/**
 * 删除每日一言
 */
async function deleteDailyQuote(ctx) {
	const { id } = ctx.params
	await dailyQuoteService.deleteDailyQuote(id)
	throw new Success('删除成功')
}

module.exports = {
	createDailyQuote,
	editDailyQuote,
	getDailyQuoteList,
	deleteDailyQuote
}
