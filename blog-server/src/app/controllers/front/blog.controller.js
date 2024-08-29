const { getBlogRankRules, getBlogListRules } = require('@/app/rules/front/blog.rule')
const { DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const backBlogCategoryService = require('@ser-back/blog-category.service')
const backBlogService = require('@ser-back/blog.service')
const blogService = require('@ser-front/blog.service')

/**
 * 获取博客分类列表
 */
async function getBlogCategoryList(ctx) {
	const result = await backBlogCategoryService.getBlogCategoryList()
	throw new DataSuccess(result)
}

/**
 * 获取博客排行榜
 */
async function getBlogRank(ctx) {
	const { data } = new Validator().validate(ctx, getBlogRankRules)
	const result = await blogService.getBlogRank(data)
	throw new DataSuccess(result)
}

/**
 * 获取博客列表
 */
async function getBlogList(ctx) {
	const { data } = new Validator().validate(ctx, getBlogListRules)
	const result = await backBlogService.getBlogList(data, 'front')
	throw new DataSuccess(result)
}

/**
 * 获取博客详情
 */
async function getBlogDetail(ctx) {
	const { id } = ctx.params
	const result = await backBlogService.getBlogDetail(id, ctx.decode.id)
	throw new DataSuccess(result)
}

module.exports = {
	getBlogCategoryList,
	getBlogRank,
	getBlogList,
	getBlogDetail
}
