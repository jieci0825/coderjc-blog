const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('behavior') })
const { verifyFrontToken } = require('@/middleware/auth.middleware')
const { createLike, cancelLike } = require('@con-front/behavior.controller')

// 点赞
router.post('/like', verifyFrontToken, createLike)

// 取消点赞
router.post('/unlike', verifyFrontToken, cancelLike)

module.exports = router
