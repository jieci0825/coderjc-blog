const { editBlogCategoryRules, createBlogCategoryRules } = require('@/app/rules/back/blog-category.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const blogCategoryService = require('@ser-back/blog-category.service')

/**
 * 创建博客分类
 */
async function createBlogCategory(ctx) {
	const { data } = new Validator().validate(ctx, createBlogCategoryRules)
	await blogCategoryService.createBlogCategory(data)
	throw new Success('创建博客分类成功')
}

/**
 * 获取博客分类列表
 */
async function getBlogCategoryList(ctx) {
	const result = await blogCategoryService.getBlogCategoryList()
	throw new DataSuccess(result)
}

/**
 * 编辑博客分类
 */
async function editBlogCategory(ctx) {
	const { data } = new Validator().validate(ctx, editBlogCategoryRules)
	await blogCategoryService.editBlogCategory(data)
	throw new Success('编辑博客分类成功')
}

/**
 * 删除博客分类
 */
async function deleteBlogCategory(ctx) {
	const { id } = ctx.params
	await blogCategoryService.deleteBlogCategory(id)
	throw new Success('删除博客分类成功')
}

module.exports = {
	createBlogCategory,
	getBlogCategoryList,
	editBlogCategory,
	deleteBlogCategory
}
