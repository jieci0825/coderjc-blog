const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('token') })
const { getToken, refresh, getCaptcha } = require('@con-front/token.controller')

// 获取token(登录)
router.post('/', getToken)

// 刷新token
router.get('/refresh', refresh)

// 获取验证码
router.get('/captcha', getCaptcha)

module.exports = router
