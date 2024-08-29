const { Rule } = require('@/validator')

const tokenRules = {
	account: new Rule().isString().required(),
	password: new Rule().isString().required()
}

const getCaptchaRules = {
	email: new Rule()
		.isString()
		.required([''])
		.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

module.exports = {
	tokenRules,
	getCaptchaRules
}
