const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('friend-chain') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const {
	createFriendChainCategory,
	getFriendChainCategoryList,
	editFriendChainCategory,
	deleteFriendChainCategory,
	createFriendChainLink,
	getFriendChainLinkList,
	editFriendChainLink,
	deleteFriendChainLink
} = require('@con-back/friend-chain.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 添加友人链分类
router.post('/category', verifyToken, verifySuperAdmin, createFriendChainCategory)

// 获取友人链分类列表
router.get('/category', verifyToken, verifySuperAdmin, getFriendChainCategoryList)

// 编辑友人链分类
router.put('/category', verifyToken, verifySuperAdmin, editFriendChainCategory)

// 删除友人链分类
router.delete('/category/:id', verifyToken, verifySuperAdmin, deleteFriendChainCategory)

// 添加链接
router.post('/link', verifyToken, verifySuperAdmin, createFriendChainLink)

// 获取链接列表
router.get('/link', verifyToken, verifySuperAdmin, parsePageInfo, getFriendChainLinkList)

// 编辑链接
router.put('/link', verifyToken, verifySuperAdmin, editFriendChainLink)

// 删除链接
router.delete('/link/:id', verifyToken, verifySuperAdmin, deleteFriendChainLink)

module.exports = router
