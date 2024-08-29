const { editTagRules } = require('@/app/rules/back/tag.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const tagService = require('@ser-back/blog-tag.service')

/**
 * 创建标签
 */
async function createBlogTags(ctx) {
	const { tagNames } = ctx.request.body
	await tagService.createBlogTags(tagNames)
	throw new Success('创建标签成功')
}

/**
 * 获取标签列表
 */
async function getBlogTagList(ctx) {
	const { data } = new Validator().validate(ctx)
	const result = await tagService.getBlogTagList(data)
	throw new DataSuccess(result, '获取标签列表成功')
}

/**
 * 编辑标签
 */
async function editBlogTag(ctx) {
	const { data } = new Validator().validate(ctx, editTagRules)
	await tagService.editBlogTag(data)
	throw new Success('编辑标签成功')
}

/**
 * 删除标签
 */
async function deleteBlogTag(ctx) {
	const { data } = new Validator().validate(ctx)
	await tagService.deleteBlogTag(data.id)
	throw new Success('删除标签成功')
}

module.exports = {
	createBlogTags,
	getBlogTagList,
	editBlogTag,
	deleteBlogTag
}
