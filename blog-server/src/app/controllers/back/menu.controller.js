const { createMenuRule, editMenuRule } = require('@/app/rules/back/menu.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const menuServicve = require('@ser-back/menu.service')

/**
 * 创建菜单
 */
async function createMenu(ctx) {
	const { data } = new Validator().validate(ctx, createMenuRule)
	await menuServicve.createMenu(data)
	throw new Success('创建菜单成功')
}

/**
 * 编辑菜单
 */
async function editMenu(ctx) {
	const { data } = new Validator().validate(ctx, editMenuRule)
	await menuServicve.editMenu(data)
	throw new Success('编辑菜单成功')
}

/**
 * 获取菜单列表
 */
async function getMenuList(ctx) {
	const data = ctx.request.query
	const result = await menuServicve.getMenuList(data)
	throw new DataSuccess(result)
}

/**
 * 删除菜单
 */
async function deleteMenu(ctx) {
	const { id } = ctx.params
	await menuServicve.deleteMenu(id)
	throw new Success('删除菜单成功')
}

module.exports = {
	createMenu,
	editMenu,
	getMenuList,
	deleteMenu
}
