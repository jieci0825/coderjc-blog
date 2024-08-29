const { Validator } = require('@/validator')
const { Success, DataSuccess } = require('@/core/error-type')
const userService = require('@ser-back/user.service')
const {
	createUserRules,
	getUserListRules,
	assignRoleRules,
	editUserRules,
	editMyInfoRules,
	modifyUserPasswordRules,
	replaceBindEmailRules
} = require('@/app/rules/back/user.rule')

/**
 * 创建用户
 */
async function createUser(ctx) {
	const { data } = new Validator().validate(ctx, createUserRules)
	await userService.createUser(data)
	throw new Success('创建用户成功')
}

/**
 * 获取登录用户的信息
 */
async function getLoginUserInfo(ctx) {
	const { id } = ctx.decode
	const result = await userService.getUserInfo(id)
	throw new DataSuccess(result)
}

/**
 * 获取用户列表
 */
async function getUserList(ctx) {
	const { data } = new Validator().validate(ctx, getUserListRules)
	const result = await userService.getUserList(data)
	throw new DataSuccess(result)
}

/**
 * 注销用户
 */
async function logoffUser(ctx) {
	const { data } = new Validator().validate(ctx)
	await userService.logoffUser(data.id)
	throw new Success('删除用户成功')
}

/**
 * 分配角色
 */
async function assignRole(ctx) {
	const { data } = new Validator().validate(ctx, assignRoleRules)
	await userService.assignRole(data)
	throw new Success('分配角色成功')
}

/**
 * 获取登录用户的菜单列表
 */
async function getLoginUserMenuList(ctx) {
	const { id } = ctx.decode
	const result = await userService.getLoginUserMenuList(id)
	throw new DataSuccess(result)
}

/**
 * 编辑用户信息
 */
async function editUser(ctx) {
	const { data } = new Validator().validate(ctx, editUserRules)
	await userService.editUser(data)
	throw new Success('编辑用户成功')
}

/**
 * 修改当前登录用户的个人信息
 */
async function editMyInfo(ctx) {
	const { data } = new Validator().validate(ctx, editMyInfoRules)
	data.userId = ctx.decode.id
	await userService.editMyInfo(data)
	throw new Success('修改个人信息成功')
}

/**
 * 修改用户密码
 */
async function modifyUserPassword(ctx) {
	const { data } = new Validator().validate(ctx, modifyUserPasswordRules)
	data.userId = ctx.decode.id
	await userService.modifyUserPassword(data)
	throw new Success('密码修改成功')
}

/**
 * 换绑邮箱
 */
async function replaceBindEmail(ctx) {
	const { data } = new Validator().validate(ctx, replaceBindEmailRules)
	data.userId = ctx.decode.id
	await userService.replaceBindEmail(data)
	throw new Success('邮箱换绑成功')
}

module.exports = {
	createUser,
	getLoginUserInfo,
	getUserList,
	logoffUser,
	assignRole,
	getLoginUserMenuList,
	editUser,
	editMyInfo,
	modifyUserPassword,
	replaceBindEmail
}
