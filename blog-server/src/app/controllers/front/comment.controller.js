const {
	publishParentCommentRules,
	getParentCommentRules,
	publishChildCommentRules,
	getChildCommentRules
} = require('@/app/rules/front/comment.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const commentService = require('@ser-front/comment.service')

/**
 * 发布父级评论
 */
async function publishParentComment(ctx) {
	const { data } = new Validator().validate(ctx, publishParentCommentRules)
	const result = await commentService.publishParentComment(data, ctx.decode.id)
	throw new DataSuccess(result, '评论发布成功')
}

/**
 * 获取父级评论
 */
async function getParentComment(ctx) {
	const { data } = new Validator().validate(ctx, getParentCommentRules)
	const result = await commentService.getParentComment(data, ctx.decode.id)
	throw new DataSuccess(result)
}

/**
 * 发布子级评论
 */
async function publishChildComment(ctx) {
	const { data } = new Validator().validate(ctx, publishChildCommentRules)
	const result = await commentService.publishChildComment(data, ctx.decode.id)
	throw new DataSuccess(result, '评论发布成功')
}

/**
 * 获取子级评论
 */
async function getChildComment(ctx) {
	const { data } = new Validator().validate(ctx, getChildCommentRules)
	const result = await commentService.getChildComment(data, ctx.decode.id)
	throw new DataSuccess(result)
}

module.exports = {
	publishParentComment,
	getParentComment,
	publishChildComment,
	getChildComment
}
