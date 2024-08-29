const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('menu') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { createMenu, editMenu, getMenuList, deleteMenu } = require('@con-back/menu.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 创建菜单
router.post('/', verifyToken, verifySuperAdmin, createMenu)

// 编辑菜单
router.put('/', verifyToken, verifySuperAdmin, editMenu)

// 获取菜单列表
router.get('/', verifyToken, verifySuperAdmin, parsePageInfo, getMenuList)

// 删除菜单
router.delete('/:id', verifyToken, verifySuperAdmin, deleteMenu)

module.exports = router
