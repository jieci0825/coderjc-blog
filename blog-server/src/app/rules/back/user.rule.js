const { Rule } = require('@/validator')

const createUserRules = {
	email: new Rule()
		.isString()
		.required([''])
		.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
	account: new Rule()
		.isString()
		.required()
		.min(6)
		.max(12)
		.pattern(/^[a-zA-Z0-9]+$/), // 字母和数字
	password: new Rule().isString().required(),
	nickname: new Rule().isString().required().min(2).max(10),
	avatarUrl: new Rule().isString(),
	sign: new Rule().isString().min(0).max(100),
	description: new Rule().isString().min(0).max(200)
}

const editUserRules = {
	...createUserRules,
	id: new Rule().isNumber().isInteger().required()
}

const editMyInfoRules = {
	nickname: new Rule().isString().required().min(2).max(10),
	avatarUrl: new Rule().isString(),
	sign: new Rule().isString().min(0).max(100),
	description: new Rule().isString().min(0).max(200)
}

const getUserListRules = {
	page: new Rule().isNumber().isInteger().required().min(0),
	pageSize: new Rule().isNumber().isInteger().required().min(1).max(30),
	nickname: new Rule().isString().min(0).max(10)
}

const assignRoleRules = {
	roleId: new Rule().isNumber().isInteger().required().min(1),
	userId: new Rule().and('roleId')
}

const modifyUserPasswordRules = {
	account: new Rule().isString().required(),
	email: new Rule()
		.isString()
		.required([''])
		.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
	captcha: new Rule().isString().required(),
	oldPassword: new Rule().isString().required(),
	newPassword: new Rule().and('oldPassword')
}

const replaceBindEmailRules = {
	account: new Rule().isString().required(),
	oldEmail: new Rule()
		.isString()
		.required([''])
		.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
	newEmail: new Rule()
		.isString()
		.required([''])
		.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
	captcha: new Rule().isString().required()
}

module.exports = {
	createUserRules,
	getUserListRules,
	assignRoleRules,
	editUserRules,
	editMyInfoRules,
	modifyUserPasswordRules,
	replaceBindEmailRules
}
