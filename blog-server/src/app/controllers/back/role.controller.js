const { createRoleRules, editRoleRules } = require('@/app/rules/back/role.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const roleSerevice = require('@ser-back/role.service')

/**
 * 创建角色
 */
async function createRole(ctx) {
	const { data } = new Validator().validate(ctx, createRoleRules)
	await roleSerevice.createRole(data)
	throw new Success('创建成功')
}

/**
 * 获取角色列表
 */
async function getRoleList(ctx) {
	const result = await roleSerevice.getRoleList()
	throw new DataSuccess(result)
}

/**
 * 删除角色
 */
async function deleteRole(ctx) {
	const { id } = ctx.params
	await roleSerevice.deleteRole(id)
	throw new Success('删除角色成功')
}

/**
 * 给角色分配权限
 */
async function assignPermission(ctx) {
	const data = ctx.request.body
	await roleSerevice.assignPermission(data)
	throw new Success('分配权限成功')
}

/**
 * 编辑角色信息
 */
async function editRole(ctx) {
	const { data } = new Validator().validate(ctx, editRoleRules)
	await roleSerevice.editRole(data)
	throw new Success('编辑角色成功')
}

/**
 * 根据角色id获取菜单列表
 */
async function getMenuListByRoleId(ctx) {
	const { data } = new Validator().validate(ctx)
	const result = await roleSerevice.getMenuListByRoleId(data.id)
	throw new DataSuccess(result)
}

module.exports = {
	createRole,
	getRoleList,
	deleteRole,
	assignPermission,
	editRole,
	getMenuListByRoleId
}
