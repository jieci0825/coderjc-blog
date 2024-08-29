const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('role') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const {
	createRole,
	getRoleList,
	deleteRole,
	assignPermission,
	editRole,
	getMenuListByRoleId
} = require('@con-back/role.controller')

// 创建角色
router.post('/', verifyToken, createRole)

// 获取角色列表
router.get('/', verifyToken, getRoleList)

// 删除角色
router.delete('/:id', verifyToken, verifySuperAdmin, deleteRole)

// 给角色分配权限
router.post('/assign-permission', verifyToken, verifySuperAdmin, assignPermission)

// 编辑角色信息
router.put('/', verifyToken, verifySuperAdmin, editRole)

// 根据角色id获取菜单列表
router.get('/menu/:id', verifyToken, getMenuListByRoleId)

module.exports = router
