const { BlogTag } = require('@model/blog-tag.model')
const { BlogTagUnite } = require('@model/blog-tag.unite.model')
const { Collide } = require('@/core/error-type')
const { sequelize } = require('@/core/db')
const { Op } = require('sequelize')

/**
 * 创建标签
 * @param {string[]} tagNames 标签名数组
 */
async function createBlogTags(tagNames) {
	if (!tagNames || !tagNames.length) return
	const insertData = tagNames.map(name => ({ tag_name: name }))
	const tagList = await BlogTag.findAll({ where: { tag_name: tagNames } })
	if (tagList.length) throw new Collide('标签名称已存在')
	await BlogTag.bulkCreate(insertData, { ignoreDuplicates: true })
}

/**
 * 获取标签列表
 */
async function getBlogTagList(data) {
	const where = {}
	if (data.tagName) where.tag_name = { [Op.substring]: data.tagName }

	const { rows, count } = await BlogTag.findAndCountAll({ where, offset: data.page, limit: data.pageSize })
	return { list: rows, total: count }
}

/**
 * 编辑标签
 */
async function editBlogTag(data) {
	const isTagExist = await BlogTag.findOne({ where: { id: data.id } })
	if (!isTagExist) throw new Collide('标签不存在')

	const isTagNameExist = await BlogTag.findOne({ where: { tag_name: data.tagName } })
	if (isTagNameExist) throw new Collide('标签名称已存在')

	await BlogTag.update({ tag_name: data.tagName }, { where: { id: data.id } })
}

/**
 * 删除标签
 */
async function deleteBlogTag(id) {
	if (!id) return
	const isTagExist = await BlogTag.findOne({ where: { id } })
	if (!isTagExist) throw new Collide('标签不存在')

	const result = await sequelize.transaction(async t => {
		// 删除标签与博客的关联
		await BlogTagUnite.destroy({ where: { tag_id: id }, force: true, transaction: t })
		// 删除标签
		await BlogTag.destroy({ where: { id }, force: true, transaction: t })
	})

	return result
}

module.exports = {
	createBlogTags,
	getBlogTagList,
	editBlogTag,
	deleteBlogTag
}
