const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('user') })
const { verifyFrontToken, verifyCaptcha } = require('@/middleware/auth.middleware')
const {
	getLoginUserInfo,
	register,
	editMyInfo,
	modifyUserPassword,
	replaceBindEmail
} = require('@con-front/user.controller')

// 获取登录用户的信息
router.get('/', verifyFrontToken, getLoginUserInfo)

// 注册用户
router.post('/register', verifyCaptcha, register)

// 编辑当前登录用户的个人信息
router.put('/my', verifyFrontToken, editMyInfo)

// 修改用户密码
router.put('/modify-password', verifyFrontToken, verifyCaptcha, modifyUserPassword)

// 换绑邮箱
router.put('/replace-email', verifyFrontToken, verifyCaptcha, replaceBindEmail)

module.exports = router
