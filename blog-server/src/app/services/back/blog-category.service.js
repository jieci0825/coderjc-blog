const { Blog } = require('@model/blog.model')
const { BlogCategory } = require('@model/blog-category.model')
const { sequelize } = require('@/core/db')
const { Collide } = require('@/core/error-type')

/**
 * 创建博客分类
 * @param {Object} data
 */
async function createBlogCategory(data) {
	if (!data) return
	const insertData = {
		category_name: data.categoryName
	}

	const blogCategoryInfo = await BlogCategory.findOne({ where: { category_name: data.categoryName } })
	if (blogCategoryInfo) throw new Collide('博客分类名称已存在')

	await BlogCategory.create(insertData)
}

/**
 * 获取博客分类列表
 */
async function getBlogCategoryList() {
	const blogCategoryList = await BlogCategory.findAll()
	return blogCategoryList
}

/**
 * 编辑博客分类
 * @param {Object} data
 */
async function editBlogCategory(data) {
	const updateData = {
		category_name: data.categoryName
	}

	const isBlogCategoryExist = await BlogCategory.findOne({ where: { id: data.id } })
	if (!isBlogCategoryExist) throw new NotFound('博客分类不存在')
	const blogCategoryInfo = await BlogCategory.findOne({ where: { category_name: data.categoryName } })
	if (blogCategoryInfo) throw new Collide('博客分类名称已存在')

	await BlogCategory.update(updateData, { where: { id: data.id } })
}

/**
 * 删除博客分类
 * @param {Number} id
 */
async function deleteBlogCategory(id) {
	const isBlogCategoryExist = await BlogCategory.findOne({ where: { id } })
	if (!isBlogCategoryExist) throw new NotFound('博客分类不存在')

	const result = await sequelize.transaction(async t => {
		await BlogCategory.destroy({ where: { id }, force: true, transaction: t })
		// 修改所有与此分类相关博客的博客分类id为 null
		await Blog.update({ category_id: null }, { where: { category_id: id }, transaction: t })
	})

	return result
}

module.exports = {
	createBlogCategory,
	getBlogCategoryList,
	editBlogCategory,
	deleteBlogCategory
}
