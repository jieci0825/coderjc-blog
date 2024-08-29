const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('daily-quote') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const {
	createDailyQuote,
	editDailyQuote,
	getDailyQuoteList,
	deleteDailyQuote
} = require('@con-back/daily-quote.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 添加每日一言
router.post('/', verifyToken, verifySuperAdmin, createDailyQuote)

// 编辑每日一言
router.put('/', verifyToken, verifySuperAdmin, editDailyQuote)

// 获取每日一言列表
router.get('/', verifyToken, verifySuperAdmin, parsePageInfo, getDailyQuoteList)

// 删除每日一言
router.delete('/:id', verifyToken, verifySuperAdmin, deleteDailyQuote)

module.exports = router
