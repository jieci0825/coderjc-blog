const {
	createFriendChainCategoryRules,
	editFriendChainCategoryRules,
	createFriendChainLinkRules,
	editFriendChainLinkRules
} = require('@/app/rules/back/friend-chain.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const friendChainService = require('@ser-back/friend-chain.service')

/**
 * 添加友人链分类
 */
async function createFriendChainCategory(ctx) {
	const { data } = new Validator().validate(ctx, createFriendChainCategoryRules)
	await friendChainService.createFriendChainCategory(data)
	throw new Success('添加友人链分类成功')
}

/**
 * 获取有人链分类列表
 */
async function getFriendChainCategoryList(ctx) {
	const result = await friendChainService.getFriendChainCategoryList()
	throw new DataSuccess(result)
}

/**
 * 编辑友人链分类
 */
async function editFriendChainCategory(ctx) {
	const { data } = new Validator().validate(ctx, editFriendChainCategoryRules)
	await friendChainService.editFriendChainCategory(data)
	throw new Success('编辑友人链分类成功')
}

/**
 * 删除友人链分类
 */
async function deleteFriendChainCategory(ctx) {
	const { id } = ctx.params
	await friendChainService.deleteFriendChainCategory(id)
	throw new Success('删除友人链分类成功')
}

/**
 * 添加链接
 */
async function createFriendChainLink(ctx) {
	const { data } = new Validator().validate(ctx, createFriendChainLinkRules)
	await friendChainService.createFriendChainLink(data)
	throw new Success('添加链接成功')
}

/**
 * 获取链接列表
 */
async function getFriendChainLinkList(ctx) {
	const { data } = new Validator().validate(ctx)
	const result = await friendChainService.getFriendChainLinkList(data)
	throw new DataSuccess(result)
}

/**
 * 编辑链接
 */
async function editFriendChainLink(ctx) {
	const { data } = new Validator().validate(ctx, editFriendChainLinkRules)
	await friendChainService.editFriendChainLink(data)
	throw new Success('编辑链接成功')
}

/**
 * 删除链接
 */
async function deleteFriendChainLink(ctx) {
	const { id } = ctx.params
	await friendChainService.deleteFriendChainLink(id)
	throw new Success('删除链接成功')
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
