const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('global') })
const {
	getAuthorInfo,
	getSiteHomeInfo,
	getCredential,
	createFileRecord,
	increaseSiteVisit,
	getDailyQuote
} = require('@con-front/global.controller')
const { verifyFrontToken } = require('@/middleware/auth.middleware')

// 获取作者信息
router.get('/auhtor', getAuthorInfo)

// 获取站点首页信息
router.get('/site-home-info', getSiteHomeInfo)

// 获取临时凭证
router.get('/credential', verifyFrontToken, getCredential)

// 创建文件记录
router.post('/record', verifyFrontToken, createFileRecord)

// 访问站点
router.get('/visit', increaseSiteVisit)

// 获取每日一言
router.get('/daily-quote', getDailyQuote)

module.exports = router
