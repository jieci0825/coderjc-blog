const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('comment') })
const { verifyFrontToken, verifyFrontTokenChoosable } = require('@/middleware/auth.middleware')
const {
	publishParentComment,
	getParentComment,
	publishChildComment,
	getChildComment
} = require('@con-front/comment.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 发布父级评论
router.post('/publish-parent', verifyFrontToken, publishParentComment)

// 获取父级评论
router.get('/parent', verifyFrontTokenChoosable, parsePageInfo, getParentComment)

// 发布子级评论
router.post('/publish-child', verifyFrontToken, publishChildComment)

// 获取子级评论
router.get('/child', verifyFrontTokenChoosable, parsePageInfo, getChildComment)

module.exports = router
