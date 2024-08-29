const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('token') })
const { token, getCaptcha } = require('@con-back/token.controller')

// 获取token
router.post('/', token)

// 获取验证码
router.get('/captcha', getCaptcha)

module.exports = router
