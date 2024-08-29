const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('friend-chain') })
const { getFriendChainList } = require('@con-front/friend-chain.controller')

// 获取友链列表
router.get('/', getFriendChainList)

module.exports = router
