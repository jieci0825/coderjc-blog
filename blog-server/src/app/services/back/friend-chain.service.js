const { Collide } = require('@/core/error-type')
const { FriendChainCategory } = require('@model/friend-chain-category')
const { FriendChain } = require('@model/friend-chain.model')
const { Op } = require('sequelize')

/**
 * 添加友人链分类
 */
async function createFriendChainCategory(data) {
	const category = await FriendChainCategory.findOne({ where: { category_name: data.categoryName } })
	if (category) {
		throw new Collide('友人链分类已存在')
	}
	const insertData = { category_name: data.categoryName }
	await FriendChainCategory.create(insertData)
}

/**
 * 获取友人链分类列表
 */
async function getFriendChainCategoryList() {
	const categoryList = await FriendChainCategory.findAll()
	return categoryList
}

/**
 * 编辑友人链分类
 */
async function editFriendChainCategory(data) {
	const category = await FriendChainCategory.findOne({ where: { category_name: data.categoryName } })
	if (category) {
		throw new Collide('友人链分类已存在')
	}
	const updateData = { category_name: data.categoryName }
	await FriendChainCategory.update(updateData, { where: { id: data.id } })
}

/**
 * 删除友人链分类
 */
async function deleteFriendChainCategory(id) {
	await FriendChainCategory.destroy({ where: { id } })
}

/**
 * 添加链接
 */
async function createFriendChainLink(data) {
	const link = await FriendChain.findOne({ where: { link_name: data.linkName } })
	if (link) {
		throw new Collide('链接名称已存在')
	}
	const inserData = {
		link_name: data.linkName,
		link_desc: data.linkDesc,
		link_url: data.linkUrl,
		link_preview: data.linkPreview,
		link_category_id: data.linkCategoryId
	}
	await FriendChain.create(inserData)
}

/**
 * 获取链接列表
 */
async function getFriendChainLinkList(data) {
	const where = {}
	if (data.linkName) {
		where.link_name = { [Op.substring]: data.linkName }
	}
	const { rows, count } = await FriendChain.findAndCountAll({ where, offset: data.page, limit: data.pageSize })
	const categoryId = rows.map(item => item.link_category_id)
	const categoryList = await FriendChainCategory.findAll({ where: { id: categoryId } })
	for (const row of rows) {
		const category = categoryList.find(category => category.id === row.link_category_id)
		row.dataValues.link_category_name = category.category_name
	}
	return { list: rows, total: count }
}

/**
 * 编辑链接
 */
async function editFriendChainLink(data) {
	const updateData = {
		link_name: data.linkName,
		link_desc: data.linkDesc,
		link_url: data.linkUrl,
		link_preview: data.linkPreview,
		link_category_id: data.linkCategoryId
	}
	await FriendChain.update(updateData, { where: { id: data.id } })
}

/**
 * 删除链接
 */
async function deleteFriendChainLink(id) {
	await FriendChain.destroy({ where: { id } })
}

module.exports = {
	createFriendChainCategory,
	getFriendChainCategoryList,
	editFriendChainCategory,
	deleteFriendChainCategory,
	createFriendChainLink,
	getFriendChainLinkList,
	editFriendChainLink,
	deleteFriendChainLink
}
