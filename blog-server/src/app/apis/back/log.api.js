const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('log') })
const { verifyToken } = require('@/middleware/auth.middleware')
const { getAccessLogData } = require('@con-back/log.controller')

// 获取访问日志数据
router.post('/access', verifyToken, getAccessLogData)

module.exports = router
