const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('user') })
const {
	createUser,
	getLoginUserInfo,
	getUserList,
	logoffUser,
	assignRole,
	getLoginUserMenuList,
	editUser,
	editMyInfo,
	modifyUserPassword,
	replaceBindEmail
} = require('@con-back/user.controller')
const { verifyToken, verifySuperAdmin, verifyCaptcha } = require('@/middleware/auth.middleware')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 创建用户
router.post('/', verifyToken, createUser)

// 获取登录用户的信息
router.get('/', verifyToken, getLoginUserInfo)

// 获取用户列表
router.get('/list', verifyToken, parsePageInfo, getUserList)

// 删除用户
router.delete('/:id', verifyToken, verifySuperAdmin, logoffUser)

// 给用户分配角色
router.post('/assign-role', verifyToken, assignRole)

// 获取登录用户的菜单列表
router.get('/menus', verifyToken, getLoginUserMenuList)

// 编辑用户信息
router.put('/', verifyToken, verifySuperAdmin, editUser)

// 编辑当前登录用户的个人信息
router.put('/my', verifyToken, editMyInfo)

// 修改用户密码
router.put('/modify-password', verifyToken, verifyCaptcha, modifyUserPassword)

// 换绑邮箱
router.put('/replace-email', verifyToken, verifyCaptcha, replaceBindEmail)

module.exports = router
