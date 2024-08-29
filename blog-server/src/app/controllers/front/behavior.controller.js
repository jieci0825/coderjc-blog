const { Success } = require('@/core/error-type')
const { Validator } = require('@/validator')
const { createLikeRules, closeLikeRules } = require('@/app/rules/front/behavior.rule')
const behaviorService = require('@ser-front/behavior.service')

/**
 * 点赞
 */
async function createLike(ctx) {
	const { data } = new Validator().validate(ctx, createLikeRules)
	await behaviorService.createLike(data, ctx.decode.id)
	throw new Success('点赞成功')
}

/**
 * 取消点赞
 */
async function cancelLike(ctx) {
	const { data } = new Validator().validate(ctx, closeLikeRules)
	await behaviorService.cancelLike(data, ctx.decode.id)
	throw new Success('取消点赞成功')
}

module.exports = {
	createLike,
	cancelLike
}
