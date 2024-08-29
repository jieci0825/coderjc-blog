const { DataSuccess, Success } = require('@/core/error-type')
const { Validator } = require('@/validator')
const commentService = require('@ser-back/comment.service')
const {
	getParentCommentListRules,
	getCommentDetailRules,
	getChildCommentListRules
} = require('@/app/rules/back/comment.rule')

/**
 * 获取父级评论列表
 */
async function getParentCommentList(ctx) {
	const { data } = new Validator().validate(ctx, getParentCommentListRules)
	const result = await commentService.getParentCommentList(data)
	throw new DataSuccess(result)
}

/**
 * 获取评论详情
 */
async function getCommentDetail(ctx) {
	const { data } = new Validator().validate(ctx, getCommentDetailRules)
	const result = await commentService.getCommentDetail(data)
	throw new DataSuccess(result)
}

/**
 * 获取子级评论列表
 */
async function getChildCommentList(ctx) {
	const { data } = new Validator().validate(ctx, getChildCommentListRules)
	const result = await commentService.getChildCommentList(data)
	throw new DataSuccess(result)
}

/**
 * 删除评论
 */
async function deleteComment(ctx) {
	const { data } = new Validator().validate(ctx)
	await commentService.deleteComment(data)
	throw new Success('删除评论成功')
}

module.exports = {
	getParentCommentList,
	getCommentDetail,
	getChildCommentList,
	deleteComment
}
