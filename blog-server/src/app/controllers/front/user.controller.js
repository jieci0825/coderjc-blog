const { DataSuccess, Success } = require('@/core/error-type')
const { Validator } = require('@/validator')
const backUserService = require('@ser-back/user.service')
const userService = require('@ser-front/user.service')
const { editMyInfoRules, modifyUserPasswordRules, replaceBindEmailRules } = require('@/app/rules/back/user.rule')

/**
 * 获取登录用户信息
 */
async function getLoginUserInfo(ctx) {
	const { id } = ctx.decode
	const result = await backUserService.getUserInfo(id)
	throw new DataSuccess(result)
}

/**
 * 注册
 */
async function register(ctx) {
	const { data } = new Validator().validate(ctx)
	await userService.register(data)
	throw new Success('注册成功')
}

/**
 * 修改当前登录用户的个人信息
 */
async function editMyInfo(ctx) {
	const { data } = new Validator().validate(ctx, editMyInfoRules)
	data.userId = ctx.decode.id
	await backUserService.editMyInfo(data)
	throw new Success('修改个人信息成功')
}

/**
 * 修改用户密码
 */
async function modifyUserPassword(ctx) {
	const { data } = new Validator().validate(ctx, modifyUserPasswordRules)
	data.userId = ctx.decode.id
	await backUserService.modifyUserPassword(data)
	throw new Success('密码修改成功')
}

/**
 * 换绑邮箱
 */
async function replaceBindEmail(ctx) {
	const { data } = new Validator().validate(ctx, replaceBindEmailRules)
	data.userId = ctx.decode.id
	await backUserService.replaceBindEmail(data)
	throw new Success('邮箱换绑成功')
}

module.exports = {
	getLoginUserInfo,
	register,
	editMyInfo,
	modifyUserPassword,
	replaceBindEmail
}
