const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('comment') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const {
	getParentCommentList,
	getCommentDetail,
	getChildCommentList,
	deleteComment
} = require('@con-back/comment.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 获取父级评论列表
router.get('/parent', verifyToken, parsePageInfo, getParentCommentList)

// 获取评论详情
router.get('/detail', verifyToken, getCommentDetail)

// 获取子级评论列表
router.get('/child', verifyToken, parsePageInfo, getChildCommentList)

// 删除评论
router.delete('/delete', verifyToken, verifySuperAdmin, deleteComment)

module.exports = router
