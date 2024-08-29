const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('site') })
const { verifyToken } = require('@/middleware/auth.middleware')
const { getSiteHomeInfo, getSiteVisits, getSiteOtherStatistics } = require('@con-back/site.controller')

// 获取站点首页信息
router.get('/home-info', verifyToken, getSiteHomeInfo)

// 获取站点访问数据
router.get('/visits', verifyToken, getSiteVisits)

// 获取站点其他统计数据
router.get('/other-statistics', verifyToken, getSiteOtherStatistics)

module.exports = router
